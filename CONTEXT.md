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

`EnvUtil` 的物理设备分类（宽度 + 屏幕英寸启发式）。与断点 token 的纯宽度布局档位是**两套有意并存的语义**：1366×768 笔记本按英寸带（9.79″ ∈ [7,13)）被判为「平板」是**已决策保留**的行为（测试钉死，`envUtil.test.ts:172`）。英寸带 7/10/13 保持字面量（决策：不具名化）。
