---
"@pawover/kit-eslint-rules": minor
---

BREAKING: `react` 组默认启用 React Compiler 规则切换。

- `react: true` 时默认将 10 条与 `@eslint-react` 重叠的 Compiler 规则切换为 `eslint-plugin-react-hooks` 官方实现，并关闭 `@eslint-react` 等价规则，避免重复诊断。
- 新增 `react.compiler` 选项：`false` 回退到 `@eslint-react` 实现；`"recommended"` / `true` 使用官方 `recommended` 预设；`"latest"` 额外启用实验规则 `react-hooks/void-use-memo`。
- 官方 `recommended` 中 `react-hooks/unsupported-syntax` 与 `react-hooks/incompatible-library` 为 `warn`，需要更严格时可用 `react.overrides` 提升。
- `compiler: false` 仅回退 10 条重叠规则（含 `react-hooks/globals`），官方独有的 `config` / `gating` / `incompatible-library` / `preserve-manual-memoization` 仍由 `react-hooks` 提供。
- 未启用 `react` 组的消费者不受影响。
