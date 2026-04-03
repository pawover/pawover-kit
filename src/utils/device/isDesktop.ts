import { isPositiveInteger } from "../typeof";

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
 * isDesktop(); // true
 *
 * // 自定义阈值
 * isDesktop(1440, 13); // 更严格的桌面检测
 * ```
 */
export function isDesktop (minWidth = 1200, minScreenSize = 10, dpi = 160) {
  if (typeof window === "undefined" || !isPositiveInteger(minWidth) || !isPositiveInteger(minScreenSize)) {
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
 * isWindowsDesktop(); // true
 * ```
 */
export function isWindowsDesktop (minWidth = 1200, minScreenSize = 10, dpi = 160) {
  if (typeof navigator === "undefined" || !navigator.userAgent) {
    return false;
  }

  const isWindows = /Windows/i.test(navigator.userAgent);

  return isWindows && isDesktop(minWidth, minScreenSize, dpi);
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
 * isMacOSDesktop(); // true
 * ```
 */
export function isMacOSDesktop (minWidth = 1200, minScreenSize = 10, dpi = 160) {
  if (typeof navigator === "undefined" || !navigator.userAgent) {
    return false;
  }

  const isMac = /Macintosh/i.test(navigator.userAgent);

  return isMac && isDesktop(minWidth, minScreenSize, dpi);
}
