[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / ToBaseLanguage

# Type Alias: ToBaseLanguage\<T\>

> **ToBaseLanguage**\<`T`\> = `T` *extends* `` `${infer B}-${string}` `` ? `B` : `T`

Defined in: [i18n/index.type.ts:69](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/i18n/index.type.ts#L69)

提取基础语言码（去掉地区后缀）的结果类型
- 输入为 `语言-地区` 形状（如 `"en-US"`）时，提取 `-` 前的语言码（如 `"en"`）
- 其余输入原样保留

## Type Parameters

### T

`T` *extends* `string`

## Example

```ts
type A = ToBaseLanguage<"en-US">; // "en"
type B = ToBaseLanguage<"en">; // "en"
```
