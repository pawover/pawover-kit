[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / RuleConfig

# Type Alias: RuleConfig\<RuleOptions\>

> **RuleConfig**\<`RuleOptions`\> = [`Severity`](Severity.md) \| \[[`Severity`](Severity.md), `...Partial<RuleOptions>`\]

Defined in: [index.ts:111](https://github.com/pawover/pawover-kit/blob/75626c4cae689650e8ceffe5d82e9ff45999463c/packages/eslint-rules/src/index.ts#L111)

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
