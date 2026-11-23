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

    it("should round scientific notation numbers to zero", () => {
      expect(CurrencyUtil.toRealValue(math, 1e-7, 2, false)).toBe(0);
      expect(CurrencyUtil.toRealValue(math, -3e-7, 2, false)).toBe(0);
      expect(CurrencyUtil.toRealValue(math, 1.5e-7, 2, false)).toBe(0);
      expect(CurrencyUtil.toRealValue(math, 9.99e-7, 2, false)).toBe(0);
      expect(CurrencyUtil.toRealValue(math, 5.551115123125783e-17, 2, false)).toBe(0);
    });

    it("should keep the magnitude of large scientific notation numbers", () => {
      expect(CurrencyUtil.toRealValue(math, 1e21, 2, false)).toBe(1e21);
      expect(CurrencyUtil.toRealValue(math, 2e21, 2, false)).toBe(2e21);
      expect(CurrencyUtil.toRealValue(math, 1.234e21, 2, false)).toBe(1.234e21);
    });

    it("should keep normal magnitudes unchanged", () => {
      expect(CurrencyUtil.toRealValue(math, 1234.5678, 2, false)).toBe(1234.57);
    });

    it("should round scientific notation in string mode", () => {
      expect(CurrencyUtil.toRealValue(math, 1e-7, 2)).toBe("0.00");
      expect(CurrencyUtil.toRealValue(math, -3e-7, 2)).toBe("-0.00");
      expect(CurrencyUtil.toRealValue(math, "5.551115123125783e-17", 2)).toBe("0.00");
      expect(CurrencyUtil.toRealValue(math, 1e21, 2)).toBe("1000000000000000000000.00");
    });

    it("should trim surrounding whitespace in numeric strings", () => {
      expect(CurrencyUtil.toRealValue(math, " 1e-7", 2)).toBe("0.00");
      expect(CurrencyUtil.toRealValue(math, "1e-7 ", 2, false)).toBe(0);
      expect(CurrencyUtil.toRealValue(math, "1e-7\n", 2, false)).toBe(0);
    });

    it("should still extract numbers from dirty text", () => {
      expect(CurrencyUtil.toRealValue(math, "$1,234.5678", 2, false)).toBe(1234.57);
    });
  });

  describe("resolveSymbol", () => {
    it("should resolve common currency symbols", () => {
      expect(CurrencyUtil.resolveSymbol("USD")).toBe("$");
      expect(CurrencyUtil.resolveSymbol("CNY")).toBe("¥");
      expect(CurrencyUtil.resolveSymbol("EUR")).toBe("€");
    });

    it("should return null for unknown currency code", () => {
      expect(CurrencyUtil.resolveSymbol("XYZ")).toBeNull();
      expect(CurrencyUtil.resolveSymbol("XYZ", "si-LK")).toBeNull();
    });

    it("should use the given locale for the symbol", () => {
      expect(CurrencyUtil.resolveSymbol("LKR", "si-LK")).toBe("රු.");
      expect(CurrencyUtil.resolveSymbol("LKR", "ta-LK")).toBe("Rs.");
      expect(CurrencyUtil.resolveSymbol("lkr", "si-LK")).toBe("රු.");
      expect(CurrencyUtil.resolveSymbol("LKR", ["zz-ZZ", "si-LK"])).toBe("රු.");
      expect(CurrencyUtil.resolveSymbol("CNY", "en-US")).toBe("CN¥");
    });

    it("should keep the default locale when locale is omitted", () => {
      expect(CurrencyUtil.resolveSymbol("USD")).toBe("$");
      expect(CurrencyUtil.resolveSymbol("LKR")).toBe("LKR");
    });

    it("should return null for malformed currency code", () => {
      expect(CurrencyUtil.resolveSymbol("US")).toBeNull();
      expect(CurrencyUtil.resolveSymbol("")).toBeNull();
    });

    it("should strip bidi control marks from rtl symbols", () => {
      const symbol = CurrencyUtil.resolveSymbol("SAR");
      expect(symbol).toBe("ر.س.");
      expect(symbol).not.toMatch(/[\u200E\u200F\u202A-\u202E\u2066-\u2069]/);
    });

    it("should derive symbol from en-US for ISO codes outside CURRENCY_ENUM", () => {
      expect(CurrencyUtil.resolveSymbol("XCD")).toBe("EC$");
    });

    it("should accept lowercase currency code", () => {
      expect(CurrencyUtil.resolveSymbol("usd")).toBe("$");
      expect(CurrencyUtil.resolveSymbol("Cny")).toBe("¥");
    });
  });

  describe("numberFormat", () => {
    it("should group digits and keep two fraction digits by default", () => {
      expect(CurrencyUtil.numberFormat(1234.5)).toBe("1,234.50");
      expect(CurrencyUtil.numberFormat(0)).toBe("0.00");
      expect(CurrencyUtil.numberFormat(-0)).toBe("0.00");
      expect(CurrencyUtil.numberFormat(-1234.5)).toBe("-1,234.50");
      expect(CurrencyUtil.numberFormat(1234.567)).toBe("1,234.57");
    });

    it("should return empty string for empty values by default", () => {
      expect(CurrencyUtil.numberFormat(null)).toBe("");
      expect(CurrencyUtil.numberFormat(undefined)).toBe("");
      expect(CurrencyUtil.numberFormat(Number.NaN)).toBe("");
      expect(CurrencyUtil.numberFormat(Number.POSITIVE_INFINITY)).toBe("");
      expect(CurrencyUtil.numberFormat(Number.NEGATIVE_INFINITY)).toBe("");
    });

    it("should use custom empty text", () => {
      expect(CurrencyUtil.numberFormat(null, { emptyText: "N/A" })).toBe("N/A");
      expect(CurrencyUtil.numberFormat(undefined, { emptyText: "—" })).toBe("—");
    });

    it("should format digits with the given locale", () => {
      expect(CurrencyUtil.numberFormat(1234.5, { locale: "de-DE" })).toBe("1.234,50");
      expect(CurrencyUtil.numberFormat(1234.5, { locale: ["de-DE", "en-US"] })).toBe("1.234,50");
    });

    it("should strip bidi marks from rtl locale output", () => {
      const result = CurrencyUtil.numberFormat(-1234.5, { locale: "ar-SA" });
      expect(result).toBe("-١٬٢٣٤٫٥٠");
      expect(result).not.toMatch(/[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/);
    });

    it("should trim trailing zeros when minimum fraction digits is zero", () => {
      expect(CurrencyUtil.numberFormat(1234.5, { minimumFractionDigits: 0, maximumFractionDigits: 2 })).toBe("1,234.5");
    });

    it("should cover compact and trailing-zero formatting via fraction options", () => {
      expect(CurrencyUtil.numberFormat(400, { minimumFractionDigits: 0, maximumFractionDigits: 2 })).toBe("400");
      expect(CurrencyUtil.numberFormat(400.5, { minimumFractionDigits: 0, maximumFractionDigits: 2 })).toBe("400.5");
      expect(CurrencyUtil.numberFormat(1234.567, { minimumFractionDigits: 0, maximumFractionDigits: 2 })).toBe("1,234.57");
      expect(CurrencyUtil.numberFormat(1234.5, { minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: false })).toBe("1234.5");
    });

    it("should follow maximum fraction digits when minimum is omitted", () => {
      expect(CurrencyUtil.numberFormat(1234.567, { maximumFractionDigits: 1 })).toBe("1,234.6");
      expect(CurrencyUtil.numberFormat(1234.567, { maximumFractionDigits: 0 })).toBe("1,235");
    });

    it("should disable grouping", () => {
      expect(CurrencyUtil.numberFormat(1234.5, { useGrouping: false })).toBe("1234.50");
    });

    it("should clamp minimum fraction digits to maximum fraction digits", () => {
      expect(CurrencyUtil.numberFormat(1234.5, { minimumFractionDigits: 5, maximumFractionDigits: 2 })).toBe("1,234.50");
    });

    it("should clamp invalid fraction digits instead of throwing", () => {
      expect(CurrencyUtil.numberFormat(1234.5, { maximumFractionDigits: -1 })).toBe("1,235");
      expect(CurrencyUtil.numberFormat(1234.5, { minimumFractionDigits: -1, maximumFractionDigits: 2 })).toBe("1,234.5");
      expect(CurrencyUtil.numberFormat(1234.5, { maximumFractionDigits: Number.NaN })).toBe("1,234.50");
      expect(CurrencyUtil.numberFormat(1234.5, { minimumFractionDigits: Number.NaN })).toBe("1,234.50");
      expect(CurrencyUtil.numberFormat(1234.567, { maximumFractionDigits: 1.5 })).toBe("1,234.6");
    });

    it("should cap fraction digits at 20", () => {
      expect(CurrencyUtil.numberFormat(1234.5, { minimumFractionDigits: 25, maximumFractionDigits: 25 })).toBe("1,234.50000000000000000000");
    });
  });

  describe("moneyFormat", () => {
    it("should put sign after symbol with a space by default", () => {
      expect(CurrencyUtil.moneyFormat(1234.5)).toBe("$ 1,234.50");
      expect(CurrencyUtil.moneyFormat(0)).toBe("$ 0.00");
      expect(CurrencyUtil.moneyFormat(-0)).toBe("$ 0.00");
      expect(CurrencyUtil.moneyFormat(-1234.5)).toBe("$ -1,234.50");
    });

    it("should remove spacing between symbol and amount", () => {
      expect(CurrencyUtil.moneyFormat(1234.5, { spacing: "none" })).toBe("$1,234.50");
      expect(CurrencyUtil.moneyFormat(-1234.5, { spacing: "none" })).toBe("$-1,234.50");
    });

    it("should place minus sign before symbol", () => {
      expect(CurrencyUtil.moneyFormat(-1234.5, { signPlacement: "beforeSymbol" })).toBe("-$ 1,234.50");
      expect(CurrencyUtil.moneyFormat(1234.5, { signPlacement: "beforeSymbol" })).toBe("$ 1,234.50");
      expect(CurrencyUtil.moneyFormat(-1234.5, { signPlacement: "beforeSymbol", spacing: "none" })).toBe("-$1,234.50");
    });

    it("should resolve symbol from currency code", () => {
      expect(CurrencyUtil.moneyFormat(1234.5, { currency: "CNY" })).toBe("¥ 1,234.50");
      expect(CurrencyUtil.moneyFormat(1234.5, { currency: "EUR" })).toBe("€ 1,234.50");
    });

    it("should accept lowercase currency code", () => {
      expect(CurrencyUtil.moneyFormat(1234.5, { currency: "cny" })).toBe("¥ 1,234.50");
      expect(CurrencyUtil.moneyFormat(1234.5, { currency: "xyz" })).toBe("XYZ 1,234.50");
    });

    it("should fall back to currency code for unknown currency", () => {
      expect(CurrencyUtil.moneyFormat(1234.5, { currency: "XYZ" })).toBe("XYZ 1,234.50");
    });

    it("should prefer explicit symbol", () => {
      expect(CurrencyUtil.moneyFormat(1234.5, { symbol: "HK$" })).toBe("HK$ 1,234.50");
      expect(CurrencyUtil.moneyFormat(1234.5, { symbol: "" })).toBe("1,234.50");
    });

    it("should respect fraction digits", () => {
      expect(CurrencyUtil.moneyFormat(1234.5, { fractionDigits: 0 })).toBe("$ 1,235");
    });

    it("should clamp invalid fraction digits instead of throwing", () => {
      expect(CurrencyUtil.moneyFormat(1234.5, { fractionDigits: -1 })).toBe("$ 1,235");
      expect(CurrencyUtil.moneyFormat(1234.5, { fractionDigits: Number.NaN })).toBe("$ 1,234.50");
    });

    it("should cap fraction digits at 20", () => {
      expect(CurrencyUtil.moneyFormat(1234.5, { fractionDigits: 25 })).toBe("$ 1,234.50000000000000000000");
    });

    it("should format digits with the given locale without changing the symbol", () => {
      expect(CurrencyUtil.moneyFormat(1234.5, { locale: "de-DE" })).toBe("$ 1.234,50");
      expect(CurrencyUtil.moneyFormat(1234.5, { locale: "de-DE", currency: "CNY" })).toBe("¥ 1.234,50");
      expect(CurrencyUtil.moneyFormat(-1234.5, { locale: "de-DE" })).toBe("$ -1.234,50");
    });

    it("should move locale minus sign before the symbol", () => {
      expect(CurrencyUtil.moneyFormat(-1234.5, { locale: "sv-SE", signPlacement: "beforeSymbol" })).toBe("−$ 1\u00A0234,50");
      expect(CurrencyUtil.moneyFormat(-1234.5, { locale: "fi-FI", signPlacement: "beforeSymbol" })).toBe("−$ 1\u00A0234,50");
      expect(CurrencyUtil.moneyFormat(-1234.5, { locale: "sv-SE", signPlacement: "beforeSymbol", spacing: "none" })).toBe("−$1\u00A0234,50");
      expect(CurrencyUtil.moneyFormat(-1234.5, { locale: "sv-SE" })).toBe("$ −1\u00A0234,50");
    });

    it("should move rtl minus sign before the symbol", () => {
      expect(CurrencyUtil.moneyFormat(-1234.5, { locale: "ar-SA", signPlacement: "beforeSymbol" })).toBe("-$ ١٬٢٣٤٫٥٠");
      expect(CurrencyUtil.moneyFormat(-1234.5, { locale: "ar-SA" })).toBe("$ -١٬٢٣٤٫٥٠");
    });

    it("should accept a locale array without changing the symbol", () => {
      expect(CurrencyUtil.moneyFormat(1234.5, { locale: ["de-DE", "en-US"], currency: "CNY" })).toBe("¥ 1.234,50");
    });

    it("should show signs according to signDisplay", () => {
      expect(CurrencyUtil.moneyFormat(1234.5, { signDisplay: "always" })).toBe("$ +1,234.50");
      expect(CurrencyUtil.moneyFormat(-1234.5, { signDisplay: "always" })).toBe("$ -1,234.50");
      expect(CurrencyUtil.moneyFormat(0, { signDisplay: "always" })).toBe("$ +0.00");
      expect(CurrencyUtil.moneyFormat(1234.5, { signDisplay: "exceptZero" })).toBe("$ +1,234.50");
      expect(CurrencyUtil.moneyFormat(-1234.5, { signDisplay: "exceptZero" })).toBe("$ -1,234.50");
      expect(CurrencyUtil.moneyFormat(0, { signDisplay: "exceptZero" })).toBe("$ 0.00");
    });

    it("should keep default auto behavior without signs for positives", () => {
      expect(CurrencyUtil.moneyFormat(1234.5)).toBe("$ 1,234.50");
      expect(CurrencyUtil.moneyFormat(0)).toBe("$ 0.00");
      expect(CurrencyUtil.moneyFormat(-1234.5)).toBe("$ -1,234.50");
    });

    it("should place sign before symbol when signPlacement is beforeSymbol", () => {
      expect(CurrencyUtil.moneyFormat(1234.5, { signDisplay: "always", signPlacement: "beforeSymbol" })).toBe("+$ 1,234.50");
      expect(CurrencyUtil.moneyFormat(-1234.5, { signDisplay: "always", signPlacement: "beforeSymbol" })).toBe("-$ 1,234.50");
    });

    it("should override the minus sign", () => {
      expect(CurrencyUtil.moneyFormat(-1234.5, { minusSign: "−" })).toBe("$ −1,234.50");
      expect(CurrencyUtil.moneyFormat(-1234.5, { minusSign: "-" })).toBe("$ -1,234.50");
      expect(CurrencyUtil.moneyFormat(-1234.5, { minusSign: "−", signPlacement: "beforeSymbol" })).toBe("−$ 1,234.50");
      expect(CurrencyUtil.moneyFormat(-1234.5, { locale: "sv-SE", minusSign: "-", signPlacement: "beforeSymbol" })).toBe("-$ 1\u00A0234,50");
    });

    it("should cover the signed money format equivalent", () => {
      const signedOptions = { signDisplay: "always", minusSign: "−", signPlacement: "beforeSymbol", spacing: "none" } as const;

      expect(CurrencyUtil.moneyFormat(1234.5, signedOptions)).toBe("+$1,234.50");
      expect(CurrencyUtil.moneyFormat(-1234.5, signedOptions)).toBe("−$1,234.50");
      expect(CurrencyUtil.moneyFormat(0, signedOptions)).toBe("+$0.00");
    });

    it("should return empty string for empty values by default", () => {
      expect(CurrencyUtil.moneyFormat(null)).toBe("");
      expect(CurrencyUtil.moneyFormat(undefined)).toBe("");
      expect(CurrencyUtil.moneyFormat(Number.NaN)).toBe("");
      expect(CurrencyUtil.moneyFormat(Number.POSITIVE_INFINITY)).toBe("");
      expect(CurrencyUtil.moneyFormat(Number.NEGATIVE_INFINITY)).toBe("");
    });

    it("should use custom empty text", () => {
      expect(CurrencyUtil.moneyFormat(undefined, { emptyText: "N/A" })).toBe("N/A");
      expect(CurrencyUtil.moneyFormat(null, { emptyText: "—" })).toBe("—");
    });
  });

  describe("integerFormat", () => {
    it("should round and group without fraction digits", () => {
      expect(CurrencyUtil.integerFormat(1234.5678)).toBe("1,235");
      expect(CurrencyUtil.integerFormat(0)).toBe("0");
      expect(CurrencyUtil.integerFormat(-1234.5)).toBe("-1,234");
    });

    it("should round half values toward positive infinity", () => {
      expect(CurrencyUtil.integerFormat(2.5)).toBe("3");
      expect(CurrencyUtil.integerFormat(-2.5)).toBe("-2");
    });

    it("should format negative zero as zero", () => {
      expect(CurrencyUtil.integerFormat(-0)).toBe("0");
      expect(CurrencyUtil.integerFormat(-0.5)).toBe("0");
      expect(CurrencyUtil.integerFormat(-0.4)).toBe("0");
    });

    it("should format digits with the given locale", () => {
      expect(CurrencyUtil.integerFormat(1234.5678, { locale: "de-DE" })).toBe("1.235");
      expect(CurrencyUtil.integerFormat(1234.5678, { locale: ["de-DE", "en-US"] })).toBe("1.235");
    });

    it("should disable grouping", () => {
      expect(CurrencyUtil.integerFormat(1234.5678, { useGrouping: false })).toBe("1235");
    });

    it("should return empty string for empty values by default", () => {
      expect(CurrencyUtil.integerFormat(null)).toBe("");
      expect(CurrencyUtil.integerFormat(undefined)).toBe("");
      expect(CurrencyUtil.integerFormat(Number.NaN)).toBe("");
      expect(CurrencyUtil.integerFormat(Number.POSITIVE_INFINITY)).toBe("");
      expect(CurrencyUtil.integerFormat(Number.NEGATIVE_INFINITY)).toBe("");
    });

    it("should use custom empty text", () => {
      expect(CurrencyUtil.integerFormat(null, { emptyText: "—" })).toBe("—");
    });
  });

  describe("percentFormat", () => {
    it("should format a decimal as percent with one fraction digit", () => {
      expect(CurrencyUtil.percentFormat(0.25)).toBe("25.0%");
      expect(CurrencyUtil.percentFormat(0)).toBe("0.0%");
      expect(CurrencyUtil.percentFormat(0.2567)).toBe("25.7%");
      expect(CurrencyUtil.percentFormat(-0.05)).toBe("-5.0%");
      expect(CurrencyUtil.percentFormat(1.5)).toBe("150.0%");
    });

    it("should format percent with the given locale", () => {
      expect(CurrencyUtil.percentFormat(0.25, { locale: "de-DE" })).toBe("25,0\u00A0%");
    });

    it("should respect fraction digits", () => {
      expect(CurrencyUtil.percentFormat(0.2567, { fractionDigits: 0 })).toBe("26%");
      expect(CurrencyUtil.percentFormat(0.2567, { fractionDigits: 2 })).toBe("25.67%");
      expect(CurrencyUtil.percentFormat(0.2567, { fractionDigits: -1 })).toBe("26%");
      expect(CurrencyUtil.percentFormat(0.2567, { fractionDigits: Number.NaN })).toBe("25.7%");
    });

    it("should group digits by default and allow disabling grouping", () => {
      expect(CurrencyUtil.percentFormat(12.3456, { fractionDigits: 1 })).toBe("1,234.6%");
      expect(CurrencyUtil.percentFormat(12.3456, { fractionDigits: 1, useGrouping: false })).toBe("1234.6%");
    });

    it("should show locale sign when enabled", () => {
      expect(CurrencyUtil.percentFormat(0.25, { locale: "de-DE", showSign: true })).toBe("+25,0\u00A0%");
    });

    it("should show sign when enabled", () => {
      expect(CurrencyUtil.percentFormat(0.25, { showSign: true })).toBe("+25.0%");
      expect(CurrencyUtil.percentFormat(-0.05, { showSign: true })).toBe("-5.0%");
      expect(CurrencyUtil.percentFormat(0, { showSign: true })).toBe("+0.0%");
    });

    it("should format negative zero as zero", () => {
      expect(CurrencyUtil.percentFormat(-0)).toBe("0.0%");
      expect(CurrencyUtil.percentFormat(-0, { showSign: true })).toBe("+0.0%");
    });

    it("should return empty string for empty values by default", () => {
      expect(CurrencyUtil.percentFormat(null)).toBe("");
      expect(CurrencyUtil.percentFormat(undefined)).toBe("");
      expect(CurrencyUtil.percentFormat(Number.NaN)).toBe("");
      expect(CurrencyUtil.percentFormat(Number.POSITIVE_INFINITY)).toBe("");
      expect(CurrencyUtil.percentFormat(Number.NEGATIVE_INFINITY)).toBe("");
    });

    it("should use custom empty text", () => {
      expect(CurrencyUtil.percentFormat(null, { emptyText: "—" })).toBe("—");
    });
  });

  describe("percentText", () => {
    it("should format a percent value with sign by default", () => {
      expect(CurrencyUtil.percentText(25)).toBe("+25.0%");
      expect(CurrencyUtil.percentText(-12.34)).toBe("-12.3%");
      expect(CurrencyUtil.percentText(1.55)).toBe("+1.6%");
    });

    it("should not sign zero by default", () => {
      expect(CurrencyUtil.percentText(0)).toBe("0.0%");
      expect(CurrencyUtil.percentText(0, { zeroSign: true })).toBe("+0.0%");
    });

    it("should keep the sign when rounding to zero", () => {
      expect(CurrencyUtil.percentText(0.04)).toBe("+0.0%");
      expect(CurrencyUtil.percentText(-0.04)).toBe("-0.0%");
    });

    it("should omit the plus sign when showSign is false", () => {
      expect(CurrencyUtil.percentText(25, { showSign: false })).toBe("25.0%");
      expect(CurrencyUtil.percentText(0.04, { showSign: false })).toBe("0.0%");
      expect(CurrencyUtil.percentText(-12.34, { showSign: false })).toBe("-12.3%");
    });

    it("should respect fraction digits", () => {
      expect(CurrencyUtil.percentText(12.345, { fractionDigits: 0 })).toBe("+12%");
    });

    it("should group digits by default and allow disabling grouping", () => {
      expect(CurrencyUtil.percentText(12345.6)).toBe("+12,345.6%");
      expect(CurrencyUtil.percentText(12345.6, { useGrouping: false })).toBe("+12345.6%");
    });

    it("should format percent with the given locale", () => {
      expect(CurrencyUtil.percentText(25, { locale: "de-DE" })).toBe("+25,0\u00A0%");
    });

    it("should return empty string for empty values by default", () => {
      expect(CurrencyUtil.percentText(null)).toBe("");
      expect(CurrencyUtil.percentText(undefined)).toBe("");
      expect(CurrencyUtil.percentText(Number.NaN)).toBe("");
      expect(CurrencyUtil.percentText(Number.POSITIVE_INFINITY)).toBe("");
      expect(CurrencyUtil.percentText(Number.NEGATIVE_INFINITY)).toBe("");
    });

    it("should use custom empty text", () => {
      expect(CurrencyUtil.percentText(null, { emptyText: "—" })).toBe("—");
    });
  });
});
