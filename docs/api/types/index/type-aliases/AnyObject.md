[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / AnyObject

# Type Alias: AnyObject\<K, T\>

> **AnyObject**\<`K`, `T`\> = `Record`\<`K`, `T`\>

Defined in: [global.ts:42](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/types/src/global.ts#L42)

任意对象类型

以索引签名描述任意键值对对象，键类型默认为 `PropertyKey`，值类型默认为 `any`。

## Type Parameters

### K

`K` *extends* `PropertyKey` = `PropertyKey`

键类型

### T

`T` = `any`

值类型

## Example

```ts
const obj: AnyObject = { a: 1, b: "2" };
const numObj: AnyObject<"id", number> = { id: 1 };
```
