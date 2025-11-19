import type { UnionToTuple, ValueOf } from "type-fest";

/**
 * 返回对象的可枚举属性的值数组
 *
 * @param obj 对象
 */
export function objectValues<O extends AnyObject>(obj: O): UnionToTuple<ValueOf<O>> {
  return Object.values(obj) as UnionToTuple<ValueOf<O>>;
}
