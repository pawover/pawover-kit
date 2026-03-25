import type { PlainObject } from "@pawover/types";
import { isString } from "../typeof";

const R1 = /\{\{(.+?)\}\}/g;

/**
 * 字符串模板替换
 * - 使用对象的属性值替换字符串中的 {{key}} 模板
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

  // 重置正则表达式的 lastIndex，防止上次执行的影响
  regex.lastIndex = 0;

  let result = "";
  let from = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input))) {
    // 获取模板对象中对应的值
    const replacement = template[match[1]!];
    // 如果值为 null 或 undefined，则保留原始的占位符
    const valueToInsert = (replacement === null || replacement === undefined)
      ? match[0]
      : replacement;

    result += input.slice(from, match.index) + valueToInsert;
    from = regex.lastIndex;
  }

  return result + input.slice(from);
}
