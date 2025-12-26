import { isArray } from "../typeof";

/**
 * 获取数组第一项
 *
 * @param initialList 初始数组
 * @param saveValue 安全值
 */
export function arrayFirst<T>(initialList: readonly T[]): T | undefined;
export function arrayFirst<T>(initialList: readonly T[], saveValue: T): T;
export function arrayFirst<T>(initialList: readonly T[], saveValue?: T): T | undefined {
  if (!isArray(initialList) || initialList.length === 0) {
    return saveValue;
  }

  return initialList[0];
}
