[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / default

# Function: default()

> **default**(`options?`, ...`userConfigs`): `FlatConfigComposer`\<[`ConfigLayer`](../type-aliases/ConfigLayer.md), `"pawover/ignores"` \| `"pawover/javascript/parser"` \| `"pawover/javascript/rules"` \| `"pawover/typescript/setup"` \| `"pawover/typescript/parser"` \| `"pawover/typescript/rules"` \| `"pawover/typescript/type-aware"` \| `"pawover/stylistic/setup"` \| `"pawover/stylistic/rules"` \| `"pawover/antfu/setup"` \| `"pawover/antfu/rules"` \| `"pawover/imports/setup"` \| `"pawover/imports/rules"` \| `"pawover/imports-sort/setup"` \| `"pawover/imports-sort/rules"` \| `"pawover/react/setup"` \| `"pawover/react/rules"` \| `"pawover/react/type-aware"` \| `"pawover/vue/setup"` \| `"pawover/vue/parser"` \| `"pawover/vue/rules"`\>

Defined in: [config.ts:373](https://github.com/pawover/pawover-kit/blob/6417537d1e570227eacc28475428a6aeb3e50bca/packages/eslint-rules/src/config.ts#L373)

创建 ESLint flat config 预设

返回 composer（继承 Promise，可直接用于 `eslint.config.js` 的默认导出），也可链式调用
`append` / `prepend` / `override` / `renamePlugins` 等能力继续组合。

各规则组拆为 `setup` 层（只注册插件，不带 `files`）、`parser` 层（解析器）与
`rules` / `type-aware` 层（规则与文件范围），因此后置配置可以直接使用预设已注册的插件规则；
若需注册自定义插件，在自己的配置层中挂载即可。

## Parameters

### options?

[`PawoverOptions`](../interfaces/PawoverOptions.md) = `{}`

预设选项；缺省时返回忽略层与 `javascript` parser/rules 层

### userConfigs

...[`PawoverUserConfig`](../type-aliases/PawoverUserConfig.md)[]

追加在预设之后的 flat config（单个对象、数组、composer 或 Promise）

## Returns

`FlatConfigComposer`\<[`ConfigLayer`](../type-aliases/ConfigLayer.md), `"pawover/ignores"` \| `"pawover/javascript/parser"` \| `"pawover/javascript/rules"` \| `"pawover/typescript/setup"` \| `"pawover/typescript/parser"` \| `"pawover/typescript/rules"` \| `"pawover/typescript/type-aware"` \| `"pawover/stylistic/setup"` \| `"pawover/stylistic/rules"` \| `"pawover/antfu/setup"` \| `"pawover/antfu/rules"` \| `"pawover/imports/setup"` \| `"pawover/imports/rules"` \| `"pawover/imports-sort/setup"` \| `"pawover/imports-sort/rules"` \| `"pawover/react/setup"` \| `"pawover/react/rules"` \| `"pawover/react/type-aware"` \| `"pawover/vue/setup"` \| `"pawover/vue/parser"` \| `"pawover/vue/rules"`\>

可直接导出或继续链式组合的 flat config composer

## Examples

```ts
// TypeScript + React 项目，使用按组 overrides 覆盖规则
import pawover from "@pawover/kit/eslint-rules";

export default pawover({
  typescript: {
    overrides: { "ts/strict-void-return": [1, { allowReturnAny: true }] },
  },
  react: true,
});
```

```ts
// 追加自定义配置层
import pawover from "@pawover/kit-eslint-rules";

export default pawover(
  { typescript: true },
  { rules: { "no-console": "error" } },
);
```

```ts
// 按层名称覆盖
import pawover from "@pawover/kit-eslint-rules";

export default pawover({ typescript: true })
  .override("pawover/typescript/rules", {
    rules: { "ts/consistent-type-definitions": ["error", "interface"] },
  });
```
