import type { AnyObject } from "@pawover/types";
import { isString } from "../typeof";

/**
 * 处理 JSON 字符串
 *
 * @param input 待处理字符串
 * @param safeValue 安全值
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
