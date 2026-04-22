import type { PlainObject } from "@pawover/types";

import { TypeUtil } from "../type";
import type { MatchFunction } from "./index.type";

/**
 * 数组工具类
 */
export class ArrayUtil {
  /**
   * 构造数组
   * @param candidate 待构造项
   * @param checkEmpty 是否检查 `undefined` 和 `null`，默认为 `true`
   * @returns 构造后的数组
   * @example
   * ```ts
   * ArrayUtil.cast(1); // [1]
   * ArrayUtil.cast([1, 2]); // [1, 2]
   * ArrayUtil.cast(null); // []
   * ArrayUtil.cast(undefined); // []
   * ArrayUtil.cast(null, false); // [null]
   * ```
   */
  static cast<T>(candidate: T | T[] | null | undefined, checkEmpty?: true): NonNullable<T>[];
  static cast<T>(candidate: T | T[] | null | undefined, checkEmpty?: false): T[];
  static cast<T>(candidate: T | T[] | null | undefined, checkEmpty = true): T[] {
    if (checkEmpty && (TypeUtil.isUndefined(candidate) || TypeUtil.isNull(candidate))) {
      return [];
    }

    return TypeUtil.isArray(candidate) ? [...candidate] : [candidate as T];
  }

  /**
   * 获取数组第一项
   *
   * @param initialList 初始数组
   * @param saveValue 安全值
   * @returns 数组第一项，如果为空则返回安全值
   * @example
   * ```ts
   * ArrayUtil.first([1, 2]); // 1
   * ArrayUtil.first([], 0); // 0
   * ```
   */
  static first<T>(initialList: readonly T[]): T | undefined;
  static first<T>(initialList: readonly T[], saveValue: T): T;
  static first<T>(initialList: readonly T[], saveValue?: T): T | undefined {
    if (!TypeUtil.isArray(initialList) || initialList.length === 0) {
      return saveValue;
    }

    return initialList[0];
  }

  /**
   * 获取数组最后一项
   *
   * @param initialList 初始数组
   * @param saveValue 安全值
   * @returns 数组最后一项，如果为空则返回安全值
   * @example
   * ```ts
   * ArrayUtil.last([1, 2, 3]); // 3
   * ArrayUtil.last([], 0); // 0
   * ```
   */
  static last<T>(initialList: readonly T[]): T | undefined;
  static last<T>(initialList: readonly T[], saveValue: T): T;
  static last<T>(initialList: readonly T[], saveValue?: T): T | undefined {
    if (!TypeUtil.isArray(initialList) || initialList.length === 0) {
      return saveValue;
    }

    return initialList[initialList.length - 1];
  }

