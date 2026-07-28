import { describe, expect, it, vi } from "vitest";
import { create, all } from "mathjs";
import { CurrencyUtil } from "@pawover/kit/utils";

const math = create(all);

describe("CurrencyUtil", () => {
  describe("CURRENCY_ENUM", () => {
    it("should have common currency codes", () => {
      expect(CurrencyUtil.CURRENCY_ENUM.USD).toBe("en-US");
      expect(CurrencyUtil.CURRENCY_ENUM.CNY).toBe("zh-CN");
      expect(CurrencyUtil.CURRENCY_ENUM.EUR).toBe("de-DE");
      expect(CurrencyUtil.CURRENCY_ENUM.JPY).toBe("ja-JP");
      expect(CurrencyUtil.CURRENCY_ENUM.GBP).toBe("en-GB");
    });

    it("should have all expected entries", () => {
      const keys = Object.keys(CurrencyUtil.CURRENCY_ENUM);
      expect(keys).toContain("USD");
      expect(keys).toContain("CNY");
      expect(keys).toContain("EUR");
      expect(keys).toContain("KRW");
      expect(keys).toContain("AUD");
    });
  });

  describe("currencyFormatter", () => {
    it("should format with start sign", () => {
      const result = CurrencyUtil.currencyFormatter(1234.56, {
        locales: ["zh-CN", "en-US"],
        currencySign: "¥",
        currencySignPosition: "start",
        currencyFormatOptions: { style: "currency", currency: "CNY" },
      });
      expect(result).toContain("¥");
      expect(result).toContain("1,234.56");
    });

    it("should format with end sign", () => {
      const result = CurrencyUtil.currencyFormatter(100, {
        locales: ["en-US", "en-US"],
        currencySign: "$",
        currencySignPosition: "end",
        currencyFormatOptions: { style: "currency", currency: "USD" },
      });
      expect(result).toContain("$");
      expect(result).toContain("100.00");
    });

    it("should return null for null input", () => {
      expect(CurrencyUtil.currencyFormatter(null, {} as never)).toBeNull();
    });

    it("should return null for undefined input", () => {
      expect(CurrencyUtil.currencyFormatter(undefined, {} as never)).toBeNull();
    });
  });

  describe("toRealValue", () => {
    it("should return null for null input", () => {
      expect(CurrencyUtil.toRealValue({} as never, null)).toBeNull();
    });

    it("should return null for undefined input", () => {
      expect(CurrencyUtil.toRealValue({} as never, undefined)).toBeNull();
    });
  });

  describe("toRealValue with precision", () => {
    it("should return string value in stringMode", () => {
      const result = CurrencyUtil.toRealValue(math, "123.456", 2, true);
      expect(typeof result).toBe("string");
    });

    it("should return number value by default", () => {
      const result = CurrencyUtil.toRealValue(math, "123.456", 2);
      expect(typeof result).toBe("number");
    });
  });
});
