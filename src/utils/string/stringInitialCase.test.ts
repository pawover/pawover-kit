import { describe, it, expect } from "vitest";
import { stringInitialCase } from "./stringInitialCase";

describe("stringInitialCase", () => {
  it("should convert the first letter of a word to uppercase by default", () => {
    expect(stringInitialCase("hello", "upper")).toBe("Hello");
    expect(stringInitialCase("hELLO", "upper")).toBe("HELLO"); // Not all caps, so first letter changes
    expect(stringInitialCase("world", "upper")).toBe("World");
  });

  it("should convert the first letter of a word to lowercase", () => {
    expect(stringInitialCase("Hello", "lower")).toBe("hello");
    expect(stringInitialCase("WoRLd", "lower")).toBe("woRLd");
    expect(stringInitialCase("HELLO", "lower")).toBe("HELLO"); // All caps, so it's preserved
  });

  it("should handle multiple words in a string", () => {
    expect(stringInitialCase("hello world", "upper")).toBe("Hello World");
    expect(stringInitialCase("HELLO world again", "upper")).toBe("HELLO World Again");
    expect(stringInitialCase("hello WORLD test", "lower")).toBe("hello WORLD test");
  });

  it("should not modify words that are already all uppercase", () => {
    expect(stringInitialCase("HELLO", "upper")).toBe("HELLO");
    expect(stringInitialCase("HELLO WORLD", "lower")).toBe("HELLO WORLD");
    // Mixed -> mixed (not all caps), HELLO -> HELLO (all caps), World -> world (not all caps)
    expect(stringInitialCase("Mixed HELLO World", "lower")).toBe("mixed HELLO world");
  });

  it("should not modify words that contain truly non-Western European characters (e.g., Chinese, numbers, symbols)", () => {
    // Words with accents like é, ñ are considered Western European, so they get modified.
    // Only truly non-Western chars should be left untouched.
    expect(stringInitialCase("你好 world", "upper")).toBe("你好 World"); // Contains Chinese
    expect(stringInitialCase("hello123", "upper")).toBe("hello123"); // Contains numbers
    expect(stringInitialCase("hello-world", "upper")).toBe("hello-world"); // Contains hyphen
    expect(stringInitialCase("test@email.com", "upper")).toBe("test@email.com"); // Contains @ and .
  });

  it("should modify words that contain Western European accented characters", () => {
    // As per code logic, accented chars like é, ñ are within the allowed range.
    expect(stringInitialCase("héllo", "upper")).toBe("Héllo"); // This gets modified
    expect(stringInitialCase("naïve", "lower")).toBe("naïve"); // Already starts with lower
    expect(stringInitialCase("naïve", "upper")).toBe("Naïve"); // Gets modified
  });

  it("should not modify anything if caseType is undefined", () => {
    expect(stringInitialCase("hello")).toBe("hello");
    expect(stringInitialCase("Hello")).toBe("Hello");
    expect(stringInitialCase("HELLO")).toBe("HELLO");
    expect(stringInitialCase("hello world")).toBe("hello world");
  });

  it("should return an empty string if the input is not a valid string", () => {
    // @ts-ignore Testing incorrect type on purpose
    expect(stringInitialCase(null)).toBe("");
    // @ts-ignore
    expect(stringInitialCase(undefined)).toBe("");
    // @ts-ignore
    expect(stringInitialCase(123)).toBe("");
  });

  it("should return an empty string if the input is an empty string", () => {
    expect(stringInitialCase("")).toBe("");
  });

  it("should handle leading, trailing, and multiple internal spaces", () => {
    expect(stringInitialCase("  hello  world  ", "upper")).toBe("  Hello  World  ");
    expect(stringInitialCase("\thello\nworld\r", "upper")).toBe("\tHello\nWorld\r");
  });

  it("should handle punctuation attached to words", () => {
    // Punctuation makes the word have non-Western characters, so it's left untouched
    expect(stringInitialCase("hello,", "upper")).toBe("hello,");
    expect(stringInitialCase("(hello)", "upper")).toBe("(hello)");
    expect(stringInitialCase("don't", "upper")).toBe("don't");
  });

});
