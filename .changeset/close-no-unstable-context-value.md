---
"@pawover/kit-eslint-rules": patch
---

React Compiler 规则切换默认关闭 `react/no-unstable-context-value`。

React Compiler 会自动记忆化 Context value，该规则在 `compiler` 开启时会产生不再适用的告警；`react.compiler: false` 时仍恢复 `@eslint-react` 的默认级别。
