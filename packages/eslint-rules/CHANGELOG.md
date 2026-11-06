# @pawover/kit-eslint-rules

## 0.2.0-alpha.2

### Minor Changes

- 06aff01: 新增随 npm 包发布的 TanStack Intent Agent Skills：每个发布包在包内提供 `skills/<name>/SKILL.md`（types / utils / eslint-preset 含 references），提供类型、工具类、React 与 Alova Hooks、ESLint flat config 预设和 Zod schema 的使用指引；各包 `files` 与 `tanstack-intent` keyword 已同步，skill 会随对应包版本一起发布。根包（`@pawover/kit`）不在 workspace 包列表中，仍由发布脚本在子包发版后同步递增。

## 0.2.0-alpha.1

### Patch Changes

- b06e112: React Compiler 规则切换默认关闭 `react/no-unstable-context-value`。

  React Compiler 会自动记忆化 Context value，该规则在 `compiler` 开启时会产生不再适用的告警；`react.compiler: false` 时仍恢复 `@eslint-react` 的默认级别。

## 0.2.0-alpha.0

### Minor Changes

- 6417537: BREAKING: 预设装配重构为 `FlatConfigComposer`。

  - `pawover()` 现在返回 composer（继承 Promise），可直接作为 `eslint.config.js` 默认导出，并支持 `append` / `prepend` / `override` / `renamePlugins` 链式组合。
  - 每个规则组拆为 `setup`（无 `files`，只注册插件）/ `rules`（规则 + 文件范围）/ `parser` / `type-aware` 层，每层带唯一 `name`；`javascript` 拆出 `parser` + `rules`，无插件可注册的组不产生 `setup`。
  - 新增按组 `overrides`；`typescript` / `react` 支持 `overridesTypeAware`，`typescript` 支持 `filesTypeAware`（同时收窄 react type-aware 层，react 额外并入 `GLOB_JSX`）。
  - 新增 `GLOB_SOURCE` / `GLOB_TYPESCRIPT` / `GLOB_VUE` / `GLOB_JSX` 导出。
  - 新增公开类型 `RuleMap` / `ConfigLayer` / `PawoverUserConfig` / `RulesOverrideOptions` / `TypeScriptOptions` / `ReactOptions`。
  - 启用 `antfu/reasonable-newline`，发布包默认行宽 120；`*.type.ts` / `*.test.ts` 的宽版 240 属消费端个性化配置（本仓库在根 `eslint.config.js` 覆盖），不随包发布。
  - 移除顶层 `parserOptions`，改用 `typescript.parserOptions`。
  - 移除工厂 `ignores` / `renamePlugins` 选项：全局忽略改用追加配置层或 `override("pawover/ignores", ...)`，插件重命名改用 composer 的 `.renamePlugins()`。
  - 移除数组返回语义；旧用法 `[...pawover()]` 需改为直接导出 composer、使用 `.append()` 或 `await`。

- 3c53aee: BREAKING: `react` 组默认启用 React Compiler 规则切换。

  - `react: true` 时默认将 10 条与 `@eslint-react` 重叠的 Compiler 规则切换为 `eslint-plugin-react-hooks` 官方实现，并关闭 `@eslint-react` 等价规则，避免重复诊断。
  - 新增 `react.compiler` 选项：`false` 回退到 `@eslint-react` 实现；`"recommended"` / `true` 使用官方 `recommended` 预设；`"latest"` 额外启用实验规则 `react-hooks/void-use-memo`。
  - 官方 `recommended` 中 `react-hooks/unsupported-syntax` 与 `react-hooks/incompatible-library` 为 `warn`，需要更严格时可用 `react.overrides` 提升。
  - `compiler: false` 仅回退 10 条重叠规则（含 `react-hooks/globals`），官方独有的 `config` / `gating` / `incompatible-library` / `preserve-manual-memoization` 仍由 `react-hooks` 提供。
  - 未启用 `react` 组的消费者不受影响。

- 3c53aee: `ts/strict-void-return` 默认开启 `allowReturnAny: true`。

  - 允许返回 `any` 的函数传入接受 `void` 的位置，减少 React 事件回调与异步回调中的误报。
  - 需要更严格检查时，可通过 `typescript.overrides` 覆盖该规则。

## 0.1.0-alpha.2

### Minor Changes

