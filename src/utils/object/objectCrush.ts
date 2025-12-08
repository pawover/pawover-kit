import type { Simplify, UnionToIntersection } from "type-fest";
import { isArray, isObject } from "../typeof";

export type Crush<T> = T extends readonly (infer U)[]
  ? Record<string, U extends object ? unknown : U>
  : Simplify<
    UnionToIntersection<
      keyof T extends infer Prop
        ? Prop extends keyof T
          ? T[Prop] extends infer Value
            ?
                  | ([Extract<Value, object>] extends [never] ? never : Record<string, unknown>)
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

export function objectCrush<T extends object>(value: T): Crush<T> {
  if (!value) {
    return {} as Crush<T>;
  }

  function crushReducer(crushed: Crush<T>, value: unknown, path: string) {
    if (isObject(value) || isArray(value)) {
      for (const [prop, propValue] of Object.entries(value)) {
        crushReducer(crushed, propValue, path ? `${path}.${prop}` : prop);
      }
    } else {
      crushed[path as keyof Crush<T>] = value as Crush<T>[keyof Crush<T>];
    }

    return crushed;
  }

  return crushReducer({} as Crush<T>, value, "");
}
