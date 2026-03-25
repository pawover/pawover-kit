import { describe, it, expect } from "vitest";
import { stringToNumber } from "./stringToNumber";

describe("stringToNumber", () => {
  it("should extract a simple integer", () => {
    expect(stringToNumber("123")).toBe("123");
    expect(stringToNumber("0")).toBe("0");
    expect(stringToNumber("456abc")).toBe("456");
  });

  it("should extract a decimal number", () => {
    expect(stringToNumber("12.34")).toBe("12.34");
    expect(stringToNumber("0.5")).toBe("0.5");
    expect(stringToNumber("100.00")).toBe("100.00");
    expect(stringToNumber("12.34.56")).toBe("12.3456"); // Second dot is removed
  });

  it("should handle negative numbers", () => {
    expect(stringToNumber("-123")).toBe("-123");
    expect(stringToNumber("--123")).toBe("123"); // Two minuses make a plus
    expect(stringToNumber("---123")).toBe("-123"); // Three minuses make a minus
    expect(stringToNumber("abc-456def")).toBe("-456");
  });

  it("should handle strings starting with a decimal point", () => {
    expect(stringToNumber(".5")).toBe("0.5");
    expect(stringToNumber("...123")).toBe("0.123"); // First dot is kept, others are removed
    expect(stringToNumber(".")).toBe("0"); // Just a dot results in 0
  });

  it("should handle strings ending with a decimal point", () => {
    expect(stringToNumber("123.")).toBe("123");
    expect(stringToNumber("456...")).toBe("456"); // Extra dots at the end are removed
  });

  it("should handle strings with various non-numeric characters", () => {
    expect(stringToNumber("$1,234.56")).toBe("1234.56");
    expect(stringToNumber("abc-123")).toBe("-123");
    expect(stringToNumber("price: -10.99 USD")).toBe("-10.99");
    expect(stringToNumber("1.2.3.4.5")).toBe("1.2345");
    expect(stringToNumber("test")).toBe("0"); // No digits found, returns "0"
  });

  it("should return \"0\" for strings with no numeric digits", () => {
    expect(stringToNumber("")).toBe("0");
    expect(stringToNumber("abc")).toBe("0");
    expect(stringToNumber("---")).toBe("-0"); // No digits, just signs
    expect(stringToNumber("...")).toBe("0"); // No digits, just dots
  });

  it("should handle edge cases with signs and decimals", () => {
    expect(stringToNumber("-.5")).toBe("-0.5");
    expect(stringToNumber("--.7")).toBe("0.7");
    expect(stringToNumber("...")).toBe("0"); // No digits
    expect(stringToNumber("-...")).toBe("-0"); // One sign, no digits
  });

  it("should handle multiple signs and ensure correct final sign", () => {
    expect(stringToNumber("-+123")).toBe("-123"); // Takes first sign, '+' is removed
    expect(stringToNumber("+-123")).toBe("-123"); // Takes first sign, '-' is kept
    expect(stringToNumber("++123")).toBe("123"); // Takes first sign, second '+' is removed
  });

  it("should return an empty string for non-string input", () => {
    // @ts-ignore Testing incorrect type on purpose
    expect(stringToNumber(null)).toBe("0");
    // @ts-ignore
    expect(stringToNumber(undefined)).toBe("0");
    // @ts-ignore
    expect(stringToNumber(123)).toBe("0");
  });
});
