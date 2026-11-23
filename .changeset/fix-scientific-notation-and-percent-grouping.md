---
"@pawover/kit-utils": patch
---

修复 `CurrencyUtil.toRealValue` 对科学计数法数值的有损转换（`1e-7` 不再变成 `17`），`toBignumber` 对数字与纯数值字符串直接走 `bignumber`，脏文本仍保留抽数能力；同时为 `CurrencyUtil.percentFormat` / `CurrencyUtil.percentText` 增加 `useGrouping` 选项以支持关闭千分位。
