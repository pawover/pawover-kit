# Changesets

本仓库使用 [Changesets](https://changesets.dev) 管理版本号与发布。

## 日常流程

改动代码后运行：

```sh
pnpm changeset
```

按提示选择受影响的包、bump 类型并填写变更说明，生成的 `.changeset/*.md` 文件随 PR 一起提交。

## 自动发布（双通道分支模型）

- **feature 分支 = alpha 预发布通道**：feature 永远领先 main。push feature（且 CI 绿灯）后检测到 changeset → version 通道自动创建 / 更新 **Version Packages PR（base = feature）并自动启用 auto-merge**（feature 分支受 `ci` 状态检查保护，合并前 CI 必绿）；合并后 publish 通道构建并按拓扑序发布（子包先行，根包 `@pawover/kit` 最后），版本 `X.Y.Z-alpha.N`，dist-tag `alpha`（`.changeset/pre.json` 不入库，由 release.yml 生成）。
- **main 分支 = 正式版通道**：main 只接收发布合并（见下）；合并后（且 CI 绿灯）publish 通道直接发布 main 携带的稳定版本，dist-tag `latest`。main 上的变化子包版本领先 git tag 即进入发布计划，根包发布有幂等保护（已发布版本跳过）。

### 发布合并（feature → main）

feature 发完 alpha 后合并到 main，即正式发布：

```sh
git switch main
git merge feature            # 冲突时版本号取 feature 侧
node scripts/strip-prerelease.mjs   # 剥离 -alpha.N 后缀（无则 no-op）
git add -A && git commit -m "chore: 发布合并 feature（X.Y.Z）"
git push origin main
```

要点：

- **版本号永远取 feature 侧并剥离 prerelease 后缀**（feature 领先 main，剥离后即为下一稳定版）；不要取 main 侧旧版本。
- CHANGELOG 冲突一般可自动合并；异常时保留两边条目。
- push main 后等 CI 绿灯，Release 自动发布 `latest`——无需人工合并毕业 PR（毕业 = 发布合并本身）。

### 基线同步（main → feature）

feature 需要收回已发布版本号时（如发布合并后继续开发）：

```sh
git switch feature
git merge origin/main        # 冲突时版本号取 main 侧（已发布稳定版）
git push origin feature
```

此后 feature 的新 changeset 从稳定版之上递增（如 `0.0.1` → `0.0.2-alpha.0`），保持「feature 领先 main」。

### 触发语义（CI 绿灯门禁）

Release workflow 由 `workflow_run` 触发：**CI 完成且 success 才运行**，CI 失败的提交绝不会进入发布（Release run 显示 skipped）。CI 的 PR 事件 run 不触发 Release（仅 push 到 main/feature 的 CI run 触发）。
