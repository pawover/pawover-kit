[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / TreeLike

# Type Alias: TreeLike\<T, CK\>

> **TreeLike**\<`T`, `CK`\> = `T` & `Record`\<`CK`, `TreeLike`\<`T`, `CK`\>[]\>

Defined in: [global.ts:81](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/types/src/global.ts#L81)

描述树类型

递归结构：每个节点都包含子树节点数组（子节点键名默认为 `children`）。

## Type Parameters

### T

`T` *extends* [`AnyObject`](AnyObject.md)

节点基础类型（需为对象类型）

### CK

`CK` *extends* `string` = `"children"`

子节点键名

## Example

```ts
interface Node {
  id: number;
  name: string;
}
const tree: TreeLike<Node> = {
  id: 1,
  name: "root",
  children: [{ id: 2, name: "leaf", children: [] }],
};
```
