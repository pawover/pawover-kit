import { isObject } from "./isObject";
import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

export function isDate(value: unknown): value is Date {
  if (!isObject(value)) {
    return false;
  }

  try {
    return resolvePrototypeString(value) === PROTOTYPE_TAGS.date && typeof (value)["getTime"] === "function";
  } catch (error) {
    return false;
  }
}
