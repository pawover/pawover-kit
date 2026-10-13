# ADR-0006: 发布包采用混合 exports——types 指源码、default 指 dist

utils / hooks / types / zod 4 个发布包的开发态 `exports` 采用混合条件：`types` → `./src/**/*.ts`（子包 tsconfig 无 paths，IDE / tsc 经 node_modules 解析直查源码、签名跳源码；直查机制沿用 ADR-0004 的 `preserveSymlinks: true`），`default` → `./dist/**`（Node 运行时消费构建产物，工作区行为与消费者一致）。顶层 `main` / `module` / `types` 与 default 对齐指 dist；发布物由 `publishConfig` 覆盖为纯 dist 条件，消费者完全不受影响。**Node 直跑源码只保留在 eslint-rules / internal**（`exports` 全指 `./src`，源码相对导入用显式 `.ts` 扩展名）——`.ts` 扩展名约束仅在 Node 执行源码的场景必需，4 个发布包不需要。

曾评估三条路：A) 全指 src——IDE 收益相同，但把 Node 运行时也拖进源码模式：Node ESM 不支持目录 / 无后缀导入，`syncEntry` / `test:smoke` / `test:ci` 全线失败（4b9651a 的 CI / Release 实红，worktree 复现实证）；补齐 `.ts` 后缀可修复，但「源码可被 Node 直跑」会成为长期约束、并失去「工作区运行行为 = 消费者产物行为」的保真，被否；B) 全指 dist——IDE 跳 `dist/*.d.ts`、改源码不构建即无即时反馈，被否；C) 本方案。

连带影响：`syncEntry` / `test:smoke` 等 Node 脚本必须在 `pnpm build` 之后运行（`test:ci` 顺序天然满足）；开发期存在「类型看 src、运行时看 dist」的双来源，改源码未构建时 Node 场景使用旧产物（vitest 经 `resolve.alias` 直查源码，不受影响）。

Status: accepted
