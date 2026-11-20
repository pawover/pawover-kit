# CI 缺陷单：GitHub Actions 反复失败的配置性根因（只读审查）

- 任务流：T1（第 1 轮，新建会话）
- 基线：仓库工作区 HEAD `02fe965`（2026-11-20），仅读证据；未修改任何文件，本文件为唯一写入。
- 失败 run 核对：44700892996 / 44261426665 / 44120498819 / 44061510412 / 42153920813（Check Skills）、44170328233 / 42152175904（Release version）、44170684536 / 44170686134（action_required）、44700892617 / 42152175843 / 44261425406（同 sha 的 CI success 对照）。

---

## 一、结论摘要

反复失败的配置性根因共 3 条主线：

1. **Check Skills 的 PR diff 基线与 CI/本地不同**：仓库内 `check-skills.yml` 引用的 TanStack/intent reusable workflow（v0.5.6，commit `b9f205d6`）在 PR 上显式传 `--base <PR base tip sha>`，而 `pnpm test:ci` 第一步的 `pnpm check:skills` 不传 `--base`（退回 `.intent/review-state.json` 记录的 baseline）。changeset/release PR 的 head 与 base 差异巨大且这些变更从未以"PR base 视角"记录过审查结论 → 必然报大量 `Review unmapped change`。
2. **Release version job 死等永远不会运行的 bot PR CI**：`GITHUB_TOKEN` 创建的 PR（actor `github-actions[bot]`）触发的 PR 事件 run 被 GitHub 置于 `action_required`（需人工批准），不会产生可完成的 check-run；`wait-ci-green.sh` 只轮询 check-run、不感知 run 状态 → 空转 180×10s 后超时。
3. **changeset 引用根包即炸 + 守卫脚本吞错**：changesets v3（@manypkg pnpm 实现）的 workspace 包列表不含根包 `@pawover/kit`（rootPackage 单独返回，`assembleReleasePlan` 只读 `packages.packages`）；changeset frontmatter 引用根包会让 `changeset status` / `changeset version` 抛错。`verifyReleasePlan.ts` 用 try/catch 把该错误静默降级为豁免逻辑且只在 push 上跑 → CI 绿、Release version job 炸。

---

## 二、为什么同一 commit 上 `pnpm check:skills` 在 CI job 通过、在 Check Skills validate 失败

**可复现判定依据（本地直接复现，无需 CI）：**

```bash
# CI / 本地 / pre-push 视角（无 --base）：通过
node node_modules/@tanstack/intent/dist/cli.mjs maintainer check --artifacts _artifacts
# → 7 skill(s), 0 file(s) to sync, 0 authoring issue(s), 0 pending review item(s). 通过

# Check Skills validate 视角（--base 分支基线）：失败
node node_modules/@tanstack/intent/dist/cli.mjs maintainer check --base origin/main --artifacts _artifacts
# → 9 pending review item(s)，全部为 Review unmapped change … exit 1
```

**机制（证据：`node_modules/@tanstack/intent/dist/review-CEi4n4ir.mjs`，本地版本 0.5.6 与 workflow pin 一致，见 `dist/workflow-ref.json`）：**

