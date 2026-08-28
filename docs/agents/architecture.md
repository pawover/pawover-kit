# 架构决策

包结构、发布物形态与「直查源码」方案的决策记录。包职责速查见 AGENTS.md「架构」节。

## 包结构

5 个发布包在 `packages/*` 下，根包 `@pawover/kit` 通过 `package.json#exports` 重新导出所有子包：

```text
packages/types/      纯类型工具（无运行时代码）
packages/utils/      静态类工具集（ArrayUtil / StringUtil / TypeUtil / ObjectUtil …）
packages/hooks/      React hooks + Alova hooks（根导出为空，须走子路径导入）
packages/eslint-rules/  ESLint 规则集（默认导出聚合全部）
packages/zod/        Zod v4 schema
packages/internal/   内部工具包（private，不发布）：tsdown 共享插件 / hooks 等
```

导入路径：`@pawover/kit/utils`、`@pawover/kit/hooks/react`、`@pawover/kit/hooks/alova`、`@pawover/kit/types`、`@pawover/kit/eslint-rules`、`@pawover/kit/zod`。

## 根包为薄 re-export 结构

根包（`entry/` 目录）发布物仅含 `entry/`（无子包 dist），`dependencies` 声明 5 个子包（`workspace:*`，发布时重写为实际版本）。

**因此发布根包前必须先发布 5 个子包**（尤其 `@pawover/kit-types`、`@pawover/kit-eslint-rules` 首次发布）。`scripts/verifyRelease.ts` 硬校验「子包发布 ⇒ 根包必发」，防止根包落后。

根包 `build` 任务（`scripts/syncEntry.ts`）在 turbo 流水线中同步 `entry/metadata.json` 与 `entry/hooks-metadata.json`（见「构建流水线」）。改根包 exports / entry 后需 `pnpm build` 再跑 `check:eslint`（entry 与根 scripts 已在 eslint ignores）。

## 子包 exports 仅指向 dist

子包发布物 `exports` 仅指向 `dist` 产物，**无 `development` 等指向 src 的条件**——src 不在 `files` 里，指了会害死 vite dev / vitest 消费者（消费者解析到源码路径但打包产物没有该文件）。

**例外：`packages/internal`**（private 不发布、无 files 限制）的 `exports` 直接指向 `./src/index.ts`，消费方（子包 tsdown.config.ts）运行时经 Node 24 type stripping 直跑源码，类型经子包 tsconfig 的 `preserveSymlinks: true` 直查——即时反馈且零构建依赖（见「构建流水线」）。**约定：内部包代码不允许出现在消费端**（发布包 src 禁止 import internal，见 ADR-0004）。

仓库内「直查源码」由根 tsconfig / test/tsconfig.json 的 `paths` 与 vitest.config.ts 的 `resolve.alias` 承担，不是靠 exports 条件。

## 直查源码方案

- 根 tsconfig 与 `test/tsconfig.json` 的 `paths` 把 `@pawover/kit-*`（含子路径）直接映射到源码 `.ts`。slash 形式 `@pawover/kit/utils` 先经根包 entry/*.d.ts 静态 re-export，再命中 paths。
- **改源码后无需先 `pnpm build` 即可跑 `test:types` / `check:types`**；`dist` 过期不再是误导性错误的来源。
- vitest 运行时走 `resolve.alias`（根形式 + 子包直引），同样直查源码。
- 注意 `packages/*/tsconfig.json` 无 paths，IDE 中包间导入经 workspace 链接解析到 `dist` d.ts（构建后）；唯一例外是 `@pawover/kit-internal`——子包 tsconfig 开 `preserveSymlinks: true`，以 node_modules 路径直查其 src 源码（TS 对 node_modules 路径文件豁免 rootDir 检查，因此包边界守卫不失效）。

## 构建流水线

```text
tsdown (build:source) → build (turbo) → 根 postbuild（scripts/syncEntry.ts 生成 entry metadata）
```

- **tsdown** 打包每个包（配置在每个包目录下，如 `packages/utils/tsdown.config.ts`）。tsdown 配置（`tsdown.config.ts`）由各子包 tsconfig 检查；`packages/internal` 是纯源码包（`exports` → `./src/index.ts`，Node 24 type stripping 直跑），子包 tsconfig 开 `preserveSymlinks: true` 使 IDE/tsc 以 node_modules 路径直查其源码——改 internal 源码后**无需构建**即生效，且不触发 rootDir 检查（TS 对 node_modules 路径文件豁免），包边界守卫（TS6059/TS6307）保持完整。
- **tsc** 仅用于类型检查；tsdown 的 `dts: true` 负责生成声明文件。
- **syncEntry.ts**（根 postbuild）读取 utils/hooks 的 dist 导出名，生成 `entry/metadata.json`（数组形状）与 `entry/hooks-metadata.json`（`{alova, react}` 形状）；源缺失即抛错。两文件已提交（gitignore 例外），干净检出可直接 pack。

## eslint-rules 包特殊注意

仓库自身 eslint.config.js 经 node 解析包 exports → `dist`，**改本包源码后必须先 `pnpm build` 再跑 `check:eslint` / lint-staged**。这是「直查源码」规则唯一不适用的场景——ESLint 配置解析不经过 tsconfig paths 或 vitest alias。