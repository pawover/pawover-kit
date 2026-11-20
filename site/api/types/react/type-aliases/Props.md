[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [react](../index.md) / Props

# Type Alias: Props\<P\>

> **Props**\<`P`\> = `Readonly`\<`P`\>

Defined in: [react.ts:19](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/types/src/react.ts#L19)

只读 Props 类型

将任意属性集合转换为只读的组件 Props 类型。

## Type Parameters

### P

`P` = `unknown`

属性集合

## Example

```ts
interface MyProps {
  title: string;
}
const props: Props<MyProps> = { title: "hello" };
// props.title = "x"; // ❌ 只读，无法修改
```
