import { isArray, isFunction } from "../typeof";

/**
 * 统计数组的项目出现次数
 * - 通过给定的标识符匹配函数，返回一个对象，其中键是回调函数返回的 key 值，每个值是一个整数，表示该 key 出现的次数
 *
 * @param initialList 初始数组
 * @param match 匹配函数
 * @returns 统计对象
 * @example
 * ```ts
 * const list = ["a", "b", "a", "c"];
 * arrayCounting(list, (x) => x); // { a: 2, b: 1, c: 1 }
 *
 * const users = [{ id: 1, group: "A" }, { id: 2, group: "B" }, { id: 3, group: "A" }];
 * arrayCounting(users, (u) => u.group); // { A: 2, B: 1 }
 * ```
 */
export function arrayCounting<T, K extends PropertyKey> (initialList: readonly T[], match: (row: T) => K): Record<string, number> {
  if (!isArray(initialList) || !isFunction(match)) {
    return {};
  }

  return initialList.reduce<Record<string, number>>((prev, curr) => {
    const id = match(curr).toString();
    prev[id] = (prev[id] ?? 0) + 1;

    return prev;
  }, {});
}
