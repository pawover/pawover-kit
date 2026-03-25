import type { PlainObject } from "@pawover/types";
import type { LiteralUnion } from "type-fest";

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
