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
   * ObjectUtil.keys({ a: 1, b: 2 }); // ["a", "b"]
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
   * ObjectUtil.values({ a: 1, b: 2 }); // [1, 2]
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
   * ObjectUtil.entries({ a: 1 }); // [["a", 1]]
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
   * ObjectUtil.entriesMap(obj, (k, v) => [k, v * 2]); // { a: 2, b: 4 }
   * ```
   */
  static entriesMap<O extends PlainObject, NK extends PropertyKey, NV>(plainObject: O, toEntry: (key: keyof O, value: O[keyof O]) => [NK, NV]): PlainObject<NK, NV> {
    const defaultResult = {} as PlainObject<NK, NV>;

    if (!TypeUtil.isObject(plainObject)) {
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
   * ObjectUtil.pick({ a: 1, b: 2 }, ["a"]); // { a: 1 }
   * ```
   */
  static pick<O extends PlainObject, K extends keyof O>(plainObject: O, keys: readonly K[]): Pick<O, K>;
  static pick<O extends AnyObject, K extends keyof O>(anyObject: O, keys: readonly K[]): Pick<O, K>;
  static pick (obj: object, keys: readonly PropertyKey[]) {
    const result = {} as PlainObject;

    if (!TypeUtil.isObject(obj)) {
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
   * ObjectUtil.omit({ a: 1, b: 2 }, ["a"]); // { b: 2 }
   * ```
   */
  static omit<O extends PlainObject, K extends keyof O>(plainObject: O, keys: readonly K[]): Omit<O, K>;
  static omit<O extends AnyObject, K extends keyof O>(anyObject: O, keys: readonly K[]): Omit<O, K>;
  static omit (obj: object, keys: readonly string[]) {
    const result = {} as PlainObject;

    if (!TypeUtil.isObject(obj)) {
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
   * const obj = { a: "1", b: 2 };
   * ObjectUtil.invert(obj); // { "1": "a", 2: "b" }
   * ```
   */
  static invert<const O extends Record<keyof O, PropertyKey>>(plainObject: O): Invert<O>;
  static invert<const O extends AnyObject>(anyObject: O): Invert<O>;
  static invert (obj: AnyObject) {
    const result = {} as Invert<AnyObject>;

    if (!TypeUtil.isObject(obj)) {
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
   * const obj = { a: { b: 1 } };
   * ObjectUtil.crush(obj); // { "a.b": 1 }
   * ```
   */
  static crush<T extends PlainObject>(plainObject: T): Crush<T>;
  static crush<T extends AnyObject>(anyObject: T): Crush<T>;
  static crush<T extends AnyObject>(obj: T): Crush<T> {
    if (!obj) {
      return {} as Crush<T>;
    }

    function crushReducer (crushed: Crush<T>, value: unknown, path: string) {
      if (TypeUtil.isObject(value) || TypeUtil.isArray(value)) {
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
   * enum A { k = "v" }
   * ObjectUtil.enumKeys(A); // ["k"]
   * ```
   */
  static enumKeys<E extends PlainObject>(enumeration: E): (keyof E)[];
  static enumKeys<E extends AnyObject>(enumeration: E): (keyof E)[];
  static enumKeys (enumeration: AnyObject) {
    const [isEnum, isBidirectionalEnum] = TypeUtil.isEnumeration(enumeration);

    if (!isEnum) {
      throw Error("function enumKeys expected parameter is a enum, and requires at least one member");
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
   * enum A { k = "v" }
   * ObjectUtil.enumValues(A); // ["v"]
   * ```
   */
  static enumValues<E extends PlainObject>(enumeration: E): UnionToTuple<ValueOf<E>>;
  static enumValues<E extends AnyObject>(enumeration: E): UnionToTuple<ValueOf<E>>;
  static enumValues (enumeration: AnyObject) {
    const [isEnum, isBidirectionalEnum] = TypeUtil.isEnumeration(enumeration);

    if (!isEnum) {
      throw Error("function enumValues expected parameter is a enum, and requires at least one member");
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
   * enum A { k = "v" }
   * ObjectUtil.enumEntries(A); // [["k", "v"]]
   * ```
   */
  static enumEntries<E extends PlainObject>(enumeration: E): [keyof E, E[keyof E]][];
  static enumEntries<E extends AnyObject>(enumeration: E): [keyof E, E[keyof E]][];
  static enumEntries (enumeration: AnyObject) {
    const [isEnum, isBidirectionalEnum] = TypeUtil.isEnumeration(enumeration);

    if (!isEnum) {
      throw Error("function enumEntries expected parameter is a enum, and requires at least one member");
    }

    const entries = this.entries(enumeration);

    if (isBidirectionalEnum) {
      return entries.splice(entries.length / 2, entries.length / 2);
    }

    return entries;
  }
}
