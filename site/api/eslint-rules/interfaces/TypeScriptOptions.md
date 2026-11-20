[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / TypeScriptOptions

# Interface: TypeScriptOptions

Defined in: [config.ts:264](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L264)

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

Defined in: [config.ts:268](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L268)

类型感知规则的文件范围；默认 [GLOB\_TYPESCRIPT](../variables/GLOB_TYPESCRIPT.md)

***

### overrides?

> `optional` **overrides?**: `Partial`\<`RulesConfig`\>

Defined in: [config.ts:212](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L212)

覆盖该规则组的规则（与预设规则表浅合并，同名规则以本参数为准）

#### Inherited from

[`RulesOverrideOptions`](RulesOverrideOptions.md).[`overrides`](RulesOverrideOptions.md#overrides)

***

### overridesTypeAware?

> `optional` **overridesTypeAware?**: `Partial`\<`RulesConfig`\>

Defined in: [config.ts:266](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L266)

仅覆盖类型感知规则（作用于 `filesTypeAware` 限定的文件）

***

### parserOptions?

> `optional` **parserOptions?**: `Record`\<`string`, `unknown`\>

Defined in: [config.ts:275](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L275)

透传给 TypeScript parser 的解析选项；与默认值浅合并，同名键以本参数为准

`extraFileExtensions` 例外：启用 `vue` 时会自动并入 `.vue`，本参数中的同名数组与之去重合并；
未启用 `vue` 时按原值透传（不裁剪、不改写）。
