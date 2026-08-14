# 简介

> 一个基于 TypeScript 的开源工具包合集：类型工具、静态工具类、React / Alova Hooks、ESLint 规则集与 Zod Schema，开箱即用、类型完备。

pawover-kit 是一个 pnpm 单体仓库（monorepo），由 5 个独立可发布的子包组成。根包 `@pawover/kit` 聚合重新导出所有子包，也可以按需单独安装使用。

## 特性

- **纯类型工具** `@pawover/kit-types`：无运行时代码，提供 `AnyObject`、`TreeLike`、`AnyFunction` 族、`AdvancedRecord`、`ApiNameCheck` 等常用类型
- **静态工具类** `@pawover/kit-utils`：数组、字符串、对象、树、货币、日期、数学等 15 个工具类、144 个静态方法
- **React / Alova Hooks** `@pawover/kit-hooks`：`useMount`、`useUnmount`、`useLatest`、`useResponsive`、`useTitle` 与 Alova 请求系列 Hooks
- **ESLint 规则集** `@pawover/kit-eslint-rules`：9 大规则组（javascript / typescript / react / reactHooks / vue / stylistic / antfu / imports / importsSort）+ `GLOB_EXCLUDE` + `createRules`
- **Zod v4 Schema** `@pawover/kit-zod`：id、string、number、boolean、bigint 等 30 个常用校验器
- ESM / CJS 双格式产物，附带完整类型声明
- `exports` 仅指向 `dist` 产物，任意工具链（node / vite / vitest / webpack 等）均可正常解析

## 包结构

| 包 | 说明 | 导入路径 |
| :--- | :--- | :--- |
| `@pawover/kit-types` | 纯类型工具包（无运行时代码） | `@pawover/kit/types`，react 相关类型见 `@pawover/kit/types/react` |
| `@pawover/kit-utils` | 静态工具类 | `@pawover/kit/utils`（另有 `./math`、`./vite` 子路径） |
| `@pawover/kit-hooks` | React + Alova Hooks | `@pawover/kit/hooks/react`、`@pawover/kit/hooks/alova` |
| `@pawover/kit-eslint-rules` | ESLint 规则集 | `@pawover/kit/eslint-rules` |
| `@pawover/kit-zod` | Zod v4 Schema | `@pawover/kit/zod` |

> [!NOTE]
> `@pawover/kit-hooks` 的根导出为空，请始终从 `@pawover/kit/hooks/react` 或 `@pawover/kit/hooks/alova` 子路径导入。

## 环境要求

- Node.js >= 22.20.0
- pnpm >= 11（开发与发布）

## 下一步

- [安装](installation) —— 安装根包或按需安装子包
- [快速开始](quick-start) —— 5 分钟跑通每个包的典型用法
- [API 参考](/api/import-map) —— 全部导出与签名
