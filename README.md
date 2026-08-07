# pawover-kit

[![npm version](https://img.shields.io/npm/v/@pawover/kit.svg)](https://www.npmjs.com/package/@pawover/kit)
[![Node version](https://img.shields.io/badge/node-%3E%3D22.20.0-brightgreen.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> 一个基于 TypeScript 的开源工具包合集：类型工具、静态工具类、React / Alova Hooks、ESLint 规则集与 Zod Schema，开箱即用、类型完备。

pawover-kit 是一个 pnpm 单体仓库（monorepo），由 5 个独立可发布的子包组成。根包 `@pawover/kit` 聚合重新导出所有子包，也可以按需单独安装使用。

## 特性

- **纯类型工具** `@pawover/kit-types`：无运行时代码，提供 `AnyObject`、`TreeLike`、`AnyFunction` 族、`AdvancedRecord`、`ApiNameCheck` 等常用类型
- **静态工具类** `@pawover/kit-utils`：数组、字符串、对象、树、货币、日期、数学等 14+ 个工具类
- **React / Alova Hooks** `@pawover/kit-hooks`：`useMount`、`useUnmount`、`useLatest`、`useResponsive`、`useTitle` 与 Alova 请求系列 Hooks
- **ESLint 规则集** `@pawover/kit-eslint-rules`：9 大规则组（javascript / typescript / react / reactHooks / vue / stylistic / antfu / imports / importsSort）+ `GLOB_EXCLUDE` + `createRules`
- **Zod v4 Schema** `@pawover/kit-zod`：id、string、number、boolean、bigint 等常用校验器
- ESM / CJS 双格式产物，附带完整类型声明
- `development` 导出条件，开发环境可直接使用源码，方便调试

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

## 安装

使用根包聚合导入：

```bash
npm install @pawover/kit
```

或按需安装单个子包：

```bash
npm install @pawover/kit-types
npm install @pawover/kit-utils
npm install @pawover/kit-hooks
npm install @pawover/kit-eslint-rules
npm install @pawover/kit-zod
```

> [!WARNING]
> `alova`、`mathjs`、`react`、`vite`、`zod` 为可选 peer 依赖：使用对应功能前需自行安装（如使用 `@pawover/kit/hooks/alova` 需要 `alova` 与 `react`）。

## 快速开始

```ts
import { TypeUtil } from "@pawover/kit/utils";
import { useMount } from "@pawover/kit/hooks/react";
import { useAlovaRequest } from "@pawover/kit/hooks/alova";
import type { AnyObject } from "@pawover/kit/types";
import eslintRules from "@pawover/kit/eslint-rules";
import { id } from "@pawover/kit/zod";

// 类型工具
const obj: AnyObject = { a: 1, b: "2" };

// 静态工具类
TypeUtil.isString("hello"); // true

// React Hook
useMount(() => {
  console.log("mounted");
});

// ESLint 规则集（flat config）
export default [
  { ignores: eslintRules.GLOB_EXCLUDE },
  { files: ["**/*.ts"], rules: { ...eslintRules.javascript, ...eslintRules.typescript } },
];

// Zod Schema
id.parse("abc"); // "abc"
```

## 环境要求

- Node.js >= 22.20.0
- pnpm >= 11

## 开发

```bash
git clone https://github.com/pawover/pawover-kit.git
cd pawover-kit
pnpm install
```

常用命令：

| 命令 | 说明 |
| :--- | :--- |
| `pnpm test` | vitest 全量运行（801 条测试 / 31 个文件，node + jsdom 双环境） |
| `pnpm test:types` | 测试文件的类型检查 |
| `pnpm test:ci` | 完整 CI 流程：类型检查 → 测试 → 构建 → 冒烟 → pack 检查 |
| `pnpm build` | turbo 构建全部子包（tsdown 生成 ESM/CJS 双格式与类型声明） |
| `pnpm check` | 并行运行 types / eslint / format 检查 |

## 测试

- **单元测试**：vitest 双项目（node 环境覆盖 utils / zod / eslint-rules，jsdom 环境覆盖 hooks）
- **类型测试**：`test/types/` 下以 `.test.type.ts` 结尾的类型级 API 测试，由 `test:types` 全量检查
- **冒烟测试**：构建后验证所有 dist 产物可正常导入

## 构建流水线

```
tsdown (build:source) → metadata 提取 (build:metadata) → turbo build
```

- **tsdown** 负责打包与类型声明生成
- **metadata.ts** 提取 utils / hooks 的运行时导出名，写入 `dist/metadata.json`
- 所有子路径导出均带 `"development": "./src/index.ts"` 别名，开发工具链可直接使用源码
