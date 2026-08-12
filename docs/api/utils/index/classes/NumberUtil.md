[**@pawover/kit-utils**](../../index.md)

***

[@pawover/kit-utils](../../index.md) / [index](../index.md) / NumberUtil

# Class: NumberUtil

Defined in: [number/numberUtil.ts:6](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/number/numberUtil.ts#L6)

数字工具类

## Constructors

### Constructor

> **new NumberUtil**(): `NumberUtil`

#### Returns

`NumberUtil`

## Methods

### within()

> `static` **within**(`input`, `interval`, `includeLeft?`, `includeRight?`): `boolean`

Defined in: [number/numberUtil.ts:21](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/utils/src/number/numberUtil.ts#L21)

数字区间检查函数

#### Parameters

##### input

`number`

待检查数字

##### interval

\[`number`, `number`\]

由两个数字组成的元组 [left, right]

##### includeLeft?

`boolean` = `true`

是否包含左边界（默认 true）

##### includeRight?

`boolean` = `false`

是否包含右边界（默认 false）

#### Returns

`boolean`

是否在区间内

#### Example

```ts
NumberUtil.within(5, [1, 10]); // true
NumberUtil.within(1, [1, 10], false); // false
```
