import type { PlainObject } from "@pawover/types";

/**
 *将 Promise 转换为 `[err, result]` 格式，方便 async/await 错误处理
 *
 * @param promise 待处理的 Promise
 * @param errorExt 附加到 error 对象的扩展信息（注意：如果原 error 是 Error 实例，扩展属性可能会覆盖或无法正确合并非枚举属性）
 * @returns `[err, null]` 或 `[null, data]`
 * @example
 * ```ts
 * const [err, data] = await to(someAsyncFunc());
 * if (err) return;
 * console.log(data);
 * ```
 */
export function to<T, U = Error> (promise: Readonly<Promise<T>>, errorExt?: PlainObject): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = { ...err, ...errorExt };

        if (err instanceof Error) {
          (parsedError as Record<string, unknown>)["message"] = err.message;
          (parsedError as Record<string, unknown>)["stack"] = err.stack;
        }

        return [parsedError, undefined];
      }

      const defaultError = err ? err : new Error("defaultError");

      return [defaultError as U, undefined];
    });
}
