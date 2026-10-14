[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / IsPrimitive

# Type Alias: IsPrimitive\<T\>

> **IsPrimitive**\<`T`\> = `T` *extends* [`Primitive`](Primitive.md) ? `true` : `false`

Defined in: [base.ts:190](https://github.com/pawover/pawover-kit/blob/8bbcd05722997f38c09e1ba2d94b79973ae2f68b/packages/types/src/base.ts#L190)

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
