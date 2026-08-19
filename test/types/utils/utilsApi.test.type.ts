import { CurrencyUtil, I18nUtil, StringUtil, TypeUtil } from "@pawover/kit/utils";
import type { CountryCode } from "@pawover/kit/utils";
import { all, create } from "mathjs";

const math = create(all);

// TypeUtil.isString must keep returning boolean (not collapse to string / any)
// @ts-expect-error — isString returns boolean, not string
const invalidStringTarget: string = TypeUtil.isString("hello");

// @ts-expect-error — isString returns boolean, not number
const invalidNumberTarget: number = TypeUtil.isString("hello");

// @ts-expect-error — isNumber returns boolean, not number
const invalidNum: number = TypeUtil.isNumber(42);

// @ts-expect-error — isInteger returns boolean, not number
const invalidInt: number = TypeUtil.isInteger(42);

// CurrencyUtil.toRealValue — omitted stringMode must return string
// @ts-expect-error — omitted stringMode returns string, not number
const invalidRealStrDefault: number = CurrencyUtil.toRealValue(math, "0.1");

// @ts-expect-error — precision overload must keep returning string, not number
const invalidRealStrPrecision: number = CurrencyUtil.toRealValue(math, 0.1 + 0.2, 2);

// CurrencyUtil.toRealValue — stringMode = true → string
// @ts-expect-error — stringMode = true returns string, not number
const invalidRealStr: number = CurrencyUtil.toRealValue(math, "0.1", undefined, true);

// CurrencyUtil.toRealValue — stringMode = false → number
// @ts-expect-error — stringMode = false returns number, not string
const invalidRealNum: string = CurrencyUtil.toRealValue(math, "0.1", undefined, false);

// CurrencyUtil.toRealValue — stringMode as boolean → number | string (must not collapse)
// 注: const mode: boolean = false 会被 TS 6 收窄为字面量 false，故用函数参数保持真实 boolean 类型
function assertBooleanMode(mode: boolean): void {
  // @ts-expect-error — boolean stringMode must NOT collapse to number
  const invalidRealModeNum: number = CurrencyUtil.toRealValue(math, "0.1", undefined, mode);

  // @ts-expect-error — boolean stringMode must NOT collapse to string
  const invalidRealModeStr: string = CurrencyUtil.toRealValue(math, "0.1", undefined, mode);

  // @ts-expect-error — nullable value + boolean stringMode must append null
  const invalidRealUnion: number | string = CurrencyUtil.toRealValue(math, null, 2, mode);
}

function assertBooleanOrUndefinedMode(mode: boolean | undefined): void {
  // @ts-expect-error — boolean | undefined stringMode must NOT collapse to number
  const invalidRealMode: number = CurrencyUtil.toRealValue(math, "0.1", 2, mode);
}

// CurrencyUtil.toRealValue — nullable value must append null to result
// @ts-expect-error — null value must return string | null, not plain string
const invalidRealNull: string = CurrencyUtil.toRealValue(math, null);

// @ts-expect-error — null + stringMode = false must return number | null, not plain number
const invalidRealNullFalse: number = CurrencyUtil.toRealValue(math, null, 2, false);

// @ts-expect-error — undefined + stringMode = true must return string | null, not plain string
const invalidRealNullTrue: string = CurrencyUtil.toRealValue(math, undefined, 2, true);

const nullableValue: string | number | null = null;

// @ts-expect-error — nullable union + stringMode = false must return number | null, not plain number
const invalidRealNullable: number = CurrencyUtil.toRealValue(math, nullableValue, 2, false);

// I18nUtil.LOCALE_ENUM — 枚举值必须保持字面量类型
// @ts-expect-error — LOCALE_ENUM.US must be "en-US", not "en"
const invalidLocaleEnum: "en" = I18nUtil.LOCALE_ENUM.US;

// I18nUtil.CountryCode — 必须为 248 个国家码字面量联合，不能接受任意字符串
// @ts-expect-error — CountryCode must not accept arbitrary string like "XX"
const invalidCountryCode: CountryCode = "XX";

// I18nUtil.PRIMARY_LANGUAGE_ENUM — 枚举值必须保持字面量类型
// @ts-expect-error — PRIMARY_LANGUAGE_ENUM.en must be "en-US", not "en"
const invalidPrimaryLanguageEnum: "en" = I18nUtil.PRIMARY_LANGUAGE_ENUM.en;

