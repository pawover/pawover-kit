---
"@pawover/kit-eslint-rules": minor
---

feat(eslint-rules): 新增风格快捷开关（`stylistic` / `vue`）

`stylistic` 组新增 `quotes` / `semi` 快捷项：

- `quotes: "single" | "double"` 同时切换 `stylistic/quotes` 与 `stylistic/jsx-quotes`
- `semi: false` 联动 `stylistic/member-delimiter-style`（`multiline.delimiter: "none"`、`requireLast: false`、`singleline.delimiter: "comma"`）
- 不联动规则：`semi-spacing` / `semi-style` / `no-extra-semi` / `quote-props` / `vue/html-quotes`（HTML 属性引号恒为 double）；`quotes` 不注入 `allowTemplateLiterals`

`vue` 组新增命名快捷项 `naming` / `templateNaming` / `attributeNaming` / `eventNaming`，取值 `"PascalCase" | "camelCase" | "kebab-case"`；总开关 `naming` 一次设定模板标签 / 组件属性 / 自定义事件三条规则，单项优先。

优先级链：`overrides` > 单项 > 总开关 > 规则映射默认值。

新增类型 `StylisticOptions` / `StylisticQuotes` / `VueOptions` / `VueNamingCasing`，原 `{ overrides }` 用法继续兼容。
