/* eslint-disable ts/no-explicit-any */
import type { Any, List } from "ts-toolbelt";
import type { If, IsAny, TupleOf } from "type-fest";

export type AnyArray<A = any> = readonly A[];
export type Range<Start extends number, End extends number> = Exclude<keyof TupleOf<End>, keyof TupleOf<Start>>;
export type TupleToEntries<A extends readonly unknown[]> = If<IsAny<A>, unknown, { [Key in keyof A]: [Key, A[Key]] }>;

type Groups<L extends AnyArray, LN extends AnyArray = [], D extends number[] = []> = D["length"] extends 40
  ? LN
  : {
    0: Groups<List.Drop<L, 1>, List.Append<LN, [`${LN["length"]}`, List.Take<L, 1>]>, [...D, 0]>;
    1: LN;
  }[Any.Extends<L, AnyArray<never>>];
export type TupleToGroups<L extends AnyArray> = Groups<L> extends infer X ? Any.Cast<X, AnyArray> : never;
