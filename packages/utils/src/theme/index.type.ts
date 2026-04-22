import type { ValueOf } from "type-fest";

import type { ThemeUtil } from "./themeUtil";

export type THEME_TYPE = ValueOf<typeof ThemeUtil.THEME>;
export type THEME_MODE_TYPE = ValueOf<typeof ThemeUtil.THEME_MODE>;
