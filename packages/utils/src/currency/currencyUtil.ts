import type { MathJsInstance } from "mathjs";
import { MathUtil } from "../math";
import { TypeUtil } from "../type";
import type { FormatterOptions } from "./index.type";

/**
 * 货币工具类
 * - 基于 [`Intl.NumberFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) 进行本地化格式化
 * - 支持精确小数位处理（依赖 `mathjs`）
 */
export class CurrencyUtil {
  /**
   * 货币代码到 Locale 的映射枚举
   * - 键为 ISO 4217 货币代码，值为 BCP 47 语言标签
   * - 用于 `Intl.NumberFormat` 的本地化数字格式化
   * - 格式示例基于 `Intl.NumberFormat` 对 `1,234,567.89` 的输出
   *
   * @example
   * ```ts
   * import { CurrencyUtil } from "@pawover/kit/utils";
   * // 获取人民币的格式化 locale
   * const locale = CurrencyUtil.CURRENCY_ENUM.CNY; // "zh-CN"
   *
   * // 结合 Intl.NumberFormat 使用
   * new Intl.NumberFormat(CurrencyUtil.CURRENCY_ENUM.USD, {
   *   style: "currency",
   *   currency: "USD",
   * }).format(1234.56); // "$1,234.56"
   * ```
   */
  static readonly CURRENCY_ENUM = {
    // ========== 美洲（Americas） ==========
    /** 美元（美国及美元化国家，Locale: 美式英语） → 1,234,567.89 */
    USD: "en-US",
    /** 加拿大元（加拿大，Locale: 加拿大英语） → 1,234,567.89 */
    CAD: "en-CA",
    /** 墨西哥比索（墨西哥，Locale: 墨西哥西班牙语） → 1,234,567.89 */
    MXN: "es-MX",
    /** 巴西雷亚尔（巴西，Locale: 巴西葡萄牙语） → 1.234.567,89 */
    BRL: "pt-BR",
    /** 阿根廷比索（阿根廷，Locale: 阿根廷西班牙语） → 1.234.567,89 */
    ARS: "es-AR",
    /** 智利比索（智利，Locale: 智利西班牙语） → 1.234.567,89 */
    CLP: "es-CL",
    /** 秘鲁新索尔（秘鲁，Locale: 秘鲁西班牙语） → 1,234,567.89 */
    PEN: "es-PE",
    /** 哥伦比亚比索（哥伦比亚，Locale: 哥伦比亚西班牙语） → 1.234.567,89 */
    COP: "es-CO",
    /** 哥斯达黎加科朗（哥斯达黎加，Locale: 哥斯达黎加西班牙语） → 1 234 567,89（空格千分位） */
    CRC: "es-CR",

    // ========== 亚洲（Asia） ==========
    /** 人民币（中国，Locale: 简体中文） → 1,234,567.89 */
    CNY: "zh-CN",
    /** 港元（中国香港，Locale: 繁体中文+香港） → 1,234,567.89 */
    HKD: "zh-HK",
    /** 澳门元（中国澳门，Locale: 繁体中文+澳门） → 1,234,567.89 */
    MOP: "zh-MO",
    /** 日元（日本，Locale: 日语） → 1,234,567.89 */
    JPY: "ja-JP",
    /** 韩元（韩国，Locale: 韩语） → 1,234,567.89 */
    KRW: "ko-KR",
    /** 新加坡元（新加坡，Locale: 英语+新加坡） → 1,234,567.89 */
    SGD: "en-SG",
    /** 泰铢（泰国，Locale: 泰语） → 1,234,567.89 */
    THB: "th-TH",
    /** 印度卢比（印度，Locale: 英语+印度） → 12,34,567.89（2,2,3 分组） */
    INR: "en-IN",
    /** 沙特里亚尔（沙特，Locale: 阿拉伯语+沙特） → ١٬٢٣٤٬٥٦٧٫٨٩（阿拉伯数字） */
    SAR: "ar-SA",
    /** 阿联酋迪拉姆（阿联酋，Locale: 阿拉伯语+阿联酋） → 1,234,567.89 */
    AED: "ar-AE",
    /** 印尼盾（印尼，Locale: 印尼语） → 1.234.567,89 */
    IDR: "id-ID",
    /** 马来西亚林吉特（马来西亚，Locale: 马来语） → 1,234,567.89 */
    MYR: "ms-MY",
    /** 越南盾（越南，Locale: 越南语） → 1.234.567,89 */
    VND: "vi-VN",
    /** 菲律宾比索（菲律宾，Locale: 英语+菲律宾） → 1,234,567.89 */
    PHP: "en-PH",
    /** 巴基斯坦卢比（巴基斯坦，Locale: 英语+巴基斯坦） → 1,234,567.89 */
    PKR: "en-PK",
    /** 新台币（中国台湾地区，Locale: 繁体中文+台湾） → 1,234,567.89 */
    TWD: "zh-TW",

    // ========== 欧洲（Europe） ==========
    /** 欧元（德国，Locale: 德语+德国，代表欧元区） → 1.234.567,89 */
    EUR: "de-DE",
    /** 英镑（英国，Locale: 英式英语） → 1,234,567.89 */
    GBP: "en-GB",
    /** 瑞士法郎（瑞士，Locale: 德语+瑞士） → 1'234'567.89 */
    CHF: "de-CH",
    /** 瑞典克朗（瑞典，Locale: 瑞典语） → 1 234 567,89（空格千分位） */
    SEK: "sv-SE",
    /** 挪威克朗（挪威，Locale: 挪威语） → 1 234 567,89（空格千分位） */
    NOK: "no-NO",
    /** 丹麦克朗（丹麦，Locale: 丹麦语） → 1.234.567,89 */
    DKK: "da-DK",
    /** 波兰兹罗提（波兰，Locale: 波兰语） → 1 234 567,89（空格千分位） */
    PLN: "pl-PL",
    /** 捷克克朗（捷克，Locale: 捷克语） → 1 234 567,89（空格千分位） */
    CZK: "cs-CZ",
    /** 匈牙利福林（匈牙利，Locale: 匈牙利语） → 1 234 567,89（空格千分位） */
    HUF: "hu-HU",
    /** 俄罗斯卢布（俄罗斯，Locale: 俄语） → 1 234 567,89（空格千分位） */
    RUB: "ru-RU",
    /** 罗马尼亚列伊（罗马尼亚，Locale: 罗马尼亚语） → 1.234.567,89 */
    RON: "ro-RO",
    /** 乌克兰格里夫纳（乌克兰，Locale: 乌克兰语） → 1 234 567,89（空格千分位） */
    UAH: "uk-UA",

    // ========== 大洋洲（Oceania） ==========
    /** 澳大利亚元（澳大利亚，Locale: 澳大利亚英语） → 1,234,567.89 */
    AUD: "en-AU",
    /** 新西兰元（新西兰，Locale: 新西兰英语） → 1,234,567.89 */
    NZD: "en-NZ",

    // ========== 中东/非洲（Middle East & Africa） ==========
    /** 南非兰特（南非，Locale: 英语+南非） → 1 234 567,89（空格千分位） */
    ZAR: "en-ZA",
    /** 埃及镑（埃及，Locale: 阿拉伯语+埃及） → ١٬٢٣٤٬٥٦٧٫٨٩（阿拉伯数字） */
    EGP: "ar-EG",
    /** 土耳其里拉（土耳其，Locale: 土耳其语） → 1.234.567,89 */
    TRY: "tr-TR",
    /** 以色列新谢克尔（以色列，Locale: 希伯来语） → 1,234,567.89 */
    ILS: "he-IL",
    /** 摩洛哥迪拉姆（摩洛哥，Locale: 阿拉伯语+摩洛哥） → 1.234.567,89 */
    MAD: "ar-MA",
    /** 科威特第纳尔（科威特，Locale: 阿拉伯语+科威特） → ١٬٢٣٤٬٥٦٧٫٨٩（阿拉伯数字） */
    KWD: "ar-KW",
    /** 卡塔尔里亚尔（卡塔尔，Locale: 阿拉伯语+卡塔尔） → ١٬٢٣٤٬٥٦٧٫٨٩（阿拉伯数字） */
    QAR: "ar-QA",
    /** 尼日利亚奈拉（尼日利亚，Locale: 英语+尼日利亚） → 1,234,567.89 */
    NGN: "en-NG",

    // ========== 特殊地区（Non-Sovereign） ==========
    /** 太平洋法郎（法属波利尼西亚，Locale: 法语+太平洋） → 1[U+202F]234[U+202F]567,89（窄空格千分位） */
    XPF: "fr-PF",
  } as const;

