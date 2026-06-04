# pawover-kit

A TypeScript-based development toolkit.
pnpm monorepo (pnpm 11 / Node >=22). 4 workspaces under `packages/*`.

## Commands

| Command | What it does |
| :--- | :--- |
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

贯彻**严格的代码风格与最佳实践**。在执行任何代码生成、修改或审查任务前，**必须**优先加载并遵循以下技能（Skills）规范：

| 技能文件 | 作用 |
| :--- | :--- |
| **`code-style-guide`** | 定义项目的基础编码风格、格式化规则与命名约定。 |
| **`vercel-react-best-practices`** | 定义 React/Next.js 的性能优化、钩子使用与安全规范。 |

### 语言与国际化规范

| 场景 | 规范 |
| :--- | :--- |
| **对话交互** | 在与开发者沟通及回复时，**必须**全程使用**简体中文**。 |
| **代码注释** | 在编写或修改代码时，所有注释内容请使用**简体中文**，确保团队阅读无障碍。 |

### 语义严格区分

在处理 `value`、`defaultValue`、`initialValues`、`initialValue` 等值域属性时，**必须严格区分 `null` 与 `undefined`**，**布尔类型同理**：`undefined` **绝不等同于** `false`。：

| 状态 | 语义 |
| :--- | :--- |
| **`null`** | 表示**显式传入了值**，但该值为空（已知为空）。 |
| **`undefined`** | 表示**未传入值**（缺省态），应触发默认逻辑或回退行为。 |

### 函数命名规范

在定义回调函数或事件处理函数时，**禁止**使用 `handle` 作为前缀（区别其他语言的系统级句柄函数，避免冗余的句柄语义）。统一使用 **`on` + `[主体/对象]` + `[动作/事件]`** 的命名顺序，**对象在前，动作在后**：

| 场景 | 规范 | 示例 |
| :--- | :--- | :--- |
| **❌ 禁止** | 禁止使用 `handle` 前缀 | `handleSubmit`, `handleButtonClick` |
| **✅ 推荐** | 使用 `on` 前缀 | `onSubmit`, `onButtonClick` |
| **❌ 禁止** | 禁止动宾倒置（动词+名词） | `onPickUser`, `onChangeName` |
| **✅ 推荐** | **名词/主体 + 动词/动作** | `onUserPick`, `onNameChange` |

## 注意事项 Important Notes

### 求助机制

若遇到逻辑不清、存在歧义，或经多轮尝试仍无法推进的任务，请立即停止自主推理。你必须暂停执行并向开发者询问，澄清任务的具体要求与边界，待确认无误后再继续处理。
