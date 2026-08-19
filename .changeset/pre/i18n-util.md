---
"@pawover/kit-utils": minor
---

feat: 新增 `I18nUtil` 国际化工具类

- `I18nUtil.LOCALE_ENUM`：全部国家/地区完整 Locale 枚举（BCP 47，ISO 3166-1 alpha-2 代码为键共 248 项，按联合国 M.49 地理区域分组）
- `I18nUtil.PRIMARY_LANGUAGE_ENUM`：代表语言条目枚举（74 个语言子标签 → 代表地区的完整 Locale，如 `en` → `"en-US"`、`ti` → `"ti-ER"`），`toFullLocale` 的规范化映射源
- 类型 `CountryCode`：`I18nUtil.LOCALE_ENUM` 键的字面量联合（248 个国家/地区代码）
- `I18nUtil.toFullLocale(locale, fallback?)`：将语言子标签补全为完整 Locale（如 `"en"` / `"EN"` → `"en-US"`），已含地区子标签的输入原样返回，未匹配或非法输入支持 `fallback` 回退（缺省时原样返回），字面量类型随输入推断
- `I18nUtil.toBaseLanguage(locale, fallback?)`：提取语言子标签（如 `"en-US"` → `"en"`），非法输入支持 `fallback` 回退（缺省时原样返回），字面量类型随输入推断
- `I18nUtil.toLocaleDisplayName(input, options?)`：获取本地化展示名称（基于 `Intl.DisplayNames` / CLDR，如 `"US"` → `"美国"`、`"en"` → `"英语"`、`"en-US"` → 含语言与地区的名称），名称类型按输入形态推断（2 字母大写 → 地区名，其余 → 语言名），展示语言缺省跟随运行环境，未匹配或非法输入支持 `fallback` 回退（缺省时原样返回）
- `StringUtil.split(input, separator)`：字符串分割，基于 type-fest `Split` 推导字面量元组（如 `split("en-US", "-")` 类型为 `["en", "US"]`），宽类型输入退化为 `string[]`，无效输入返回 `[]`
