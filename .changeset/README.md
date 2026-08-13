# Changesets

本仓库使用 [Changesets](https://changesets.dev) 管理版本号与发布。

## 日常流程

改动代码后运行：

```sh
pnpm changeset
```

按提示选择受影响的包、bump 类型并填写变更说明，生成的 `.changeset/*.md` 文件随 PR 一起提交。

## 自动发布

**双通道分支模型**：

1. **feature 分支（alpha 预发布通道）**：push feature 后检测到 changeset 文件 → 自动创建 / 更新 **Version Packages PR（base = feature）**；合并后构建并按拓扑序发布（子包先行，根包 `@pawover/kit` 最后），版本 `X.Y.Z-alpha.N`，dist-tag `alpha`（`.changeset/pre.json` 不入库，由 release.yml 在 feature push 时生成）。
2. **main 分支（正式版通道）**：合并 feature 后，push main 检测到 changeset 文件 → 自动创建 / 更新 **Version Packages PR（base = main）**；根包版本含 prerelease 后缀时自动「毕业」为稳定版 `X.Y.Z`，发布走 `latest` dist-tag。
