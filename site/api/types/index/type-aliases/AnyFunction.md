[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / AnyFunction

# Type Alias: AnyFunction\<P, R\>

> **AnyFunction**\<`P`, `R`\> = (...`arg`) => `R`

Defined in: [global.ts:121](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/types/src/global.ts#L121)

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
