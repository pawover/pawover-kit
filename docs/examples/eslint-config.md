# ESLint 配置实战

规则集默认导出 9 个规则组 + `GLOB_EXCLUDE` + `createRules`，适配 flat config。

## 最小配置

```ts
// eslint.config.js
import eslintRules from "@pawover/kit/eslint-rules";

export default [
  { ignores: eslintRules.GLOB_EXCLUDE },
  {
    files: ["**/*.{js,ts,jsx,tsx,vue}"],
    rules: {
      ...eslintRules.javascript,
      ...eslintRules.typescript,
      ...eslintRules.stylistic,
    },
  },
];
```

## React + Hooks 项目

```ts
export default [
  { ignores: eslintRules.GLOB_EXCLUDE },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      ...eslintRules.javascript,
      ...eslintRules.typescript,
      ...eslintRules.react,
      ...eslintRules.reactHooks,
      ...eslintRules.imports,
    },
  },
];
```

## Vue 项目

```ts
export default [
  { ignores: eslintRules.GLOB_EXCLUDE },
  {
    files: ["**/*.{js,ts,vue}"],
    rules: {
      ...eslintRules.javascript,
      ...eslintRules.typescript,
      ...eslintRules.vue,
    },
  },
];
```

## createRules：改写规则前缀

从任意规则组取全部规则，并把命名空间前缀改写为目标前缀：

```ts
import eslintRules from "@pawover/kit/eslint-rules";

// 把 react/* 规则映射为 react-hooks/*（键名被改写）
const reactHooksMapped = eslintRules.createRules("react", "react-hooks");
// { "react-hooks/display-name": 2, ... }

// 不传 prefix：返回原规则组
const tsRules = eslintRules.createRules("typescript");

// 非法规则组：返回空对象
const empty = eslintRules.createRules("unknown");
```

## 严重级别类型

```ts
import type { Severity, SeverityName, SeverityLevel, RuleConfig } from "@pawover/kit/eslint-rules";

const level: SeverityLevel = 2; // 数字形式
const name: SeverityName = "error"; // 名称形式
const severity: Severity = "warn"; // 两者皆可

const config: RuleConfig<[boolean]> = [2, { allowProperties: true }];
const plain: RuleConfig = "off";
```

## GLOB_EXCLUDE 都忽略了什么

依赖目录、构建产物、锁文件、编辑器目录、缓存、自动生成文件等（`node_modules`、`dist`、`pnpm-lock.yaml`、`.changeset`、`.vitepress/cache`、`auto-imports.d.ts`…）。

## 在 monorepo 中复用

根包 `@pawover/kit` 已把规则集聚合，`import eslintRules from "@pawover/kit/eslint-rules"` 与直引 `@pawover/kit-eslint-rules` 等价。本仓库自身的 `eslint.config.js` 即为其真实使用案例。
