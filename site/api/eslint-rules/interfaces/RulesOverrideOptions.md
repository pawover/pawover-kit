[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / RulesOverrideOptions

# Interface: RulesOverrideOptions

Defined in: [config.ts:208](https://github.com/pawover/pawover-kit/blob/fb0a726c7f2a28ecc76e9dcaaacf64449a3d86e1/packages/eslint-rules/src/config.ts#L208)

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

Defined in: [config.ts:210](https://github.com/pawover/pawover-kit/blob/fb0a726c7f2a28ecc76e9dcaaacf64449a3d86e1/packages/eslint-rules/src/config.ts#L210)

覆盖该规则组的规则（与预设规则表浅合并，同名规则以本参数为准）
