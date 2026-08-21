[**@pawover/kit-types**](../../index.md)

***

[@pawover/kit-types](../../index.md) / [index](../index.md) / AdvancedRecordMode

# Type Alias: AdvancedRecordMode

> **AdvancedRecordMode** = \[`"?"` \| `"!"`, `"W"` \| `"R"`\]

Defined in: [advancedRecord.ts:14](https://github.com/pawover/pawover-kit/blob/14c8a7a3c20959e35dd29ccf637538d86744f7d3/packages/types/src/advancedRecord.ts#L14)

高级记录模式

由必选/可选标记（`"?"` | `"!"`）与读写权限标记（`"W"` | `"R"`）组成的二元组，用于控制 `AdvancedRecord` 的字段形态。

## Example

```ts
// 必选且可读写
const mode: AdvancedRecordMode = ["!", "W"];
// 可选且只读
const readonlyMode: AdvancedRecordMode = ["?", "R"];
```