1. 基线选取：`const base = revision(root, baseRef ?? state?.baseline ?? head)`（review-CEi4n4ir.mjs:234）。即 `--base` 显式参数 > `.intent/review-state.json` 的 `baseline` > HEAD。
2. 待审项生成：`git diff <base> <工作树>`（含 untracked）得到 `changed`，凡未被 skill / planning 覆盖的文件都成为 `source`（"unmapped change"）条目（review-CEi4n4ir.mjs:245-266、428-431）；已记录结论且当前文件内容 hash 与记录的 snapshot 一致 → 跳过（:287-299）。
3. 两种视角的差异：
   - **无 `--base`（CI job / 本地 / pre-push）**：base = `.intent/review-state.json` 的 `baseline`（当前为 `948686cb`，2026-11-04 的 `chore: version packages (alpha) (#43)`）。baseline 之后的所有变更（`.intent/review-state.json` 自身、`AGENTS.md`、`scripts/*.ts`、skill 文档等）恰是审查记录流程自身的产物，文件内容 hash 与记录 snapshot 匹配 → 0 pending → 通过。
   - **`--base <PR base tip sha>`（Check Skills validate）**：TanStack reusable workflow（`TanStack/intent@b9f205d6` 的 `.github/workflows/check-skills.yml`，"Check skills" 步骤）在 PR 上执行 `intent maintainer check --base "$INTENT_REVIEW_BASE"`，其中 `INTENT_REVIEW_BASE=${{ github.event.pull_request.base.sha }}`。此时 `changed` = **PR 相对 base 分支的全部净变更**。changeset/release 分支 PR（如 `changeset-release/feature`、`release-main`）的净变更包含大量从未以该视角记录过审查的文件（`.changeset/**`、`CHANGELOG.md`、`packages/*/src/**`、`scripts/**`、`eslint.config.js`、`vitest.config.ts` 等）→ 全部成为 unmapped 待审项 → exit 1。
4. CI 实证（同 sha 对照）：
   - `acbfdf17`（PR #49，head=release-main，base=main）：CI run 44700892617 **success**（`pnpm test:ci`，无 `--base`）↔ Check Skills run 44700892996 **failure**（27 项 unmapped，失败日志见 run 日志 "Check skills" 步骤）。
   - `18e318d3`（PR #48，head=changeset-release/feature，base=feature）：CI run 44261425406 **success** ↔ Check Skills run 44261426665 **failure**。
5. 因此：**PR base 为 changeset/release 分支的目标分支（main 或 feature）时，只要 PR 相对 base 的净变更中存在未记录文件（几乎必然），validate 就必然误报**。这不是账本内容错误，而是**同一命令在两种 diff 基线视角下语义不同**：CI/本地是"上次记录之后的增量"视角，PR 校验是"相对 base 的全量净差"视角。

---

## 三、Release version job 超时的完整因果链（run 44170328233）

时间线（全部有 run/日志证据）：

1. 2026-11-17 20:32:14 Release（push→feature）启动；`select-mode` → `mode=version`；`gate`（20:32:47-20:33:44）成功等待自身 push sha 的 CI（`wait-ci-green.sh` 等到 job 级 check-run 名 `ci` 完成 success）。
2. 20:33:47 `version` job 启动：`changesets/action/version@v2.1.2` 执行 `pnpm ci:version`，创建/更新 PR #48（author=`app/github-actions`，head=`changeset-release/feature`，base=`feature`，创建时 head sha=`5398042d`）。
3. **PR 事件触发两个 workflow run：run 44170684536（CI）、run 44170686134（Check Skills），两者的 `actor` 与 `triggering_actor` 均为 `github-actions[bot]`，`conclusion=action_required`（状态 completed、run_attempt=1）。** 即：bot 创建的 PR 其 workflow run 被 GitHub 创建但标记为需要人工批准，不会执行，也不产生可完成的 check-run（同 commit `5398042d` 上仅有这两个 run，均 action_required）。
4. version job 随后执行 `bash scripts/wait-ci-green.sh 5398042d`（release.yml:148）：脚本每 10 秒查询该 sha 的 check-runs，只认 job 级名为 `ci` 的 check-run（`scripts/wait-ci-green.sh:9,14`），对 `action_required` 的 run 状态无感知 → `check_runs` 中永远没有名为 `ci` 的 completed check-run → 空转。
5. 180×10s ≈ 30 分钟后（21:04:57）输出 `##[error]Timed out waiting for CI on 5398042d...` exit 1。与 job 时长（20:33:47→21:04:57）吻合。