  /**
   * 数组竞选
   * - 返回在匹配函数的比较条件中获胜的最终项目，适用于更复杂的最小值/最大值计算
   *
   * @param initialList 数组
   * @param match 匹配函数
   * @returns 获胜的元素，如果数组为空或参数无效则返回 `null`
   * @example
   * ```ts
   * const list = [1, 10, 5];
   * ArrayUtil.compete(list, (a, b) => (a > b ? a : b)); // 10
   * ArrayUtil.compete(list, (a, b) => (a < b ? a : b)); // 1
   * ```
   */
  static compete<T>(initialList: readonly T[], match: (a: T, b: T, index: number) => T): T | null {
    if (!TypeUtil.isArray(initialList) || initialList.length === 0 || !TypeUtil.isFunction(match)) {
      return null;
    }

    return initialList.reduce(match);
  }

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
   * ArrayUtil.count(list, (x) => x); // { a: 2, b: 1, c: 1 }
   *
   * const users = [{ id: 1, group: "A" }, { id: 2, group: "B" }, { id: 3, group: "A" }];
   * ArrayUtil.count(users, (u) => u.group); // { A: 2, B: 1 }
   * ```
   */
  static count<T, K extends PropertyKey>(initialList: readonly T[], match: MatchFunction<T, K>): Record<string, number> {
    if (!TypeUtil.isArray(initialList) || !TypeUtil.isFunction(match)) {
      return {};
    }

    return initialList.reduce<Record<string, number>>((prev, curr, index) => {
      const id = match(curr, index).toString();
      prev[id] = (prev[id] ?? 0) + 1;

      return prev;
    }, {});
  }

  /**
   * 获取数组差集
   * - 返回在 `initialList` 中存在，但在 `diffList` 中不存在的元素
   *
   * @param initialList 初始数组
   * @param diffList 对比数组
   * @param match 匹配函数
   * @returns 差集数组
   * @example
   * ```ts
   * ArrayUtil.difference([1, 2, 3], [2, 3, 4]); // [1]
   * ArrayUtil.difference([{ id: 1 }, { id: 2 }], [{ id: 2 }], (x) => x.id); // [{ id: 1 }]
   * ```
   */
  static difference<T>(initialList: readonly T[], diffList: readonly T[], match?: (row: T, index: number) => unknown): T[] {
    if (!TypeUtil.isArray(initialList) && !TypeUtil.isArray(diffList)) {
      return [];
    }
    if (!TypeUtil.isArray(initialList) || !initialList.length) {
      return [];
    }
    if (!TypeUtil.isArray(diffList) || !diffList.length) {
      return [...initialList];
    }
    if (!TypeUtil.isFunction(match)) {
      const arraySet = new Set(diffList);

      return Array.from(new Set(initialList.filter((item) => !arraySet.has(item))));
    }

    const map = new Map<unknown, boolean>();

    diffList.forEach((item, index) => {
      map.set(match(item, index), true);
    });

    return initialList.filter((item, index) => !map.get(match(item, index)));
  }

  /**
   * 获取数组交集
   * - 返回在 `initialList` 和 `diffList` 中都存在的元素
   *
   * @param initialList 初始数组
   * @param diffList 对比数组
   * @param match 匹配函数
   * @returns 交集数组
   * @example
   * ```ts
   * ArrayUtil.intersection([1, 2], [2, 3]); // [2]
   * ArrayUtil.intersection([{ id: 1 }, { id: 2 }], [{ id: 2 }], (x) => x.id); // [{ id: 2 }]
   * ```
   */
  static intersection<T>(initialList: readonly T[], diffList: readonly T[]): T[];
  static intersection<T, D = T>(initialList: readonly T[], diffList: readonly D[], match: MatchFunction<T>): T[];
  static intersection<T>(initialList: readonly T[], diffList: readonly T[], match?: MatchFunction<T>): T[] {
    if (!TypeUtil.isArray(initialList) || !TypeUtil.isArray(diffList)) {
      return [];
    }
    if (!initialList.length || !diffList.length) {
      return [];
    }

    if (!TypeUtil.isFunction(match)) {
      const diffSet = new Set(diffList);

      return initialList.filter((item) => diffSet.has(item));
    }

    const diffKeys = new Set(diffList.map((item, index) => match(item, index)));

    return initialList.filter((item, index) => diffKeys.has(match(item, index)));
  }

  /**
   * 数组合并
   * - 如果未提供 `match` 函数，则合并两个数组并去重（Union）
   * - 如果提供了 `match` 函数，则仅更新 `initialList` 中匹配到的项（Left Join Update），不会追加 `mergeList` 中新增的项
   *
   * @param initialList 初始数组
   * @param mergeList 待合并数组
   * @param match 匹配函数
   * @returns 合并后的数组
   * @example
   * ```ts
   * // 基础合并去重
   * ArrayUtil.merge([1, 2], [2, 3]); // [1, 2, 3]
   * ArrayUtil.merge([], [1, 2, 3]); // [1, 2, 3]
   *
   * // 按条件更新
   * const source = [{ id: 1, val: "a" }, { id: 2, val: "b" }];
   * const update = [{ id: 2, val: "new" }, { id: 3, val: "c" }];
   * ArrayUtil.merge(source, update, (x) => x.id); // [{ id: 1, val: "a" }, { id: 2, val: "new" }] -> id:3 被忽略
   * ```
   */
  static merge<T>(initialList: readonly T[], mergeList: readonly T[]): T[];
  static merge<T, D = T>(initialList: readonly T[], mergeList: readonly D[], match: MatchFunction<T>): T[];
  static merge<T>(initialList: readonly T[], mergeList: readonly T[], match?: MatchFunction<T>): T[] {
    if (!TypeUtil.isArray(initialList)) {
      return [];
    }
    if (!TypeUtil.isArray(mergeList)) {
      return [...initialList];
    }
    if (!TypeUtil.isFunction(match)) {
      return Array.from(new Set([...initialList, ...mergeList]));
    }

    const keys = new Map();
    mergeList.forEach((item, index) => {
      keys.set(match(item, index), item);
    });

    return initialList.map((prevItem, index) => {
      const key = match(prevItem, index);

      return keys.has(key) ? keys.get(key)! : prevItem;
    });
  }

  /**
   * 数组选择
   * - 一次性应用 `filter` 和 `map` 操作
   *
   * @param initialList 初始数组
   * @param filter filter 函数
   * @param mapper map 函数
   * @returns 处理后的新数组
   * @example
   * ```ts
   * const list = [1, 2, 3, 4];
   * ArrayUtil.pick(list, (n) => n % 2 === 0); // [2, 4]
   * ArrayUtil.pick(list, (n) => n % 2 === 0, (n) => n * 2); // [4, 8]
   * ```
   */
  static pick<const T>(initialList: readonly T[], filter: (row: T, index: number) => boolean): T[];
  static pick<const T, K = T>(initialList: readonly T[], filter: (row: T, index: number) => boolean, mapper: (row: T, index: number) => K): K[];
  static pick<const T, K = T>(initialList: readonly T[], filter: (row: T, index: number) => boolean, mapper?: ((row: T, index: number) => K) | undefined) {
    if (!TypeUtil.isArray(initialList)) {
      return [];
    }
    if (!TypeUtil.isFunction(filter)) {
      return [...initialList];
    }

    const hasMapper = TypeUtil.isFunction(mapper);

    return initialList.reduce<K[]>((prev, curr, index) => {
      if (!filter(curr, index)) {
        return prev;
      }
      if (hasMapper) {
        prev.push(mapper(curr, index));
      } else {
        prev.push(curr as unknown as K);
      }

      return prev;
    }, []);
  }

  /**
   * 数组项替换
   * - 在给定的数组中，替换符合匹配函数结果的项目
   * - 只替换第一个匹配项
   *
   * @param initialList 初始数组
   * @param newItem 替换项
   * @param match 匹配函数
   * @returns 替换后的新数组
   * @example
   * ```ts
   * ArrayUtil.replace([1, 2, 3], 4, (n) => n === 2); // [1, 4, 3]
   * ```
   */
  static replace<const T>(initialList: readonly T[], newItem: T, match: MatchFunction<T, boolean>): T[];
  static replace<const T, K extends T>(initialList: readonly T[], newItem: K, match: MatchFunction<T, boolean>): T[];
  static replace<const T, K>(initialList: readonly T[], newItem: K, match: MatchFunction<T, boolean>): (T | K)[];
  static replace<const T, K>(initialList: readonly T[], newItem: K, match: MatchFunction<T, boolean>): (T | K)[] {
    if (!TypeUtil.isArray(initialList) || !initialList.length) {
      return [];
    }
    if (!TypeUtil.isFunction(match)) {
      return [...initialList];
    }

    for (let i = 0; i < initialList.length; i++) {
      const item = initialList[i]!;
      if (match(item, i)) {
        return [...initialList.slice(0, i), newItem, ...initialList.slice(i + 1, initialList.length)] as (T | K)[];
      }
    }

    return [...initialList];
  }

  /**
   * 数组项替换并移动
   * - 在给定的数组中，替换并移动符合匹配函数结果的项目
   * - 只替换和移动第一个匹配项
   * - 未匹配时，根据 `position` 在指定位置插入 `newItem`
   *
   * @param initialList 初始数组
   * @param newItem 替换项
   * @param match 匹配函数
   * @param position 移动位置，可选 `start` | `end` | 索引位置， 默认为 `end`
   * @returns
   * @example
   * ```ts
   * ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2, 0); // [5, 1, 3, 4]
   * ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2, 2); // [1, 3, 5, 4]
   * ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2, "start"); // [5, 1, 3, 4]
   * ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2); // [1, 3, 4, 5]
   * ```
   */
  static replaceMove<const T>(initialList: readonly T[], newItem: T, match: MatchFunction<T, boolean>, position?: "start" | "end" | number): T[] {
    if (!TypeUtil.isArray(initialList)) {
      return [];
    }
    if (!initialList.length) {
      return [newItem];
    }
    if (!TypeUtil.isFunction(match)) {
      return [...initialList];
    }

    const result = [...initialList];
    const matchIndex = initialList.findIndex(match);

    if (matchIndex !== -1) {
      result.splice(matchIndex, 1);
    }

    if (position === "start") {
      result.unshift(newItem);
    } else if (position === 0 || TypeUtil.isPositiveInteger(position, false)) {
      result.splice(Math.min(position, result.length), 0, newItem);
    } else {
      result.push(newItem);
    }

    return result;
  }

  /**
   * 数组切分
   * - 将数组以指定的长度切分后，组合在高维数组中
   *
   * @param initialList 初始数组
   * @param size 分割尺寸，默认 `10`
   * @returns 切分后的二维数组
   * @example
   * ```ts
   * ArrayUtil.split([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
   * ```
   */
  static split<T>(initialList: readonly T[], size: number = 10): T[][] {
    if (!TypeUtil.isArray(initialList)) {
      return [];
    }
    if (!TypeUtil.isPositiveInteger(size, false)) {
      return [];
    }

    const count = Math.ceil(initialList.length / size);

    return Array.from({ length: count })
      .fill(null)
      .map((_c, i) => {
        return initialList.slice(i * size, i * size + size);
      });
  }

  /**
   * 数组解压
   * - `ArrayUtil.zip` 的反向操作
   *
   * @param arrayList 压缩后的数组
   * @returns 解压后的二维数组
   * @example
   * ```ts
   * ArrayUtil.unzip([[1, "a"], [2, "b"]]); // [[1, 2], ["a", "b"]]
   * ```
   */
  static unzip<T>(arrayList: readonly (readonly T[])[]): T[][] {
    if (!TypeUtil.isArray(arrayList) || !arrayList.length) {
      return [];
    }
    const out = new Array(arrayList.reduce((max, arr) => Math.max(max, arr.length), 0));
    let index = 0;
    const get = (array: T[]) => array[index];

    for (; index < out.length; index++) {
      out[index] = Array.from(arrayList as { length: number }, get);
    }

    return out;
  }

  /**
   * 数组压缩
   * - 将多个数组的元素按索引组合成元组
   *
   * @param arrays 多个数组
   * @returns 压缩后的元组数组
   * @example
   * ```ts
   * ArrayUtil.zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
   * ```
   */
  static zip<T1, T2, T3, T4, T5>(array1: readonly T1[], array2: readonly T2[], array3: readonly T3[], array4: readonly T4[], array5: readonly T5[]): [T1, T2, T3, T4, T5][];
  static zip<T1, T2, T3, T4>(array1: readonly T1[], array2: readonly T2[], array3: readonly T3[], array4: readonly T4[]): [T1, T2, T3, T4][];
  static zip<T1, T2, T3>(array1: readonly T1[], array2: readonly T2[], array3: readonly T3[]): [T1, T2, T3][];
  static zip<T1, T2>(array1: readonly T1[], array2: readonly T2[]): [T1, T2][];
  static zip (): [];
  static zip<T>(...arrays: (readonly T[])[]): T[][] {
    return this.unzip(arrays);
  }

  /**
   * 数组压缩为对象
   * - 将键数组和值（数组、函数或静态值）组合成对象
   *
   * @param keys 键数组
   * @param values 值数组、生成值的函数或静态值
   * @returns 生成的对象
   * @example
   * ```ts
   * ArrayUtil.zipToObject(["a", "b"], [1, 2]); // { a: 1, b: 2 }
   * ArrayUtil.zipToObject(["a", "b"], (k, i) => k + i); // { a: "a0", b: "b1" }
   * ArrayUtil.zipToObject(["a", "b"], 1); // { a: 1, b: 1 }
   * ```
   */
  static zipToObject<const K extends PropertyKey, const V>(keys: readonly K[], array: readonly V[]): Record<K, V>;
  static zipToObject<const K extends PropertyKey, const V>(keys: readonly K[], match: MatchFunction<K, V>): Record<K, V>;
  static zipToObject<const K extends PropertyKey, const V>(keys: readonly K[], value: V): Record<K, V>;
  static zipToObject<const K extends PropertyKey, const V>(keys: readonly K[], values: V | MatchFunction<K, V> | readonly V[]): Record<K, V> {
    const result = {} as PlainObject<K, V>;

    if (!TypeUtil.isArray(keys) || !keys.length) {
      return result;
    }

    const getValue = TypeUtil.isFunction(values) ? values : TypeUtil.isArray(values) ? (_k: K, i: number) => values[i] : (_k: K, _i: number) => values;

    return keys.reduce((acc, key, idx) => {
      acc[key] = getValue(key, idx) as V;

      return acc;
    }, result);
  }
}
