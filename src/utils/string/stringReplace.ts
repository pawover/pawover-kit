import type { Replace } from "type-fest";
import { isString } from "../typeof";

/**
 * 字符串替换
 * - 替换第一个匹配项
 *
/**
 * 字符串替换
 * - 替换第一个匹配项
 *
 * @param input 待处理字符串
 * @param search 匹配项
 * @param replacement 替换项
 * @returns 替换后的字符串
 * @example
 * ```ts
 * stringReplace("hello world", "world", "context"); // "hello context"
 * ```
 */
export function stringReplace<I extends string, S extends string, R extends string> (input: I, search: S, replacement: R) {
  if (!isString(input, true)) {
    return "" as Replace<I, S, R>;
  }


  return input.replace(search, replacement) as Replace<I, S, R>;
}
