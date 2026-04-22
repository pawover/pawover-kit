/**
 * 主题工具类
 */
export class ThemeUtil {
  static readonly THEME = {
    LIGHT: "light",
    DARK: "dark",
  } as const;

  static readonly THEME_MODE = {
    LIGHT: "light",
    DARK: "dark",
    SYSTEM: "system",
  } as const;
}
