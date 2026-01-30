import { describe, expect, it } from "vitest";
import { isArray, isTypedArray } from "./isArray";
import { isBigInt } from "./isBigInt";
import { isBoolean } from "./isBoolean";
import { isDate } from "./isDate";
import { isNull } from "./isNull";
import { isInteger, isNaN, isNumber } from "./isNumber";
import { isString } from "./isString";
import { isSymbol } from "./isSymbol";
import { isUndefined } from "./isUndefined";

describe("typeof basic", () => {
  it("isArray", () => {
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
  });

  it("isTypedArray", () => {
    expect(isTypedArray(new Int8Array())).toBe(true);
    expect(isTypedArray([])).toBe(false);
  });

  it("isBigInt", () => {
    expect(isBigInt(BigInt(1))).toBe(true);
    expect(isBigInt(1)).toBe(false);
  });

  it("isBoolean", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(0)).toBe(false);
  });

  it("isDate", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date("invalid"))).toBe(false);
    expect(isDate(new Date())).toBe(true);
    expect(isDate({})).toBe(false);
  });

  it("isNull", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
  });

  it("isNumber", () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(NaN)).toBe(false); // default checkNaN=true
    expect(isNumber(NaN, false)).toBe(true);
    expect(isNumber("1")).toBe(false);
  });

  it("isNaN", () => {
    expect(isNaN(NaN)).toBe(true);
    expect(isNaN(1)).toBe(false);
  });

  it("isInteger", () => {
    expect(isInteger(1)).toBe(true);
    expect(isInteger(1.1)).toBe(false);
    expect(isInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(false); // safeCheck=true default
    expect(isInteger(Number.MAX_SAFE_INTEGER + 1, false)).toBe(true);
  });

  it("isString", () => {
    expect(isString("str")).toBe(true);
    expect(isString("")).toBe(true);
    expect(isString("", true)).toBe(false); // checkEmpty=true
  });

  it("isSymbol", () => {
    expect(isSymbol(Symbol("sym"))).toBe(true);
    expect(isSymbol("str")).toBe(false);
  });

  it("isUndefined", () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
  });
});
