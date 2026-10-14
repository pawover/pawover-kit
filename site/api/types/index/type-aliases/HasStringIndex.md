[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / HasStringIndex

# Type Alias: HasStringIndex\<T\>

> **HasStringIndex**\<`T`\> = `string` *extends* keyof `T` ? `true` : `false`

Defined in: [base.ts:205](https://github.com/pawover/pawover-kit/blob/8bbcd05722997f38c09e1ba2d94b79973ae2f68b/packages/types/src/base.ts#L205)

判断是否具有索引签名

若 `T` 可被字符串索引（具有 string 索引签名）则结果为 `true`，否则为 `false`。

## Type Parameters

### T

`T`

待判断的类型

## Example

```ts
type A = HasStringIndex<Record<string, number>>; // true
type B = HasStringIndex<{ a: 1 }>; // false
```