  /**
   * 货币格式化
   * - 使用 `Intl.NumberFormat` 进行本地化数字格式化
   * - 支持自定义货币符号及位置（前缀/后缀/首/尾）
   * - 当值为 `null` 或 `undefined` 时返回 `null`
   *
   * @param value 待格式化的数值
   * @param options 格式化选项
   * @param options.locales locale 元组，同时指定格式化语言和货币所属地区
   * @param options.currencySign 货币符号（如 `¥`、`$`、`€`）
   * @param options.currencySignPosition 货币符号位置
   * @param options.currencyFormatOptions `Intl.NumberFormatOptions` 格式化选项
   * @returns 格式化后的货币字符串，无效输入返回 `null`
   *
   * @example
   * ```ts
   * import { CurrencyUtil } from "@pawover/kit/utils";
   *
   * // 重载 1: 有效数值
   * CurrencyUtil.currencyFormatter(1234.56, {
   *   locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
   *   currencySign: "¥",
   *   currencySignPosition: "prefix",
   *   currencyFormatOptions: { style: "currency", currency: "CNY" },
   * }); // "¥ 1,234.56"
   *
   * // 重载 2: null / undefined
   * CurrencyUtil.currencyFormatter(null, options); // null
   * CurrencyUtil.currencyFormatter(undefined, options); // null
   * ```
   */
  static currencyFormatter (value: string | number, options: FormatterOptions): string;
  static currencyFormatter (value: string | number | null | undefined, options: FormatterOptions): string | null;
  static currencyFormatter (value: string | number | null | undefined, options: FormatterOptions) {
    if (TypeUtil.isNull(value) || TypeUtil.isUndefined(value)) {
      return null;
    }

    const { currencySign, currencySignPosition, locales, currencyFormatOptions } = options;
    const numberValue = Number(value);
    let formatedValue = numberValue.toLocaleString(locales, currencyFormatOptions).replace(currencySign, "").trim();

    if (currencySignPosition === "start") {
      formatedValue = `${currencySign} ${formatedValue}`;
    }
    if (currencySignPosition === "end") {
      formatedValue = `${formatedValue} ${currencySign}`;
    }

    return formatedValue;
  }

