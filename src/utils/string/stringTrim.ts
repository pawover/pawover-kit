import { isString } from "../typeof";

/**
 * 从字符串中裁切掉所有的前缀和后缀字符
 *
 * @param input 待处理字符串
 * @param charsToTrim 裁切字符，默认为 `" "`
 */
export function stringTrim(input: string | null | undefined, charsToTrim = " "): string {
  if (!isString(input, true)) {
    return "";
  }
  const toTrim = charsToTrim.replace(/[\W]{1}/g, "\\$&");
  const regex = new RegExp(`^[${toTrim}]+|[${toTrim}]+$`, "g");

  return input.replace(regex, "");
}
