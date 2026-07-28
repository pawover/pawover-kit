import { describe, expect, it } from "vitest";
import { number, numberAllowEmpty, integer, integerAllowEmpty, integerPositive, integerPositiveAllowEmpty, integerNegative, integerNegativeAllowEmpty } from "@pawover/kit/zod";

describe("number schema", () => {
  it("should parse a number", () => {
    expect(number.parse(42)).toBe(42);
  });

  it("should reject a string", () => {
    expect(() => number.parse("42")).toThrow();
  });
});

describe("integer schema", () => {
  it("should parse an integer", () => {
    expect(integer.parse(42)).toBe(42);
  });

  it("should reject a float", () => {
    expect(() => integer.parse(3.14)).toThrow();
  });
});

describe("integerPositive schema", () => {
  it("should parse a positive integer", () => {
    expect(integerPositive.parse(1)).toBe(1);
  });

  it("should parse zero", () => {
    expect(integerPositive.parse(0)).toBe(0);
  });

  it("should reject a negative integer", () => {
    expect(() => integerPositive.parse(-1)).toThrow();
  });
});

describe("integerNegative schema", () => {
  it("should parse a negative integer", () => {
    expect(integerNegative.parse(-1)).toBe(-1);
  });

  it("should parse zero", () => {
    expect(integerNegative.parse(0)).toBe(0);
  });

  it("should reject a positive integer", () => {
    expect(() => integerNegative.parse(1)).toThrow();
  });
});

describe("numberAllowEmpty schema", () => {
  it("should parse a number", () => {
    expect(numberAllowEmpty.parse(42)).toBe(42);
  });

  it("should parse null", () => {
    expect(numberAllowEmpty.parse(null)).toBeNull();
  });

  it("should parse undefined", () => {
    expect(numberAllowEmpty.parse(undefined)).toBeUndefined();
  });
});

describe("integerAllowEmpty schema", () => {
  it("should parse an integer", () => {
    expect(integerAllowEmpty.parse(42)).toBe(42);
  });

  it("should parse null", () => {
    expect(integerAllowEmpty.parse(null)).toBeNull();
  });
});

describe("integerPositiveAllowEmpty schema", () => {
  it("should parse a positive integer", () => {
    expect(integerPositiveAllowEmpty.parse(1)).toBe(1);
  });

  it("should parse null", () => {
    expect(integerPositiveAllowEmpty.parse(null)).toBeNull();
  });
});

describe("integerNegativeAllowEmpty schema", () => {
  it("should parse a negative integer", () => {
    expect(integerNegativeAllowEmpty.parse(-1)).toBe(-1);
  });

  it("should parse null", () => {
    expect(integerNegativeAllowEmpty.parse(null)).toBeNull();
  });
});
