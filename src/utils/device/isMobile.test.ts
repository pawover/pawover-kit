import { afterEach, describe, expect, it, vi } from "vitest";
import { isIOSMobile, isMobile } from "./isMobile";

describe("isMobile", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("当 window 未定义时返回 false", () => {
    // 默认 node 环境 window 是 undefined，除非用了 jsdom
    expect(isMobile()).toBe(false);
  });

  it("当宽度小于 maxWidth 时返回 true", () => {
    vi.stubGlobal("window", {
      innerWidth: 500,
      screen: { width: 500, height: 800 },
      devicePixelRatio: 2,
    });
    // Tablet check 依赖 screen inch calculation
    // 500/320 ~ 1.5inch. Not tablet.
    expect(isMobile()).toBe(true);
  });

  it("当宽度大于 maxWidth 时返回 false", () => {
    vi.stubGlobal("window", {
      innerWidth: 1000,
      screen: { width: 1000, height: 800 },
    });
    expect(isMobile(768)).toBe(false);
  });
});

describe("isIOSMobile", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("当环境不是 iOS 返回 false", () => {
    vi.stubGlobal("navigator", { userAgent: "Android" });
    vi.stubGlobal("window", {
      innerWidth: 375,
      screen: { width: 375, height: 812 }, // iPhone Xish
      devicePixelRatio: 3,
    });
    expect(isIOSMobile()).toBe(false);
  });

  it("当环境是 iOS 且符合移动尺寸返回 true", () => {
    vi.stubGlobal("navigator", { userAgent: "iPhone" });
    vi.stubGlobal("window", {
      innerWidth: 375,
      screen: { width: 375, height: 812 },
      devicePixelRatio: 3,
    });
    expect(isIOSMobile()).toBe(true);
  });
});
