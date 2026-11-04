# @pawover/kit-eslint-rules

自包含 ESLint flat config 预设：9 个规则组、792 条规则，全部上游插件随包精确锁定并自动注册。只需安装本包即可使用，无需另行安装或注册插件。

## 规则组

| 规则组 | 规则数 | 启用方式 |
| :--- | :--- | :--- |
| `javascript` | 199 | 常开 |
| `typescript` | 130 | `typescript: true` |
| `vue` | 248 | `vue: true` |
| `react` | 87 | `react: true`（同时含 `reactHooks`） |
| `stylistic` | 89 | `stylistic: true` |
| `reactHooks` | 17 | 随 `react: true` |
| `antfu` | 11 | `antfu: true` |
| `imports` | 9 | `imports: true` |
| `importsSort` | 2 | `importsSort: true` |

## 导出

| 导出 | 说明 |
| :--- | :--- |
| 默认导出 `pawover(options?)` | flat config 工厂：按选项装配插件注册与规则层，返回配置数组 |
| `GLOB_EXCLUDE` | 全局忽略目录 glob 集合（工厂返回值首项即包含） |
| 类型 | `PawoverOptions` / `Severity` / `SeverityLevel` / `SeverityName` / `RuleConfig` |

## 用法

```ts
import pawover from "@pawover/kit/eslint-rules";

export default pawover({ typescript: true, react: true });
```

## 完整参考

- [全部导出（自动生成）](eslint-rules/) —— 工厂签名与类型定义
- [配置实战](/examples/eslint-config) —— 完整 flat config 示例
