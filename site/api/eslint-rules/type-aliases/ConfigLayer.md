[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / ConfigLayer

# Type Alias: ConfigLayer

> **ConfigLayer** = `Linter.Config`

Defined in: [config.ts:43](https://github.com/pawover/pawover-kit/blob/fb0a726c7f2a28ecc76e9dcaaacf64449a3d86e1/packages/eslint-rules/src/config.ts#L43)

单个 flat config 配置层

每个配置层都带唯一 `name`，可配合 composer 的 `override(name, config)` 精确定位并覆盖。

## Example

```ts
import type { ConfigLayer } from "@pawover/kit-eslint-rules";

const layer: ConfigLayer = {
  name: "custom/rules",
  rules: { "no-console": "error" },
};
```
