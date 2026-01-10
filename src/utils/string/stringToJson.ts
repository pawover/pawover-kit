import type { AnyObject } from "@pawover/types";
import { isString } from "../typeof";

/**
 * 处理 JSON 字符串
 *
 * @param input 待处理字符串
 * @param safeValue 安全值
 */
export function stringToJson<R extends AnyObject = AnyObject, D extends R = R>(input: string | null | undefined, safeValue: D): R {
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
