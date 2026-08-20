[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / TreeLikeOptionalChildren

# Type Alias: TreeLikeOptionalChildren\<T, CK\>

> **TreeLikeOptionalChildren**\<`T`, `CK`\> = `T` & `{ [K in CK]?: TreeLikeOptionalChildren<T, CK>[] }`

Defined in: [global.ts:105](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/types/src/global.ts#L105)

描述可选子节点树类型

递归结构：每个节点都可省略子节点键（子节点键名默认为 `children`）。

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
const leaf: TreeLikeOptionalChildren<Node> = { id: 2, name: "leaf" };
const root: TreeLikeOptionalChildren<Node> = {
  id: 1,
  name: "root",
  children: [leaf],
};
```
