[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / TreeUtil

# Class: TreeUtil

Defined in: [tree/treeUtil.ts:16](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/tree/treeUtil.ts#L16)

树结构工具类

引用策略约定：
- 转换类方法（`rowsToTree` / `treeToRows` / `filter` / `map`）：不突变输入；输出的每个节点均为**新对象引用**（来源节点的浅拷贝，仅自有可枚举属性；非枚举属性、原型链、getter 及深层嵌套对象不保证）。
- 查询类方法（`find` / `forEach`）：按查询语义直接使用**原对象引用**。

## Constructors

### Constructor

> **new TreeUtil**(): `TreeUtil`

#### Returns

`TreeUtil`

## Methods

### filter()

#### Call Signature

> `static` **filter**\<`T`, `CK`\>(`tree`, `callback`, `options?`): `T`[]

Defined in: [tree/treeUtil.ts:222](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/tree/treeUtil.ts#L222)

过滤树节点
- 返回新的树结构，包含所有回调返回 true 的节点
- 如果父节点被过滤，则其子节点也会被过滤 (pre 策略下)

##### Type Parameters

###### T

`T` *extends* `AnyObject`

###### CK

`CK` *extends* `string` = `"children"`

##### Parameters

###### tree

`T`[]

树结构数据

###### callback

`TreeFilterCallback`\<`T`\>

回调函数

###### options?

`TreeFilterOptions`\<`T`, `CK`\>

配置项 (childrenKey, strategy等)

##### Returns

`T`[]

过滤后的树结构数组

##### Example

```ts
const tree = [{ id: 1, visible: true, children: [{ id: 2, visible: false }] }];

// 重载 1: 传入树数组
TreeUtil.filter(tree, (node) => node.visible); // [{ id: 1, visible: true, children: [] }]

// 重载 2: 传入单个树节点
TreeUtil.filter(tree[0], (node) => node.visible); // { id: 1, visible: true, children: [] }
```

#### Call Signature

> `static` **filter**\<`T`, `CK`\>(`tree`, `callback`, `options?`): `T`

Defined in: [tree/treeUtil.ts:223](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/tree/treeUtil.ts#L223)

过滤树节点
- 返回新的树结构，包含所有回调返回 true 的节点
- 如果父节点被过滤，则其子节点也会被过滤 (pre 策略下)

##### Type Parameters

###### T

`T` *extends* `AnyObject`

###### CK

`CK` *extends* `string` = `"children"`

##### Parameters

###### tree

`T`

树结构数据

###### callback

`TreeFilterCallback`\<`T`\>

回调函数

###### options?

`TreeFilterOptions`\<`T`, `CK`\>

配置项 (childrenKey, strategy等)

##### Returns

`T`

过滤后的树结构数组

##### Example

```ts
const tree = [{ id: 1, visible: true, children: [{ id: 2, visible: false }] }];

// 重载 1: 传入树数组
TreeUtil.filter(tree, (node) => node.visible); // [{ id: 1, visible: true, children: [] }]

// 重载 2: 传入单个树节点
TreeUtil.filter(tree[0], (node) => node.visible); // { id: 1, visible: true, children: [] }
```

***

### find()

> `static` **find**\<`T`, `CK`\>(`tree`, `callback`, `options?`): `T` \| `undefined`

Defined in: [tree/treeUtil.ts:183](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/tree/treeUtil.ts#L183)

查找树节点
- 返回第一个回调返回 true 的节点

#### Type Parameters

##### T

`T` *extends* `AnyObject`

##### CK

`CK` *extends* `string` = `"children"`

#### Parameters

##### tree

`T` \| `T`[]

树结构数据

##### callback

`TreeFindCallback`\<`T`\>

回调函数

##### options?

`TreeFindOptions`\<`T`, `CK`\> = `{}`

配置项

#### Returns

`T` \| `undefined`

找到的节点，未找到则返回 undefined

#### Example

```ts
const tree = [{ id: 1, children: [{ id: 2 }] }];
TreeUtil.find(tree, (node) => node.id === 2); // { id: 2, ... }
```

***

### forEach()

> `static` **forEach**\<`T`, `CK`\>(`tree`, `callback`, `options?`): `void`

Defined in: [tree/treeUtil.ts:155](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/tree/treeUtil.ts#L155)

遍历树节点

#### Type Parameters

##### T

`T` *extends* `AnyObject`

##### CK

`CK` *extends* `string` = `"children"`

#### Parameters

##### tree

`T` \| `T`[]

树结构数据

##### callback

`TreeForeachCallback`\<`T`\>

回调函数

##### options?

`TreeForeachOptions`\<`T`, `CK`\> = `{}`

配置项

#### Returns

`void`

#### Example

```ts
const tree = [{ id: 1, children: [{ id: 2 }] }];
const ids: number[] = [];
TreeUtil.forEach(tree, (node) => ids.push(node.id)); // ids: [1, 2] (pre-order default)
```

***

### map()

#### Call Signature

> `static` **map**\<`R`, `T`, `CK`\>(`tree`, `callback`, `options?`): `TreeLike`\<`R`, `CK`\>[]

Defined in: [tree/treeUtil.ts:253](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/tree/treeUtil.ts#L253)

映射树节点
- 返回新的树结构，保持层级关系

##### Type Parameters

###### R

`R` *extends* `AnyObject`

###### T

`T` *extends* `AnyObject`

###### CK

`CK` *extends* `string` = `"children"`

##### Parameters

###### tree

`T`[]

树结构数据

###### callback

`TreeMapCallback`\<`R`, `T`\>

回调函数 (返回映射后的节点内容)

###### options?

`TreeMapOptions`\<`T`, `CK`\>

配置项

##### Returns

`TreeLike`\<`R`, `CK`\>[]

映射后的树结构数组

##### Example

```ts
const tree = [{ id: 1, val: 10, children: [{ id: 2, val: 20 }] }];

// 重载 1: 传入树数组
TreeUtil.map(tree, (node) => ({ ...node, val: node.val * 2 }));
// [{ id: 1, val: 20, children: [{ id: 2, val: 40 }] }]

// 重载 2: 传入单个树节点
TreeUtil.map(tree[0], (node) => ({ ...node, val: node.val * 2 }));
// { id: 1, val: 20, children: [{ id: 2, val: 40 }] }
```

#### Call Signature

> `static` **map**\<`R`, `T`, `CK`\>(`tree`, `callback`, `options?`): `TreeLike`\<`R`, `CK`\>

Defined in: [tree/treeUtil.ts:254](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/tree/treeUtil.ts#L254)

映射树节点
- 返回新的树结构，保持层级关系

##### Type Parameters

###### R

`R` *extends* `AnyObject`

###### T

`T` *extends* `AnyObject`

###### CK

`CK` *extends* `string` = `"children"`

##### Parameters

###### tree

`T`

树结构数据

###### callback

`TreeMapCallback`\<`R`, `T`\>

回调函数 (返回映射后的节点内容)

###### options?

`TreeMapOptions`\<`T`, `CK`\>

配置项

##### Returns

`TreeLike`\<`R`, `CK`\>

映射后的树结构数组

##### Example

```ts
const tree = [{ id: 1, val: 10, children: [{ id: 2, val: 20 }] }];

// 重载 1: 传入树数组
TreeUtil.map(tree, (node) => ({ ...node, val: node.val * 2 }));
// [{ id: 1, val: 20, children: [{ id: 2, val: 40 }] }]

// 重载 2: 传入单个树节点
TreeUtil.map(tree[0], (node) => ({ ...node, val: node.val * 2 }));
// { id: 1, val: 20, children: [{ id: 2, val: 40 }] }
```

***

### rowsToTree()

> `static` **rowsToTree**\<`T`, `CK`, `R`, `RK`, `PK`\>(`rows`, `options?`): `R`[]

Defined in: [tree/treeUtil.ts:35](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/tree/treeUtil.ts#L35)

行结构 转 树结构
- 将平铺的数组转换为树形结构
- 返回的树结构与输入行无共享节点（新对象引用），输入行不会被突变
- 重复 id 的行只取首次出现；仅叶子/缺失父节点的 id 会作为根节点，且每个根节点只输出一次

#### Type Parameters

##### T

`T` *extends* `AnyObject` = `AnyObject`

##### CK

`CK` *extends* `string` = `"children"`

##### R

`R` *extends* `AnyObject` = `TreeLike`\<`T`, `CK`\>

##### RK

`RK` *extends* `string` = `"id"`

##### PK

`PK` *extends* `string` = `"parentId"`

#### Parameters

##### rows

`T`[]

行数据数组

##### options?

`RowsToTreeOptions`\<`RK`, `PK`, `CK`\>

配置项

#### Returns

`R`[]

树结构数组（所有节点均包含 children 数组）

#### Example

```ts
const rows = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
];
TreeUtil.rowsToTree(rows); // [{ id: 1, parentId: null, children: [{ id: 2, parentId: 1, children: [] }] }]
```

***

### treeToRows()

> `static` **treeToRows**\<`T`, `CK`, `R`\>(`tree`, `options?`): `R`[]

Defined in: [tree/treeUtil.ts:122](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/tree/treeUtil.ts#L122)

树结构 转 行结构
- 将树形结构扁平化为数组

#### Type Parameters

##### T

`T` *extends* `AnyObject`

##### CK

`CK` *extends* `string` = `"children"`

##### R

`R` *extends* `AnyObject` = `TreeLikeOptionalChildren`\<`T`, `CK`\>

#### Parameters

##### tree

`T` \| `T`[]

树结构数据 (单个节点或节点数组)

##### options?

`TreeToRowsOptions`\<`T`, `CK`\> = `{}`

配置项

#### Returns

`R`[]

扁平化后的数组

#### Example

```ts
const tree = [{ id: 1, children: [{ id: 2 }] }];
TreeUtil.treeToRows(tree); // [{ id: 1, children: undefined }, { id: 2, children: undefined }]
```
