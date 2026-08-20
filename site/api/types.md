# @pawover/kit-types

纯类型工具包，无运行时代码。19 个导出类型，全部经 `export type *` 导出。

## 核心类型

| 类型 | 说明 |
| :--- | :--- |
| `Primitive` | TypeScript 全部原始值类型集合（含 `null` / `undefined`） |
| `Nullish` | `null \| undefined` |
| `AnyObject<K, T>` | 任意键值对对象（值默认 `any`） |
| `PlainObject<K, T>` | 普通对象（值默认 `unknown`，比 `AnyObject` 更严格） |
| `TreeLike<T, CK>` | 递归树类型，子节点键必选（默认 `children`） |
| `TreeLikeOptionalChildren<T, CK>` | 递归树类型，子节点键可选 |
| `AnyFunction` 族 | `AnyFunction` / `AnyAsyncFunction` / `AnyGeneratorFunction` / `AnyAsyncGeneratorFunction` / `VoidFunction` |
| `IsPrimitive<T>` | 条件类型：`T` 为原始类型则 `true` |
| `HasStringIndex<T>` | 条件类型：`T` 具 string 索引签名则 `true` |
| `AdvancedRecord<K, A, mode>` | 按模式组合的映射类型，控制字段必选/可选与只读/可写 |
| `ApiNameCheck<N, P>` | 递归校验命名仅含大写字母与下划线 |

## React 子路径

```ts
import type { Props, PropsWithChildren, PropsWithRef } from "@pawover/kit/types/react";
```

`Props<P>`（只读 Props）、`PropsWithChildren<P>`（+ 可选 `children`）、`PropsWithRef<P, R>`（+ 可选 `ref`）。

## 用法

```ts
import type { AnyObject, PlainObject, TreeLike } from "@pawover/kit/types";

const obj: AnyObject = { a: 1, b: "2" };

interface TreeNode extends TreeLike<TreeNode> {
  id: number;
  name: string;
}
```

## 完整参考

- [全部导出（自动生成）](types/) —— 每个类型的签名与 JSDoc 说明
