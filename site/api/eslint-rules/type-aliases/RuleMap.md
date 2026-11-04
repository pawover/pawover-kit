[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / RuleMap

# Type Alias: RuleMap

> **RuleMap** = `NonNullable`\<`Linter.Config`\[`"rules"`\]\>

Defined in: [config.ts:27](https://github.com/pawover/pawover-kit/blob/ec2032f35fecda346aa287a28c2f1127f9562f44/packages/eslint-rules/src/config.ts#L27)

flat config 规则表类型（规则映射统一转换的目标类型）

## Example

```ts
import type { RuleMap } from "@pawover/kit-eslint-rules";

const rules: RuleMap = { "no-console": "error" };
```
