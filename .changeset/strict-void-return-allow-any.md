---
"@pawover/kit-eslint-rules": minor
---

`ts/strict-void-return` 默认开启 `allowReturnAny: true`。

- 允许返回 `any` 的函数传入接受 `void` 的位置，减少 React 事件回调与异步回调中的误报。
- 需要更严格检查时，可通过 `typescript.overrides` 覆盖该规则。
