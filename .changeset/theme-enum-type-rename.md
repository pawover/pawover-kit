---
"@pawover/kit-utils": major
---

breaking: 主题枚举配对类型按新命名规范重命名

- `THEME_TYPE` → `ThemeEnumValue`（`ValueOf<typeof ThemeUtil.THEME>`）
- `THEME_MODE_TYPE` → `ThemeModeEnumValue`（`ValueOf<typeof ThemeUtil.THEME_MODE>`）

枚举常量 `ThemeUtil.THEME` / `ThemeUtil.THEME_MODE` 为对外 API，名称保持不变。