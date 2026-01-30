import { afterEach, describe, expect, it, vi } from "vitest";
import { isTablet } from "./isTablet";

describe("isTablet", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("当 window 未定义时返回 false", () => {
    expect(isTablet()).toBe(false);
  });

  it("当宽度在 minWidth 和 maxWidth 之间时返回 true", () => {
    vi.stubGlobal("window", {
      innerWidth: 800,
      screen: { width: 800, height: 1000 },
    });
    expect(isTablet(768, 1200)).toBe(true);
  });

  it("当宽度小于 minWidth 返回 false", () => {
    vi.stubGlobal("window", {
      innerWidth: 500,
      screen: { width: 500, height: 800 },
    });
    expect(isTablet(768)).toBe(false);
  });

  it("当屏幕尺寸大于 7 英寸时返回 true (即使宽度较小)", () => {
    // 假设一个非常高 DPI 的设备，物理尺寸很大但像素宽可能不一定？
    // 或者宽度小于 768 但物理尺寸大？ (例如竖屏平板)
    // Tablet logic: return isWithinWidthRange || screenInches >= 7.0;

    // 模拟: width 600 (< 768), but huge screen physically
    // 600px / 10dpi = 60 inch width... extreme case but tests the math
    vi.stubGlobal("window", {
      innerWidth: 600,
      screen: { width: 600, height: 800 },
      devicePixelRatio: 1,
    });
    // dpi = 10 passed to function
    // isWithinWidthRange = 600 >= 768 (False)
    // widthInch = 600 / 10 = 60
    // screenInches >= 7.0 (True)
    expect(isTablet(768, 1200, 10)).toBe(true);
  });
});