**bot PR 的 CI 是否可自动触发：否（本仓库现状）。** 证据：run 44170684536/44170686134 的 `conclusion=action_required`；对照 run 44261425406（同一 PR #48 后续由人工触发 `triggering_actor=pawover` 的 push head `18e318d`）则正常执行并 success。GitHub 官方规则：使用仓库 `GITHUB_TOKEN` 触发的事件不创建新的 workflow run（`workflow_dispatch`/`repository_dispatch` 例外，release.yml gate 已利用 dispatch 例外），而对 bot/未授权 actor 的 PR run 会进入待批准状态——本仓库实际表现为 `action_required`（确切的仓库审批策略项无法经 API 查证，见"未验证点"）。

**两种可行修正方向（均不实施，需用户确认，涉及发布安全）：**

1. **改用可执行 actor 创建 version PR**：为 Release workflow 提供细粒度 PAT 或 GitHub App installation token（`.github/workflows/release.yml` version job 的 `GH_TOKEN`），使 PR 的 actor 不再是 `github-actions[bot]` → PR run 正常执行，`wait-ci-green.sh` 等得到。代价：引入长期凭据的保管与权限最小化问题（PAT 至少 `contents:write` + `pull-requests:write`；App 更可控但增加配置面）。
2. **不依赖"等待 PR CI"**：version job 不再死等 PR CI，改为（a）version job 直接内联执行关键校验（或复用 `pnpm test:ci`）后再创建 PR，PR 合并由人工执行（main 通道已是人工合并语义）；或（b）`wait-ci-green.sh` 显式识别 `action_required`（用 run 级 API `GET /commits/<sha>/check-runs` 之外增加 `GET /actions/runs?head_sha=<sha>` 判断），遇到待批准时输出明确错误并退出，同时附上批准入口提示，避免 30 分钟空转假超时。此方向不改变触发模型，风险最小，但需要接受"PR 合并前 CI 仍在跑"的语义调整或人工批准依赖。

---

## 四、缺陷清单（按严重度排序）

### [阻断] T1-A：Check Skills validate 的 PR 基线视角导致 changeset/release PR 必然误报

- **位置**：`.github/workflows/check-skills.yml:36-40`（validate job 引用 TanStack reusable workflow）；根因在 TanStack/intent v0.5.6 reusable workflow 的 "Check skills" 步骤（`--base ${{ github.event.pull_request.base.sha }}`）与 `node_modules/@tanstack/intent/dist/review-CEi4n4ir.mjs:234` 的基线回退逻辑。
- **现象与复现**：run 44700892996 / 44261426665 / 44120498819 / 44061510412 / 42153920813 全部为 `validate` 报大量 `Review unmapped change <path>: changed <path>` 后 exit 1；同一 sha 的 CI workflow run（44700892617 / 44261425406）均 success。本地复现命令见第二节。
- **期望行为**：PR 校验与 CI/本地对"已审查变更"的判定一致；或 unmapped 报告可解释、可操作（如提示改用何种基线或补记录）。
- **验收方式**：在同一 changeset PR 上，`maintainer check --base <PR base sha>` 与 CI `pnpm check:skills` 得出相同结论（都通过或失败原因明确非基线视角差异）；合并前不再出现纯基线视角导致的 unmapped 假警报。
- **归属任务流**：T1（本审查；修复另立）
- **修复方向**（供决策，不在本单实施）：① 把 changeset/release 类 PR 从 Check Skills 的 PR 触发中排除（`on.pull_request.branches` 过滤，降低噪音）；② 或为"PR base 视角"建立配套的审查记录流程（每次发版 PR 创建前以 `--base <base sha>` 记录结论）；③ 或升级 intent 并跟踪上游对 PR 校验语义的调整。任何一种都需与 intent 维护流程（`AGENTS.md` 的 intent-maintainer 段）联动，**影响 skill 审查策略，需用户确认**。
- **已修复**：任务流 T4 实施方案 A（版本 PR 自动记录 + 发版脚本视角升级），见 `docs/agents/intent-baseline-flow.md` 与 `scripts/recordVersionReview.ts`、`scripts/intentReview.ts`、`scripts/releaseMerge.ts`、`scripts/syncMain.ts`。

