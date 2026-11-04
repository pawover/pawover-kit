[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / PawoverUserConfig

# Type Alias: PawoverUserConfig

> **PawoverUserConfig** = [`ConfigLayer`](ConfigLayer.md) \| [`ConfigLayer`](ConfigLayer.md)[] \| `FlatConfigComposer`\<`any`\> \| `Promise`\<[`ConfigLayer`](ConfigLayer.md)[]\>

Defined in: [config.ts:118](https://github.com/pawover/pawover-kit/blob/ec2032f35fecda346aa287a28c2f1127f9562f44/packages/eslint-rules/src/config.ts#L118)

用户追加的 flat config

可以是单个配置对象、配置数组、composer，或配置数组的 Promise。

## Example

```ts
import type { PawoverUserConfig } from "@pawover/kit-eslint-rules";

const config: PawoverUserConfig = { rules: { "no-console": "error" } };
```