// @ts-expect-error — PRIMARY_LANGUAGE_ENUM.zh must be "zh-CN", not "zh"
const invalidPrimaryLanguageEnumZh: "zh" = I18nUtil.PRIMARY_LANGUAGE_ENUM.zh;

// I18nUtil.toFullLocale — 基础语言码必须映射为完整 locale 字面量
// @ts-expect-error — toFullLocale("en") must return "en-US", not "en"
const invalidFullLocale: "en" = I18nUtil.toFullLocale("en");

// @ts-expect-error — toFullLocale("en-US") must pass through as "en-US", not "en"
const invalidFullLocalePass: "en" = I18nUtil.toFullLocale("en-US");

// @ts-expect-error — toFullLocale("zh") must return "zh-CN", not "zh"
const invalidFullLocaleZh: "zh" = I18nUtil.toFullLocale("zh");

// @ts-expect-error — toFullLocale("EN") must return "en-US" (大小写不敏感), not "EN"
const invalidFullLocaleUpper: "EN" = I18nUtil.toFullLocale("EN");

// @ts-expect-error — toFullLocale("xx") must pass through as "xx", not collapse to "en"
const invalidFullLocaleUnknown: "en" = I18nUtil.toFullLocale("xx");

// @ts-expect-error — toFullLocale(null) must NOT collapse to plain string
const invalidFullLocaleNull: string = I18nUtil.toFullLocale(null);

// I18nUtil.toLocaleDisplayName — 展示名称返回 string，不能是字面量类型
// @ts-expect-error — toLocaleDisplayName("US") returns string, not literal "美国"
const invalidDisplayName: "美国" = I18nUtil.toLocaleDisplayName("US");

// @ts-expect-error — toLocaleDisplayName(null) must NOT collapse to plain string
const invalidDisplayNameNull: string = I18nUtil.toLocaleDisplayName(null);

// @ts-expect-error — 提供 fallback 时返回 string，不能收窄为字面量
const invalidFullLocaleFallback: "en-US" = I18nUtil.toFullLocale("xx", "en-US");

// I18nUtil.toBaseLanguage — 完整 locale 必须提取为基础语言码字面量
// @ts-expect-error — toBaseLanguage("en-US") must return "en", not "en-US"
const invalidBaseLanguage: "en-US" = I18nUtil.toBaseLanguage("en-US");

// @ts-expect-error — toBaseLanguage("en") must NOT widen to string, not collapse to "en-US"
const invalidBaseLanguageEn: "en-US" = I18nUtil.toBaseLanguage("en");

// @ts-expect-error — toBaseLanguage("zh-CN") must return "zh", not "zh-CN"
const invalidBaseLanguageZh: "zh-CN" = I18nUtil.toBaseLanguage("zh-CN");

// @ts-expect-error — toBaseLanguage("xx-YY") must return "xx", not pass through as "xx-YY"
const invalidBaseLanguageUnknown: "xx-YY" = I18nUtil.toBaseLanguage("xx-YY");

// @ts-expect-error — toBaseLanguage(null) must NOT collapse to plain string
const invalidBaseLanguageNull: string = I18nUtil.toBaseLanguage(null);

// StringUtil.split — 字面量输入必须推导为 Split 字面量元组
// @ts-expect-error — split("en-US", "-") must return ["en", "US"], not ["en", "US", "x"]
const invalidSplitExtra: ["en", "US", "x"] = StringUtil.split("en-US", "-");

// @ts-expect-error — split("en-US", "-") 首元素必须为 "en", 不能是 "US"
const invalidSplitHead: ["US", "US"] = StringUtil.split("en-US", "-");

// @ts-expect-error — split("a,b,c", ",") must return ["a", "b", "c"], not ["a"]
const invalidSplitCount: ["a"] = StringUtil.split("a,b,c", ",");

// @ts-expect-error — split("hello", "-") must return ["hello"], not ["hello", "world"]
const invalidSplitSingle: ["hello", "world"] = StringUtil.split("hello", "-");

// 宽类型输入必须退化为 string[], 不能推导为字面量元组
function assertSplitWide (input: string): void {
  // @ts-expect-error — split(input: string, ",") must return string[], not ["a"]
  const invalidSplitWide: ["a"] = StringUtil.split(input, ",");
}

// @ts-expect-error — split(null, "-") must return string[], not collapse to ["x"]
const invalidSplitNull: ["x"] = StringUtil.split(null, "-");
