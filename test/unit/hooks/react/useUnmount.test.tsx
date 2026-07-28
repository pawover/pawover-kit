import { describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useUnmount } from "@pawover/kit/hooks/react";

describe("useUnmount", () => {
  it("should call the effect function on unmount", () => {
    const fn = vi.fn();
    const { unmount } = renderHook(() => useUnmount(fn));
    expect(fn).not.toHaveBeenCalled();

    unmount();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should not call the effect on re-render", () => {
    const fn = vi.fn();
    const { rerender, unmount } = renderHook(() => useUnmount(fn));
    rerender();
    expect(fn).not.toHaveBeenCalled();

    unmount();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should log error when effect is not a function", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { unmount } = renderHook(() => useUnmount(null as never));
    unmount();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
