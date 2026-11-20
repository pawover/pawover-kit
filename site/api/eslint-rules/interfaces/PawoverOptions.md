[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / PawoverOptions

# Interface: PawoverOptions

Defined in: [config.ts:381](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L381)

预设工厂选项

除 `javascript` 规则组常开外，其余规则组均通过对应字段显式开启。
每个规则组都接受 `{ overrides }` 形式，在预设内部完成规则覆盖，避免后置配置层与 flat config 插件作用域的问题。

## Examples

```ts
const options: PawoverOptions = {
  typescript: {
    overrides: { "ts/strict-void-return": [1, { allowReturnAny: true }] },
  },
  react: true,
};
```

```ts
// 风格快捷开关
const options: PawoverOptions = {
  stylistic: { quotes: "single", semi: false },
  vue: { naming: "kebab-case" },
};
```

## Properties

### antfu?

> `optional` **antfu?**: `boolean` \| [`RulesOverrideOptions`](RulesOverrideOptions.md)

Defined in: [config.ts:389](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L389)

启用 `antfu` 规则组

***

### imports?

> `optional` **imports?**: `boolean` \| [`RulesOverrideOptions`](RulesOverrideOptions.md)

Defined in: [config.ts:391](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L391)

启用 `imports` 规则组（eslint-plugin-import-lite）

***

### importsSort?

> `optional` **importsSort?**: `boolean` \| [`RulesOverrideOptions`](RulesOverrideOptions.md)

Defined in: [config.ts:393](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L393)

启用 `importsSort` 规则组（eslint-plugin-simple-import-sort）

***

### javascript?

> `optional` **javascript?**: [`RulesOverrideOptions`](RulesOverrideOptions.md)

Defined in: [config.ts:383](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L383)

javascript 规则组覆盖选项（该组常开）

***

### react?

> `optional` **react?**: `boolean` \| [`ReactOptions`](ReactOptions.md)

Defined in: [config.ts:395](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L395)

启用 `react` 规则组（注册 `@eslint-react` 与 `eslint-plugin-react-hooks` 两个插件，默认开启 React Compiler 规则切换）；与 `typescript` 同开时，依赖类型信息的规则作用于 ts/tsx/jsx

***

### stylistic?

> `optional` **stylistic?**: `boolean` \| [`StylisticOptions`](StylisticOptions.md)

Defined in: [config.ts:387](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L387)

启用 `stylistic` 规则组（支持 `quotes` / `semi` 风格快捷项）

***

### typescript?

> `optional` **typescript?**: `boolean` \| [`TypeScriptOptions`](TypeScriptOptions.md)

Defined in: [config.ts:385](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L385)

启用 `typescript` 规则组（ts / tsx 文件；同时注册 TypeScript parser，默认启用 type-aware 解析）

***

### vue?

> `optional` **vue?**: `boolean` \| [`VueOptions`](VueOptions.md)

Defined in: [config.ts:397](https://github.com/pawover/pawover-kit/blob/c993ccd3f70eda776a13d0570a89ef052016849b/packages/eslint-rules/src/config.ts#L397)

启用 `vue` 规则组（vue / vue+ts 单文件组件；同时接入 vue-eslint-parser，与 `typescript` 同开时自动为 TypeScript parser 放行 `.vue` 扩展名；支持 `naming` 命名快捷项）
