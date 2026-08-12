[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / VoidFunction

# Type Alias: VoidFunction

> **VoidFunction** = () => `void`

Defined in: [global.ts:189](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/types/src/global.ts#L189)

描述无返回值函数

不接受参数且返回 `void` 的函数类型。

## Returns

`void`

## Example

```ts
const fn: VoidFunction = () => {
  console.log("hello");
};
```
