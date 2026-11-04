# ADR-0008: eslint-rules 改为自包含 flat config 预设（插件内置 + 精确锁定）

`@pawover/kit-eslint-rules` 从"裸规则映射预设"重构为**自包含 flat config 预设**：默认导出工厂 `pawover(options?)` 返回完整配置数组；9 个上游插件（含 vue-eslint-parser，eslint-plugin-vue 的必选 peer）从可选 `peerDependencies` 移入 `dependencies` 并以**精确版本**锁定；`javascript` 组常开，typescript / stylistic / antfu / imports / importsSort / react / vue 通过显式开关启用；规则映射与 `createRules` 公共导出及 `./src/*` 子路径移除（0.x alpha 阶段破坏性重写）。

背景：规则映射与用户自装的插件版本解耦——上游插件升级（规则改名/删除）后映射引用不存在的规则，用户 lint 时直接报错，而包无法约束用户实际安装的插件版本。依赖内置 + 精确锁定后，用户只需安装本包，拿到的永远是 CI 验证过的唯一组合；插件升级由维护者主动发版完成。

曾评估：A) 仅收缩 peer 范围并在加载时防御——仍无法阻止版本漂移，被否；B) 源码级 vendoring（把插件 bundle 进 dist）——彻底自包含但体积、许可与升级重打包成本高，被否；C) 本方案。

连带决策：规则存在性由测试层**黑盒校验**（遍历预设产物每层的 rules × plugins，对照插件对象与 ESLint 内置规则表逐条解析），CI 拦截，不做运行时静默过滤；TypeScript parser 层与 typescript 规则层均只作用于 ts/tsx（开启 vue 时并入 .vue）；react 组拆两层——基础规则覆盖全部源文件，type-aware 规则（清单自插件 `disable-type-checked` 配置动态派生）仅在 ts/tsx/jsx 层启用，且 **jsx 的类型可用性交由项目 tsconfig 的 `include`/`allowJs` 决定**（未被项目覆盖的 jsx 会按「不在项目内」报错，延续「有类型规则作用处必须大声失败」原则；全文件挂 TS parser 的初版实现对 tsconfig 之外的 js/cjs 会触发 projectService fatal 误伤，真机安装冒烟实证后收窄）。react 开启而 typescript 未开启时，工厂自动关闭同一批 type-aware 规则，并以 no-op 实现（保留原 `meta`/schema）替换这些规则的注册——后置覆盖即使强制开启也不会报「requires type information」，纯 JS React 项目可安全启用 react 组；曾评估：硬编码规则清单（插件升级会漂移，被否）、仅将规则置 0（后置覆盖可将其重新打开并报错，被否）。

打包形态改为**单 ESM 产物**（对其余发布包 ESM+CJS 双格式惯例的例外）：@eslint-react/eslint-plugin 等依赖为 ESM-only（exports 仅声明 import 条件），CJS 产物 `require` 它们必然失败（构建期 smoke 实证 `ERR_PACKAGE_PATH_NOT_EXPORTED`）；`publishConfig.exports` 的 `require` 条件同指 ESM 文件，CJS 配置（`eslint.config.cjs`）经 Node 的 `require(esm)`（Node >=22.12，本包 engines >=24.21）仍可加载。曾评估把 ESM-only 依赖 bundle 进 CJS 产物——体积与升级维护成本高，被否。

Status: accepted
