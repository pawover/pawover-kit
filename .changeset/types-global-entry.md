---
"@pawover/kit-types": minor
---

移除 `VoidFunction`（与 lib.dom / lib.webworker 内置同名类型无法合并；DOM / WebWorker 环境请改用内置 `VoidFunction`，其余环境用 `() => void`），新增全局类型入口 `./global`（15 个基础类型）与 `./react/global`（3 个 React 类型）：type-only 子路径（无运行时产物），填入 tsconfig `types` 数组即可全局使用；支持 TS 5.0+。
