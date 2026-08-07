import type { ValueOf } from "type-fest";
import type { CurrencyUtil } from "./currencyUtil";

export type CurrencyCode = keyof typeof CurrencyUtil.CURRENCY_ENUM;
export type CurrencyLocale = ValueOf<typeof CurrencyUtil.CURRENCY_ENUM>;
export interface FormatterOptions {
  locales: [CurrencyLocale, CurrencyLocale];
  currencySign: string;
  currencySignPosition: "start" | "end";
  currencyFormatOptions: Intl.NumberFormatOptions;
}
