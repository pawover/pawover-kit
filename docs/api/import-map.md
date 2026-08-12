# 导入路径映射

根包 `@pawover/kit` 通过 `package.json#exports` 重新导出所有子包。下表是所有可用的导入路径。

| 导入路径 | 内容 | 详细参考 |
| :--- | :--- | :--- |
| `@pawover/kit/types` | 全部类型工具 | [types](types) |
| `@pawover/kit/types/react` | React 类型（`Props`、`PropsWithChildren`、`PropsWithRef`） | [types](types) |
| `@pawover/kit/utils` | 核心 13 个工具类 | [utils](utils) |
| `@pawover/kit/utils/math` | `MathUtil`（等价 `@pawover/kit/math`） | [utils](utils) |
| `@pawover/kit/utils/vite` | `ViteUtil`（等价 `@pawover/kit/vite`） | [utils](utils) |
| `@pawover/kit/hooks/react` | React Hooks（5 个） | [hooks](hooks) |
| `@pawover/kit/hooks/alova` | Alova Hooks（4 个） | [hooks](hooks) |
| `@pawover/kit/eslint-rules` | ESLint 规则集 | [eslint-rules](eslint-rules) |
| `@pawover/kit/zod` | Zod v4 Schema | [zod](zod) |

> [!WARNING]
> `@pawover/kit-hooks` 根导出为空。不要从 `@pawover/kit/hooks` 导入。

## 单包直引

| 子包 | 说明 | 导入路径 |
| :--- | :--- | :--- |
| `@pawover/kit-types` | 纯类型工具包 | `import type { AnyObject } from "@pawover/kit-types"` |
| `@pawover/kit-utils` | 静态工具类 | `import { TypeUtil } from "@pawover/kit-utils"` |
| `@pawover/kit-hooks` | React / Alova Hooks | `import { useMount } from "@pawover/kit-hooks/react"` |
| `@pawover/kit-eslint-rules` | ESLint 规则集 | `import eslintRules from "@pawover/kit-eslint-rules"` |
| `@pawover/kit-zod` | Zod v4 Schema | `import { id } from "@pawover/kit-zod"` |

## 双格式与 development 条件

- ESM：`import` 条件（`.js` / `.d.ts`）；CJS：`require` 条件（`.cjs` / `.d.cts`）
- 所有子路径带 `"development": "./src/index.ts"` 别名：开发工具链直接解析源码，改源码无需先构建
