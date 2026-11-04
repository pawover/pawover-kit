[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / TypeScriptOptions

# Interface: TypeScriptOptions

Defined in: [config.ts:226](https://github.com/pawover/pawover-kit/blob/ec2032f35fecda346aa287a28c2f1127f9562f44/packages/eslint-rules/src/config.ts#L226)

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

Defined in: [config.ts:230](https://github.com/pawover/pawover-kit/blob/ec2032f35fecda346aa287a28c2f1127f9562f44/packages/eslint-rules/src/config.ts#L230)

类型感知规则的文件范围；默认 [GLOB\_TYPESCRIPT](../variables/GLOB_TYPESCRIPT.md)

***

### overrides?

> `optional` **overrides?**: `Partial`\<`RulesConfig`\>

Defined in: [config.ts:211](https://github.com/pawover/pawover-kit/blob/ec2032f35fecda346aa287a28c2f1127f9562f44/packages/eslint-rules/src/config.ts#L211)

覆盖该规则组的规则（与预设规则表浅合并，同名规则以本参数为准）

#### Inherited from

[`RulesOverrideOptions`](RulesOverrideOptions.md).[`overrides`](RulesOverrideOptions.md#overrides)

***

### overridesTypeAware?

> `optional` **overridesTypeAware?**: `Partial`\<`RulesConfig`\>

Defined in: [config.ts:228](https://github.com/pawover/pawover-kit/blob/ec2032f35fecda346aa287a28c2f1127f9562f44/packages/eslint-rules/src/config.ts#L228)

仅覆盖类型感知规则（作用于 `filesTypeAware` 限定的文件）

***

### parserOptions?

> `optional` **parserOptions?**: `Record`\<`string`, `unknown`\>

Defined in: [config.ts:232](https://github.com/pawover/pawover-kit/blob/ec2032f35fecda346aa287a28c2f1127f9562f44/packages/eslint-rules/src/config.ts#L232)

透传给 TypeScript parser 的解析选项；与默认值浅合并，同名键以本参数为准
