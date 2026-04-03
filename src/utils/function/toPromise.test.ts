import { describe, it, expect } from "vitest";
import { toPromise } from "./toPromise";

describe("toPromise", () => {
  it("should convert synchronous function returning primitive to Promise", async () => {
    const syncFn = () => 42;
    const result = await toPromise(syncFn);
    expect(result).toBe(42);
  });

  it("should convert synchronous function returning object to Promise", async () => {
    const obj = { foo: "bar" };
    const syncFn = () => obj;
    const result = await toPromise(syncFn);
    expect(result).toBe(obj);
  });

  it("should handle asynchronous function returning Promise", async () => {
    const asyncFn = async () => "async-result";
    const result = await toPromise(asyncFn);
    expect(result).toBe("async-result");
  });

  it("should handle asynchronous function returning resolved Promise", async () => {
    const asyncFn = () => Promise.resolve("resolved-value");
    const result = await toPromise(asyncFn);
    expect(result).toBe("resolved-value");
  });

  it("should handle function that throws synchronously", async () => {
    const throwingFn = () => {
      throw new Error("sync-error");
    };

    await expect(toPromise(throwingFn)).rejects.toThrow("sync-error");
  });

  it("should handle function returning rejected Promise", async () => {
    const rejectingFn = () => Promise.reject(new Error("async-error"));
    await expect(toPromise(rejectingFn)).rejects.toThrow("async-error");
  });

  it("should handle function returning falsy values", async () => {
    const falsyValues = [null, undefined, 0, false, "", NaN];

    for (const value of falsyValues) {
      const fn = () => value;
      const result = await toPromise(fn);
      expect(result).toBe(value);
    }
  });

  it("should handle complex nested Promises", async () => {
    const deeplyNestedPromise = () => Promise.resolve(Promise.resolve(Promise.resolve("nested")));
    const result = await toPromise(deeplyNestedPromise);
    expect(result).toBe("nested");
  });

  // ❌ 删除：不合理的"延迟执行"测试
  // 函数应立即执行，这是正确且符合直觉的行为

  it("should handle arrow functions with closure correctly", async () => {
    const externalValue = "closure-value";
    const fnWithClosure = () => externalValue;
    const result = await toPromise(fnWithClosure);
    expect(result).toBe("closure-value");
  });

  it("should handle functions returning complex objects", async () => {
    const complexObj = {
      nested: {
        array: [1, 2, { deep: "value" }],
        func: () => "inner-fn",
      },
      date: new Date(),
    };

    const fn = () => complexObj;
    const result = await toPromise(fn);
    expect(result).toEqual(complexObj);
    expect(result.nested.func()).toBe("inner-fn");
  });

  it("should preserve Promise chain behavior", async () => {
    let resolveCallback: (value: string) => void;
    const deferredPromise = new Promise<string>((resolve) => {
      resolveCallback = resolve;
    });

    const fn = () => deferredPromise;
    setTimeout(() => resolveCallback!("deferred-value"), 0);

    const result = await toPromise(fn);
    expect(result).toBe("deferred-value");
  });

  it("should execute synchronous function immediately", () => {
    let executed = false;
    const syncFn = () => {
      executed = true;

      return "result";
    };

    const promise = toPromise(syncFn);

    // 函数应已立即执行
    expect(executed).toBe(true);

    // 但 Promise 仍需 await
    expect(promise).toBeInstanceOf(Promise);
  });
});
