[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / RuleConfig

# Type Alias: RuleConfig\<RuleOptions\>

> **RuleConfig**\<`RuleOptions`\> = [`Severity`](Severity.md) \| \[[`Severity`](Severity.md), `...Partial<RuleOptions>`\]

Defined in: [index.ts:67](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/index.ts#L67)

规则配置

支持纯严重级别，或 `[严重级别, ...规则选项]` 的元组形式，规则选项按 ESLint 规则声明顺序传入。

## Type Parameters

### RuleOptions

`RuleOptions` *extends* `unknown`[] = `unknown`[]

规则选项参数元组

## Example

```ts
const a: RuleConfig = "error";
const b: RuleConfig<[boolean]> = [2, { allowProperties: true }];
```
