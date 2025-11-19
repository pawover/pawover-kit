import type { NonEmptyObject, UnionToTuple, ValueOf } from "type-fest";
import { enumTypeCheck } from "./enumTypeCheck";
import { objectKeys } from "./objectKeys";
import { objectValues } from "./objectValues";

/**
 * 获取枚举所有属性的值
 *
 * @param enumeration 枚举
 */
export function enumValues<E extends AnyObject>(enumeration: NonEmptyObject<E>): UnionToTuple<ValueOf<E>> {
  const e = enumTypeCheck(enumeration);
  const keys = objectKeys(e) as [keyof E, ...(keyof E)[]];
  const values = objectValues(e);
  const isTwoWayEnum = keys.every((k) => values.some((v) => `${v}` === k));

  if (isTwoWayEnum) {
    return values.splice(keys.length / 2, keys.length / 2) as UnionToTuple<ValueOf<E>>;
  }

  return values;
}
