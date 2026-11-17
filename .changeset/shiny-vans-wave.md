---
"@pawover/kit-eslint-rules": patch
---

fix(eslint-rules): 为 `.vue` 文件挂载 vue processor 并放行 `.vue` 扩展名

`vue` 组启用时，为 `.vue` 文件挂载 `vue/vue` processor，用于消费 `vue/comment-directive` 的内部消息，避免 `clear` 类消息以 error 形式出现在 lint 结果中。

与 `typescript` 同开时，`.vue` 会并入 TypeScript parser 的 `parserOptions.extraFileExtensions`（用户已有的同名项保持在前并去重合并），解决 `.vue` 单文件组件 script 块报「extension for the file (`.vue`) is non-standard」的问题；未启用 `vue` 时 `extraFileExtensions` 原样透传。

边界：本次改动不解决 `.vue` 文件未被项目 tsconfig 覆盖时的 project-service 报错，消费端仍需将 `.vue` 纳入 tsconfig 的 `include`。
