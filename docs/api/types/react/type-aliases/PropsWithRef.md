[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [react](../index.md) / PropsWithRef

# Type Alias: PropsWithRef\<P, R\>

> **PropsWithRef**\<`P`, `R`\> = `Readonly`\<`P`\> & `object`

Defined in: [react.ts:60](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/types/src/react.ts#L60)

含 ref 的只读 Props 类型

在只读 Props 基础上增加可选的 `ref` 属性。

## Type Declaration

### ref?

> `readonly` `optional` **ref?**: `RefObject`\<`R`\>

## Type Parameters

### P

`P` = `unknown`

属性集合

### R

`R` = `unknown`

ref 指向的 DOM 元素类型

## Example

```ts
interface MyProps {
  title: string;
}
const props: PropsWithRef<MyProps, HTMLDivElement> = {
  title: "hello",
  ref: useRef<HTMLDivElement>(null),
};
```
