import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { isMobile, isIOSMobile, isTablet } from "./"; // 假设文件名为 isMobile.ts

// Mock the isTablet function since it's an external dependency
// and we want to isolate the tests for isMobile and isIOSMobile.
vi.mock("./isTablet", async () => {
  const actual = await vi.importActual("./isTablet");

  return {
    ...actual,
    isTablet: vi.fn(),
  };
});

describe("Device Detection - Mobile", () => {
  const originalWindow = global.window;
  const originalNavigator = global.navigator;

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    global.window = {
      innerWidth: 1024,
      screen: { width: 720, height: 1280 },
      devicePixelRatio: 3,
    } as any;

    global.navigator = {
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    } as any;
  });

  afterEach(() => {
    global.window = originalWindow;
    global.navigator = originalNavigator;
    vi.restoreAllMocks();
  });

  describe("isMobile", () => {
    it("should return false if window is undefined", () => {
      delete (global as any).window;
      expect(isMobile()).toBe(false);
    });

    it("should return false if maxWidth is not a positive integer", () => {
      expect(isMobile(0)).toBe(false);
      expect(isMobile(-100)).toBe(false);
    });

    it("should return true if isTablet returns false", () => {
      vi.mocked(isTablet).mockReturnValue(false);
      expect(isMobile()).toBe(true);
    });

    it("should return false if isTablet returns true", () => {
      vi.mocked(isTablet).mockReturnValue(true);
      expect(isMobile()).toBe(false);
    });

    it("should call isTablet with correct parameters", () => {
      const customMaxWidth = 600;
      const customDpi = 100;

      vi.mocked(isTablet).mockReturnValue(false);
      isMobile(customMaxWidth, customDpi);

      expect(isTablet).toHaveBeenCalledWith(customMaxWidth, 1200, customDpi);
    });
  });

  describe("isIOSMobile", () => {
    it("should return false if navigator is undefined", () => {
      delete (global as any).navigator;
      expect(isIOSMobile()).toBe(false);
    });

    it("should return false if navigator.userAgent is not present", () => {
      delete (global as any).navigator.userAgent;
      expect(isIOSMobile()).toBe(false);
    });

    it("should return false if maxWidth is not a positive integer", () => {
      expect(isIOSMobile(0)).toBe(false);
      expect(isIOSMobile(-100)).toBe(false);
    });

    it("should return false for non-iOS user agents when isTablet is false", () => {
      (global.navigator as any).userAgent = "Mozilla/5.0 (Android 10)";
      vi.mocked(isTablet).mockReturnValue(false);
      expect(isIOSMobile()).toBe(false);
    });

    it("should return false for iOS user agents when isTablet returns true (iPad)", () => {
      (global.navigator as any).userAgent = "Mozilla/5.0 (iPad; CPU OS 13_2_3 like Mac OS X)";
      vi.mocked(isTablet).mockReturnValue(true);
      expect(isIOSMobile()).toBe(false);
    });

    it("should return true for iOS user agents when isTablet returns false (iPhone)", () => {
      (global.navigator as any).userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)";
      vi.mocked(isTablet).mockReturnValue(false);
      expect(isIOSMobile()).toBe(true);
    });

    it("should call isTablet with correct parameters", () => {
      const customMaxWidth = 600;
      const customDpi = 100;
      (global.navigator as any).userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)";

      vi.mocked(isTablet).mockReturnValue(false);
      isIOSMobile(customMaxWidth, customDpi);

      expect(isTablet).toHaveBeenCalledWith(customMaxWidth, 1200, customDpi);
    });
  });
});
