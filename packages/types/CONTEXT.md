# @pawover/kit-types 上下文

本包的领域词汇表，由 `/domain-modeling` 在术语真正落定时惰性维护。工程技能命名领域概念时应使用本表词汇（见根 `CONTEXT-MAP.md` 与 `docs/agents/domain.md`）。

## 词汇

### 全局类型入口（Global Type Entry）

经 tsconfig `types` 数组消费的子路径入口：`./global`（15 个基础类型）与 `./react/global`（3 个 React 类型）。入口以 `declare global` 把类型注入全局命名空间，供整个项目免 `import` 使用；与模块导入入口（`.` / `./react`）分离，避免 `import` 用户被动获得全局注入。
_Avoid_: 全局声明（含义过宽）、全局 shim（暗示 polyfill）

### 声明文件入口（Declaration-file Entry）

全局入口的交付形态：`src/*.d.ts` 手写声明文件（唯一维护点），以 `import type * as KitTypes from "./index.js"` 命名空间引用模块版定义（定义体完全跟随；泛型参数表与 JSDoc 为手写投影）；构建由 tsdown `copy` 原样拷贝至 `dist/`（相对引用在 src 与 dist 同目录下恒成立），不经打包器重写。相对引用带显式 `.js` 扩展（兼容 Node16 解析），exports 为 type-only 子路径。
_Avoid_: 自足声明（旧形态，已撤销）