### [阻断] T1-B：Release version job 死等 bot PR 的 CI，30 分钟空转超时

- **位置**：`.github/workflows/release.yml:136-155`（version job 等待/合并/dispatch）；`scripts/wait-ci-green.sh:8-31`。
- **现象与复现**：run 44170328233 version job `##[error]Timed out waiting for CI on 5398042d...`；直接根因见第三节（run 44170684536/44170686134 `action_required`）。
- **期望行为**：version job 在 PR CI 不可自动运行时快速、明确地失败（或改走无需 PR CI 的路径），而不是 30 分钟假超时。
- **验收方式**：模拟 bot PR 场景（或注入 action_required 的 run），version job 在 1-2 分钟内给出含"需人工批准/触发方式"字样的失败信息；正常 token 下 PR CI 绿后能继续合并与 dispatch。
- **归属**：见第三节两个修正方向；**涉及 token 策略与发布闸门语义，需用户确认**。
- **归属任务流**：T1（本审查；修复另立）
- **已修复**：任务流 T2/T3 实施方案 1（改用 App installation token 创建 version PR）+ 方案 2b（`wait-ci-green.sh` 识别 `action_required` / `startup_failure` / 排队停滞），见 `.github/workflows/release.yml`、`scripts/wait-ci-green.sh`、`docs/agents/release-app.md`。

### [阻断] T1-C：changeset 引用根包 `@pawover/kit` 使发布必炸，且 CI 守卫吞错放行

- **位置**：`scripts/verifyReleasePlan.ts:50-57`（`pnpm changeset status` 失败被 catch 后静默走豁免逻辑）；`.github/workflows/ci.yml:55-57`（该守卫 `if: github.event_name == 'push'`，PR 上完全不跑）；`.github/workflows/release.yml:110-111`（version job 直接跑同一命令，无容错）。
- **现象与复现**：run 42152175904 version job `pnpm changeset status --output=.changeset/status.json` 抛 `Error: Found changeset tanstack-intent-skills for package @pawover/kit which is not in the workspace`（栈：@changesets/assemble-release-plan@7.0.0 `getRelevantChangesets` → `mapGetOrThrow`）；同 sha `6c557cd` 的 CI push run 42152175843 却 success（verifyReleasePlan 输出"发布计划校验通过（changeset 已被 version 通道消费，bump 提交放行）"）。
- **根因（已实证）**：changesets v3 的 workspace 包列表不含根包——本地实测 `@manypkg/get-packages`（pnpm tool，@changesets/cli@3.0.3 内置）返回 `packageNames: ["@pawover/kit-eslint-rules","@pawover/kit-hooks","@pawover/kit-internal","@pawover/kit-types","@pawover/kit-utils","@pawover/kit-zod"]`，根包在单独的 `rootPackage` 字段；而 `@changesets/assemble-release-plan@7.0.0` `dist/index.mjs:270` 仅以 `packages.packages` 构建 `packagesByName` → 引用根包的 changeset 必抛错。仓库自身已认知该约束（`scripts/bumpRoot.ts:5-6` 注释、`scripts/verifyRelease.ts:6-8`、`.changeset/pre/tanstack-intent-skills.md` 归档版注释"根包不在 workspace 包列表中"），但**没有任何机制阻止把根包写进 changeset frontmatter**，且 `verifyReleasePlan.ts` 的 catch 把"changeset 无效"与"status 环境失败"混为一谈。
- **期望行为**：① 引用根包的 changeset 在**提交时**（pre-commit / pre-push / PR）即被拦截；② `changeset status` 失败时守卫不得静默放行（至少区分错误类型并要求人工确认）。
- **验收方式**：构造含 `"@pawover/kit"` 的 changeset → `pnpm changeset status` 与守卫都在 PR/本地阶段失败且错误可读；正常 changeset 全链路不受影响。
- **归属任务流**：T1（本审查；修复另立）
- **修复方向**：在 verifyReleasePlan 中将 `changeset status` 失败视为**阻断**（豁免仅限可证明的 version 通道产物路径），并在 PR 上也运行该守卫（去掉 `if: push`）；可另加一个轻量 frontmatter 校验脚本禁止根包名出现。**PR 阶段拦截策略属于发布流程变更，需用户确认**。
- **已修复**：任务流 T2/T3 实施 `scripts/checkChangesets.ts`（拦截 frontmatter 引用根包）+ `scripts/verifyReleasePlan.ts` 升级（区分内容错误与环境失败，PR 与 push 均运行），见 `package.json` 的 `check:changesets` 脚本与 `.github/workflows/ci.yml` 移除 `if: push` 限制。

