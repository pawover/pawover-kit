[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / VoidFunction

# Type Alias: VoidFunction

> **VoidFunction** = () => `void`

Defined in: [global.ts:189](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/types/src/global.ts#L189)

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
