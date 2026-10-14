# 架构决策

包结构、发布物形态与「直查源码」方案的决策记录。包职责速查见 AGENTS.md「架构」节。

## 包结构

5 个发布包在 `packages/*` 下，根包 `@pawover/kit` 通过 `package.json#exports` 重新导出所有子包：

```text
packages/types/      纯类型工具（无运行时代码）
packages/utils/      静态类工具集（ArrayUtil / StringUtil / TypeUtil / ObjectUtil …）
packages/hooks/      React hooks + Alova hooks（根导出为空，须走子路径导入）
packages/eslint-rules/  自包含 ESLint flat config 预设（默认导出工厂）
packages/zod/        Zod v4 schema
packages/internal/   内部工具包（private，不发布）：tsdown 共享插件（构建分析）
```

导入路径：`@pawover/kit/utils`、`@pawover/kit/hooks/react`、`@pawover/kit/hooks/alova`、`@pawover/kit/types`、`@pawover/kit/eslint-rules`、`@pawover/kit/zod`。

类型全局入口（经 tsconfig `types` 消费，不做导入）：`@pawover/kit/types/global`、`@pawover/kit/types/react/global`（`declare global` 注入；子包直引 `@pawover/kit-types/global`、`@pawover/kit-types/react/global`。决策见 ADR-0009）。

## 根包为薄 re-export 结构

根包（`entry/` 目录）发布物仅含 `entry/`（无子包 dist），`dependencies` 声明 5 个子包（`workspace:*`，发布时重写为实际版本）。

**因此发布根包前必须先发布 5 个子包**（尤其 `@pawover/kit-types`、`@pawover/kit-eslint-rules` 首次发布）。`scripts/verifyRelease.ts` 硬校验「子包发布 ⇒ 根包必发」，防止根包落后。

根包 `build` 任务（`scripts/syncEntry.ts`）在 turbo 流水线中同步 `entry/metadata.json` 与 `entry/hooks-metadata.json`（见「构建流水线」）。改根包 exports / entry 后需 `pnpm build` 再跑 `check:eslint`（entry 与根 scripts 已在 eslint ignores）。

## 子包 exports 策略（开发态与发布物分离）

**发布物**（`publishConfig`）：5 个发布包的 `exports` 仅指向 `dist` 产物，**无指向 src 的条件**——src 不在 `files` 里，指了会害死 vite dev / vitest 消费者（消费者解析到源码路径但打包产物没有该文件）。

**开发态**（工作区内的包解析）分两类：

1. **utils / hooks / types / zod**——混合策略：`exports.types` → `./src/**/*.ts`（子包 tsconfig 无 paths，IDE/tsc 经 node_modules → exports 直查源码、跳转落源码）；`exports.default` → `./dist/**`（Node 运行时消费构建产物，工作区与消费者行为一致）。顶层 `main`/`module`/`types` 与 default 对齐指 dist。**注意：该策略下 `syncEntry` / `test:smoke` 等 Node 脚本必须在 `pnpm build` 之后运行**（`test:ci` 顺序已天然满足）。
2. **eslint-rules / internal**——源码直出：`exports` 直接指向 `./src`，Node 24 type stripping 直跑。为满足 Node ESM 解析，源码相对导入使用**显式 `.ts` 扩展名**（目录导入写 `/index.ts`）。
   - eslint-rules：`eslint.config.js` 由 Node 直接执行，必须源码直跑。
   - internal：private 不发布、无 files 限制；消费方（子包 tsdown.config.ts）运行时直跑，类型经子包 tsconfig 的 `preserveSymlinks: true` 直查——即时反馈且零构建依赖。**约定：内部包代码不允许出现在消费端**（发布包 src 禁止 import internal，见 ADR-0004）。

仓库内「直查源码」由三套机制分担：根 tsconfig / `test/tsconfig.json` 的 `paths`（类型）、`vitest.config.ts` 的 `resolve.alias`（测试运行时）、4 包开发态 `exports.types`（子包视角 IDE/tsc）。Node 直跑源码仅限 eslint-rules / internal。

策略的决策背景与否决备选见 ADR-0006。

## 子包 tsconfig 项目（IDE 归属）

子包 `tsconfig.json` 不含自有 include（默认全量通配），且 extends 继承的 exclude 相对「源配置目录」解析、对子包无效——若不显式排除，IDE 项目会收录 `dist/` 产物（`declare global` 产物曾致全量重复报错）与对 `node_modules` 的全量扫描。**五个子包 tsconfig 各自显式 `"exclude": ["**/node_modules", "**/dist"]`**（相对各自目录解析）；`check:types:packages`（逐包 `tsc -p`，`test:ci` 一环）将包项目编译纳入 CI。

## 直查源码方案

- 根 tsconfig 与 `test/tsconfig.json` 的 `paths` 把 `@pawover/kit-*`（含子路径）直接映射到源码 `.ts`。slash 形式 `@pawover/kit/utils` 先经根包 entry/*.d.ts 静态 re-export，再命中 paths。
- **改源码后无需先 `pnpm build` 即可跑 `test:types` / `check:types`**；`dist` 过期不再是误导性错误的来源。
- vitest 运行时走 `resolve.alias`（根形式 + 子包直引），同样直查源码。
- 注意 `packages/*/tsconfig.json` 无 paths，IDE 中包间导入经 workspace 链接 → 包开发态 `exports.types` 直查源码；TS 对 node_modules 路径文件豁免 rootDir 检查（`preserveSymlinks: true`），包边界守卫不受影响。

## 构建流水线

```text
tsdown (build:source) → build (turbo) → 根 postbuild（scripts/syncEntry.ts 生成 entry metadata）
```

- **tsdown** 打包每个包（配置在每个包目录下，如 `packages/utils/tsdown.config.ts`）。tsdown 配置（`tsdown.config.ts`）由各子包 tsconfig 检查；`packages/internal` 是纯源码包（`exports` → `./src/index.ts`，Node 24 type stripping 直跑），子包 tsconfig 开 `preserveSymlinks: true` 使 IDE/tsc 以 node_modules 路径直查其源码——改 internal 源码后**无需构建**即生效，且不触发 rootDir 检查（TS 对 node_modules 路径文件豁免），包边界守卫（TS6059/TS6307）保持完整。
- **tsc** 仅用于类型检查；tsdown 的 `dts: true` 负责生成声明文件。
- **syncEntry.ts**（根 postbuild）读取 utils/hooks 的 dist 导出名，生成 `entry/metadata.json`（数组形状）与 `entry/hooks-metadata.json`（`{alova, react}` 形状）；源缺失即抛错。两文件已提交（gitignore 例外），干净检出可直接 pack。

## eslint-rules 包特殊注意

`eslint.config.js` 由 Node 直接执行（ESLint 加载配置不走 tsconfig paths / vitest alias），因此 eslint-rules 开发态 `exports` 直指源码、源码采用显式 `.ts` 扩展名——改其源码后**无需** `pnpm build` 即可跑 `check:eslint` / lint-staged。