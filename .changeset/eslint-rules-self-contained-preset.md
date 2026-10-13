---
"@pawover/kit-eslint-rules": minor
---

将 `@pawover/kit-eslint-rules` 重构为自包含 flat config 预设：默认导出工厂 `pawover(options?)`，全部上游插件（含 vue-eslint-parser）改为精确锁定的 `dependencies` 并由工厂自动注册，安装本包即可使用；`javascript` 组常开，typescript / stylistic / antfu / imports / importsSort / react / vue 通过显式开关启用；移除规则映射与 `createRules` 公共导出及 `./src/*` 子路径；新增测试层规则存在性校验。

TypeScript parser 与 typescript / react type-aware 规则仅作用于 ts/tsx（开启 vue 时含 .vue），react type-aware 规则额外覆盖 jsx（jsx 的类型可用性交由项目 tsconfig 的 `include`/`allowJs` 决定，不在项目内会报错）；未开启 `typescript` 时 react type-aware 规则自动降级关闭（no-op 注册，后置覆盖也无法强制开启）；补录 javascript / typescript / react / vue / stylistic 共 21 条上游新规则并给出默认值。

**破坏性变更**（0.x 下以 minor 发布）。
