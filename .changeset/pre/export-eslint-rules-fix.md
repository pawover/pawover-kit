---
"@pawover/kit-eslint-rules": patch
---

fix: exports 移除指向未打包 src 的 development 条件，修复 vite/vitest 消费者解析失败
