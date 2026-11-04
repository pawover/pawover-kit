# ESLint 配置实战

`@pawover/kit-eslint-rules` 是**自包含**的 flat config 预设：全部上游插件已作为包依赖精确锁定并自动注册，只需安装本包，无需手动安装或注册插件。

预设工厂返回 [`eslint-flat-config-utils`](https://github.com/antfu/eslint-flat-config-utils) 的 `FlatConfigComposer`（继承 Promise），可以直接作为 `eslint.config.js` 的默认导出，也可以继续链式组合。

## 最小配置

```ts
// eslint.config.js
import pawover from "@pawover/kit-eslint-rules";

export default pawover();
```

默认返回三层：全局忽略（`GLOB_EXCLUDE`）、`javascript` parser 层与 `javascript` 规则层。其余规则组通过选项显式开启：

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
  typescript: {
    parserOptions: { tsconfigRootDir: import.meta.dirname },
  },
});
```

`typescript.parserOptions` 会透传给 TypeScript parser，与默认值浅合并（默认 `{ projectService: true }`，同名键以传入值为准）。

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

`react` 组包含依赖类型信息的规则（如 `no-implicit-key`）：与 `typescript` 一同开启时这些规则作用于 `typescript.filesTypeAware` 限定的文件（默认 `ts/tsx`）并额外并入 `*.jsx`——`.jsx` 的类型可用性交由项目 tsconfig 的 `include`/`allowJs` 决定（未被项目覆盖的 `.jsx` 会按「不在项目内」报错）；未开启 `typescript` 时（纯 JS React 项目）工厂自动关闭它们——且以无操作实现注册，后置覆盖强制开启也不会报错，react 组其余规则照常可用。

## Vue 项目

```ts
export default pawover({ typescript: true, vue: true });
```

单文件组件内 `<script lang="ts">` 自动交由 TypeScript parser 解析。

## 换行规则与 Prettier 对齐

`antfu` 组启用 `antfu/reasonable-newline`，发布包默认行宽阈值为 120，与常规 `printWidth` 对齐：

```ts
export default pawover({ antfu: true });
```

更宽的行宽属于消费端个性化配置。例如本仓库在根 `eslint.config.js` 中把 `*.type.ts` / `*.test.ts` 提高到 240，与 `prettier.config.js` 的 overrides 对齐：

```ts
export default pawover({ antfu: true }).append({
  files: ["**/*.type.ts", "**/*.test.ts"],
  rules: {
    "antfu/reasonable-newline": [2, {
      minObjectProperties: 4,
      objectLineLength: 240,
      minArrayItems: 4,
      arrayLineLength: 240,
    }],
  },
});
```

超过阈值或包含复杂子项（调用、函数、嵌套对象/数组）的对象/数组会强制拆行；复杂三元表达式会在 `?` / `:` 前换行。复杂子项检查比 Prettier 更严格，属于该规则的既有设计。

## 自定义覆盖

### 按规则组覆盖（推荐）

每个规则组都接受 `{ overrides }`，覆盖在预设内部合并，自动获得正确的文件范围与插件：

```ts
export default pawover({
  typescript: {
    overrides: {
      "ts/strict-void-return": [1, { allowReturnAny: true }],
    },
  },
  react: {
    overrides: {
      "react/no-implicit-key": "warn",
    },
  },
});
```

类型感知规则使用 `overridesTypeAware`，它只作用于 `filesTypeAware` 限定的文件（默认 `GLOB_TYPESCRIPT`）；react 的 type-aware 层会在该范围上额外并入 `GLOB_JSX`：

```ts
import pawover, { GLOB_TYPESCRIPT } from "@pawover/kit-eslint-rules";

export default pawover({
  typescript: {
    filesTypeAware: GLOB_TYPESCRIPT,
    overridesTypeAware: {
      "ts/no-unsafe-assignment": "warn",
    },
  },
});
```

### 追加配置层

工厂第二个参数起是任意 flat config（单个对象、数组、composer 或 Promise）：

```ts
export default pawover(
  { typescript: true },
  { rules: { "no-console": "error" } },
);
```

### 按层名称覆盖

每层配置都有唯一 `name`（`pawover/<规则组>/<setup|parser|rules|type-aware>`，组名使用 kebab-case，如 `importsSort` → `imports-sort`；全局忽略层为 `pawover/ignores`），可用 composer 的 `override` 精确定位：

```ts
export default pawover({ typescript: true })
  .override("pawover/typescript/rules", {
    rules: {
      "ts/consistent-type-definitions": ["error", "interface"],
    },
  });
```

### 插件注册机制

各规则组拆成两类层：

- `setup` 层：只注册插件，不带 `files`，对所有文件生效；
- `rules` / `parser` / `type-aware` 层：只放规则、parser 或文件范围。

因此后置配置可以直接使用预设已注册的插件规则，不需要重复挂载插件。如果需要注册**预设之外**的插件（例如 `eslint-plugin-react-compiler`），在自己的配置层中挂载即可：

> 工厂不接受 `ignores` / `renamePlugins` 选项：全局忽略通过追加配置层或 `override("pawover/ignores", ...)` 自定义，插件重命名使用 composer 的 `.renamePlugins()`。

```ts
import reactCompiler from "eslint-plugin-react-compiler";

export default pawover(
  { typescript: true, react: true },
  {
    files: ["**/*.tsx"],
    plugins: { "react-compiler": reactCompiler },
    rules: { "react-compiler/react-compiler": "error" },
  },
);
```

## GLOB 常量

命名导出供手工组装配置或后置覆盖使用：

```ts
import {
  GLOB_EXCLUDE,
  GLOB_JSX,
  GLOB_SOURCE,
  GLOB_TYPESCRIPT,
  GLOB_VUE,
} from "@pawover/kit-eslint-rules";
```

`GLOB_EXCLUDE` 覆盖依赖目录、构建产物、锁文件、编辑器目录、缓存、自动生成文件等（`node_modules`、`dist`、`pnpm-lock.yaml`、`.changeset`、`.vitepress/cache`、`auto-imports.d.ts`…）。

## 严重级别类型

```ts
import type { RuleConfig, Severity, SeverityLevel, SeverityName } from "@pawover/kit-eslint-rules";

const level: SeverityLevel = 2; // 数字形式
const name: SeverityName = "error"; // 名称形式
const severity: Severity = "warn"; // 两者皆可

const config: RuleConfig<[boolean]> = [2, { allowProperties: true }];
const plain: RuleConfig = "off";
```

## 在 monorepo 中复用

根包 `@pawover/kit` 已把预设聚合，`import pawover from "@pawover/kit/eslint-rules"` 与直引 `@pawover/kit-eslint-rules` 等价。本仓库自身的 `eslint.config.js` 即为其真实使用案例。
