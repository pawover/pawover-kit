[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / HasStringIndex

# Type Alias: HasStringIndex\<T\>

> **HasStringIndex**\<`T`\> = `string` *extends* keyof `T` ? `true` : `false`

Defined in: [global.ts:219](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/types/src/global.ts#L219)

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
