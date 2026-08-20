# ADR-0002: toFullLocale 仅补全语言子标签，不做大小写重写、未知码透传

`I18nUtil.toFullLocale` 只做一件事：把语言子标签（如 `"en"` / `"EN"`）按 `PRIMARY_LANGUAGE_ENUM` 补全为代表地区的完整 Locale（`"en-US"`），查找对大小写不敏感。

明确不做的：已含 `-` 的输入原样返回（不把 `en-us` 重写为 `en-US`）；未匹配语言（如 `"xx"`）原样返回；`null` / `undefined` / 空白字符串原样返回。需要回退时由调用方显式传 `fallback` 参数。选择透传而非默认回退或抛错，是因为「有损操作必须显式」——方法不猜测调用方意图；类型层 `ToFullLocale` 对未匹配输入保持原字面量，类型与运行时行为一致（测试钉死）。

Status: accepted