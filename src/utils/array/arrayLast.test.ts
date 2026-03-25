import { describe, it, expect } from "vitest";
import { arrayLast } from "./arrayLast";

describe("arrayLast", () => {
  it("should return the last element when the array has items", () => {
    expect(arrayLast([1, 2, 3])).toBe(3);
    expect(arrayLast(["a", "b", "c"])).toBe("c");
    expect(arrayLast([null, "present"])).toBe("present");
    expect(arrayLast(["present", undefined])).toBeUndefined();
  });

  it("should return undefined when the array is empty and no saveValue is provided", () => {
    expect(arrayLast([])).toBeUndefined();
  });

  it("should return the saveValue when the array is empty", () => {
    expect(arrayLast([], "default")).toBe("default");
    expect(arrayLast([], 42)).toBe(42);
    expect(arrayLast([], null)).toBeNull();
    expect(arrayLast([], undefined)).toBeUndefined();
  });

  it("should return undefined when the list is not an array and no saveValue is provided", () => {
    expect(arrayLast(null as any)).toBeUndefined();
    expect(arrayLast(undefined as any)).toBeUndefined();
  });

  it("should return the saveValue when the list is not an array", () => {
    expect(arrayLast(null as any, "fallback")).toBe("fallback");
    expect(arrayLast(undefined as any, 0)).toBe(0);
  });
});
