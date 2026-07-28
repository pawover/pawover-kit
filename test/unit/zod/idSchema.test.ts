import { describe, expect, it } from "vitest";
import { id, idAllowEmpty } from "@pawover/kit/zod";

describe("id schema", () => {
  it("should parse a non-empty string", () => {
    expect(id.parse("abc")).toBe("abc");
  });

  it("should parse a number", () => {
    expect(id.parse(123)).toBe(123);
  });

  it("should reject an empty string", () => {
    expect(() => id.parse("")).toThrow();
  });

  it("should reject null", () => {
    expect(() => id.parse(null)).toThrow();
  });

  it("should reject undefined", () => {
    expect(() => id.parse(undefined)).toThrow();
  });
});

describe("idAllowEmpty schema", () => {
  it("should parse a non-empty string", () => {
    expect(idAllowEmpty.parse("abc")).toBe("abc");
  });

  it("should parse null", () => {
    expect(idAllowEmpty.parse(null)).toBeNull();
  });

  it("should parse undefined", () => {
    expect(idAllowEmpty.parse(undefined)).toBeUndefined();
  });
});
