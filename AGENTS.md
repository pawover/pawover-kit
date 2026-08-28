# pawover-kit

pnpm 单体仓库 (pnpm 11 / Node >=22)。Turborepo 构建。5 个发布包 + 1 个内部包在 `packages/*` 下。

## 命令

| 命令                                     | 说明                                                                                      |
| :--------------------------------------- | :---------------------------------------------------------------------------------------- |
| `pnpm test`                              | `vitest run` — 814 条测试 / 31 文件，双项目 (node + jsdom)                                |
| `pnpm test:types`                        | `tsc -p test/tsconfig.json --noEmit` — 仅类型检查测试文件                                 |
| `pnpm test:coverage`                     | 全量运行 + v8 覆盖率，阈值 90/80/90/90                                                    |
| `pnpm test:ci`                           | `test:types && test && build && test:smoke && check:pack` (串行失败则停止)                |
| `pnpm build`                             | `turbo build` — tsdown (build:source) → metadata (build:metadata) → build                 |
| `pnpm check`                             | 并行运行 `check:types & check:eslint & check:format`（用 `&` 不是 `&&`）                  |
| `pnpm check:types`                       | `tsc --noEmit`（根 tsconfig 聚合检查：packages src + tsdown 配置 + scripts + 根配置文件） |
| `pnpm check:eslint`                      | eslint 带 `--fix` 和缓存                                                                  |
| `pnpm check:format`                      | prettier（仅 HTML/JSON）带缓存                                                            |
| `pnpm changeset`                         | 交互式生成 changeset 变更说明（`.changeset/*.md`，随 PR 提交）                            |
| `pnpm ci:version`                        | 消费 changeset：`changeset version && pnpm install`（CI 用）                              |
| `pnpm pre:enter-alpha` / `pnpm pre:exit` | 进出 alpha pre 模式（`pnpm changeset pre enter/exit alpha`）                              |
| `pnpm sync:main`                          | 非发布内容同步到 main：建 sync-main PR（版本保持 main 侧，不触发发布通道）                  |

## 发布

由 Changesets v3 + GitHub Actions 驱动的**双通道分支模型**：feature = alpha 预发布通道，main = 正式版通道（人工闸门）。改发布流程后需在 CI 中跑 `pnpm test:ci` 验证。全解见 `.changeset/README.md`。

## 架构

- **`@pawover/kit-types`** (`packages/types/`) — 纯类型工具包（无运行时代码）：`AnyObject`、`PlainObject`、`TreeLike`、`TreeLikeOptionalChildren`、`AnyFunction` 族、`Primitive`、`AdvancedRecord`、`ApiNameCheck` 等。入口：`src/index.ts`，子路径：`.`（核心）、`./react`（`Props` / `PropsWithChildren` / `PropsWithRef`）。测试见 `test/types/types/typesApi.test.type.ts`。
- **`@pawover/kit-utils`** (`packages/utils/`) — 静态类工具集：`ArrayUtil`、`StringUtil`、`TypeUtil`、`ObjectUtil` 等。入口：`src/index.ts`。子路径：`.`（核心）、`./math`、`./vite`。
- **`@pawover/kit-hooks`** (`packages/hooks/`) — React hooks （`src/react/`：5 个）+ Alova hooks（`src/alova/`：4 个导出）。**根导出为空**（`export {}`）。需从 `@pawover/kit/hooks/react` 或 `@pawover/kit/hooks/alova` 导入。
- **`@pawover/kit-eslint-rules`** (`packages/eslint-rules/`) — ESLint 规则集：`javascript`、`typescript`、`react`、`reactHooks`、`vue`、`stylistic`、`antfu`、`imports`、`importsSort` 规则组 + `GLOB_EXCLUDE` + `createRules` + `Severity` 族类型。默认导出聚合全部；子路径 `./src/*`（core 规则组，兼容原 `@pawover/eslint-rules` 消费路径）。`preset.ts`（缩进 + 类成员排序预设）仅内部使用，不导出。**仓库自身 eslint.config.js 经 node 解析包 exports → `dist`，改本包源码后必须先 `pnpm build` 再跑 `check:eslint`/lint-staged**。
- **`@pawover/kit-zod`** (`packages/zod/`) — Zod v4 schema：id、string、number、boolean、bigint 等。仅根导出。
- **`@pawover/kit-internal`** (`packages/internal/`) — 内部工具包（`private`，不发布，不聚合进根包）：`tsdownFixCtsStubs`（tsdown CJS `.d.cts` 存根修复）、`tsdownVisualizerPlugins`（`VISUALIZER=1` 时启用 rollup-plugin-visualizer 构建分析）。**纯源码包**：`exports` 直接指向 `./src/index.ts`（Node 24 type stripping 直跑，无需构建产物）。各包 `tsdown.config.ts` 经包名导入；子包 tsconfig 开 `preserveSymlinks: true` 使 IDE/tsc 以 node_modules 路径直查其源码（**改其源码后类型即时反馈，无需先 `pnpm build`**，且不触发 rootDir 边界检查）。**其 `tsconfig.json` 为自包含配置（不 extends 根 build.json）**——否则 symlink 镜像项目（如 `packages/utils/node_modules/@pawover/kit-internal/tsconfig.json`）的 `extends` 相对路径错位导致配置退化（TS5083）；改 base/build.json 严格项时需同步此文件。**约定：内部包代码不允许出现在消费端**——仅构建期使用，禁止从发布包 `src` 导入 internal（详见 ADR-0004）。未来内部工具统一收进此包。

根包 `@pawover/kit` 通过 `package.json#exports` 重新导出所有子包。导入路径：`from '@pawover/kit/utils'`、`from '@pawover/kit/hooks/react'`、`from '@pawover/kit/types'`、`from '@pawover/kit/eslint-rules'`、`from '@pawover/kit/zod'`。

