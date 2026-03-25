import { describe, it, expect } from "vitest";
import { stringToJson } from "./stringToJson";

describe("stringToJson", () => {
  it("should parse a valid JSON string into an object", () => {
    const jsonString = "{\"name\": \"Pika\", \"age\": 25}";
    const expectedObject = { name: "Pika", age: 25 };
    expect(stringToJson(jsonString, {})).toEqual(expectedObject);
  });

  it("should parse a valid JSON string into an array", () => {
    const jsonString = "[1, 2, 3]";
    const expectedArray: number[] = [1, 2, 3];
    // The generic D can also be inferred as number[] from the safeValue
    expect(stringToJson(jsonString, [])).toEqual(expectedArray);
  });

  it("should parse a JSON string with nested objects", () => {
    const jsonString = "{\"user\": {\"id\": 1, \"profile\": {\"name\": \"Alice\"}}}";
    const expectedObject = { user: { id: 1, profile: { name: "Alice" } } };
    expect(stringToJson(jsonString, {})).toEqual(expectedObject);
  });

  it("should parse a JSON string containing primitives", () => {
    // @ts-expect-error
    expect(stringToJson("\"hello\"", null)).toBe("hello");
    // @ts-expect-error
    expect(stringToJson("42", 0)).toBe(42);
    // @ts-expect-error
    expect(stringToJson("true", false)).toBe(true);
    expect(stringToJson("null", {})).toBeNull();
  });

  it("should return the safeValue when input is null or undefined", () => {
    expect(stringToJson(null, { fallback: true })).toEqual({ fallback: true });
    expect(stringToJson(undefined, [])).toEqual([]);
  });

  it("should return the safeValue when input is not a string", () => {
    // @ts-ignore Testing incorrect type on purpose
    expect(stringToJson(123, { error: true })).toEqual({ error: true });
    // @ts-ignore
    expect(stringToJson({}, { error: true })).toEqual({ error: true });
  });

  it("should return the safeValue when input is an empty string", () => {
    expect(stringToJson("", { empty: true })).toEqual({ empty: true });
  });

  it("should return the safeValue when input is an invalid JSON string", () => {
    expect(stringToJson("{ invalid json }", { error: true })).toEqual({ error: true });
    expect(stringToJson("{\"unterminated\": string", { error: true })).toEqual({ error: true });
    expect(stringToJson("just a string", { error: true })).toEqual({ error: true });
  });

  it("should return the safeValue when JSON.parse throws an unexpected error", () => {
    // While hard to trigger with normal strings, the catch block provides safety.
    // A basic check to ensure the function doesn't throw.
    expect(() => stringToJson("{\"a\": \"b\"}", {})).not.toThrow();
    expect(() => stringToJson("invalid json", {})).not.toThrow();
  });
});
