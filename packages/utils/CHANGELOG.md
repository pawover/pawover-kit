# @pawover/kit-utils

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
