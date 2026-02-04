import type { AnyObject, PlainObject } from "@pawover/types";
import type { Simplify, UnionToIntersection } from "type-fest";
import { isArray, isObject } from "../typeof";

type Crush<T> = T extends readonly (infer U)[]
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

/**
 * 压平对象
 * - 将多层级的对象转换为单层级的对象，键名使用点号连接
 *
 * @param plainObject 平面对象
 * @returns 压平后的对象
 * @example
 * ```ts
 * const obj = { a: { b: 1 } };
 * objectCrush(obj); // { "a.b": 1 }
 * ```
 */
export function objectCrush<T extends PlainObject> (plainObject: T): Crush<T>;
export function objectCrush<T extends AnyObject> (anyObject: T): Crush<T>;
export function objectCrush<T extends AnyObject> (obj: T): Crush<T> {
  if (!obj) {
    return {} as Crush<T>;
  }

  function crushReducer (crushed: Crush<T>, value: unknown, path: string) {
    if (isObject(value) || isArray(value)) {
      for (const [prop, propValue] of Object.entries(value)) {
        crushReducer(crushed, propValue, path ? `${path}.${prop}` : prop);
      }
    } else {
      crushed[path as keyof Crush<T>] = value as Crush<T>[keyof Crush<T>];
    }

    return crushed;
  }

  return crushReducer({} as Crush<T>, obj, "");
}
