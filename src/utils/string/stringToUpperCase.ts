import { isString } from "../typeof";

/**
 * 将字符串转换为大写
 * - 将字符串字面量类型转换为其大写形式
 * - 当输入无效时，返回空字符串
 *
 * @param input 待处理字符串
 * @returns 转换后的大写字符串，如果输入无效则返回空字符串
 * @example
 * ```ts
 * stringToUpperCase("hello"); // 类型为 "HELLO"
 * stringToUpperCase(someUnknownString); // 类型为 string
 * stringToUpperCase(null); // 类型为 ""
 * ```
 */
export function stringToUpperCase<const T extends string> (input: T): Uppercase<T>;
export function stringToUpperCase (input: unknown): "";
export function stringToUpperCase<const T extends string> (input: T): Uppercase<T> | "" {
  if (!isString(input, true)) {
    return "";
  }

  return input.toUpperCase() as Uppercase<T>;
}
