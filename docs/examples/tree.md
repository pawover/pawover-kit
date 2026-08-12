# 树操作实战

`TreeUtil` 提供 6 个方法：行转树、树转行、遍历、查找、过滤、映射。内部按 `pre`（前序）/ `post`（后序）/ `breadth`（广度）三种策略分发。

## 行结构转树

菜单、部门、分类等带 `parentId` 的数据，一行转树：

```ts
import { TreeUtil } from "@pawover/kit/utils";

const rows = [
  { id: 1, parentId: null, name: "前端组" },
  { id: 2, parentId: 1, name: "基础架构" },
  { id: 3, parentId: 1, name: "业务开发" },
  { id: 4, parentId: 2, name: "构建工具" },
];

const tree = TreeUtil.rowsToTree(rows);
```

结果（所有节点补齐 `children` 数组）：

```ts
[
  {
    id: 1,
    parentId: null,
    name: "前端组",
    children: [
      { id: 2, parentId: 1, name: "基础架构", children: [{ id: 4, parentId: 2, name: "构建工具", children: [] }] },
      { id: 3, parentId: 1, name: "业务开发", children: [] },
    ],
  },
]
```

自定义字段名：

```ts
const tree = TreeUtil.rowsToTree(rows, { rowKey: "id", parentIdKey: "parentId", childrenKey: "children" });
```

缺失父节点或叶子 id 的节点会作为根节点；重复 id 取首次出现。

## 树转行

```ts
const rows = TreeUtil.treeToRows(tree);
// 每个节点浅拷贝且 children 置 undefined，便于表格展示
```

## 遍历与查找

回调接收 `(row, meta)`，`meta` 含 `depth`（深度）与 `parents`（祖先链）：

```ts
TreeUtil.forEach(tree, (row, meta) => {
  console.log(row.name, "深度:", meta.depth);
});

const target = TreeUtil.find(tree, (row) => row.id === 4);
// { id: 4, parentId: 2, name: "构建工具", children: [] }（原引用）
```

广度优先查找：

```ts
TreeUtil.find(tree, (row) => row.id === 4, { strategy: "breadth" });
```

## 过滤

输出新树，不修改原树。`pre` 策略下父节点被过滤则整个子树被过滤：

```ts
const kept = TreeUtil.filter(tree, (row) => row.name !== "业务开发");
```

## 映射

保持层级关系地改写节点内容：

```ts
const renamed = TreeUtil.map(tree, (row) => ({ ...row, name: `${row.name} (2026)` }));
```

## 组合：树 → 面包屑

```ts
function findBreadcrumb(tree: Node[], targetId: number): string[] {
  const node = TreeUtil.find(tree, (row) => row.id === targetId, {
    strategy: "pre",
  });
  return node ? [...(node.parents?.map((p) => p.name) ?? []), node.name] : [];
}
```
