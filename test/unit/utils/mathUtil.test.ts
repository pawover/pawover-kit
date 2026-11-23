import { describe, expect, it } from "vitest";
import { create, all } from "mathjs";
import { MathUtil } from "@pawover/kit/utils/math";

const math = create(all);

describe("MathUtil", () => {
  describe("toBignumber", () => {
    it("should convert a number to BigNumber", () => {
      const result = MathUtil.toBignumber(math, 42);
      expect(math.isBigNumber(result)).toBe(true);
      expect(result.toString()).toBe("42");
    });

    it("should convert a string to BigNumber", () => {
      const result = MathUtil.toBignumber(math, "0.1");
      expect(math.isBigNumber(result)).toBe(true);
    });

    it("should return fallback for null", () => {
      const result = MathUtil.toBignumber(math, null);
      expect(result.toString()).toBe("0");
    });

    it("should return fallback for Infinity", () => {
      const result = MathUtil.toBignumber(math, Infinity);
      expect(result.toString()).toBe("0");
    });

    it("should use custom fallback", () => {
      const fallback = math.bignumber(-1);
      const result = MathUtil.toBignumber(math, null, fallback);
      expect(result.toString()).toBe("-1");
    });

    it("should return errorValue for invalid input", () => {
      const result = MathUtil.toBignumber(math, undefined);
      expect(result.toString()).toBe("0");
    });

    it("should handle value that makes bignumber throw", () => {
      const result = MathUtil.toBignumber(math, Symbol("test"));
      expect(result.toString()).toBe("0");
    });

    it("should convert numeric string '0' to 0", () => {
      const result = MathUtil.toBignumber(math, "0");
      expect(result.toString()).toBe("0");
    });

    it("should return fallback for non-numeric string 'false'", () => {
      const result = MathUtil.toBignumber(math, "false");
      expect(result.toString()).toBe("0");
    });

    it("should keep the magnitude of scientific notation numbers", () => {
      expect(MathUtil.toBignumber(math, 1e-7).toString()).toBe("1e-7");
      expect(MathUtil.toBignumber(math, 1e21).toString()).toBe("1e+21");
      expect(MathUtil.toBignumber(math, 5.551115123125783e-17).toString()).toBe("5.551115123125783e-17");
    });

    it("should keep the magnitude of scientific notation strings", () => {
      expect(MathUtil.toBignumber(math, "1e-7").toString()).toBe("1e-7");
      expect(MathUtil.toBignumber(math, "-3e-7").toString()).toBe("-3e-7");
      expect(MathUtil.toBignumber(math, "1.234e21").toString()).toBe("1.234e+21");
    });

    it("should accept decimal shorthand forms", () => {
      expect(MathUtil.toBignumber(math, "1.").toString()).toBe("1");
      expect(MathUtil.toBignumber(math, "+1e-7").toString()).toBe("1e-7");
      expect(MathUtil.toBignumber(math, ".5").toString()).toBe("0.5");
    });

    it("should trim surrounding whitespace before matching", () => {
      expect(MathUtil.toBignumber(math, " 1e-7").toString()).toBe("1e-7");
      expect(MathUtil.toBignumber(math, "1e-7 ").toString()).toBe("1e-7");
      expect(MathUtil.toBignumber(math, "1e-7\n").toString()).toBe("1e-7");
    });

    it("should still extract numbers from dirty text", () => {
      expect(MathUtil.toBignumber(math, "$1,234.56").toString()).toBe("1234.56");
      expect(MathUtil.toBignumber(math, "abc-123").toString()).toBe("-123");
    });
  });

  describe("toDecimal", () => {
    it("should format a number to fixed decimal string", () => {
      const result = MathUtil.toDecimal(math, 0.12345, 2);
      expect(result).toBe("0.12");
    });

    it("should return BigNumber when isFormat is false", () => {
      const result = MathUtil.toDecimal(math, 0.12345, 2, false);
      expect(math.isBigNumber(result)).toBe(true);
    });

    it("should handle integer input", () => {
      const result = MathUtil.toDecimal(math, 42, 2);
      expect(result).toBe("42.00");
    });

    it("should round scientific notation numbers to the requested precision", () => {
      expect(MathUtil.toDecimal(math, 1e-7, 2)).toBe("0.00");
      expect(MathUtil.toDecimal(math, -3e-7, 2)).toBe("-0.00");
      expect(MathUtil.toDecimal(math, 1e21, 2)).toBe("1000000000000000000000.00");
    });

    it("should round scientific notation strings to the requested precision", () => {
      expect(MathUtil.toDecimal(math, "1e-7", 2)).toBe("0.00");
      expect(MathUtil.toDecimal(math, "1.234e21", 2)).toBe("1234000000000000000000.00");
    });

    it("should trim surrounding whitespace in numeric strings", () => {
      expect(MathUtil.toDecimal(math, " 1e-7", 2)).toBe("0.00");
      expect(MathUtil.toDecimal(math, "1e-7\n", 2)).toBe("0.00");
    });

    it("should still format numbers extracted from dirty text", () => {
      expect(MathUtil.toDecimal(math, "$1,234.5678", 2)).toBe("1234.57");
    });
  });

  describe("toEvaluate", () => {
    it("should evaluate a simple expression", () => {
      const result = MathUtil.toEvaluate(math, "a + b", { a: math.bignumber(1), b: math.bignumber(2) });
      expect(result).toBe("3");
    });

    it("should evaluate an expression without scope", () => {
      const result = MathUtil.toEvaluate(math, "2 + 3");
      expect(result).toBe("5");
    });

    it("should handle decimal results", () => {
      const result = MathUtil.toEvaluate(math, "1 / 3", {});
      expect(result).toMatch(/^0\.33/);
    });
  });

  describe("toPercent", () => {
    it("should convert a decimal to percent with four fraction digits by default", () => {
      expect(MathUtil.toPercent(0.25)).toBe(25);
      expect(MathUtil.toPercent(0.123456)).toBe(12.3456);
      expect(MathUtil.toPercent(0.1 + 0.2)).toBe(30);
    });

    it("should respect precision", () => {
      expect(MathUtil.toPercent(0.12345678, 6)).toBe(12.345678);
      expect(MathUtil.toPercent(0.256, 0)).toBe(26);
    });

    it("should clamp invalid precision instead of throwing", () => {
      expect(MathUtil.toPercent(0.25, -1)).toBe(25);
      expect(MathUtil.toPercent(0.25, Number.NaN)).toBe(25);
      expect(MathUtil.toPercent(0.25, 25)).toBe(25);
    });

    it("should return null for empty values", () => {
      expect(MathUtil.toPercent(null)).toBeNull();
      expect(MathUtil.toPercent(undefined)).toBeNull();
      expect(MathUtil.toPercent(Number.NaN)).toBeNull();
      expect(MathUtil.toPercent(Number.POSITIVE_INFINITY)).toBeNull();
      expect(MathUtil.toPercent(Number.NEGATIVE_INFINITY)).toBeNull();
    });
  });

  describe("fromPercent", () => {
    it("should convert percent to decimal with six fraction digits by default", () => {
      expect(MathUtil.fromPercent(25)).toBe(0.25);
      expect(MathUtil.fromPercent(33.3333)).toBe(0.333333);
    });

    it("should respect precision", () => {
      expect(MathUtil.fromPercent(33.3333333, 4)).toBe(0.3333);
      expect(MathUtil.fromPercent(100, 0)).toBe(1);
    });

    it("should clamp invalid precision instead of throwing", () => {
      expect(MathUtil.fromPercent(25, -1)).toBe(0);
      expect(MathUtil.fromPercent(25, Number.NaN)).toBe(0.25);
      expect(MathUtil.fromPercent(25, 25)).toBe(0.25);
    });

    it("should return null for empty values", () => {
      expect(MathUtil.fromPercent(null)).toBeNull();
      expect(MathUtil.fromPercent(undefined)).toBeNull();
      expect(MathUtil.fromPercent(Number.NaN)).toBeNull();
      expect(MathUtil.fromPercent(Number.POSITIVE_INFINITY)).toBeNull();
      expect(MathUtil.fromPercent(Number.NEGATIVE_INFINITY)).toBeNull();
    });
  });
});
