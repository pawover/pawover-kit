import type { PlainObject } from "@pawover/types";
import type { LiteralUnion } from "type-fest";

import { TypeUtil } from "../type";

/**
 * 函数工具类
 */
export class FunctionUtil {
  /**
   *将 Promise 转换为 `[err, result]` 格式，方便 async/await 错误处理
   *
   * @param promise 待处理的 Promise
   * @param errorExt 附加到 error 对象的扩展信息（注意：如果原 error 是 Error 实例，扩展属性可能会覆盖或无法正确合并非枚举属性）
   * @returns `[err, null]` 或 `[null, data]`
   * @example
   * ```ts
   * const [err, data] = await FunctionUtil.to(someAsyncFunc());
   * ```
   */
  static to<T, U = Error>(promise: Readonly<Promise<T>>, errorExt?: PlainObject): Promise<[U, undefined] | [null, T]> {
    return promise
      .then<[null, T]>((data: T) => [null, data])
      .catch<[U, undefined]>((err: U) => {
        if (errorExt) {
          const parsedError: Record<LiteralUnion<"message" | "name" | "stack", string>, unknown> = { name: "", message: "", stack: "" };

          if (err instanceof Error) {
            parsedError.message = err.message;
            parsedError.name = err.name;
            parsedError.stack = err.stack;

            // 将 err 的其他自有属性也复制过来
            Object.getOwnPropertyNames(err).forEach((key) => {
              if (!(key in parsedError)) {
                parsedError[key] = (err as Record<string, unknown>)[key];
              }
            });
          } else {
            Object.assign(parsedError, err);
          }

          Object.assign(parsedError, errorExt);

          return [parsedError as U, undefined];
        }

        const defaultError = err ? err : new Error("defaultError");

        return [defaultError as U, undefined];
      });
  }

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
   *   const argsArray = FunctionUtil.toArgs(arguments);
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
   *   const rest = FunctionUtil.toArgs(arguments, 1);
   *   // rest: unknown[]，跳过第一个参数
   * }
   */
  static toArgs<T = unknown>(args: IArguments, start?: number | undefined): T[] {
    if (args === null) {
      throw new TypeError(`function [toArgs] Expected parameter [args] to be a arguments object, got ${typeof args}`);
    }

    const array = Array.from(args);

    return TypeUtil.isNumber(start) ? array.slice(start) : array;
  }

  /**
   * 将同步或异步函数统一包装为 Promise
   * - 自动捕获同步异常
   *
   * @param fn 返回值可为同步值或 Promise 的函数
   * @returns 标准化的 Promise
   *
   * @example
   * // 同步函数
   * FunctionUtil.toPromise(() => 42).then(v => console.log(v)); // 42
   *
   * // 异步函数
   * FunctionUtil.toPromise(async () => await fetchData()).then(data => ...);
   *
   * // 异常处理
   * FunctionUtil.toPromise(() => { throw new Error('fail'); }).catch(err => console.error(err)); // 捕获同步异常
   */
  static toPromise<T>(fn: () => T | Promise<T>): Promise<T> {
    try {
      return Promise.resolve(fn());
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
