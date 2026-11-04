[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / ReactOptions

# Interface: ReactOptions

Defined in: [config.ts:247](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L247)

React 规则组选项

## Example

```ts
const options: ReactOptions = {
  compiler: "latest",
  overrides: { "react/no-implicit-key": "warn" },
  overridesTypeAware: { "react/no-unused-props": "off" },
};
```

## Extends

- [`RulesOverrideOptions`](RulesOverrideOptions.md)

## Properties

### compiler?

> `optional` **compiler?**: `boolean` \| [`ReactCompilerPreset`](../type-aliases/ReactCompilerPreset.md)

Defined in: [config.ts:266](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L266)

React Compiler 规则切换

react 组启用时默认开启（`true` 等价 `"recommended"`）：将 10 条与 `@eslint-react` 重叠的
Compiler 规则切换为 `eslint-plugin-react-hooks` 官方实现，并关闭 `@eslint-react` 等价规则；
传 `false` 回退到 `@eslint-react` 实现，传 `"latest"` 额外启用实验性 `react-hooks/void-use-memo`。

仅控制这 10 条重叠规则；官方独有的 `config` / `gating` / `incompatible-library` /
`preserve-manual-memoization` 始终由 `react-hooks` 提供。

#### Default

```ts
true
```

#### Example

```ts
const options: ReactOptions = { compiler: "latest" };
const legacy: ReactOptions = { compiler: false };
```

***

### overrides?

> `optional` **overrides?**: `Partial`\<`RulesConfig`\>

Defined in: [config.ts:211](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L211)

覆盖该规则组的规则（与预设规则表浅合并，同名规则以本参数为准）

#### Inherited from

[`RulesOverrideOptions`](RulesOverrideOptions.md).[`overrides`](RulesOverrideOptions.md#overrides)

***

### overridesTypeAware?

> `optional` **overridesTypeAware?**: `Partial`\<`RulesConfig`\>

Defined in: [config.ts:268](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L268)

仅覆盖依赖类型信息的 react 规则（仅在开启 `typescript` 时生效）
