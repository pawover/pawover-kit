import { isString } from "../typeof";

/**
 * 将字符串转换为小写
 * - 将字符串字面量类型转换为其小写形式
 * - 当输入无效时，返回空字符串
 *
 * @param input 待处理字符串
 * @returns 转换后的小写字符串类型，如果输入无效则返回空字符串类型 ""
 * @example
 * ```ts
 * stringToLowerCase("HELLO"); // 类型为 "hello"
 * stringToLowerCase(someUnknownString); // 类型为 string
 * stringToLowerCase(null); // 类型为 ""
 * ```
 */
export function stringToLowerCase<const T extends string> (input: T): Lowercase<T>;
export function stringToLowerCase (input: unknown): "";
export function stringToLowerCase<const T extends string> (input: T): Lowercase<T> | "" {
  if (!isString(input, true)) {
    return "";
  }

  return input.toLowerCase() as Lowercase<T>;
}
