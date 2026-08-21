[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / AnyGeneratorFunction

# Type Alias: AnyGeneratorFunction\<P, T, R, N\>

> **AnyGeneratorFunction**\<`P`, `T`, `R`, `N`\> = (...`args`) => `Generator`\<`T`, `R`, `N`\>

Defined in: [global.ts:156](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/types/src/global.ts#L156)

描述生成器函数类型

任意参数且返回 Generator 的函数类型。

## Type Parameters

### P

`P` *extends* `any`[] = `any`[]

参数元组类型

### T

`T` = `any`

产出值类型

### R

`R` = `any`

返回值类型

### N

`N` = `any`

下一传入值类型

## Parameters

### args

...`P`

## Returns

`Generator`\<`T`, `R`, `N`\>

## Example

```ts
const fn: AnyGeneratorFunction<[], number> = function* () {
  yield 1;
};
```
