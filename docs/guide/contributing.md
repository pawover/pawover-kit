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
4. **CI 自动创建 / 更新「Version Packages」PR**：消费 changeset → 计算各包新版本号 → 更新 CHANGELOG
5. **审核并合并 Version Packages PR**：确认版本号符合预期、`@pawover/kit` 根包在发布列表中（有子包变更时必在）
6. **CI 自动发布**：`select-mode` 进入 publish 通道 → pack → publish（逐包 `npm publish`）→ 成功后自动打 git tag 并推送
7. **验证**：`npm view @pawover/kit-utils dist-tags --json` 看 tag 落点；npmjs 包页出现 Provenance 徽标

### 版本号规则（当前 alpha pre 模式）

| bump | 子包（当前 `0.0.0-alpha.x`） | 根包（当前 `0.8.x`） |
| :--- | :--- | :--- |
| `patch` | `0.0.0-alpha.N+1` | `0.8.N-alpha.M` |
| `minor` | `0.1.0-alpha.0` | `0.9.0-alpha.M` |
| `major` | `1.0.0-alpha.0` | `1.0.0-alpha.M` |

- 子包 A 被发布时，依赖 A 的包（含根包）自动随同 patch 提升——**任何子包发布必伴随根包发布**（CI 硬校验守卫）
- 已存在于 registry 的版本不会重复发布

### 转正流程（发布正式版）

1. 确认 main 干净（无未合并的 Version PR）
2. `pnpm pre:exit` → 提交并 push main（`pnpm pre:enter-alpha` 可随时重新进入）
3. 之后照常走日常循环，此时版本号不再带 `-alpha`，发布到 `latest`
4. 清理遗留（可选）：`npm dist-tag rm <包> alpha` 移除 5 个子包的旧 alpha tag

### 易错点

- **Trusted Publisher**（npmjs 后台）：Repository 必须是 `pawover-kit`（不是包名）、workflow 必须 `.github/workflows/release.yml`、Environment 留空——任何不一致会导致 CI 发布 E404
- `release.yml` 的 pack / publish job 已设 `HUSKY: 0`，勿删（否则 `npm pack` 触发根包 husky 直接失败）
- changeset 忘提交 → 不发布；手动改版本号 → 破坏 tag 对比逻辑，**永远不要**
- `pnpm changeset version` 需要干净工作区，本地跑之前先提交/暂存
- 只有本地手动发布才需要 OTP；CI 走 OIDC 不需要

## 构建流水线

```
tsdown (build:source) → metadata 提取 (build:metadata) → turbo build
```

- **tsdown** 负责打包与类型声明生成
- **metadata.ts** 提取 utils / hooks 的运行时导出名，写入 `dist/metadata.json`
- 所有子路径导出均带 `"development": "./src/index.ts"` 别名，开发工具链可直接使用源码
