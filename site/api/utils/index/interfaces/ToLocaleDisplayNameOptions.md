[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / ToLocaleDisplayNameOptions

# Interface: ToLocaleDisplayNameOptions

Defined in: [i18n/index.type.ts:30](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/i18n/index.type.ts#L30)

`I18nUtil.toLocaleDisplayName` 的选项
- 名称数据由 `Intl.DisplayNames`（CLDR）提供，展示语言缺省跟随运行环境

## Example

```ts
import { I18nUtil } from "@pawover/kit/utils";
import type { ToLocaleDisplayNameOptions } from "@pawover/kit/utils";

const options: ToLocaleDisplayNameOptions = {
  language: "zh", // 展示语言（缺省跟随运行环境）
  type: "region", // 名称类型（缺省按输入形态推断）
  fallback: "未知", // 未匹配或非法输入的回退值（缺省原样返回输入）
};

I18nUtil.toLocaleDisplayName("US", options); // "美国"
```

## Properties

### fallback?

> `optional` **fallback?**: `string`

Defined in: [i18n/index.type.ts:36](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/i18n/index.type.ts#L36)

未匹配或非法输入时的回退值，缺省原样返回输入

***

### language?

> `optional` **language?**: `string`

Defined in: [i18n/index.type.ts:32](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/i18n/index.type.ts#L32)

展示语言（BCP 47，如 `"zh"`、`"en"`），缺省跟随运行环境（`Intl.DisplayNames` 默认 locale）

***

### type?

> `optional` **type?**: [`ToLocaleDisplayNameType`](../type-aliases/ToLocaleDisplayNameType.md)

Defined in: [i18n/index.type.ts:34](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/utils/src/i18n/index.type.ts#L34)

名称类型，缺省按输入形态推断：2 字母大写（国家/地区代码）→ `"region"`，其余（语言子标签 / 完整 Locale）→ `"language"`
