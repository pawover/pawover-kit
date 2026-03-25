import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { isTablet } from "./isTablet";

describe("isTablet", () => {
  const originalWindow = global.window;

  beforeEach(() => {
    // Create a fresh mock window object before each test
    // Use a screen size that results in < 7 inches to avoid interference
    // e.g., a small phone: 720x1280 @ 3x DPR = 240x426 physical px -> ~5.1 inches at 160 DPI
    global.window = {
      innerWidth: 1024, // Default to a tablet size
      screen: {
        width: 720,
        height: 1280,
      },
      devicePixelRatio: 3,
    } as any;
  });

  afterEach(() => {
    // Restore the original window object after each test
    global.window = originalWindow;
    vi.restoreAllMocks();
  });

  it("should return false if window is undefined", () => {
    delete (global as any).window;
    expect(isTablet()).toBe(false);
  });

  it("should return false if minWidth or maxWidth are not positive integers", () => {
    expect(isTablet(0, 1000)).toBe(false); // minWidth is 0
    expect(isTablet(-100, 1000)).toBe(false); // minWidth is negative
    expect(isTablet(768, 0)).toBe(false); // maxWidth is 0
    expect(isTablet(768, -100)).toBe(false); // maxWidth is negative
    expect(isTablet(800, 700)).toBe(false); // minWidth > maxWidth
  });

  it("should return true based on innerWidth being within the default range", () => {
    // innerWidth is already 1024 from beforeEach, screen size is < 7"
    expect(isTablet()).toBe(true);
  });

  it("should return false based on innerWidth being outside the default range", () => {
    // Mock innerWidth to be too small, with a small screen to prevent size-based return
    Object.defineProperty(global.window, "innerWidth", {
      value: 700,
      writable: true,
      configurable: true,
    });
    expect(isTablet()).toBe(false);

    // Restore innerWidth to default before the next sub-test
    Object.defineProperty(global.window, "innerWidth", {
      value: 1024,
      writable: true,
      configurable: true,
    });

    // Mock innerWidth to be too large, with a small screen to prevent size-based return
    Object.defineProperty(global.window, "innerWidth", {
      value: 1300,
      writable: true,
      configurable: true,
    });
    expect(isTablet()).toBe(false);

    // Restore innerWidth again if needed for subsequent code in this test
    Object.defineProperty(global.window, "innerWidth", {
      value: 1024,
      writable: true,
      configurable: true,
    });
  });

  it("should return true based on calculated screen inches being >= 7.0", () => {
    // Mock innerWidth to be outside the range
    Object.defineProperty(global.window, "innerWidth", {
      value: 600,
      writable: true,
      configurable: true,
    });

    // Mock screen and dpr to result in a screen size >= 7 inches (e.g., tablet)
    Object.defineProperty(global.window, "screen", {
      value: { width: 1536, height: 2048 },
      writable: true,
      configurable: true,
    });
    Object.defineProperty(global.window, "devicePixelRatio", {
      value: 2, // e.g., iPad
      writable: true,
      configurable: true,
    });

    expect(isTablet()).toBe(true); // Should be true due to screen size, even though width is outside range
  });

  it("should return false if both width and screen size checks fail", () => {
    // Mock innerWidth to be outside the range
    Object.defineProperty(global.window, "innerWidth", {
      value: 600,
      writable: true,
      configurable: true,
    });

    // Mock a screen size that is also < 7 inches
    // Recalculating: 640x960 @ 1 DPR -> 640/160=4, 960/160=6. sqrt(16+36)=~7.21 which is > 7.
    // Let's use smaller dimensions: 480x800 @ 1 DPR -> 480/160=3, 800/160=5. sqrt(9+25)=~5.83 which is < 7.
    Object.defineProperty(global.window, "screen", {
      value: { width: 480, height: 800 },
      writable: true,
      configurable: true,
    });
    Object.defineProperty(global.window, "devicePixelRatio", {
      value: 1,
      writable: true,
      configurable: true,
    });

    expect(isTablet()).toBe(false);
  });

  it("should use fallback logic if screen API calculation throws an error", () => {
    // Mock innerWidth to be outside the range
    Object.defineProperty(global.window, "innerWidth", {
      value: 600,
      writable: true,
      configurable: true,
    });

    // Mock screen API to throw an error
    vi.spyOn(global.window, "screen", "get").mockImplementation(() => {
      throw new Error("Screen API not available");
    });

    // Should return false because innerWidth is outside range and fallback fails
    expect(isTablet()).toBe(false);

    // Now mock innerWidth to be inside the range
    Object.defineProperty(global.window, "innerWidth", {
      value: 1024,
      writable: true,
      configurable: true,
    });

    // Should return true because innerWidth is inside range, even with fallback
    expect(isTablet()).toBe(true);
  });

  it("should work with custom parameters", () => {
    Object.defineProperty(global.window, "innerWidth", {
      value: 1300, // Outside default range
      writable: true,
      configurable: true,
    });

    // Use custom range that includes 1300
    expect(isTablet(1000, 1400)).toBe(true);
  });
});
