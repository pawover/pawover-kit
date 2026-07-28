import { describe, expect, it } from "vitest";
import { NumberUtil } from "@pawover/kit/utils";

describe("NumberUtil", () => {
  describe("within", () => {
    it("should return true when input is within the interval (inclusive left, exclusive right)", () => {
      expect(NumberUtil.within(5, [1, 10])).toBe(true);
    });

    it("should return false when input is below the interval", () => {
      expect(NumberUtil.within(0, [1, 10])).toBe(false);
    });

    it("should return false when input is above the interval", () => {
      expect(NumberUtil.within(11, [1, 10])).toBe(false);
    });

    it("should respect includeLeft = false", () => {
      expect(NumberUtil.within(1, [1, 10], false)).toBe(false);
    });

    it("should respect includeRight = true", () => {
      expect(NumberUtil.within(10, [1, 10], true, true)).toBe(true);
    });

    it("should handle includeLeft = false and includeRight = true", () => {
      expect(NumberUtil.within(1, [1, 10], false, true)).toBe(false);
      expect(NumberUtil.within(10, [1, 10], false, true)).toBe(true);
    });

    it("should handle no bounds inclusive", () => {
      expect(NumberUtil.within(5, [1, 10], false, false)).toBe(true);
      expect(NumberUtil.within(1, [1, 10], false, false)).toBe(false);
      expect(NumberUtil.within(10, [1, 10], false, false)).toBe(false);
    });

    it("should throw for non-number input", () => {
      expect(() => NumberUtil.within(NaN, [1, 10])).toThrow();
    });

    it("should throw for Infinity", () => {
      expect(() => NumberUtil.within(Infinity, [1, 10])).toThrow();
    });

    it("should throw for invalid interval", () => {
      expect(() => NumberUtil.within(5, null as unknown as [number, number])).toThrow();
    });

    it("should throw for reversed interval (left > right)", () => {
      expect(() => NumberUtil.within(5, [10, 1])).toThrow();
    });
  });
});
