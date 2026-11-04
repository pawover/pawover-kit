[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / PawoverOptions

# Interface: PawoverOptions

Defined in: [config.ts:287](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L287)

预设工厂选项

除 `javascript` 规则组常开外，其余规则组均通过对应字段显式开启。
每个规则组都接受 `{ overrides }` 形式，在预设内部完成规则覆盖，避免后置配置层与 flat config 插件作用域的问题。

## Example

```ts
const options: PawoverOptions = {
  typescript: {
    overrides: { "ts/strict-void-return": [1, { allowReturnAny: true }] },
  },
  react: true,
};
```

## Properties

### antfu?

> `optional` **antfu?**: `boolean` \| [`RulesOverrideOptions`](RulesOverrideOptions.md)

Defined in: [config.ts:295](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L295)

启用 `antfu` 规则组

***

### imports?

> `optional` **imports?**: `boolean` \| [`RulesOverrideOptions`](RulesOverrideOptions.md)

Defined in: [config.ts:297](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L297)

启用 `imports` 规则组（eslint-plugin-import-lite）

***

### importsSort?

> `optional` **importsSort?**: `boolean` \| [`RulesOverrideOptions`](RulesOverrideOptions.md)

Defined in: [config.ts:299](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L299)

启用 `importsSort` 规则组（eslint-plugin-simple-import-sort）

***

### javascript?

> `optional` **javascript?**: [`RulesOverrideOptions`](RulesOverrideOptions.md)

Defined in: [config.ts:289](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L289)

javascript 规则组覆盖选项（该组常开）

***

### react?

> `optional` **react?**: `boolean` \| [`ReactOptions`](ReactOptions.md)

Defined in: [config.ts:301](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L301)

启用 `react` 规则组（注册 `@eslint-react` 与 `eslint-plugin-react-hooks` 两个插件，默认开启 React Compiler 规则切换）；与 `typescript` 同开时，依赖类型信息的规则作用于 ts/tsx/jsx

***

### stylistic?

> `optional` **stylistic?**: `boolean` \| [`RulesOverrideOptions`](RulesOverrideOptions.md)

Defined in: [config.ts:293](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L293)

启用 `stylistic` 规则组

***

### typescript?

> `optional` **typescript?**: `boolean` \| [`TypeScriptOptions`](TypeScriptOptions.md)

Defined in: [config.ts:291](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L291)

启用 `typescript` 规则组（ts / tsx 文件；同时注册 TypeScript parser，默认启用 type-aware 解析）

***

### vue?

> `optional` **vue?**: `boolean` \| [`RulesOverrideOptions`](RulesOverrideOptions.md)

Defined in: [config.ts:303](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L303)

启用 `vue` 规则组（vue / vue+ts 单文件组件；同时接入 vue-eslint-parser）
