# pawover-kit

A TypeScript-based development toolkit.
pnpm monorepo (pnpm 11 / Node >=22). 4 workspaces under `packages/*`.

## Commands

| Command | What it does |
|---|---|
| `pnpm test` | Runs Vitest 4 (browser tests via Playwright Chromium) |
| `pnpm build` | `turbo build` — runs build:source (tsdown) → build:metadata → build |
| `pnpm build:force` | `turbo build --force` |
| `pnpm build:package` | Full build + `pnpm pack` to produce .tgz |
| `pnpm check` | Runs **in parallel** (`&`, not `&&`): `check:types` + `check:eslint` + `check:format` |
| `pnpm check:types` | `tsc --noEmit` (project references via tsconfig.json) |
| `pnpm check:eslint` | ESLint 10 with `--fix` and `--cache` |
| `pnpm check:format` | Prettier (HTML/JSON only, with cache) |
| `pnpm check:pack` | `attw --pack .` (are-the-types-wrong) |
| `pnpm clean` | Rims `.cache`, `node_modules`, `**/dist`, `**/*.tgz` |
| `pnpm lib:up` | `taze -I -r` to bump deps (excludes pnpm) |
| `pnpm commit` | Commitizen with cz-customizable |
| `pnpm public` | Build + `npm publish --access public` |

## Packages

- `@pawover/kit-utils` (`packages/utils/`) — 定义了各种通用、常用的实用工具。
- `@pawover/kit-hooks` (`packages/hooks/`) — 针对专门的使用场景定义了各种实用Hooks，目前包括 React hooks、Alova hooks。使用时需要有对应的前置依赖。
- `@pawover/kit-zod` (`packages/zod/`) — 定义了各种 Zod 实用工具。
- `@pawover/kit-enums` (`packages/enums/`) — **Empty** (src/index.ts is blank, no build config). Use tsdown.config.ts if adding content.

`@pawover/kit` (root) re-exports all packages via `exports` map in root package.json. E.g. `import {...} from '@pawover/kit/math'`, `from '@pawover/kit/hooks/alova'`.

## 代码风格规范 Code Style Rules

在整个项目中贯彻严格的代码风格理念，**必须阅读**和**使用**以下技能：
.agents/skills/code-style-guide
.agents/skills/vercel-react-best-practices

## 技能 Skills

.agents/skills

## 注意事项 Important Notes

当遇到任何令你困惑或者经过多轮步骤任然无法处理的任务时，请立即与开发者汇报沟通，不要独自埋头解决，请询问开发者，了解任务的详细内容再做决策。
