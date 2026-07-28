import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMount } from "@pawover/kit/hooks/react";

describe("useMount", () => {
  it("should call the effect function once on mount", () => {
    const fn = vi.fn();
    renderHook(() => useMount(fn));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should call the cleanup function on unmount", () => {
    const cleanup = vi.fn();
    const fn = vi.fn(() => cleanup);

    const { unmount } = renderHook(() => useMount(fn));
    expect(fn).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();

    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it("should not call the effect again on re-render", () => {
    const fn = vi.fn();
    const { rerender } = renderHook(() => useMount(fn));
    expect(fn).toHaveBeenCalledTimes(1);

    rerender();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
