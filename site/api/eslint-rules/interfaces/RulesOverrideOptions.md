[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / RulesOverrideOptions

# Interface: RulesOverrideOptions

Defined in: [config.ts:209](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L209)

规则组覆盖选项

覆盖规则会与预设规则表合并，同名规则以 `overrides` 为准。

## Example

```ts
const options: RulesOverrideOptions = {
  overrides: { "ts/consistent-type-definitions": ["error", "interface"] },
};
```

## Extended by

- [`ReactOptions`](ReactOptions.md)
- [`TypeScriptOptions`](TypeScriptOptions.md)

## Properties

### overrides?

> `optional` **overrides?**: `Partial`\<`RulesConfig`\>

Defined in: [config.ts:211](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L211)

覆盖该规则组的规则（与预设规则表浅合并，同名规则以本参数为准）
