import { describe, expect, it } from "vitest";
import { bigint, bigintAllowEmpty, bigintPositive, bigintPositiveAllowEmpty, bigintNegative, bigintNegativeAllowEmpty } from "@pawover/kit/zod";

describe("bigint schema", () => {
  it("should parse a bigint", () => {
    expect(bigint.parse(42n)).toBe(42n);
  });

  it("should reject a number", () => {
    expect(() => bigint.parse(42)).toThrow();
  });
});

describe("bigintAllowEmpty schema", () => {
  it("should parse a bigint", () => {
    expect(bigintAllowEmpty.parse(42n)).toBe(42n);
  });

  it("should parse null", () => {
    expect(bigintAllowEmpty.parse(null)).toBeNull();
  });
});

describe("bigintPositive schema", () => {
  it("should parse a positive bigint", () => {
    expect(bigintPositive.parse(1n)).toBe(1n);
  });

  it("should parse zero", () => {
    expect(bigintPositive.parse(0n)).toBe(0n);
  });

  it("should reject a negative bigint", () => {
    expect(() => bigintPositive.parse(-1n)).toThrow();
  });
});

describe("bigintPositiveAllowEmpty schema", () => {
  it("should parse a positive bigint", () => {
    expect(bigintPositiveAllowEmpty.parse(1n)).toBe(1n);
  });

  it("should parse null", () => {
    expect(bigintPositiveAllowEmpty.parse(null)).toBeNull();
  });
});

describe("bigintNegative schema", () => {
  it("should parse a negative bigint", () => {
    expect(bigintNegative.parse(-1n)).toBe(-1n);
  });

  it("should parse zero", () => {
    expect(bigintNegative.parse(0n)).toBe(0n);
  });

  it("should reject a positive bigint", () => {
    expect(() => bigintNegative.parse(1n)).toThrow();
  });
});

describe("bigintNegativeAllowEmpty schema", () => {
  it("should parse a negative bigint", () => {
    expect(bigintNegativeAllowEmpty.parse(-1n)).toBe(-1n);
  });

  it("should parse null", () => {
    expect(bigintNegativeAllowEmpty.parse(null)).toBeNull();
  });
});
