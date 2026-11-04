[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / Severity

# Type Alias: Severity

> **Severity** = [`SeverityName`](SeverityName.md) \| [`SeverityLevel`](SeverityLevel.md)

Defined in: [index.ts:52](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/index.ts#L52)

规则严重级别

数字与名称两种形式均可，等价于 ESLint 原生 `Linter.RuleLevel`。

## Example

```ts
const a: Severity = 1;
const b: Severity = "off";
```
