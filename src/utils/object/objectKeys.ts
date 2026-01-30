import type { AnyObject, PlainObject } from "@pawover/types";
import type { Split, UnionToTuple } from "type-fest";
import type { Range } from "../../types/index.type";


/**
 * 返回对象可枚举属性和方法的名称
 * - `Object.keys` 始终返回 `string[]` 类型，此函数可以返回具体类型
 *
 * @param value 对象
 * @returns 键数组
 * @example
 * ```ts
 * objectKeys({ a: 1, b: 2 }); // ["a", "b"]
 * ```
 */
export function objectKeys<const S extends string>(string: S): UnionToTuple<Range<0, Split<S, "">["length"]>>;
export function objectKeys<const A extends ArrayLike<unknown>>(array: A): UnionToTuple<Range<0, A["length"]>>;
export function objectKeys<O extends PlainObject>(plainObject: O): `${Extract<keyof O, string | number>}`[];
export function objectKeys<O extends AnyObject>(anyObject: O): `${Extract<keyof O, string | number>}`[];
export function objectKeys(value: object) {
  return Object.keys(value);
}
