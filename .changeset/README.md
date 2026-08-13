# Changesets 与发布流程全解（双通道模型 · 一图流）

本仓库使用 [Changesets](https://changesets.dev) v3 管理版本号与发布，由 GitHub Actions 全自动驱动（Trusted Publishing / OIDC，无 token）。

**双通道**：feature = alpha 预发布通道（永远领先 main）；main = 正式版通道（只收发布合并）。
**核心设计**：alpha → 正式版之间必须经过**人工确认节点**——发布合并 PR 的人工合并。任何自动化都不会越过这个节点。

---

## 一、完整发布流程（一图流）

```
┌─────────────────────────── 阶段一 · 开发（手动） ───────────────────────────┐
│  feature 分支开发代码                                                        │
│  + pnpm changeset 生成 .changeset/xxx.md（bump 类型：patch/minor/major）    │
│  + git add && git commit && git push feature                                 │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   ▼
                ┌──────────── push 事件（main / feature）────────────┐
                ▼                                                  ▼
   ┌──────────────────────┐                      ┌──────────────────────────────────────┐
   │  CI workflow         │                      │  Release workflow（concurrency 串行） │
   │  · Checkout (depth0) │                      │                                      │
   │  · 物化 main 引用     │                      │  ① select-mode job ── 读 .changeset  │
   │  · pnpm install      │                      │       目录（feature 先跑              │
   │  · pnpm test:ci      │                      │       pre:enter-alpha 生成 pre.json，│
   │    = 类型检查+测试    │                      │       过滤 .changeset/pre/ 归档）：   │
   │      +构建+smoke     │                      │       ├─ 有非空 changeset ─▶ version │
   │      +check:pack     │                      │       ├─ 无 changeset，但             │
   │  · verify-release-   │                      │       │  publish-plan 非空 ─▶ publish │
   │    plan（仅 push）： │                      │       └─ 都无 ─▶ none（全 skipped）   │
   │      根目录有 changeset ─▶ status 通过 ─┐    │       （publish 时上传 plan artifact）│
   │      根目录无 changeset ─▶ tag 豁免检查 ─┤    │                                      │
   │      未发布变更 ─▶ ❌ 拦截（CI 红）      │    │  ② gate job ── 轮询当前 commit 的    │
   └──────────────────────┴─────────────────┤    │      ci check-run（10s × 180 次）     │
                                            │    │      ├─ success ─▶ 放行               │
                                            │    │      └─ 失败/超时 ─▶ Release 失败     │
                                            │    │      （CI 红绝不发布）                 │
                                            │    └──────────────────┬───────────────────┘
                                            ▼                       ▼
                              CI 绿（check-run: ci / success）   （gate 等 CI 结论，放行后）
                                            │                       │
                                            └──────────┬────────────┘
                                                       ▼
┌────────────────── 阶段二 · alpha 通道（全自动，到 alpha 为止） ──────────────────┐
│  Release ③ version job（mode=version 时）：                                    │
│    a. pnpm changeset status（校验待消费 changeset 合法）                        │
│    b. Configure pre-release mode：feature → pnpm pre:enter-alpha               │
│       （生成 .changeset/pre.json，gitignored 不入库；main 且根包版本含 "-"      │
│        → enter + exit，毕业安全网，正常流程不触发）                             │
│    c. pnpm ci:version = changeset version（pre 模式：0.0.1 → 0.0.2-alpha.0，   │
│       消费的 changeset 移入 .changeset/pre/ 归档）                              │
│       → scripts/bump-root.mjs（根包 0.9.0 → 0.9.1-alpha.0，硬校验子包变⇒根包变）│
│       → pnpm install（锁文件更新）                                             │
│    d. changesets/action/version：推送 changeset-release/feature 分支           │
│       （chore: version packages）+ 创建/更新 PR「Version Packages (alpha) -    │
│       2026-08-13」（base = 推送分支，pre 模式自动追加 alpha 后缀）              │
│    e. Enable auto-merge（仅 feature 方向）：gh pr merge --auto --squash        │
│       —— main 方向的 version PR 永不自动合并（人工合并，避免自动发正式版）       │
│    f. node scripts/verify-release.mjs（硬校验子包发布 ⇒ 根包必发）              │
│        │                                                                      │
│        ▼                                                                      │
│  Version Packages PR（changeset-release/feature → feature）                    │
│        │  · PR 的 CI（pull_request 事件）触发                                  │
│        │  · 审批门禁：head 与 base 的 workflow 文件不一致时 run 显示            │
│        │    action_required，需人工 Approve（流程稳定后自然消失）               │
│        │  · CI 通过 → auto-merge → 合并（分支随 delete_branch_on_merge 自动删） │
│        ▼                                                                      │
│  feature push（bump 提交）→ 再跑一轮 CI + Release：                            │
│    ① select-mode：无根目录 changeset（已消费）→ publish-plan 非空 → publish     │
│    ② gate：等 CI 绿（此时变更版本已发布？——未发布时守卫会拦，见下方说明）        │
│    ③ pack job：pnpm build → changesets/action/pack（按 publish-plan 打包）      │
│    ④ publish job：                                                             │
│       · pre enter alpha（生成 pre.json → dist-tag=alpha；main 不跑 → latest）   │
│       · changesets/action/publish：拓扑序发布 5 子包                            │
│         （types → zod → eslint-rules → utils → hooks）                         │
│       · 自动打 git tag（@pawover/kit-hooks@0.0.2-alpha.0 等）并推送             │
│       · 根包：pnpm build + pnpm publish（幂等：npm view 已存在则跳过）          │
│        │                                                                      │
│        ▼                                                                      │
│  ✅ npm：@pawover/kit-hooks@0.0.2-alpha.0 等（dist-tag: alpha）                 │
│                                                                               │
│  ⚠️ 守卫说明：alpha bump 提交合并后、版本发布前，feature 的 CI 不会被拦          │
│     （verify-release-plan 对仅版本文件变更的 bump/剥离提交直接放行）；             │
│     源码变更无 changeset 且版本未发布（无 tag）才会被拦截；                       │
│     若发布环节异常中断，走「应急手动发布」或直接进入发布合并（见 FAQ）。         │
└──────────────────────────────────┬───────────────────────────────────────────┘
                                   ▼
┌────────────────── 阶段三 · 发布合并（人工闸门） ─────────────────────────────┐
│  人工：在 feature 分支运行 pnpm release:merge（脚本 scripts/release-merge.mjs）│
│    ① 前置校验：在 feature、工作区干净、无未完成合并                            │
│    ② git fetch origin + git merge origin/main --no-edit                        │
│       ├─ 无冲突 → 继续                                                        │
│       └─ 有冲突 → 脚本退出：版本号冲突一律保留 feature 侧（alpha 领先），       │
│          解决后 git add + git merge --continue，重跑同一命令续跑（幂等）        │
│    ③ 剔除 .changeset/pre/ 归档（git rm -r）——防止污染 main 的 changeset 判定   │
│    ④ 剥离 prerelease 后缀（strip-prerelease 逻辑内嵌）：                       │
│       0.0.2-alpha.0 → 0.0.2（含根包 0.9.1-alpha.0 → 0.9.1），无则跳过（幂等）   │
│    ⑤ 防撞车校验：npm view 检查 6 个包剥离后版本，已发布 → 报错停止             │
│       （防止静默失败：发布被幂等保护跳过却无人察觉）                            │
│    ⑥ 切到 release-main 分支并提交「剔除归档 + 剥离版本」变更                     │
│       （feature 保持 alpha 状态：PR 被关闭也不会锁死 feature）                   │
│    ⑦ 清理旧 release-main（本地 + 远端）→ 推新 release-main 分支                  │
│    ⑧ 自动创建 PR（release-main → main，已有 open PR 则跳过）                    │
│       · 标题：chore: 发布合并 feature（X.Y.Z）                                 │
│       · 不启用 auto-merge！                                                    │
│        │                                                                      │
│        ▼                                                                      │
│  🔴 人工确认节点（正式版发布的唯一入口）：                                     │
│     审查版本号（0.0.2 / 0.1.1 / 0.9.1）、CHANGELOG 条目、diff → 手动 Merge     │
│        │                                                                      │
│        ▼                                                                      │
│  main push → CI（守卫放行：main 相对自身 diff 为空）→ CI 绿                    │
│  → Release：select-mode（无 changeset → publish-plan 非空）→ gate → pack       │
│  → publish → 发布 0.0.2 / 0.1.1 / 0.9.1 到 latest + 打 git tag                 │
│  → release-main 分支随 delete_branch_on_merge 自动删除                         │
│        │                                                                      │
│        ▼                                                                      │
│  ✅ npm：0.0.2 / 0.1.1 / 0.9.1（dist-tag: latest）                              │
└──────────────────────────────────┬───────────────────────────────────────────┘
                                   ▼
┌────────────────── 阶段四 · 基线同步（手动） ─────────────────────────────────┐
│  feature 需要收回已发布版本号时：                                              │
│  git switch feature && git merge origin/main（冲突取 main 侧稳定版）&& push    │
│  → 下一轮 alpha 从 0.0.2 之上递增（0.0.3-alpha.0），保持「feature 领先 main」   │
│  （不同步的后果：alpha 剥离后撞已发布版本 → 被幂等保护静默跳过 → 正式版发不出）  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 二、版本号规则

| 场景 | 当前版本 | changeset 类型 | 结果 |
|---|---|---|---|
| alpha bump（pre 模式） | `0.0.1` | patch | `0.0.2-alpha.0` |
| alpha bump（pre 模式） | `0.0.1` | minor | `0.1.0-alpha.0` |
| alpha bump（pre 模式） | `0.0.2-alpha.0` | patch | `0.0.2-alpha.1`（pre 计数递增，主数字不变） |
| alpha bump（pre 模式） | `0.1.0-alpha.0` | minor | `0.2.0-alpha.0` |
| 发布合并剥离 | `0.0.2-alpha.0` | — | `0.0.2`（数字不变，剥 prerelease） |

- 根包版本由 `bump-root.mjs` 按子包 bump 类型 + pre 计数同步：首次进入 pre 时主数字 +1（`0.9.0 → 0.9.1-alpha.0`），pre 模式内 patch 仅递增 pre 计数（`0.9.1-alpha.0 → 0.9.1-alpha.1`），与 changesets 子包行为一致。
- 剥离后的版本必须大于 main 已发布版本（单调），且不等于任何已发布版本（防撞车）。

## 三、守卫与校验

| 守卫 | 位置 | 作用 |
|---|---|---|
| `verify-release-plan.mjs` | CI push 事件 | 根目录无 changeset 时：仅版本文件变更（bump/剥离提交）直接放行；源码变更的子包须已有匹配 git tag（已发布豁免），否则拦截 |
| `verify-release.mjs` | version job 之后 | 子包发布 ⇒ 根包必发 |
| `bump-root.mjs` | ci:version 内 | 根包版本按子包同步 + 硬校验 |
| 根包发布幂等 | publish job | 已发布版本跳过（`npm view` 检查） |
| `release:merge` 防撞车 | 发布合并脚本 | 剥离后版本已发布 → 停止 |

## 四、分支保护

| 分支 | 状态检查 | 其他 |
|---|---|---|
| `main` | `ci`（strict: false） | 禁强推 + 禁删除 + enforce_admins |
| `feature` | `ci`（strict: false） | 禁删除（允许强推，开发分支） |

## 五、PR 形态汇总

| PR | head → base | 创建者 | 内容 | 合并方式 |
|---|---|---|---|---|
| Version Packages（alpha） | `changeset-release/feature` → `feature` | version job（bot） | 版本 bump 提交 | **auto-merge**（仅 feature 方向） |
| Version Packages | `changeset-release/main` → `main` | version job（bot） | 版本 bump 提交（罕见） | **人工** |
| 发布合并 | `release-main` → `main` | `pnpm release:merge` | 代码 + 稳定版版本号 | **人工（正式版闸门）** |

## 六、常见问题与异常处理

| 现象 | 原因 | 处理 |
|---|---|---|
| Release run 失败 | CI 红被 gate 拦截（符合设计） | 修 CI，重新 push |
| version PR 的 CI 显示 action_required | head 与 base 的 workflow 文件不一致 / 首次贡献者审批 | Actions 页 Approve；流程稳定后自然消失 |
| 出现空 version PR（无文件改动） | select-mode 把 `.changeset/pre/` 归档当 changeset（已修复：select-mode 先 pre enter） | 直接关闭空 PR |
| CI 红：verify-release-plan 拦截 | 变更未写 changeset 且未发布；或 alpha bump 后发布环节中断 | 补 changeset；或应急手动发布（见下） |
| release:merge 报版本撞车 | feature 落后 main（基线未同步） | 先 `git merge origin/main` 取 main 侧，再重跑 |
| 发布合并 PR 合并后没发版 | 剥离后版本已存在（幂等跳过） | 检查版本号与 npm 记录 |

**应急手动发布**（alpha 发布环节异常中断时，等价 CI publish 通道）：

```sh
pnpm pre:enter-alpha && pnpm build && pnpm changeset publish && git push --tags
# 根包单独发：
pnpm publish --no-git-checks --access public
```

## 七、运营速查

| 操作 | 命令 |
|---|---|
| 生成变更说明 | `pnpm changeset` |
| 发布 alpha（自动） | `git push origin feature` |
| 发布正式版（人工闸门） | `pnpm release:merge` → 人工合并 PR |
| 基线同步 | `git merge origin/main`（feature 上，取 main 侧） |
| 手动预发布（应急） | `pnpm pre:enter-alpha && pnpm build && pnpm changeset publish` |
