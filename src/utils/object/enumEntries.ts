import type { NonEmptyObject } from "type-fest";
import { enumTypeCheck } from "./enumTypeCheck";
import { objectEntries } from "./objectEntries";
import { objectKeys } from "./objectKeys";
import { objectValues } from "./objectValues";

/**
 * 返回枚举的属性的键/值数组
 *
 * @param enumeration 枚举
 */
export function enumEntries<E extends AnyObject>(enumeration: NonEmptyObject<E>): [keyof E, E[keyof E]][] {
  const e = enumTypeCheck(enumeration);
  const keys = objectKeys(e) as [keyof E, ...(keyof E)[]];
  const values = objectValues(e);
  const entries = objectEntries(e);
  const isTwoWayEnum = keys.every((k) => values.some((v) => `${v}` === k));

  if (isTwoWayEnum) {
    return entries.splice(keys.length / 2, keys.length / 2);
  }

  return entries;
}
