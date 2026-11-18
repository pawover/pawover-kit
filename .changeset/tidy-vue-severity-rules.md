---
"@pawover/kit-eslint-rules": patch
---

fix(eslint-rules): 调整 vue 组 3 条规则级别并对齐运算符换行风格

沿用「开箱即用、不假设消费端技术栈」的定位，本次把 3 条对消费端约束过强或会产生误报的规则降级 / 关闭，并修正 `vue/operator-linebreak` 与 `stylistic` 组的方向漂移。

**严重级别调整**：

- `vue/prefer-use-template-ref`：`error` → `warn`。`useTemplateRef` 是 Vue 3.5+ API，预设无法假设消费端 Vue 版本，故以警告形式提醒迁移，不阻断低于 3.5 的项目。
- `vue/require-explicit-slots`：`error` → `warn`。该规则仅对含 `lang="ts"` 的 `<script>` 生效；要求所有 slot 显式声明对透传类组件偏严格，降为警告。
- `vue/require-typed-ref`：`error` → `off`。该规则只报告 `ref()` / `ref(null)` 等无法推断的场景，关闭以避免 `.ts` 工具文件中用 `ref(null)` 作哨兵值时误报。

**运算符换行风格**：

- `vue/operator-linebreak`：`"after"` → `"before"`，与 `stylistic/operator-linebreak` 同向（运算符置于行首）；模板内三元表达式的 `?` / `:` 仍保留 `ignore` 宽赦，同时删除与主值重复的 `"|"` 覆写。

**消费端可见影响**：模板内写成「运算符置于行尾」的多行表达式将新增 `vue/operator-linebreak` 报错（可用 `vue: { overrides }` 改回 `"after"`，或用 Prettier 格式化 `.vue`）。原 `vue/prefer-use-template-ref` / `vue/require-explicit-slots` 的 error 降为 warn，CI 加 `--max-warnings 0` 的项目仍会失败；`vue/require-typed-ref` 的报错则消失。

**刻意保留的不一致**：`vue/comma-style` 维持 `error`，而 `stylistic/comma-style` 为 `off`。模板侧保留逗号位置检查，script 侧维持不强制逗号位置的宽松选择，本次不做收敛。