- 34b7b77: 升级内嵌 ESLint 插件依赖并同步规则映射：

  - `@eslint-react/eslint-plugin` 5.26.1 → 5.28.8（规则集不变，含多项假阳性/假阴性修复）
  - `eslint-plugin-antfu` 3.2.3 → 3.3.1（新增 `antfu/reasonable-newline`）
  - `eslint-plugin-simple-import-sort` 13.0.0 → 14.0.0（支持字符串形式模块名的排序）
  - `eslint-plugin-vue` 10.10.0 → 10.12.0（新增 `vue/no-content-outside-block`、`vue/no-define-model-default`、`vue/no-props-shadow`、`vue/no-shadow-native-events` 四条规则）
  - `typescript-eslint` 8.71.1 → 8.72.1（`await-thenable` 新增 `allowMixedPromiseArrays` 选项）

  新增的 4 条 Vue 规则按 `error` 启用；`antfu/reasonable-newline` 默认关闭——其默认行长阈值（40）与仓库 Prettier `printWidth: 120` 的排版职责重叠，直接启用会对现有代码产生大面积格式改动，留待单独评估。

## 0.1.0-alpha.1

### Minor Changes

- a8bac64: 将 `@pawover/kit-eslint-rules` 重构为自包含 flat config 预设：默认导出工厂 `pawover(options?)`，全部上游插件（含 vue-eslint-parser）改为精确锁定的 `dependencies` 并由工厂自动注册，安装本包即可使用；`javascript` 组常开，typescript / stylistic / antfu / imports / importsSort / react / vue 通过显式开关启用；移除规则映射与 `createRules` 公共导出及 `./src/*` 子路径；新增测试层规则存在性校验。

  TypeScript parser 与 typescript / react type-aware 规则仅作用于 ts/tsx（开启 vue 时含 .vue），react type-aware 规则额外覆盖 jsx（jsx 的类型可用性交由项目 tsconfig 的 `include`/`allowJs` 决定，不在项目内会报错）；未开启 `typescript` 时 react type-aware 规则自动降级关闭（no-op 注册，后置覆盖也无法强制开启）；补录 javascript / typescript / react / vue / stylistic 共 21 条上游新规则并给出默认值。

  **破坏性变更**（0.x 下以 minor 发布）。

## 0.0.6-alpha.0

### Patch Changes

- ccff7f7: 将 7 条在 `@stylistic` v6 中废弃的规则（`array-bracket-newline`、`array-bracket-spacing`、`array-element-newline`、`function-call-argument-newline`、`function-paren-newline`、`object-curly-newline`、`object-curly-spacing`）统一迁移至 `list-style` 规则，并升级 peerDependency `@stylistic/eslint-plugin` 至 `^6.0.0-beta.6` 以与根依赖保持一致。

## 0.0.5-alpha.0

### Patch Changes

- e1d51f4: fix: 调整 `ts/member-ordering` 预设，消除静态成员排序强制导致的 TDZ 风险

  - 静态字段合并为单一分组（不再强制 private 先于 public）：静态字段按声明顺序初始化，私有静态字段引用后声明的公有静态字段（如派生查找表引用常量枚举）会在类初始化阶段抛 `ReferenceError`
  - `static-initialization` 移至所有静态字段之后，静态块可安全引用任意静态字段
  - 实例字段 / 访问器 / 方法排序保持不变

## 0.0.4-alpha.0

### Patch Changes

- d408123: main 发布后自动回推版本基线到 feature

## 0.0.3-alpha.1

### Patch Changes

- a8f0805: fix: exports 移除指向未打包 src 的 development 条件，修复 vite/vitest 消费者解析失败

## 0.0.3-alpha.0

### Patch Changes

- d408123: 第三轮发布流程测试

## 0.0.2-alpha.0

### Patch Changes

- 55bf39a: 最终演练（第二轮）：五子包全链路发布测试

## 0.0.1-alpha.0

### Patch Changes

- 37d3c03: 最终演练：五子包全链路发布测试

## 0.0.0

### Minor Changes

- 正式发布 0.1.0：退出 alpha 预发布模式，首个正式版本

### Patch Changes

- c2acb2b: 预发布 0.0.0-alpha.5（恢复 alpha pre 模式，验证 CI 发布流程；根包经 bump-root.mjs 同步发布）
- c2acb2b: 统一切入 alpha 发布通道，建立 5 个子包的 alpha 基线版本

## 0.0.0-alpha.5

### Patch Changes

- c2acb2b: 预发布 0.0.0-alpha.5（恢复 alpha pre 模式，验证 CI 发布流程；根包经 bump-root.mjs 同步发布）

## 0.0.0-alpha.4

### Patch Changes

- c2acb2b: 统一切入 alpha 发布通道，建立 5 个子包的 alpha 基线版本
