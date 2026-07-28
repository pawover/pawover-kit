import { describe, expect, it } from "vitest";
import { boolean, booleanAllowEmpty } from "@pawover/kit/zod";

describe("boolean schema", () => {
  it("should parse true", () => {
    expect(boolean.parse(true)).toBe(true);
  });

  it("should parse false", () => {
    expect(boolean.parse(false)).toBe(false);
  });

  it("should reject null", () => {
    expect(() => boolean.parse(null)).toThrow();
  });

  it("should reject undefined", () => {
    expect(() => boolean.parse(undefined)).toThrow();
  });
});

describe("booleanAllowEmpty schema", () => {
  it("should parse true", () => {
    expect(booleanAllowEmpty.parse(true)).toBe(true);
  });

  it("should parse null", () => {
    expect(booleanAllowEmpty.parse(null)).toBeNull();
  });

  it("should parse undefined", () => {
    expect(booleanAllowEmpty.parse(undefined)).toBeUndefined();
  });
});
