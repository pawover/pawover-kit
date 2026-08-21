[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / ObjectUtil

# Class: ObjectUtil

Defined in: [object/objectUtil.ts:9](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L9)

对象工具类

## Constructors

### Constructor

> **new ObjectUtil**(): `ObjectUtil`

#### Returns

`ObjectUtil`

## Methods

### crush()

#### Call Signature

> `static` **crush**\<`T`\>(`plainObject`): `Crush`\<`T`\>

Defined in: [object/objectUtil.ts:256](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L256)

压平对象
- 将多层级的对象转换为单层级的对象，键名使用点号连接

##### Type Parameters

###### T

`T` *extends* `PlainObject`

##### Parameters

###### plainObject

`T`

平面对象

##### Returns

`Crush`\<`T`\>

压平后的对象

##### Example

```ts
// 重载 1: PlainObject
const plainObj = { a: { b: 1 } };
ObjectUtil.crush(plainObj); // { "a.b": 1 }

// 重载 2: AnyObject
const anyObj = { list: [{ id: 1 }] } as Record<string, unknown>;
ObjectUtil.crush(anyObj); // { "list.0.id": 1 }
```

#### Call Signature

> `static` **crush**\<`T`\>(`anyObject`): `Crush`\<`T`\>

Defined in: [object/objectUtil.ts:257](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L257)

压平对象
- 将多层级的对象转换为单层级的对象，键名使用点号连接

##### Type Parameters

###### T

`T` *extends* `AnyObject`

##### Parameters

###### anyObject

`T`

##### Returns

`Crush`\<`T`\>

压平后的对象

##### Example

```ts
// 重载 1: PlainObject
const plainObj = { a: { b: 1 } };
ObjectUtil.crush(plainObj); // { "a.b": 1 }

// 重载 2: AnyObject
const anyObj = { list: [{ id: 1 }] } as Record<string, unknown>;
ObjectUtil.crush(anyObj); // { "list.0.id": 1 }
```

***

### entries()

#### Call Signature

> `static` **entries**\<`S`\>(`string`): `TupleToEntries`\<`Split`\<`S`, `""`\>\>

Defined in: [object/objectUtil.ts:90](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L90)

返回对象的可枚举属性的键/值数组

##### Type Parameters

###### S

`S` *extends* `string`

##### Parameters

###### string

`S`

##### Returns

`TupleToEntries`\<`Split`\<`S`, `""`\>\>

键值对数组

##### Example

```ts
// 重载 1: string
ObjectUtil.entries("ab"); // [["0", "a"], ["1", "b"]]

// 重载 2: readonly array
ObjectUtil.entries([10, 20] as const); // [["0", 10], ["1", 20]]

// 重载 3: PlainObject
ObjectUtil.entries({ a: 1 }); // [["a", 1]]

// 重载 4: AnyObject
const anyObj = { x: 1 } as Record<string, unknown>;
ObjectUtil.entries(anyObj); // [["x", 1]]
```

#### Call Signature

> `static` **entries**\<`A`\>(`array`): `TupleToGroups`\<`A`\>

Defined in: [object/objectUtil.ts:91](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L91)

返回对象的可枚举属性的键/值数组

##### Type Parameters

###### A

`A` *extends* readonly `unknown`[]

##### Parameters

###### array

`A`

##### Returns

`TupleToGroups`\<`A`\>

键值对数组

##### Example

```ts
// 重载 1: string
ObjectUtil.entries("ab"); // [["0", "a"], ["1", "b"]]

// 重载 2: readonly array
ObjectUtil.entries([10, 20] as const); // [["0", 10], ["1", 20]]

// 重载 3: PlainObject
ObjectUtil.entries({ a: 1 }); // [["a", 1]]

// 重载 4: AnyObject
const anyObj = { x: 1 } as Record<string, unknown>;
ObjectUtil.entries(anyObj); // [["x", 1]]
```

#### Call Signature

> `static` **entries**\<`O`\>(`plainObject`): \[\`$\{keyof \{ \[KeyType in string \| number \| symbol as Filter\<KeyType, symbol\>\]: O\[KeyType\] \}\}\`, `O`\[keyof \{ \[KeyType in string \| number \| symbol as Filter\<KeyType, symbol\>\]: O\[KeyType\] \}\]\][]

Defined in: [object/objectUtil.ts:92](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L92)

返回对象的可枚举属性的键/值数组

##### Type Parameters

###### O

`O` *extends* `PlainObject`

##### Parameters

###### plainObject

`O`

##### Returns

\[\`$\{keyof \{ \[KeyType in string \| number \| symbol as Filter\<KeyType, symbol\>\]: O\[KeyType\] \}\}\`, `O`\[keyof \{ \[KeyType in string \| number \| symbol as Filter\<KeyType, symbol\>\]: O\[KeyType\] \}\]\][]

键值对数组

##### Example

```ts
// 重载 1: string
ObjectUtil.entries("ab"); // [["0", "a"], ["1", "b"]]

// 重载 2: readonly array
ObjectUtil.entries([10, 20] as const); // [["0", 10], ["1", 20]]

// 重载 3: PlainObject
ObjectUtil.entries({ a: 1 }); // [["a", 1]]

// 重载 4: AnyObject
const anyObj = { x: 1 } as Record<string, unknown>;
ObjectUtil.entries(anyObj); // [["x", 1]]
```

#### Call Signature

> `static` **entries**\<`O`\>(`anyObject`): \[\`$\{keyof \{ \[KeyType in string \| number \| symbol as Filter\<KeyType, symbol\>\]: O\[KeyType\] \}\}\`, `O`\[keyof \{ \[KeyType in string \| number \| symbol as Filter\<KeyType, symbol\>\]: O\[KeyType\] \}\]\][]

Defined in: [object/objectUtil.ts:93](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L93)

返回对象的可枚举属性的键/值数组

##### Type Parameters

###### O

`O` *extends* `AnyObject`

##### Parameters

###### anyObject

`O`

##### Returns

\[\`$\{keyof \{ \[KeyType in string \| number \| symbol as Filter\<KeyType, symbol\>\]: O\[KeyType\] \}\}\`, `O`\[keyof \{ \[KeyType in string \| number \| symbol as Filter\<KeyType, symbol\>\]: O\[KeyType\] \}\]\][]

键值对数组

##### Example

```ts
// 重载 1: string
ObjectUtil.entries("ab"); // [["0", "a"], ["1", "b"]]

// 重载 2: readonly array
ObjectUtil.entries([10, 20] as const); // [["0", 10], ["1", 20]]

// 重载 3: PlainObject
ObjectUtil.entries({ a: 1 }); // [["a", 1]]

// 重载 4: AnyObject
const anyObj = { x: 1 } as Record<string, unknown>;
ObjectUtil.entries(anyObj); // [["x", 1]]
```

***

### entriesMap()

> `static` **entriesMap**\<`O`, `NK`, `NV`\>(`plainObject`, `toEntry`): `PlainObject`\<`NK`, `NV`\>

Defined in: [object/objectUtil.ts:114](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L114)

映射对象条目
- 将对象的键值对映射为新的键值对

#### Type Parameters

##### O

`O` *extends* `PlainObject`

##### NK

`NK` *extends* `PropertyKey`

##### NV

`NV`

#### Parameters

##### plainObject

`O`

对象

##### toEntry

(`key`, `value`) => \[`NK`, `NV`\]

映射函数

#### Returns

`PlainObject`\<`NK`, `NV`\>

映射后的新对象

#### Example

```ts
const obj = { a: 1, b: 2 };

ObjectUtil.entriesMap(obj, (k, v) => [k, v * 2]); // { a: 2, b: 4 }

ObjectUtil.entriesMap(obj, (k, v) => [`prefix_${String(k)}`, `${v}x`]); // { prefix_a: "1x", prefix_b: "2x" }
```

***

### enumEntries()

#### Call Signature

> `static` **enumEntries**\<`E`\>(`enumeration`): \[keyof `E`, `E`\[keyof `E`\]\][]

Defined in: [object/objectUtil.ts:365](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L365)

获取所有枚举成员的键/值数组

##### Type Parameters

###### E

`E` *extends* `PlainObject`

##### Parameters

###### enumeration

`E`

枚举对象

##### Returns

\[keyof `E`, `E`\[keyof `E`\]\][]

键值对数组

##### Example

```ts
// 重载 1: PlainObject
enum StringEnum { A = "a", B = "b" }
ObjectUtil.enumEntries(StringEnum); // [["A", "a"], ["B", "b"]]

// 重载 2: AnyObject
enum NumberEnum { A, B }
const anyEnum = NumberEnum as Record<string, unknown>;
ObjectUtil.enumEntries(anyEnum); // [["A", 0], ["B", 1]]
```

#### Call Signature

> `static` **enumEntries**\<`E`\>(`enumeration`): \[keyof `E`, `E`\[keyof `E`\]\][]

Defined in: [object/objectUtil.ts:366](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L366)

获取所有枚举成员的键/值数组

##### Type Parameters

###### E

`E` *extends* `AnyObject`

##### Parameters

###### enumeration

`E`

枚举对象

##### Returns

\[keyof `E`, `E`\[keyof `E`\]\][]

键值对数组

##### Example

```ts
// 重载 1: PlainObject
enum StringEnum { A = "a", B = "b" }
ObjectUtil.enumEntries(StringEnum); // [["A", "a"], ["B", "b"]]

// 重载 2: AnyObject
enum NumberEnum { A, B }
const anyEnum = NumberEnum as Record<string, unknown>;
ObjectUtil.enumEntries(anyEnum); // [["A", 0], ["B", 1]]
```

***

### enumKeys()

#### Call Signature

> `static` **enumKeys**\<`E`\>(`enumeration`): keyof `E`[]

Defined in: [object/objectUtil.ts:295](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L295)

获取所有枚举成员的键

##### Type Parameters

###### E

`E` *extends* `PlainObject`

##### Parameters

###### enumeration

`E`

枚举对象

##### Returns

keyof `E`[]

键数组

##### Example

```ts
// 重载 1: PlainObject
enum StringEnum { A = "a", B = "b" }
ObjectUtil.enumKeys(StringEnum); // ["A", "B"]

// 重载 2: AnyObject
enum NumberEnum { A, B }
const anyEnum = NumberEnum as Record<string, unknown>;
ObjectUtil.enumKeys(anyEnum); // ["A", "B"]
```

#### Call Signature

> `static` **enumKeys**\<`E`\>(`enumeration`): keyof `E`[]

Defined in: [object/objectUtil.ts:296](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L296)

获取所有枚举成员的键

##### Type Parameters

###### E

`E` *extends* `AnyObject`

##### Parameters

###### enumeration

`E`

枚举对象

##### Returns

keyof `E`[]

键数组

##### Example

```ts
// 重载 1: PlainObject
enum StringEnum { A = "a", B = "b" }
ObjectUtil.enumKeys(StringEnum); // ["A", "B"]

// 重载 2: AnyObject
enum NumberEnum { A, B }
const anyEnum = NumberEnum as Record<string, unknown>;
ObjectUtil.enumKeys(anyEnum); // ["A", "B"]
```

***

### enumValues()

#### Call Signature

> `static` **enumValues**\<`E`\>(`enumeration`): `UnionToTuple`\<`ValueOf`\<`E`\>\>

Defined in: [object/objectUtil.ts:330](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L330)

获取所有枚举成员的值

##### Type Parameters

###### E

`E` *extends* `PlainObject`

##### Parameters

###### enumeration

`E`

枚举对象

##### Returns

`UnionToTuple`\<`ValueOf`\<`E`\>\>

值数组

##### Example

```ts
// 重载 1: PlainObject
enum StringEnum { A = "a", B = "b" }
ObjectUtil.enumValues(StringEnum); // ["a", "b"]

// 重载 2: AnyObject
enum NumberEnum { A, B }
const anyEnum = NumberEnum as Record<string, unknown>;
ObjectUtil.enumValues(anyEnum); // [0, 1]
```

#### Call Signature

> `static` **enumValues**\<`E`\>(`enumeration`): `UnionToTuple`\<`ValueOf`\<`E`\>\>

Defined in: [object/objectUtil.ts:331](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L331)

获取所有枚举成员的值

##### Type Parameters

###### E

`E` *extends* `AnyObject`

##### Parameters

###### enumeration

`E`

枚举对象

##### Returns

`UnionToTuple`\<`ValueOf`\<`E`\>\>

值数组

##### Example

```ts
// 重载 1: PlainObject
enum StringEnum { A = "a", B = "b" }
ObjectUtil.enumValues(StringEnum); // ["a", "b"]

// 重载 2: AnyObject
enum NumberEnum { A, B }
const anyEnum = NumberEnum as Record<string, unknown>;
ObjectUtil.enumValues(anyEnum); // [0, 1]
```

***

### invert()

#### Call Signature

> `static` **invert**\<`O`\>(`plainObject`): `Invert`\<`O`\>

Defined in: [object/objectUtil.ts:221](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L221)

尽可能地交换对象的键和值

##### Type Parameters

###### O

`O` *extends* `Record`\<keyof `O`, `PropertyKey`\>

##### Parameters

###### plainObject

`O`

##### Returns

`Invert`\<`O`\>

键值互换后的对象

##### Example

```ts
// 重载 1: Record<keyof O, PropertyKey>
const obj = { a: "1", b: 2 };
ObjectUtil.invert(obj); // { "1": "a", 2: "b" }

// 重载 2: AnyObject
const anyObj = { x: Symbol.for("s"), y: true } as Record<string, unknown>;
ObjectUtil.invert(anyObj); // { [Symbol.for("s")]: "x" }
```

#### Call Signature

> `static` **invert**\<`O`\>(`anyObject`): `Invert`\<`O`\>

Defined in: [object/objectUtil.ts:222](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L222)

尽可能地交换对象的键和值

##### Type Parameters

###### O

`O` *extends* `AnyObject`

##### Parameters

###### anyObject

`O`

##### Returns

`Invert`\<`O`\>

键值互换后的对象

##### Example

```ts
// 重载 1: Record<keyof O, PropertyKey>
const obj = { a: "1", b: 2 };
ObjectUtil.invert(obj); // { "1": "a", 2: "b" }

// 重载 2: AnyObject
const anyObj = { x: Symbol.for("s"), y: true } as Record<string, unknown>;
ObjectUtil.invert(anyObj); // { [Symbol.for("s")]: "x" }
```

***

### keys()

#### Call Signature

> `static` **keys**\<`S`\>(`string`): `UnionToTuple`\<`Range`\<`0`, `Split`\<`S`, `""`\>\[`"length"`\]\>\>

Defined in: [object/objectUtil.ts:32](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L32)

返回对象可枚举属性和方法的名称
- `Object.keys` 始终返回 `string[]` 类型，此函数可以返回具体类型

##### Type Parameters

###### S

`S` *extends* `string`

##### Parameters

###### string

`S`

##### Returns

`UnionToTuple`\<`Range`\<`0`, `Split`\<`S`, `""`\>\[`"length"`\]\>\>

键数组

##### Example

```ts
// 重载 1: string
ObjectUtil.keys("abc"); // ["0", "1", "2"]

// 重载 2: ArrayLike
ObjectUtil.keys([10, 20]); // ["0", "1"]

// 重载 3: PlainObject
ObjectUtil.keys({ a: 1, b: 2 }); // ["a", "b"]

// 重载 4: AnyObject
const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
ObjectUtil.keys(anyObj); // ["x", "y"]
```

#### Call Signature

> `static` **keys**\<`A`\>(`array`): `UnionToTuple`\<`Range`\<`0`, `A`\[`"length"`\]\>\>

Defined in: [object/objectUtil.ts:33](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L33)

返回对象可枚举属性和方法的名称
- `Object.keys` 始终返回 `string[]` 类型，此函数可以返回具体类型

##### Type Parameters

###### A

`A` *extends* `ArrayLike`\<`unknown`\>

##### Parameters

###### array

`A`

##### Returns

`UnionToTuple`\<`Range`\<`0`, `A`\[`"length"`\]\>\>

键数组

##### Example

```ts
// 重载 1: string
ObjectUtil.keys("abc"); // ["0", "1", "2"]

// 重载 2: ArrayLike
ObjectUtil.keys([10, 20]); // ["0", "1"]

// 重载 3: PlainObject
ObjectUtil.keys({ a: 1, b: 2 }); // ["a", "b"]

// 重载 4: AnyObject
const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
ObjectUtil.keys(anyObj); // ["x", "y"]
```

#### Call Signature

> `static` **keys**\<`O`\>(`plainObject`): \`$\{Extract\<keyof O, string \| number\>\}\`[]

Defined in: [object/objectUtil.ts:34](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L34)

返回对象可枚举属性和方法的名称
- `Object.keys` 始终返回 `string[]` 类型，此函数可以返回具体类型

##### Type Parameters

###### O

`O` *extends* `PlainObject`

##### Parameters

###### plainObject

`O`

##### Returns

\`$\{Extract\<keyof O, string \| number\>\}\`[]

键数组

##### Example

```ts
// 重载 1: string
ObjectUtil.keys("abc"); // ["0", "1", "2"]

// 重载 2: ArrayLike
ObjectUtil.keys([10, 20]); // ["0", "1"]

// 重载 3: PlainObject
ObjectUtil.keys({ a: 1, b: 2 }); // ["a", "b"]

// 重载 4: AnyObject
const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
ObjectUtil.keys(anyObj); // ["x", "y"]
```

#### Call Signature

> `static` **keys**\<`O`\>(`anyObject`): \`$\{Extract\<keyof O, string \| number\>\}\`[]

Defined in: [object/objectUtil.ts:35](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L35)

返回对象可枚举属性和方法的名称
- `Object.keys` 始终返回 `string[]` 类型，此函数可以返回具体类型

##### Type Parameters

###### O

`O` *extends* `AnyObject`

##### Parameters

###### anyObject

`O`

##### Returns

\`$\{Extract\<keyof O, string \| number\>\}\`[]

键数组

##### Example

```ts
// 重载 1: string
ObjectUtil.keys("abc"); // ["0", "1", "2"]

// 重载 2: ArrayLike
ObjectUtil.keys([10, 20]); // ["0", "1"]

// 重载 3: PlainObject
ObjectUtil.keys({ a: 1, b: 2 }); // ["a", "b"]

// 重载 4: AnyObject
const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
ObjectUtil.keys(anyObj); // ["x", "y"]
```

***

### omit()

#### Call Signature

> `static` **omit**\<`O`, `K`\>(`plainObject`, `keys`): `Omit`\<`O`, `K`\>

Defined in: [object/objectUtil.ts:182](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L182)

排除对象的指定属性

##### Type Parameters

###### O

`O` *extends* `PlainObject`

###### K

`K` *extends* `string` \| `number` \| `symbol`

##### Parameters

###### plainObject

`O`

对象

###### keys

readonly `K`[]

要排除的属性键数组

##### Returns

`Omit`\<`O`, `K`\>

排除指定属性后的新对象

##### Example

```ts
// 重载 1: PlainObject
ObjectUtil.omit({ a: 1, b: 2 }, ["a"]); // { b: 2 }

// 重载 2: AnyObject
const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
ObjectUtil.omit(anyObj, ["x"]); // { y: 2 }
```

#### Call Signature

> `static` **omit**\<`O`, `K`\>(`anyObject`, `keys`): `PlainObject`

Defined in: [object/objectUtil.ts:183](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L183)

排除对象的指定属性

##### Type Parameters

###### O

`O` *extends* `AnyObject`

###### K

`K` *extends* `string` \| `number` \| `symbol`

##### Parameters

###### anyObject

`O`

###### keys

readonly `K`[]

要排除的属性键数组

##### Returns

`PlainObject`

排除指定属性后的新对象

##### Example

```ts
// 重载 1: PlainObject
ObjectUtil.omit({ a: 1, b: 2 }, ["a"]); // { b: 2 }

// 重载 2: AnyObject
const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
ObjectUtil.omit(anyObj, ["x"]); // { y: 2 }
```

***

### pick()

#### Call Signature

> `static` **pick**\<`O`, `K`\>(`plainObject`, `keys`): `Pick`\<`O`, `K`\>

Defined in: [object/objectUtil.ts:145](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L145)

选取对象的指定属性

##### Type Parameters

###### O

`O` *extends* `PlainObject`

###### K

`K` *extends* `string` \| `number` \| `symbol`

##### Parameters

###### plainObject

`O`

对象

###### keys

readonly `K`[]

要选取的属性键数组

##### Returns

`Pick`\<`O`, `K`\>

包含指定属性的新对象

##### Example

```ts
// 重载 1: PlainObject
ObjectUtil.pick({ a: 1, b: 2 }, ["a"]); // { a: 1 }

// 重载 2: AnyObject
const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
ObjectUtil.pick(anyObj, ["x"]); // { x: 1 }
```

#### Call Signature

> `static` **pick**\<`O`, `K`\>(`anyObject`, `keys`): `Pick`\<`O`, `K`\>

Defined in: [object/objectUtil.ts:146](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L146)

选取对象的指定属性

##### Type Parameters

###### O

`O` *extends* `AnyObject`

###### K

`K` *extends* `string` \| `number` \| `symbol`

##### Parameters

###### anyObject

`O`

###### keys

readonly `K`[]

要选取的属性键数组

##### Returns

`Pick`\<`O`, `K`\>

包含指定属性的新对象

##### Example

```ts
// 重载 1: PlainObject
ObjectUtil.pick({ a: 1, b: 2 }, ["a"]); // { a: 1 }

// 重载 2: AnyObject
const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
ObjectUtil.pick(anyObj, ["x"]); // { x: 1 }
```

***

### values()

#### Call Signature

> `static` **values**\<`S`\>(`string`): `Split`\<`S`, `""`\>

Defined in: [object/objectUtil.ts:61](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L61)

返回对象可枚举属性的值的数组

##### Type Parameters

###### S

`S` *extends* `string`

##### Parameters

###### string

`S`

##### Returns

`Split`\<`S`, `""`\>

值数组

##### Example

```ts
// 重载 1: string
ObjectUtil.values("abc"); // ["a", "b", "c"]

// 重载 2: ArrayLike
ObjectUtil.values([10, 20]); // [10, 20]

// 重载 3: PlainObject
ObjectUtil.values({ a: 1, b: 2 }); // [1, 2]

// 重载 4: AnyObject
const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
ObjectUtil.values(anyObj); // [1, 2]
```

#### Call Signature

> `static` **values**\<`A`\>(`array`): `A`

Defined in: [object/objectUtil.ts:62](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L62)

返回对象可枚举属性的值的数组

##### Type Parameters

###### A

`A` *extends* `ArrayLike`\<`unknown`\>

##### Parameters

###### array

`A`

##### Returns

`A`

值数组

##### Example

```ts
// 重载 1: string
ObjectUtil.values("abc"); // ["a", "b", "c"]

// 重载 2: ArrayLike
ObjectUtil.values([10, 20]); // [10, 20]

// 重载 3: PlainObject
ObjectUtil.values({ a: 1, b: 2 }); // [1, 2]

// 重载 4: AnyObject
const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
ObjectUtil.values(anyObj); // [1, 2]
```

#### Call Signature

> `static` **values**\<`O`\>(`plainObject`): `O`\[keyof `O`\][]

Defined in: [object/objectUtil.ts:63](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L63)

返回对象可枚举属性的值的数组

##### Type Parameters

###### O

`O` *extends* `PlainObject`

##### Parameters

###### plainObject

`O`

##### Returns

`O`\[keyof `O`\][]

值数组

##### Example

```ts
// 重载 1: string
ObjectUtil.values("abc"); // ["a", "b", "c"]

// 重载 2: ArrayLike
ObjectUtil.values([10, 20]); // [10, 20]

// 重载 3: PlainObject
ObjectUtil.values({ a: 1, b: 2 }); // [1, 2]

// 重载 4: AnyObject
const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
ObjectUtil.values(anyObj); // [1, 2]
```

#### Call Signature

> `static` **values**\<`O`\>(`anyObject`): `O`\[keyof `O`\][]

Defined in: [object/objectUtil.ts:64](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/utils/src/object/objectUtil.ts#L64)

返回对象可枚举属性的值的数组

##### Type Parameters

###### O

`O` *extends* `AnyObject`

##### Parameters

###### anyObject

`O`

##### Returns

`O`\[keyof `O`\][]

值数组

##### Example

```ts
// 重载 1: string
ObjectUtil.values("abc"); // ["a", "b", "c"]

// 重载 2: ArrayLike
ObjectUtil.values([10, 20]); // [10, 20]

// 重载 3: PlainObject
ObjectUtil.values({ a: 1, b: 2 }); // [1, 2]

// 重载 4: AnyObject
const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
ObjectUtil.values(anyObj); // [1, 2]
```
