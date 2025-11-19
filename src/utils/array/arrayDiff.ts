import { isArray, isFunction } from "../typeof";

export function arrayDiff<T>(initialList: readonly T[], diffList: readonly T[], match: (row: T) => PropertyKey): T[] {
  if (!isArray(initialList) && !isArray(diffList)) {
    return [];
  }
  if (!isArray(initialList) || !initialList.length) {
    return [...diffList];
  }
  if (!isArray(diffList) || !diffList.length) {
    return [...initialList];
  }
  if (!isFunction(match)) {
    return [];
  }

  const keys = diffList.reduce<Record<PropertyKey, boolean>>((prev, curr) => {
    prev[match(curr)] = true;

    return prev;
  }, {});

  return initialList.filter((a) => !keys[match(a)]);
}
