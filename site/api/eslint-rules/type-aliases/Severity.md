[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / Severity

# Type Alias: Severity

> **Severity** = [`SeverityName`](SeverityName.md) \| [`SeverityLevel`](SeverityLevel.md)

Defined in: [index.ts:41](https://github.com/pawover/pawover-kit/blob/85a3a9b16d60837c188ee91ecdd23fad35562864/packages/eslint-rules/src/index.ts#L41)

规则严重级别

数字与名称两种形式均可，等价于 ESLint 原生 `Linter.RuleLevel`。

## Example

```ts
const a: Severity = 1;
const b: Severity = "off";
```
