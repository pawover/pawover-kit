/**
 * @param promise
 * @param errorExt - 可以传递给err对象的其他信息
 */
export function to<T, U = Error>(promise: Readonly<Promise<T>>, errorExt?: PlainObject): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = { ...err, ...errorExt };

        return [parsedError, undefined];
      }

      const defaultError = err ? err : new Error("defaultError");

      return [defaultError as U, undefined];
    });
}
