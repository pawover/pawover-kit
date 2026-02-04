import { isArray } from "../typeof";

/**
 * 数组解压
 * - `arrayZip` 的反向操作
 *
 * @param arrays 压缩后的数组
 * @returns 解压后的二维数组
 * @example
 * ```ts
 * arrayUnzip([[1, "a"], [2, "b"]]); // [[1, 2], ["a", "b"]]
 * ```
 */
export function arrayUnzip<T> (arrays: readonly (readonly T[])[]): T[][] {
  if (!isArray(arrays) || !arrays.length) {
    return [];
  }
  const out = new Array(arrays.reduce((max, arr) => Math.max(max, arr.length), 0));
  let index = 0;
  const get = (array: T[]) => array[index];

  for (; index < out.length; index++) {
    out[index] = Array.from(arrays as { length: number }, get);
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
 * arrayZip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
 * ```
 */
export function arrayZip<T1, T2, T3, T4, T5> (array1: readonly T1[], array2: readonly T2[], array3: readonly T3[], array4: readonly T4[], array5: readonly T5[]): [T1, T2, T3, T4, T5][];
export function arrayZip<T1, T2, T3, T4> (array1: readonly T1[], array2: readonly T2[], array3: readonly T3[], array4: readonly T4[]): [T1, T2, T3, T4][];
export function arrayZip<T1, T2, T3> (array1: readonly T1[], array2: readonly T2[], array3: readonly T3[]): [T1, T2, T3][];
export function arrayZip<T1, T2> (array1: readonly T1[], array2: readonly T2[]): [T1, T2][];
export function arrayZip (): [];
export function arrayZip<T> (...arrays: (readonly T[])[]): T[][] {
  return arrayUnzip(arrays);
}
