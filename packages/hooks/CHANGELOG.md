# @pawover/kit-hooks

## 0.0.8-alpha.0

### Patch Changes

- Updated dependencies [fa67d73]
- Updated dependencies [21302d3]
  - @pawover/kit-utils@1.0.0-alpha.0

## 0.0.7-alpha.0

### Patch Changes

- d408123: main 发布后自动回推版本基线到 feature
- Updated dependencies [d408123]
  - @pawover/kit-types@0.0.4-alpha.0
  - @pawover/kit-utils@0.1.6-alpha.0

## 0.0.6-alpha.1

### Patch Changes

- a8f0805: fix: exports 移除指向未打包 src 的 development 条件与失效的 ./metadata.json 导出，修复 vite/vitest 消费者解析失败
- Updated dependencies [a8f0805]
- Updated dependencies [a8f0805]
  - @pawover/kit-types@0.0.3-alpha.1
  - @pawover/kit-utils@0.1.5-alpha.1

## 0.0.6-alpha.0

### Patch Changes

- d408123: 第三轮发布流程测试
- Updated dependencies [d408123]
  - @pawover/kit-types@0.0.3-alpha.0
  - @pawover/kit-utils@0.1.5-alpha.0

## 0.0.5-alpha.0

### Patch Changes

- 55bf39a: 最终演练（第二轮）：五子包全链路发布测试
- Updated dependencies [55bf39a]
  - @pawover/kit-types@0.0.2-alpha.0
  - @pawover/kit-utils@0.1.4-alpha.0

## 0.0.4-alpha.0

### Patch Changes

- 37d3c03: 最终演练：五子包全链路发布测试
- Updated dependencies [37d3c03]
  - @pawover/kit-types@0.0.1-alpha.0
  - @pawover/kit-utils@0.1.3-alpha.0

## 0.0.3

### Patch Changes

- d59964a: 演练 changeset：dispatch 完整闭环验证
- Updated dependencies [d59964a]
  - @pawover/kit-utils@0.1.2

## 0.0.2-alpha.3

### Patch Changes

- 67ccb15: 演练 changeset：workflow_dispatch 发布触发测试
- Updated dependencies [67ccb15]
  - @pawover/kit-utils@0.1.1-alpha.3

## 0.0.2-alpha.2

### Patch Changes

- 67ccb15: 演练 changeset：二次闭环 + PR closed 触发测试
- Updated dependencies [67ccb15]
  - @pawover/kit-utils@0.1.1-alpha.2

## 0.0.2-alpha.1

### Patch Changes

- 67ccb15: 演练 changeset：alpha 全链路测试
- Updated dependencies [67ccb15]
  - @pawover/kit-utils@0.1.1-alpha.1

## 0.0.2-alpha.0

### Patch Changes

- 31631a2: chore: 双通道发布模型端到端演练（验证 alpha 发布 → 发布合并 → latest 全链）
- Updated dependencies [31631a2]
  - @pawover/kit-utils@0.1.1-alpha.0

## 0.0.1

### Patch Changes

- 05e9960: refactor(hooks): 抽取 Alova 三 hook 共享的 options 基类型与 middleware 组合/onX 挂载 helper（内部重构，行为不变）
- 05e9960: fix(hooks): useResponsive 实例 token 覆盖不再改写模块级默认表，改为按 token 签名共享计算结果（单 resize 监听器，token 相同的实例共享一次计算）
- Updated dependencies [05e9960]
  - @pawover/kit-utils@0.1.0

## 0.0.1-alpha.0

### Patch Changes

- refactor(hooks): 抽取 Alova 三 hook 共享的 options 基类型与 middleware 组合/onX 挂载 helper（内部重构，行为不变）
- fix(hooks): useResponsive 实例 token 覆盖不再改写模块级默认表，改为按 token 签名共享计算结果（单 resize 监听器，token 相同的实例共享一次计算）
- Updated dependencies
  - @pawover/kit-utils@0.1.0-alpha.0

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
  - @pawover/kit-utils@0.0.0

## 0.0.0-alpha.5

### Patch Changes

- c2acb2b: 预发布 0.0.0-alpha.5（恢复 alpha pre 模式，验证 CI 发布流程；根包经 bump-root.mjs 同步发布）
- Updated dependencies [c2acb2b]
  - @pawover/kit-types@0.0.0-alpha.5
  - @pawover/kit-utils@0.0.0-alpha.5

## 0.0.0-alpha.4

### Patch Changes

- c2acb2b: 统一切入 alpha 发布通道，建立 5 个子包的 alpha 基线版本
- Updated dependencies [c2acb2b]
  - @pawover/kit-types@0.0.0-alpha.4
  - @pawover/kit-utils@0.0.0-alpha.4
