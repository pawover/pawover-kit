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
      expect(() => NumberUtil.within(NaN, [1, 10])).toThrow("function [within]");
    });

    it("should throw for Infinity", () => {
      expect(() => NumberUtil.within(Infinity, [1, 10])).toThrow("function [within]");
    });

    it("should throw for invalid interval", () => {
      expect(() => NumberUtil.within(5, null as unknown as [number, number])).toThrow("function [within]");
    });

    it("should throw for an interval with a single bound", () => {
      expect(() => NumberUtil.within(5, [1] as unknown as [number, number])).toThrow("function [within]");
    });

    it("should throw when an interval bound is not a number", () => {
      expect(() => NumberUtil.within(5, [1, "2"] as unknown as [number, number])).toThrow("function [within]");
    });

    it("should throw when an interval bound is NaN", () => {
      expect(() => NumberUtil.within(5, [1, NaN])).toThrow("function [within]");
    });

    it("should throw when an interval bound is Infinity", () => {
      expect(() => NumberUtil.within(5, [-Infinity, Infinity])).toThrow("function [within]");
    });

    it("should throw for reversed interval (left > right)", () => {
      expect(() => NumberUtil.within(5, [10, 1])).toThrow("left (10) must be <= right (1)");
    });
  });

  describe("clamp", () => {
    it("should return the value when it is inside the interval", () => {
      expect(NumberUtil.clamp(5, [1, 10])).toBe(5);
    });

    it("should clamp to the lower bound", () => {
      expect(NumberUtil.clamp(0, [1, 10])).toBe(1);
      expect(NumberUtil.clamp(-5, [1, 10])).toBe(1);
    });

    it("should clamp to the upper bound", () => {
      expect(NumberUtil.clamp(11, [1, 10])).toBe(10);
    });

    it("should keep boundary values unchanged", () => {
      expect(NumberUtil.clamp(1, [1, 10])).toBe(1);
      expect(NumberUtil.clamp(10, [1, 10])).toBe(10);
    });

    it("should support negative intervals", () => {
      expect(NumberUtil.clamp(-5, [-10, -1])).toBe(-5);
      expect(NumberUtil.clamp(0, [-10, -1])).toBe(-1);
    });

    it("should support a single-value interval", () => {
      expect(NumberUtil.clamp(5, [3, 3])).toBe(3);
    });

    it("should throw for NaN value", () => {
      expect(() => NumberUtil.clamp(NaN, [1, 10])).toThrow("function [clamp] Expected parameter [value] to be a finite number.");
    });

    it("should throw for Infinity value", () => {
      expect(() => NumberUtil.clamp(Infinity, [1, 10])).toThrow("function [clamp] Expected parameter [value] to be a finite number.");
      expect(() => NumberUtil.clamp(-Infinity, [1, 10])).toThrow("function [clamp] Expected parameter [value] to be a finite number.");
    });

    it("should throw for null interval", () => {
      expect(() => NumberUtil.clamp(5, null as unknown as [number, number])).toThrow("function [clamp] Expected parameter [interval] to be a tuple with 2 numbers.");
    });

    it("should throw for an interval with a single bound", () => {
      expect(() => NumberUtil.clamp(5, [1] as unknown as [number, number])).toThrow("function [clamp] Expected parameter [interval] to be a tuple with 2 numbers.");
    });

    it("should throw when an interval bound is not a number", () => {
      expect(() => NumberUtil.clamp(5, [1, "2"] as unknown as [number, number])).toThrow("function [clamp] Expected parameter [interval] to be a tuple with 2 numbers.");
    });

    it("should throw when an interval bound is NaN", () => {
      expect(() => NumberUtil.clamp(5, [1, NaN])).toThrow("function [clamp] Expected parameter [interval] to be a tuple with 2 numbers.");
    });

    it("should throw when an interval bound is Infinity", () => {
      expect(() => NumberUtil.clamp(5, [-Infinity, Infinity])).toThrow("function [clamp] Expected parameter [interval] to be a tuple with 2 numbers.");
    });

    it("should throw for reversed interval", () => {
      expect(() => NumberUtil.clamp(5, [10, 1])).toThrow("left (10) must be <= right (1)");
    });
  });
});
