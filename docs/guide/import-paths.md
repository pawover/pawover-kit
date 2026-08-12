# 导入路径约定

## 根包 vs 子包直引

根包 `@pawover/kit` 是薄 re-export 结构，通过 `package.json#exports` 重新导出所有子包。两种写法等价：

```ts
// 根包子路径（推荐，统一入口）
import { TypeUtil } from "@pawover/kit/utils";
import { useMount } from "@pawover/kit/hooks/react";
import type { AnyObject } from "@pawover/kit/types";
import eslintRules from "@pawover/kit/eslint-rules";
import { id } from "@pawover/kit/zod";

// 子包直引（按需安装单个子包时）
import { TypeUtil } from "@pawover/kit-utils";
import type { PlainObject } from "@pawover/kit-types";
```

## 子路径一览

| 导入路径 | 内容 |
| :--- | :--- |
| `@pawover/kit/types` | 全部类型工具（`AnyObject`、`TreeLike`、`AdvancedRecord`…） |
| `@pawover/kit/types/react` | React 相关类型（`Props`、`PropsWithChildren`、`PropsWithRef`） |
| `@pawover/kit/utils` | 核心 13 个工具类（array / currency / dateTime / env / function / mime / number / object / string / theme / tree / type / validate） |
| `@pawover/kit/utils/math` | `MathUtil`（别名 `@pawover/kit/math`） |
| `@pawover/kit/utils/vite` | `ViteUtil`（别名 `@pawover/kit/vite`） |
| `@pawover/kit/hooks/react` | React Hooks（`useMount`、`useResponsive`…） |
| `@pawover/kit/hooks/alova` | Alova Hooks（`useAlovaRequest`、`useAlovaPagination`…） |
| `@pawover/kit/eslint-rules` | ESLint 规则集（默认导出 + `createRules`） |
| `@pawover/kit/zod` | Zod v4 Schema（30 个） |

> [!WARNING]
> `@pawover/kit-hooks` 根导出为空（`export {}`）。**不要**从 `@pawover/kit/hooks` 导入任何内容。

## ESM / CJS

所有产物均为双格式：

- `import` 条件 → ESM（`.js` / `.d.ts`）
- `require` 条件 → CJS（`.cjs` / `.d.cts`）

## development 条件

所有子路径导出都带 `"development": "./src/index.ts"` 别名：

- 构建工具（Vite / vitest 等）在开发时经 `development` 条件直接解析到**源码**，方便调试
- 生产构建走标准 `import` / `require` 条件，使用打包产物

因此**修改源码后无需先构建**即可被本地工具链（如 vitest 的 resolve alias）消费。
