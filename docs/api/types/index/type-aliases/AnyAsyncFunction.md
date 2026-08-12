[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / AnyAsyncFunction

# Type Alias: AnyAsyncFunction\<P, R\>

> **AnyAsyncFunction**\<`P`, `R`\> = (...`args`) => `Promise`\<`R`\>

Defined in: [global.ts:137](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/types/src/global.ts#L137)

描述异步函数类型

任意参数且返回 Promise 的函数类型。

## Type Parameters

### P

`P` *extends* `any`[] = `any`[]

参数元组类型

### R

`R` = `any`

返回值类型

## Parameters

### args

...`P`

## Returns

`Promise`\<`R`\>

## Example

```ts
const fn: AnyAsyncFunction = async () => {};
const fetchFn: AnyAsyncFunction<[string], number> = async (url) => (await fetch(url)).status;
```
