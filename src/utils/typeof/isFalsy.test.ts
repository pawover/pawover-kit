import { describe, it, expect } from "vitest";
import { isFalsy, isFalsyLike } from "./isFalsy";

describe("isFalsy", () => {
  it("should return true for standard falsy values", () => {
    expect(isFalsy(false)).toBe(true);
    expect(isFalsy(0)).toBe(true);
    expect(isFalsy(-0)).toBe(true);
    expect(isFalsy("")).toBe(true);
    expect(isFalsy(null)).toBe(true);
    expect(isFalsy(undefined)).toBe(true);
    expect(isFalsy(NaN)).toBe(true);
    expect(isFalsy(0n)).toBe(true); // BigInt zero
  });

  it("should return false for truthy values", () => {
    expect(isFalsy(true)).toBe(false);
    expect(isFalsy(1)).toBe(false);
    expect(isFalsy(-1)).toBe(false);
    expect(isFalsy("false")).toBe(false); // A non-empty string is truthy
    expect(isFalsy("0")).toBe(false); // A non-empty string is truthy
    expect(isFalsy(" ")).toBe(false); // A non-empty string is truthy
    expect(isFalsy({})).toBe(false);
    expect(isFalsy([])).toBe(false);
    expect(isFalsy(() => {})).toBe(false);
    expect(isFalsy(Infinity)).toBe(false);
    expect(isFalsy(-Infinity)).toBe(false);
  });
});

describe("isFalsyLike", () => {
  it("should return true for standard falsy values", () => {
    // It should inherit behavior from isFalsy
    expect(isFalsyLike(false)).toBe(true);
    expect(isFalsyLike(0)).toBe(true);
    expect(isFalsyLike(-0)).toBe(true);
    expect(isFalsyLike("")).toBe(true);
    expect(isFalsyLike(null)).toBe(true);
    expect(isFalsyLike(undefined)).toBe(true);
    expect(isFalsyLike(NaN)).toBe(true);
    expect(isFalsyLike(0n)).toBe(true);
  });

  it("should return true for string representations of falsy values", () => {
    expect(isFalsyLike("false")).toBe(true);
    expect(isFalsyLike("0")).toBe(true);
    expect(isFalsyLike("-0")).toBe(true);
    expect(isFalsyLike("")).toBe(true); // Empty string
    expect(isFalsyLike("null")).toBe(true);
    expect(isFalsyLike("undefined")).toBe(true);
    expect(isFalsyLike("NaN")).toBe(true);
    expect(isFalsyLike("0n")).toBe(true);
    expect(isFalsyLike(" 0 ")).toBe(false); // Whitespace makes it a different string
  });

  it("should return false for non-falsy and non-string-falsy-like values", () => {
    expect(isFalsyLike(true)).toBe(false);
    expect(isFalsyLike(1)).toBe(false);
    expect(isFalsyLike("true")).toBe(false);
    expect(isFalsyLike("1")).toBe(false);
    expect(isFalsyLike("  ")).toBe(false); // Non-empty string
    expect(isFalsyLike({})).toBe(false);
    expect(isFalsyLike([])).toBe(false);
    expect(isFalsyLike(() => {})).toBe(false);
    expect(isFalsyLike(Infinity)).toBe(false);
  });
});
