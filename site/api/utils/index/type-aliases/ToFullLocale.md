[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / ToFullLocale

# Type Alias: ToFullLocale\<T\>

> **ToFullLocale**\<`T`\> = `T` *extends* `` `${string}-${string}` `` ? `T` : `Lowercase`\<`T`\> *extends* keyof [`PrimaryLanguageEnum`](PrimaryLanguageEnum.md) ? [`PrimaryLanguageEnum`](PrimaryLanguageEnum.md)\[`Lowercase`\<`T`\>\] : `T`

Defined in: [i18n/index.type.ts:52](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/i18n/index.type.ts#L52)

规范化为完整 Locale（语言 + 地区）的结果类型
- 输入为基础语言码（如 `"en"`，大小写不敏感）时，按 `PrimaryLanguageEnum` 映射为对应首选完整 Locale 字面量（如 `"en-US"`）
- 输入已含地区后缀（如 `"en-US"` / `"en-us"`）时，原样保留
- 未匹配输入（如 `"xx"`）时，原样保留

## Type Parameters

### T

`T` *extends* `string`

## Example

```ts
type A = ToFullLocale<"en">; // "en-US"
type B = ToFullLocale<"en-US">; // "en-US"
type C = ToFullLocale<"xx">; // "xx"
```
