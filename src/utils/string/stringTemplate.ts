import type { PlainObject } from "@pawover/types";
import { isString } from "../typeof";

const R1 = /\{\{(.+?)\}\}/g;

/**
 * 字符串模板替换
 *
/**
 * 字符串模板替换
 *
 * @param input 待处理字符串
 * @param template 模板对象
 * @param regex 模板匹配正则 (默认: `\{\{(.+?)\}\}`)
 * @returns 替换后的字符串
 * @example
 * ```ts
 * stringTemplate("Hello {{name}}", { name: "World" }); // "Hello World"
 * ```
 */
export function stringTemplate (input: string, template: PlainObject, regex = R1) {
  if (!isString(input, true)) {
    return "";
  }

  let result = "";
  let from = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input))) {
    result += input.slice(from, match.index) + template[match[1]!];
    from = regex.lastIndex;
  }

  return result + input.slice(from);
}
