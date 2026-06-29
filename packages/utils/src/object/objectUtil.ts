import type { AnyObject, PlainObject } from "@pawover/types";
import type { Except, Split, UnionToTuple, ValueOf } from "type-fest";
import { TypeUtil } from "../type";
import type { Crush, Invert, Range, TupleToEntries, TupleToGroups } from "./index.type";

/**
 * 对象工具类
 */
export class ObjectUtil {
  /**
   * 返回对象可枚举属性和方法的名称
   * - `Object.keys` 始终返回 `string[]` 类型，此函数可以返回具体类型
   *
   * @param value 对象
   * @returns 键数组
   * @example
   * ```ts
   * // 重载 1: string
   * ObjectUtil.keys("abc"); // ["0", "1", "2"]
   *
   * // 重载 2: ArrayLike
   * ObjectUtil.keys([10, 20]); // ["0", "1"]
   *
   * // 重载 3: PlainObject
   * ObjectUtil.keys({ a: 1, b: 2 }); // ["a", "b"]
   *
   * // 重载 4: AnyObject
   * const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
   * ObjectUtil.keys(anyObj); // ["x", "y"]
   * ```
   */
  static keys<const S extends string>(string: S): UnionToTuple<Range<0, Split<S, "">["length"]>>;
  static keys<const A extends ArrayLike<unknown>>(array: A): UnionToTuple<Range<0, A["length"]>>;
  static keys<O extends PlainObject>(plainObject: O): `${Extract<keyof O, string | number>}`[];
  static keys<O extends AnyObject>(anyObject: O): `${Extract<keyof O, string | number>}`[];
  static keys (value: object) {
    return Object.keys(value);
  }

  /**
   * 返回对象可枚举属性的值的数组
   *
   * @param value 对象
   * @returns 值数组
   * @example
   * ```ts
   * // 重载 1: string
   * ObjectUtil.values("abc"); // ["a", "b", "c"]
   *
   * // 重载 2: ArrayLike
   * ObjectUtil.values([10, 20]); // [10, 20]
   *
   * // 重载 3: PlainObject
   * ObjectUtil.values({ a: 1, b: 2 }); // [1, 2]
   *
   * // 重载 4: AnyObject
   * const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
   * ObjectUtil.values(anyObj); // [1, 2]
   * ```
   */
  static values<S extends string>(string: S): Split<S, "">;
  static values<A extends ArrayLike<unknown>>(array: A): A;
  static values<O extends PlainObject>(plainObject: O): O[keyof O][];
  static values<O extends AnyObject>(anyObject: O): O[keyof O][];
  static values (value: object) {
    return Object.values(value);
  }

  /**
   * 返回对象的可枚举属性的键/值数组
   *
   * @param value 对象
   * @returns 键值对数组
   * @example
   * ```ts
   * // 重载 1: string
   * ObjectUtil.entries("ab"); // [["0", "a"], ["1", "b"]]
   *
   * // 重载 2: readonly array
   * ObjectUtil.entries([10, 20] as const); // [["0", 10], ["1", 20]]
   *
   * // 重载 3: PlainObject
   * ObjectUtil.entries({ a: 1 }); // [["a", 1]]
   *
   * // 重载 4: AnyObject
   * const anyObj = { x: 1 } as Record<string, unknown>;
   * ObjectUtil.entries(anyObj); // [["x", 1]]
   * ```
   */
  static entries<const S extends string>(string: S): TupleToEntries<Split<S, "">>;
  static entries<const A extends readonly unknown[]>(array: A): TupleToGroups<A>;
  static entries<const O extends PlainObject>(plainObject: O): [`${keyof Except<O, symbol>}`, O[keyof Except<O, symbol>]][];
  static entries<const O extends AnyObject>(anyObject: O): [`${keyof Except<O, symbol>}`, O[keyof Except<O, symbol>]][];
  static entries (value: object) {
    return Object.entries(value) as unknown;
  }

