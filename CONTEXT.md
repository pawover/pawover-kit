# pawover-kit 领域词汇表

本文件是领域模型的最小词汇表，由 `/domain-modeling` 与架构深化过程惰性维护。工程技能在命名领域概念时应使用本表词汇（见 `docs/agents/domain.md`）。

## 词汇

### 断点（Breakpoint）

响应式布局的宽度档位（`xs` / `sm` / `md` / `lg` / `xl` / `xxl` / `xxxl`）。各档位阈值由断点 token 提供。

### 断点 token（Breakpoint Token）

断点档位的阈值配置。**断点 token 默认表**（`BREAK_POINT_TOKEN`）是不可变的模块级常量；实例在默认表之上做覆盖合并，覆盖只作用于实例自身。

### 断点 token 签名（Token Signature）

实例合并后的断点 token 的稳定序列化（`JSON.stringify`）。用于「按 token 集共享计算」：签名相同的实例共享一次 resize 计算与结果状态。

### 响应式订阅（Responsive Subscription）

`useResponsive` 的订阅模型：全局仅注册一个 resize 监听器，实例按签名注册进条目（entry）；条目内无订阅者即删除，全部条目清空才移除监听器。

### 断点阈值（Breakpoint Threshold）

设备分类默认参数的唯一来源：`EnvUtil.BREAK_POINT = { MD: 768, XL: 1200 }`。仅覆盖设备分类需要的最小档位；hooks 的断点 token 默认表保持独立字面量（决策：不跨包引用）。

### 设备分类（Device Classification）

`EnvUtil` 的物理设备分类（宽度 + 屏幕英寸启发式）。与断点 token 的纯宽度布局档位是**两套有意并存的语义**：1366×768 笔记本按英寸带（9.79″ ∈ [7,13)）被判为「平板」是**已决策保留**的行为（测试钉死，`envUtil.test.ts:172`）。英寸带 7/10/13 保持字面量（决策：不具名化）。两包断点定义刻意不共享、不跨包引用的决策背景见 `docs/adr/0005-breakpoint-threshold-token-not-shared.md`。

## 构建与包结构

### 内部包（Internal Package）

private、不发布、只服务仓库自身构建/脚本流程的包（当前仅 `@pawover/kit-internal`）。
_Avoid_: 私有包（宽泛）、工具包（指包内模块层级时）

### 发布包（Published Package）

可独立发布到 npm 的 5 个子包（types / utils / hooks / eslint-rules / zod），被根包聚合 re-export。
_Avoid_: 子包（口语可沿用，正式文档用发布包）

### 内部工具（Internal Tool）

内部包内的一个导出模块（如 `tsdownFixCtsStubs`、`tsdownVisualizerPlugins`）。

### 源码直出（Source-Direct）

包的 `exports` 直接指向 `./src/index.ts`，无需构建产物即可消费：Node ≥ 22.18 type stripping 直跑，TS 经 `preserveSymlinks` 以 node_modules 路径直查源码。
_Avoid_: 源码直查（另一概念——paths 直查）

### 包边界守卫（Package Boundary Guard）

子包 tsconfig 的 `rootDir` 对「包内代码 import 包外 `.ts` 源码」的拦截（TS6059 / TS6307）。内部包经 preserveSymlinks 豁免，但守卫对其他包外 import 保持有效。

### 即时反馈（Instant Feedback）

改内部包源码后，IDE / tsc 无需构建即反映类型错误（源码直出 + preserveSymlinks 的产物）。

### 消费端（Published Artifact）

发布包打出的产物。约定：内部包代码不允许出现在消费端——内部工具仅构建期使用（如 `tsdown.config.ts`），禁止从发布包 `src` 导入内部包（否则会被打包进 dist，违反约定）。
