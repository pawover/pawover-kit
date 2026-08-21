<div align="center">
  <img src="site/public/logo.svg" width="64" alt="pawover-kit logo">
  <h1>pawover-kit</h1>
  <p><b>简体中文</b> | <a href="README.en.md">English</a></p>

  [![npm version](https://img.shields.io/npm/v/@pawover/kit.svg)](https://www.npmjs.com/package/@pawover/kit)
  [![Node version](https://img.shields.io/badge/node-%3E%3D22.20.0-brightgreen.svg)](https://nodejs.org)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Docs](https://img.shields.io/badge/docs-pawover--kit--docs-3B82F6.svg)](https://pawover.github.io/pawover-kit/)
</div>

> 一个基于 TypeScript 的开源工具包合集：类型工具、静态工具类、React / Alova Hooks、ESLint 规则集与 Zod Schema，开箱即用、类型完备。

pawover-kit 是一个 pnpm 单体仓库（monorepo），由 5 个独立可发布的子包组成。根包 `@pawover/kit` 聚合重新导出所有子包，也可以按需单独安装使用。

> 📚 **技术文档**：[https://pawover.github.io/pawover-kit/](https://pawover.github.io/pawover-kit/) —— 完整的 API 参考、指南与实战示例见文档站；本文档只保留最简介绍。

## 特性

- ESM / CJS 双格式产物，附带完整类型声明
- `exports` 仅指向 `dist` 产物，任意工具链（node / vite / vitest / webpack 等）均可正常解析

## 子包

| 包 | 说明 | 最新版本 | 下载量 |
| :-- | :-- | :-- | :-- |
| `@pawover/kit` | 聚合根包，重新导出所有子包 | [![npm version](https://img.shields.io/npm/v/@pawover/kit.svg)](https://www.npmjs.com/package/@pawover/kit) | [![npm downloads](https://img.shields.io/npm/dm/@pawover/kit.svg)](https://www.npmjs.com/package/@pawover/kit) |
| `@pawover/kit-types` | 纯类型工具包（无运行时代码） | [![npm version](https://img.shields.io/npm/v/@pawover/kit-types.svg)](https://www.npmjs.com/package/@pawover/kit-types) | [![npm downloads](https://img.shields.io/npm/dm/@pawover/kit-types.svg)](https://www.npmjs.com/package/@pawover/kit-types) |
| `@pawover/kit-utils` | 15+ 个静态工具类 | [![npm version](https://img.shields.io/npm/v/@pawover/kit-utils.svg)](https://www.npmjs.com/package/@pawover/kit-utils) | [![npm downloads](https://img.shields.io/npm/dm/@pawover/kit-utils.svg)](https://www.npmjs.com/package/@pawover/kit-utils) |
| `@pawover/kit-hooks` | React + Alova Hooks | [![npm version](https://img.shields.io/npm/v/@pawover/kit-hooks.svg)](https://www.npmjs.com/package/@pawover/kit-hooks) | [![npm downloads](https://img.shields.io/npm/dm/@pawover/kit-hooks.svg)](https://www.npmjs.com/package/@pawover/kit-hooks) |
| `@pawover/kit-eslint-rules` | ESLint 规则集（flat config） | [![npm version](https://img.shields.io/npm/v/@pawover/kit-eslint-rules.svg)](https://www.npmjs.com/package/@pawover/kit-eslint-rules) | [![npm downloads](https://img.shields.io/npm/dm/@pawover/kit-eslint-rules.svg)](https://www.npmjs.com/package/@pawover/kit-eslint-rules) |
| `@pawover/kit-zod` | Zod v4 校验器 | [![npm version](https://img.shields.io/npm/v/@pawover/kit-zod.svg)](https://www.npmjs.com/package/@pawover/kit-zod) | [![npm downloads](https://img.shields.io/npm/dm/@pawover/kit-zod.svg)](https://www.npmjs.com/package/@pawover/kit-zod) |

<blockquote style="background: rgba(9, 105, 218, 0.05); border-left: 4px solid #0969da; border-radius: 6px; padding: 12px 16px;">
  <b>📝 注意</b>：<code>@pawover/kit-hooks</code> 的根导出为空，请始终从 <code>@pawover/kit/hooks/react</code> 或 <code>@pawover/kit/hooks/alova</code> 子路径导入。
</blockquote>

## 安装

使用根包聚合导入：

```bash
pnpm add @pawover/kit
```

或按需安装单个子包：

```bash
pnpm add @pawover/kit-types
pnpm add @pawover/kit-utils
pnpm add @pawover/kit-hooks
pnpm add @pawover/kit-eslint-rules
pnpm add @pawover/kit-zod
```

<blockquote style="background: rgba(191, 135, 16, 0.05); border-left: 4px solid #bf870f; border-radius: 6px; padding: 12px 16px;">
  <b>⚠️ 警告</b>：<code>alova</code>、<code>mathjs</code>、<code>react</code>、<code>vite</code>、<code>zod</code> 为可选 peer 依赖：使用对应功能前需自行安装（如使用 <code>@pawover/kit/hooks/alova</code> 需要 <code>alova</code> 与 <code>react</code>）。
</blockquote>

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
| `pnpm test` | vitest 全量运行（814 条测试 / 31 个文件，node + jsdom 双环境） |
| `pnpm test:types` | 测试文件的类型检查 |
| `pnpm test:ci` | 完整 CI 流程：类型检查 → 测试 → 构建 → 冒烟 → pack 检查 |
| `pnpm build` | turbo 构建全部子包（tsdown 生成 ESM/CJS 双格式与类型声明） |
| `pnpm check` | 并行运行 types / eslint / format 检查 |
| `pnpm docs:dev` | 本地预览文档站（VitePress，源码见 `site/`） |
| `pnpm docs:gen` | 从源码 JSDoc 重新生成 API 参考页（改源码注释后需重新生成） |

## 发布

由 Changesets v3 + GitHub Actions 驱动的**双通道发布模型**（完整细节见 [.changeset/README.md](./.changeset/README.md)）：

- **feature = alpha 预发布通道**：push feature 全自动——CI 守卫（`verifyReleasePlan.ts`）→ select-mode → version PR → version job 等 CI 绿后合并 → dispatch 触发 publish，发布 `alpha` dist-tag
- **main = 正式版通道**：只通过**发布合并**收代码——`pnpm release:merge`（同步校验 → 剥离 prerelease → 防撞车校验 → 建 release-main PR）→ **人工合并 PR**（正式版发布的人工确认节点）→ 发布 `latest` → CI 自动把稳定版版本号回推 feature（基线同步，下一轮 alpha 从新稳定版之上递增）
- **核心设计**：alpha → 正式版之间必须经过人工确认节点，任何自动化都不会越过它

常用命令：

| 操作 | 命令 |
| :--- | :--- |
| 写变更说明 | `pnpm changeset` |
| 发布 alpha（自动） | `git push origin feature` |
| 发起正式版发布（人工闸门） | `pnpm release:merge` → 人工合并 PR |
| 非发布内容同步到 main | `pnpm sync:main` → 人工合并 PR（版本保持 main 侧，不触发发布） |
| 基线同步 | 自动（main 发布后 CI 回推）；手动兜底：feature 上 `git merge origin/main`（取 main 侧版本） |
| 应急手动发布 | `pnpm pre:enter-alpha && pnpm build && pnpm changeset publish` |

> Trusted Publishing / OIDC：全程无需 npm token；分支保护、守卫明细、FAQ 见 `.changeset/README.md`。

## 测试

- **单元测试**：vitest 双项目（node 环境覆盖 utils / zod / eslint-rules，jsdom 环境覆盖 hooks）
- **类型测试**：`test/types/` 下以 `.test.type.ts` 结尾的类型级 API 测试，由 `test:types` 全量检查
- **冒烟测试**：构建后验证所有 dist 产物可正常导入

## 构建流水线

```text
tsdown (build:source) → metadata 提取 (build:metadata) → turbo build
```

- **tsdown** 负责打包与类型声明生成
- **syncEntry.ts**（根 postbuild）读取 utils / hooks 的 dist 导出名，生成 `entry/metadata.json` 与 `entry/hooks-metadata.json`
- 仓库内测试（`test:types` / vitest）经 tsconfig `paths` 与 `resolve.alias` 直查源码，改源码无需先构建