  /**
   * 映射对象条目
   * - 将对象的键值对映射为新的键值对
   *
   * @param plainObject 对象
   * @param toEntry 映射函数
   * @returns 映射后的新对象
   * @example
   * ```ts
   * const obj = { a: 1, b: 2 };
   *
   * ObjectUtil.entriesMap(obj, (k, v) => [k, v * 2]); // { a: 2, b: 4 }
   *
   * ObjectUtil.entriesMap(obj, (k, v) => [`prefix_${String(k)}`, `${v}x`]); // { prefix_a: "1x", prefix_b: "2x" }
   * ```
   */
  static entriesMap<O extends PlainObject, NK extends PropertyKey, NV>(plainObject: O, toEntry: (key: keyof O, value: O[keyof O]) => [NK, NV]): PlainObject<NK, NV> {
    const defaultResult = {} as PlainObject<NK, NV>;

    if (!TypeUtil.isPlainObject(plainObject)) {
      return defaultResult;
    }

    return this.entries(plainObject).reduce((acc, [key, value]) => {
      const [newKey, newValue] = toEntry(key, value);
      acc[newKey] = newValue;

      return acc;
    }, defaultResult);
  }

  /**
   * 选取对象的指定属性
   *
   * @param plainObject 对象
   * @param keys 要选取的属性键数组
   * @returns 包含指定属性的新对象
   * @example
   * ```ts
   * // 重载 1: PlainObject
   * ObjectUtil.pick({ a: 1, b: 2 }, ["a"]); // { a: 1 }
   *
   * // 重载 2: AnyObject
   * const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
   * ObjectUtil.pick(anyObj, ["x"]); // { x: 1 }
   * ```
   */
  static pick<O extends PlainObject, K extends keyof O>(plainObject: O, keys: readonly K[]): Pick<O, K>;
  static pick<O extends AnyObject, K extends keyof O>(anyObject: O, keys: readonly K[]): Pick<O, K>;
  static pick (obj: object, keys: readonly PropertyKey[]) {
    const result = {} as PlainObject;

    if (!TypeUtil.isPlainObject(obj)) {
      return result;
    }
    if (!TypeUtil.isArray(keys)) {
      return obj;
    }

    return keys.reduce((acc, key) => {
      if (key in obj) {
        acc[key] = obj[key];
      }

      return acc;
    }, result);
  }

  /**
   * 排除对象的指定属性
   *
   * @param plainObject 对象
   * @param keys 要排除的属性键数组
   * @returns 排除指定属性后的新对象
   * @example
   * ```ts
   * // 重载 1: PlainObject
   * ObjectUtil.omit({ a: 1, b: 2 }, ["a"]); // { b: 2 }
   *
   * // 重载 2: AnyObject
   * const anyObj = { x: 1, y: 2 } as Record<string, unknown>;
   * ObjectUtil.omit(anyObj, ["x"]); // { y: 2 }
   * ```
   */
  static omit<O extends PlainObject, K extends keyof O>(plainObject: O, keys: readonly K[]): Omit<O, K>;
  static omit<O extends AnyObject, K extends keyof O>(anyObject: O, keys: readonly K[]): PlainObject;
  static omit (obj: object, keys: readonly string[]) {
    const result = {} as PlainObject;

    if (!TypeUtil.isPlainObject(obj)) {
      return result;
    }
    if (!TypeUtil.isArray(keys)) {
      return obj;
    }

    const keysToOmit = new Set(keys);

    return Object.keys(obj).reduce((acc, key) => {
      if (!keysToOmit.has(key)) {
        acc[key] = obj[key];
      }

      return acc;
    }, result);
  }

  /**
   * 尽可能地交换对象的键和值
   *
   * @param obj 对象
   * @returns 键值互换后的对象
   * @example
   * ```ts
   * // 重载 1: Record<keyof O, PropertyKey>
   * const obj = { a: "1", b: 2 };
   * ObjectUtil.invert(obj); // { "1": "a", 2: "b" }
   *
   * // 重载 2: AnyObject
   * const anyObj = { x: Symbol.for("s"), y: true } as Record<string, unknown>;
   * ObjectUtil.invert(anyObj); // { [Symbol.for("s")]: "x" }
   * ```
   */
  static invert<const O extends Record<keyof O, PropertyKey>>(plainObject: O): Invert<O>;
  static invert<const O extends AnyObject>(anyObject: O): Invert<O>;
  static invert (obj: AnyObject) {
    const result = {} as Invert<AnyObject>;

    if (!TypeUtil.isPlainObject(obj)) {
      return result;
    }

    for (const [k, v] of this.entries(obj)) {
      if (TypeUtil.isString(v) || TypeUtil.isNumber(v) || TypeUtil.isSymbol(v)) {
        (result as AnyObject)[v] = k;
      }
    }

    return result;
  }

