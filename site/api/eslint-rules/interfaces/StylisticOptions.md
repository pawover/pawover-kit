[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / StylisticOptions

# Interface: StylisticOptions

Defined in: [config.ts:245](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L245)

stylistic 规则组选项

除通用 `overrides` 外提供常用风格快捷项；快捷项在装配阶段编译为规则配置，
优先级低于 `overrides`、高于规则映射默认值。

## Examples

```ts
// 单引号 + 不写分号（自动联动 JSX 引号与 TypeScript 成员分隔符）
const options: StylisticOptions = { quotes: "single", semi: false };
```

```ts
// 保留原有 `{ overrides }` 用法
const legacy: StylisticOptions = { overrides: { "stylistic/quotes": 0 } };
```

## Extends

- [`RulesOverrideOptions`](RulesOverrideOptions.md)

## Properties

### overrides?

> `optional` **overrides?**: `Partial`\<`RulesConfig`\>

Defined in: [config.ts:212](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L212)

覆盖该规则组的规则（与预设规则表浅合并，同名规则以本参数为准）

#### Inherited from

[`RulesOverrideOptions`](RulesOverrideOptions.md).[`overrides`](RulesOverrideOptions.md#overrides)

***

### quotes?

> `optional` **quotes?**: [`StylisticQuotes`](../type-aliases/StylisticQuotes.md)

Defined in: [config.ts:247](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L247)

引号风格：同时切换 `stylistic/quotes` 与 `stylistic/jsx-quotes`（不传则不产生覆写）

***

### semi?

> `optional` **semi?**: `boolean`

Defined in: [config.ts:249](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L249)

是否保留语句分号；传 `false` 时自动联动 `stylistic/member-delimiter-style`（不传则不产生覆写）
