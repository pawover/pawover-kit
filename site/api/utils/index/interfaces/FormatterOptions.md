[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / FormatterOptions

# Interface: FormatterOptions

Defined in: [currency/index.type.ts:39](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/currency/index.type.ts#L39)

货币格式化选项
- 由货币地区和 `Intl.NumberFormat` 选项组合而成
- 用于 `CurrencyUtil.currencyFormatter` 的格式化配置

## Example

```ts
import { CurrencyUtil } from "@pawover/kit/utils";
import type { FormatterOptions } from "@pawover/kit/utils";

const options: FormatterOptions = {
  locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
  currencySign: "¥",
  currencySignPosition: "start",
  currencyFormatOptions: { style: "currency", currency: "CNY" },
};

// 传入 null 时输出纯数字（无符号）
const plain: FormatterOptions = {
  locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
  currencySign: null,
  currencySignPosition: "start",
  currencyFormatOptions: { style: "currency", currency: "CNY" },
};

// 省略或传入 undefined 时保留 Intl 原生符号
const native: FormatterOptions = {
  locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
  currencyFormatOptions: { style: "currency", currency: "CNY" },
};
```

## Properties

### currencyFormatOptions

> **currencyFormatOptions**: `NumberFormatOptions`

Defined in: [currency/index.type.ts:54](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/currency/index.type.ts#L54)

`Intl.NumberFormat` 格式化选项（如 `style`、`currency`、`minimumFractionDigits` 等）

***

### currencySign?

> `optional` **currencySign?**: `string` \| `null`

Defined in: [currency/index.type.ts:50](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/currency/index.type.ts#L50)

货币符号，支持三态：
- 非空字符串：自定义符号（如 `¥`、`$`、`€`），从格式化结果中剥离后按 `currencySignPosition` 重新拼接
- `null`：输出纯数字，不显示任何符号
- `undefined` 或省略：保留 `Intl.NumberFormat` 原生符号，并按 `currencySignPosition` 对齐位置

运行时对空字符串及非字符串值（如数字、布尔、对象）不校验即忽略并回退为原生符号行为。

***

### currencySignPosition

> **currencySignPosition**: `"start"` \| `"end"`

Defined in: [currency/index.type.ts:52](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/currency/index.type.ts#L52)

货币符号的位置：`"end"` 置于金额后，其余非 `"end"` 值（含非法值）运行时统一视为 `"start"`

***

### locales

> **locales**: \[[`CurrencyLocale`](../type-aliases/CurrencyLocale.md), [`CurrencyLocale`](../type-aliases/CurrencyLocale.md)\]

Defined in: [currency/index.type.ts:41](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/currency/index.type.ts#L41)

locale 元组，第一个为货币所属地区，第二个为格式化语言，`Intl.NumberFormat` 按序尝试，前者不可用时回退后者
