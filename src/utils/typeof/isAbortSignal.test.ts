import { describe, it, expect } from "vitest";
import { isAbortSignal } from "./isAbortSignal";

describe("isAbortSignal", () => {
  it("should return true for AbortSignal instances", () => {
    const controller = new AbortController();
    const signal = controller.signal;
    expect(isAbortSignal(signal)).toBe(true);

    // Also test the static aborted signal
    expect(isAbortSignal(AbortSignal.abort())).toBe(true);
  });

  it("should return false for non-AbortSignal values", () => {
    expect(isAbortSignal(undefined)).toBe(false);
    expect(isAbortSignal(null)).toBe(false);
    expect(isAbortSignal(true)).toBe(false);
    expect(isAbortSignal(false)).toBe(false);
    expect(isAbortSignal(0)).toBe(false);
    expect(isAbortSignal(1)).toBe(false);
    expect(isAbortSignal(NaN)).toBe(false);
    expect(isAbortSignal(Infinity)).toBe(false);
    expect(isAbortSignal("")).toBe(false);
    expect(isAbortSignal("AbortSignal")).toBe(false);
    expect(isAbortSignal({})).toBe(false);
    expect(isAbortSignal([])).toBe(false);
    expect(isAbortSignal(new Map())).toBe(false);
    expect(isAbortSignal(new Set())).toBe(false);
    expect(isAbortSignal(() => {})).toBe(false);
    expect(isAbortSignal(Symbol("a"))).toBe(false);
    expect(isAbortSignal(BigInt(123))).toBe(false);
    expect(isAbortSignal(new AbortController())).toBe(false); // The controller itself is not a signal
  });
});
