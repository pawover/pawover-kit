[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / StringUtil

# Class: StringUtil

Defined in: [string/stringUtil.ts:8](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L8)

字符串工具类

## Constructors

### Constructor

> **new StringUtil**(): `StringUtil`

#### Returns

`StringUtil`

## Methods

### cast()

#### Call Signature

> `static` **cast**\<`T`\>(`candidate`, `checkNullish?`, `trim?`): `""`

Defined in: [string/stringUtil.ts:48](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L48)

将任意值转换为字符串
- 当传入数值字面量时，返回对应的字符串字面量类型

##### Type Parameters

###### T

`T` *extends* `null` \| `undefined`

##### Parameters

###### candidate

`T`

待转换的值

###### checkNullish?

`true`

是否检查空值（`null` / `undefined` / 空白字符串），默认为 `true`

###### trim?

`boolean`

是否去除结果首尾空白，默认为 `true`

##### Returns

`""`

转换后的字符串

##### Example

```ts
// 重载 1: null / undefined + checkNullish = true (默认) → ""
StringUtil.cast(null); // ""
StringUtil.cast(undefined); // ""
StringUtil.cast(""); // ""
StringUtil.cast("   "); // ""

// 重载 2: null / undefined + checkNullish = false → "null" / "undefined"
StringUtil.cast(null, false); // "null" (类型为 "null")
StringUtil.cast(undefined, false); // "undefined" (类型为 "undefined")

// 重载 3: 原始类型 → Trim<`${T}`> 字面量类型（trim 默认 true）
StringUtil.cast(123); // "123" (类型为 "123")
StringUtil.cast("hello"); // "hello" (类型为 "hello")
StringUtil.cast(true); // "true" (类型为 "true")
StringUtil.cast(42n); // "42" (类型为 "42")
// 默认去除结果首尾空白
StringUtil.cast("  hello  "); // "hello" (类型为 Trim<"  hello  "> = "hello")
StringUtil.cast("\n  abc  \n"); // "abc" (类型为 "abc")

// 重载 4: 原始类型 + trim = false → 保留字面量类型
StringUtil.cast("\n  abc  \n", true, false); // "\n  abc  \n" (类型为 "\n  abc  \n")
StringUtil.cast(123, undefined, false); // "123" (类型为 "123")

// 重载 5: 其他类型 → string
StringUtil.cast(Symbol("foo")); // "Symbol(foo)" (类型为 string)
StringUtil.cast([1, 2, 3]); // "1,2,3" (类型为 string)
StringUtil.cast({}); // "[object Object]" (类型为 string)
```

#### Call Signature

> `static` **cast**\<`T`\>(`candidate`, `checkNullish`, `trim?`): `Trim`\<`` `${T}` ``\>

Defined in: [string/stringUtil.ts:49](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L49)

将任意值转换为字符串
- 当传入数值字面量时，返回对应的字符串字面量类型

##### Type Parameters

###### T

`T` *extends* `null` \| `undefined`

##### Parameters

###### candidate

`T`

待转换的值

###### checkNullish

`false`

是否检查空值（`null` / `undefined` / 空白字符串），默认为 `true`

###### trim?

`boolean`

是否去除结果首尾空白，默认为 `true`

##### Returns

`Trim`\<`` `${T}` ``\>

转换后的字符串

##### Example

```ts
// 重载 1: null / undefined + checkNullish = true (默认) → ""
StringUtil.cast(null); // ""
StringUtil.cast(undefined); // ""
StringUtil.cast(""); // ""
StringUtil.cast("   "); // ""

// 重载 2: null / undefined + checkNullish = false → "null" / "undefined"
StringUtil.cast(null, false); // "null" (类型为 "null")
StringUtil.cast(undefined, false); // "undefined" (类型为 "undefined")

// 重载 3: 原始类型 → Trim<`${T}`> 字面量类型（trim 默认 true）
StringUtil.cast(123); // "123" (类型为 "123")
StringUtil.cast("hello"); // "hello" (类型为 "hello")
StringUtil.cast(true); // "true" (类型为 "true")
StringUtil.cast(42n); // "42" (类型为 "42")
// 默认去除结果首尾空白
StringUtil.cast("  hello  "); // "hello" (类型为 Trim<"  hello  "> = "hello")
StringUtil.cast("\n  abc  \n"); // "abc" (类型为 "abc")

// 重载 4: 原始类型 + trim = false → 保留字面量类型
StringUtil.cast("\n  abc  \n", true, false); // "\n  abc  \n" (类型为 "\n  abc  \n")
StringUtil.cast(123, undefined, false); // "123" (类型为 "123")

// 重载 5: 其他类型 → string
StringUtil.cast(Symbol("foo")); // "Symbol(foo)" (类型为 string)
StringUtil.cast([1, 2, 3]); // "1,2,3" (类型为 string)
StringUtil.cast({}); // "[object Object]" (类型为 string)
```

#### Call Signature

> `static` **cast**\<`T`\>(`candidate`, `checkNullish?`, `trim?`): `Trim`\<`` `${T}` ``\>

Defined in: [string/stringUtil.ts:50](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L50)

将任意值转换为字符串
- 当传入数值字面量时，返回对应的字符串字面量类型

##### Type Parameters

###### T

`T` *extends* `string` \| `number` \| `bigint` \| `boolean`

##### Parameters

###### candidate

`T`

待转换的值

###### checkNullish?

`boolean`

是否检查空值（`null` / `undefined` / 空白字符串），默认为 `true`

###### trim?

`true`

是否去除结果首尾空白，默认为 `true`

##### Returns

`Trim`\<`` `${T}` ``\>

转换后的字符串

##### Example

```ts
// 重载 1: null / undefined + checkNullish = true (默认) → ""
StringUtil.cast(null); // ""
StringUtil.cast(undefined); // ""
StringUtil.cast(""); // ""
StringUtil.cast("   "); // ""

// 重载 2: null / undefined + checkNullish = false → "null" / "undefined"
StringUtil.cast(null, false); // "null" (类型为 "null")
StringUtil.cast(undefined, false); // "undefined" (类型为 "undefined")

// 重载 3: 原始类型 → Trim<`${T}`> 字面量类型（trim 默认 true）
StringUtil.cast(123); // "123" (类型为 "123")
StringUtil.cast("hello"); // "hello" (类型为 "hello")
StringUtil.cast(true); // "true" (类型为 "true")
StringUtil.cast(42n); // "42" (类型为 "42")
// 默认去除结果首尾空白
StringUtil.cast("  hello  "); // "hello" (类型为 Trim<"  hello  "> = "hello")
StringUtil.cast("\n  abc  \n"); // "abc" (类型为 "abc")

// 重载 4: 原始类型 + trim = false → 保留字面量类型
StringUtil.cast("\n  abc  \n", true, false); // "\n  abc  \n" (类型为 "\n  abc  \n")
StringUtil.cast(123, undefined, false); // "123" (类型为 "123")

// 重载 5: 其他类型 → string
StringUtil.cast(Symbol("foo")); // "Symbol(foo)" (类型为 string)
StringUtil.cast([1, 2, 3]); // "1,2,3" (类型为 string)
StringUtil.cast({}); // "[object Object]" (类型为 string)
```

#### Call Signature

> `static` **cast**\<`T`\>(`candidate`, `checkNullish`, `trim`): `` `${T}` ``

Defined in: [string/stringUtil.ts:51](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L51)

将任意值转换为字符串
- 当传入数值字面量时，返回对应的字符串字面量类型

##### Type Parameters

###### T

`T` *extends* `string` \| `number` \| `bigint` \| `boolean`

##### Parameters

###### candidate

`T`

待转换的值

###### checkNullish

`boolean` \| `undefined`

是否检查空值（`null` / `undefined` / 空白字符串），默认为 `true`

###### trim

`false`

是否去除结果首尾空白，默认为 `true`

##### Returns

`` `${T}` ``

转换后的字符串

##### Example

```ts
// 重载 1: null / undefined + checkNullish = true (默认) → ""
StringUtil.cast(null); // ""
StringUtil.cast(undefined); // ""
StringUtil.cast(""); // ""
StringUtil.cast("   "); // ""

// 重载 2: null / undefined + checkNullish = false → "null" / "undefined"
StringUtil.cast(null, false); // "null" (类型为 "null")
StringUtil.cast(undefined, false); // "undefined" (类型为 "undefined")

// 重载 3: 原始类型 → Trim<`${T}`> 字面量类型（trim 默认 true）
StringUtil.cast(123); // "123" (类型为 "123")
StringUtil.cast("hello"); // "hello" (类型为 "hello")
StringUtil.cast(true); // "true" (类型为 "true")
StringUtil.cast(42n); // "42" (类型为 "42")
// 默认去除结果首尾空白
StringUtil.cast("  hello  "); // "hello" (类型为 Trim<"  hello  "> = "hello")
StringUtil.cast("\n  abc  \n"); // "abc" (类型为 "abc")

// 重载 4: 原始类型 + trim = false → 保留字面量类型
StringUtil.cast("\n  abc  \n", true, false); // "\n  abc  \n" (类型为 "\n  abc  \n")
StringUtil.cast(123, undefined, false); // "123" (类型为 "123")

// 重载 5: 其他类型 → string
StringUtil.cast(Symbol("foo")); // "Symbol(foo)" (类型为 string)
StringUtil.cast([1, 2, 3]); // "1,2,3" (类型为 string)
StringUtil.cast({}); // "[object Object]" (类型为 string)
```

#### Call Signature

> `static` **cast**(`candidate`, `checkNullish?`, `trim?`): `string`

Defined in: [string/stringUtil.ts:52](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L52)

将任意值转换为字符串
- 当传入数值字面量时，返回对应的字符串字面量类型

##### Parameters

###### candidate

`unknown`

待转换的值

###### checkNullish?

`boolean`

是否检查空值（`null` / `undefined` / 空白字符串），默认为 `true`

###### trim?

`boolean`

是否去除结果首尾空白，默认为 `true`

##### Returns

`string`

转换后的字符串

##### Example

```ts
// 重载 1: null / undefined + checkNullish = true (默认) → ""
StringUtil.cast(null); // ""
StringUtil.cast(undefined); // ""
StringUtil.cast(""); // ""
StringUtil.cast("   "); // ""

// 重载 2: null / undefined + checkNullish = false → "null" / "undefined"
StringUtil.cast(null, false); // "null" (类型为 "null")
StringUtil.cast(undefined, false); // "undefined" (类型为 "undefined")

// 重载 3: 原始类型 → Trim<`${T}`> 字面量类型（trim 默认 true）
StringUtil.cast(123); // "123" (类型为 "123")
StringUtil.cast("hello"); // "hello" (类型为 "hello")
StringUtil.cast(true); // "true" (类型为 "true")
StringUtil.cast(42n); // "42" (类型为 "42")
// 默认去除结果首尾空白
StringUtil.cast("  hello  "); // "hello" (类型为 Trim<"  hello  "> = "hello")
StringUtil.cast("\n  abc  \n"); // "abc" (类型为 "abc")

// 重载 4: 原始类型 + trim = false → 保留字面量类型
StringUtil.cast("\n  abc  \n", true, false); // "\n  abc  \n" (类型为 "\n  abc  \n")
StringUtil.cast(123, undefined, false); // "123" (类型为 "123")

// 重载 5: 其他类型 → string
StringUtil.cast(Symbol("foo")); // "Symbol(foo)" (类型为 string)
StringUtil.cast([1, 2, 3]); // "1,2,3" (类型为 string)
StringUtil.cast({}); // "[object Object]" (类型为 string)
```

***

### replace()

> `static` **replace**\<`I`, `S`, `R`\>(`input`, `search`, `replacement`): `Replace`\<`I`, `S`, `R`\>

Defined in: [string/stringUtil.ts:470](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L470)

字符串替换
- 替换第一个匹配项

#### Type Parameters

##### I

`I` *extends* `string`

##### S

`S` *extends* `string`

##### R

`R` *extends* `string`

#### Parameters

##### input

`I`

待处理字符串

##### search

`S`

匹配项

##### replacement

`R`

替换项

#### Returns

`Replace`\<`I`, `S`, `R`\>

替换后的字符串

#### Example

```ts
StringUtil.replace("hello world", "world", "context"); // "hello context"
```

***

### template()

> `static` **template**(`input`, `template`, `regex?`): `string`

Defined in: [string/stringUtil.ts:429](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L429)

字符串模板替换
- 使用对象的属性值替换字符串中的 {{key}} 模板

#### Parameters

##### input

`string`

待处理字符串

##### template

`PlainObject`

模板对象

##### regex?

`RegExp` = `...`

模板匹配正则 (默认: `\{\{(.+?)\}\}`)

#### Returns

`string`

替换后的字符串

#### Example

```ts
StringUtil.template("Hello {{name}}", { name: "World" }); // "Hello World"
```

***

### toInitialCase()

> `static` **toInitialCase**(`input`, `caseType?`): `string`

Defined in: [string/stringUtil.ts:207](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L207)

调整大小写
- 每个单词（`\S+`）独立处理
- 包含非西欧字母字符（如 `.`、`,`、`'`、`-`）时，该词不处理
- 纯字母且全大写时，不处理
- 纯字母且非全大写时：`caseType` 为 `"lower"` 则首字母小写，`"upper"` 则首字母大写，其余字符保留
- ⚠️ 缺省 `caseType` 时不产生任何转换（no-op），需显式传 `"lower"` / `"upper"`

#### Parameters

##### input

`string`

待处理字符串

##### caseType?

`"lower"` \| `"upper"`

大小写类型（缺省时无操作）

#### Returns

`string`

处理后的字符串

#### Example

```ts
// 重载 1: lower
StringUtil.toInitialCase("Hello World", "lower"); // "hello world"

// 重载 2: upper
StringUtil.toInitialCase("hello world", "upper"); // "Hello World"

// 缺省 caseType → no-op
StringUtil.toInitialCase("Hello"); // "Hello"
```

***

### toJson()

#### Call Signature

> `static` **toJson**\<`D`\>(`input`): `D` \| `undefined`

Defined in: [string/stringUtil.ts:295](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L295)

处理 JSON 字符串

##### Type Parameters

###### D

`D` *extends* `AnyObject` = `AnyObject`

##### Parameters

###### input

`string` \| `null` \| `undefined`

待处理字符串

##### Returns

`D` \| `undefined`

解析后的对象 或 回退值

##### Example

```ts
// 重载 1: 无 fallback
StringUtil.toJson<{ a: number }>("{\"a\":1}"); // { a: 1 }
StringUtil.toJson("invalid"); // undefined

// 重载 2: 有 fallback
StringUtil.toJson<{ a: number }>("invalid", { a: 0 }); // { a: 0 }
```

#### Call Signature

> `static` **toJson**\<`D`\>(`input`, `fallback`): `D`

Defined in: [string/stringUtil.ts:296](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L296)

处理 JSON 字符串

##### Type Parameters

###### D

`D` *extends* `AnyObject` = `AnyObject`

##### Parameters

###### input

`string` \| `null` \| `undefined`

待处理字符串

###### fallback

`D`

回退值

##### Returns

`D`

解析后的对象 或 回退值

##### Example

```ts
// 重载 1: 无 fallback
StringUtil.toJson<{ a: number }>("{\"a\":1}"); // { a: 1 }
StringUtil.toJson("invalid"); // undefined

// 重载 2: 有 fallback
StringUtil.toJson<{ a: number }>("invalid", { a: 0 }); // { a: 0 }
```

***

### toLowerCase()

#### Call Signature

> `static` **toLowerCase**\<`T`\>(`input`): `Lowercase`\<`T`\>

Defined in: [string/stringUtil.ts:148](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L148)

将字符串转换为小写
- 将字符串字面量类型转换为其小写形式
- 当输入无效时，返回空字符串

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### input

`T`

待处理字符串

##### Returns

`Lowercase`\<`T`\>

转换后的小写字符串类型，如果输入无效则返回空字符串类型 ""

##### Example

```ts
// 重载 1: 输入 string
StringUtil.toLowerCase("HELLO"); // "hello"

// 重载 2: 输入 unknown
StringUtil.toLowerCase(null); // ""
```

#### Call Signature

> `static` **toLowerCase**(`input`): `""`

Defined in: [string/stringUtil.ts:149](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L149)

将字符串转换为小写
- 将字符串字面量类型转换为其小写形式
- 当输入无效时，返回空字符串

##### Parameters

###### input

`unknown`

待处理字符串

##### Returns

`""`

转换后的小写字符串类型，如果输入无效则返回空字符串类型 ""

##### Example

```ts
// 重载 1: 输入 string
StringUtil.toLowerCase("HELLO"); // "hello"

// 重载 2: 输入 unknown
StringUtil.toLowerCase(null); // ""
```

***

### toNumber()

> `static` **toNumber**(`input`): `string`

Defined in: [string/stringUtil.ts:80](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L80)

从字符串中提取数字字符串
- 移除非数字字符，保留符号和小数点

#### Parameters

##### input

`string`

待处理字符串

#### Returns

`string`

提取出的数字字符串

#### Example

```ts
StringUtil.toNumber("$1,234.56"); // "1234.56"
StringUtil.toNumber("abc-123"); // "-123"
```

***

### toPosix()

> `static` **toPosix**(`input`, `removeLeadingSlash?`): `string`

Defined in: [string/stringUtil.ts:256](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L256)

将路径转换为 POSIX 风格
- 统一使用正斜杠 (/)
- 可选移除 Windows 盘符 (如 C:)
- 可选移除开头的斜杠
- 规范化连续斜杠为单个斜杠

#### Parameters

##### input

`string` \| `null` \| `undefined`

待处理字符串

##### removeLeadingSlash?

`boolean` = `false`

是否移除开头斜杠，默认为 `false`。如果移除了盘符，路径通常会以 / 开头，此参数可控制是否保留该 /

#### Returns

`string`

转换后的路径，如果输入无效则返回空字符串

#### Example

```ts
StringUtil.toPosix("C:\\Windows\\System32"); // 默认: "/Windows/System32" (移除了 C: 并标准化)

StringUtil.toPosix("C:\\Windows\\System32", true); // 移除开头斜杠: "Windows/System32"

StringUtil.toPosix("\\\\server\\share\\file.txt"); // UNC 路径: "/server/share/file.txt"

StringUtil.toPosix("folder\\subfolder\\file.txt"); // 相对路径: "folder/subfolder/file.txt"
```

***

### toUpperCase()

#### Call Signature

> `static` **toUpperCase**\<`T`\>(`input`): `Uppercase`\<`T`\>

Defined in: [string/stringUtil.ts:174](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L174)

将字符串转换为大写
- 将字符串字面量类型转换为其大写形式
- 当输入无效时，返回空字符串

##### Type Parameters

###### T

`T` *extends* `string`

##### Parameters

###### input

`T`

待处理字符串

##### Returns

`Uppercase`\<`T`\>

转换后的大写字符串，如果输入无效则返回空字符串

##### Example

```ts
// 重载 1: 输入 string
StringUtil.toUpperCase("hello"); // "HELLO"

// 重载 2: 输入 unknown
StringUtil.toUpperCase(null); // ""
```

#### Call Signature

> `static` **toUpperCase**(`input`): `""`

Defined in: [string/stringUtil.ts:175](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L175)

将字符串转换为大写
- 将字符串字面量类型转换为其大写形式
- 当输入无效时，返回空字符串

##### Parameters

###### input

`unknown`

待处理字符串

##### Returns

`""`

转换后的大写字符串，如果输入无效则返回空字符串

##### Example

```ts
// 重载 1: 输入 string
StringUtil.toUpperCase("hello"); // "HELLO"

// 重载 2: 输入 unknown
StringUtil.toUpperCase(null); // ""
```

***

### toValues()

#### Call Signature

> `static` **toValues**(`input`, `valueType?`, `splitSymbol?`): `number`[]

Defined in: [string/stringUtil.ts:332](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L332)

字符串分割为数组
- 按指定分隔符分割字符串，并转换类型
- ⚠️ `valueType` 为 `"number"` 时，无法解析的片段会转为 `NaN`，**不进行过滤**

##### Parameters

###### input

`string` \| `null` \| `undefined`

待处理字符串

###### valueType?

`"number"`

数组中每一项的类型，默认为 "number"

###### splitSymbol?

`string`

分隔符，默认为 `,`

##### Returns

`number`[]

分割后的数组

##### Example

```ts
// 重载 1: valueType = "number" (默认)
StringUtil.toValues("1,2,3"); // [1, 2, 3]

// 重载 2: valueType = "string"
StringUtil.toValues("a-b-c", "string", "-"); // ["a", "b", "c"]

// 无法解析的片段 → NaN 不被过滤
StringUtil.toValues("1,abc,3"); // [1, NaN, 3]
```

#### Call Signature

> `static` **toValues**(`input`, `valueType`, `splitSymbol?`): `string`[]

Defined in: [string/stringUtil.ts:333](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L333)

字符串分割为数组
- 按指定分隔符分割字符串，并转换类型
- ⚠️ `valueType` 为 `"number"` 时，无法解析的片段会转为 `NaN`，**不进行过滤**

##### Parameters

###### input

`string` \| `null` \| `undefined`

待处理字符串

###### valueType

`"string"`

数组中每一项的类型，默认为 "number"

###### splitSymbol?

`string`

分隔符，默认为 `,`

##### Returns

`string`[]

分割后的数组

##### Example

```ts
// 重载 1: valueType = "number" (默认)
StringUtil.toValues("1,2,3"); // [1, 2, 3]

// 重载 2: valueType = "string"
StringUtil.toValues("a-b-c", "string", "-"); // ["a", "b", "c"]

// 无法解析的片段 → NaN 不被过滤
StringUtil.toValues("1,abc,3"); // [1, NaN, 3]
```

***

### trim()

> `static` **trim**(`input`, `charsToTrim?`): `string`

Defined in: [string/stringUtil.ts:364](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L364)

从字符串中裁切掉所有的前缀和后缀字符

#### Parameters

##### input

`string` \| `null` \| `undefined`

待处理字符串

##### charsToTrim?

`string` = `" "`

裁切字符，默认为 `" "`

#### Returns

`string`

裁切后的字符串

#### Example

```ts
StringUtil.trim("  hello  "); // "hello"
StringUtil.trim("__hello__", "_"); // "hello"
```

***

### truncate()

> `static` **truncate**(`input`, `maxLength`, `ellipsis?`): `string`

Defined in: [string/stringUtil.ts:387](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/string/stringUtil.ts#L387)

截取字符串
- 支持自定义省略符，不会截断在汉字中间（因为JS字符串本身按字符处理）

#### Parameters

##### input

`string`

待处理字符串

##### maxLength

`number`

最大长度 (包含省略符)

##### ellipsis?

`string` = `"..."`

省略符，默认为 `...`

#### Returns

`string`

截取后的字符串

#### Example

```ts
StringUtil.truncate("hello world", 8); // "hello..."
```
