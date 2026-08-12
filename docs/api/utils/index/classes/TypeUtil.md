[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / TypeUtil

# Class: TypeUtil

Defined in: [type/typeUtil.ts:8](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L8)

类型工具类

## Constructors

### Constructor

> **new TypeUtil**(): `TypeUtil`

#### Returns

`TypeUtil`

## Methods

### isAbortSignal()

> `static` **isAbortSignal**(`value`): `value is AbortSignal`

Defined in: [type/typeUtil.ts:817](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L817)

检查 value 是否为 AbortSignal

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is AbortSignal`

是否为 AbortSignal

#### Example

```ts
TypeUtil.isAbortSignal(new AbortController().signal); // true
```

***

### isArray()

> `static` **isArray**(`value`): `value is unknown[]`

Defined in: [type/typeUtil.ts:557](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L557)

检查 value 是否为数组

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is unknown[]`

是否为数组

#### Example

```ts
TypeUtil.isArray([]); // true
```

***

### isAsyncFunction()

> `static` **isAsyncFunction**(`value`): `value is AnyAsyncFunction`

Defined in: [type/typeUtil.ts:318](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L318)

检查 value 是否为 AsyncFunction

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is AnyAsyncFunction`

是否为 AsyncFunction

#### Example

```ts
TypeUtil.isAsyncFunction(async () => {}); // true
```

***

### isAsyncGeneratorFunction()

> `static` **isAsyncGeneratorFunction**(`value`): `value is AnyAsyncGeneratorFunction`

Defined in: [type/typeUtil.ts:344](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L344)

检查 value 是否为 AsyncGeneratorFunction

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is AnyAsyncGeneratorFunction`

是否为 AsyncGeneratorFunction

#### Example

```ts
TypeUtil.isAsyncGeneratorFunction(async function * a () {}); // true
```

***

### isBigInt()

> `static` **isBigInt**(`value`): `value is bigint`

Defined in: [type/typeUtil.ts:239](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L239)

检查 value 是否为 BigInt

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is bigint`

是否为 BigInt

#### Example

```ts
TypeUtil.isBigInt(1n); // true
```

***

### isBlob()

> `static` **isBlob**(`value`): `value is Blob`

Defined in: [type/typeUtil.ts:636](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L636)

检查 value 是否为 Blob

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is Blob`

是否为 Blob

#### Example

```ts
TypeUtil.isBlob(new Blob(["a"])); // true
```

***

### isBoolean()

> `static` **isBoolean**(`value`): `value is boolean`

Defined in: [type/typeUtil.ts:226](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L226)

检查 value 是否为 Boolean

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is boolean`

是否为 Boolean

#### Example

```ts
TypeUtil.isBoolean(false); // true
```

***

### isClass()

> `static` **isClass**(`value`): `value is Class<AnyObject, unknown[]>`

Defined in: [type/typeUtil.ts:543](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L543)

检查 value 是否为 Class

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is Class<AnyObject, unknown[]>`

是否为 Class

#### Example

```ts
class A {}
TypeUtil.isClass(A); // true
TypeUtil.isClass(() => {}); // false
```

***

### isDate()

> `static` **isDate**(`value`, `invalidCheck?`): `value is Date`

Defined in: [type/typeUtil.ts:723](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L723)

检查 value 是否为 Date 对象

#### Parameters

##### value

`unknown`

待检查值

##### invalidCheck?

`boolean` = `true`

是否要求日期有效（非 Invalid Date）。默认 true
  - true: 仅当是有效 Date 对象时返回 true（排除 new Date('invalid')）
  - false: 只要 [[Prototype]] 是 Date 即返回 true（包含 Invalid Date）

#### Returns

`value is Date`

是否为 Date 对象，根据 invalidCheck 返回不同语义的 Date 判定

#### Example

```ts
TypeUtil.isDate(new Date()); // true
TypeUtil.isDate(new Date('invalid')); // false
TypeUtil.isDate(new Date('invalid'), false); // true
TypeUtil.isDate(null); // false
TypeUtil.isDate({}); // false
```

***

### isEnumeration()

> `static` **isEnumeration**(`enumeration`): \[`boolean`, `boolean`\]

Defined in: [type/typeUtil.ts:433](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L433)

判断一个对象是否为有效的枚举
- 枚举成员不能为空
- 枚举成员的键不能具有数值名
- 枚举成员的值必须类型一致且为 `string` 或 `number` 类型
- 枚举成员的值不能重复
- 枚举成员的值必须全部为双向映射或非双向映射

#### Parameters

##### enumeration

`PlainObject`

待检查值

#### Returns

\[`boolean`, `boolean`\]

[是否为有效的枚举, 是否为双向枚举]

#### Example

```ts
enum A { X, Y }
TypeUtil.isEnumeration(A); // [true, true]
```

***

### isError()

> `static` **isError**(`value`): `value is Error`

Defined in: [type/typeUtil.ts:755](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L755)

检查 value 是否为 Error 对象

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is Error`

是否为 Error

#### Example

```ts
TypeUtil.isError(new Error("x")); // true
```

***

### isFalsy()

> `static` **isFalsy**(`value`): `boolean`

Defined in: [type/typeUtil.ts:845](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L845)

检查 value 是否为 Falsy 值 (false, 0, "", null, undefined, NaN, 0n)
- 处理非字符串形式的 falsy；字符串形式（`"null"`、`"0"` 等）请使用 `isFalsyLike`

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`boolean`

是否为 Falsy

#### Example

```ts
TypeUtil.isFalsy(0); // true
```

***

### isFalsyLike()

> `static` **isFalsyLike**(`value`): `boolean`

Defined in: [type/typeUtil.ts:861](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L861)

检查 value 是否为 FalsyLike 值
- 包含字符串形式的 `"null"`、`"undefined"`、`"false"`、`"0"` 等

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`boolean`

是否为 FalsyLike

#### Example

```ts
TypeUtil.isFalsyLike("false"); // true
TypeUtil.isFalsyLike("hello"); // false
```

***

### isFile()

> `static` **isFile**(`value`): `value is File`

Defined in: [type/typeUtil.ts:649](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L649)

检查 value 是否为 File

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is File`

是否为 File

#### Example

```ts
TypeUtil.isFile(new File(["a"], "a.txt")); // true
```

***

### isFunction()

> `static` **isFunction**(`value`): `value is AnyFunction`

Defined in: [type/typeUtil.ts:305](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L305)

检查 value 是否为 Function

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is AnyFunction`

是否为 Function

#### Example

```ts
TypeUtil.isFunction(() => {}); // true
```

***

### isGeneratorFunction()

> `static` **isGeneratorFunction**(`value`): `value is AnyGeneratorFunction`

Defined in: [type/typeUtil.ts:331](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L331)

检查 value 是否为 GeneratorFunction

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is AnyGeneratorFunction`

是否为 GeneratorFunction

#### Example

```ts
TypeUtil.isGeneratorFunction(function * a () {}); // true
```

***

### isIframe()

> `static` **isIframe**(`value`): `value is HTMLIFrameElement`

Defined in: [type/typeUtil.ts:697](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L697)

检查 value 是否为 HTMLIFrameElement

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is HTMLIFrameElement`

是否为 HTMLIFrameElement

#### Example

```ts
TypeUtil.isIframe(document.createElement("iframe")); // true
```

***

### isInfinity()

> `static` **isInfinity**(`value`): `value is number`

Defined in: [type/typeUtil.ts:188](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L188)

检查 value 是否为 Infinity
- 排除 `NaN`

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is number`

#### Example

```ts
TypeUtil.isInfinity(Infinity); // true
TypeUtil.isInfinity(1); // false
```

***

### isInfinityLike()

> `static` **isInfinityLike**(`value`): `boolean`

Defined in: [type/typeUtil.ts:203](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L203)

检查 value 是否类似 Infinity
- 排除 `NaN`

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`boolean`

#### Example

```ts
TypeUtil.isInfinityLike("Infinity"); // true
TypeUtil.isInfinityLike("123"); // false
```

***

### isInteger()

> `static` **isInteger**(`value`, `checkSafe?`): `value is number`

Defined in: [type/typeUtil.ts:139](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L139)

检查 value 是否为整数

#### Parameters

##### value

`unknown`

待检查值

##### checkSafe?

`boolean` = `true`

是否附加安全整数检查

#### Returns

`value is number`

是否为整数

#### Example

```ts
TypeUtil.isInteger(1); // true
TypeUtil.isInteger(1.1); // false
```

***

### isIterable()

> `static` **isIterable**(`value`): `value is { [iterator]: () => Iterator<unknown> }`

Defined in: [type/typeUtil.ts:830](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L830)

检查 value 是否为可迭代对象 (Iterable)

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is { [iterator]: () => Iterator<unknown> }`

是否为 Iterable

#### Example

```ts
TypeUtil.isIterable([1, 2]); // true
```

***

### isMap()

> `static` **isMap**(`value`): `value is Map<unknown, unknown>`

Defined in: [type/typeUtil.ts:584](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L584)

检查 value 是否为 Map

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is Map<unknown, unknown>`

是否为 Map

#### Example

```ts
TypeUtil.isMap(new Map()); // true
```

***

### isNaN()

> `static` **isNaN**(`value`): `value is number`

Defined in: [type/typeUtil.ts:123](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L123)

检查 value 是否为 NaN
- 禁止使用全局 `isNaN`，其会先进行隐式数字转换，可能导致误判（例如 `isNaN("foo") === true`）
- 使用 `Number.isNaN` 仅在值本身就是 `NaN` 时返回 `true`，语义更严格且更安全

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is number`

是否为 NaN

#### Example

```ts
TypeUtil.isNaN(NaN); // true
```

***

### isNegativeInteger()

> `static` **isNegativeInteger**(`value`, `checkSafe?`): `value is number`

Defined in: [type/typeUtil.ts:173](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L173)

检查 value 是否为负整数
- 此函数中 `0` 不被视为负整数

#### Parameters

##### value

`unknown`

待检查值

##### checkSafe?

`boolean` = `true`

是否附加安全整数检查

#### Returns

`value is number`

#### Example

```ts
TypeUtil.isNegativeInteger(-1); // true
TypeUtil.isNegativeInteger(0); // false
```

***

### isNull()

> `static` **isNull**(`value`): `value is null`

Defined in: [type/typeUtil.ts:278](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L278)

检查 value 是否为 null

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is null`

是否为 null

#### Example

```ts
TypeUtil.isNull(null); // true
```

***

### isNullish()

> `static` **isNullish**(`value`): value is null \| undefined

Defined in: [type/typeUtil.ts:292](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L292)

检查 value 是否为 null 或 undefined

#### Parameters

##### value

`unknown`

待检查值

#### Returns

value is null \| undefined

是否为 Nullish

#### Example

```ts
TypeUtil.isNullish(null); // true
TypeUtil.isNullish(undefined); // true
```

***

### isNumber()

> `static` **isNumber**(`value`, `checkNaN?`): `value is number`

Defined in: [type/typeUtil.ts:107](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L107)

检查 value 是否为 number 类型
- 默认会调用 `TypeUtil.isNaN`（内部基于 `Number.isNaN`）过滤掉 `NaN`

#### Parameters

##### value

`unknown`

待检查值

##### checkNaN?

`boolean` = `true`

是否检查 `NaN`，默认为 `true`

#### Returns

`value is number`

是否为 number

#### Example

```ts
TypeUtil.isNumber(1); // true
TypeUtil.isNumber(NaN); // false (default)
TypeUtil.isNumber(NaN, false); // true
```

***

### isObject()

> `static` **isObject**(`value`): `value is object`

Defined in: [type/typeUtil.ts:413](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L413)

判断是否为广义对象类型

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is object`

是否为对象

#### Example

```ts
TypeUtil.isObject({}); // true
TypeUtil.isObject([]); // true
TypeUtil.isObject(new Date()); // true
TypeUtil.isObject(null); // false
TypeUtil.isObject("string"); // false
```

***

### isPlainObject()

> `static` **isPlainObject**(`value`, `prototypeCheck?`): `value is Record<PropertyKey, unknown>`

Defined in: [type/typeUtil.ts:393](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L393)

判断是否为普通对象类型
- 可选是否检查原型为 `Object.prototype`，防止原型链污染

#### Parameters

##### value

`unknown`

待检查值

##### prototypeCheck?

`boolean` = `true`

是否进行原型检查，默认 `true`

#### Returns

`value is Record<PropertyKey, unknown>`

是否为 Plain Object (当 prototypeCheck=true) 或 object

#### Example

```ts
TypeUtil.isPlainObject({}); // true
TypeUtil.isPlainObject([]); // false
TypeUtil.isPlainObject(new Date()); // false
TypeUtil.isPlainObject(new (class {})()); // false
TypeUtil.isPlainObject(new (class {})(), false); // true
TypeUtil.isPlainObject(Object.create(null)) // false
TypeUtil.isPlainObject(Object.create(null), false) // true
```

***

### isPositiveInteger()

> `static` **isPositiveInteger**(`value`, `checkSafe?`): `value is number`

Defined in: [type/typeUtil.ts:157](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L157)

检查 value 是否为正整数
- 此函数中 `0` 不被视为正整数

#### Parameters

##### value

`unknown`

待检查值

##### checkSafe?

`boolean` = `true`

是否附加安全整数检查

#### Returns

`value is number`

#### Example

```ts
TypeUtil.isPositiveInteger(1); // true
TypeUtil.isPositiveInteger(0); // false
```

***

### isPromise()

> `static` **isPromise**(`value`): `value is Promise<unknown>`

Defined in: [type/typeUtil.ts:357](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L357)

检查 value 是否为 Promise

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is Promise<unknown>`

是否为 Promise

#### Example

```ts
TypeUtil.isPromise(Promise.resolve(1)); // true
```

***

### isPromiseLike()

> `static` **isPromiseLike**(`value`): `value is PromiseLike<unknown>`

Defined in: [type/typeUtil.ts:371](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L371)

检查 value 是否为 PromiseLike
- 可识别拥有 then 方法的非 Promise 对象

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is PromiseLike<unknown>`

是否为 PromiseLike

#### Example

```ts
TypeUtil.isPromiseLike({ then: () => {} }); // true
```

***

### isReadableStream()

> `static` **isReadableStream**(`value`): `value is ReadableStream<any>`

Defined in: [type/typeUtil.ts:667](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L667)

检查 value 是否为 ReadableStream
- Uses `Object.prototype.toString` where supported (modern browsers, Node.js ≥18).
- Falls back to duck-typing in older environments.
- Resistant to basic forgery, but not 100% secure in all polyfill scenarios.
- ⚠️ Note: In older Node.js (<18) or with non-compliant polyfills, this may return false positives or negatives.

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is ReadableStream<any>`

是否为 ReadableStream

#### Example

```ts
TypeUtil.isReadableStream(new ReadableStream()); // true
```

***

### isRegExp()

> `static` **isRegExp**(`value`): `value is RegExp`

Defined in: [type/typeUtil.ts:768](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L768)

检查 value 是否为 RegExp

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is RegExp`

是否为 RegExp

#### Example

```ts
TypeUtil.isRegExp(/a/); // true
```

***

### isSet()

> `static` **isSet**(`value`): `value is Set<unknown>`

Defined in: [type/typeUtil.ts:610](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L610)

检查 value 是否为 Set

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is Set<unknown>`

是否为 Set

#### Example

```ts
TypeUtil.isSet(new Set()); // true
```

***

### isString()

> `static` **isString**(`value`, `checkNullish?`): `value is string`

Defined in: [type/typeUtil.ts:89](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L89)

检查 value 是否为 string 类型
- 当 `checkNullish` 为 `true` 时，会先 trim 再判断是否为空

#### Parameters

##### value

`unknown`

待检查值

##### checkNullish?

`boolean` = `false`

是否检查空字符串（含空白字符串），默认为 `false`

#### Returns

`value is string`

是否为字符串

#### Example

```ts
TypeUtil.isString("abc"); // true
TypeUtil.isString(""); // true
TypeUtil.isString("", true); // false
TypeUtil.isString("   ", true); // false
TypeUtil.isString(" a ", true); // true
```

***

### isSymbol()

> `static` **isSymbol**(`value`): `value is symbol`

Defined in: [type/typeUtil.ts:252](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L252)

检查 value 是否为 Symbol

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is symbol`

是否为 Symbol

#### Example

```ts
TypeUtil.isSymbol(Symbol("a")); // true
```

***

### isTypedArray()

> `static` **isTypedArray**(`value`): `value is TypedArray`

Defined in: [type/typeUtil.ts:571](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L571)

检查 value 是否为 TypedArray

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is TypedArray`

是否为 TypedArray

#### Example

```ts
TypeUtil.isTypedArray(new Int8Array()); // true
```

***

### isUndefined()

> `static` **isUndefined**(`value`): `value is undefined`

Defined in: [type/typeUtil.ts:265](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L265)

检查 value 是否为 undefined

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is undefined`

是否为 undefined

#### Example

```ts
TypeUtil.isUndefined(undefined); // true
```

***

### isURLSearchParams()

> `static` **isURLSearchParams**(`value`): `value is URLSearchParams`

Defined in: [type/typeUtil.ts:804](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L804)

检查 value 是否为 URLSearchParams

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is URLSearchParams`

是否为 URLSearchParams

#### Example

```ts
TypeUtil.isURLSearchParams(new URLSearchParams("a=1")); // true
```

***

### isWeakMap()

> `static` **isWeakMap**(`value`): `value is WeakMap<AnyObject, unknown>`

Defined in: [type/typeUtil.ts:597](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L597)

检查 value 是否为 WeakMap

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is WeakMap<AnyObject, unknown>`

是否为 WeakMap

#### Example

```ts
TypeUtil.isWeakMap(new WeakMap()); // true
```

***

### isWeakSet()

> `static` **isWeakSet**(`value`): `value is WeakSet<AnyObject>`

Defined in: [type/typeUtil.ts:623](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L623)

检查 value 是否为 WeakSet

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is WeakSet<AnyObject>`

是否为 WeakSet

#### Example

```ts
TypeUtil.isWeakSet(new WeakSet()); // true
```

***

### isWebSocket()

> `static` **isWebSocket**(`value`): `value is WebSocket`

Defined in: [type/typeUtil.ts:791](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L791)

检查 value 是否为 WebSocket

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is WebSocket`

是否为 WebSocket

#### Example

```ts
TypeUtil.isWebSocket(new WebSocket("wss://echo.websocket.events")); // true
```

***

### isWindow()

> `static` **isWindow**(`value`): `value is Window`

Defined in: [type/typeUtil.ts:684](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/type/typeUtil.ts#L684)

检查 value 是否为 Window

#### Parameters

##### value

`unknown`

待检查值

#### Returns

`value is Window`

是否为 Window

#### Example

```ts
TypeUtil.isWindow(window); // true
```
