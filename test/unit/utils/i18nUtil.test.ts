import { describe, expect, it } from "vitest";
import { I18nUtil } from "@pawover/kit/utils";

describe("I18nUtil", () => {
  describe("LOCALE_ENUM", () => {
    it("should provide country-based locale constants", () => {
      expect(I18nUtil.LOCALE_ENUM.US).toBe("en-US");
      expect(I18nUtil.LOCALE_ENUM.CN).toBe("zh-CN");
      expect(I18nUtil.LOCALE_ENUM.JP).toBe("ja-JP");
      expect(I18nUtil.LOCALE_ENUM.BR).toBe("pt-BR");
      expect(I18nUtil.LOCALE_ENUM.SA).toBe("ar-SA");
      expect(I18nUtil.LOCALE_ENUM.GB).toBe("en-GB");
      expect(I18nUtil.LOCALE_ENUM.HK).toBe("zh-HK");
    });

    it("should align region suffix with country code", () => {
      for (const [code, locale] of Object.entries(I18nUtil.LOCALE_ENUM)) {
        const [, region] = locale.split("-");
        expect(region).toBe(code);
      }
    });
  });

  describe("PRIMARY_LANGUAGE_ENUM", () => {
    it("should provide base language to full locale mapping", () => {
      expect(I18nUtil.PRIMARY_LANGUAGE_ENUM.en).toBe("en-US");
      expect(I18nUtil.PRIMARY_LANGUAGE_ENUM.zh).toBe("zh-CN");
      expect(I18nUtil.PRIMARY_LANGUAGE_ENUM.ja).toBe("ja-JP");
      expect(I18nUtil.PRIMARY_LANGUAGE_ENUM.ti).toBe("ti-ER");
      expect(I18nUtil.PRIMARY_LANGUAGE_ENUM.bi).toBe("bi-VU");
    });

    it("should cover all base languages referenced by LOCALE_ENUM", () => {
      const bases = new Set(Object.keys(I18nUtil.PRIMARY_LANGUAGE_ENUM));
      for (const locale of Object.values(I18nUtil.LOCALE_ENUM)) {
        const [base] = locale.split("-");
        expect(bases.has(base)).toBe(true);
      }
    });
  });

  describe("toFullLocale", () => {
    it("should map base language code to full locale", () => {
      expect(I18nUtil.toFullLocale("en")).toBe("en-US");
      expect(I18nUtil.toFullLocale("zh")).toBe("zh-CN");
      expect(I18nUtil.toFullLocale("ja")).toBe("ja-JP");
      expect(I18nUtil.toFullLocale("pt")).toBe("pt-BR");
    });

    it("should pass through full locale with region", () => {
      expect(I18nUtil.toFullLocale("en-US")).toBe("en-US");
      expect(I18nUtil.toFullLocale("zh-CN")).toBe("zh-CN");
      expect(I18nUtil.toFullLocale("en-GB")).toBe("en-GB");
    });

    it("should be case-insensitive when looking up base language", () => {
      expect(I18nUtil.toFullLocale("EN")).toBe("en-US");
      expect(I18nUtil.toFullLocale("Zh")).toBe("zh-CN");
    });

    it("should not rewrite case of input that already has a region", () => {
      expect(I18nUtil.toFullLocale("en-us")).toBe("en-us");
    });

    it("should return unknown base language as-is without fallback", () => {
      expect(I18nUtil.toFullLocale("xx")).toBe("xx");
    });

    it("should return fallback for unknown base language", () => {
      expect(I18nUtil.toFullLocale("xx", "en-US")).toBe("en-US");
    });

    it("should ignore fallback when base language is matched", () => {
      expect(I18nUtil.toFullLocale("en", "zh-CN")).toBe("en-US");
    });

    it("should return null as-is without fallback", () => {
      expect(I18nUtil.toFullLocale(null)).toBeNull();
    });

    it("should return undefined as-is without fallback", () => {
      expect(I18nUtil.toFullLocale(undefined)).toBeUndefined();
    });

    it("should return fallback for null input", () => {
      expect(I18nUtil.toFullLocale(null, "en-US")).toBe("en-US");
    });

    it("should return fallback for undefined input", () => {
      expect(I18nUtil.toFullLocale(undefined, "en-US")).toBe("en-US");
    });

    it("should return blank string as-is without fallback", () => {
      expect(I18nUtil.toFullLocale("")).toBe("");
      expect(I18nUtil.toFullLocale("   ")).toBe("   ");
    });

    it("should return fallback for blank string", () => {
      expect(I18nUtil.toFullLocale("", "en-US")).toBe("en-US");
    });
  });

  describe("toLocaleDisplayName", () => {
    it("should return region name for country code", () => {
      expect(I18nUtil.toLocaleDisplayName("US", { language: "zh" })).toBe("美国");
      expect(I18nUtil.toLocaleDisplayName("CN", { language: "zh" })).toBe("中国");
      expect(I18nUtil.toLocaleDisplayName("US", { language: "en" })).toBe("United States");
    });

    it("should return language name for language subtag", () => {
      expect(I18nUtil.toLocaleDisplayName("en", { language: "zh" })).toBe("英语");
      expect(I18nUtil.toLocaleDisplayName("zh", { language: "zh" })).toBe("中文");
    });

    it("should return language name with region for full locale", () => {
      const name = I18nUtil.toLocaleDisplayName("en-US", { language: "zh" });
      expect(name).not.toBe("en-US");
      expect(name).toContain("英语");
      expect(name).toContain("美国");
    });

    it("should respect explicit type override", () => {
      expect(I18nUtil.toLocaleDisplayName("en", { language: "zh", type: "language" })).toBe("英语");
      expect(I18nUtil.toLocaleDisplayName("en", { language: "zh", type: "region" })).toBe("en");
    });

    it("should return unknown input as-is without fallback", () => {
      expect(I18nUtil.toLocaleDisplayName("123", { language: "zh" })).toBe("123");
    });

    it("should return fallback for unknown input", () => {
      expect(I18nUtil.toLocaleDisplayName("123", { language: "zh", fallback: "未知" })).toBe("未知");
    });

    it("should return null as-is without fallback", () => {
      expect(I18nUtil.toLocaleDisplayName(null)).toBeNull();
    });

    it("should return undefined as-is without fallback", () => {
      expect(I18nUtil.toLocaleDisplayName(undefined)).toBeUndefined();
    });

    it("should return fallback for null input", () => {
      expect(I18nUtil.toLocaleDisplayName(null, { fallback: "未知" })).toBe("未知");
    });

    it("should return blank string as-is without fallback", () => {
      expect(I18nUtil.toLocaleDisplayName("", { language: "zh" })).toBe("");
    });

    it("should return fallback for blank string", () => {
      expect(I18nUtil.toLocaleDisplayName("", { fallback: "未知" })).toBe("未知");
    });
  });

  describe("toBaseLanguage", () => {
    it("should extract base language from full locale", () => {
      expect(I18nUtil.toBaseLanguage("en-US")).toBe("en");
      expect(I18nUtil.toBaseLanguage("zh-CN")).toBe("zh");
      expect(I18nUtil.toBaseLanguage("ja-JP")).toBe("ja");
    });

    it("should return base language as-is", () => {
      expect(I18nUtil.toBaseLanguage("en")).toBe("en");
      expect(I18nUtil.toBaseLanguage("zh")).toBe("zh");
    });

    it("should preserve original case", () => {
      expect(I18nUtil.toBaseLanguage("EN-US")).toBe("EN");
    });

    it("should return unknown input as-is", () => {
      expect(I18nUtil.toBaseLanguage("xx")).toBe("xx");
      expect(I18nUtil.toBaseLanguage("xx-YY")).toBe("xx");
    });

    it("should return fallback for null input", () => {
      expect(I18nUtil.toBaseLanguage(null, "en")).toBe("en");
    });

    it("should return null as-is without fallback", () => {
      expect(I18nUtil.toBaseLanguage(null)).toBeNull();
    });

    it("should return undefined as-is without fallback", () => {
      expect(I18nUtil.toBaseLanguage(undefined)).toBeUndefined();
    });

    it("should return fallback for blank string", () => {
      expect(I18nUtil.toBaseLanguage("", "en")).toBe("en");
    });

    it("should ignore fallback for valid input", () => {
      expect(I18nUtil.toBaseLanguage("en-US", "zh")).toBe("en");
    });
  });
});
