[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / ConfigLayer

# Type Alias: ConfigLayer

> **ConfigLayer** = `Linter.Config`

Defined in: [config.ts:44](https://github.com/pawover/pawover-kit/blob/ec2032f35fecda346aa287a28c2f1127f9562f44/packages/eslint-rules/src/config.ts#L44)

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
