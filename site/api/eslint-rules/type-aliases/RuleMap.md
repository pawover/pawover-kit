[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / RuleMap

# Type Alias: RuleMap

> **RuleMap** = `NonNullable`\<`Linter.Config`\[`"rules"`\]\>

Defined in: [config.ts:26](https://github.com/pawover/pawover-kit/blob/fb0a726c7f2a28ecc76e9dcaaacf64449a3d86e1/packages/eslint-rules/src/config.ts#L26)

flat config 规则表类型（规则映射统一转换的目标类型）

## Example

```ts
import type { RuleMap } from "@pawover/kit-eslint-rules";

const rules: RuleMap = { "no-console": "error" };
```
