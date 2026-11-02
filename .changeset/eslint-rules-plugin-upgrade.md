---
"@pawover/kit-eslint-rules": minor
---

升级内嵌 ESLint 插件依赖并同步规则映射：

- `@eslint-react/eslint-plugin` 5.26.1 → 5.28.8（规则集不变，含多项假阳性/假阴性修复）
- `eslint-plugin-antfu` 3.2.3 → 3.3.1（新增 `antfu/reasonable-newline`）
- `eslint-plugin-simple-import-sort` 13.0.0 → 14.0.0（支持字符串形式模块名的排序）
- `eslint-plugin-vue` 10.10.0 → 10.12.0（新增 `vue/no-content-outside-block`、`vue/no-define-model-default`、`vue/no-props-shadow`、`vue/no-shadow-native-events` 四条规则）
- `typescript-eslint` 8.71.1 → 8.72.1（`await-thenable` 新增 `allowMixedPromiseArrays` 选项）

新增的 4 条 Vue 规则按 `error` 启用；`antfu/reasonable-newline` 默认关闭——其默认行长阈值（40）与仓库 Prettier `printWidth: 120` 的排版职责重叠，直接启用会对现有代码产生大面积格式改动，留待单独评估。
