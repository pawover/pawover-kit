[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / ArrayUtil

# Class: ArrayUtil

Defined in: [array/arrayUtil.ts:8](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L8)

数组工具类

## Constructors

### Constructor

> **new ArrayUtil**(): `ArrayUtil`

#### Returns

`ArrayUtil`

## Methods

### cast()

#### Call Signature

> `static` **cast**\<`T`\>(`candidate`, `checkNullish?`): `NonNullable`\<`T`\>[]

Defined in: [array/arrayUtil.ts:28](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L28)

构造数组

##### Type Parameters

###### T

`T`

##### Parameters

###### candidate

`T` \| `T`[] \| `null` \| `undefined`

待构造项

###### checkNullish?

`true`

是否检查 `undefined` 和 `null`，默认为 `true`

##### Returns

`NonNullable`\<`T`\>[]

构造后的数组

##### Example

```ts
// 重载 1: checkNullish = true (默认)
ArrayUtil.cast(1); // [1]
ArrayUtil.cast(null); // []

// 重载 2: checkNullish = false
ArrayUtil.cast(null, false); // [null]

// 通用场景
ArrayUtil.cast([1, 2]); // [1, 2]
ArrayUtil.cast(undefined); // []
```

#### Call Signature

> `static` **cast**\<`T`\>(`candidate`, `checkNullish`): `T`[]

Defined in: [array/arrayUtil.ts:29](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L29)

构造数组

##### Type Parameters

###### T

`T`

##### Parameters

###### candidate

`T` \| `T`[] \| `null` \| `undefined`

待构造项

###### checkNullish

`false`

是否检查 `undefined` 和 `null`，默认为 `true`

##### Returns

`T`[]

构造后的数组

##### Example

```ts
// 重载 1: checkNullish = true (默认)
ArrayUtil.cast(1); // [1]
ArrayUtil.cast(null); // []

// 重载 2: checkNullish = false
ArrayUtil.cast(null, false); // [null]

// 通用场景
ArrayUtil.cast([1, 2]); // [1, 2]
ArrayUtil.cast(undefined); // []
```

***

### compete()

> `static` **compete**\<`T`\>(`initialList`, `match`): `T` \| `null`

Defined in: [array/arrayUtil.ts:106](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L106)

数组竞选
- 返回在匹配函数的比较条件中获胜的最终项目，适用于更复杂的最小值/最大值计算

#### Type Parameters

##### T

`T`

#### Parameters

##### initialList

readonly `T`[]

数组

##### match

(`a`, `b`, `index`) => `T`

匹配函数

#### Returns

`T` \| `null`

获胜的元素，如果数组为空或参数无效则返回 `null`

#### Example

```ts
const list = [1, 10, 5];
ArrayUtil.compete(list, (a, b) => (a > b ? a : b)); // 10
ArrayUtil.compete(list, (a, b) => (a < b ? a : b)); // 1
```

***

### count()

> `static` **count**\<`T`, `K`\>(`initialList`, `match`): `Record`\<`string`, `number`\>

Defined in: [array/arrayUtil.ts:130](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L130)

统计数组的项目出现次数
- 通过给定的标识符匹配函数，返回一个对象，其中键是回调函数返回的 key 值，每个值是一个整数，表示该 key 出现的次数

#### Type Parameters

##### T

`T`

##### K

`K` *extends* `PropertyKey`

#### Parameters

##### initialList

readonly `T`[]

初始数组

##### match

[`MatchFunction`](../type-aliases/MatchFunction.md)\<`T`, `K`\>

匹配函数

#### Returns

`Record`\<`string`, `number`\>

统计对象

#### Example

```ts
const list = ["a", "b", "a", "c"];
ArrayUtil.count(list, (x) => x); // { a: 2, b: 1, c: 1 }

const users = [{ id: 1, group: "A" }, { id: 2, group: "B" }, { id: 3, group: "A" }];
ArrayUtil.count(users, (u) => u.group); // { A: 2, B: 1 }
```

***

### difference()

> `static` **difference**\<`T`\>(`initialList`, `diffList`, `match?`): `T`[]

Defined in: [array/arrayUtil.ts:162](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L162)

获取数组差集
- 返回在 `initialList` 中存在，但在 `diffList` 中不存在的元素

#### Type Parameters

##### T

`T`

#### Parameters

##### initialList

readonly `T`[]

初始数组

##### diffList

readonly `T`[]

对比数组

##### match?

(`row`, `index`) => `unknown`

匹配函数

#### Returns

`T`[]

差集数组

#### Example

```ts
// 重载 1: 按元素本身比较（自动去重）
ArrayUtil.difference([1, 2, 3], [2, 3, 4]); // [1]
ArrayUtil.difference([1, 1, 2], [2]); // [1]，重复项会被去重

// 重载 2: 按 match 结果比较（不去重，保留 initialList 原始重复项与顺序）
ArrayUtil.difference([{ id: 1 }, { id: 2 }], [{ id: 2 }], (x) => x.id); // [{ id: 1 }]
ArrayUtil.difference([{ id: 1 }, { id: 1 }], [{ id: 2 }], (x) => x.id); // [{ id: 1 }, { id: 1 }]
```

***

### first()

#### Call Signature

> `static` **first**\<`T`\>(`initialList`): `T` \| `undefined`

Defined in: [array/arrayUtil.ts:56](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L56)

获取数组第一项

##### Type Parameters

###### T

`T`

##### Parameters

###### initialList

readonly `T`[]

初始数组

##### Returns

`T` \| `undefined`

数组第一项，如果为空则返回回退值

##### Example

```ts
// 重载 1: 无 fallback
ArrayUtil.first([1, 2]); // 1
ArrayUtil.first([]); // undefined

// 重载 2: 有 fallback
ArrayUtil.first([], 0); // 0
```

#### Call Signature

> `static` **first**\<`T`\>(`initialList`, `fallback`): `T`

Defined in: [array/arrayUtil.ts:57](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L57)

获取数组第一项

##### Type Parameters

###### T

`T`

##### Parameters

###### initialList

readonly `T`[]

初始数组

###### fallback

`T`

回退值

##### Returns

`T`

数组第一项，如果为空则返回回退值

##### Example

```ts
// 重载 1: 无 fallback
ArrayUtil.first([1, 2]); // 1
ArrayUtil.first([]); // undefined

// 重载 2: 有 fallback
ArrayUtil.first([], 0); // 0
```

***

### fork()

> `static` **fork**\<`T`\>(`initialList`, `match`): \[`T`[], `T`[]\]

Defined in: [array/arrayUtil.ts:457](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L457)

数组分组过滤
- 给定一个数组和一个条件，返回一个由两个数组组成的元组，其中第一个数组包含所有满足条件的项，第二个数组包含所有不满足条件的项

#### Type Parameters

##### T

`T`

#### Parameters

##### initialList

readonly `T`[]

初始数组

##### match

[`MatchFunction`](../type-aliases/MatchFunction.md)\<`T`, `boolean`\>

条件匹配函数

#### Returns

\[`T`[], `T`[]\]

[满足条件的项[], 不满足条件的项[]]

#### Example

```ts
ArrayUtil.fork([1, 2, 3, 4], (n) => n % 2 === 0); // [[2, 4], [1, 3]]
```

***

### intersection()

#### Call Signature

> `static` **intersection**\<`T`\>(`initialList`, `diffList`): `T`[]

Defined in: [array/arrayUtil.ts:204](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L204)

获取数组交集
- 返回在 `initialList` 和 `diffList` 中都存在的元素

##### Type Parameters

###### T

`T`

##### Parameters

###### initialList

readonly `T`[]

初始数组

###### diffList

readonly `T`[]

对比数组

##### Returns

`T`[]

交集数组

##### Example

```ts
// 重载 1: 按元素本身比较
ArrayUtil.intersection([1, 2], [2, 3]); // [2]

// 重载 2: 按 match 结果比较
ArrayUtil.intersection([{ id: 1 }, { id: 2 }], [{ id: 2 }], (x) => x.id); // [{ id: 2 }]
```

#### Call Signature

> `static` **intersection**\<`T`, `D`\>(`initialList`, `diffList`, `match`): `T`[]

Defined in: [array/arrayUtil.ts:205](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L205)

获取数组交集
- 返回在 `initialList` 和 `diffList` 中都存在的元素

##### Type Parameters

###### T

`T`

###### D

`D` = `T`

##### Parameters

###### initialList

readonly `T`[]

初始数组

###### diffList

readonly `D`[]

对比数组

###### match

[`MatchFunction`](../type-aliases/MatchFunction.md)\<`T`\>

匹配函数

##### Returns

`T`[]

交集数组

##### Example

```ts
// 重载 1: 按元素本身比较
ArrayUtil.intersection([1, 2], [2, 3]); // [2]

// 重载 2: 按 match 结果比较
ArrayUtil.intersection([{ id: 1 }, { id: 2 }], [{ id: 2 }], (x) => x.id); // [{ id: 2 }]
```

***

### last()

#### Call Signature

> `static` **last**\<`T`\>(`initialList`): `T` \| `undefined`

Defined in: [array/arrayUtil.ts:82](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L82)

获取数组最后一项

##### Type Parameters

###### T

`T`

##### Parameters

###### initialList

readonly `T`[]

初始数组

##### Returns

`T` \| `undefined`

数组最后一项，如果为空则返回回退值

##### Example

```ts
// 重载 1: 无 fallback
ArrayUtil.last([1, 2, 3]); // 3
ArrayUtil.last([]); // undefined

// 重载 2: 有 fallback
ArrayUtil.last([], 0); // 0
```

#### Call Signature

> `static` **last**\<`T`\>(`initialList`, `fallback`): `T`

Defined in: [array/arrayUtil.ts:83](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L83)

获取数组最后一项

##### Type Parameters

###### T

`T`

##### Parameters

###### initialList

readonly `T`[]

初始数组

###### fallback

`T`

回退值

##### Returns

`T`

数组最后一项，如果为空则返回回退值

##### Example

```ts
// 重载 1: 无 fallback
ArrayUtil.last([1, 2, 3]); // 3
ArrayUtil.last([]); // undefined

// 重载 2: 有 fallback
ArrayUtil.last([], 0); // 0
```

***

### merge()

#### Call Signature

> `static` **merge**\<`T`\>(`initialList`, `mergeList`): `T`[]

Defined in: [array/arrayUtil.ts:246](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L246)

数组合并
- 如果未提供 `match` 函数，则合并两个数组并去重（Union）
- 如果提供了 `match` 函数，则仅更新 `initialList` 中匹配到的项（Left Join Update），不会追加 `mergeList` 中新增的项

##### Type Parameters

###### T

`T`

##### Parameters

###### initialList

readonly `T`[]

初始数组

###### mergeList

readonly `T`[]

待合并数组

##### Returns

`T`[]

合并后的数组

##### Example

```ts
// 重载 1: 基础合并去重
ArrayUtil.merge([1, 2], [2, 3]); // [1, 2, 3]
ArrayUtil.merge([], [1, 2, 3]); // [1, 2, 3]

// 重载 2: 按条件更新
const source = [{ id: 1, val: "a" }, { id: 2, val: "b" }];
const update = [{ id: 2, val: "new" }, { id: 3, val: "c" }];
ArrayUtil.merge(source, update, (x) => x.id); // [{ id: 1, val: "a" }, { id: 2, val: "new" }] -> id:3 被忽略
```

#### Call Signature

> `static` **merge**\<`T`, `D`\>(`initialList`, `mergeList`, `match`): (`T` \| `D`)[]

Defined in: [array/arrayUtil.ts:247](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L247)

数组合并
- 如果未提供 `match` 函数，则合并两个数组并去重（Union）
- 如果提供了 `match` 函数，则仅更新 `initialList` 中匹配到的项（Left Join Update），不会追加 `mergeList` 中新增的项

##### Type Parameters

###### T

`T`

###### D

`D` = `T`

##### Parameters

###### initialList

readonly `T`[]

初始数组

###### mergeList

readonly `D`[]

待合并数组

###### match

[`MatchFunction`](../type-aliases/MatchFunction.md)\<`T`\>

匹配函数

##### Returns

(`T` \| `D`)[]

合并后的数组

##### Example

```ts
// 重载 1: 基础合并去重
ArrayUtil.merge([1, 2], [2, 3]); // [1, 2, 3]
ArrayUtil.merge([], [1, 2, 3]); // [1, 2, 3]

// 重载 2: 按条件更新
const source = [{ id: 1, val: "a" }, { id: 2, val: "b" }];
const update = [{ id: 2, val: "new" }, { id: 3, val: "c" }];
ArrayUtil.merge(source, update, (x) => x.id); // [{ id: 1, val: "a" }, { id: 2, val: "new" }] -> id:3 被忽略
```

***

### pick()

#### Call Signature

> `static` **pick**\<`T`\>(`initialList`, `filter`): `T`[]

Defined in: [array/arrayUtil.ts:295](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L295)

数组选择
- 一次性应用 `filter` 和 `map` 操作

##### Type Parameters

###### T

`T`

##### Parameters

###### initialList

readonly `T`[]

初始数组

###### filter

(`row`, `index`) => `boolean`

filter 函数

##### Returns

`T`[]

处理后的新数组

##### Example

```ts
const list = [1, 2, 3, 4];

// 重载 1: 仅过滤
ArrayUtil.pick(list, (n) => n % 2 === 0); // [2, 4]

// 重载 2: 过滤 + 映射
ArrayUtil.pick(list, (n) => n % 2 === 0, (n) => n * 2); // [4, 8]
```

#### Call Signature

> `static` **pick**\<`T`, `K`\>(`initialList`, `filter`, `mapper`): `K`[]

Defined in: [array/arrayUtil.ts:296](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L296)

数组选择
- 一次性应用 `filter` 和 `map` 操作

##### Type Parameters

###### T

`T`

###### K

`K` = `T`

##### Parameters

###### initialList

readonly `T`[]

初始数组

###### filter

(`row`, `index`) => `boolean`

filter 函数

###### mapper

(`row`, `index`) => `K`

map 函数

##### Returns

`K`[]

处理后的新数组

##### Example

```ts
const list = [1, 2, 3, 4];

// 重载 1: 仅过滤
ArrayUtil.pick(list, (n) => n % 2 === 0); // [2, 4]

// 重载 2: 过滤 + 映射
ArrayUtil.pick(list, (n) => n % 2 === 0, (n) => n * 2); // [4, 8]
```

***

### replace()

#### Call Signature

> `static` **replace**\<`T`\>(`initialList`, `newItem`, `match`): `T`[]

Defined in: [array/arrayUtil.ts:339](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L339)

数组项替换
- 在给定的数组中，替换符合匹配函数结果的项目
- 只替换第一个匹配项

##### Type Parameters

###### T

`T`

##### Parameters

###### initialList

readonly `T`[]

初始数组

###### newItem

`T`

替换项

###### match

[`MatchFunction`](../type-aliases/MatchFunction.md)\<`T`, `boolean`\>

匹配函数

##### Returns

`T`[]

替换后的新数组

##### Example

```ts
// 重载 1/2: newItem 与数组元素类型兼容
ArrayUtil.replace([1, 2, 3], 4, (n) => n === 2); // [1, 4, 3]

// 重载 3: newItem 可扩展为新类型
ArrayUtil.replace([1, 2, 3], "X", (n) => n === 2); // [1, "X", 3]
```

#### Call Signature

> `static` **replace**\<`T`, `K`\>(`initialList`, `newItem`, `match`): `T`[]

Defined in: [array/arrayUtil.ts:340](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L340)

数组项替换
- 在给定的数组中，替换符合匹配函数结果的项目
- 只替换第一个匹配项

##### Type Parameters

###### T

`T`

###### K

`K`

##### Parameters

###### initialList

readonly `T`[]

初始数组

###### newItem

`K`

替换项

###### match

[`MatchFunction`](../type-aliases/MatchFunction.md)\<`T`, `boolean`\>

匹配函数

##### Returns

`T`[]

替换后的新数组

##### Example

```ts
// 重载 1/2: newItem 与数组元素类型兼容
ArrayUtil.replace([1, 2, 3], 4, (n) => n === 2); // [1, 4, 3]

// 重载 3: newItem 可扩展为新类型
ArrayUtil.replace([1, 2, 3], "X", (n) => n === 2); // [1, "X", 3]
```

#### Call Signature

> `static` **replace**\<`T`, `K`\>(`initialList`, `newItem`, `match`): (`T` \| `K`)[]

Defined in: [array/arrayUtil.ts:341](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L341)

数组项替换
- 在给定的数组中，替换符合匹配函数结果的项目
- 只替换第一个匹配项

##### Type Parameters

###### T

`T`

###### K

`K`

##### Parameters

###### initialList

readonly `T`[]

初始数组

###### newItem

`K`

替换项

###### match

[`MatchFunction`](../type-aliases/MatchFunction.md)\<`T`, `boolean`\>

匹配函数

##### Returns

(`T` \| `K`)[]

替换后的新数组

##### Example

```ts
// 重载 1/2: newItem 与数组元素类型兼容
ArrayUtil.replace([1, 2, 3], 4, (n) => n === 2); // [1, 4, 3]

// 重载 3: newItem 可扩展为新类型
ArrayUtil.replace([1, 2, 3], "X", (n) => n === 2); // [1, "X", 3]
```

***

### replaceMove()

> `static` **replaceMove**\<`T`\>(`initialList`, `newItem`, `match`, `position?`): `T`[]

Defined in: [array/arrayUtil.ts:387](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L387)

数组项替换并移动
- 在给定的数组中，替换并移动符合匹配函数结果的项目
- 只替换和移动第一个匹配项
- 未匹配时，根据 `position` 在指定位置插入 `newItem`
- ⚠️ `position` 为负数或非正整数（如 `-1`、`2.5`）时不生效，静默回退为 `push`（追加到末尾）

#### Type Parameters

##### T

`T`

#### Parameters

##### initialList

readonly `T`[]

初始数组

##### newItem

`T`

替换项

##### match

[`MatchFunction`](../type-aliases/MatchFunction.md)\<`T`, `boolean`\>

匹配函数

##### position?

`number` \| `"start"` \| `"end"`

移动位置，可选 `start` | `end` | 索引位置， 默认为 `end`

#### Returns

`T`[]

#### Example

```ts
ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2, 0); // [5, 1, 3, 4]
ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2, 2); // [1, 3, 5, 4]
ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2, "start"); // [5, 1, 3, 4]
ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2); // [1, 3, 4, 5]

// position 为负数 → 静默回退为 push
ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2, -1); // [1, 3, 4, 5]
```

***

### split()

> `static` **split**\<`T`\>(`initialList`, `size?`): `T`[][]

Defined in: [array/arrayUtil.ts:428](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L428)

数组切分
- 将数组以指定的长度切分后，组合在高维数组中

#### Type Parameters

##### T

`T`

#### Parameters

##### initialList

readonly `T`[]

初始数组

##### size?

`number` = `10`

分割尺寸，默认 `10`

#### Returns

`T`[][]

切分后的二维数组

#### Example

```ts
ArrayUtil.split([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

***

### unzip()

> `static` **unzip**\<`T`\>(`arrayList`, `options?`): `T`[][]

Defined in: [array/arrayUtil.ts:490](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L490)

数组解压
- `ArrayUtil.zip` 的反向操作
- 默认按最长数组补齐 `undefined`

#### Type Parameters

##### T

`T`

#### Parameters

##### arrayList

readonly (readonly `T`[])[]

压缩后的数组

##### options?

[`ZipOptions`](../interfaces/ZipOptions.md)

配置项（`truncate` 为 `true` 时按最短数组截断）

#### Returns

`T`[][]

解压后的二维数组

#### Example

```ts
ArrayUtil.unzip([[1, "a"], [2, "b"]]); // [[1, 2], ["a", "b"]]

// 补齐语义
ArrayUtil.unzip([[1, 2], [3]]); // [[1, 3], [2, undefined]]

// 截断语义
ArrayUtil.unzip([[1, 2], [3]], { truncate: true }); // [[1, 3]]
```

***

### zip()

#### Call Signature

> `static` **zip**\<`T1`, `T2`, `T3`, `T4`, `T5`\>(`array1`, `array2`, `array3`, `array4`, `array5`, `options`): \[`T1`, `T2`, `T3`, `T4`, `T5`\][]

Defined in: [array/arrayUtil.ts:548](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L548)

数组压缩
- 将多个数组的元素按索引组合成元组
- 默认按最长数组补齐 `undefined`

##### Type Parameters

###### T1

`T1`

###### T2

`T2`

###### T3

`T3`

###### T4

`T4`

###### T5

`T5`

##### Parameters

###### array1

readonly `T1`[]

###### array2

readonly `T2`[]

###### array3

readonly `T3`[]

###### array4

readonly `T4`[]

###### array5

readonly `T5`[]

###### options

[`ZipOptions`](../interfaces/ZipOptions.md)

配置项（`truncate` 为 `true` 时按最短数组截断）

##### Returns

\[`T1`, `T2`, `T3`, `T4`, `T5`\][]

压缩后的元组数组

##### Example

```ts
// 重载 1: 两个数组
ArrayUtil.zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
// 长度不一致时默认补齐 undefined
ArrayUtil.zip([1, 2, 3], ["a"]); // [[1, "a"], [2, undefined], [3, undefined]]

// 重载 2: 三个数组
ArrayUtil.zip([1, 2], ["a", "b"], [true, false]); // [[1, "a", true], [2, "b", false]]

// 重载 3: 四个数组
ArrayUtil.zip([1], ["a"], [true], ["x"]); // [[1, "a", true, "x"]]

// 重载 4: 五个数组
ArrayUtil.zip([1], ["a"], [true], ["x"], [9]); // [[1, "a", true, "x", 9]]

// 重载 5: 空参数
ArrayUtil.zip(); // []

// 重载 6: 两个数组 + options（truncate: true 截断到最短数组）
ArrayUtil.zip([1, 2, 3], ["a"], { truncate: true }); // [[1, "a"]]

// 重载 7: 三个数组 + options
ArrayUtil.zip([1, 2], ["a"], [true], { truncate: true }); // [[1, "a", true]]

// 重载 8: 四个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], { truncate: true }); // [[1, "a", true, "x"]]

// 重载 9: 五个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], [9], { truncate: true }); // [[1, "a", true, "x", 9]]
```

#### Call Signature

> `static` **zip**\<`T1`, `T2`, `T3`, `T4`\>(`array1`, `array2`, `array3`, `array4`, `options`): \[`T1`, `T2`, `T3`, `T4`\][]

Defined in: [array/arrayUtil.ts:549](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L549)

数组压缩
- 将多个数组的元素按索引组合成元组
- 默认按最长数组补齐 `undefined`

##### Type Parameters

###### T1

`T1`

###### T2

`T2`

###### T3

`T3`

###### T4

`T4`

##### Parameters

###### array1

readonly `T1`[]

###### array2

readonly `T2`[]

###### array3

readonly `T3`[]

###### array4

readonly `T4`[]

###### options

[`ZipOptions`](../interfaces/ZipOptions.md)

配置项（`truncate` 为 `true` 时按最短数组截断）

##### Returns

\[`T1`, `T2`, `T3`, `T4`\][]

压缩后的元组数组

##### Example

```ts
// 重载 1: 两个数组
ArrayUtil.zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
// 长度不一致时默认补齐 undefined
ArrayUtil.zip([1, 2, 3], ["a"]); // [[1, "a"], [2, undefined], [3, undefined]]

// 重载 2: 三个数组
ArrayUtil.zip([1, 2], ["a", "b"], [true, false]); // [[1, "a", true], [2, "b", false]]

// 重载 3: 四个数组
ArrayUtil.zip([1], ["a"], [true], ["x"]); // [[1, "a", true, "x"]]

// 重载 4: 五个数组
ArrayUtil.zip([1], ["a"], [true], ["x"], [9]); // [[1, "a", true, "x", 9]]

// 重载 5: 空参数
ArrayUtil.zip(); // []

// 重载 6: 两个数组 + options（truncate: true 截断到最短数组）
ArrayUtil.zip([1, 2, 3], ["a"], { truncate: true }); // [[1, "a"]]

// 重载 7: 三个数组 + options
ArrayUtil.zip([1, 2], ["a"], [true], { truncate: true }); // [[1, "a", true]]

// 重载 8: 四个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], { truncate: true }); // [[1, "a", true, "x"]]

// 重载 9: 五个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], [9], { truncate: true }); // [[1, "a", true, "x", 9]]
```

#### Call Signature

> `static` **zip**\<`T1`, `T2`, `T3`\>(`array1`, `array2`, `array3`, `options`): \[`T1`, `T2`, `T3`\][]

Defined in: [array/arrayUtil.ts:550](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L550)

数组压缩
- 将多个数组的元素按索引组合成元组
- 默认按最长数组补齐 `undefined`

##### Type Parameters

###### T1

`T1`

###### T2

`T2`

###### T3

`T3`

##### Parameters

###### array1

readonly `T1`[]

###### array2

readonly `T2`[]

###### array3

readonly `T3`[]

###### options

[`ZipOptions`](../interfaces/ZipOptions.md)

配置项（`truncate` 为 `true` 时按最短数组截断）

##### Returns

\[`T1`, `T2`, `T3`\][]

压缩后的元组数组

##### Example

```ts
// 重载 1: 两个数组
ArrayUtil.zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
// 长度不一致时默认补齐 undefined
ArrayUtil.zip([1, 2, 3], ["a"]); // [[1, "a"], [2, undefined], [3, undefined]]

// 重载 2: 三个数组
ArrayUtil.zip([1, 2], ["a", "b"], [true, false]); // [[1, "a", true], [2, "b", false]]

// 重载 3: 四个数组
ArrayUtil.zip([1], ["a"], [true], ["x"]); // [[1, "a", true, "x"]]

// 重载 4: 五个数组
ArrayUtil.zip([1], ["a"], [true], ["x"], [9]); // [[1, "a", true, "x", 9]]

// 重载 5: 空参数
ArrayUtil.zip(); // []

// 重载 6: 两个数组 + options（truncate: true 截断到最短数组）
ArrayUtil.zip([1, 2, 3], ["a"], { truncate: true }); // [[1, "a"]]

// 重载 7: 三个数组 + options
ArrayUtil.zip([1, 2], ["a"], [true], { truncate: true }); // [[1, "a", true]]

// 重载 8: 四个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], { truncate: true }); // [[1, "a", true, "x"]]

// 重载 9: 五个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], [9], { truncate: true }); // [[1, "a", true, "x", 9]]
```

#### Call Signature

> `static` **zip**\<`T1`, `T2`\>(`array1`, `array2`, `options`): \[`T1`, `T2`\][]

Defined in: [array/arrayUtil.ts:551](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L551)

数组压缩
- 将多个数组的元素按索引组合成元组
- 默认按最长数组补齐 `undefined`

##### Type Parameters

###### T1

`T1`

###### T2

`T2`

##### Parameters

###### array1

readonly `T1`[]

###### array2

readonly `T2`[]

###### options

[`ZipOptions`](../interfaces/ZipOptions.md)

配置项（`truncate` 为 `true` 时按最短数组截断）

##### Returns

\[`T1`, `T2`\][]

压缩后的元组数组

##### Example

```ts
// 重载 1: 两个数组
ArrayUtil.zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
// 长度不一致时默认补齐 undefined
ArrayUtil.zip([1, 2, 3], ["a"]); // [[1, "a"], [2, undefined], [3, undefined]]

// 重载 2: 三个数组
ArrayUtil.zip([1, 2], ["a", "b"], [true, false]); // [[1, "a", true], [2, "b", false]]

// 重载 3: 四个数组
ArrayUtil.zip([1], ["a"], [true], ["x"]); // [[1, "a", true, "x"]]

// 重载 4: 五个数组
ArrayUtil.zip([1], ["a"], [true], ["x"], [9]); // [[1, "a", true, "x", 9]]

// 重载 5: 空参数
ArrayUtil.zip(); // []

// 重载 6: 两个数组 + options（truncate: true 截断到最短数组）
ArrayUtil.zip([1, 2, 3], ["a"], { truncate: true }); // [[1, "a"]]

// 重载 7: 三个数组 + options
ArrayUtil.zip([1, 2], ["a"], [true], { truncate: true }); // [[1, "a", true]]

// 重载 8: 四个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], { truncate: true }); // [[1, "a", true, "x"]]

// 重载 9: 五个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], [9], { truncate: true }); // [[1, "a", true, "x", 9]]
```

#### Call Signature

> `static` **zip**\<`T1`, `T2`, `T3`, `T4`, `T5`\>(`array1`, `array2`, `array3`, `array4`, `array5`): \[`T1`, `T2`, `T3`, `T4`, `T5`\][]

Defined in: [array/arrayUtil.ts:552](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L552)

数组压缩
- 将多个数组的元素按索引组合成元组
- 默认按最长数组补齐 `undefined`

##### Type Parameters

###### T1

`T1`

###### T2

`T2`

###### T3

`T3`

###### T4

`T4`

###### T5

`T5`

##### Parameters

###### array1

readonly `T1`[]

###### array2

readonly `T2`[]

###### array3

readonly `T3`[]

###### array4

readonly `T4`[]

###### array5

readonly `T5`[]

##### Returns

\[`T1`, `T2`, `T3`, `T4`, `T5`\][]

压缩后的元组数组

##### Example

```ts
// 重载 1: 两个数组
ArrayUtil.zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
// 长度不一致时默认补齐 undefined
ArrayUtil.zip([1, 2, 3], ["a"]); // [[1, "a"], [2, undefined], [3, undefined]]

// 重载 2: 三个数组
ArrayUtil.zip([1, 2], ["a", "b"], [true, false]); // [[1, "a", true], [2, "b", false]]

// 重载 3: 四个数组
ArrayUtil.zip([1], ["a"], [true], ["x"]); // [[1, "a", true, "x"]]

// 重载 4: 五个数组
ArrayUtil.zip([1], ["a"], [true], ["x"], [9]); // [[1, "a", true, "x", 9]]

// 重载 5: 空参数
ArrayUtil.zip(); // []

// 重载 6: 两个数组 + options（truncate: true 截断到最短数组）
ArrayUtil.zip([1, 2, 3], ["a"], { truncate: true }); // [[1, "a"]]

// 重载 7: 三个数组 + options
ArrayUtil.zip([1, 2], ["a"], [true], { truncate: true }); // [[1, "a", true]]

// 重载 8: 四个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], { truncate: true }); // [[1, "a", true, "x"]]

// 重载 9: 五个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], [9], { truncate: true }); // [[1, "a", true, "x", 9]]
```

#### Call Signature

> `static` **zip**\<`T1`, `T2`, `T3`, `T4`\>(`array1`, `array2`, `array3`, `array4`): \[`T1`, `T2`, `T3`, `T4`\][]

Defined in: [array/arrayUtil.ts:553](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L553)

数组压缩
- 将多个数组的元素按索引组合成元组
- 默认按最长数组补齐 `undefined`

##### Type Parameters

###### T1

`T1`

###### T2

`T2`

###### T3

`T3`

###### T4

`T4`

##### Parameters

###### array1

readonly `T1`[]

###### array2

readonly `T2`[]

###### array3

readonly `T3`[]

###### array4

readonly `T4`[]

##### Returns

\[`T1`, `T2`, `T3`, `T4`\][]

压缩后的元组数组

##### Example

```ts
// 重载 1: 两个数组
ArrayUtil.zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
// 长度不一致时默认补齐 undefined
ArrayUtil.zip([1, 2, 3], ["a"]); // [[1, "a"], [2, undefined], [3, undefined]]

// 重载 2: 三个数组
ArrayUtil.zip([1, 2], ["a", "b"], [true, false]); // [[1, "a", true], [2, "b", false]]

// 重载 3: 四个数组
ArrayUtil.zip([1], ["a"], [true], ["x"]); // [[1, "a", true, "x"]]

// 重载 4: 五个数组
ArrayUtil.zip([1], ["a"], [true], ["x"], [9]); // [[1, "a", true, "x", 9]]

// 重载 5: 空参数
ArrayUtil.zip(); // []

// 重载 6: 两个数组 + options（truncate: true 截断到最短数组）
ArrayUtil.zip([1, 2, 3], ["a"], { truncate: true }); // [[1, "a"]]

// 重载 7: 三个数组 + options
ArrayUtil.zip([1, 2], ["a"], [true], { truncate: true }); // [[1, "a", true]]

// 重载 8: 四个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], { truncate: true }); // [[1, "a", true, "x"]]

// 重载 9: 五个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], [9], { truncate: true }); // [[1, "a", true, "x", 9]]
```

#### Call Signature

> `static` **zip**\<`T1`, `T2`, `T3`\>(`array1`, `array2`, `array3`): \[`T1`, `T2`, `T3`\][]

Defined in: [array/arrayUtil.ts:554](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L554)

数组压缩
- 将多个数组的元素按索引组合成元组
- 默认按最长数组补齐 `undefined`

##### Type Parameters

###### T1

`T1`

###### T2

`T2`

###### T3

`T3`

##### Parameters

###### array1

readonly `T1`[]

###### array2

readonly `T2`[]

###### array3

readonly `T3`[]

##### Returns

\[`T1`, `T2`, `T3`\][]

压缩后的元组数组

##### Example

```ts
// 重载 1: 两个数组
ArrayUtil.zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
// 长度不一致时默认补齐 undefined
ArrayUtil.zip([1, 2, 3], ["a"]); // [[1, "a"], [2, undefined], [3, undefined]]

// 重载 2: 三个数组
ArrayUtil.zip([1, 2], ["a", "b"], [true, false]); // [[1, "a", true], [2, "b", false]]

// 重载 3: 四个数组
ArrayUtil.zip([1], ["a"], [true], ["x"]); // [[1, "a", true, "x"]]

// 重载 4: 五个数组
ArrayUtil.zip([1], ["a"], [true], ["x"], [9]); // [[1, "a", true, "x", 9]]

// 重载 5: 空参数
ArrayUtil.zip(); // []

// 重载 6: 两个数组 + options（truncate: true 截断到最短数组）
ArrayUtil.zip([1, 2, 3], ["a"], { truncate: true }); // [[1, "a"]]

// 重载 7: 三个数组 + options
ArrayUtil.zip([1, 2], ["a"], [true], { truncate: true }); // [[1, "a", true]]

// 重载 8: 四个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], { truncate: true }); // [[1, "a", true, "x"]]

// 重载 9: 五个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], [9], { truncate: true }); // [[1, "a", true, "x", 9]]
```

#### Call Signature

> `static` **zip**\<`T1`, `T2`\>(`array1`, `array2`): \[`T1`, `T2`\][]

Defined in: [array/arrayUtil.ts:555](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L555)

数组压缩
- 将多个数组的元素按索引组合成元组
- 默认按最长数组补齐 `undefined`

##### Type Parameters

###### T1

`T1`

###### T2

`T2`

##### Parameters

###### array1

readonly `T1`[]

###### array2

readonly `T2`[]

##### Returns

\[`T1`, `T2`\][]

压缩后的元组数组

##### Example

```ts
// 重载 1: 两个数组
ArrayUtil.zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
// 长度不一致时默认补齐 undefined
ArrayUtil.zip([1, 2, 3], ["a"]); // [[1, "a"], [2, undefined], [3, undefined]]

// 重载 2: 三个数组
ArrayUtil.zip([1, 2], ["a", "b"], [true, false]); // [[1, "a", true], [2, "b", false]]

// 重载 3: 四个数组
ArrayUtil.zip([1], ["a"], [true], ["x"]); // [[1, "a", true, "x"]]

// 重载 4: 五个数组
ArrayUtil.zip([1], ["a"], [true], ["x"], [9]); // [[1, "a", true, "x", 9]]

// 重载 5: 空参数
ArrayUtil.zip(); // []

// 重载 6: 两个数组 + options（truncate: true 截断到最短数组）
ArrayUtil.zip([1, 2, 3], ["a"], { truncate: true }); // [[1, "a"]]

// 重载 7: 三个数组 + options
ArrayUtil.zip([1, 2], ["a"], [true], { truncate: true }); // [[1, "a", true]]

// 重载 8: 四个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], { truncate: true }); // [[1, "a", true, "x"]]

// 重载 9: 五个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], [9], { truncate: true }); // [[1, "a", true, "x", 9]]
```

#### Call Signature

> `static` **zip**(): \[\]

Defined in: [array/arrayUtil.ts:556](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L556)

数组压缩
- 将多个数组的元素按索引组合成元组
- 默认按最长数组补齐 `undefined`

##### Returns

\[\]

压缩后的元组数组

##### Example

```ts
// 重载 1: 两个数组
ArrayUtil.zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
// 长度不一致时默认补齐 undefined
ArrayUtil.zip([1, 2, 3], ["a"]); // [[1, "a"], [2, undefined], [3, undefined]]

// 重载 2: 三个数组
ArrayUtil.zip([1, 2], ["a", "b"], [true, false]); // [[1, "a", true], [2, "b", false]]

// 重载 3: 四个数组
ArrayUtil.zip([1], ["a"], [true], ["x"]); // [[1, "a", true, "x"]]

// 重载 4: 五个数组
ArrayUtil.zip([1], ["a"], [true], ["x"], [9]); // [[1, "a", true, "x", 9]]

// 重载 5: 空参数
ArrayUtil.zip(); // []

// 重载 6: 两个数组 + options（truncate: true 截断到最短数组）
ArrayUtil.zip([1, 2, 3], ["a"], { truncate: true }); // [[1, "a"]]

// 重载 7: 三个数组 + options
ArrayUtil.zip([1, 2], ["a"], [true], { truncate: true }); // [[1, "a", true]]

// 重载 8: 四个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], { truncate: true }); // [[1, "a", true, "x"]]

// 重载 9: 五个数组 + options
ArrayUtil.zip([1], ["a"], [true], ["x"], [9], { truncate: true }); // [[1, "a", true, "x", 9]]
```

***

### zipToObject()

#### Call Signature

> `static` **zipToObject**\<`K`, `V`\>(`keys`, `array`): `Record`\<`K`, `V`\>

Defined in: [array/arrayUtil.ts:588](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L588)

数组压缩为对象
- 将键数组和值（数组、函数或静态值）组合成对象

##### Type Parameters

###### K

`K` *extends* `PropertyKey`

###### V

`V`

##### Parameters

###### keys

readonly `K`[]

键数组

###### array

readonly `V`[]

##### Returns

`Record`\<`K`, `V`\>

生成的对象

##### Example

```ts
// 重载 1: 传值数组
ArrayUtil.zipToObject(["a", "b"], [1, 2]); // { a: 1, b: 2 }

// 重载 2: 传生成函数
ArrayUtil.zipToObject(["a", "b"], (k, i) => k + i); // { a: "a0", b: "b1" }

// 重载 3: 传静态值
ArrayUtil.zipToObject(["a", "b"], 1); // { a: 1, b: 1 }
```

#### Call Signature

> `static` **zipToObject**\<`K`, `V`\>(`keys`, `match`): `Record`\<`K`, `V`\>

Defined in: [array/arrayUtil.ts:589](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L589)

数组压缩为对象
- 将键数组和值（数组、函数或静态值）组合成对象

##### Type Parameters

###### K

`K` *extends* `PropertyKey`

###### V

`V`

##### Parameters

###### keys

readonly `K`[]

键数组

###### match

[`MatchFunction`](../type-aliases/MatchFunction.md)\<`K`, `V`\>

##### Returns

`Record`\<`K`, `V`\>

生成的对象

##### Example

```ts
// 重载 1: 传值数组
ArrayUtil.zipToObject(["a", "b"], [1, 2]); // { a: 1, b: 2 }

// 重载 2: 传生成函数
ArrayUtil.zipToObject(["a", "b"], (k, i) => k + i); // { a: "a0", b: "b1" }

// 重载 3: 传静态值
ArrayUtil.zipToObject(["a", "b"], 1); // { a: 1, b: 1 }
```

#### Call Signature

> `static` **zipToObject**\<`K`, `V`\>(`keys`, `value`): `Record`\<`K`, `V`\>

Defined in: [array/arrayUtil.ts:590](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/utils/src/array/arrayUtil.ts#L590)

数组压缩为对象
- 将键数组和值（数组、函数或静态值）组合成对象

##### Type Parameters

###### K

`K` *extends* `PropertyKey`

###### V

`V`

##### Parameters

###### keys

readonly `K`[]

键数组

###### value

`V`

##### Returns

`Record`\<`K`, `V`\>

生成的对象

##### Example

```ts
// 重载 1: 传值数组
ArrayUtil.zipToObject(["a", "b"], [1, 2]); // { a: 1, b: 2 }

// 重载 2: 传生成函数
ArrayUtil.zipToObject(["a", "b"], (k, i) => k + i); // { a: "a0", b: "b1" }

// 重载 3: 传静态值
ArrayUtil.zipToObject(["a", "b"], 1); // { a: 1, b: 1 }
```
