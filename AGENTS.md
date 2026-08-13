# pawover-kit

pnpm 单体仓库 (pnpm 11 / Node >=22)。Turborepo 构建。5 个包在 `packages/*` 下。

## 命令

| 命令                                     | 说明                                                                       |
| :--------------------------------------- | :------------------------------------------------------------------------- |
| `pnpm test`                              | `vitest run` — 814 条测试 / 31 文件，双项目 (node + jsdom)                 |
| `pnpm test:types`                        | `tsc -p test/tsconfig.json --noEmit` — 仅类型检查测试文件                  |
| `pnpm test:coverage`                     | 全量运行 + v8 覆盖率，阈值 90/80/90/90                                     |
| `pnpm test:ci`                           | `test:types && test && build && test:smoke && check:pack` (串行失败则停止) |
| `pnpm build`                             | `turbo build` — tsdown (build:source) → metadata (build:metadata) → build  |
| `pnpm check`                             | 并行运行 `check:types & check:eslint & check:format`（用 `&` 不是 `&&`）   |
| `pnpm check:types`                       | `tsc --noEmit`（根 tsconfig，通过 project references）                     |
| `pnpm check:eslint`                      | eslint 带 `--fix` 和缓存                                                   |
| `pnpm check:format`                      | prettier（仅 HTML/JSON）带缓存                                             |
| `pnpm changeset`                         | 交互式生成 changeset 变更说明（`.changeset/*.md`，随 PR 提交）             |
| `pnpm ci:version`                        | 消费 changeset：`changeset version && pnpm install`（CI 用）               |
| `pnpm pre:enter-alpha` / `pnpm pre:exit` | 进出 alpha pre 模式（`pnpm changeset pre enter/exit alpha`）               |

**发布**（见 `.changeset/README.md` 与 README「发布」节）：由 Changesets v3 + GitHub Actions 驱动。push main / feature 后 `release.yml` 自动创建/更新 Version Packages PR，合并后经 `pack` → `publish` 按**拓扑序**发布（types/zod/eslint-rules → utils → hooks → 根包），走 Trusted Publishing（OIDC，无 token）。当前全仓处于 alpha pre 模式（版本 `X.Y.Z-alpha.N`，dist-tag `alpha`，由 release.yml 的 `NPM_CONFIG_TAG` 环境变量控制）。`scripts/verify-release.mjs` 硬校验「子包发布 ⇒ 根包必发」。改发布流程后需在 CI 中跑 `pnpm test:ci` 验证。

## 架构

- **`@pawover/kit-types`** (`packages/types/`) — 纯类型工具包（无运行时代码）：`AnyObject`、`PlainObject`、`TreeLike`、`TreeLikeOptionalChildren`、`AnyFunction` 族、`Primitive`、`AdvancedRecord`、`ApiNameCheck` 等。入口：`src/index.ts`，子路径：`.`（核心）、`./react`（`Props` / `PropsWithChildren` / `PropsWithRef`）。测试见 `test/types/types/typesApi.test.type.ts`。
- **`@pawover/kit-utils`** (`packages/utils/`) — 静态类工具集：`ArrayUtil`、`StringUtil`、`TypeUtil`、`ObjectUtil` 等。入口：`src/index.ts`。子路径：`.`（核心）、`./math`、`./vite`。
- **`@pawover/kit-hooks`** (`packages/hooks/`) — React hooks （`src/react/`：5 个）+ Alova hooks（`src/alova/`：4 个导出）。**根导出为空**（`export {}`）。需从 `@pawover/kit/hooks/react` 或 `@pawover/kit/hooks/alova` 导入。
- **`@pawover/kit-eslint-rules`** (`packages/eslint-rules/`) — ESLint 规则集：`javascript`、`typescript`、`react`、`reactHooks`、`vue`、`stylistic`、`antfu`、`imports`、`importsSort` 规则组 + `GLOB_EXCLUDE` + `createRules` + `Severity` 族类型。默认导出聚合全部；子路径 `./src/*`（core 规则组，兼容原 `@pawover/eslint-rules` 消费路径）。`preset.ts`（缩进 + 类成员排序预设）仅内部使用，不导出。**仓库自身 eslint.config.js 经 node 解析包 exports → `dist`，改本包源码后必须先 `pnpm build` 再跑 `check:eslint`/lint-staged**。
- **`@pawover/kit-zod`** (`packages/zod/`) — Zod v4 schema：id、string、number、boolean、bigint 等。仅根导出。

根包 `@pawover/kit` 通过 `package.json#exports` 重新导出所有子包。导入路径：`from '@pawover/kit/utils'`、`from '@pawover/kit/hooks/react'`、`from '@pawover/kit/types'`、`from '@pawover/kit/eslint-rules'`、`from '@pawover/kit/zod'`。

