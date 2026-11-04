[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / ConfigNames

# Type Alias: ConfigNames

> **ConfigNames** = `DeepValue`\<*typeof* `LAYER_NAMES`\>

Defined in: [config.ts:104](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L104)

各配置层名称

每层配置都带唯一 `name`，可配合 composer 的 `override(name, config)` 精确定位并覆盖。

## Example

```ts
import type { ConfigNames } from "@pawover/kit-eslint-rules";

const name: ConfigNames = "pawover/typescript/rules";
```
