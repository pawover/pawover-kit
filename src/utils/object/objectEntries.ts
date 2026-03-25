import type { AnyObject, PlainObject } from "@pawover/types";
import type { Except, Split } from "type-fest";
import type { TupleToEntries, TupleToGroups } from "../../types/index.type";

/**
 * 返回对象的可枚举属性的键/值数组
 *
 * @param value 对象
 * @returns 键值对数组
 * @example
 * ```ts
 * objectEntries({ a: 1 }); // [["a", 1]]
 * ```
 */
export function objectEntries<const S extends string> (string: S): TupleToEntries<Split<S, "">>;
export function objectEntries<const A extends readonly unknown[]> (array: A): TupleToGroups<A>;
export function objectEntries<const O extends PlainObject> (plainObject: O): [`${keyof Except<O, symbol>}`, O[keyof Except<O, symbol>]][];
export function objectEntries<const O extends AnyObject> (anyObject: O): [`${keyof Except<O, symbol>}`, O[keyof Except<O, symbol>]][];
export function objectEntries (value: object) {
  return Object.entries(value) as unknown;
}
