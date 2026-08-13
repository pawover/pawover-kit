# Changesets

本仓库使用 [Changesets](https://changesets.dev) 管理版本号与发布。

## 日常流程

改动代码后运行：

```sh
pnpm changeset
```

按提示选择受影响的包、bump 类型并填写变更说明，生成的 `.changeset/*.md` 文件随 PR 一起提交。

## 自动发布（双通道分支模型）

- **feature 分支 = alpha 预发布通道**：feature 永远领先 main。push feature（且 CI 绿灯）后检测到 changeset → version 通道自动创建 / 更新 **Version Packages PR（base = feature，标题含日期）并自动启用 auto-merge**（feature 分支受 `ci` 状态检查保护，合并前 CI 必绿；auto-merge 仅限 feature 方向——main 方向的 version PR 永不自动合并）；合并后 publish 通道构建并按拓扑序发布（子包先行，根包 `@pawover/kit` 最后），版本 `X.Y.Z-alpha.N`，dist-tag `alpha`（`.changeset/pre.json` 不入库，由 release.yml 生成）。
- **main 分支 = 正式版通道**：main 只接收发布合并（见下）；合并后（且 CI 绿灯）publish 通道直接发布 main 携带的稳定版本，dist-tag `latest`。main 上的变化子包版本领先 git tag 即进入发布计划，根包发布有幂等保护（已发布版本跳过）。

### 发布合并（feature → main）——正式版发布入口

alpha 发布完成后，在 feature 分支运行（一条命令）：

```sh
pnpm release:merge
```

脚本自动完成：前置校验（在 feature、工作区干净）→ 合并 `origin/main`（冲突时版本号取 feature 侧，你手动解决后重跑续跑）→ `scripts/strip-prerelease.mjs` 剥离 `-alpha.N` 后缀（含根包）→ 防撞车校验（剥离后版本已发布则报错）→ 推 `release-main` 分支 → 自动创建 PR（标题 `chore: 发布合并 feature（X.Y.Z）`）。

**人工确认节点**：发布合并 PR **不启用 auto-merge**——人工审查版本号 / CHANGELOG 后手动合并，这是正式版发布的唯一入口；合并后 CI 绿灯 → Release 自动发布 `latest`（幂等保护兜底）。分支随合并自动删除（`delete_branch_on_merge`）。

要点：

- **版本号永远取 feature 侧并剥离 prerelease 后缀**（feature 领先 main，剥离后即为下一稳定版）；不要取 main 侧旧版本。
- CHANGELOG 冲突一般可自动合并；异常时保留两边条目。
- 脚本中间失败可重跑（幂等）：冲突解决后 `git merge --continue` 再跑一次。

### 基线同步（main → feature）

feature 需要收回已发布版本号时（如发布合并后继续开发）：

```sh
git switch feature
git merge origin/main        # 冲突时版本号取 main 侧（已发布稳定版）
git push origin feature
```

此后 feature 的新 changeset 从稳定版之上递增（如 `0.0.1` → `0.0.2-alpha.0`），保持「feature 领先 main」。

### 触发语义（CI 绿灯门禁）

Release workflow 由 push 触发，但所有发布动作（version / publish）前有 **gate job**：轮询当前 commit 的 `ci` check-run，CI 失败或超时则整个 Release 失败——**CI 红的提交绝不会进入发布**。发布合并 PR（release-main → main）受 main 分支保护（`ci` 状态检查），合并前 CI 必绿。