  /**
   * 压平对象
   * - 将多层级的对象转换为单层级的对象，键名使用点号连接
   *
   * @param plainObject 平面对象
   * @returns 压平后的对象
   * @example
   * ```ts
   * // 重载 1: PlainObject
   * const plainObj = { a: { b: 1 } };
   * ObjectUtil.crush(plainObj); // { "a.b": 1 }
   *
   * // 重载 2: AnyObject
   * const anyObj = { list: [{ id: 1 }] } as Record<string, unknown>;
   * ObjectUtil.crush(anyObj); // { "list.0.id": 1 }
   * ```
   */
  static crush<T extends PlainObject>(plainObject: T): Crush<T>;
  static crush<T extends AnyObject>(anyObject: T): Crush<T>;
  static crush<T extends AnyObject>(obj: T): Crush<T> {
    if (!obj) {
      return {} as Crush<T>;
    }

    function crushReducer (crushed: Crush<T>, value: unknown, path: string) {
      if (TypeUtil.isPlainObject(value) || TypeUtil.isArray(value)) {
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

  /**
   * 获取所有枚举成员的键
   *
   * @param enumeration 枚举对象
   * @returns 键数组
   * @example
   * ```ts
   * // 重载 1: PlainObject
   * enum StringEnum { A = "a", B = "b" }
   * ObjectUtil.enumKeys(StringEnum); // ["A", "B"]
   *
   * // 重载 2: AnyObject
   * enum NumberEnum { A, B }
   * const anyEnum = NumberEnum as Record<string, unknown>;
   * ObjectUtil.enumKeys(anyEnum); // ["A", "B"]
   * ```
   */
  static enumKeys<E extends PlainObject>(enumeration: E): (keyof E)[];
  static enumKeys<E extends AnyObject>(enumeration: E): (keyof E)[];
  static enumKeys (enumeration: AnyObject) {
    const [isEnum, isBidirectionalEnum] = TypeUtil.isEnumeration(enumeration);

    if (!isEnum) {
      throw Error("function [enumKeys] expected parameter to be a enum, and requires at least one member");
    }

    const keys = this.keys(enumeration);

    if (isBidirectionalEnum) {
      return keys.splice(keys.length / 2, keys.length / 2);
    }

    return keys;
  }

  /**
   * 获取所有枚举成员的值
   *
   * @param enumeration 枚举对象
   * @returns 值数组
   * @example
   * ```ts
   * // 重载 1: PlainObject
   * enum StringEnum { A = "a", B = "b" }
   * ObjectUtil.enumValues(StringEnum); // ["a", "b"]
   *
   * // 重载 2: AnyObject
   * enum NumberEnum { A, B }
   * const anyEnum = NumberEnum as Record<string, unknown>;
   * ObjectUtil.enumValues(anyEnum); // [0, 1]
   * ```
   */
  static enumValues<E extends PlainObject>(enumeration: E): UnionToTuple<ValueOf<E>>;
  static enumValues<E extends AnyObject>(enumeration: E): UnionToTuple<ValueOf<E>>;
  static enumValues (enumeration: AnyObject) {
    const [isEnum, isBidirectionalEnum] = TypeUtil.isEnumeration(enumeration);

    if (!isEnum) {
      throw Error("function [enumValues] expected parameter to be a enum, and requires at least one member");
    }

    const values = this.values(enumeration);

    if (isBidirectionalEnum) {
      return values.splice(values.length / 2, values.length / 2);
    }

    return values;
  }

  /**
   * 获取所有枚举成员的键/值数组
   *
   * @param enumeration 枚举对象
   * @returns 键值对数组
   * @example
   * ```ts
   * // 重载 1: PlainObject
   * enum StringEnum { A = "a", B = "b" }
   * ObjectUtil.enumEntries(StringEnum); // [["A", "a"], ["B", "b"]]
   *
   * // 重载 2: AnyObject
   * enum NumberEnum { A, B }
   * const anyEnum = NumberEnum as Record<string, unknown>;
   * ObjectUtil.enumEntries(anyEnum); // [["A", 0], ["B", 1]]
   * ```
   */
  static enumEntries<E extends PlainObject>(enumeration: E): [keyof E, E[keyof E]][];
  static enumEntries<E extends AnyObject>(enumeration: E): [keyof E, E[keyof E]][];
  static enumEntries (enumeration: AnyObject) {
    const [isEnum, isBidirectionalEnum] = TypeUtil.isEnumeration(enumeration);

    if (!isEnum) {
      throw Error("function [enumEntries] expected parameter to be a enum, and requires at least one member");
    }

    const entries = this.entries(enumeration);

    if (isBidirectionalEnum) {
      return entries.splice(entries.length / 2, entries.length / 2);
    }

    return entries;
  }
}
