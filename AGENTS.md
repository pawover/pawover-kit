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

求助机制：​ 若遇到逻辑不清、存在歧义，或经多轮尝试仍无法推进的任务，请立即停止自主推理。你必须暂停执行并向开发者询问，澄清任务的具体要求与边界，待确认无误后再继续处理。
路径校验机制：​ 若开发者提供（或任务描述中）的文件路径不存在，请立即停止推理与猜测。你必须主动向开发者反馈该异常，并在获得明确的修正路径或进一步指示前，禁止执行任何后续操作。此举是为了防止你基于错误的前提进行“脑补”或虚构文件内容（产生幻觉），确保操作的准确性。
