import type { ValueOf } from "type-fest";
import type { CurrencyUtil } from "./currencyUtil";

export type CurrencyCode = keyof typeof CurrencyUtil.CURRENCY_ENUM;
export type CurrencyLocale = ValueOf<typeof CurrencyUtil.CURRENCY_ENUM>;

/**
 * 货币格式化选项
 * - 由货币地区和 `Intl.NumberFormat` 选项组合而成
 * - 用于 `CurrencyUtil.currencyFormatter` 的格式化配置
 *
 * @example
 * ```ts
 * import { CurrencyUtil } from "@pawover/kit/utils";
 * import type { FormatterOptions } from "@pawover/kit/utils";
 *
 * const options: FormatterOptions = {
 *   locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
 *   currencySign: "¥",
 *   currencySignPosition: "start",
 *   currencyFormatOptions: { style: "currency", currency: "CNY" },
 * };
 *
 * // 传入 null 时输出纯数字（无符号）
 * const plain: FormatterOptions = {
 *   locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
 *   currencySign: null,
 *   currencySignPosition: "start",
 *   currencyFormatOptions: { style: "currency", currency: "CNY" },
 * };
 *
 * // 省略或传入 undefined 时保留 Intl 原生符号
 * const native: FormatterOptions = {
 *   locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
 *   currencyFormatOptions: { style: "currency", currency: "CNY" },
 * };
 * ```
 */
export interface FormatterOptions {
  /** locale 元组，第一个为货币所属地区，第二个为格式化语言，`Intl.NumberFormat` 按序尝试，前者不可用时回退后者 */
  locales: [CurrencyLocale, CurrencyLocale];
  /**
   * 货币符号，支持三态：
   * - 非空字符串：自定义符号（如 `¥`、`$`、`€`），从格式化结果中剥离后按 `currencySignPosition` 重新拼接
   * - `null`：输出纯数字，不显示任何符号
   * - `undefined` 或省略：保留 `Intl.NumberFormat` 原生符号，并按 `currencySignPosition` 对齐位置
   *
   * 运行时对空字符串及非字符串值（如数字、布尔、对象）不校验即忽略并回退为原生符号行为。
   */
  currencySign?: string | null | undefined;
  /** 货币符号的位置：`"end"` 置于金额后，其余非 `"end"` 值（含非法值）运行时统一视为 `"start"` */
  currencySignPosition: "start" | "end";
  /** `Intl.NumberFormat` 格式化选项（如 `style`、`currency`、`minimumFractionDigits` 等） */
  currencyFormatOptions: Intl.NumberFormatOptions;
}

/**
 * `CurrencyUtil.numberFormat` 的格式化选项
 */
export interface NumberFormatOptions {
  /** 数字分组与小数位的 locale，默认 `"en-US"` */
  locale?: Intl.LocalesArgument;
  /** 最小小数位数，默认 `2`；超过 `maximumFractionDigits` 时按后者收敛，负数取 `0`，`NaN` 回退默认值 */
  minimumFractionDigits?: number;
  /** 最大小数位数，默认 `2`；负数取 `0`，超过 `20` 取 `20`，`NaN` 回退默认值 */
  maximumFractionDigits?: number;
  /** 是否使用千分位分组，默认 `true` */
  useGrouping?: boolean;
  /** 空值占位文本，默认 `""` */
  emptyText?: string;
}

/**
 * `CurrencyUtil.moneyFormat` 的格式化选项
 */
export interface MoneyFormatOptions {
  /** 数字分组与小数位的 locale，默认 `"en-US"`；货币符号仍由 `currency` 决定 */
  locale?: Intl.LocalesArgument;
  /** ISO 4217 货币代码，大小写不敏感，默认 `"USD"` */
  currency?: string;
  /** 货币符号；省略时由 `resolveSymbol` 从 `currency` 推导，未知代码回退为代码本身；空字符串输出纯数字 */
  symbol?: string;
  /** 符号与金额的间距，默认 `"space"` */
  spacing?: "none" | "space";
  /** 符号位置，默认 `"afterSymbol"`（`"$ -1,234.50"`），`"beforeSymbol"` 产出 `"-$ 1,234.50"` */
  signPlacement?: "beforeSymbol" | "afterSymbol";
  /** 正负号显示策略，默认 `"auto"`：`"always"` 正数与 `0` 带 `+`，`"exceptZero"` 仅正数带 `+` */
  signDisplay?: "auto" | "always" | "exceptZero";
  /** 负号字符，默认使用 locale 原生负号 */
  minusSign?: "-" | "−";
  /** 小数位数，默认 `2`；负数取 `0`，超过 `20` 取 `20`，`NaN` 回退默认值 */
  fractionDigits?: number;
  /** 空值占位文本，默认 `""` */
  emptyText?: string;
}

/**
 * `CurrencyUtil.integerFormat` 的格式化选项
 */
export interface IntegerFormatOptions {
  /** 数字分组与小数位的 locale，默认 `"en-US"` */
  locale?: Intl.LocalesArgument;
  /** 是否使用千分位分组，默认 `true` */
  useGrouping?: boolean;
  /** 空值占位文本，默认 `""` */
  emptyText?: string;
}

/**
 * `CurrencyUtil.percentFormat` 的格式化选项
 */
export interface PercentFormatOptions {
  /** 数字格式的 locale，默认 `"en-US"` */
  locale?: Intl.LocalesArgument;
  /** 百分数小数位数，默认 `1`；负数取 `0`，超过 `20` 取 `20`，`NaN` 回退默认值 */
  fractionDigits?: number;
  /** 是否输出正负号，默认 `false`；`true` 时按 locale 的正负号输出（含 `0`） */
  showSign?: boolean;
  /** 是否使用千分位分组，默认 `true` */
  useGrouping?: boolean;
  /** 空值占位文本，默认 `""` */
  emptyText?: string;
}

/**
 * `CurrencyUtil.percentText` 的格式化选项
 */
export interface PercentTextOptions {
  /** 数字格式的 locale，默认 `"en-US"` */
  locale?: Intl.LocalesArgument;
  /** 百分数小数位数，默认 `1`；负数取 `0`，超过 `20` 取 `20`，`NaN` 回退默认值 */
  fractionDigits?: number;
  /** 是否给正数加 `+`，默认 `true` */
  showSign?: boolean;
  /** 是否给 `0` 加 `+`，默认 `false` */
  zeroSign?: boolean;
  /** 是否使用千分位分组，默认 `true` */
  useGrouping?: boolean;
  /** 空值占位文本，默认 `""` */
  emptyText?: string;
}
