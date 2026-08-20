[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / PlainObject

# Type Alias: PlainObject\<K, T\>

> **PlainObject**\<`K`, `T`\> = `Record`\<`K`, `T`\>

Defined in: [global.ts:58](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/types/src/global.ts#L58)

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
