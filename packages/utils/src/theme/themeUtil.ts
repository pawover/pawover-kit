/**
 * 主题工具类
 */
export class ThemeUtil {
  /**
   * 固定主题类型（仅亮色/暗色）
   *
   * @example
   * ```ts
   * ThemeUtil.THEME.LIGHT; // "light"
   * ThemeUtil.THEME.DARK; // "dark"
   * ```
   */
  static readonly THEME = {
    LIGHT: "light",
    DARK: "dark",
  } as const;

  /**
   * 主题模式（支持跟随系统）
   *
   * @example
   * ```ts
   * ThemeUtil.THEME_MODE.SYSTEM; // "system"
   * ThemeUtil.THEME_MODE.DARK; // "dark"
   * ```
   */
  static readonly THEME_MODE = {
    LIGHT: "light",
    DARK: "dark",
    SYSTEM: "system",
  } as const;
}
