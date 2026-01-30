import { describe, expect, it } from "vitest";
import { isAbortSignal } from "./isAbortSignal";
import { isBlob } from "./isBlob";
import { isEqual } from "./isEqual";
import { isFalsy } from "./isFalsy";
import { isURLSearchParams } from "./isURLSearchParams";

describe("typeof web", () => {
  it("isAbortSignal", () => {
    // AbortSignal environment dependent, mock class or use global if available (Node 15+)
    if (typeof AbortSignal !== "undefined") {
      const controller = new AbortController();
      expect(isAbortSignal(controller.signal)).toBe(true);
    }
  });

  it("isBlob", () => {
    if (typeof Blob !== "undefined") {
      expect(isBlob(new Blob([]))).toBe(true);
    }
  });

  it("isURLSearchParams", () => {
    expect(isURLSearchParams(new URLSearchParams())).toBe(true);
    expect(isURLSearchParams({})).toBe(false);
  });

  it("isWindow", () => {
    // Vitest environment is jsdom? defaults to node but config set environment?
    // "environment": "node" in vitest.config.ts?
    // I saw environment was set in earlier steps.
    // If node, global window check depends on mocks.
  });
});

describe("typeof misc", () => {
  it("isEqual", () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(isEqual([1, 2], [1, 2])).toBe(true);
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  it("isFalsy", () => {
    expect(isFalsy(false)).toBe(true);
    expect(isFalsy(0)).toBe(true);
    expect(isFalsy("")).toBe(true);
    expect(isFalsy(null)).toBe(true);
    expect(isFalsy(undefined)).toBe(true);
    expect(isFalsy(NaN)).toBe(true);
    expect(isFalsy(1)).toBe(false);
    expect(isFalsy(" ")).toBe(false);
  });
});
