import { isString } from "../typeof";

export function stringToJson<R extends AnyObject = AnyObject, D extends R = R>(data: string | null | undefined, safeValue: D): R {
  if (isString(data) && data) {
    try {
      const value = JSON.parse(data);

      return value;
    } catch (error) {
      return safeValue;
    }
  } else {
    return safeValue;
  }
}
