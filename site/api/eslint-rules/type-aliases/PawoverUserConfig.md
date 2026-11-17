[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / PawoverUserConfig

# Type Alias: PawoverUserConfig

> **PawoverUserConfig** = [`ConfigLayer`](ConfigLayer.md) \| [`ConfigLayer`](ConfigLayer.md)[] \| `FlatConfigComposer`\<`any`\> \| `Promise`\<[`ConfigLayer`](ConfigLayer.md)[]\>

Defined in: [config.ts:119](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L119)

用户追加的 flat config

可以是单个配置对象、配置数组、composer，或配置数组的 Promise。

## Example

```ts
import type { PawoverUserConfig } from "@pawover/kit-eslint-rules";

const config: PawoverUserConfig = { rules: { "no-console": "error" } };
```
