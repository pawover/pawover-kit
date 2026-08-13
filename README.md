# pawover-kit

[![npm version](https://img.shields.io/npm/v/@pawover/kit.svg)](https://www.npmjs.com/package/@pawover/kit)
[![Node version](https://img.shields.io/badge/node-%3E%3D22.20.0-brightgreen.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docs](https://img.shields.io/badge/docs-pawover--kit--docs-3B82F6.svg)](https://pawover.github.io/pawover-kit/)

> 一个基于 TypeScript 的开源工具包合集：类型工具、静态工具类、React / Alova Hooks、ESLint 规则集与 Zod Schema，开箱即用、类型完备。

pawover-kit 是一个 pnpm 单体仓库（monorepo），由 5 个独立可发布的子包组成。根包 `@pawover/kit` 聚合重新导出所有子包，也可以按需单独安装使用。

> 📚 **技术文档**：[https://pawover.github.io/pawover-kit/](https://pawover.github.io/pawover-kit/) —— 完整的 API 参考、指南与实战示例见文档站；本文档只保留最简介绍。

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
| `pnpm docs:dev` | 本地预览文档站（VitePress，源码见 `docs/`） |
| `pnpm docs:gen` | 从源码 JSDoc 重新生成 API 参考页（改源码注释后需重新生成） |

## 发布

发布由 [Changesets](https://changesets.dev) v3 + GitHub Actions 全自动驱动，push `main` 即触发，全程无需手动登录 npm 或输入 OTP（走 Trusted Publishing / OIDC 认证，发布自动附带 provenance 证明）。

### 一图流

```
push main
  └─ select-mode（读 .changeset/ + 对比 git tag）
       ├─ 有 changeset 文件 ───────→ version 通道：自动建/更「Version Packages」PR
       │                              └─ 合并 PR → push main → 再次 select-mode
       ├─ 无 changeset，但版本 > git tag ─→ publish 通道：build → pack → 发布 → 打 git tag
       └─ 无变化 ──────────────────→ unchanged：安全空跑
```

### 日常发布循环

1. **改代码**——不要手动修改任何 `package.json` 的 `version` 字段，版本号只能由 changesets 生成
2. **写 changeset**：`pnpm changeset`（交互式勾选受影响包与 bump 级别），生成 `.changeset/*.md` 变更说明；也可手写该文件，示例：

   ```md
   ---
   "@pawover/kit-utils": patch
   "@pawover/kit-hooks": minor
   ---

   修复 xxx 问题 / 新增 xxx 能力
   ```

3. **提交 PR**：changeset 文件**必须与代码同 PR**，合并到 `main`
4. **CI 自动创建 / 更新「Version Packages」PR**：消费 changeset → 计算各包新版本号 → 更新 CHANGELOG（合并前 CI 会先跑 `scripts/verify-release.mjs` 守卫）
5. **审核并合并 Version Packages PR**：确认版本号符合预期、`@pawover/kit` 根包在发布列表中（有子包变更时必在）
6. **CI 自动发布**：`select-mode` 进入 publish 通道 → pack job（`pnpm build` + pack，`HUSKY: 0`）→ publish job（`changeset publish --from-pack-dir`，逐包 `npm publish`）→ 成功后自动打 git tag（`@pawover/kit-utils@0.0.0-alpha.5` 等）并推送
7. **验证**：`npm view @pawover/kit-utils dist-tags --json` 看 tag 落点；Actions 全绿；npmjs 包页出现 Provenance 徽标

### 版本号规则（当前 alpha pre 模式）

| bump | 子包（当前 `0.0.0-alpha.4`） | 根包（当前 `0.8.0`） |
| :--- | :--- | :--- |
| `patch` | `0.0.0-alpha.5` | `0.8.1-alpha.N` |
| `minor` | `0.1.0-alpha.0` | `0.9.0-alpha.N` |
| `major` | `1.0.0-alpha.0` | `1.0.0-alpha.N` |

- 子包 A 被发布时，依赖 A 的包（含根包）自动随同 patch 提升——**任何子包发布必伴随根包发布**（CI 硬校验守卫）
- 已存在于 registry 的版本不会重复发布

### dist-tag 规则

| 包 | 当前 `latest` | `alpha` tag |
| :--- | :--- | :--- |
| 5 个子包 | `0.0.0-alpha.4`（only-pre：从未出过稳定版，首个 pre 版本直接挂 latest） | `0.0.0-alpha.3` |
| 根包 `@pawover/kit` | `0.8.0`（有稳定版历史，pre 版本只发 alpha tag，不碰 latest） | — |

### 转正流程（发布正式版）

1. 确认 main 干净（无未合并的 Version PR）
2. `pnpm pre:exit` → 提交并 push main（`pnpm pre:enter-alpha` 可随时重新进入）
3. 之后照常走日常循环，此时版本号不再带 `-alpha`，发布到 `latest`
4. 清理遗留（可选）：`npm dist-tag rm <包> alpha` 移除 5 个子包的旧 alpha tag

### 应急手动发布（一般不使用）

```bash
pnpm build && pnpm postbuild            # 构建并同步 entry/metadata.json
pnpm public                             # 根包（turbo build && pnpm publish）
pnpm --filter @pawover/kit-utils publish --tag alpha   # 单个子包（本地需登录态，交互式 OTP）
```

### 易错点

- **Trusted Publisher**（npmjs 后台）：Repository 必须是 `pawover-kit`（不是包名）、workflow 必须 `.github/workflows/release.yml`、Environment 留空——任何不一致会导致 CI 发布 E404
- `release.yml` 的 pack / publish job 已设 `HUSKY: 0`，勿删（否则 `npm pack` 触发根包 husky 直接失败）
- changeset 忘提交 → 不发布；手动改版本号 → 破坏 tag 对比逻辑，**永远不要**
- `pnpm changeset version` 需要干净工作区，本地跑之前先提交/暂存
- 只有本地手动发布才需要 OTP；CI 走 OIDC 不需要

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
