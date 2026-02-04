import { isTablet } from ".";
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

  return !isTablet(maxWidth, 1200, dpi);
}

/**
 * 检测当前设备是否为IOS移动设备
 *
 * @param maxWidth - 移动设备最大宽度（默认 768px）
 * @param dpi - 标准 DPI 基准（默认 160）
 * @returns 是否为 iOS 移动设备 (iPhone/iPad/iPod 且非平板)
 * @example
 * ```ts
 * // UA contains iPhone
 * isIOSMobile(); // true
 * ```
 */
export function isIOSMobile (maxWidth = 768, dpi = 160) {
  if (typeof navigator === "undefined" || !navigator.userAgent || !isPositiveInteger(maxWidth)) {
    return false;
  }

  const isIOS = (/iPhone|iPad|iPod/i).test(navigator.userAgent);

  return isIOS && !isTablet(maxWidth, 1200, dpi);
}