### [高] T1-D：`wait-ci-green.sh` 健壮性缺陷集合（独立于 T1-B 的触发问题）

- **位置**：`scripts/wait-ci-green.sh:5-31`。
- **分项**：
  1. :9 check-run 名硬编码 `ci`（job id），不感知 workflow 级 `CI` 与后续 job 改名；CI workflow 的 job 名变化即失效。
  2. :12-13 `curl -s` 无 HTTP 状态/错误处理：限流（429/403 JSON）或 5xx 时 body 无 `check_runs` → 静默空转；真正的传输错误在 `set -e` 下使脚本以 curl 退出码炸出，错误信息无上下文。
  3. :14 `check_runs[]` 只取默认第一页（check-runs API 默认 per_page≤100）；check-run 超过 100 的提交会漏检（`ci` 恰好不在首页时误超时）。
  4. :18-25 只看 check-run，不看 workflow run 状态：`action_required`（T1-B 的直接表现）、`queued` 永不执行的 run 无法区分；conclusion=`cancelled` 时直接报 `CI failed (cancelled)` 误阻断（与 ci.yml `cancel-in-progress` 的正常竞态冲突，见 T1-E）。
  5. :8 默认 180×10s=30 分钟：version job 等待的是从零开始的 PR CI（`pnpm test:ci` 全量 15-25 分钟 + 排队），窗口过紧；gate 等待 push CI 时窗口又偏大。
- **期望行为**：显式区分"排队中 / 运行中 / 已完成 / 永不会执行（action_required）"，限流与错误可诊断，参数化 check-run 名与超时。
- **验收方式**：单测/本地注入各状态（queued、in_progress、cancelled、action_required、分页>100、403 限流）逐一得到预期行为。
- **归属**：T1（与 T1-B 修复一并处理，不单独改动可先记录）。
- **归属任务流**：T1（本审查；修复另立）
- **已修复**：任务流 T2/T3 实施 `scripts/wait-ci-green.sh` 全面重写（参数化超时与 check-run 名、识别 `action_required` / `startup_failure` / 排队停滞、分页支持、限流诊断），见 `docs/agents/release-app.md`。

### [中] T1-E：ci.yml `cancel-in-progress` 与 Release gate 的竞态误报

- **位置**：`.github/workflows/ci.yml:11-13`（`cancel-in-progress: true`，组 `ci-CI-<ref>`）；`.github/workflows/release.yml:62-75`（gate 等 push sha 的 CI）；`scripts/wait-ci-green.sh:23-25`（conclusion 非 success 即 exit 1）。
- **现象与复现**：同一分支（如 feature）gate 正在等待旧 push sha 的 CI 时发生新 push → 同组 `cancel-in-progress` 取消旧 CI run → gate 读到 `conclusion=cancelled` → `::error::CI failed (cancelled), release blocked` exit 1。未在已核对 run 中直接捕获该日志（概率性竞态，**此条机制推导自三处文件代码，标注：待验证**——验证命令：构造连续两次 push 观察旧 Release run 的 gate 日志）。新 push 自会触发新的 Release run，故仅为红 run 噪音，不阻塞发布。
- **期望行为**：gate 对 `cancelled` 的 check-run 提示"等待对象已被取消（新 push 排队中）"而非"CI failed"，或对 cancelled 重试等待。
- **验收方式**：连续两次 push 同分支，旧 Release run 的 gate 失败信息不指向"CI failed (cancelled)"。
- **归属任务流**：T1（本审查；修复另立）

