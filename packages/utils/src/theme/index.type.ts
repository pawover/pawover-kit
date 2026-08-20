import type { ValueOf } from "type-fest";
import type { ThemeUtil } from "./themeUtil";

/**
 * 固定主题类型（仅亮色/暗色），对应 `ThemeUtil.THEME`
 *
 * @example
 * ```ts
 * const theme: ThemeEnumValue = ThemeUtil.THEME.DARK;
 * ```
 */
export type ThemeEnumValue = ValueOf<typeof ThemeUtil.THEME>;

/**
 * 主题模式类型（支持跟随系统），对应 `ThemeUtil.THEME_MODE`
 *
 * @example
 * ```ts
 * const themeMode: ThemeModeEnumValue = ThemeUtil.THEME_MODE.SYSTEM;
 * ```
 */
export type ThemeModeEnumValue = ValueOf<typeof ThemeUtil.THEME_MODE>;
