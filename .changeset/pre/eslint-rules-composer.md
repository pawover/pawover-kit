---
"@pawover/kit-eslint-rules": minor
---

BREAKING: 预设装配重构为 `FlatConfigComposer`。

- `pawover()` 现在返回 composer（继承 Promise），可直接作为 `eslint.config.js` 默认导出，并支持 `append` / `prepend` / `override` / `renamePlugins` 链式组合。
- 每个规则组拆为 `setup`（无 `files`，只注册插件）/ `rules`（规则 + 文件范围）/ `parser` / `type-aware` 层，每层带唯一 `name`；`javascript` 拆出 `parser` + `rules`，无插件可注册的组不产生 `setup`。
- 新增按组 `overrides`；`typescript` / `react` 支持 `overridesTypeAware`，`typescript` 支持 `filesTypeAware`（同时收窄 react type-aware 层，react 额外并入 `GLOB_JSX`）。
- 新增 `GLOB_SOURCE` / `GLOB_TYPESCRIPT` / `GLOB_VUE` / `GLOB_JSX` 导出。
- 新增公开类型 `RuleMap` / `ConfigLayer` / `PawoverUserConfig` / `RulesOverrideOptions` / `TypeScriptOptions` / `ReactOptions`。
- 启用 `antfu/reasonable-newline`，发布包默认行宽 120；`*.type.ts` / `*.test.ts` 的宽版 240 属消费端个性化配置（本仓库在根 `eslint.config.js` 覆盖），不随包发布。
- 移除顶层 `parserOptions`，改用 `typescript.parserOptions`。
- 移除工厂 `ignores` / `renamePlugins` 选项：全局忽略改用追加配置层或 `override("pawover/ignores", ...)`，插件重命名改用 composer 的 `.renamePlugins()`。
- 移除数组返回语义；旧用法 `[...pawover()]` 需改为直接导出 composer、使用 `.append()` 或 `await`。
