/**
 * 返回对象的可枚举属性和方法的名称
 * - `Object.keys` 始终返回 `string[]` 类型，此函数可以返回具体类型
 *
 * @param obj 对象
 */
export function objectKeys<O extends AnyObject>(obj: O): (keyof O)[] {
  return Object.keys(obj);
}
