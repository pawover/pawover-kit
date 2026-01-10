import { isTablet } from ".";
import { isPositiveInteger } from "../typeof";

/**
 * 检测当前设备是否为移动设备
 *
 * @param maxWidth - 移动设备最大宽度（默认 768px）
 * @param dpi - 标准 DPI 基准（默认 160）
 */
export function isMobile(maxWidth = 768, dpi = 160) {
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
 */
export function isISOMobile(maxWidth = 768, dpi = 160) {
  if (typeof navigator === "undefined" || !navigator.userAgent || !isPositiveInteger(maxWidth)) {
    return false;
  }

  const isIOS = (/iPhone|iPad|iPod/i).test(navigator.userAgent);

  return isIOS && !isTablet(maxWidth, 1200, dpi);
}
