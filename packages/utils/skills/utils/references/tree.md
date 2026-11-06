# Tree operations

`TreeUtil` works with nodes that have a row key (`id` by default), a parent row
key (`parentId` by default), and a children key (`children` by default). Use the
options object to match an existing schema.

## Build a tree from rows

`rowsToTree` shallow-copies each row, links children under the parent, and fills
every node with a `children` array. Duplicate ids use the first row. A row whose
parent is missing, nullish, or itself becomes a root.

```ts
import { TreeUtil } from "@pawover/kit-utils";

interface MenuRow {
  id: number;
  parentId: number | null;
  name: string;
}

const rows: MenuRow[] = [
  { id: 1, parentId: null, name: "Root" },
  { id: 2, parentId: 1, name: "Child" },
  { id: 3, parentId: 1, name: "Sibling" },
  { id: 4, parentId: 2, name: "Leaf" },
];

const tree = TreeUtil.rowsToTree(rows);
// [{ id: 1, parentId: null, name: "Root", children: [
//   { id: 2, parentId: 1, name: "Child", children: [
//     { id: 4, parentId: 2, name: "Leaf", children: [] }
//   ] },
//   { id: 3, parentId: 1, name: "Sibling", children: [] }
// ] }]
```

Custom field names:

```ts
import { TreeUtil } from "@pawover/kit-utils";

const tree = TreeUtil.rowsToTree(
  [{ key: 1, parent: null }, { key: 2, parent: 1 }],
  { rowKey: "key", parentIdKey: "parent" },
);
```

If a parent's `children` key exists but is not an array, `rowsToTree` throws. The
same check runs for every node before returning.

## Flatten a tree

`treeToRows` traverses the tree and returns shallow copies with `children` set to
`undefined`. It accepts a single node or an array.

```ts
import { TreeUtil } from "@pawover/kit-utils";

const rows = TreeUtil.treeToRows(tree);
// [{ id: 1, ..., children: undefined }, { id: 2, ..., children: undefined }, ...]
```

## Traverse, find, filter, and map

All four operations accept `{ childrenKey, strategy, getChildrenKey }`.
`strategy` is `"pre"` (default), `"post"`, or `"breadth"`.

| Method | Return | Reference behavior |
| --- | --- | --- |
| `forEach(tree, cb, options?)` | `void` | Visits original nodes. |
| `find(tree, cb, options?)` | `T \| undefined` | Returns the original node reference. |
| `filter(tree, cb, options?)` | New tree or `undefined` | Returns a new tree of shallow copies. |
| `map(tree, cb, options?)` | New tree | Returns a new tree; the callback result replaces each node. |

Callbacks receive `(row, meta)`. `meta.depth` is the depth from the current root;
`meta.parents` is the ancestor array. The returned `find` result does not carry
the meta object, so capture ancestors inside the callback when a breadcrumb is
needed.

```ts
import { TreeUtil } from "@pawover/kit-utils";

let breadcrumb: string[] = [];

TreeUtil.find(tree, (row, meta) => {
  if (row.id === 4) {
    breadcrumb = [...(meta.parents ?? []).map((parent) => parent.name), row.name];
    return true;
  }
  return false;
});

// breadcrumb: ["Root", "Child", "Leaf"]
```

`filter` keeps the tree shape. With `pre`, rejecting a node stops descent, so its
descendants are never visited. With `post`, descendants are visited first, but a
rejected parent still removes its subtree from the final result. The difference
is traversal order and side effects, not a way to keep children under a rejected
parent.

```ts
import { TreeUtil } from "@pawover/kit-utils";

const visible = TreeUtil.filter(tree, (row) => row.name !== "Sibling");
// Root -> Child -> Leaf; Sibling and its subtree are removed

const renamed = TreeUtil.map(tree, (row) => ({ ...row, name: row.name.toUpperCase() }));
```

`map` replaces each node with the callback result and reattaches the mapped
children. Returning a node without the original fields is allowed, but the
children key is set by `TreeUtil`.

## Custom children keys and dynamic children

Use `childrenKey` when the tree uses a different field. `getChildrenKey` is
available when the children field varies by node or depth; it receives the node
and meta and returns the key for that node.

```ts
import { TreeUtil } from "@pawover/kit-utils";

TreeUtil.forEach(tree, (row) => row.name, { childrenKey: "items" });
TreeUtil.find(tree, (row) => row.id === 4, {
  getChildrenKey: (row) => ("items" in row ? "items" : "children"),
});
```

## Common mistakes

- Mutating the node returned by `find` mutates the original tree. Use `map` or
  `filter` for a new tree.
- `filter` with `pre` does not visit descendants of a rejected node. Do not put
  required cleanup in a filter callback when the parent may be rejected.
- `filter` sets the children key on returned nodes; when the source had no
  children key, the result may have `children: undefined` rather than `[]`.
- `rowsToTree` uses the first row for a duplicate id and only emits each root
  once; do not rely on later duplicates to replace earlier data.
- The input rows are shallow-copied. Nested objects are shared with the input.
