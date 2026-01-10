import type { AnyObject, PlainObject } from "@pawover/types";
import type { Split } from "type-fest";
import type { TupleToEntries, TupleToGroups } from "../../types/index.type";

/**
 * 返回对象的可枚举属性的键/值数组
 */
export function objectEntries<const S extends string>(string: S): TupleToEntries<Split<S, "">>;
export function objectEntries<const A extends readonly unknown[]>(array: A): TupleToGroups<A>;
export function objectEntries<const O extends PlainObject>(plainObject: O): [string & keyof O, O[keyof O]][];
export function objectEntries<const O extends AnyObject>(anyObject: O): [string & keyof O, O[keyof O]][];
export function objectEntries(value: object) {
  return Object.entries(value) as unknown;
}
