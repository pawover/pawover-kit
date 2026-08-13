# Changesets 与发布流程全解（双通道模型）

本仓库使用 [Changesets](https://changesets.dev) v3 管理版本号与发布，由 GitHub Actions 全自动驱动（Trusted Publishing / OIDC，无 token）。

采用**双通道分支模型**：

- **feature 分支 = alpha 预发布通道**：开发主线，永远领先 main，push 后自动发布 `X.Y.Z-alpha.N`（dist-tag `alpha`）
- **main 分支 = 正式版通道**：只接收发布合并，合并后自动发布稳定版 `X.Y.Z`（dist-tag `latest`）

> **核心设计**：预览版（alpha）→ 正式版（latest）之间**必须经过人工确认节点**——发布合并 PR 的人工合并。任何自动化都不会越过这个节点。

---

## 0. 关键不变量

1. **feature 永远领先 main**：feature 的版本号始终高于 main 已发布的稳定版（alpha 从 main 版本之上递增）。
2. **版本单调不撞车**：alpha 版本剥离 `-alpha.N` 后即为下一稳定版，绝不等于已发布版本。
3. **CI 绿灯是发布前置**：Release 的 gate job 轮询 CI，CI 失败的提交绝不进入发布。
4. **main 只能经 PR 合入**：分支保护（`ci` 状态检查 + 禁强推/删除）强制。
5. **正式版唯一入口**：发布合并 PR 的人工合并（不启用 auto-merge）。

---

## 1. 分支角色

| 分支 | 角色 | 生命周期 |
|---|---|---|
| `feature` | 唯一开发主线，永远领先 main | 长期 |
| `main` | 正式版仓库，只收发布合并 PR | 长期 |
| `changeset-release/feature` | version PR 的 head（版本 bump 提交） | 用完即删（`delete_branch_on_merge` 自动删） |
| `changeset-release/main` | 罕见：main 上出现 changeset 时的 version PR head | 用完即删 |
| `release-main` | 发布合并专用 head（`pnpm release:merge` 创建） | 用完即删 |

---

## 2. 总览：一次完整发布周期

```
┌─────────────────────────── 开发（手动） ───────────────────────────┐
│  feature 分支开发代码 + pnpm changeset 生成变更说明 → push feature   │
└──────────────────────────────────┬────────────────────────────────┘
                                   ▼
        ┌──────────────────── push 事件 ────────────────────┐
        ▼                                                   ▼
   CI workflow（校验）                               Release workflow（发布）
   · 类型/测试/构建/打包检查                            · select-mode 判定通道
   · 发布计划守卫                                        · gate 等 CI 绿灯
        │                                                · version 或 publish
        ▼
   CI 绿（check-run: ci / success）
        │
        ▼
┌────────────── alpha 通道（全自动，到 alpha 为止） ──────────────┐
│  version 通道：bump 0.0.1 → 0.0.2-alpha.0（含根包）              │
│  → 推 changeset-release/feature → 开 PR → auto-merge → 合并     │
│  → 二次 push → publish 通道 → 发布 alpha tag → 打 git tag        │
└────────────────────────────────┬────────────────────────────────┘
                                 ▼
┌────────────── 发布合并（人工闸门） ──────────────────────────────┐
│  人工：pnpm release:merge（合并 main → 剔除归档 → 剥离 alpha     │
│  → 防撞车校验 → 推 release-main → 自动开 PR）                    │
│  人工：审查版本号 → 手动合并 PR（唯一正式版入口，无 auto-merge）   │
│  自动：main push → CI 绿 → publish 通道 → 发布 latest → 打 tag   │
└────────────────────────────────┬────────────────────────────────┘
                                 ▼
┌────────────── 基线同步（手动） ─────────────────────────────────┐
│  feature 上 merge main（取 main 侧版本号）→ push → 下一轮 alpha   │
└────────────────────────────────────────────────────────────────┘
```

---

## 3. 阶段一：开发（手动）

### 3.1 步骤

1. 在 `feature` 分支开发代码。
2. 为每个用户可见变更生成 changeset（**随代码一起提交**，不是发布时才写）：

```sh
pnpm changeset
```

按提示选择受影响的包、bump 类型（`patch` / `minor` / `major`）并填写中文变更说明，生成 `.changeset/xxx.md`：

```md
---
"@pawover/kit-hooks": patch
"@pawover/kit-utils": patch
---

修复 useMount 在严格模式下的重复执行问题
```

3. 提交并推送：

```sh
git add -A && git commit -m "feat: ..." && git push origin feature
```

### 3.2 规则

- **bump 类型决定发布版本**：`patch` → `0.0.1 → 0.0.2-alpha.0`；`minor` → `0.0.1 → 0.1.0-alpha.0`。
- 没有用户可见变更的提交**不需要** changeset（但会被 `verify-release-plan` 守卫拦截，见 §5.2）。

---

## 4. 阶段二：push 触发（两个 workflow 并行）

push 到 `main` / `feature` 同时触发两个 workflow：

| Workflow | 触发 | 职责 |
|---|---|---|
| **CI** | `push`（main/feature）+ `pull_request`（任意 PR） | 校验代码，输出 check-run `ci` |
| **Release** | `push`（main/feature），`concurrency: release` 全局串行 | 发布（version / publish） |

**并发控制**：CI 按分支并发（同分支新 push 取消旧 run）；Release 全局单跑（`cancel-in-progress: false`，绝不并发发布）。

---

## 5. CI workflow 详解（ci.yml）

### 5.1 步骤流水

| # | 步骤 | 说明 |
|---|---|---|
| 1 | Checkout | `fetch-depth: 0` 全量历史（changesets 对比需要） |
| 2 | 物化 main | `git update-ref refs/heads/main refs/remotes/origin/main`——单分支 checkout 下 DWIM 无法解析未限定名 `main`，changesets 的 merge-base 需要本地分支引用 |
| 3 | Setup pnpm / Node | Node 24，pnpm 缓存 |
| 4 | Install | `pnpm install --frozen-lockfile` |
| 5 | `pnpm test:ci` | `test:types && test && build && test:smoke && check:pack`（HUSKY=0） |
| 6 | **Verify release plan** | **仅 push 事件**（PR 事件跳过）：`node scripts/verify-release-plan.mjs` |

### 5.2 发布计划守卫（verify-release-plan.mjs）

判定逻辑：

```
① 读取 .changeset/ 根目录的 *.md（排除 pre/ 归档与 README.md）
        │
        ├─ 存在待消费 changeset ──▶ 跑 changeset status
        │                              ├─ 通过 → ✅ 放行（计划合法）
        │                              └─ 失败 → 进入②
        │
        └─ 无待消费 changeset ──▶ 进入②（跳过 status——否则被 pre/ 归档撑起、守卫失效）

② 收集「自 main 分叉点以来」变更的子包（package.json / CHANGELOG.md 变化）
        │
        ├─ 当前版本已有匹配 git tag（如 @pawover/kit-hooks@0.0.2-alpha.0）
        │      → 视为已发布 → 豁免
        ├─ 全部豁免 → ✅ 放行（alpha 通道 bump 后无待消费 changeset 属正常）
        └─ 存在未发布变更 → ❌ 拦截（exit 1，CI 红）
```

**设计意图**：开发改动忘记写 changeset → 拦截；alpha 发布提交（版本已发、有 tag）→ 豁免。

---

## 6. Release workflow 详解（release.yml）

### 6.1 job ① select-mode —— 通道判定

```
读 .changeset 目录（feature 方向先跑 pnpm pre:enter-alpha 生成 pre.json，
以启用 pre 模式过滤——v3.0.0 会把消费的 changeset 移到 .changeset/pre/ 归档，
无 pre.json 时 select-mode 会把归档误判为新 changeset，产生幽灵 version PR）
        │
        ├─ 存在非空 changeset ──────────────▶ mode = version
        │
        └─ 无 changeset ──▶ changeset publish-plan（版本 vs git tag 对比）
                                ├─ plan 非空 ─▶ mode = publish（上传 plan artifact，
                                │               输出 publish-plan-artifact-id）
                                └─ plan 为空 ─▶ mode = none（其余 job 全部 skipped）
```

### 6.2 job ② gate —— CI 绿灯门禁

自写轮询（bash + GitHub API）：

```
每 10 秒轮询 GET /repos/{owner}/{repo}/commits/{sha}/check-runs
找 name == "ci" 的 check-run（sha = 本次 push 的 commit）
        │
        ├─ completed + success ──▶ ✅ 放行（输出 ci=success，下游 job 继续）
        ├─ completed + 其他结论 ─▶ ❌ Release 失败（CI 红绝不发布）
        └─ 180 次（30 分钟）超时 ─▶ ❌ 失败
```

**所有发布动作（version / pack / publish）都依赖 gate 通过**——CI 与 Release 并行启动，但发布永远等 CI 结论。

### 6.3 job ③ version 通道（mode = version 时）

| # | 步骤 | 说明 |
|---|---|---|
| 1 | Checkout（fetch-depth: 0）+ 物化 main | 同 CI |
| 2 | Verify release plan | `changeset status --output=.changeset/status.json`（有 changeset 才会走到这里） |
| 3 | **Configure pre-release mode** | `feature` → `pnpm pre:enter-alpha`（生成 `.changeset/pre.json`，gitignored 不入库）；`main` 且根包版本含 `-` → enter + exit（毕业安全网，正常流程不会触发） |
| 4 | **Version packages** | `pnpm ci:version` = `changeset version` → `scripts/bump-root.mjs` → `pnpm install` |
| 5 | Version action | `changesets/action/version@v2`：把 bump 提交推到 `changeset-release/<分支>`，创建/更新 PR（标题 `Version Packages - 2026-08-13`，pre 模式自动追加 `(alpha)`；base = 推送分支） |
| 6 | **Enable auto-merge** | **仅 `github.ref_name == 'feature'`**：`gh pr merge <pr> --auto --squash`。main 方向的 version PR **永不自动合并**（人工合并，避免自动发布正式版） |
| 7 | Verify root | `node scripts/verify-release.mjs`：硬校验「子包发布 ⇒ 根包必发」 |

**ci:version 内部**：

```
changeset version（pre 模式）
  · 消费根目录 changeset，按类型 bump：0.0.1 → 0.0.2-alpha.0
  · 消费的 changeset 移动到 .changeset/pre/（v3.0.0 归档行为）
  · 更新各包 CHANGELOG.md
→ scripts/bump-root.mjs
  · 根包版本按子包 bump 类型与 pre 计数同步：0.9.0 → 0.9.1-alpha.0
  · 硬校验「子包版本变化 ⇒ 根包必变」，否则 exit 1
→ pnpm install（锁文件同步）
```

### 6.4 version PR 生命周期

```
version action 推送 changeset-release/feature + 创建 PR
        │
        ▼
PR 的 CI（pull_request 事件）触发
        │
        ├─ 审批门禁：若 head 分支与 base 分支的 workflow 文件不一致
        │   （或首次贡献者），run 显示 action_required，需人工 Approve——
        │   发布流程稳定（workflow 不再改动）后自然消失
        │
        ▼
CI 通过 → auto-merge（仅 feature 方向）→ PR 合并
        │  （合并后分支随 delete_branch_on_merge 自动删除）
        ▼
feature push（bump 提交）→ 再触发一轮 CI + Release
        │
        ▼
select-mode：无根目录 changeset（已消费）→ publish-plan 非空 → publish 模式
```

### 6.5 job ④ pack（mode = publish 时）

```
Checkout（fetch-depth: 0）→ 物化 main → install
→ pnpm build（turbo 构建全部包）
→ changesets/action/pack@v2
    · 按 select-mode 的 publish-plan artifact 打包 tarball
    · 输出 pack-dir-artifact-id
```

### 6.6 job ⑤ publish（依赖 pack）

| # | 步骤 | 说明 |
|---|---|---|
| 1 | Checkout + 物化 main + install | 同前 |
| 2 | Configure pre-release mode | 仅 `feature`：`pnpm pre:enter-alpha`（决定 dist-tag = `alpha`；main 不跑 → dist-tag = `latest`） |
| 3 | `changesets/action/publish@v2` | 按 pack 产物逐包发布，**拓扑序**：`types → zod → eslint-rules → utils → hooks`（依赖方在后）；成功后自动打 git tag（`@pawover/kit-hooks@0.0.2-alpha.0` 等）并推送 |
| 4 | 构建根包 | `pnpm build`（生成 entry/ 发布物） |
| 5 | 发布根包 | `pnpm publish --no-git-checks --access public`；**幂等保护**：`npm view @pawover/kit@$version` 已存在则跳过 |

**权限**：`contents: write` + `id-token: write`（OIDC Trusted Publishing，无 token、自动 provenance）。

**到此为止 alpha 通道闭环——不触发任何正式版发布。**

---

## 7. 阶段三：发布合并（人工闸门）

### 7.1 一键命令

在 `feature` 分支运行：

```sh
pnpm release:merge
```

脚本（`scripts/release-merge.mjs`）流程：

```
① 前置校验
   · 当前分支必须是 feature
   · 工作区干净（git status --porcelain 为空）
   · 无未完成合并（MERGE_HEAD）
② git fetch origin + git merge origin/main --no-edit
   · 无冲突 → 继续
   · 有冲突 → 脚本退出，提示人工解决：
       版本号冲突一律保留 feature 侧（alpha 领先）
       解决后 git add + git merge --continue，重跑同一命令续跑（幂等）
③ 剔除 .changeset/pre/ 归档（git rm -r）
   · 防止归档污染 main 的 changeset 判定（否则 main 上会出幽灵 version PR）
④ 剥离 prerelease 后缀（scripts/strip-prerelease.mjs 逻辑内嵌）
   · 0.0.2-alpha.0 → 0.0.2（含根包 0.9.1-alpha.0 → 0.9.1）
   · 无 prerelease 则跳过（幂等）
⑤ 防撞车校验
   · npm view 检查 6 个包（5 子包 + 根包）剥离后版本是否已发布
   · 已发布 → 报错停止（防止静默失败：发布被幂等保护跳过却无人察觉）
⑥ 清理旧 release-main（本地 + 远端）→ 推新 release-main 分支
⑦ 自动创建 PR（release-main → main）
   · 标题：chore: 发布合并 feature（X.Y.Z）
   · **不启用 auto-merge**
⑧ 输出 PR 链接
```

### 7.2 人工确认节点（正式版发布的唯一入口）

```
人工审查 PR：
  · 版本号是否正确（0.0.2 / 0.1.1 / 0.9.1）
  · CHANGELOG 条目是否齐全
  · diff 是否只含预期的代码变更
→ 手动点击 Merge（squash）
```

合并后一切自动：

```
main push → CI（守卫放行：main 相对自身 diff 为空）→ CI 绿
→ Release：select-mode（无 changeset → publish-plan 非空）→ gate → pack → publish
→ 发布 0.0.2 / 0.1.1 / 0.9.1 到 latest + 打 git tag
→ release-main 分支随 delete_branch_on_merge 自动删除
```

---

## 8. 阶段四：基线同步（手动）

```
feature 需要收回已发布版本号时：
  git switch feature
  git merge origin/main     # 冲突时版本号取 main 侧（已发布稳定版）
  git push origin feature
```

此后 feature 的新 changeset 从稳定版之上递增（`0.0.2 → 0.0.3-alpha.0`），保持「feature 领先 main」。

**不同步的后果**：feature 从旧基线继续 bump，可能产出低于 main 已发布版本的 alpha → 发布合并剥离后撞已发布版本 → 被幂等保护静默跳过 → 正式版永远发不出去（`release:merge` 的防撞车校验会拦住并提示）。

---

## 9. 版本号规则

### 9.1 bump 语义（pre 模式）

| 当前版本 | changeset 类型 | 结果 |
|---|---|---|
| `0.0.1` | patch | `0.0.2-alpha.0` |
| `0.0.1` | minor | `0.1.0-alpha.0` |
| `0.1.0-alpha.0` | patch | `0.1.1-alpha.0`（pre 递增，不剥 prerelease） |

根包版本由 `bump-root.mjs` 按子包 bump 类型 + pre 计数同步（`0.9.0 → 0.9.1-alpha.0`；子包升 minor 时根包仍保留 major.minor 前缀规则）。

### 9.2 剥离语义（发布合并）

`X.Y.Z-alpha.N → X.Y.Z`（剥离 prerelease，数字不变）。剥离后的版本必须**大于** main 已发布版本（单调），且**不等于**任何已发布版本（防撞车）。

---

## 10. 守卫与校验清单

| 守卫 | 位置 | 作用 |
|---|---|---|
| `verify-release-plan.mjs` | CI push 事件 | 有变更无 changeset 且未发布 → 拦（tag 感知豁免） |
| `verify-release.mjs` | version job 之后 | 子包发布 ⇒ 根包必发 |
| `bump-root.mjs` | ci:version 内 | 根包版本按子包同步 + 硬校验 |
| 根包发布幂等 | publish job | 已发布版本跳过（`npm view` 检查） |
| `release:merge` 防撞车 | 发布合并脚本 | 剥离后版本已发布 → 停止 |

---

## 11. 分支保护

| 分支 | 状态检查 | 其他 |
|---|---|---|
| `main` | `ci`（strict: false） | 禁强推 + 禁删除 + enforce_admins=true |
| `feature` | `ci`（strict: false） | 禁删除（允许强推，开发分支） |

---

## 12. PR 形态汇总

| PR | head → base | 创建者 | 内容 | 合并方式 |
|---|---|---|---|---|
| Version Packages（alpha） | `changeset-release/feature` → `feature` | version job（bot） | 版本 bump 提交 | **auto-merge**（仅 feature 方向） |
| Version Packages | `changeset-release/main` → `main` | version job（bot） | 版本 bump 提交（罕见） | **人工** |
| 发布合并 | `release-main` → `main` | `pnpm release:merge` | 代码 + 稳定版版本号 | **人工（正式版闸门）** |

---

## 13. 常见问题与异常处理

| 现象 | 原因 | 处理 |
|---|---|---|
| Release run 失败 | CI 红被 gate 拦截（符合设计） | 修 CI，重新 push |
| version PR 的 CI 显示 action_required | head 与 base 的 workflow 文件不一致 / 首次贡献者审批 | Actions 页 Approve；流程稳定后自然消失 |
| 出现空 version PR（无文件改动） | select-mode 把 `.changeset/pre/` 归档当 changeset（已修复：select-mode 先 pre enter） | 直接关闭空 PR |
| CI 红：verify-release-plan 拦截 | 变更未写 changeset 且未发布 | 补 changeset；或该版本已发布（自动豁免） |
| release:merge 报版本撞车 | feature 落后 main（基线未同步） | 先 `git merge origin/main` 取 main 侧，再重跑 |
| 发布合并 PR 合并后没发版 | 剥离后版本已存在（幂等跳过） | 检查版本号与 npm 记录 |

---

## 14. 运营速查

| 操作 | 命令 |
|---|---|
| 生成变更说明 | `pnpm changeset` |
| 发布 alpha（自动） | `git push origin feature` |
| 发布正式版（人工闸门） | `pnpm release:merge` → 人工合并 PR |
| 基线同步 | `git merge origin/main`（feature 上，取 main 侧） |
| 手动预发布（应急） | `pnpm pre:enter-alpha && pnpm build && pnpm changeset publish`（根包另发） |
