import type { AnyObject } from "@pawover/types";
import { isString } from "../typeof";

/**
 * 处理 JSON 字符串
 *
/**
 * 处理 JSON 字符串
 *
 * @param input 待处理字符串
 * @param safeValue 安全值 (当解析失败或输入无效时返回)
 * @returns 解析后的对象 或 安全值
 * @example
 * ```ts
 * stringToJson('{"a": 1}', {}); // { a: 1 }
 * stringToJson('invalid', {}); // {}
 * ```
 */
export function stringToJson<D extends AnyObject = AnyObject>(input: string | null | undefined, safeValue: D): D {
  if (!isString(input, true)) {
    return safeValue;
  }

  try {
    const value = JSON.parse(input);

    return value;
  } catch (error) {
    return safeValue;
  }
}