### [中] T1-F（发布安全，需用户确认）：workflow_dispatch 通道绕过 CI gate

- **位置**：`.github/workflows/release.yml:66-73`（gate 对 `workflow_dispatch` 直接 `ci=success` 放行）。
- **现象**：任何有 `workflow_dispatch` 触发权（默认 write 协作者）的成员可 `gh workflow run release.yml --ref feature`，不经任何 CI 校验直接进入 pack → publish 发布。该 dispatch 通道是 version job 自动化链路（release.yml:154）的必需例外，但同样对人工开放。
- **期望行为**：dispatch 通道的发布语义有显式确认（如要求输入参数 `confirm-ci-skip`，或限 environment 保护 / 限制分支），或文档明确该通道为"人工担责发布"。
- **验收方式**：无 write 权限账号 dispatch 被拒；write 账号 dispatch 时 run 概要中可见跳过 CI 的显式标记。
- **归属任务流**：T1（本审查；修复另立）
- **风险级别**：内部信任模型下中低，但属于"CI 未绿即发布"的暗门，建议保留为有意设计并文档化。

### [低] T1-G：`release.yml` push→version→merge→dispatch 链路的重复触发面

- **位置**：`.github/workflows/release.yml:152-155`（`gh pr merge --squash --delete-branch` + `gh workflow run release.yml --ref feature`）。
- **说明**：GITHUB_TOKEN 合并不产生 push run（GitHub 既有规则），dispatch 是例外——无递归风险（与 release.yml:67-68 注释一致）；`concurrency: { group: release, cancel-in-progress: false }`（:10-12）保证全局串行。残余风险仅是：**人工**在 UI 合并 version PR 时（如 PR #48 实际被人工合并，mergedAt 2026-11-18）产生 push run + 若 version job 当时仍活着还会 dispatch → 极端情况下两次 Release run 排队串行执行；publish 有 `npm view` 幂等检查（:248-251）兜底，不会重复发布同一版本，但 alpha pre 计数可能多跳一档。低概率、可自愈。
- **验收方式**：模拟人工合并 + version job 存活场景，观察两次 Release run 的 publish 输出是否幂等。
- **归属任务流**：T1（本审查；修复另立）

### [低] T1-H：docs.yml 与 Release 并发抢跑

- **位置**：`.github/workflows/docs.yml:4-7`（push main + paths 含 `packages/**/src/**`、`package.json`）。
- **说明**：发布 bump（package.json）与 releaseMerge/syncBaseline 的 push 会连带触发 Docs build+deploy（Pages 环境独占 concurrency `pages`），与 Release 并行占用 runner；未发现权限或数据冲突（`pages: write` + `id-token: write` 为 Pages 标配，`environment: github-pages` 保护存在）。仅资源噪音，属次要点。
- **验收方式**：不需要（记录即可）；如需收敛，可给 Docs 加与 Release 无关的 paths 收窄（`site/**`、`docs/**` 优先）。
- **归属任务流**：T1（本审查；修复另立）

---

## 五、权限与安全复核（无新增缺陷的方面）

