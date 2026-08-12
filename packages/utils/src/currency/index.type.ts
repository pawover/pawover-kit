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
