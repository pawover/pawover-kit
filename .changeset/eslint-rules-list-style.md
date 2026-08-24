---
"@pawover/kit-eslint-rules": patch
---

将 7 条在 `@stylistic` v6 中废弃的规则（`array-bracket-newline`、`array-bracket-spacing`、`array-element-newline`、`function-call-argument-newline`、`function-paren-newline`、`object-curly-newline`、`object-curly-spacing`）统一迁移至 `list-style` 规则，并升级 peerDependency `@stylistic/eslint-plugin` 至 `^6.0.0-beta.6` 以与根依赖保持一致。
