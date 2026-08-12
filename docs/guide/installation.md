# 安装

## 使用根包聚合导入

```bash
npm install @pawover/kit
```

也可以使用 pnpm 或 yarn：

```bash
pnpm add @pawover/kit
yarn add @pawover/kit
```

## 按需安装单个子包

```bash
npm install @pawover/kit-types
npm install @pawover/kit-utils
npm install @pawover/kit-hooks
npm install @pawover/kit-eslint-rules
npm install @pawover/kit-zod
```

## 可选 peer 依赖

`alova`、`mathjs`、`react`、`vite`、`zod` 为**可选 peer 依赖**：使用对应功能前需自行安装。

| 功能 | 需要的 peer 依赖 | 导入路径 |
| :--- | :--- | :--- |
| Alova Hooks（`useAlovaRequest` 等） | `alova` + `react` | `@pawover/kit/hooks/alova` |
| React Hooks（`useMount` 等） | `react` | `@pawover/kit/hooks/react` |
| 数学计算（`MathUtil`、`CurrencyUtil.toRealValue`） | `mathjs` | `@pawover/kit/math`、`@pawover/kit/utils` |
| Vite 代理工具（`ViteUtil.toProxy`） | `vite` | `@pawover/kit/vite` |
| Zod Schema（`id` 等） | `zod` | `@pawover/kit/zod` |

> [!WARNING]
> 例如：使用 `@pawover/kit/hooks/alova` 需要同时安装 `alova` 与 `react`，否则对应模块在运行时解析依赖会失败。

## 验证安装

```ts
import { TypeUtil } from "@pawover/kit/utils";

TypeUtil.isString("hello"); // true
```
