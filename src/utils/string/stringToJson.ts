import { isString } from "../typeof";

export function stringToJson<R extends AnyObject = AnyObject, D extends R = R>(input: string | null | undefined, safeValue: D): R {
  if (isString(input) && input) {
    try {
      const value = JSON.parse(input);

      return value;
    } catch (error) {
      return safeValue;
    }
  } else {
    return safeValue;
  }
}
