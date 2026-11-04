# @pawover/kit-eslint-rules

自包含 ESLint flat config 预设：9 个规则组、793 条规则，全部上游插件随包精确锁定并自动注册。只需安装本包即可使用，无需另行安装或注册插件。

## 规则组

| 规则组 | 规则数 | 启用方式 |
| :--- | :--- | :--- |
| `javascript` | 199 | 常开 |
| `typescript` | 130 | `typescript: true` |
| `vue` | 248 | `vue: true` |
| `react` | 87 | `react: true`（同时含 `reactHooks`，默认开启 Compiler 规则切换） |
| `stylistic` | 89 | `stylistic: true` |
| `reactHooks` | 18 | 随 `react: true` |
| `antfu` | 11 | `antfu: true` |
| `imports` | 9 | `imports: true` |
| `importsSort` | 2 | `importsSort: true` |

## 导出

| 导出 | 说明 |
| :--- | :--- |
| 默认导出 `pawover(options?, ...userConfigs)` | flat config 工厂：返回 `FlatConfigComposer`（继承 Promise，可直接导出，也可链式 `append` / `override` / `renamePlugins`）；每组建 `setup`（插件注册，无 `files`）/ `rules`（规则 + 文件范围）/ `parser` / `type-aware` 层（`javascript` 拆 `parser` + `rules`） |
| `GLOB_EXCLUDE` | 全局忽略目录 glob 集合（`pawover/ignores` 层的 `ignores` 值） |
| `GLOB_SOURCE` / `GLOB_TYPESCRIPT` / `GLOB_VUE` / `GLOB_JSX` | 各规则组使用的文件 glob 常量 |
| 类型 | `PawoverOptions` / `ConfigNames` / `ConfigLayer` / `PawoverUserConfig` / `RuleMap` / `RulesOverrideOptions` / `TypeScriptOptions` / `ReactOptions` / `ReactCompilerPreset` / `Severity` 族 / `RuleConfig` |

## 用法

```ts
import pawover from "@pawover/kit/eslint-rules";

export default pawover({
  typescript: {
    overrides: { "ts/strict-void-return": [1, { allowReturnAny: true }] },
  },
  react: true,
});
```

按层名称精确定位覆盖：

```ts
export default pawover({ typescript: true })
  .override("pawover/typescript/rules", {
    rules: { "ts/consistent-type-definitions": ["error", "interface"] },
  });
```

## 完整参考

- [全部导出（自动生成）](eslint-rules/) —— 工厂签名与类型定义
- [配置实战](/examples/eslint-config) —— 完整 flat config 示例
