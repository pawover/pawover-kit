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

### 国际化（I18n）

#### 完整 Locale（Full Locale）

含地区子标签的 BCP 47 语言标签（如 `en-US`、`zh-CN`）。本库约定：这是可直接传给 `Intl` API 的标签形态，`I18nUtil.toFullLocale` 的规范化产物。
_Avoid_: locale 配置对象、裸语言标签（狭义的「语言」）

#### 语言子标签（Language Subtag）

BCP 47 语言标签 `-` 前的部分（ISO 639 语言码，如 `en`、`zh`）。`I18nUtil.toBaseLanguage` 的产物、`PRIMARY_LANGUAGE_ENUM` 的键。
_Avoid_: 基础语言码（口语可用，术语表以语言子标签为准）

#### 地区子标签（Region Subtag）

BCP 47 语言标签 `-` 后的部分（ISO 3166-1 alpha-2 国家/地区代码，如 `US`、`CN`）。`LOCALE_ENUM` 的键，也是完整 Locale 的地区部分。
_Avoid_: 区域（与地理区域混淆）

#### 代表语言（Representative Language）

`LOCALE_ENUM` 中每个国家/地区收录的主要语言（如加拿大→英语、比利时→荷兰语）。选择规则：人口最多语言优先；无主导语言的属地/前殖民地默认英语；个别按 CLDR 默认内容语言调整。人工维护的常识判断，非机械规则。

#### 代表语言条目（Primary Language Entry）

`PRIMARY_LANGUAGE_ENUM` 中的条目：语言子标签 → 该语言代表地区的完整 Locale（如 `en` → `"en-US"`）。每个语言恰有一个条目，是 `toFullLocale` 的映射源与类型层单一数据源。

#### 展示名称（Display Name）

`I18nUtil.toLocaleDisplayName` 的产物：由 `Intl.DisplayNames` 提供的本地化名称（如「美国」「英语」「英语（美国）」）。名称数据来自 CLDR 运行时数据，非本库维护的数据表；`LOCALE_ENUM` 注释中的中文名仅为可读性参考，不构成名称数据源。
_Avoid_: 国家名（狭义，仅地区名）、语言名（狭义，仅语言名）

#### 地理区域（Geographic Region）

联合国 M.49 的大洲级分组（美洲 / 亚洲 / 欧洲 / 非洲 / 大洋洲 / 南极洲）。`LOCALE_ENUM` 仅以注释分组展示，非类型承诺。
_Avoid_: 地区、区域
