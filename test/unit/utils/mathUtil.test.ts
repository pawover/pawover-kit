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
});
