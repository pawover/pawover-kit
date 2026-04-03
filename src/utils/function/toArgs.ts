import { isNumber } from "../typeof";

/**
 * 将 Arguments 对象转换为数组
 *
 * ⚠️ 注意：TypeScript 官方推荐使用 rest parameters (...args) 替代 arguments
 * 本函数仅用于处理遗留代码或特殊场景（如装饰器中需保留 this 绑定）
 *
 * @param args Arguments 对象（必须为类数组对象）
 * @param start 起始索引（可选，默认为 0）
 * @returns 转换后的数组，元素类型为 T
 *
 * @throws TypeError 如果 args 为 null 或 undefined
 *
 * @example
 * // 遗留代码场景
 * function legacyFn(a: number, b: string) {
 *   const argsArray = toArgs(arguments);
 *   // argsArray: unknown[]
 * }
 *
 * // 现代替代方案（推荐）
 * function modernFn(a: number, b: string, ...rest: unknown[]) {
 *   // rest 已经是数组，无需 toArgs
 * }
 *
 * // 参数截取
 * function skipFirst(...args: unknown[]) {
 *   const rest = toArgs(arguments, 1);
 *   // rest: unknown[]，跳过第一个参数
 * }
 */
export function toArgs<T = unknown> (args: IArguments, start?: number | undefined): T[] {
  if (args === null) {
    throw new TypeError(`[toArgs] Expected arguments object, got ${typeof args}`);
  }

  const array = Array.from(args);

  return isNumber(start) ? array.slice(start) : array;
}
