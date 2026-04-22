import { TypeUtil } from "../type";

/**
 * 环境检查工具类
 */
export class EnvironmentUtil {
  private static readonly _isBrowser = typeof window !== "undefined" && TypeUtil.isFunction(window?.document?.createElement);
  private static readonly _isWebWorker = typeof window === "undefined" && typeof self !== "undefined" && "importScripts" in self;
  private static readonly _isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";

  static isBrowser (): boolean {
    return this._isBrowser;
  }

  static isWebWorker (): boolean {
    return this._isWebWorker;
  }

  static isReactNative (): boolean {
    return this._isReactNative;
  }

  /**
   * 检查是否在 iframe 环境中
   */
  static isIframe (): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    try {
      return window.top !== window.self;
    } catch (error) {
      // 仅当 SecurityError（跨域 iframe）时返回 true
      if ((error as Error).name === "SecurityError") {
        return true;
      }

      return false;
    }
  }

  /**
   * 检测当前设备是否为桌面设备
   *
   * @param minWidth - 桌面设备最小宽度（默认 1200px）
   * @param minScreenSize - 桌面设备最小屏幕尺寸（默认 10英寸）
   * @param dpi - 标准 DPI 基准（默认 160）
   * @returns 是否为桌面设备
   * @example
   * ```ts
   * // 假设 window.innerWidth = 1920
   * EnvironmentUtil.isDesktop(); // true
   *
   * // 自定义阈值
   * EnvironmentUtil.isDesktop(1440, 13); // 更严格的桌面检测
   * ```
   */
  static isDesktop (minWidth = 1200, minScreenSize = 10, dpi = 160) {
    if (typeof window === "undefined" || !TypeUtil.isPositiveInteger(minWidth) || !TypeUtil.isPositiveInteger(minScreenSize)) {
      return false;
    }

    // 检查宽度
    const width = window.innerWidth;

    if (width < minWidth) {
      return false;
    }

    try {
      // 检查屏幕尺寸
      const widthPx = window.screen.width;
      const heightPx = window.screen.height;
      const DPR = window.devicePixelRatio || 1;
      const DPI = dpi * DPR;

      const widthInch = widthPx / DPI;
      const heightInch = heightPx / DPI;
      const screenInches = Math.sqrt(widthInch ** 2 + heightInch ** 2);

      return screenInches >= minScreenSize;
    } catch {
      // 降级：仅用宽度判断
      return true;
    }
  }

  /**
   * 检测当前设备是否为 Windows 桌面设备
   *
   * @param minWidth - 桌面设备最小宽度（默认 1200px）
   * @param minScreenSize - 桌面设备最小屏幕尺寸（默认 10英寸）
   * @param dpi - 标准 DPI 基准（默认 160）
   * @returns 是否为 Windows 桌面设备
   * @example
   * ```ts
   * // UA contains Windows
   * EnvironmentUtil.isWindowsDesktop(); // true
   * ```
   */
  static isWindowsDesktop (minWidth = 1200, minScreenSize = 10, dpi = 160) {
    if (typeof navigator === "undefined" || !navigator.userAgent) {
      return false;
    }

    const isWindows = /Windows/i.test(navigator.userAgent);

    return isWindows && this.isDesktop(minWidth, minScreenSize, dpi);
  }

  /**
   * 检测当前设备是否为 macOS 桌面设备
   *
   * @param minWidth - 桌面设备最小宽度（默认 1200px）
   * @param minScreenSize - 桌面设备最小屏幕尺寸（默认 10英寸）
   * @param dpi - 标准 DPI 基准（默认 160）
   * @returns 是否为 macOS 桌面设备
   * @example
   * ```ts
   * // UA contains Macintosh
   * EnvironmentUtil.isMacOSDesktop(); // true
   * ```
   */
  static isMacOSDesktop (minWidth = 1200, minScreenSize = 10, dpi = 160) {
    if (typeof navigator === "undefined" || !navigator.userAgent) {
      return false;
    }

    const isMac = /Macintosh/i.test(navigator.userAgent);

    return isMac && this.isDesktop(minWidth, minScreenSize, dpi);
  }

  /**
   * 检测当前设备是否为移动设备
   *
   * @param maxWidth - 移动设备最大宽度（默认 768px）
   * @param dpi - 标准 DPI 基准（默认 160）
   * @returns 是否为移动设备
   * @example
   * ```ts
   * // 假设 window.innerWidth = 500
   * EnvironmentUtil.isMobile(); // true
   * ```
   */
  static isMobile (maxWidth = 768, dpi = 160) {
    if (typeof window === "undefined" || !TypeUtil.isPositiveInteger(maxWidth)) {
      return false;
    }

    const width = window.innerWidth;

    if (width >= maxWidth) {
      return false;
    }

    try {
      // 检查屏幕尺寸
      const widthPx = window.screen.width;
      const heightPx = window.screen.height;
      const DPR = window.devicePixelRatio || 1;
      const DPI = dpi * DPR;

      const widthInch = widthPx / DPI;
      const heightInch = heightPx / DPI;
      const screenInches = Math.sqrt(widthInch ** 2 + heightInch ** 2);

      return screenInches < 7.0;
    } catch {
      // 降级：仅用宽度判断
      return true;
    }
  }

  /**
   * 检测当前设备是否为IOS移动设备
   *
   * @param maxWidth - 移动设备最大宽度（默认 768px）
   * @param dpi - 标准 DPI 基准（默认 160）
   * @returns 是否为 iOS 移动设备 (iPhone/iPod)
   * @example
   * ```ts
   * // UA contains iPhone
   * EnvironmentUtil.isIOSMobile(); // true
   * ```
   */
  static isIOSMobile (maxWidth = 768, dpi = 160) {
    if (typeof navigator === "undefined" || !navigator.userAgent) {
      return false;
    }

    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    return isIOS && this.isMobile(maxWidth, dpi);
  }

  /**
   * 检测当前设备是否为平板
   *
   * @param minWidth - 平板最小宽度（默认 768px）
   * @param maxWidth - 平板最大宽度（默认 1200px）
   * @param dpi - 标准 DPI 基准（默认 160）
   * @returns 是否为平板设备
   * @example
   * ```ts
   * // 假设 window.innerWidth = 1000
   * EnvironmentUtil.isTablet(); // true
   * ```
   */
  static isTablet (minWidth = 768, maxWidth = 1200, dpi = 160) {
    if (typeof window === "undefined" || !TypeUtil.isPositiveInteger(minWidth) || !TypeUtil.isPositiveInteger(maxWidth)) {
      return false;
    }

    // 逻辑 1: 检查屏幕宽度
    const width = window.innerWidth;
    const isWithinWidthRange = width >= minWidth && width <= maxWidth;

    try {
      // 逻辑 2: 计算屏幕尺寸（英寸）
      const widthPx = window.screen.width;
      const heightPx = window.screen.height;
      const DPR = window.devicePixelRatio || 1;
      const DPI = dpi * DPR;

      const widthInch = widthPx / DPI;
      const heightInch = heightPx / DPI;
      const screenInches = Math.sqrt(widthInch ** 2 + heightInch ** 2);

      return isWithinWidthRange || screenInches >= 7.0;
    } catch {
      // 备用方案：如果计算失败（如无 screen API），仅用宽度判断
      return isWithinWidthRange;
    }
  }
}
