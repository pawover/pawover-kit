# @pawover/kit-types

纯类型工具包，无运行时代码。18 个导出类型，全部经 `export type *` 导出。

## 核心类型

| 类型 | 说明 |
| :--- | :--- |
| `Primitive` | TypeScript 全部原始值类型集合（含 `null` / `undefined`） |
| `Nullish` | `null \| undefined` |
| `AnyObject<K, T>` | 任意键值对对象（值默认 `any`） |
| `PlainObject<K, T>` | 普通对象（值默认 `unknown`，比 `AnyObject` 更严格） |
| `TreeLike<T, CK>` | 递归树类型，子节点键必选（默认 `children`） |
| `TreeLikeOptionalChildren<T, CK>` | 递归树类型，子节点键可选 |
| `AnyFunction` 族 | `AnyFunction` / `AnyAsyncFunction` / `AnyGeneratorFunction` / `AnyAsyncGeneratorFunction` |
| `IsPrimitive<T>` | 条件类型：`T` 为原始类型则 `true` |
| `HasStringIndex<T>` | 条件类型：`T` 具 string 索引签名则 `true` |
| `AdvancedRecord<K, A, mode>` | 按模式组合的映射类型，控制字段必选/可选与只读/可写 |
| `AdvancedRecordMode` | 记录模式二元组（必选/可选 × 读写权限），供 `AdvancedRecord` 使用 |
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

## 全局使用（tsconfig `types`）

无需逐处 `import`：把全局入口填入 tsconfig `types` 数组，类型即在整个项目全局可用：

```json
{
  "compilerOptions": {
    "types": ["@pawover/kit/types/global", "@pawover/kit/types/react/global"]
  }
}
```

| 全局入口 | 内容 | 子包直引等价形式 |
| :--- | :--- | :--- |
| `@pawover/kit/types/global` | 全部 15 个基础类型 | `@pawover/kit-types/global` |
| `@pawover/kit/types/react/global` | `Props` / `PropsWithChildren` / `PropsWithRef` | `@pawover/kit-types/react/global` |

- 全局入口只做注入，不替代模块导入；两者可共存（`import` 的局部名会遮蔽同名全局类型）
- `react/global` 需项目已安装 `react` 与 `@types/react`
- **使用 unplugin-auto-import 之类的类型提升工具时**，请将本包类型从其生成范围中排除，或用本节 `types` 方案替代——工具生成的 `type X = ...` 提升声明会与全局注入/模块导出重复导致冲突
- **`VoidFunction` 已移除**（与 lib.dom / lib.webworker 内置同名类型冲突，无法合并）：DOM / WebWorker 环境请直接使用内置 `VoidFunction`，其余环境使用 `() => void`

## 完整参考

- [全部导出（自动生成）](types/) —— 每个类型的签名与 JSDoc 说明
