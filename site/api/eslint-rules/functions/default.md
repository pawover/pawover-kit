[**@pawover/kit-eslint-rules**](../index.md)

***

[@pawover/kit-eslint-rules](../index.md) / default

# Function: default()

> **default**(`options?`): `Config`\<`RulesConfig`\>[]

Defined in: config.ts:107

创建 ESLint flat config 预设

返回可直接用于 `eslint.config.js` 的 flat config 数组：首项为全局忽略（`GLOB_EXCLUDE`），随后为常开的 `javascript` 基础层与按选项启用的各规则组层。
全部上游插件已作为本包依赖精确锁定并自动注册，无需用户另行安装或注册插件。

## Parameters

### options?

[`PawoverOptions`](../interfaces/PawoverOptions.md) = `{}`

预设选项；缺省时仅返回忽略层与 `javascript` 基础层

## Returns

`Config`\<`RulesConfig`\>[]

flat config 配置数组

## Examples

```ts
// TypeScript + React 项目
import pawover from "@pawover/kit-eslint-rules";

export default pawover({
  typescript: true,
  react: true,
  parserOptions: { tsconfigRootDir: import.meta.dirname },
});
```

```ts
// Vue 项目（Vue SFC + TypeScript）
import pawover from "@pawover/kit-eslint-rules";

export default pawover({ typescript: true, vue: true });
```

```ts
// 后置覆盖：在预设之后追加自定义配置层
import pawover from "@pawover/kit-eslint-rules";

export default [
  ...pawover({ typescript: true }),
  { rules: { "ts/no-explicit-any": 0 } },
];
```
