[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [math](../index.md) / MathUtil

# Class: MathUtil

Defined in: [math/mathUtil.ts:9](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/math/mathUtil.ts#L9)

数学工具类
- 基于 [`mathjs`](https://mathjs.org)

## Constructors

### Constructor

> **new MathUtil**(): `MathUtil`

#### Returns

`MathUtil`

## Methods

### toBignumber()

> `static` **toBignumber**(`mathJsInstance`, `value`, `fallback?`): `BigNumber`

Defined in: [math/mathUtil.ts:24](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/math/mathUtil.ts#L24)

将任意类型的值转换为 `math.bignumber`

#### Parameters

##### mathJsInstance

`MathJsInstance`

mathJs 实例

##### value

`unknown`

任意类型的值

##### fallback?

`BigNumber`

回退值

#### Returns

`BigNumber`

转换后的 BigNumber

#### Example

```ts
import { create, all } from "mathjs";
const math = create(all);
MathUtil.toBignumber(math, "0.1");
```

***

### toDecimal()

#### Call Signature

> `static` **toDecimal**(`mathJsInstance`, `value`, `precision?`, `isFormat?`): `string`

Defined in: [math/mathUtil.ts:55](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/math/mathUtil.ts#L55)

将任意类型的值转换为十进制数字字符串

##### Parameters

###### mathJsInstance

`MathJsInstance`

mathJs 实例

###### value

`unknown`

任意类型的值

###### precision?

`number`

精度

###### isFormat?

`true`

是否格式化为字符串

##### Returns

`string`

格式化后的字符串或 BigNumber

##### Example

```ts
// 重载 1: isFormat = true (默认)
MathUtil.toDecimal(math, 0.12345, 2); // "0.12"

// 重载 2: isFormat = false
MathUtil.toDecimal(math, 0.12345, 2, false); // BigNumber(0.12345)
```

#### Call Signature

> `static` **toDecimal**(`mathJsInstance`, `value`, `precision?`, `isFormat?`): `BigNumber`

Defined in: [math/mathUtil.ts:56](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/math/mathUtil.ts#L56)

将任意类型的值转换为十进制数字字符串

##### Parameters

###### mathJsInstance

`MathJsInstance`

mathJs 实例

###### value

`unknown`

任意类型的值

###### precision?

`number`

精度

###### isFormat?

`false`

是否格式化为字符串

##### Returns

`BigNumber`

格式化后的字符串或 BigNumber

##### Example

```ts
// 重载 1: isFormat = true (默认)
MathUtil.toDecimal(math, 0.12345, 2); // "0.12"

// 重载 2: isFormat = false
MathUtil.toDecimal(math, 0.12345, 2, false); // BigNumber(0.12345)
```

***

### toEvaluate()

> `static` **toEvaluate**(`mathJsInstance`, `expr`, `scope?`): `string`

Defined in: [math/mathUtil.ts:78](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/math/mathUtil.ts#L78)

数学表达式求值

⚠️ 安全警告：mathjs `evaluate` 存在已知的沙箱逃逸向量，**仅限可信输入**（硬编码表达式或受控参数），
切勿直接用于用户提供的表达式。

#### Parameters

##### mathJsInstance

`MathJsInstance`

mathJs 实例

##### expr

`MathExpression`

表达式

##### scope?

`Record`\<`string`, `BigNumber`\>

键值映射

#### Returns

`string`

计算结果的字符串表示

#### Example

```ts
MathUtil.toEvaluate(math, "a + b", { a: 1, b: 2 }); // "3"
```
