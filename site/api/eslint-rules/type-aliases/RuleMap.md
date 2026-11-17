[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / RuleMap

# Type Alias: RuleMap

> **RuleMap** = `NonNullable`\<`Linter.Config`\[`"rules"`\]\>

Defined in: [config.ts:28](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L28)

flat config 规则表类型（规则映射统一转换的目标类型）

## Example

```ts
import type { RuleMap } from "@pawover/kit-eslint-rules";

const rules: RuleMap = { "no-console": "error" };
```
