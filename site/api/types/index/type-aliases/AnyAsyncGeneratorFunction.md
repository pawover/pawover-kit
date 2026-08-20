[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / AnyAsyncGeneratorFunction

# Type Alias: AnyAsyncGeneratorFunction\<P, T, R, N\>

> **AnyAsyncGeneratorFunction**\<`P`, `T`, `R`, `N`\> = (...`args`) => `AsyncGenerator`\<`T`, `R`, `N`\>

Defined in: [global.ts:175](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/types/src/global.ts#L175)

描述异步生成器函数类型

任意参数且返回 AsyncGenerator 的函数类型。

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

`AsyncGenerator`\<`T`, `R`, `N`\>

## Example

```ts
const fn: AnyAsyncGeneratorFunction<[], number> = async function* () {
  yield 1;
};
```
