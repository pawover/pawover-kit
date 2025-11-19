import { isArray } from "../typeof";

/**
 * 获取数组最后一项
 *
 * @param initialList 初始数组
 * @param saveValue 安全值
 */
export function arrayLast<T>(initialList: readonly T[], saveValue?: T): T | undefined {
  if (!isArray(initialList) || initialList.length === 0) {
    return saveValue;
  }

  return initialList[initialList.length - 1];
}
