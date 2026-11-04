[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / ReactOptions

# Interface: ReactOptions

Defined in: [config.ts:245](https://github.com/pawover/pawover-kit/blob/fb0a726c7f2a28ecc76e9dcaaacf64449a3d86e1/packages/eslint-rules/src/config.ts#L245)

React 规则组选项

## Example

```ts
const options: ReactOptions = {
  overrides: { "react/no-implicit-key": "warn" },
  overridesTypeAware: { "react/no-unused-props": "off" },
};
```

## Extends

- [`RulesOverrideOptions`](RulesOverrideOptions.md)

## Properties

### overrides?

> `optional` **overrides?**: `Partial`\<`RulesConfig`\>

Defined in: [config.ts:210](https://github.com/pawover/pawover-kit/blob/fb0a726c7f2a28ecc76e9dcaaacf64449a3d86e1/packages/eslint-rules/src/config.ts#L210)

覆盖该规则组的规则（与预设规则表浅合并，同名规则以本参数为准）

#### Inherited from

[`RulesOverrideOptions`](RulesOverrideOptions.md).[`overrides`](RulesOverrideOptions.md#overrides)

***

### overridesTypeAware?

> `optional` **overridesTypeAware?**: `Partial`\<`RulesConfig`\>

Defined in: [config.ts:247](https://github.com/pawover/pawover-kit/blob/fb0a726c7f2a28ecc76e9dcaaacf64449a3d86e1/packages/eslint-rules/src/config.ts#L247)

仅覆盖依赖类型信息的 react 规则（仅在开启 `typescript` 时生效）
