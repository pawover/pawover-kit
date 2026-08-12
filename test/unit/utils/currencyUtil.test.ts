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

    it("should return null for NaN input", () => {
      expect(CurrencyUtil.currencyFormatter(NaN, {} as never)).toBeNull();
    });

    it("should return null for non-numeric string", () => {
      const result = CurrencyUtil.currencyFormatter("abc", {
        locales: ["en-US", "en-US"],
        currencySign: "$",
        currencySignPosition: "start",
        currencyFormatOptions: { style: "currency", currency: "USD" },
      });
      expect(result).toBeNull();
    });

    it("should format negative value with sign at start", () => {
      const result = CurrencyUtil.currencyFormatter(-1234.56, {
        locales: ["en-US", "en-US"],
        currencySign: "$",
        currencySignPosition: "start",
        currencyFormatOptions: { style: "currency", currency: "USD" },
      });
      expect(result).toBe("$ -1,234.56");
    });

    it("should return plain number when currencySign is null", () => {
      const result = CurrencyUtil.currencyFormatter(1234.56, {
        locales: ["en-US", "en-US"],
        currencySign: null,
        currencySignPosition: "start",
        currencyFormatOptions: { style: "currency", currency: "USD" },
      });
      expect(result).toBe("1,234.56");
    });

    it("should keep native sign when currencySign is undefined with start position", () => {
      const result = CurrencyUtil.currencyFormatter(1234.56, {
        locales: ["en-US", "en-US"],
        currencySign: undefined,
        currencySignPosition: "start",
        currencyFormatOptions: { style: "currency", currency: "USD" },
      });
      expect(result).toBe("$ 1,234.56");
    });

    it("should keep native sign when currencySign is omitted", () => {
      const result = CurrencyUtil.currencyFormatter(1234.56, {
        locales: ["en-US", "en-US"],
        currencySignPosition: "end",
        currencyFormatOptions: { style: "currency", currency: "EUR" },
      });
      expect(result).toBe("1,234.56 €");
    });

    it("should return number text when native sign is absent", () => {
      const result = CurrencyUtil.currencyFormatter(1234.56, {
        locales: ["en-US", "en-US"],
        currencySign: undefined,
        currencySignPosition: "start",
        currencyFormatOptions: { minimumFractionDigits: 2 },
      });
      expect(result).toBe("1,234.56");
    });

    it("should fall back to native sign when currencySign is empty string", () => {
      const result = CurrencyUtil.currencyFormatter(1234.56, {
        locales: ["en-US", "en-US"],
        currencySign: "",
        currencySignPosition: "start",
        currencyFormatOptions: { style: "currency", currency: "USD" },
      });
      expect(result).toBe("$ 1,234.56");
    });

    it("should use arbitrary non-empty string as currencySign", () => {
      const result = CurrencyUtil.currencyFormatter(1234.56, {
        locales: ["en-US", "en-US"],
        currencySign: "abc",
        currencySignPosition: "start",
        currencyFormatOptions: { style: "currency", currency: "USD" },
      });
      expect(result).toBe("abc 1,234.56");
    });

    it("should ignore non-string currencySign values and fall back to native sign", () => {
      const base = {
        locales: ["en-US", "en-US"] as ["en-US", "en-US"],
        currencySignPosition: "start" as const,
        currencyFormatOptions: { style: "currency", currency: "USD" } as const,
      };
      const results = [123, 0, true, false, {}, [], Symbol("$")].map((sign) => CurrencyUtil.currencyFormatter(1234.56, { ...base, currencySign: sign as never }));
      expect(results).toEqual(["$ 1,234.56", "$ 1,234.56", "$ 1,234.56", "$ 1,234.56", "$ 1,234.56", "$ 1,234.56", "$ 1,234.56"]);
    });

    it("should fall back to plain number when non-string currencySign and no native sign", () => {
      const result = CurrencyUtil.currencyFormatter(1234.56, {
        locales: ["en-US", "en-US"],
        currencySign: 123 as never,
        currencySignPosition: "start",
        currencyFormatOptions: { minimumFractionDigits: 2 },
      });
      expect(result).toBe("1,234.56");
    });

    it("should treat invalid currencySignPosition as start", () => {
      const base = {
        locales: ["en-US", "en-US"] as ["en-US", "en-US"],
        currencySign: "$",
        currencyFormatOptions: { style: "currency", currency: "USD" } as const,
      };
      const results = ["START", "middle", "", undefined, 0, null, {}].map((position) =>
        CurrencyUtil.currencyFormatter(1234.56, {
          ...base,
          currencySignPosition: position as never,
        }),
      );
      expect(results).toEqual(["$ 1,234.56", "$ 1,234.56", "$ 1,234.56", "$ 1,234.56", "$ 1,234.56", "$ 1,234.56", "$ 1,234.56"]);
    });

    it("should keep end position for currencySignPosition end", () => {
      const result = CurrencyUtil.currencyFormatter(1234.56, {
        locales: ["en-US", "en-US"],
        currencySign: "$",
        currencySignPosition: "end",
        currencyFormatOptions: { style: "currency", currency: "USD" },
      });
      expect(result).toBe("1,234.56 $");
    });

    it("should strip bidi control marks when currencySign is null in RTL locale", () => {
      const result = CurrencyUtil.currencyFormatter(1234.56, {
        locales: ["ar-SA", "ar-SA"],
        currencySign: null,
        currencySignPosition: "start",
        currencyFormatOptions: { style: "currency", currency: "SAR" },
      });
      expect(result).toBe("١٬٢٣٤٫٥٦");
      expect(result).not.toMatch(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/);
    });

    it("should strip bidi control marks with custom sign in RTL locale", () => {
      const result = CurrencyUtil.currencyFormatter(1234.56, {
        locales: ["ar-SA", "ar-SA"],
        currencySign: "﷼",
        currencySignPosition: "start",
        currencyFormatOptions: { style: "currency", currency: "SAR" },
      });
      expect(result).toBe("﷼ ١٬٢٣٤٫٥٦");
      expect(result).not.toMatch(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/);
    });

    it("should strip bidi control marks with native sign in RTL locale", () => {
      const result = CurrencyUtil.currencyFormatter(1234.56, {
        locales: ["ar-SA", "ar-SA"],
        currencySign: undefined,
        currencySignPosition: "start",
        currencyFormatOptions: { style: "currency", currency: "SAR" },
      });
      expect(result).toBe("ر.س. ١٬٢٣٤٫٥٦");
      expect(result).not.toMatch(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/);
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

    it("should return string value by default", () => {
      const result = CurrencyUtil.toRealValue(math, "123.456", 2);
      expect(typeof result).toBe("string");
    });

    it("should return number value when stringMode is false", () => {
      const result = CurrencyUtil.toRealValue(math, "123.456", 2, false);
      expect(typeof result).toBe("number");
    });
  });
});
