# @pawover/kit-utils

## 1.2.0-alpha.2

### Minor Changes

- 3c8581f: 新增 `NumberUtil.clamp` 与 `ArrayUtil.uniqueBy`；`NumberUtil.clamp` 与 `within` 采用一致的入参校验：`value` / `input` 必须为有限数，`interval` 必须为两个有限数字组成的二元组（`NaN` 与 `±Infinity` 抛错）。`TreeUtil.find` / `TreeUtil.forEach` 支持 `prune` 剪枝选项（返回 `true` 时不再下探该节点子树，需为纯函数，求值时机随 `strategy` 不同）；`TreeUtil.rowsToTree` 新增 `orphan` 选项，默认 `"promote"` 保持缺失父节点提升为根，可选 `"drop"` 丢弃缺失父节点的节点及其子树（两种模式都不输出父链成环的行）；`TreeUtil.treeToRows` 的 options 不含 `prune`，运行期传入也会被忽略。

## 1.1.1-alpha.1

### Patch Changes

- 069e4b9: 修复 `CurrencyUtil.toRealValue` 对科学计数法数值的有损转换（`1e-7` 不再变成 `17`），`toBignumber` 对数字与纯数值字符串直接走 `bignumber`，脏文本仍保留抽数能力；同时为 `CurrencyUtil.percentFormat` / `CurrencyUtil.percentText` 增加 `useGrouping` 选项以支持关闭千分位。

## 1.1.1-alpha.0

### Patch Changes

- 2ef9715: 同步稳定版版本基线后重新发布金额、百分比与容量格式化能力。

## 1.1.0-alpha.1

### Minor Changes

- d442165: 新增 `CurrencyUtil.numberFormat` / `CurrencyUtil.moneyFormat` / `CurrencyUtil.resolveSymbol` / `CurrencyUtil.integerFormat` / `CurrencyUtil.percentFormat` / `CurrencyUtil.percentText` 六个静态方法，以及 `MathUtil.toPercent` / `MathUtil.fromPercent` 两个换算方法。格式化方法支持 `locale`（默认 `"en-US"`）与可配置 `emptyText`（默认 `""`），`null` / `undefined` / `NaN` / `±Infinity` 返回占位文本；小数位入参超出 `0`–`20` 时收敛，不再透传给 `Intl` 抛错；负零按 `0` 输出。`percentFormat` 基于 `Intl` 百分数格式，`integerFormat` 先按 `Math.round` 取整。紧凑数字与去尾零统一用 `numberFormat` 的 `minimumFractionDigits: 0` + `maximumFractionDigits: 2` 表达，去尾零不分组时再加 `useGrouping: false`。`moneyFormat` 新增 `signDisplay` 与 `minusSign`，带符号差额用 `signDisplay: "always"` + `minusSign: "−"` + `signPlacement: "beforeSymbol"` + `spacing: "none"` 表达；`percentText` 接收百分数并默认输出正号。`resolveSymbol` 支持可选 `locale` 参数，按调用方给定的地区取符号（如 `resolveSymbol("LKR", "si-LK")`），省略时保持原有默认行为。`toPercent` / `fromPercent` 按固定精度完成百分数与小数互转，精度收敛到 `0`–`20`，空值返回 `null`。新增 `TypeUtil.isFiniteNumber` 守卫，排除 `null` / `undefined` / `NaN` / `±Infinity`。

## 1.1.0-alpha.0

### Minor Changes

- 06aff01: 新增随 npm 包发布的 TanStack Intent Agent Skills：每个发布包在包内提供 `skills/<name>/SKILL.md`（types / utils / eslint-preset 含 references），提供类型、工具类、React 与 Alova Hooks、ESLint flat config 预设和 Zod schema 的使用指引；各包 `files` 与 `tanstack-intent` keyword 已同步，skill 会随对应包版本一起发布。根包（`@pawover/kit`）不在 workspace 包列表中，仍由发布脚本在子包发版后同步递增。

### Patch Changes

- Updated dependencies [06aff01]
  - @pawover/kit-types@0.2.0-alpha.0

## 1.0.1-alpha.1

### Patch Changes

- Updated dependencies [6f485dc]
  - @pawover/kit-types@0.1.0-alpha.0

## 1.0.1-alpha.0

### Patch Changes

- a8bac64: `TreeUtil.treeToRows` 内部遍历回调改为块体写法（修正 `ts/strict-void-return` 告警，行为不变）。

## 1.0.0-alpha.0

### Major Changes

- 21302d3: breaking: 主题枚举配对类型按新命名规范重命名

  - `THEME_TYPE` → `ThemeEnumValue`（`ValueOf<typeof ThemeUtil.THEME>`）
  - `THEME_MODE_TYPE` → `ThemeModeEnumValue`（`ValueOf<typeof ThemeUtil.THEME_MODE>`）

  枚举常量 `ThemeUtil.THEME` / `ThemeUtil.THEME_MODE` 为对外 API，名称保持不变。

### Minor Changes

