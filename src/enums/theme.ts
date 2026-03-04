import type { ValueOf } from "type-fest";

export type THEME_TYPE = ValueOf<typeof THEME_ENUM>;
export const THEME_ENUM = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export type THEME_MODE_TYPE = ValueOf<typeof THEME_MODE_ENUM>;
export const THEME_MODE_ENUM = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;
