import { describe, expect, it } from "vitest";
import { TypeUtil } from "@pawover/kit/utils";

describe("TypeUtil", () => {
  describe("isString", () => {
    it("should return true for strings", () => {
      expect(TypeUtil.isString("abc")).toBe(true);
    });

    it("should return false for non-strings", () => {
      expect(TypeUtil.isString(123)).toBe(false);
    });

    it("should return false for empty string when checkEmpty is true", () => {
      expect(TypeUtil.isString("", true)).toBe(false);
    });

    it("should return false for whitespace-only string when checkEmpty is true", () => {
      expect(TypeUtil.isString("   ", true)).toBe(false);
    });

    it("should return true for non-empty string when checkEmpty is true", () => {
      expect(TypeUtil.isString(" a ", true)).toBe(true);
    });
  });

  describe("isNumber", () => {
    it("should return true for numbers", () => {
      expect(TypeUtil.isNumber(1)).toBe(true);
    });

    it("should return false for NaN by default", () => {
      expect(TypeUtil.isNumber(NaN)).toBe(false);
    });

    it("should return true for NaN when checkNaN is false", () => {
      expect(TypeUtil.isNumber(NaN, false)).toBe(true);
    });
  });

  describe("isNaN", () => {
    it("should return true for NaN", () => {
      expect(TypeUtil.isNaN(NaN)).toBe(true);
    });

    it("should return false for numbers", () => {
      expect(TypeUtil.isNaN(1)).toBe(false);
    });
  });

  describe("isInteger", () => {
    it("should return true for integers", () => {
      expect(TypeUtil.isInteger(1)).toBe(true);
    });

    it("should return false for floats", () => {
      expect(TypeUtil.isInteger(1.1)).toBe(false);
    });
  });

  describe("isPositiveInteger", () => {
    it("should return true for positive integers", () => {
      expect(TypeUtil.isPositiveInteger(1)).toBe(true);
    });

    it("should return false for zero", () => {
      expect(TypeUtil.isPositiveInteger(0)).toBe(false);
    });

    it("should return false for negative integers", () => {
      expect(TypeUtil.isPositiveInteger(-1)).toBe(false);
    });
  });

  describe("isNegativeInteger", () => {
    it("should return true for negative integers", () => {
      expect(TypeUtil.isNegativeInteger(-1)).toBe(true);
    });

    it("should return false for zero", () => {
      expect(TypeUtil.isNegativeInteger(0)).toBe(false);
    });
  });
});
