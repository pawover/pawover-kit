import { isBoolean, isFunction, isObject, isString } from ".";
import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

export function isRegExp(value: unknown): value is RegExp {
  if (!isObject(value)) {
    return false;
  }

  try {
    const regex = value as unknown as RegExp;

    return (
      resolvePrototypeString(value) === PROTOTYPE_TAGS.regExp &&
      isString(regex.source) &&
      isString(regex.flags) &&
      isBoolean(regex.global) &&
      isFunction(regex.test)
    );
  } catch (error) {
    return false;
  }
}
