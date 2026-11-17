---
"@pawover/kit-eslint-rules": patch
---

chore(eslint-rules): 升级上游插件并调整规则映射

依赖升级（精确锁定版本）：

- `@eslint-react/eslint-plugin` → `5.30.3`
- `@stylistic/eslint-plugin` → `6.0.1`（退出 beta）
- `eslint-plugin-vue` → `10.12.1`
- `typescript-eslint` → `8.73.0`
- `vue-eslint-parser` → `10.4.2`

新增运行时依赖 `@pawover/kit-utils`（内部共享工具，装配阶段用于 `ArrayUtil.merge` 做扩展名去重合并）。

规则映射调整：

- 新增 `react/unstable-exhaustive-deps: 0`（实验性规则，默认关闭）
- 新增 `ts/no-unsafe-class-instance-assignment: 0`（type-aware 规则，默认关闭）
- `ts/strict-void-return` 由 `[1, { allowReturnAny: true }]` 改为 `0`（默认关闭：该检查会被静默移除，需要保留时可通过 `typescript.overrides` 显式开启）

另：`pnpm-workspace.yaml` 的 `minimumReleaseAgeExclude` 新增 11 条 `typescript-eslint@8.73.0` 系列精确版本豁免（`pnpm install` 因发布龄策略自动追加）。这些豁免是精确版本、临时性的，待 `8.73.0` 系列回龄（超过仓库 `minimumReleaseAge`）后可从 `pnpm-workspace.yaml` 移除。
