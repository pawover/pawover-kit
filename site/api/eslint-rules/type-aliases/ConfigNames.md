[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / ConfigNames

# Type Alias: ConfigNames

> **ConfigNames** = `DeepValue`\<*typeof* `LAYER_NAMES`\>

Defined in: [config.ts:103](https://github.com/pawover/pawover-kit/blob/fb0a726c7f2a28ecc76e9dcaaacf64449a3d86e1/packages/eslint-rules/src/config.ts#L103)

各配置层名称

每层配置都带唯一 `name`，可配合 composer 的 `override(name, config)` 精确定位并覆盖。

## Example

```ts
import type { ConfigNames } from "@pawover/kit-eslint-rules";

const name: ConfigNames = "pawover/typescript/rules";
```
