import type { Replace } from "type-fest";
import { isString } from "../typeof";

/**
 * 字符串替换
 * - 替换第一个匹配项
 *
 * @param input 待处理字符串
 * @param search 匹配项
 * @param replacement 替换项
 */
export function stringReplace<I extends string, S extends string, R extends string>(input: I, search: S, replacement: R) {
  if (!isString(input) || !input.length) {
    return "" as Replace<I, S, R>;
  }


  return input.replace(search, replacement) as Replace<I, S, R>;
}
