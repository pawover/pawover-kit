[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / AdvancedRecord

# Type Alias: AdvancedRecord\<K, A, mode\>

> **AdvancedRecord**\<`K`, `A`, `mode`\> = `object`\[`mode`\[`0`\]\]\[`mode`\[`1`\]\]

Defined in: [advancedRecord.ts:36](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/types/src/advancedRecord.ts#L36)

高级记录（Advanced Record）

按模式组合生成指定键集合的映射类型，可控制字段的必选/可选与只读/可写。

## Type Parameters

### K

`K` *extends* `PropertyKey`

键集合

### A

`A` = `unknown`

值类型

### mode

`mode` *extends* [`AdvancedRecordMode`](AdvancedRecordMode.md) = \[`"!"`, `"W"`\]

记录模式（默认必选且可读写）

## Example

```ts
// 默认模式：必选且可读写
type A = AdvancedRecord<"id" | "name", string>;
// { id: string; name: string }

// 可选且只读
type B = AdvancedRecord<"id", string, ["?", "R"]>;
// { readonly id?: string }
```