- `check-skills.yml`：顶层 `permissions: {}`，validate/review 各自 `contents: read`，publish-review 仅在仓库变量 `INTENT_REVIEW_PULL_REQUESTS=true` 且有产出时给予写权限——最小化符合 TanStack 模板意图（模板注释与 `workflow-security.md` 均强调不因让失败消失而加写权限）。repair 步骤只写 runner 临时区并上传 patch artifact，不提交、不记录 review——安全。
- `ci.yml`：仅 `contents: read`；`pull_request` 对 fork PR 会跑 `pnpm install`，无 secrets 注入；turbo/actions cache 的 PR 隔离由 GitHub 保证，无污染面。
- `release.yml`：无 fork PR 面（仅 push main/feature + dispatch）；version job `contents: write + pull-requests: write + actions: write` 与其创建/合并 PR、dispatch 的职责匹配；publish job `id-token: write` 为 npm provenance 标配。
- `.husky/pre-push` 跑 `pnpm test:ci`：与 CI push 语义对齐（含 check:skills 的增量视角），无缺陷；但它意味着**本地视角永远看不到 Check Skills 的 PR 视角问题**（与 T1-A 相关的观察，不是独立缺陷）。

## 六、未能验证的点

1. **GitHub 将 `actor=github-actions[bot]` 的 PR run 置于 `action_required` 的确切仓库设置项**：`GET /repos/.../actions/permissions/workflow` 仅返回 `default_workflow_permissions=read` 与 `can_approve_pull_request_reviews=true`，不暴露 fork/bot 审批策略。现象已由 run 44170684536/44170686134 实证（actor、conclusion、run_attempt=1），但策略开关需在 Settings → Actions → General 的 Fork/审批相关项人工核对。
   验证命令：`gh api repos/pawover/pawover-kit/actions/permissions/workflow`（已查，无相关字段）+ UI 人工检查。
2. **check-runs 分页上限触发**（T1-D-3）：未构造 >100 check-run 的提交实测；机制由 API 默认 per_page 推导。
3. **T1-E 竞态的实跑复现**：概率性，未捕获实际日志；机制由 ci.yml:11-13 + release.yml:62-75 + wait-ci-green.sh:23-25 代码推导。
4. **TanStack review-skills / publish-skill-review reusable workflow**（check-skills.yml:46-57，release published / dispatch 触发）行为未审——本轮失败均为 validate（PR）侧，review 侧未出现异常证据。
5. `scripts/syncMain.ts`、`scripts/syncBaseline.ts` 的推送实现细节（token 选择、`git push` 错误路径）未逐行审——与本轮失败无关，仅在 T1-G 的链路描述中引用。
6. 44120498819 / 44061510412 / 42153920813 三个 run 对应 PR 的 base 分支未逐一确认（PR 列表 API 对已删分支返回 404）；机制不依赖具体 base（main 或 feature 皆可复现，44261426665 的 PR #48 base=feature 与 44700892996 的 PR #49 base=main 已各证一次）。

## 七、修复优先级建议

| 优先级 | 缺陷 | 理由 | 是否影响发布安全（需用户确认） |
| --- | --- | --- | --- |
| 1 | T1-B | 发布主链路卡死且每次 30 分钟假超时，是最耗时的失败 | 是（token 策略 / 闸门语义调整） |
| 2 | T1-C | 发布必炸类缺陷 + 守卫吞错掩盖真实问题 | 是（PR 阶段拦截策略、守卫降级语义） |
| 3 | T1-A | 高频噪音、每次 changeset/release PR 必红，掩盖真实失败 | 是（skill 审查策略需与 intent 维护流程联动） |
| 4 | T1-D | 随 T1-B 一并修，独立价值为可诊断性 | 否 |
| 5 | T1-F | 发布暗门文档化/加固 | 是（若收紧 dispatch） |
| 6 | T1-E、T1-G、T1-H | 低概率噪音或可自愈 | 否 |

> 本单为只读审查产物；所有修复动作（尤其涉及 token、发布闸门、skill 审查策略者）应在用户确认后按最小改动实施。