架构决策（薄 re-export、exports 仅指向 dist、直查源码方案）见 `docs/agents/architecture.md`。

## 构建流水线

```text
tsdown (build:source) → build (turbo) → 根 postbuild（scripts/syncEntry.ts 生成 entry metadata）
```

- **tsdown** 打包每个包（配置在每个包目录下，如 `packages/utils/tsdown.config.ts`）
- **tsc** 仅用于类型检查。tsdown 的 `dts: true` 负责生成声明文件。
- **syncEntry.ts**（根 postbuild）读取 utils/hooks 的 dist 导出名，生成 `entry/metadata.json`（数组形状）与 `entry/hooks-metadata.json`（`{alova, react}` 形状）；源缺失即抛错。两文件已提交（gitignore 例外），干净检出可直接 pack。

## 测试注意事项

- `test/` 是普通目录（不是 workspace 包）。测试按 `unit/` + `integration/` 组织。
- **vitest 双项目**：`node` 环境用于 utils+zod，`jsdom` 环境用于 hooks。
- `clearMocks: true` — mock 在测试间自动清除。
- vitest.config.ts 中的 resolve alias 将 `@pawover/kit/*` 与 `@pawover/kit-*`（含子路径）直接映射到源码 `.ts` 文件（具体形式排前面，防止前缀误匹配）。
- 类型检查测试：`test:types` 用 `test/tsconfig.json`（继承 `tsconfig.build.json` 但放宽了 `noUncheckedIndexedAccess: false`、`erasableSyntaxOnly: false` 等）。`check:types` 走根 tsconfig（继承 `tsconfig.base.json` 全严格，覆盖 packages src + scripts + 根配置文件）——两者互补：**测试文件以 `test:types` 为准，包源码以 `check:types` 为准**。
- **根 scripts**：`scripts/**/*.ts`（含 `syncEntry.ts`）由根 tsconfig 的 `include` 覆盖（继承 `types: ["node"]`，全严格），随 `check:types` 检查。
- **源码直查**：根 tsconfig 与 `test/tsconfig.json` 的 `paths` 都把 `@pawover/kit-*`（含子路径）直接映射到**源码 `.ts`**（slash 形式 `@pawover/kit/utils` 先经根包 entry/*.d.ts 静态 re-export，再命中 paths）。因此**改源码后无需先 `pnpm build` 即可跑 `test:types` / `check:types`**；`dist` 过期不再是误导性错误的来源。vitest 运行时走 `resolve.alias`（根形式 + 子包直引），同样直查源码。注意 `packages/*/tsconfig.json` 无 paths，IDE 中包间导入经 workspace 链接解析到 `dist` d.ts（构建后）。
- 覆盖率：v8 provider，`packages/**/src/**/*.{ts,tsx}`。阈值：lines:90 / branches:90 / functions:90 / statements:90。
- **`test/types/**` 类型测试约定（全反向断言）**：所有断言必须为 `@ts-expect-error` 反向断言，禁止正向写法。规则与陷阱见 `docs/agents/type-tests.md`。

## TypeScript 严格程度

通过 `tsconfig.base.json` 极度严格：启用了 `verbatimModuleSyntax`、`erasableSyntaxOnly`、`exactOptionalPropertyTypes`、`noUncheckedIndexedAccess`、`noUnusedLocals/Parameters`、`noPropertyAccessFromIndexSignature`。TypeScript v6。

## 工具链特性

- **Prettier**：printWidth 120；`.type.ts` 和 `.test.ts` 文件为 240
- **ESLint**：测试文件中所有规则禁用（eslint.config.js）。`antfu/no-import-dist: 0`。
- **Git**：`AGENTS.md` 被 gitignore（不提交）。Husky pre-commit 运行 lint-staged。Commitizen 提交（中英双语提示）。
- **Peer 依赖**：全部可选（`alova`、`mathjs`、`react`、`vite`、`zod`）。

## 导入风格

```ts
import { TypeUtil } from "@pawover/kit/utils"; // 核心工具
import { useMount } from "@pawover/kit/hooks/react"; // React hooks
import { useAlovaRequest } from "@pawover/kit/hooks/alova"; // Alova hooks
import type { AnyObject } from "@pawover/kit/types"; // 类型工具（根包子路径）
import eslintRules from "@pawover/kit/eslint-rules"; // ESLint 规则集（根包子路径）
import type { PlainObject } from "@pawover/kit-types"; // 类型工具（子包直引）
```

## 注释规范

- 所有公开 API（类 / 方法 / 类型）必须有中文 JSDoc，结构为：功能描述 → 空行 → `@param` / `@returns` / `@throws` → 空行 → `@example`（含 ` ```ts ` 代码块）。
- 参考既有写法的 JSDoc，**类型重载必须逐重载补示例**：方法存在多个重载签名时，`@example` 内必须为**每个重载**提供一个标注 `// 重载 N: <语义描述>` 的使用示例；参数组合变体（如 `null` / `undefined` 组合、`options` 变体）可以并入对应重载示例，用注释行说明。

## Agent skills

### Issue tracker

本仓库的议题（issues）与规格（specs）统一使用 GitHub Issues 管理（通过 `gh` CLI 操作）。详见 `docs/agents/issue-tracker.md`。

### Triage labels

默认标签：`needs-triage` / `needs-info` / `ready-for-agent` / `ready-for-human` / `wontfix`。详见 `docs/agents/triage-labels.md`。

### Domain docs

采用多上下文布局：根目录 `CONTEXT-MAP.md` 指向各子包的 `CONTEXT.md`。详见 `docs/agents/domain.md`。
