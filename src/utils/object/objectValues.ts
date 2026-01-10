import type { AnyObject, PlainObject } from "@pawover/types";
import type { Split, UnionToTuple, ValueOf } from "type-fest";

/**
 * 返回对象可枚举属性的值的数组
 */
export function objectValues<S extends string>(string: S): Split<S, "">;
export function objectValues<A extends ArrayLike<unknown>>(array: A): A;
export function objectValues<O extends PlainObject>(plainObject: O): UnionToTuple<ValueOf<O>>;
export function objectValues<O extends AnyObject>(anyObject: O): UnionToTuple<ValueOf<O>>;
export function objectValues(value: object) {
  return Object.values(value);
}
