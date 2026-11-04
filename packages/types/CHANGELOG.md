# @pawover/kit-types

## 0.1.0-alpha.0

### Minor Changes

- 6f485dc: 移除 `VoidFunction`（与 lib.dom / lib.webworker 内置同名类型无法合并；DOM / WebWorker 环境请改用内置 `VoidFunction`，其余环境用 `() => void`），新增全局类型入口 `./global`（15 个基础类型）与 `./react/global`（3 个 React 类型）：type-only 子路径（无运行时产物），填入 tsconfig `types` 数组即可全局使用；支持 TS 5.0+。

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
