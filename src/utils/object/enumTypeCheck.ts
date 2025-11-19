import { isObject } from "../typeof";
import { objectKeys } from "./objectKeys";

export function enumTypeCheck<E extends AnyObject>(enumeration: E) {
  if (!isObject(enumeration)) {
    throw Error(`function enumKeys expected parameter is a enum, but got ${typeof enumeration}`);
  }

  if (!objectKeys(enumeration).length) {
    throw Error("Enum requires at least one member");
  }

  return enumeration;
}
