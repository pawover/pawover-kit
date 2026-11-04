# ADR-0009: kit-types 移除 VoidFunction 并新增全局类型入口（tsconfig types 消费）

`@pawover/kit-types` **移除 `VoidFunction`**（模块与全局均不再提供；0.x 语义下以 minor 发布），并新增两个**全局类型入口**子路径：`./global`（15 个基础类型）与 `./react/global`（`Props` / `PropsWithChildren` / `PropsWithRef`）——均为 **type-only 子路径**（exports 仅 `types` 条件），入口为**手写声明文件**（`src/global.d.ts` / `src/react-global.d.ts`），以 `declare global` 注入全局命名空间，填入 tsconfig `types` 数组即可整个项目免 `import` 使用；`package.json` 增加 optional peer `typescript: ">=5.0.0"`。

背景：使用者希望通过 auto-imports（unplugin-auto-import 的类型提升）全局使用 `VoidFunction`，但工具生成的 `type VoidFunction = ...` 与 lib.dom / lib.webworker 内置的 `interface VoidFunction` 同名不可合并，稳定报 `TS2300 Duplicate identifier`。实测矩阵（TS 5.0.4 / 5.4.5 / 5.9.3 / 6.0.3 × 携带 DOM / WebWorker / 两者皆无）确认：仅 `interface` 形态可与 lib 合并共存，但类型提升工具的生成形态不可控，且 `skipLibCheck: true` 会掩盖此类冲突。**移除提供**是唯一零陷阱解：DOM / WebWorker 环境直接使用 lib 内置 `VoidFunction`，其余环境使用 `() => void`，包内不再存在「同名的第三方声明」这一冲突源。

曾评估：A) 全局入口以 `interface` 形态声明并依赖合并——只覆盖本包入口，无法约束工具生成物，治标不治本；B) 改名为无冲突的其他名字——破坏公共 API 且引入非标准命名，被否；C) 本方案：删除 + 其余类型走全局入口。

连带决策：

1. **声明文件为唯一维护点 + 命名空间引用**：入口以 `import type * as KitTypes from "./index.js"`（react 版为 `./react.js`）引用模块版定义（`type Primitive = KitTypes.Primitive;`）：定义体完全跟随（引用名缺失/改名即编译报错），泛型参数表与 JSDoc 为手写投影（受公开 API 注释规范约束），其一致性由评审与消费端编译场景守护；相对引用带显式 `.js` 扩展以兼容 Node16 解析。**曾评估**：直写复制完整定义、以及 `type X = import("./index").X` 内联引用——前者造成 200+ 行重复，后者被 dts 打包器重写为与 `declare global` 内声明同名的裸标识符、产生自引用（TS2456，构建实证）；最终由 tsdown `copy` 将声明文件**原样拷贝**至 `dist/`（不经打包器），相对引用在 src 与 dist 同目录下恒成立，两者的问题一并消除。
2. **type-only 子路径**：exports 仅声明 `types` 条件（`type-fest/globals` 同款）——该路径本就无运行时语义，误用 `import` 会因无匹配条件而失败（属预期设计，已在文档注明只填 `types` 数组）。attw 在 CJS 模式会把 types 条件的类型解析视作 runtime 解析、误报 `cjs-resolves-to-esm`，已附依据加入 checkPack 忽略表。
3. **三层验收防线**（发布物质量不依赖消费者检查——消费者与主测试编译的 `skipLibCheck: true` 会跳过 .d.ts 自身检查）：① `test/types` 中每个全局类型一条 `@ts-expect-error` 探针——类型解析失败会 error 化（"任何值都可赋"），断言因不再报错而失效（TS2578），在 `test:types` 层直接红（根 tsconfig 不含 test 目录；名字整体缺失时的假绿由 ②③ 的存在性使用点兜底）；② `test:global-types` 的**源码级严格场景**（`skipLibCheck: false` 直接编译两个声明文件，不依赖构建）；③ 同脚本的**产物级严格场景**（发布态伪 node_modules + 8 组 tsconfig `types` 消费场景：lib 组合 / Node16 / 根包与子包路径，`skipLibCheck: false`）。另有「无 DOM 时 `VoidFunction` 必须不可解析」的防回归负例与反向断言（两条导入路径 import `VoidFunction` 均 `@ts-expect-error`）。
4. **子包 tsconfig 自写 exclude（连带修复）**：包级 tsconfig（IDE 编辑包内文件时的归属项目）的默认 include 会把 `dist/` 产物收进项目——extends 继承的 exclude 按「源配置目录」解析、对子包无效；本次新增的 `declare global` 产物曾致 IDE 全量重复报错（CI 从未暴露，因其只跑根 tsconfig）。五个子包 tsconfig 显式声明 `"exclude": ["**/node_modules", "**/dist"]`（相对各自目录解析），并新增 `check:types:packages`（逐包 `tsc -p`，挂入 `test:ci`）把包项目编译纳入 CI。

Status: accepted
