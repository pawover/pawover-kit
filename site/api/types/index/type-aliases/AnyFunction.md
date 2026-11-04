[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / AnyFunction

# Type Alias: AnyFunction\<P, R\>

> **AnyFunction**\<`P`, `R`\> = (...`arg`) => `R`

Defined in: [base.ts:121](https://github.com/pawover/pawover-kit/blob/8bbcd05722997f38c09e1ba2d94b79973ae2f68b/packages/types/src/base.ts#L121)

描述函数类型

任意参数与任意返回值的函数类型。

## Type Parameters

### P

`P` *extends* `any`[] = `any`[]

参数元组类型

### R

`R` = `any`

返回值类型

## Parameters

### arg

...`P`

## Returns

`R`

## Example

```ts
const fn: AnyFunction = (a, b) => a + b;
const strFn: AnyFunction<[string], string> = (s) => s.toUpperCase();
```
