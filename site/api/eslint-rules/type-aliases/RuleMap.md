[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / RuleMap

# Type Alias: RuleMap

> **RuleMap** = `NonNullable`\<`Linter.Config`\[`"rules"`\]\>

Defined in: [config.ts:27](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L27)

flat config 规则表类型（规则映射统一转换的目标类型）

## Example

```ts
import type { RuleMap } from "@pawover/kit-eslint-rules";

const rules: RuleMap = { "no-console": "error" };
```
