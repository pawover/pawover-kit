[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / TypeScriptOptions

# Interface: TypeScriptOptions

Defined in: [config.ts:225](https://github.com/pawover/pawover-kit/blob/fb0a726c7f2a28ecc76e9dcaaacf64449a3d86e1/packages/eslint-rules/src/config.ts#L225)

TypeScript 规则组选项

## Example

```ts
const options: TypeScriptOptions = {
  overrides: { "ts/consistent-type-definitions": ["error", "interface"] },
  overridesTypeAware: { "ts/no-unsafe-assignment": "warn" },
  parserOptions: { tsconfigRootDir: import.meta.dirname },
};
```

## Extends

- [`RulesOverrideOptions`](RulesOverrideOptions.md)

## Properties

### filesTypeAware?

> `optional` **filesTypeAware?**: `string`[]

Defined in: [config.ts:229](https://github.com/pawover/pawover-kit/blob/fb0a726c7f2a28ecc76e9dcaaacf64449a3d86e1/packages/eslint-rules/src/config.ts#L229)

类型感知规则的文件范围；默认 [GLOB\_TYPESCRIPT](../variables/GLOB_TYPESCRIPT.md)

***

### overrides?

> `optional` **overrides?**: `Partial`\<`RulesConfig`\>

Defined in: [config.ts:210](https://github.com/pawover/pawover-kit/blob/fb0a726c7f2a28ecc76e9dcaaacf64449a3d86e1/packages/eslint-rules/src/config.ts#L210)

覆盖该规则组的规则（与预设规则表浅合并，同名规则以本参数为准）

#### Inherited from

[`RulesOverrideOptions`](RulesOverrideOptions.md).[`overrides`](RulesOverrideOptions.md#overrides)

***

### overridesTypeAware?

> `optional` **overridesTypeAware?**: `Partial`\<`RulesConfig`\>

Defined in: [config.ts:227](https://github.com/pawover/pawover-kit/blob/fb0a726c7f2a28ecc76e9dcaaacf64449a3d86e1/packages/eslint-rules/src/config.ts#L227)

仅覆盖类型感知规则（作用于 `filesTypeAware` 限定的文件）

***

### parserOptions?

> `optional` **parserOptions?**: `Record`\<`string`, `unknown`\>

Defined in: [config.ts:231](https://github.com/pawover/pawover-kit/blob/fb0a726c7f2a28ecc76e9dcaaacf64449a3d86e1/packages/eslint-rules/src/config.ts#L231)

透传给 TypeScript parser 的解析选项；与默认值浅合并，同名键以本参数为准
