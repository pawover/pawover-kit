// @vitest-environment jsdom

import { describe, expect, it, vi, beforeEach } from "vitest";
import { EnvUtil } from "@pawover/kit/utils";

function setInnerWidth(w: number) {
  Object.defineProperty(window, "innerWidth", { value: w, configurable: true });
}

function setUserAgent(ua: string) {
  Object.defineProperty(navigator, "userAgent", { value: ua, configurable: true });
}

function setScreen(w: number, h: number) {
  Object.defineProperty(window.screen, "width", { value: w, configurable: true });
  Object.defineProperty(window.screen, "height", { value: h, configurable: true });
}

beforeEach(() => {
  setInnerWidth(1920);
  setScreen(1920, 1080);
  Object.defineProperty(window, "devicePixelRatio", { value: 1, configurable: true });
  setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
});

describe("EnvUtil", () => {
  describe("isBrowser", () => {
    it("should return true in jsdom", () => {
      expect(EnvUtil.isBrowser()).toBe(true);
    });
  });

  describe("isWebWorker", () => {
    it("should return false in jsdom", () => {
      expect(EnvUtil.isWebWorker()).toBe(false);
    });
  });

  describe("isReactNative", () => {
    it("should return false in jsdom", () => {
      expect(EnvUtil.isReactNative()).toBe(false);
    });
  });

  describe("isIframe", () => {
    it("should return false when not in iframe", () => {
      expect(EnvUtil.isIframe()).toBe(false);
    });
  });

  describe("isDesktop", () => {
    it("should detect desktop by width and screen size", () => {
      expect(EnvUtil.isDesktop()).toBe(true);
    });

    it("should return false for narrow widths", () => {
      setInnerWidth(800);
      expect(EnvUtil.isDesktop()).toBe(false);
    });

    it("should return false when width below custom minWidth", () => {
      setInnerWidth(1000);
      expect(EnvUtil.isDesktop(1200)).toBe(false);
    });

    it("should fall back to true when screen API throws", () => {
      const screenSpy = vi.spyOn(window.screen, "width", "get").mockImplementation(() => { throw new Error("mock"); });
      expect(EnvUtil.isDesktop()).toBe(true);
      screenSpy.mockRestore();
    });

    it("should detect 15.6-inch laptop at 1366x768 as desktop", () => {
      setInnerWidth(1366);
      setScreen(1366, 768);
      // 1366x768 DPR=1 换算尺寸约 9.79 英寸，低于桌面 10 英寸阈值 → isDesktop 返回 false
      expect(EnvUtil.isDesktop()).toBe(false);
    });

    it("should classify 9.79-inch 1366x768 laptop as desktop with custom minScreenSize", () => {
      setInnerWidth(1366);
      setScreen(1366, 768);
      expect(EnvUtil.isDesktop(1200, 9)).toBe(true);
    });
  });

  describe("isWindowsDesktop", () => {
    it("should detect Windows desktop from UA", () => {
      expect(EnvUtil.isWindowsDesktop()).toBe(true);
    });

    it("should return false for non-Windows UA", () => {
      setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36");
      expect(EnvUtil.isWindowsDesktop()).toBe(false);
    });
  });

  describe("isMacOSDesktop", () => {
    it("should detect macOS desktop from UA", () => {
      setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36");
      expect(EnvUtil.isMacOSDesktop()).toBe(true);
    });
  });

  describe("isMobile", () => {
    it("should detect mobile by width and screen size", () => {
      setInnerWidth(500);
      setScreen(375, 667);
      expect(EnvUtil.isMobile()).toBe(true);
    });

    it("should return false for wide widths", () => {
      setInnerWidth(1200);
      expect(EnvUtil.isMobile()).toBe(false);
    });

    it("should fall back to true when screen API throws", () => {
      setInnerWidth(500);
      const screenSpy = vi.spyOn(window.screen, "width", "get").mockImplementation(() => { throw new Error("mock"); });
      expect(EnvUtil.isMobile()).toBe(true);
      screenSpy.mockRestore();
    });
  });

  describe("isIOSMobile", () => {
    it("should detect iOS mobile from UA and width", () => {
      setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)");
      setInnerWidth(400);
      setScreen(375, 667);
      expect(EnvUtil.isIOSMobile()).toBe(true);
    });

    it("should return false for non-iOS UA", () => {
      setUserAgent("Mozilla/5.0 (Android 10; Mobile)");
      setInnerWidth(400);
      setScreen(375, 667);
      expect(EnvUtil.isIOSMobile()).toBe(false);
    });
  });

  describe("isTablet", () => {
    it("should detect tablet by width range", () => {
      setInnerWidth(1000);
      setScreen(768, 1024);
      expect(EnvUtil.isTablet()).toBe(true);
    });

    it("should return false for phone width with small screen", () => {
      setInnerWidth(400);
      setScreen(375, 667);
      expect(EnvUtil.isTablet()).toBe(false);
    });

    it("should return false for desktop width with large screen (>= 13 inch)", () => {
      setInnerWidth(1920);
      setScreen(1920, 1080);
      expect(EnvUtil.isTablet()).toBe(false);
    });

    it("should return true for screen in 7~13 inch range regardless of width", () => {
      setInnerWidth(1400);
      setScreen(1024, 768);
      expect(EnvUtil.isTablet()).toBe(true);
    });

    it("should return true for 14.6-inch tablet by css width (DPR compressed inches)", () => {
      setInnerWidth(1184);
      setScreen(2960, 1848);
      Object.defineProperty(window, "devicePixelRatio", { value: 2.55, configurable: true });
      expect(EnvUtil.isTablet()).toBe(true);
    });

    it("should classify 1366x768 laptop as tablet by inch range (9.79 inch)", () => {
      setInnerWidth(1366);
      setScreen(1366, 768);
      expect(EnvUtil.isTablet()).toBe(true);
    });

    it("should fall back to width check when screen API throws", () => {
      setInnerWidth(1000);
      const screenSpy = vi.spyOn(window.screen, "width", "get").mockImplementation(() => { throw new Error("mock"); });
      expect(EnvUtil.isTablet()).toBe(true);
      screenSpy.mockRestore();
    });
  });
});
