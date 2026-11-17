[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / PlainObject

# Type Alias: PlainObject\<K, T\>

> **PlainObject**\<`K`, `T`\> = `Record`\<`K`, `T`\>

Defined in: [base.ts:58](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/types/src/base.ts#L58)

普通对象类型

以索引签名描述普通对象，值类型默认为 `unknown`，比 `AnyObject` 更严格。

## Type Parameters

### K

`K` *extends* `PropertyKey` = `PropertyKey`

键类型

### T

`T` = `unknown`

值类型

## Example

```ts
const obj: PlainObject = { a: 1 };
const strMap: PlainObject<string, string> = { key: "value" };
```
