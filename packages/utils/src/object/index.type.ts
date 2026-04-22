/* eslint-disable ts/no-explicit-any */
import type { AnyFunction } from "@pawover/types";
import type { Any, List } from "ts-toolbelt";
import type { If, IsAny, Simplify, TupleOf, UnionToIntersection } from "type-fest";

export type Range<Start extends number, End extends number> = Exclude<keyof TupleOf<End>, keyof TupleOf<Start>>;

export type AnyArray<A = any> = readonly A[];
export type TupleToEntries<A extends readonly unknown[]> = If<IsAny<A>, unknown, { [Key in keyof A]: [Key, A[Key]] }>;
type Groups<L extends AnyArray, LN extends AnyArray = [], D extends number[] = []> = D["length"] extends 40
  ? LN
  : {
    0: Groups<List.Drop<L, 1>, List.Append<LN, [`${LN["length"]}`, List.Take<L, 1>]>, [...D, 0]>;
    1: LN;
  }[Any.Extends<L, AnyArray<never>>];
export type TupleToGroups<L extends AnyArray> = Groups<L> extends infer X ? Any.Cast<X, AnyArray> : never;

export type Crush<T> = T extends readonly (infer U)[]
  ? Record<string, U extends object ? unknown : U>
  : Simplify<
    UnionToIntersection<
      keyof T extends infer Prop
        ? Prop extends keyof T
          ? T[Prop] extends infer Value
            ? | ([Extract<Value, object>] extends [never] ? never : Record<string, unknown>)
            | ([Exclude<Value, object>] extends [never]
              ? never
              : [Extract<Value, object>] extends [never]
                ? { [P in Prop]: Value }
                : Record<string, unknown>)
            : never
          : never
        : never
    >
  >;

export type IntersectOf<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type ComputeRaw<A> = A extends AnyFunction ? A : { [K in keyof A]: A[K] } & unknown;
export type _Invert<O extends Record<PropertyKey, PropertyKey>> = ComputeRaw<IntersectOf<{ [K in keyof O]: Record<O[K], K> }[keyof O]>>;
export type Invert<O extends Record<keyof O, PropertyKey>> = O extends unknown ? _Invert<O> : never;
