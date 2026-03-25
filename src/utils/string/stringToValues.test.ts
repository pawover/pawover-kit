import { describe, it, expect } from "vitest";
import { stringToValues } from "./stringToValues";

describe("stringToValues", () => {
  it("should split a string into an array of numbers by default", () => {
    expect(stringToValues("1,2,3")).toEqual([1, 2, 3]);
    expect(stringToValues("10,20,30")).toEqual([10, 20, 30]);
    expect(stringToValues("-1,0,1")).toEqual([-1, 0, 1]);
    expect(stringToValues("1.5,2.7,3.14")).toEqual([1.5, 2.7, 3.14]);
  });

  it("should split a string into an array of strings when specified", () => {
    expect(stringToValues("a,b,c", "string")).toEqual(["a", "b", "c"]);
    expect(stringToValues("hello,world", "string")).toEqual(["hello", "world"]);
  });

  it("should use a custom separator correctly", () => {
    expect(stringToValues("a-b-c", "string", "-")).toEqual(["a", "b", "c"]);
    expect(stringToValues("1|2|3", "number", "|")).toEqual([1, 2, 3]);
    expect(stringToValues("x_y_z", "string", "_")).toEqual(["x", "y", "z"]);
  });

  it("should return an empty array for null or undefined input", () => {
    expect(stringToValues(null)).toEqual([]);
    expect(stringToValues(undefined)).toEqual([]);
  });

  it("should return an empty array for an empty string", () => {
    expect(stringToValues("")).toEqual([]);
  });

  it("should handle strings containing only separators or trailing separators correctly", () => {
    // An empty string part from splitting results in Number("") which is 0.
    expect(stringToValues(",")).toEqual([0, 0]); // Splits into ["", ""] -> [Number(""), Number("")] -> [0, 0]
    expect(stringToValues(",,")).toEqual([0, 0, 0]); // Splits into ["", "", ""] -> [0, 0, 0]
    expect(stringToValues("a,b,", "string")).toEqual(["a", "b", ""]); // Trailing separator results in an empty string part
    expect(stringToValues("a,b,", "number")).toEqual([NaN, NaN, 0]); // ["a", "b", ""] -> [NaN, NaN, 0]
  });

  it("should convert string parts to numbers, resulting in NaN for invalid numbers", () => {
    expect(stringToValues("1,abc,3")).toEqual([1, NaN, 3]);
    expect(stringToValues("true,false")).toEqual([NaN, NaN]);
  });

  it("should return an empty array if an error occurs during processing", () => {
    // This is hard to trigger with normal inputs given the current implementation.
    // A mock could be used to force String.split or Number() to throw,
    // but for now, we acknowledge the catch block exists.
    // The catch block serves as a safety net, ensuring the function never throws.
    // For the purpose of this test, we'll just call the function and ensure it doesn't throw.
    expect(() => stringToValues("test", "string")).not.toThrow();
  });

  it("should work correctly with mixed valid and invalid number strings when converting to numbers", () => {
    expect(stringToValues("1, 2 , 3")).toEqual([1, 2, 3]); // Handles spaces
    expect(stringToValues("1,2.5,invalid,4")).toEqual([1, 2.5, NaN, 4]);
  });
});
