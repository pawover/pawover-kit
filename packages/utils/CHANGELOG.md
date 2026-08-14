# @pawover/kit-utils

## 0.1.5-alpha.1

### Patch Changes

- a8f0805: fix: exports 移除指向未打包 src 的 development 条件与失效的 ./metadata.json 导出，修复 vite/vitest 消费者解析失败
- Updated dependencies [a8f0805]
  - @pawover/kit-types@0.0.3-alpha.1

## 0.1.5-alpha.0

### Patch Changes

- d408123: 第三轮发布流程测试
- Updated dependencies [d408123]
  - @pawover/kit-types@0.0.3-alpha.0

## 0.1.4-alpha.0

### Patch Changes

- 55bf39a: 最终演练（第二轮）：五子包全链路发布测试
- Updated dependencies [55bf39a]
  - @pawover/kit-types@0.0.2-alpha.0

## 0.1.3-alpha.0

### Patch Changes

- 37d3c03: 最终演练：五子包全链路发布测试
- Updated dependencies [37d3c03]
  - @pawover/kit-types@0.0.1-alpha.0

## 0.1.2

### Patch Changes

- d59964a: 演练 changeset：dispatch 完整闭环验证

## 0.1.1-alpha.3

### Patch Changes

- 67ccb15: 演练 changeset：workflow_dispatch 发布触发测试

## 0.1.1-alpha.2

### Patch Changes

- 67ccb15: 演练 changeset：二次闭环 + PR closed 触发测试

## 0.1.1-alpha.1

### Patch Changes

- 67ccb15: 演练 changeset：alpha 全链路测试

## 0.1.1-alpha.0

### Patch Changes

- 31631a2: chore: 双通道发布模型端到端演练（验证 alpha 发布 → 发布合并 → latest 全链）

## 0.1.0

### Minor Changes

- 05e9960: feat(utils): EnvUtil 新增 BREAK_POINT 断点阈值常量表，isDesktop/isMobile/isTablet 默认参数改为引用（768/1200 单源）

## 0.1.0-alpha.0

### Minor Changes

- feat(utils): EnvUtil 新增 BREAK_POINT 断点阈值常量表，isDesktop/isMobile/isTablet 默认参数改为引用（768/1200 单源）

## 0.0.0

### Minor Changes

- 正式发布 0.1.0：退出 alpha 预发布模式，首个正式版本

### Patch Changes

- c2acb2b: 预发布 0.0.0-alpha.5（恢复 alpha pre 模式，验证 CI 发布流程；根包经 bump-root.mjs 同步发布）
- c2acb2b: 统一切入 alpha 发布通道，建立 5 个子包的 alpha 基线版本
- Updated dependencies
- Updated dependencies [c2acb2b]
- Updated dependencies [c2acb2b]
  - @pawover/kit-types@0.0.0

## 0.0.0-alpha.5

### Patch Changes

- c2acb2b: 预发布 0.0.0-alpha.5（恢复 alpha pre 模式，验证 CI 发布流程；根包经 bump-root.mjs 同步发布）
- Updated dependencies [c2acb2b]
  - @pawover/kit-types@0.0.0-alpha.5

## 0.0.0-alpha.4

### Patch Changes

- c2acb2b: 统一切入 alpha 发布通道，建立 5 个子包的 alpha 基线版本
- Updated dependencies [c2acb2b]
  - @pawover/kit-types@0.0.0-alpha.4
