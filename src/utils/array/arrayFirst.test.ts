import { describe, it, expect } from "vitest";
import { arrayFirst } from "./arrayFirst";

describe("arrayFirst", () => {
  it("should return the first element when the array has items", () => {
    expect(arrayFirst([1, 2, 3])).toBe(1);
    expect(arrayFirst(["a", "b", "c"])).toBe("a");
    expect(arrayFirst([null, "present"])).toBe(null);
    expect(arrayFirst([undefined, "present"])).toBe(undefined);
  });

  it("should return undefined when the array is empty and no saveValue is provided", () => {
    expect(arrayFirst([])).toBeUndefined();
  });

  it("should return the saveValue when the array is empty", () => {
    expect(arrayFirst([], "default")).toBe("default");
    expect(arrayFirst([], 42)).toBe(42);
    expect(arrayFirst([], null)).toBeNull();
    expect(arrayFirst([], undefined)).toBeUndefined();
  });

  it("should return undefined when the list is not an array and no saveValue is provided", () => {
    expect(arrayFirst(null as any)).toBeUndefined();
    expect(arrayFirst(undefined as any)).toBeUndefined();
  });

  it("should return the saveValue when the list is not an array", () => {
    expect(arrayFirst(null as any, "fallback")).toBe("fallback");
    expect(arrayFirst(undefined as any, 0)).toBe(0);
  });
});
