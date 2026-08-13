---
"@pawover/kit-hooks": patch
---

fix(hooks): useResponsive 实例 token 覆盖不再改写模块级默认表，改为按 token 签名共享计算结果（单 resize 监听器，token 相同的实例共享一次计算）
