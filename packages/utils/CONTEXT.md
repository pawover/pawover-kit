# @pawover/kit-utils 上下文

本包的领域词汇表，由 `/domain-modeling` 在术语真正落定时惰性维护。工程技能命名领域概念时应使用本表词汇（见根 `CONTEXT-MAP.md` 与 `docs/agents/domain.md`）。

## 词汇

### 国际化（I18n）

#### 完整 Locale（Full Locale）

`I18nUtil.toFullLocale` 的**理想产物形态**：含地区子标签、可直接传给 `Intl` API 的 BCP 47 标签（如 `en-US`、`zh-CN`）。但 `toFullLocale` 在无法规范化时会**回吐原输入或 `fallback`**，此时不保证是合法标签——故「完整 Locale」描述的是目标形态，而非 `toFullLocale` 每次返回值的保证。
_Avoid_: locale 配置对象、裸语言标签（狭义的「语言」）

#### 语言子标签（Language Subtag）

BCP 47 语言标签 `-` 前的部分（ISO 639 语言码，如 `en`、`zh`）。`I18nUtil.toBaseLanguage` 的产物、`PRIMARY_LANGUAGE_ENUM` 的键。
_Avoid_: 基础语言码（口语可用，术语表以语言子标签为准）

#### 地区子标签（Region Subtag）

BCP 47 语言标签 `-` 后的部分（ISO 3166-1 alpha-2 国家/地区代码，如 `US`、`CN`）。`LOCALE_ENUM` 的键，也是完整 Locale 的地区部分。
_Avoid_: 区域（与地理区域混淆）

#### 地区收录语言（Regional Language）

`LOCALE_ENUM` 中每个国家/地区收录的主要语言（如加拿大→英语、比利时→荷兰语）。选择规则：人口最多语言优先；无主导语言的属地/前殖民地默认英语；个别按 CLDR 默认内容语言调整。人工维护的常识判断，非机械规则。
_Avoid_: 主要代表语言（那是 `PRIMARY_LANGUAGE_ENUM` 的映射条目，不是「某国收录的主要语言」这一客观概念本身）

#### 主要代表语言（Primary Language Entry）

`PRIMARY_LANGUAGE_ENUM` 中的条目：语言子标签 → 该语言代表地区的完整 Locale（如 `en` → `"en-US"`）。每个语言恰有一个条目，是 `toFullLocale` 的映射源与类型层单一数据源。
_Avoid_: 地区收录语言（那是「某国收录的主要语言」这一客观概念；本词条指的是 `PRIMARY_LANGUAGE_ENUM` 里的映射条目）

#### 展示名称（Display Name）

`I18nUtil.toLocaleDisplayName` 的产物：由 `Intl.DisplayNames` 提供的本地化名称（如「美国」「英语」「英语（美国）」）。名称数据来自 CLDR 运行时数据，非本库维护的数据表；`LOCALE_ENUM` 注释中的中文名仅为可读性参考，不构成名称数据源。
_Avoid_: 国家名（狭义，仅地区名）、语言名（狭义，仅语言名）

#### 地理区域（Geographic Region）

联合国 M.49 的大洲级分组（美洲 / 亚洲 / 欧洲 / 非洲 / 大洋洲 / 南极洲）。`LOCALE_ENUM` 仅以注释分组展示，非类型承诺。
_Avoid_: 地区、区域
