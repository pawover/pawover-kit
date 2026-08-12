[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / HasStringIndex

# Type Alias: HasStringIndex\<T\>

> **HasStringIndex**\<`T`\> = `string` *extends* keyof `T` ? `true` : `false`

Defined in: [global.ts:219](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/types/src/global.ts#L219)

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
