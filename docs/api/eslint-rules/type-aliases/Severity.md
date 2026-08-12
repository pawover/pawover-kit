[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / Severity

# Type Alias: Severity

> **Severity** = [`SeverityName`](SeverityName.md) \| [`SeverityLevel`](SeverityLevel.md)

Defined in: [index.ts:96](https://github.com/pawover/pawover-kit/blob/c7ad4b28b853dd71e18102c2f8a46a19c98bd3fd/packages/eslint-rules/src/index.ts#L96)

规则严重级别

数字与名称两种形式均可，等价于 ESLint 原生 `Linter.RuleLevel`。

## Example

```ts
const a: Severity = 1;
const b: Severity = "off";
```
