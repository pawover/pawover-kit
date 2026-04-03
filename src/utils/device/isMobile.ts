import { isPositiveInteger } from "../typeof";

/**
 * 检测当前设备是否为移动设备
 *
 * @param maxWidth - 移动设备最大宽度（默认 768px）
 * @param dpi - 标准 DPI 基准（默认 160）
 * @returns 是否为移动设备
 * @example
 * ```ts
 * // 假设 window.innerWidth = 500
 * isMobile(); // true
 * ```
 */
export function isMobile (maxWidth = 768, dpi = 160) {
  if (typeof window === "undefined" || !isPositiveInteger(maxWidth)) {
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
 * isIOSMobile(); // true
 * ```
 */
export function isIOSMobile (maxWidth = 768, dpi = 160) {
  if (typeof navigator === "undefined" || !navigator.userAgent) {
    return false;
  }

  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  return isIOS && isMobile(maxWidth, dpi);
}
