# @pawover/kit-eslint-rules

ESLint 规则集：9 个规则组、784 条规则，默认导出聚合全部。适配 flat config。

## 规则组

| 规则组 | 规则数 | 适用 |
| :--- | :--- | :--- |
| `javascript` | 196 | 原生 JS |
| `typescript` | 122 | TS 项目 |
| `vue` | 244 | Vue 项目 |
| `stylistic` | 92 | 风格统一 |
| `react` | 91 | React 项目 |
| `reactHooks` | 17 | React Hooks |
| `antfu` | 11 | antfu 风格 |
| `imports` | 9 | 导入规范 |
| `importsSort` | 2 | 导入排序 |

## 导出

| 导出 | 说明 |
| :--- | :--- |
| `GLOB_EXCLUDE` | 全局忽略目录 glob 集合（依赖/构建产物/锁文件/编辑器目录/缓存等） |
| `createRules(rule, prefix?)` | 从规则组取全部规则，可选改写命名空间前缀 |
| 类型 | `Severity` / `SeverityLevel` / `SeverityName` / `RuleConfig` |

## 用法

```ts
import eslintRules from "@pawover/kit/eslint-rules";

export default [
  { ignores: eslintRules.GLOB_EXCLUDE },
  { files: ["**/*.ts"], rules: { ...eslintRules.javascript, ...eslintRules.typescript } },
];
```

> [!NOTE]
> `preset.ts`（缩进 + 类成员排序预设）为仓库内部使用，不导出。

## 完整参考

- [全部导出（自动生成）](eslint-rules/) —— 规则组结构与类型定义
- [配置实战](/examples/eslint-config) —— 完整 flat config 示例
