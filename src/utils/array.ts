import { isArray, isFunction } from "./typeof";

export function toArray<T>(candidate?: T | T[] | false): T[] {
  if (candidate === undefined || candidate === false) {
    return [];
  }

  return isArray(candidate) ? candidate : [candidate];
}

/**
 * 获取数组第一项
 *
 * @param initialList 初始数组
 * @param saveValue 安全值
 */
export function arrayFirst<T>(initialList: readonly T[], saveValue?: T): T | undefined {
  if (!isArray(initialList) || initialList.length === 0) {
    return saveValue;
  }

  return initialList[0];
}

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

/**
 * 数组竞争
 * - 返回在匹配函数的比较条件中获胜的最终项目，适用于更复杂的最小值/最大值计算
 *
 * @param initialList 数组
 * @param match 匹配函数
 */
export function arrayCompete<T>(initialList: readonly T[], match: (a: T, b: T) => T): T | null {
  if (!isArray(initialList) || initialList.length === 0 || !isFunction(match)) {
    return null;
  }

  return initialList.reduce(match);
}

/**
 * 统计数组的项目出现次数
 * - 通过给定的标识符匹配函数，返回一个对象，其中键是回调函数返回的 key 值，每个值是一个整数，表示该 key 出现的次数
 *
 * @param initialList 初始数组
 * @param match 标识符匹配函数
 */
export function arrayCounting<T, K extends PropertyKey>(
  initialList: readonly T[],
  match: (row: T) => K,
): Record<string, number> {
  if (!isArray(initialList) || !isFunction(match)) {
    return {};
  }

  return initialList.reduce<Record<string, number>>((prev, curr) => {
    const id = match(curr).toString();
    prev[id] = (prev[id] ?? 0) + 1;

    return prev;
  }, {});
}

/**
 * 数组项替换
 * - 在给定的数组中，替换符合匹配函数结果的项目。只替换第一个匹配项。始终返回原始数组的副本。
 *
 * @param initialList 初始数组
 * @param newItem 替换项
 * @param match 匹配函数
 */
export function arrayReplace<T>(initialList: readonly T[], newItem: T, match: (row: T, index: number) => boolean): T[] {
  if (!initialList) {
    return [];
  }
  if (newItem === undefined || !isFunction(match)) {
    return [...initialList];
  }

  for (let i = 0; i < initialList.length; i++) {
    const item = initialList[i];

    if (item !== undefined && match(item, i)) {
      return [...initialList.slice(0, i), newItem, ...initialList.slice(i + 1, initialList.length)];
    }
  }

  return [...initialList];
}

/**
 * 数组选择
 * - 一次性应用 `filter` 和 `map` 操作
 *
 * @param initialList 初始数组
 * @param filter filter 函数
 * @param mapper map 函数
 */
export function arrayPick<T, K = T>(
  initialList: readonly T[],
  filter: (row: T, index: number) => boolean,
  mapper?: ((row: T, index: number) => K) | undefined,
) {
  if (!isArray(initialList)) {
    return [];
  }
  if (!isFunction(filter)) {
    return initialList;
  }

  const hasMapper = isFunction(mapper);

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
 * 数组切分
 * - 将数组以指定的长度切分后，组合在高维数组中
 *
 * @param initialList 初始数组
 * @param size 分割尺寸，默认 `10`
 */
export function arraySplit<T>(initialList: readonly T[], size = 10): T[][] {
  if (!isArray(initialList)) {
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
 * 数组迭代
 * - 运行一个函数 n 次以生成一个值，迭代函数将作为还原器运行无数次，然后返回累积值
 *
 * @param count 迭代次数
 * @param iterate 迭代函数
 * @param initialValue 初始值
 */
export function arrayIterate<T>(count: number, iterate: (currentValue: T, iteration: number) => T, initialValue: T) {
  let result = initialValue;

  if (isFunction(iterate)) {
    for (let i = 1; i <= count; i++) {
      result = iterate(result, i);
    }
  }

  return result;
}

/**
 * 数组合并
 * - 通过给定的标识符匹配函数，用第二个数组中的匹配项替换第一个数组中匹配项的所有内容
 *
 * @param initialList 初始数组
 * @param mergeList 待合并数组
 * @param match 标识符匹配函数
 */
export function arrayMerge<T>(initialList: readonly T[], mergeList: readonly T[], match: (item: T) => unknown) {
  if (!isArray(initialList)) {
    return [];
  }
  if (!isArray(mergeList)) {
    return initialList;
  }
  if (!isFunction(match)) {
    return initialList;
  }

  return initialList.reduce<T[]>((prev, curr) => {
    const matched = mergeList.find((list) => match(curr) === match(list));
    if (matched) {
      prev.push(matched);
    } else {
      prev.push(curr);
    }

    return prev;
  }, []);
}