- fa67d73: feat: 新增 `I18nUtil` 国际化工具类

  - `I18nUtil.LOCALE_ENUM`：全部国家/地区完整 Locale 枚举（BCP 47，ISO 3166-1 alpha-2 代码为键共 248 项，按联合国 M.49 地理区域分组）
  - `I18nUtil.PRIMARY_LANGUAGE_ENUM`：代表语言条目枚举（74 个语言子标签 → 代表地区的完整 Locale，如 `en` → `"en-US"`、`ti` → `"ti-ER"`），`toFullLocale` 的规范化映射源
  - 类型 `CountryCode`：`I18nUtil.LOCALE_ENUM` 键的字面量联合（248 个国家/地区代码）
  - `I18nUtil.toFullLocale(locale, fallback?)`：将语言子标签补全为完整 Locale（如 `"en"` / `"EN"` → `"en-US"`），已含地区子标签的输入原样返回，未匹配或非法输入支持 `fallback` 回退（缺省时原样返回），字面量类型随输入推断
  - `I18nUtil.toBaseLanguage(locale, fallback?)`：提取语言子标签（如 `"en-US"` → `"en"`），非法输入支持 `fallback` 回退（缺省时原样返回），字面量类型随输入推断
  - `I18nUtil.toLocaleDisplayName(input, options?)`：获取本地化展示名称（基于 `Intl.DisplayNames` / CLDR，如 `"US"` → `"美国"`、`"en"` → `"英语"`、`"en-US"` → 含语言与地区的名称），名称类型按输入形态推断（2 字母大写 → 地区名，其余 → 语言名），展示语言缺省跟随运行环境，未匹配或非法输入支持 `fallback` 回退（缺省时原样返回）
  - `StringUtil.split(input, separator)`：字符串分割，基于 type-fest `Split` 推导字面量元组（如 `split("en-US", "-")` 类型为 `["en", "US"]`），宽类型输入退化为 `string[]`，无效输入返回 `[]`

## 0.1.6-alpha.0

### Patch Changes

- d408123: main 发布后自动回推版本基线到 feature
- Updated dependencies [d408123]
  - @pawover/kit-types@0.0.4-alpha.0

## 0.1.5-alpha.1

### Patch Changes

- a8f0805: fix: exports 移除指向未打包 src 的 development 条件与失效的 ./metadata.json 导出，修复 vite/vitest 消费者解析失败
- Updated dependencies [a8f0805]
  - @pawover/kit-types@0.0.3-alpha.1

## 0.1.5-alpha.0

### Patch Changes

- d408123: 第三轮发布流程测试
- Updated dependencies [d408123]
  - @pawover/kit-types@0.0.3-alpha.0

## 0.1.4-alpha.0

### Patch Changes

- 55bf39a: 最终演练（第二轮）：五子包全链路发布测试
- Updated dependencies [55bf39a]
  - @pawover/kit-types@0.0.2-alpha.0

## 0.1.3-alpha.0

### Patch Changes

- 37d3c03: 最终演练：五子包全链路发布测试
- Updated dependencies [37d3c03]
  - @pawover/kit-types@0.0.1-alpha.0

## 0.1.2

### Patch Changes

- d59964a: 演练 changeset：dispatch 完整闭环验证

## 0.1.1-alpha.3

### Patch Changes

- 67ccb15: 演练 changeset：workflow_dispatch 发布触发测试

## 0.1.1-alpha.2

### Patch Changes

- 67ccb15: 演练 changeset：二次闭环 + PR closed 触发测试

## 0.1.1-alpha.1

### Patch Changes

- 67ccb15: 演练 changeset：alpha 全链路测试

## 0.1.1-alpha.0

### Patch Changes

- 31631a2: chore: 双通道发布模型端到端演练（验证 alpha 发布 → 发布合并 → latest 全链）

## 0.1.0

### Minor Changes

- 05e9960: feat(utils): EnvUtil 新增 BREAK_POINT 断点阈值常量表，isDesktop/isMobile/isTablet 默认参数改为引用（768/1200 单源）

## 0.1.0-alpha.0

### Minor Changes

- feat(utils): EnvUtil 新增 BREAK_POINT 断点阈值常量表，isDesktop/isMobile/isTablet 默认参数改为引用（768/1200 单源）

## 0.0.0

### Minor Changes

- 正式发布 0.1.0：退出 alpha 预发布模式，首个正式版本

### Patch Changes

- c2acb2b: 预发布 0.0.0-alpha.5（恢复 alpha pre 模式，验证 CI 发布流程；根包经 bump-root.mjs 同步发布）
- c2acb2b: 统一切入 alpha 发布通道，建立 5 个子包的 alpha 基线版本
- Updated dependencies
- Updated dependencies [c2acb2b]
- Updated dependencies [c2acb2b]
  - @pawover/kit-types@0.0.0

## 0.0.0-alpha.5

### Patch Changes

- c2acb2b: 预发布 0.0.0-alpha.5（恢复 alpha pre 模式，验证 CI 发布流程；根包经 bump-root.mjs 同步发布）
- Updated dependencies [c2acb2b]
  - @pawover/kit-types@0.0.0-alpha.5

## 0.0.0-alpha.4

### Patch Changes

- c2acb2b: 统一切入 alpha 发布通道，建立 5 个子包的 alpha 基线版本
- Updated dependencies [c2acb2b]
  - @pawover/kit-types@0.0.0-alpha.4
