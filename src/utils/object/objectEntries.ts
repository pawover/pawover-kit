/**
 * 返回对象的可枚举属性的键/值数组
 *
 * @param obj 对象
 */
export function objectEntries<O extends AnyObject>(obj: O): [string & keyof O, O[keyof O]][] {
  return Object.entries(obj);
}
