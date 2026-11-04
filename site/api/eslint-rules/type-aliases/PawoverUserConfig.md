[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / PawoverUserConfig

# Type Alias: PawoverUserConfig

> **PawoverUserConfig** = [`ConfigLayer`](ConfigLayer.md) \| [`ConfigLayer`](ConfigLayer.md)[] \| `FlatConfigComposer`\<`any`\> \| `Promise`\<[`ConfigLayer`](ConfigLayer.md)[]\>

Defined in: [config.ts:117](https://github.com/pawover/pawover-kit/blob/fb0a726c7f2a28ecc76e9dcaaacf64449a3d86e1/packages/eslint-rules/src/config.ts#L117)

用户追加的 flat config

可以是单个配置对象、配置数组、composer，或配置数组的 Promise。

## Example

```ts
import type { PawoverUserConfig } from "@pawover/kit-eslint-rules";

const config: PawoverUserConfig = { rules: { "no-console": "error" } };
```
