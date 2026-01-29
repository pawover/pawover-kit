import { isArray } from "../typeof";

export function arrayUnzip<T>(arrays: readonly (readonly T[])[]): T[][] {
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

export function arrayZip<T1, T2, T3, T4, T5>(array1: readonly T1[], array2: readonly T2[], array3: readonly T3[], array4: readonly T4[], array5: readonly T5[]): [T1, T2, T3, T4, T5][];
export function arrayZip<T1, T2, T3, T4>(array1: readonly T1[], array2: readonly T2[], array3: readonly T3[], array4: readonly T4[]): [T1, T2, T3, T4][];
export function arrayZip<T1, T2, T3>(array1: readonly T1[], array2: readonly T2[], array3: readonly T3[]): [T1, T2, T3][];
export function arrayZip<T1, T2>(array1: readonly T1[], array2: readonly T2[]): [T1, T2][];
export function arrayZip<T>(...arrays: (readonly T[])[]): T[][] {
  return arrayUnzip(arrays);
}