**根包为薄 re-export 结构**（`entry/` 目录）：发布物仅含 `entry/`（无子包 dist），`dependencies` 声明 5 个子包（`workspace:*`，发布时重写为实际版本）。因此**发布根包前必须先把 5 个子包发布**（尤其 `@pawover/kit-types`、`@pawover/kit-eslint-rules` 首次发布）；根包 `build` 任务（`scripts/sync-entry.ts`）在 turbo 流水线中同步 `entry/metadata.json`。改根包 exports / entry 后需 `pnpm build` 再跑 `check:eslint`（entry 与根 scripts 已在 eslint ignores）。

所有子路径导出都有 `"development": "./src/index.ts"` 别名，允许构建工具在开发时直接使用源码。

## 构建流水线

```
tsdown (build:source) → build (turbo) → 根 postbuild（scripts/sync-entry.ts 生成 entry metadata）
```

- **tsdown** 打包每个包（配置在每个包目录下，如 `packages/utils/tsdown.config.ts`）
- **tsc** 仅用于类型检查。tsdown 的 `dts: true` 负责生成声明文件。
- **sync-entry.ts**（根 postbuild）读取 utils/hooks 的 dist 导出名，生成 `entry/metadata.json`（数组形状）与 `entry/hooks-metadata.json`（`{alova, react}` 形状）；源缺失即抛错。两文件已提交（gitignore 例外），干净检出可直接 pack。

## 测试注意事项

- `test/` 是普通目录（不是 workspace 包）。测试按 `unit/` + `integration/` 组织。
- **vitest 双项目**：`node` 环境用于 utils+zod，`jsdom` 环境用于 hooks。
- `clearMocks: true` — mock 在测试间自动清除。
- vitest.config.ts 中的 resolve alias 将 `@pawover/kit/*` 直接映射到源码 `.ts` 文件。
- 类型检查测试：`test:types` 用 `test/tsconfig.json`（继承 `tsconfig.build.json` 但放宽了 `noUncheckedIndexedAccess: false`、`erasableSyntaxOnly: false` 等，并配置了 `customConditions: ["development"]`）。`check:types` 通过根 tsconfig（project references）可能遗漏某些错误 — **优先使用 `test:types` 检查测试文件类型**。
- **源码直查**：`test/tsconfig.json` 的 `customConditions: ["development"]` 使 `tsc` 经由子包 exports 的 `development` 条件解析 `@pawover/kit-*` 到**源码 `.ts`**（slash 形式 `@pawover/kit/utils` 先经根包 entry/*.d.ts 静态 re-export，再命中子包 development）。因此**改源码后无需先 `pnpm build` 即可跑 `test:types`**；`dist` 过期不再是误导性错误的来源。vitest 运行时走 `resolve.alias` + Vite 的 `development` 条件，同样直查源码。
- 覆盖率：v8 provider，`packages/**/src/**/*.{ts,tsx}`。阈值：lines:90 / branches:90 / functions:90 / statements:90。
- **`test/types/**` 类型测试约定（全反向断言）**：类型断言**禁止正向写法**（`const x: T = api(...)`），所有断言必须为 `@ts-expect-error` 反向断言——将 API 结果赋给**错误的目标类型**（比正确类型更窄或字面量不同，如 `const bad: number = CurrencyUtil.toRealValue(math, "0.1")`，正确返回应为 `string`）。如此 API 一旦放宽为 `any` / 超类型（正向断言会静默通过）或收窄为目标类型（赋值不再报错），都会触发「Unused '@ts-expect-error' directive」错误，IDE 直接提示。断言写法要点：双向语义靠「cast 合法性 + 赋值报错」组合覆盖（如 `"abc" as IdType` 校验 `IdType` 包含 `string`，再赋给 `number` 校验未收窄）；允许保留非断言脚手架（`const math = create(all)`、`interface TreeNode`、供重赋值断言使用的 fixture 声明）。已知陷阱：lib.dom 中 `HTMLDivElement` 与 `HTMLSpanElement` 结构相同（均为空接口 extends HTMLElement）互为可赋值，区分元素类型须用 `HTMLInputElement` 等；`(a: number) => void` 可赋给 `(...arg: any[]) => any`（rest-any 不校验元数），反例断言可改用 `null`。参考实现：`test/types/utils/utilsApi.test.type.ts`、`test/types/types/typesApi.test.type.ts`。

## TypeScript 严格程度

通过 `tsconfig.base.json` 极度严格：启用了 `verbatimModuleSyntax`、`erasableSyntaxOnly`、`rewriteRelativeImportExtensions`、`exactOptionalPropertyTypes`、`noUncheckedIndexedAccess`、`noUnusedLocals/Parameters`、`noPropertyAccessFromIndexSignature`。TypeScript v6。

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

Issues 存于 GitHub Issues，用 `gh` CLI 操作。详见 `docs/agents/issue-tracker.md`。

### Triage labels

默认标签：`needs-triage` / `needs-info` / `ready-for-agent` / `ready-for-human` / `wontfix`。详见 `docs/agents/triage-labels.md`。

### Domain docs

多上下文布局：根 `CONTEXT-MAP.md` 指向各包 `CONTEXT.md`。详见 `docs/agents/domain.md`。
