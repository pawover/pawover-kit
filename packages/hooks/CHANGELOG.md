# @pawover/kit-hooks

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
