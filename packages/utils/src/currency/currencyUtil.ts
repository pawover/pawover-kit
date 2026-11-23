import type { MathJsInstance } from "mathjs";
import { MathUtil } from "../math";
import { TypeUtil } from "../type";
import type { CurrencyCode, FormatterOptions, IntegerFormatOptions, MoneyFormatOptions, NumberFormatOptions, PercentFormatOptions, PercentTextOptions } from "./index.type";

/** `toRealValue` 返回值映射：可空 `value` 的返回追加 `| null`（内部类型，不导出） */
type ToRealValueResult<T extends string | number | null | undefined, R> = T extends string | number ? R : R | null;

/** Bidi 控制字符正则：`Intl.NumberFormat` 在 RTL locale（如 `ar-SA`、`he-IL`）下会注入不可见的 U+061C、U+200E/U+200F、U+202A–U+202E、U+2066–U+2069 标记 */
const BIDI_CONTROL_CHARS_REGEX = /[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/g;

const DEFAULT_LOCALE = "en-US";

/** U+2212 为部分 locale（如 `sv-SE`、`fi-FI`）的负号 */
const MINUS_SIGNS = ["-", "\u2212"];

/** `Intl.NumberFormat` 允许的小数位上限；与 `mathUtil.ts` 的 `MAX_PRECISION` 同值，改动需同步 */
const MAX_FRACTION_DIGITS = 20;

/** `Intl.supportedValuesOf` 缺失的运行时（旧浏览器）按 `CURRENCY_ENUM` 收窄已知代码，避免模块加载期抛错 */
let knownCurrencyCodes: ReadonlySet<string> | undefined;

function getKnownCurrencyCodes (): ReadonlySet<string> {
  knownCurrencyCodes ??= new Set(
    typeof Intl.supportedValuesOf === "function"
      ? Intl.supportedValuesOf("currency")
      : Object.keys(CurrencyUtil.CURRENCY_ENUM),
  );

  return knownCurrencyCodes;
}

function isCurrencyCode (value: string): value is CurrencyCode {
  return Object.hasOwn(CurrencyUtil.CURRENCY_ENUM, value);
}

function normalizeFractionDigits (value: number | undefined, fallback: number): number {
  if (value === undefined || Number.isNaN(value)) {
    return fallback;
  }

  return Math.min(Math.max(Math.trunc(value), 0), MAX_FRACTION_DIGITS);
}

function splitMinusSign (numberText: string): { minusSign: string; unsignedText: string } {
  const head = numberText.charAt(0);

  if (MINUS_SIGNS.includes(head)) {
    return {
      minusSign: head,
      unsignedText: numberText.slice(1),
    };
  }

  const tail = numberText.charAt(numberText.length - 1);

  if (MINUS_SIGNS.includes(tail)) {
    return {
      minusSign: tail,
      unsignedText: numberText.slice(0, -1),
    };
  }

  return { minusSign: "", unsignedText: numberText };
}

function formatNumber (locale: Intl.LocalesArgument, options: Intl.NumberFormatOptions, value: number): string {
  const normalizedValue = Object.is(value, -0)
    ? 0
    : value;

  return new Intl.NumberFormat(locale, options).format(normalizedValue).replace(BIDI_CONTROL_CHARS_REGEX, "");
}

/**
 * 货币工具类
 * - 基于 [`Intl.NumberFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) 进行本地化格式化
 * - 支持精确小数位处理（依赖 `mathjs`）
 * - `numberFormat` / `moneyFormat` / `percentFormat` / `integerFormat` / `resolveSymbol` / `percentText` 的空值契约：`null` / `undefined` / `NaN` / `±Infinity` 返回 `emptyText`（默认 `""`）
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
   * - 支持自定义货币符号及位置（首/尾）
   * - 自动剥离 Intl 注入的不可见 Bidi 控制字符（RTL locale）
   * - 当值为 `null` 或 `undefined` 时返回 `null`
   *
   * @param value 待格式化的数值
   * @param options 格式化选项
   * @param options.locales locale 元组，同时指定格式化语言和货币所属地区
   * @param options.currencySign 货币符号，三态：非空字符串为自定义符号（如 `¥`、`$`、`€`）；`null` 输出纯数字；`undefined` 或省略时保留 Intl 原生符号。空字符串及非字符串值（如数字、布尔、对象）在运行时被忽略，等价于 `undefined`
   * @param options.currencySignPosition 货币符号位置，`"end"` 置于金额后，其余非 `"end"` 值（含非法值）运行时统一视为 `"start"`
   * @param options.currencyFormatOptions `Intl.NumberFormatOptions` 格式化选项
   * @returns 格式化后的货币字符串，无效输入返回 `null`
   *
   * @example
   * ```ts
   * import { CurrencyUtil } from "@pawover/kit/utils";
   *
   * // 重载 1: 有效数值
   * // 变体 A: 自定义符号
   * CurrencyUtil.currencyFormatter(1234.56, {
   *   locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
   *   currencySign: "¥",
   *   currencySignPosition: "start",
   *   currencyFormatOptions: { style: "currency", currency: "CNY" },
   * }); // "¥ 1,234.56"
   *
   * // 变体 B: currencySign 为 null → 纯数字
   * CurrencyUtil.currencyFormatter(1234.56, {
   *   locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
   *   currencySign: null,
   *   currencySignPosition: "start",
   *   currencyFormatOptions: { style: "currency", currency: "CNY" },
   * }); // "1,234.56"
   *
   * // 变体 C: currencySign 省略或为 undefined → 保留 Intl 原生符号
   * CurrencyUtil.currencyFormatter(1234.56, {
   *   locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
   *   currencyFormatOptions: { style: "currency", currency: "CNY" },
   * }); // "¥ 1,234.56"
   *
   * // 重载 2: null / undefined
   * CurrencyUtil.currencyFormatter(null, options); // null
   * CurrencyUtil.currencyFormatter(undefined, options); // null
   * ```
   */
  static currencyFormatter (value: string | number, options: FormatterOptions): string | null;
  static currencyFormatter (value: string | number | null | undefined, options: FormatterOptions): string | null;
  static currencyFormatter (value: string | number | null | undefined, options: FormatterOptions) {
    if (TypeUtil.isNullish(value)) {
      return null;
    }

    const { currencySign, currencySignPosition, locales, currencyFormatOptions } = options;
    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
      return null;
    }

    const parts = new Intl.NumberFormat(locales, currencyFormatOptions).formatToParts(numberValue);
    const nativeSign = (parts.find(({ type }) => type === "currency")?.value ?? "").replace(BIDI_CONTROL_CHARS_REGEX, "");
    const sign = TypeUtil.isString(currencySign, true)
      ? currencySign
      : currencySign === null
        ? ""
        : nativeSign;
    const numberText = parts
      .filter(({ type }) => type !== "currency")
      .map(({ value }) => value)
      .join("")
      .replace(BIDI_CONTROL_CHARS_REGEX, "")
      .trim();

    const isSignAtEnd = currencySignPosition === "end";

    if (!sign) {
      return numberText;
    }

    return isSignAtEnd
      ? `${numberText} ${sign}`
      : `${sign} ${numberText}`;
  }

  /**
   * 将 ISO 4217 货币代码解析为货币符号
   * - 符号取自 `Intl.NumberFormat` 的 `currency` 段
   * - 省略 `locale` 时，`CURRENCY_ENUM` 收录的代码按其 locale 取符号，其余按 `en-US`
   * - 非 ISO 4217 代码返回 `null`
   *
   * @param currency ISO 4217 货币代码，大小写不敏感
   * @param locale 取符号所用 locale，省略时按 `currency` 的默认 locale
   * @returns 货币符号，未知代码返回 `null`
   *
   * @example
   * ```ts
   * import { CurrencyUtil } from "@pawover/kit/utils";
   *
   * // 省略 locale: 按 CURRENCY_ENUM 或 en-US
   * CurrencyUtil.resolveSymbol("USD"); // "$"
   * CurrencyUtil.resolveSymbol("CNY"); // "¥"
   * CurrencyUtil.resolveSymbol("LKR"); // "LKR"
   *
   * // 指定 locale: 同一货币在不同地区的符号由调用方决定
   * CurrencyUtil.resolveSymbol("LKR", "si-LK"); // "රු."
   * CurrencyUtil.resolveSymbol("LKR", "ta-LK"); // "Rs."
   *
   * CurrencyUtil.resolveSymbol("XYZ"); // null
   * ```
   */
  static resolveSymbol (currency: string, locale?: Intl.LocalesArgument): string | null {
    const currencyCode = currency.toUpperCase();

    if (!getKnownCurrencyCodes().has(currencyCode)) {
      return null;
    }

    const symbolLocale = locale ?? (isCurrencyCode(currencyCode)
      ? CurrencyUtil.CURRENCY_ENUM[currencyCode]
      : DEFAULT_LOCALE);
    const parts = new Intl.NumberFormat(symbolLocale, { style: "currency", currency: currencyCode }).formatToParts(0);
    const symbol = parts.find(({ type }) => type === "currency")?.value;

    if (!symbol) {
      return null;
    }

    return symbol.replace(BIDI_CONTROL_CHARS_REGEX, "");
  }

  /**
   * 纯数字格式化
   * - 千分位分组 + 固定小数位，默认 `en-US` 口径（可经 `locale` 覆盖），不输出货币符号
   * - `null` / `undefined` / `NaN` / `±Infinity` 返回 `emptyText`
   *
   * @param value 待格式化的数值
   * @param options 格式化选项
   * @param options.locale 数字分组与小数位的 locale，默认 `"en-US"`
   * @param options.minimumFractionDigits 最小小数位数，默认 `2`；超过 `maximumFractionDigits` 时按后者收敛，负数取 `0`，`NaN` 回退默认值
   * @param options.maximumFractionDigits 最大小数位数，默认 `2`；负数取 `0`，超过 `20` 取 `20`，`NaN` 回退默认值
   * @param options.useGrouping 是否使用千分位分组，默认 `true`
   * @param options.emptyText 空值占位文本，默认 `""`
   * @returns 格式化后的数字字符串
   *
   * @example
   * ```ts
   * import { CurrencyUtil } from "@pawover/kit/utils";
   *
   * CurrencyUtil.numberFormat(1234.5); // "1,234.50"
   * CurrencyUtil.numberFormat(0); // "0.00"
   * CurrencyUtil.numberFormat(-1234.5); // "-1,234.50"
   * CurrencyUtil.numberFormat(1234.5, { minimumFractionDigits: 0, maximumFractionDigits: 2 }); // "1,234.5"
   * CurrencyUtil.numberFormat(1234.5, { useGrouping: false }); // "1234.50"
   * CurrencyUtil.numberFormat(1234.5, { locale: "de-DE" }); // "1.234,50"
   * CurrencyUtil.numberFormat(1234.5, { maximumFractionDigits: -1 }); // "1,235"
   * CurrencyUtil.numberFormat(null); // ""
   * CurrencyUtil.numberFormat(Number.NaN, { emptyText: "—" }); // "—"
   * ```
   */
  static numberFormat (value: number | null | undefined, options: NumberFormatOptions = {}): string {
    const { locale = DEFAULT_LOCALE, minimumFractionDigits, maximumFractionDigits, useGrouping = true, emptyText = "" } = options;

    if (!TypeUtil.isFiniteNumber(value)) {
      return emptyText;
    }

    const maximumDigits = normalizeFractionDigits(maximumFractionDigits, 2);

    return formatNumber(locale, {
      minimumFractionDigits: Math.min(normalizeFractionDigits(minimumFractionDigits, 2), maximumDigits),
      maximumFractionDigits: maximumDigits,
      useGrouping,
    }, value);
  }

  /**
   * 货币符号 + 金额格式化
   * - 默认符号与金额间留一个空格、负号位于符号之后（`"$ -1,234.50"`）
   * - `symbol` 省略时经 `resolveSymbol` 从 `currency` 推导，未知代码回退输出代码本身
   * - 正负号由 `signDisplay` 控制：`"auto"` 仅负数带号，`"always"` 正数与 `0` 带 `+`，`"exceptZero"` 仅正数带 `+`
   * - `minusSign` 省略时使用 locale 原生负号
   * - `null` / `undefined` / `NaN` / `±Infinity` 返回 `emptyText`
   *
   * @param value 待格式化的数值
   * @param options 格式化选项
   * @param options.locale 数字分组与小数位的 locale，默认 `"en-US"`；货币符号仍由 `currency` 决定
   * @param options.currency ISO 4217 货币代码，大小写不敏感，默认 `"USD"`
   * @param options.symbol 货币符号，省略时由 `currency` 推导；空字符串输出纯数字
   * @param options.spacing 符号与金额的间距，默认 `"space"`
   * @param options.signPlacement 符号位置，默认 `"afterSymbol"`；`"beforeSymbol"` 将正负号移到货币符号之前
   * @param options.signDisplay 正负号显示策略，默认 `"auto"`
   * @param options.minusSign 负号字符，默认使用 locale 原生负号
   * @param options.fractionDigits 小数位数，默认 `2`；负数取 `0`，超过 `20` 取 `20`，`NaN` 回退默认值
   * @param options.emptyText 空值占位文本，默认 `""`
   * @returns 格式化后的金额字符串
   *
   * @example
   * ```ts
   * import { CurrencyUtil } from "@pawover/kit/utils";
   *
   * CurrencyUtil.moneyFormat(1234.5); // "$ 1,234.50"
   * CurrencyUtil.moneyFormat(-1234.5); // "$ -1,234.50"
   * CurrencyUtil.moneyFormat(1234.5, { spacing: "none" }); // "$1,234.50"
   * CurrencyUtil.moneyFormat(-1234.5, { signPlacement: "beforeSymbol" }); // "-$ 1,234.50"
   * CurrencyUtil.moneyFormat(1234.5, { locale: "de-DE" }); // "$ 1.234,50"
   * CurrencyUtil.moneyFormat(1234.5, { currency: "cny" }); // "¥ 1,234.50"
   * CurrencyUtil.moneyFormat(1234.5, { symbol: "HK$" }); // "HK$ 1,234.50"
   * CurrencyUtil.moneyFormat(1234.5, { symbol: "" }); // "1,234.50"
   * CurrencyUtil.moneyFormat(1234.5, { signDisplay: "always" }); // "$ +1,234.50"
   * CurrencyUtil.moneyFormat(0, { signDisplay: "exceptZero" }); // "$ 0.00"
   * CurrencyUtil.moneyFormat(-1234.5, { signDisplay: "always", signPlacement: "beforeSymbol" }); // "-$ 1,234.50"
   * CurrencyUtil.moneyFormat(1234.5, { signDisplay: "always", minusSign: "−", signPlacement: "beforeSymbol", spacing: "none" }); // "+$1,234.50"
   * CurrencyUtil.moneyFormat(-1234.5, { signDisplay: "always", minusSign: "−", signPlacement: "beforeSymbol", spacing: "none" }); // "−$1,234.50"
   * CurrencyUtil.moneyFormat(null); // ""
   * CurrencyUtil.moneyFormat(null, { emptyText: "—" }); // "—"
   * ```
   */
  static moneyFormat (value: number | null | undefined, options: MoneyFormatOptions = {}): string {
    const { locale = DEFAULT_LOCALE, currency = "USD", symbol, spacing = "space", signPlacement = "afterSymbol", signDisplay = "auto", minusSign, fractionDigits, emptyText = "" } = options;

    if (!TypeUtil.isFiniteNumber(value)) {
      return emptyText;
    }

    const digits = normalizeFractionDigits(fractionDigits, 2);
    const numberText = CurrencyUtil.numberFormat(value, { locale, minimumFractionDigits: digits, maximumFractionDigits: digits });
    const currencyCode = currency.toUpperCase();
    const symbolText = symbol ?? CurrencyUtil.resolveSymbol(currencyCode) ?? currencyCode;

    if (!symbolText) {
      return numberText;
    }

    const { minusSign: localeMinusSign, unsignedText } = splitMinusSign(numberText);
    const showsPlusSign = signDisplay === "always" || (signDisplay === "exceptZero" && value > 0);
    let signText = "";

    if (value < 0) {
      signText = minusSign ?? localeMinusSign;
    } else if (showsPlusSign) {
      signText = "+";
    }

    const gap = spacing === "none"
      ? ""
      : " ";

    return signPlacement === "beforeSymbol"
      ? `${signText}${symbolText}${gap}${unsignedText}`
      : `${symbolText}${gap}${signText}${unsignedText}`;
  }

  /**
   * 整数格式化
   * - 先按 `Math.round` 取整（`.5` 向正无穷，如 `2.5 → 3`、`-2.5 → -2`），再按 `locale` 分组
   * - `null` / `undefined` / `NaN` / `±Infinity` 返回 `emptyText`
   *
   * @param value 待格式化的数值
   * @param options 格式化选项
   * @param options.locale 数字分组与小数位的 locale，默认 `"en-US"`
   * @param options.useGrouping 是否使用千分位分组，默认 `true`
   * @param options.emptyText 空值占位文本，默认 `""`
   * @returns 格式化后的整数字符串
   *
   * @example
   * ```ts
   * import { CurrencyUtil } from "@pawover/kit/utils";
   *
   * CurrencyUtil.integerFormat(1234.5678); // "1,235"
   * CurrencyUtil.integerFormat(2.5); // "3"
   * CurrencyUtil.integerFormat(-2.5); // "-2"
   * CurrencyUtil.integerFormat(1234.5678, { locale: "de-DE" }); // "1.235"
   * CurrencyUtil.integerFormat(null); // ""
   * CurrencyUtil.integerFormat(null, { emptyText: "—" }); // "—"
   * ```
   */
  static integerFormat (value: number | null | undefined, options: IntegerFormatOptions = {}): string {
    const { locale = DEFAULT_LOCALE, useGrouping = true, emptyText = "" } = options;

    if (!TypeUtil.isFiniteNumber(value)) {
      return emptyText;
    }

    return CurrencyUtil.numberFormat(Math.round(value), {
      locale,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping,
    });
  }

  /**
   * 百分比格式化
   * - 入参为小数，按 `locale` 的百分数格式输出（`0.25 → "25.0%"`、`de-DE → "25,0 %"`）
   * - `showSign` 为 `true` 时按 locale 输出正负号，`0` 亦带 `+`
   * - `null` / `undefined` / `NaN` / `±Infinity` 返回 `emptyText`
   *
   * @param value 待格式化的数值
   * @param options 格式化选项
   * @param options.locale 数字格式的 locale，默认 `"en-US"`
   * @param options.fractionDigits 百分数小数位数，默认 `1`；负数取 `0`，超过 `20` 取 `20`，`NaN` 回退默认值
   * @param options.showSign 是否输出正负号，默认 `false`
   * @param options.useGrouping 是否使用千分位分组，默认 `true`
   * @param options.emptyText 空值占位文本，默认 `""`
   * @returns 格式化后的百分数字符串
   *
   * @example
   * ```ts
   * import { CurrencyUtil } from "@pawover/kit/utils";
   *
   * CurrencyUtil.percentFormat(0.25); // "25.0%"
   * CurrencyUtil.percentFormat(0.2567, { fractionDigits: 0 }); // "26%"
   * CurrencyUtil.percentFormat(-0.05, { showSign: true }); // "-5.0%"
   * CurrencyUtil.percentFormat(12.3456, { fractionDigits: 1 }); // "1,234.6%"
   * CurrencyUtil.percentFormat(12.3456, { fractionDigits: 1, useGrouping: false }); // "1234.6%"
   * CurrencyUtil.percentFormat(0.25, { locale: "de-DE" }); // "25,0\u00A0%"（空格为 U+00A0）
   * CurrencyUtil.percentFormat(null); // ""
   * ```
   */
  static percentFormat (value: number | null | undefined, options: PercentFormatOptions = {}): string {
    const { locale = DEFAULT_LOCALE, fractionDigits, showSign = false, useGrouping = true, emptyText = "" } = options;

    if (!TypeUtil.isFiniteNumber(value)) {
      return emptyText;
    }

    const digits = normalizeFractionDigits(fractionDigits, 1);

    return formatNumber(locale, {
      style: "percent",
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
      signDisplay: showSign ? "always" : "auto",
      useGrouping,
    }, value);
  }

  /**
   * 百分比文案格式化
   * - 入参为百分数（`25 → "+25.0%"`）
   * - 默认正数加 `+`、负数用 locale 负号、`0` 不加号；`zeroSign: true` 时 `0` 也加 `+`
   * - 四舍五入后落为 `0.0` 的非零值保留原值符号（`0.04 → "+0.0%"`）
   * - `null` / `undefined` / `NaN` / `±Infinity` 返回 `emptyText`
   *
   * @param value 待格式化的百分数
   * @param options 格式化选项
   * @param options.locale 数字格式的 locale，默认 `"en-US"`
   * @param options.fractionDigits 百分数小数位数，默认 `1`；负数取 `0`，超过 `20` 取 `20`，`NaN` 回退默认值
   * @param options.showSign 是否给正数加 `+`，默认 `true`
   * @param options.zeroSign 是否给 `0` 加 `+`，默认 `false`
   * @param options.useGrouping 是否使用千分位分组，默认 `true`
   * @param options.emptyText 空值占位文本，默认 `""`
   * @returns 格式化后的百分比文案
   *
   * @example
   * ```ts
   * import { CurrencyUtil } from "@pawover/kit/utils";
   *
   * CurrencyUtil.percentText(25); // "+25.0%"
   * CurrencyUtil.percentText(-12.34); // "-12.3%"
   * CurrencyUtil.percentText(12345.6); // "+12,345.6%"
   * CurrencyUtil.percentText(12345.6, { useGrouping: false }); // "+12345.6%"
   * CurrencyUtil.percentText(0); // "0.0%"
   * CurrencyUtil.percentText(0, { zeroSign: true }); // "+0.0%"
   * CurrencyUtil.percentText(0.04); // "+0.0%"
   * CurrencyUtil.percentText(0.04, { showSign: false }); // "0.0%"
   * CurrencyUtil.percentText(null); // ""
   * ```
   */
  static percentText (value: number | null | undefined, options: PercentTextOptions = {}): string {
    const { locale = DEFAULT_LOCALE, fractionDigits, showSign = true, zeroSign = false, useGrouping = true, emptyText = "" } = options;

    if (!TypeUtil.isFiniteNumber(value)) {
      return emptyText;
    }

    const digits = normalizeFractionDigits(fractionDigits, 1);
    const text = formatNumber(locale, {
      style: "percent",
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
      useGrouping,
    }, value / 100);
    const { minusSign } = splitMinusSign(text);
    const isSigned = showSign && !minusSign && (value > 0 || (value === 0 && zeroSign));

    return isSigned
      ? `+${text}`
      : text;
  }

  /**
   * 将任意数值转换为精确的十进制值
   * - 基于 `mathjs` 的 `bignumber` 处理，避免浮点数精度问题
   * - 支持科学计数法数值与纯数值字符串；含货币符号、千分位的脏文本仍先抽数
   * - 当值为 `null` 或 `undefined` 时返回 `null`
   * - `stringMode` 为 `false` 时负零归一为 `0`
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
   * // 重载 1: stringMode 省略 / undefined / true → string
   * CurrencyUtil.toRealValue(math, "0.1"); // "0.1"
   * CurrencyUtil.toRealValue(math, 0.1 + 0.2, 2); // "0.30"
   * CurrencyUtil.toRealValue(math, "0.1", undefined, true); // "0.1"
   * CurrencyUtil.toRealValue(math, 1e21, 2); // "1000000000000000000000.00"
   *
   * // 重载 2: stringMode = false → number
   * CurrencyUtil.toRealValue(math, "0.1", undefined, false); // 0.1
   * CurrencyUtil.toRealValue(math, 1e-7, 2, false); // 0
   * CurrencyUtil.toRealValue(math, -3e-7, 2, false); // 0
   *
   * // 重载 3: stringMode 为 boolean（未收窄）→ number | string
   * const getMode = (): boolean => false;
   * CurrencyUtil.toRealValue(math, "0.1", undefined, getMode()); // 0.1 | "0.1"
   *
   * // 变体: null / undefined 与可空联合值 → 返回追加 null
   * CurrencyUtil.toRealValue(math, null); // null
   * CurrencyUtil.toRealValue(math, undefined); // null
   * CurrencyUtil.toRealValue(math, null, 2, false); // null
   * const value: string | number | null = null;
   * CurrencyUtil.toRealValue(math, value, 2, getMode()); // null | 0.1 | "0.1"
   * ```
   */
  static toRealValue<T extends string | number | null | undefined> (mathJsInstance: MathJsInstance, value: T, precision?: number | undefined, stringMode?: true | undefined): ToRealValueResult<T, string>;
  static toRealValue<T extends string | number | null | undefined> (mathJsInstance: MathJsInstance, value: T, precision: number | undefined, stringMode: false): ToRealValueResult<T, number>;
  static toRealValue<T extends string | number | null | undefined> (mathJsInstance: MathJsInstance, value: T, precision: number | undefined, stringMode: boolean | undefined): ToRealValueResult<T, number | string>;
  static toRealValue (mathJsInstance: MathJsInstance, value: string | number | null | undefined, precision?: number | undefined, stringMode?: boolean | undefined): number | string | null {
    if (TypeUtil.isNullish(value)) {
      return null;
    }

    const precisionValue = MathUtil.toDecimal(mathJsInstance, value, precision);

    if (stringMode === false) {
      const numberValue = Number(precisionValue);

      if (Object.is(numberValue, -0)) {
        return 0;
      }

      return numberValue;
    }

    return precisionValue;
  }
}
