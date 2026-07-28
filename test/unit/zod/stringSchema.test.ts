import { describe, expect, it } from "vitest";
import { string, stringNoEmpty, stringAllowEmpty, stringEmpty } from "@pawover/kit/zod";

describe("string schema", () => {
  it("should parse any string", () => {
    expect(string.parse("hello")).toBe("hello");
  });

  it("should parse empty string", () => {
    expect(string.parse("")).toBe("");
  });
});

describe("stringNoEmpty schema", () => {
  it("should parse non-empty string", () => {
    expect(stringNoEmpty.parse("hello")).toBe("hello");
  });

  it("should reject empty string", () => {
    expect(() => stringNoEmpty.parse("")).toThrow();
  });
});

describe("stringAllowEmpty schema", () => {
  it("should parse string", () => {
    expect(stringAllowEmpty.parse("hello")).toBe("hello");
  });

  it("should parse null", () => {
    expect(stringAllowEmpty.parse(null)).toBeNull();
  });

  it("should parse undefined", () => {
    expect(stringAllowEmpty.parse(undefined)).toBeUndefined();
  });
});

describe("stringEmpty schema", () => {
  it("should parse empty string", () => {
    expect(stringEmpty.parse("")).toBe("");
  });

  it("should parse null", () => {
    expect(stringEmpty.parse(null)).toBeNull();
  });

  it("should reject non-empty string", () => {
    expect(() => stringEmpty.parse("hello")).toThrow();
  });
});
