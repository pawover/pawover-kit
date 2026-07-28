import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useMount } from "@pawover/kit/hooks/react";

describe("useMount", () => {
  it("should call the effect on mount", () => {
    const fn = vi.fn();
    renderHook(() => useMount(fn));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should not call the effect on re-render", () => {
    const fn = vi.fn();
    const { rerender } = renderHook(() => useMount(fn));
    rerender();
    rerender();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should not call the effect on unmount", () => {
    const fn = vi.fn();
    const { unmount } = renderHook(() => useMount(fn));
    unmount();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should return cleanup function from the effect", () => {
    const cleanup = vi.fn();
    const fn = vi.fn(() => cleanup);
    const { unmount } = renderHook(() => useMount(fn));
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it("should not throw when effect returns a promise", () => {
    const fn = vi.fn(async () => {});
    const { unmount } = renderHook(() => useMount(fn));
    unmount();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should log error when effect is not a function", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    renderHook(() => useMount(null as never));
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
