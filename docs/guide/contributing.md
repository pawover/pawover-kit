# 开发与发布

## 环境准备

```bash
git clone https://github.com/pawover/pawover-kit.git
cd pawover-kit
pnpm install
```

## 常用命令

| 命令 | 说明 |
| :--- | :--- |
| `pnpm test` | vitest 全量运行（node + jsdom 双环境） |
| `pnpm test:types` | 测试文件的类型检查 |
| `pnpm test:ci` | 完整 CI 流程：类型检查 → 测试 → 构建 → 冒烟 → pack 检查 |
| `pnpm build` | turbo 构建全部子包（tsdown 生成 ESM/CJS 双格式与类型声明） |
| `pnpm check` | 并行运行 types / eslint / format 检查 |

### 文档站点命令

| 命令 | 说明 |
| :--- | :--- |
| `pnpm docs:dev` | 本地开发预览（VitePress） |
| `pnpm docs:build` | 构建文档站点（输出到 `docs/.vitepress/dist`） |
| `pnpm docs:gen` | 从源码 JSDoc 重新生成 API 参考页（`docs/api/*`） |

> [!NOTE]
> `docs:gen` 生成物（`docs/api/*`）**提交进仓库**，GitHub Pages 构建时不再重复生成，避免版本漂移。改源码 JSDoc 后请重新生成并一并提交。

## 测试

- **单元测试**：vitest 双项目（node 环境覆盖 utils / zod / eslint-rules，jsdom 环境覆盖 hooks）
- **类型测试**：`test/types/` 下以 `.test.type.ts` 结尾的类型级 API 测试，由 `test:types` 全量检查
- **冒烟测试**：构建后验证所有 dist 产物可正常导入

## 发布流程

由 Changesets v3 + GitHub Actions 驱动的**双通道发布模型**（完整细节见 [.changeset/README.md](../../.changeset/README.md)）：

- **feature = alpha 预发布通道**：push feature 全自动——CI 守卫（`verify-release-plan.mjs`）→ select-mode → version PR → 合并 → dispatch 触发 publish，发布 `alpha` dist-tag
- **main = 正式版通道**：只通过发布合并收代码——`pnpm release:merge`（剥离 prerelease、防撞车校验、建 release-main PR）→ **人工合并 PR**（正式版发布的人工确认节点）→ 发布 `latest`

常用命令：`pnpm changeset`（写变更说明）｜`git push origin feature`（发布 alpha）｜`pnpm release:merge`（发起正式版发布）。

### 易错点

- **Trusted Publisher**（npmjs 后台）：Repository 必须是 `pawover-kit`、workflow 必须 `.github/workflows/release.yml`、Environment 留空——任何不一致会导致 CI 发布 E404
- `release.yml` 的 pack / publish job 已设 `HUSKY: 0`，勿删（否则 `npm pack` 触发根包 husky 直接失败）
- changeset 忘提交 → 不发布；手动改版本号 → 破坏 tag 对比逻辑，**永远不要**
- 只有本地手动发布才需要 OTP；CI 走 OIDC 不需要

## 构建流水线

```
tsdown (build:source) → metadata 提取 (build:metadata) → turbo build
```

- **tsdown** 负责打包与类型声明生成
- **metadata.ts** 提取 utils / hooks 的运行时导出名，写入 `dist/metadata.json`
- 所有子路径导出均带 `"development": "./src/index.ts"` 别名，开发工具链可直接使用源码
