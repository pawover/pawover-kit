# CONTEXT-MAP

本仓库为多上下文（pnpm monorepo）。每个包拥有独立的 `CONTEXT.md` 收录其领域词汇；根 `CONTEXT.md` 收录跨包共享的领域词汇。工程技能在进入代码库探索时应先读本文件，再按需读取相关上下文。

## 上下文

| 上下文            | 包                                | 说明                                   | CONTEXT.md                                                          |
| ----------------- | --------------------------------- | -------------------------------------- | ------------------------------------------------------------------- |
| 跨包 / 根         | —                                 | 跨发布包共享的领域词汇（构建、包边界、消费端等） | [./CONTEXT.md](./CONTEXT.md)                                        |
| types             | `@pawover/kit-types`              | 纯类型工具包（无运行时代码）           | [packages/types/CONTEXT.md](packages/types/CONTEXT.md)             |
| utils             | `@pawover/kit-utils`              | 静态类工具集（已收录 I18n 国际化词汇） | [packages/utils/CONTEXT.md](packages/utils/CONTEXT.md)             |
| hooks             | `@pawover/kit-hooks`              | React / Alova hooks（根导出为空）      | [packages/hooks/CONTEXT.md](packages/hooks/CONTEXT.md)             |
| eslint-rules      | `@pawover/kit-eslint-rules`       | ESLint 规则集                          | [packages/eslint-rules/CONTEXT.md](packages/eslint-rules/CONTEXT.md) |
| zod               | `@pawover/kit-zod`                | Zod v4 schema                          | [packages/zod/CONTEXT.md](packages/zod/CONTEXT.md)                 |
| internal          | `@pawover/kit-internal` (private) | 内部工具包（仅构建期使用，不发布）     | [packages/internal/CONTEXT.md](packages/internal/CONTEXT.md)       |

## ADR 位置

- 全局决策：`docs/adr/`
- 上下文级决策：各包 `packages/<pkg>/docs/adr/`（惰性创建）

消费规则见 `docs/agents/domain.md`。
