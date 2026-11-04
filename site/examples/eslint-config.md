# ESLint 配置实战

`@pawover/kit-eslint-rules` 是**自包含**的 flat config 预设：全部上游插件已作为包依赖精确锁定并自动注册，只需安装本包，无需手动安装或注册插件。

## 最小配置

```ts
// eslint.config.js
import pawover from "@pawover/kit-eslint-rules";

export default pawover();
```

默认返回两层：全局忽略（`GLOB_EXCLUDE`）与 `javascript` 规则层。其余规则组通过选项显式开启：

| 选项          | 启用内容                                                         | 适用文件                                     |
| :------------ | :--------------------------------------------------------------- | :------------------------------------------- |
| `typescript`  | `typescript` 规则组 + TypeScript parser（默认 `projectService`） | `**/*.{ts,tsx}`（开启 `vue` 时并入 `*.vue`） |
| `stylistic`   | `stylistic` 规则组                                               | 全部源文件                                   |
| `antfu`       | `antfu` 规则组                                                   | 全部源文件                                   |
| `imports`     | `imports` 规则组（eslint-plugin-import-lite）                    | 全部源文件                                   |
| `importsSort` | `importsSort` 规则组（eslint-plugin-simple-import-sort）         | 全部源文件                                   |
| `react`       | `react` + `react-hooks` 两个插件与规则组                         | `**/*.{js,cjs,mjs,jsx,ts,tsx}`               |
| `vue`         | `vue` 规则组 + vue-eslint-parser                                 | `**/*.vue`                                   |

## TypeScript 项目

```ts
// eslint.config.js
import pawover from "@pawover/kit-eslint-rules";

export default pawover({
  typescript: true,
  parserOptions: { tsconfigRootDir: import.meta.dirname },
});
```

`parserOptions` 会透传给 TypeScript parser，与默认值浅合并（默认 `{ projectService: true }`，同名键以传入值为准）。

## React 项目

```ts
export default pawover({
  typescript: true,
  stylistic: true,
  antfu: true,
  imports: true,
  react: true,
});
```

`react` 组包含依赖类型信息的规则（如 `no-implicit-key`）：与 `typescript` 一同开启时这些规则作用于 `ts/tsx/jsx` 文件——`.jsx` 的类型可用性交由项目 tsconfig 的 `include`/`allowJs` 决定（未被项目覆盖的 `.jsx` 会按「不在项目内」报错）；未开启 `typescript` 时（纯 JS React 项目）工厂自动关闭它们——且以无操作实现注册，后置覆盖强制开启也不会报错，react 组其余规则照常可用。

## Vue 项目

```ts
export default pawover({ typescript: true, vue: true });
```

单文件组件内 `<script lang="ts">` 自动交由 TypeScript parser 解析。

## 自定义覆盖

预设返回标准 flat config 数组，直接在其后追加配置层即可：

```ts
import pawover from "@pawover/kit-eslint-rules";

export default [
  ...pawover({ typescript: true }),
  { rules: { "ts/no-explicit-any": 0 } },
];
```

## 严重级别类型

```ts
import type { RuleConfig, Severity, SeverityLevel, SeverityName } from "@pawover/kit-eslint-rules";

const level: SeverityLevel = 2; // 数字形式
const name: SeverityName = "error"; // 名称形式
const severity: Severity = "warn"; // 两者皆可

const config: RuleConfig<[boolean]> = [2, { allowProperties: true }];
const plain: RuleConfig = "off";
```

## GLOB_EXCLUDE 都忽略了什么

依赖目录、构建产物、锁文件、编辑器目录、缓存、自动生成文件等（`node_modules`、`dist`、`pnpm-lock.yaml`、`.changeset`、`.vitepress/cache`、`auto-imports.d.ts`…）。命名导出 `GLOB_EXCLUDE` 可用于手工组装配置。

## 在 monorepo 中复用

根包 `@pawover/kit` 已把预设聚合，`import pawover from "@pawover/kit/eslint-rules"` 与直引 `@pawover/kit-eslint-rules` 等价。本仓库自身的 `eslint.config.js` 即为其真实使用案例。
