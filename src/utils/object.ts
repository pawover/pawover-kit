import type { NonEmptyObject, UnionToTuple, ValueOf } from "type-fest";
import { isArray, isObject } from "./typeof";

/**
 * 返回对象的可枚举属性和方法的名称
 * - `Object.keys` 始终返回 `string[]` 类型，此函数可以返回具体类型
 *
 * @param obj 对象
 * @returns 对象所有可枚举的属性的键名
 */
export function objectKeys<O extends AnyObject>(obj: O): (keyof O)[] {
  return Object.keys(obj);
}

/**
 * 返回对象的可枚举属性的值数组
 *
 * @param obj 对象
 */
export function objectValues<O extends AnyObject>(obj: O): UnionToTuple<ValueOf<O>> {
  return Object.values(obj) as UnionToTuple<ValueOf<O>>;
}

/**
 * 返回对象的可枚举属性的键/值数组
 *
 * @param obj 对象
 */
export function objectEntries<O extends AnyObject>(obj: O): [string & keyof O, O[keyof O]][] {
  return Object.entries(obj);
}

/**
 * 对象反转
 * - 返回交换了对象的可枚举属性的值/键对象
 *
 * @param obj 对象
 */
export function objectSwitch<O extends AnyObject>(obj: NonEmptyObject<O>): Record<O[keyof O], keyof O> {
  const result = {} as unknown as Record<O[keyof O], keyof O>;

  if (!isObject(obj)) {
    return result;
  }

  for (const [k, v] of objectEntries(obj)) {
    result[v] = k;
  }

  return result;
}

/**
 * 对象合并
 * - 将两个对象递归合并为一个新对象，从右到左依次使用数值
 * - 递归只适用于子对象属性
 */
export function objectAssign<O extends AnyObject>(obj: O, overrideObj: O): O {
  const result = {} as unknown as O;

  if (!isObject(obj) && !isObject(overrideObj)) {
    return result;
  }
  if (!isObject(obj) || !isObject(overrideObj)) {
    return obj ?? overrideObj ?? result;
  }

  return objectEntries({ ...obj, ...overrideObj }).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: (() => {
        if (isObject(obj[key])) {
          return objectAssign(obj[key], value);
        }

        return value;
      })(),
    };
  }, result);
}

export function objectPick<O extends AnyObject, K extends keyof O>(obj: O, keys: readonly K[]): Pick<O, K> {
  const result = {} as unknown as Pick<O, K>;

  if (!isObject(obj)) {
    return result;
  }
  if (!isArray(keys)) {
    return obj;
  }

  return keys.reduce((acc, curr) => {
    if (curr in obj) {
      acc[curr] = obj[curr];
    }

    return acc;
  }, result);
}

function enumType<E extends AnyObject>(enumeration: E) {
  if (!isObject(enumeration)) {
    throw Error(`function enumKeys expected parameter is a enum, but got ${typeof enumeration}`);
  }

  if (!objectKeys(enumeration).length) {
    throw Error("Enum requires at least one member");
  }

  return enumeration;
}

/**
 * 获取枚举所有属性的键
 *
 * @param enumeration 枚举
 */
export function enumKeys<E extends AnyObject>(enumeration: NonEmptyObject<E>): [keyof E, ...(keyof E)[]] {
  const e = enumType(enumeration);
  const keys = objectKeys(e) as [keyof E, ...(keyof E)[]];
  const values = objectValues(e);
  const isTwoWayEnum = keys.every((k) => values.some((v) => `${v}` === k));

  if (isTwoWayEnum) {
    return keys.splice(keys.length / 2, keys.length / 2) as [keyof E, ...(keyof E)[]];
  }

  return keys;
}

/**
 * 获取枚举所有属性的值
 *
 * @param enumeration 枚举
 */
export function enumValues<E extends AnyObject>(enumeration: NonEmptyObject<E>): UnionToTuple<ValueOf<E>> {
  const e = enumType(enumeration);
  const keys = objectKeys(e) as [keyof E, ...(keyof E)[]];
  const values = objectValues(e);
  const isTwoWayEnum = keys.every((k) => values.some((v) => `${v}` === k));

  if (isTwoWayEnum) {
    return values.splice(keys.length / 2, keys.length / 2) as UnionToTuple<ValueOf<E>>;
  }

  return values;
}

/**
 * 返回枚举的属性的键/值数组
 *
 * @param enumeration 枚举
 */
export function enumEntries<E extends AnyObject>(enumeration: NonEmptyObject<E>): [keyof E, E[keyof E]][] {
  const e = enumType(enumeration);
  const keys = objectKeys(e) as [keyof E, ...(keyof E)[]];
  const values = objectValues(e);
  const entries = objectEntries(e);
  const isTwoWayEnum = keys.every((k) => values.some((v) => `${v}` === k));

  if (isTwoWayEnum) {
    return entries.splice(keys.length / 2, keys.length / 2);
  }

  return entries;
}

export function mapEntries<TKey extends PropertyKey, TValue, TNewKey extends PropertyKey, TNewValue>(
  obj: UnknownObject<TKey, TValue>,
  toEntry: (key: TKey, value: TValue) => [TNewKey, TNewValue],
): UnknownObject<TNewKey, TNewValue> {
  const defaultResult = {} as UnknownObject<TNewKey, TNewValue>;

  if (!obj) {
    return defaultResult;
  }

  return objectEntries(obj).reduce((acc, [key, value]) => {
    const [newKey, newValue] = toEntry(key, value);
    acc[newKey] = newValue;

    return acc;
  }, defaultResult);
}
