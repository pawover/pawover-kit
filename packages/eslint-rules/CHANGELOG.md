# @pawover/kit-eslint-rules

## 0.1.0-alpha.1

### Minor Changes

- a8bac64: 将 `@pawover/kit-eslint-rules` 重构为自包含 flat config 预设：默认导出工厂 `pawover(options?)`，全部上游插件（含 vue-eslint-parser）改为精确锁定的 `dependencies` 并由工厂自动注册，安装本包即可使用；`javascript` 组常开，typescript / stylistic / antfu / imports / importsSort / react / vue 通过显式开关启用；移除规则映射与 `createRules` 公共导出及 `./src/*` 子路径；新增测试层规则存在性校验。

  TypeScript parser 与 typescript / react type-aware 规则仅作用于 ts/tsx（开启 vue 时含 .vue），react type-aware 规则额外覆盖 jsx（jsx 的类型可用性交由项目 tsconfig 的 `include`/`allowJs` 决定，不在项目内会报错）；未开启 `typescript` 时 react type-aware 规则自动降级关闭（no-op 注册，后置覆盖也无法强制开启）；补录 javascript / typescript / react / vue / stylistic 共 21 条上游新规则并给出默认值。

  **破坏性变更**（0.x 下以 minor 发布）。

## 0.0.6-alpha.0

### Patch Changes

- ccff7f7: 将 7 条在 `@stylistic` v6 中废弃的规则（`array-bracket-newline`、`array-bracket-spacing`、`array-element-newline`、`function-call-argument-newline`、`function-paren-newline`、`object-curly-newline`、`object-curly-spacing`）统一迁移至 `list-style` 规则，并升级 peerDependency `@stylistic/eslint-plugin` 至 `^6.0.0-beta.6` 以与根依赖保持一致。

## 0.0.5-alpha.0

### Patch Changes

- e1d51f4: fix: 调整 `ts/member-ordering` 预设，消除静态成员排序强制导致的 TDZ 风险

  - 静态字段合并为单一分组（不再强制 private 先于 public）：静态字段按声明顺序初始化，私有静态字段引用后声明的公有静态字段（如派生查找表引用常量枚举）会在类初始化阶段抛 `ReferenceError`
  - `static-initialization` 移至所有静态字段之后，静态块可安全引用任意静态字段
  - 实例字段 / 访问器 / 方法排序保持不变

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
