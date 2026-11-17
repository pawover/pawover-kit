[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / VueOptions

# Interface: VueOptions

Defined in: [config.ts:345](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L345)

vue 规则组选项

命名快捷项分别映射到模板标签、组件属性与自定义事件三条规则：单项优先于总开关 `naming`，
`overrides` 优先于全部快捷项。

## Examples

```ts
// 属性与事件使用 kebab-case，仅模板标签保留 PascalCase
const options: VueOptions = { naming: "kebab-case", templateNaming: "PascalCase" };
```

```ts
// 保留原有 `{ overrides }` 用法
const legacy: VueOptions = { overrides: { "vue/attribute-hyphenation": "off" } };
```

## Extends

- [`RulesOverrideOptions`](RulesOverrideOptions.md)

## Properties

### attributeNaming?

> `optional` **attributeNaming?**: [`VueNamingCasing`](../type-aliases/VueNamingCasing.md)

Defined in: [config.ts:351](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L351)

组件属性命名（`vue/attribute-hyphenation`），优先于 `naming`

***

### eventNaming?

> `optional` **eventNaming?**: [`VueNamingCasing`](../type-aliases/VueNamingCasing.md)

Defined in: [config.ts:353](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L353)

自定义事件命名（`vue/v-on-event-hyphenation`），优先于 `naming`

***

### naming?

> `optional` **naming?**: [`VueNamingCasing`](../type-aliases/VueNamingCasing.md)

Defined in: [config.ts:347](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L347)

命名总开关：一次设定模板标签 / 组件属性 / 自定义事件三条规则

***

### overrides?

> `optional` **overrides?**: `Partial`\<`RulesConfig`\>

Defined in: [config.ts:212](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L212)

覆盖该规则组的规则（与预设规则表浅合并，同名规则以本参数为准）

#### Inherited from

[`RulesOverrideOptions`](RulesOverrideOptions.md).[`overrides`](RulesOverrideOptions.md#overrides)

***

### templateNaming?

> `optional` **templateNaming?**: [`VueNamingCasing`](../type-aliases/VueNamingCasing.md)

Defined in: [config.ts:349](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L349)

模板标签命名（`vue/component-name-in-template-casing`），优先于 `naming`
