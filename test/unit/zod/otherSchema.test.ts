import { describe, expect, it } from "vitest";
import { empty, symbol, any, unknown, never, propertyKey, anyObject, plainObject } from "@pawover/kit/zod";

describe("empty schema", () => {
  it("should parse null", () => {
    expect(empty.parse(null)).toBeNull();
  });

  it("should parse undefined", () => {
    expect(empty.parse(undefined)).toBeUndefined();
  });

  it("should reject a string", () => {
    expect(() => empty.parse("")).toThrow();
  });
});

describe("symbol schema", () => {
  it("should parse a symbol", () => {
    const s = Symbol("test");
    expect(symbol.parse(s)).toBe(s);
  });

  it("should reject a string", () => {
    expect(() => symbol.parse("symbol")).toThrow();
  });
});

describe("any schema", () => {
  it("should accept any value", () => {
    expect(any.parse("hello")).toBe("hello");
    expect(any.parse(42)).toBe(42);
    expect(any.parse(null)).toBeNull();
    expect(any.parse({})).toEqual({});
  });
});

describe("unknown schema", () => {
  it("should accept any value", () => {
    expect(unknown.parse("hello")).toBe("hello");
    expect(unknown.parse(42)).toBe(42);
    expect(unknown.parse(null)).toBeNull();
  });
});

describe("never schema", () => {
  it("should reject any value", () => {
    expect(() => never.parse("anything")).toThrow();
    expect(() => never.parse(42)).toThrow();
  });
});

describe("propertyKey schema", () => {
  it("should parse a string", () => {
    expect(propertyKey.parse("key")).toBe("key");
  });

  it("should parse a number", () => {
    expect(propertyKey.parse(0)).toBe(0);
  });

  it("should parse a symbol", () => {
    const s = Symbol("k");
    expect(propertyKey.parse(s)).toBe(s);
  });

  it("should reject an object", () => {
    expect(() => propertyKey.parse({})).toThrow();
  });
});

describe("anyObject schema", () => {
  it("should parse a record with string keys", () => {
    expect(anyObject.parse({ a: 1, b: "x" })).toEqual({ a: 1, b: "x" });
  });

  it("should reject non-object input", () => {
    expect(() => anyObject.parse("string")).toThrow();
  });
});

describe("plainObject schema", () => {
  it("should parse a record with unknown values", () => {
    expect(plainObject.parse({ a: 1, b: "x" })).toEqual({ a: 1, b: "x" });
  });

  it("should reject non-object input", () => {
    expect(() => plainObject.parse(42)).toThrow();
  });
});
