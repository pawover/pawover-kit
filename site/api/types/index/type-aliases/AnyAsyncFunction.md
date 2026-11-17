[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / AnyAsyncFunction

# Type Alias: AnyAsyncFunction\<P, R\>

> **AnyAsyncFunction**\<`P`, `R`\> = (...`args`) => `Promise`\<`R`\>

Defined in: [base.ts:137](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/types/src/base.ts#L137)

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
