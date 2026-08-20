[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [react](../index.md) / PropsWithChildren

# Type Alias: PropsWithChildren\<P\>

> **PropsWithChildren**\<`P`\> = `Readonly`\<`P`\> & `object`

Defined in: [react.ts:39](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/types/src/react.ts#L39)

含 children 的只读 Props 类型

在只读 Props 基础上增加可选的 `children` 属性。

## Type Declaration

### children?

> `readonly` `optional` **children?**: `ReactNode`

## Type Parameters

### P

`P` = `unknown`

属性集合

## Example

```ts
interface MyProps {
  title: string;
}
const props: PropsWithChildren<MyProps> = {
  title: "hello",
  children: <span>content</span>,
};
```
