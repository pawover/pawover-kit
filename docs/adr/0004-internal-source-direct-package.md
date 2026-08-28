# ADR-0004: 内部包采用源码直出 + preserveSymlinks 直查

新建 private 包 `@pawover/kit-internal` 统一承载仓库内部构建工具（tsdown 共享插件 / hooks），其 `exports` 直接指向 `./src/index.ts`（源码直出），子包 tsconfig 开 `preserveSymlinks: true`，使 IDE / tsc 以 node_modules 路径直查其源码——TS 对 node_modules 路径下的文件豁免 rootDir 检查，因此「包边界守卫」（TS6059 / TS6307）保持完整，且改内部包源码无需构建即获即时反馈（Node ≥ 22.18 type stripping 直跑 `.ts`，src 内部相对导入须带 `.ts` 扩展名）。

曾评估的三条路：A) 子包 tsconfig 加 paths + include 白名单 + rootDir 放宽 + noEmit——实测 `noEmit` 使 TS6307 失效、rootDir 放宽使 TS6059 失效，包边界守卫静默丢失，且每包 +5 行配置特例，被否；B) exports → dist 产物 + turbo 构建顺序——守卫完整但 IDE 无即时反馈，被否；C) 本方案。保留 internal 的 `build:source` 任务（turbo 依赖边 `^build:source` 要求其存在，产物冗余但无害，兼作构建自检）。

约定：**内部包代码不允许出现在消费端**——内部工具仅构建期使用（`tsdown.config.ts`），禁止从发布包 `src` 导入内部包（会被打包进 dist 违反约定）。内部包的 `dependencies` = 运行时被 Node 加载的依赖（当前：rollup-plugin-visualizer）。为源码直出，`tsconfig.base.json` 恢复了 `allowImportingTsExtensions`（内部包 src 的 `.ts` 扩展名导入被根 / 子包 / test 多项目检查）。

连带决策：`packages/internal/tsconfig.json` 为**自包含配置**（不 extends 根 build.json）——tsserver 会以 symlink 路径下的 tsconfig 镜像建项目（如 `packages/utils/node_modules/@pawover/kit-internal/tsconfig.json`），相对 `extends` 按 symlink 路径解析错位（TS5083）导致配置退化（无 `types: ["node"]`，IDE 报「找不到 process / node:fs」及类型链连锁错误）；自包含后镜像与真实项目配置一致。**改 base/build.json 严格项时需同步 internal tsconfig**。

Status: accepted
