---
"@pawover/kit-eslint-rules": patch
---

fix(eslint-rules): vue 组默认关闭 6 条上游已弃用的桥接规则

`eslint-plugin-vue` 的 6 条 Extension Rules 复用了 `@stylistic` 的 `create` 实现，而后者已在 `@stylistic/eslint-plugin` 中标记为弃用并统一并入 `stylistic/list-style`。消费端 lint `.vue` 文件时会产生运行时 `console.warn` 弃用告警，违背"开箱零告警"的产品定位。

本次默认关闭以下 6 条规则（不提供开关）：

- `vue/array-bracket-newline`
- `vue/array-bracket-spacing`
- `vue/array-element-newline`
- `vue/object-curly-newline`
- `vue/object-curly-spacing`
- `vue/object-property-newline`

**消费端可见影响**：

- `.vue` 模板插值 `{{ ... }}` 与指令值（如 `:data="{...}"`）内的数组括号间距 / 换行、对象花括号间距 / 换行、对象属性换行不再被这 6 条规则检查；`<script>` 块不受影响（由 `stylistic` 组覆盖）。
- 运行时弃用告警消失。

**恢复方式**：若项目侧需要保留这些检查，可在预设配置中通过 `vue: { overrides: { ... } }` 显式将对应规则改回期望的 severity（如 `"error"`）。恢复后运行时弃用告警会重现，需权衡。
