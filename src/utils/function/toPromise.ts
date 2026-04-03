/**
 * 将同步或异步函数统一包装为 Promise
 * - 自动捕获同步异常
 *
 * @param fn 返回值可为同步值或 Promise 的函数
 * @returns 标准化的 Promise
 *
 * @example
 * // 同步函数
 * toPromise(() => 42).then(v => console.log(v)); // 42
 *
 * // 异步函数
 * toPromise(async () => await fetchData()).then(data => ...);
 *
 * // 异常处理
 * toPromise(() => { throw new Error('fail'); }).catch(err => console.error(err)); // 捕获同步异常
 */
export function toPromise<T> (fn: () => T | Promise<T>): Promise<T> {
  try {
    return Promise.resolve(fn());
  } catch (error) {
    return Promise.reject(error);
  }
}
