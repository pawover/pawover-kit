[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [react](../index.md) / PropsWithRef

# Type Alias: PropsWithRef\<P, R\>

> **PropsWithRef**\<`P`, `R`\> = `Readonly`\<`P`\> & `object`

Defined in: [react.ts:60](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/types/src/react.ts#L60)

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
