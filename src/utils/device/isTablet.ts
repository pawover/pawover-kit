import { isPositiveInteger } from "../typeof";

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
 * isTablet(); // true
 * ```
 */
export function isTablet (minWidth = 768, maxWidth = 1200, dpi = 160) {
  if (typeof window === "undefined" || !isPositiveInteger(minWidth) || !isPositiveInteger(maxWidth)) {
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
