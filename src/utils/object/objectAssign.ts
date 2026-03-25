import type { AnyObject, PlainObject } from "@pawover/types";
import type { Assign } from "radashi";
import { isObject } from "../typeof";

const OBJECT_PROTO = Object.prototype;

/**
 * 为对象创建一个具有相同原型的新副本
 * 这个辅助函数是保留原型的关键。
 */
function cloneWithProto<T extends AnyObject> (obj: T): T {
  const proto = Object.getPrototypeOf(obj);

  // 如果原型是 Object.prototype (即普通对象 {})，则使用解构赋值即可
  // 否则，必须使用 Object.create 来保留特殊的原型链
  return proto === OBJECT_PROTO ? { ...obj } : Object.assign(Object.create(proto), obj);
}

function _objectAssign (initial: AnyObject, override: AnyObject, _seen: WeakSet<object>): AnyObject {
  // 只有当 initial 和 override 都不是对象时，才返回 {}
  // 如果其中一个不是对象，我们对其调用 cloneWithProto()，它能正确处理各种对象类型。
  if (!isObject(initial, false) && !isObject(override, false)) {
    return {};
  }
  if (!isObject(initial, false)) {
    return cloneWithProto(override);
  }
  if (!isObject(override, false)) {
    return cloneWithProto(initial);
  }

  // 检测循环引用
  // 如果 initial 已经被访问过，说明它内部有循环引用。此时，我们应该停止递归，直接用 override 的副本替换它。
  if (_seen.has(initial)) {
    return cloneWithProto(override);
  }
  _seen.add(initial);

  // 创建 initial 的副本，保留其原型
  const assigned = cloneWithProto(initial);

  // 执行合并
  for (const key of Object.keys(override)) {
    // 只有当两者都是 PlainObject 时才递归合并。
    if (isObject(initial[key]) && isObject(override[key])) {
      assigned[key] = _objectAssign(initial[key], override[key], _seen);
    } else {
      // 否则直接覆盖
      assigned[key] = override[key];
    }
  }

  _seen.delete(initial);

  return assigned;
}

/**
 * 递归地将第二个对象合并到第一个对象的副本中
 * - 只有普通对象才会递归合并
 * - 会处理循环引用，避免无限递归
 *
 * @param initial 初始对象
 * @param override 待合并对象
 * @returns 合并后的新对象
 * @example
 * ```ts
 * const initial = { a: 1, b: { c: 2 } };
 * const override = { b: { d: 3 } };
 * objectAssign(initial, override); // { a: 1, b: { c: 2, d: 3 } }
 * ```
 */
export function objectAssign<I extends PlainObject, O extends PlainObject> (initial: I, override: O): Assign<I, O>;
export function objectAssign<I extends AnyObject, O extends AnyObject> (initial: I, override: O): Assign<I, O>;
export function objectAssign (initial: AnyObject, override: AnyObject) {
  return _objectAssign(initial, override, new WeakSet());
}
