# @pawover/kit-zod

## 0.1.0-alpha.0

### Minor Changes

- 06aff01: 新增随 npm 包发布的 TanStack Intent Agent Skills：每个发布包在包内提供 `skills/<name>/SKILL.md`（types / utils / eslint-preset 含 references），提供类型、工具类、React 与 Alova Hooks、ESLint flat config 预设和 Zod schema 的使用指引；各包 `files` 与 `tanstack-intent` keyword 已同步，skill 会随对应包版本一起发布。根包（`@pawover/kit`）不在 workspace 包列表中，仍由发布脚本在子包发版后同步递增。

## 0.0.4-alpha.0

### Patch Changes

- d408123: main 发布后自动回推版本基线到 feature

## 0.0.3-alpha.1

### Patch Changes

- a8f0805: fix: exports 移除指向未打包 src 的 development 条件，修复 vite/vitest 消费者解析失败

## 0.0.3-alpha.0

### Patch Changes

- d408123: 第三轮发布流程测试

## 0.0.2-alpha.0

### Patch Changes

- 55bf39a: 最终演练（第二轮）：五子包全链路发布测试

## 0.0.1-alpha.0

### Patch Changes

- 37d3c03: 最终演练：五子包全链路发布测试

## 0.0.0

### Minor Changes

- 正式发布 0.1.0：退出 alpha 预发布模式，首个正式版本

### Patch Changes

- c2acb2b: 预发布 0.0.0-alpha.5（恢复 alpha pre 模式，验证 CI 发布流程；根包经 bump-root.mjs 同步发布）
- c2acb2b: 统一切入 alpha 发布通道，建立 5 个子包的 alpha 基线版本

## 0.0.0-alpha.5

### Patch Changes

- c2acb2b: 预发布 0.0.0-alpha.5（恢复 alpha pre 模式，验证 CI 发布流程；根包经 bump-root.mjs 同步发布）

## 0.0.0-alpha.4

### Patch Changes

- c2acb2b: 统一切入 alpha 发布通道，建立 5 个子包的 alpha 基线版本
