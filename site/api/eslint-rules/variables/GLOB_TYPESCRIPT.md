[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / GLOB\_TYPESCRIPT

# Variable: GLOB\_TYPESCRIPT

> `const` **GLOB\_TYPESCRIPT**: `string`[]

Defined in: globs.ts:27

TypeScript 源文件（ts / tsx）

类型感知规则与 TypeScript parser 的默认作用范围；后置覆盖 `ts/*` 类型感知规则时应使用该常量限定 `files`。

## Example

```ts
import { GLOB_TYPESCRIPT } from "@pawover/kit-eslint-rules";

const files = GLOB_TYPESCRIPT;
```
