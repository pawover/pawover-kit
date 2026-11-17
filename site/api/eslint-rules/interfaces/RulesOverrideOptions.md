[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / RulesOverrideOptions

# Interface: RulesOverrideOptions

Defined in: [config.ts:210](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L210)

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
- [`StylisticOptions`](StylisticOptions.md)
- [`TypeScriptOptions`](TypeScriptOptions.md)
- [`VueOptions`](VueOptions.md)

## Properties

### overrides?

> `optional` **overrides?**: `Partial`\<`RulesConfig`\>

Defined in: [config.ts:212](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L212)

覆盖该规则组的规则（与预设规则表浅合并，同名规则以本参数为准）
