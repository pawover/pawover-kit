[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / GLOB\_SOURCE

# Variable: GLOB\_SOURCE

> `const` **GLOB\_SOURCE**: `string`[]

Defined in: [globs.ts:13](https://github.com/pawover/pawover-kit/blob/ec2032f35fecda346aa287a28c2f1127f9562f44/packages/eslint-rules/src/globs.ts#L13)

全部源文件（js / cjs / mjs / jsx / ts / tsx）

各规则组共享的基础文件范围；启用 `vue` 时工厂会在其后追加 [GLOB\_VUE](GLOB_VUE.md)。

## Example

```ts
import { GLOB_SOURCE, GLOB_VUE } from "@pawover/kit-eslint-rules";

const files = [...GLOB_SOURCE, GLOB_VUE];
```