  /**
   * 将任意数值转换为精确的十进制值
   * - 基于 `mathjs` 的 `bignumber` 处理，避免浮点数精度问题
   * - 当值为 `null` 或 `undefined` 时返回 `null`
   *
   * @param mathJsInstance `mathjs` 实例
   * @param value 待转换的数值
   * @param precision 小数精度位数
   * @param stringMode 是否返回字符串类型，默认 `true`
   * @returns 精确的十进制值，无效输入返回 `null`
   *
   * @example
   * ```ts
   * import { create, all } from "mathjs";
   * import { CurrencyUtil } from "@pawover/kit/utils";
   *
   * const math = create(all);
   *
   * // 重载 1: 有效值 + stringMode = true（默认）
   * CurrencyUtil.toRealValue(math, "0.1"); // "0.1"
   * CurrencyUtil.toRealValue(math, 0.1 + 0.2, 2); // "0.30"
   *
   * // 重载 2: stringMode = false → number
   * CurrencyUtil.toRealValue(math, "0.1", undefined, false); // 0.1
   *
   * // 重载 3: null / undefined
   * CurrencyUtil.toRealValue(math, null); // null
   * ```
   */
  static toRealValue (mathJsInstance: MathJsInstance, value: string | number, precision?: number | undefined, stringMode?: boolean | undefined): string | number;
  static toRealValue (mathJsInstance: MathJsInstance, value: string | number | null | undefined, precision?: number | undefined, stringMode?: boolean | undefined): string | number | null;
  static toRealValue (mathJsInstance: MathJsInstance, value: string | number | null | undefined, precision?: number | undefined, stringMode?: boolean | undefined): string | number | null {
    if (TypeUtil.isNull(value) || TypeUtil.isUndefined(value)) {
      return null;
    }

    const precisionValue = MathUtil.toDecimal(mathJsInstance, value, precision);

    return stringMode ? precisionValue : Number(precisionValue);
  }
}
