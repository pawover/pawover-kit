import type { I18nUtil } from "./i18nUtil";

/** `I18nUtil.PRIMARY_LANGUAGE_ENUM` 的字面量类型（供类型层推导 `ToFullLocale`，单一数据源） */
export type PrimaryLanguageEnum = typeof I18nUtil.PRIMARY_LANGUAGE_ENUM;

/** `I18nUtil.LOCALE_ENUM` 的键类型：ISO 3166-1 alpha-2 国家/地区代码（248 项）字面量联合 */
export type CountryCode = keyof typeof I18nUtil.LOCALE_ENUM;

/** `I18nUtil.toLocaleDisplayName` 的名称类型：`"region"` 地区名（如 `"美国"`）、`"language"` 语言名（如 `"英语"`） */
export type ToLocaleDisplayNameType = "region" | "language";

/**
 * `I18nUtil.toLocaleDisplayName` 的选项
 * - 名称数据由 `Intl.DisplayNames`（CLDR）提供，展示语言缺省跟随运行环境
 *
 * @example
 * ```ts
 * import { I18nUtil } from "@pawover/kit/utils";
 * import type { ToLocaleDisplayNameOptions } from "@pawover/kit/utils";
 *
 * const options: ToLocaleDisplayNameOptions = {
 *   language: "zh", // 展示语言（缺省跟随运行环境）
 *   type: "region", // 名称类型（缺省按输入形态推断）
 *   fallback: "未知", // 未匹配或非法输入的回退值（缺省原样返回输入）
 * };
 *
 * I18nUtil.toLocaleDisplayName("US", options); // "美国"
 * ```
 */
export interface ToLocaleDisplayNameOptions {
  /** 展示语言（BCP 47，如 `"zh"`、`"en"`），缺省跟随运行环境（`Intl.DisplayNames` 默认 locale） */
  language?: string;
  /** 名称类型，缺省按输入形态推断：2 字母大写（国家/地区代码）→ `"region"`，其余（语言子标签 / 完整 Locale）→ `"language"` */
  type?: ToLocaleDisplayNameType;
  /** 未匹配或非法输入时的回退值，缺省原样返回输入 */
  fallback?: string;
}

/**
 * 规范化为完整 Locale（语言 + 地区）的结果类型
 * - 输入为基础语言码（如 `"en"`，大小写不敏感）时，按 `PrimaryLanguageEnum` 映射为对应首选完整 Locale 字面量（如 `"en-US"`）
 * - 输入已含地区后缀（如 `"en-US"` / `"en-us"`）时，原样保留
 * - 未匹配输入（如 `"xx"`）时，原样保留
 *
 * @example
 * ```ts
 * type A = ToFullLocale<"en">; // "en-US"
 * type B = ToFullLocale<"en-US">; // "en-US"
 * type C = ToFullLocale<"xx">; // "xx"
 * ```
 */
export type ToFullLocale<T extends string> = T extends `${string}-${string}`
  ? T
  : Lowercase<T> extends keyof PrimaryLanguageEnum
    ? PrimaryLanguageEnum[Lowercase<T>]
    : T;

/**
 * 提取基础语言码（去掉地区后缀）的结果类型
 * - 输入为 `语言-地区` 形状（如 `"en-US"`）时，提取 `-` 前的语言码（如 `"en"`）
 * - 其余输入原样保留
 *
 * @example
 * ```ts
 * type A = ToBaseLanguage<"en-US">; // "en"
 * type B = ToBaseLanguage<"en">; // "en"
 * ```
 */
export type ToBaseLanguage<T extends string> = T extends `${infer B}-${string}` ? B : T;