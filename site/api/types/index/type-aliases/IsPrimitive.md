[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / IsPrimitive

# Type Alias: IsPrimitive\<T\>

> **IsPrimitive**\<`T`\> = `T` *extends* [`Primitive`](Primitive.md) ? `true` : `false`

Defined in: [global.ts:204](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/types/src/global.ts#L204)

判断是否为原始类型

若 `T` 为原始类型则结果为 `true`，否则为 `false`。

## Type Parameters

### T

`T`

待判断的类型

## Example

```ts
type A = IsPrimitive<string>; // true
type B = IsPrimitive<{ a: 1 }>; // false
```
