# Changesets

本仓库使用 [Changesets](https://changesets.dev) 管理版本号与发布。

## 日常流程

改动代码后运行：

```sh
pnpm changeset
```

按提示选择受影响的包、bump 类型并填写变更说明，生成的 `.changeset/*.md` 文件随 PR 一起提交。

## 自动发布

合并 PR 到 `main` 后，GitHub Actions 自动：

1. 检测到 changeset 文件 → 自动创建 / 更新 **Version Packages** PR
2. 合并 Version Packages PR → 构建并按拓扑序发布（子包先行，根包 `@pawover/kit` 最后）→ 打 git tag + GitHub Release

当前处于 alpha pre 模式（`.changeset/pre.json`），所有包以 `X.Y.Z-alpha.N` 版本发布到 `alpha` dist-tag。
