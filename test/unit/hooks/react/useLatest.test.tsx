import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useLatest } from "@pawover/kit/hooks/react";

describe("useLatest", () => {
  it("should return a ref with the initial value", () => {
    const { result } = renderHook(() => useLatest(42));
    expect(result.current.current).toBe(42);
  });

  it("should update the ref when value changes", () => {
    const { result, rerender } = renderHook((v: number) => useLatest(v), { initialProps: 1 });
    expect(result.current.current).toBe(1);

    rerender(2);
    expect(result.current.current).toBe(2);
  });
});
