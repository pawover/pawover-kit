import { describe, expect, it, vi, afterEach } from "vitest";
import { cleanup, renderHook, act } from "@testing-library/react";
import { useResponsive, BREAK_POINT_TOKEN } from "@pawover/kit/hooks/react";

afterEach(cleanup);

describe("useResponsive", () => {
  it("should return responsive object with default values", () => {
    const { result } = renderHook(() => useResponsive());
    expect(result.current.responsive).toBeDefined();
    expect(result.current.current).toBeDefined();
    expect(typeof result.current.responsive.xs).toBe("boolean");
  });

  it("should have breakPointTokens in result", () => {
    const { result } = renderHook(() => useResponsive());
    expect(result.current.breakPointTokens).toBeDefined();
    expect(result.current.breakPointTokens.XS).toBe(480);
  });

  it("should accept custom breakpoint tokens", () => {
    const { result } = renderHook(() => useResponsive({
      breakPointTokens: { XS: 100, XSMax: 200, XSMin: 100, SM: 200, SMMax: 300, SMMin: 200, MD: 300, MDMax: 400, MDMin: 300, LG: 400, LGMax: 500, LGMin: 400, XL: 500, XLMax: 600, XLMin: 500, XXL: 600, XXLMax: 700, XXLMin: 600, XXXL: 700, XXXLMin: 700 },
    }));
    expect(result.current.breakPointTokens.XS).toBe(100);
  });

  it("should update responsive values on resize", () => {
    const { result } = renderHook(() => useResponsive());

    act(() => {
      Object.defineProperty(window, "innerWidth", { value: 2000, configurable: true });
      window.dispatchEvent(new Event("resize"));
    });

    expect(result.current.responsive.xxxl).toBe(true);
  });

  it("should cleanup resize listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const addSpy = vi.spyOn(window, "addEventListener");
    const { unmount } = renderHook(() => useResponsive());
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
    removeSpy.mockRestore();
    addSpy.mockRestore();
  });
});
