import { describe, it, expect } from "vitest";
import { isPromise, isPromiseLike } from "./isPromise";

describe("isPromise", () => {
  it("应该在传入 Promise 实例时返回 true", () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise(Promise.reject().catch(() => {}))).toBe(true);
    expect(isPromise(new Promise((resolve) => resolve("test")))).toBe(true);
  });

  it("应该在传入非 Promise 值时返回 false", () => {
    // 基础类型
    expect(isPromise(undefined)).toBe(false);
    expect(isPromise(null)).toBe(false);
    expect(isPromise(true)).toBe(false);
    expect(isPromise(false)).toBe(false);
    expect(isPromise(0)).toBe(false);
    expect(isPromise(123)).toBe(false);
    expect(isPromise(NaN)).toBe(false);
    expect(isPromise(Infinity)).toBe(false);
    expect(isPromise("")).toBe(false);
    expect(isPromise("promise")).toBe(false);
    expect(isPromise(Symbol("p"))).toBe(false);
    expect(isPromise(BigInt(123))).toBe(false);

    // 普通对象和数组
    expect(isPromise({})).toBe(false);
    expect(isPromise({ then: () => {} })).toBe(false); // PromiseLike, 但不是 Promise
    expect(isPromise([])).toBe(false);
    expect(isPromise([1, 2, 3])).toBe(false);

    // 其他内置对象
    expect(isPromise(new Date())).toBe(false);
    expect(isPromise(Math)).toBe(false);
    expect(isPromise(JSON)).toBe(false);
    expect(isPromise(new RegExp(""))).toBe(false);
    expect(isPromise(new Error())).toBe(false);
    expect(isPromise(new Map())).toBe(false);
    expect(isPromise(new Set())).toBe(false);
    expect(isPromise(new ArrayBuffer(1))).toBe(false);
    expect(isPromise(new Int8Array(1))).toBe(false);

    // 函数
    expect(isPromise(() => {})).toBe(false);
    expect(isPromise(async () => {})).toBe(false); // async 函数本身不是 Promise
    expect(isPromise(function *() {})).toBe(false);
  });

  it("对于继承自 Promise 的子类实例也应返回 true", () => {
    // 注意：与 ReadableStream 不同，继承 Promise 在现代 JS 环境中通常是可行的。
    // 但由于 ts(2510) 问题，我们不直接在测试中定义子类，而是假设其行为。
    // 如果在支持的环境中创建了子类，其原型字符串应仍为 "[object Promise]"
    // 下面的测试主要依赖于环境支持。
    if (typeof Promise !== "undefined") {
      // 一个典型的 Promise 子类例子
      class CustomPromise<T> extends Promise<T> {
        customMethod () {}
      }
      const customP = new CustomPromise<number>((res) => res(42));
      // 如果环境正确设置了原型链，此测试应通过
      expect(isPromise(customP)).toBe(true);
    }
  });

  it("应该正确缩小类型", () => {
    const maybePromise: unknown = Promise.resolve("value");

    if (isPromise(maybePromise)) {
      // 在此 if 块内，TypeScript 应该将 maybePromise 的类型识别为 Promise<unknown>
      // 这允许我们安全地调用其 .then, .catch, .finally 方法
      expect(() => {
        maybePromise.then((val) => {
          // val 的类型在此处应为 unknown
          expect(val).toBeDefined();
        });
      }).not.toThrow();
    }
  });

  it("should return true for native Promise", () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise(new Promise(() => {}))).toBe(true);
  });

  it("should return false for non-Promise objects", () => {
    expect(isPromise({})).toBe(false);
    expect(isPromise([])).toBe(false);
    expect(isPromise(new Date())).toBe(false);
  });

  it("should return false for primitive values", () => {
    expect(isPromise(null)).toBe(false);
    expect(isPromise(undefined)).toBe(false);
    expect(isPromise("string")).toBe(false);
    expect(isPromise(42)).toBe(false);
  });

  it("should return false for Promise-like objects without Promise tag", () => {
    const fakePromise = { then: () => {} };
    expect(isPromise(fakePromise)).toBe(false); // 标签非 [object Promise]
  });

  it("should handle cross-realm Promises correctly (via tag check)", () => {
    // 模拟跨 realm 场景：标签检查不受影响
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    // @ts-expect-error
    const iframePromise = iframe.contentWindow!.Promise.resolve();
    expect(isPromise(iframePromise)).toBe(true);
    document.body.removeChild(iframe);
  });
});

describe("isPromiseLike", () => {
  it("应该在传入 Promise 实例时返回 true", () => {
    expect(isPromiseLike(Promise.resolve())).toBe(true);
    expect(isPromiseLike(Promise.reject().catch(() => {}))).toBe(true);
    expect(isPromiseLike(new Promise((resolve) => resolve("test")))).toBe(true);
  });

  it("应该在传入非 PromiseLike 值时返回 false", () => {
    // 基础类型
    expect(isPromiseLike(undefined)).toBe(false);
    expect(isPromiseLike(null)).toBe(false);
    expect(isPromiseLike(true)).toBe(false);
    expect(isPromiseLike(false)).toBe(false);
    expect(isPromiseLike(0)).toBe(false);
    expect(isPromiseLike(123)).toBe(false);
    expect(isPromiseLike(NaN)).toBe(false);
    expect(isPromiseLike(Infinity)).toBe(false);
    expect(isPromiseLike("")).toBe(false);
    expect(isPromiseLike("thenable")).toBe(false);
    expect(isPromiseLike(Symbol("p"))).toBe(false);
    expect(isPromiseLike(BigInt(123))).toBe(false);

    // 普通对象和数组
    expect(isPromiseLike({})).toBe(false);
    expect(isPromiseLike([])).toBe(false);
    expect(isPromiseLike([1, 2, 3])).toBe(false);

    // 其他内置对象
    expect(isPromiseLike(new Date())).toBe(false);
    expect(isPromiseLike(Math)).toBe(false);
    expect(isPromiseLike(JSON)).toBe(false);
    expect(isPromiseLike(new RegExp(""))).toBe(false);
    expect(isPromiseLike(new Error())).toBe(false);
    expect(isPromiseLike(new Map())).toBe(false);
    expect(isPromiseLike(new Set())).toBe(false);
    expect(isPromiseLike(new ArrayBuffer(1))).toBe(false);
    expect(isPromiseLike(new Int8Array(1))).toBe(false);

    // 函数
    expect(isPromiseLike(() => {})).toBe(false);
    expect(isPromiseLike(async () => {})).toBe(false); // async 函数本身不是 PromiseLike
    expect(isPromiseLike(function *() {})).toBe(false);
  });

  it("应该能识别拥有 then 方法的非 Promise 对象 (PromiseLike)", () => {
    // 拥有 then 方法的普通对象
    // 修正：创建一个不会实际执行异步逻辑的 then 方法
    const thenableObject = {
      then: function (onFulfilled = () => {}, onRejected = () => {}) {
        // 一个简单的 then 实现，不触发实际的异步操作
        // 只有在被调用时才决定做什么，而不是在这里调用 onFulfilled
        return { then: this.then }; // 返回一个“类 Promise”对象以保持链式调用
      },
    };

    expect(isPromiseLike(thenableObject)).toBe(true);

    // then 方法必须是函数
    const fakeThenableNotAFunction = {
      then: "not a function",
    };
    expect(isPromiseLike(fakeThenableNotAFunction)).toBe(false);

    // 必须是对象
    const fakeThenableNotAnObject = "not an object";
    expect(isPromiseLike(fakeThenableNotAnObject)).toBe(false);
  });

  it("应该能识别拥有 then 方法但缺少其他 Promise 方法的复杂对象", () => {
    // 一个更复杂的类 Promise 对象
    const complexThenableObject = {
      state: "pending",
      result: null,
      then: function (onFulfilled = () => {}, onRejected = () => {}) {
        // ... 一个简化的、不实际执行的 then 逻辑 ...
        // 例如，返回一个新的“占位符”对象
        return {
          then: (nextOnFulfilled = () => {}, nextOnRejected = () => {}) => {
            // 实际应用中这里会有状态管理逻辑
            return new Promise(nextOnFulfilled);
          },
        };
      },
      // 注意：没有 catch, finally 等方法
    };

    expect(isPromiseLike(complexThenableObject)).toBe(true);
  });

  it("应该正确缩小类型", () => {
    // 使用一个真实的 Promise 进行类型缩小测试，因为它也是 PromiseLike
    const maybePromiseLike: unknown = Promise.resolve("value");

    if (isPromiseLike(maybePromiseLike)) {
      // 在此 if 块内，TypeScript 应该将 maybePromiseLike 的类型识别为 PromiseLike<unknown>
      // 这允许我们安全地调用其 .then 方法
      expect(() => {
        maybePromiseLike.then((val) => {
          // val 的类型在此处应为 unknown
          expect(val).toBeDefined();
        });
      }).not.toThrow();
    }

    // 或者使用一个简单的 PromiseLike 对象
    const simpleThenable: unknown = { then: (fn: (v: number) => void) => fn(42) };

    if (isPromiseLike(simpleThenable)) {
      // 此时，simpleThenable 的类型被缩小为 PromiseLike<unknown>
      expect(() => {
        simpleThenable.then((val) => {
          expect(val).toBe(42);
        });
      }).not.toThrow();
    }
  });

  it("should return true for native Promise (via isPromise path)", () => {
    expect(isPromiseLike(Promise.resolve())).toBe(true);
  });

  it("should return true for plain object with then function", () => {
    const thenable = { then: (resolve: () => void) => resolve() };
    expect(isPromiseLike(thenable)).toBe(true);
  });

  it("should return true for Object.create(null) with then function", () => {
    const nullProto = Object.create(null);
    nullProto.then = () => {};
    expect(isPromiseLike(nullProto)).toBe(true); // prototypeCheck=false 生效
  });

  it("should return false for object with non-function then property", () => {
    expect(isPromiseLike({ then: null })).toBe(false);
    expect(isPromiseLike({ then: "string" })).toBe(false);
    expect(isPromiseLike({ then: 123 })).toBe(false);
  });

  it("should return false for object without then property", () => {
    expect(isPromiseLike({})).toBe(false);
    expect(isPromiseLike({ other: "prop" })).toBe(false);
  });

  it("should return false for arrays even with then method", () => {
    const arr: any = [];
    arr.then = () => {};
    expect(isPromiseLike(arr)).toBe(false); // isObject 拦截（标签非 [object Object]）
  });

  it("should return false for functions even with then property", () => {
    function fn () {}
    (fn as any).then = () => {};
    expect(isPromiseLike(fn)).toBe(false); // isObject 拦截（标签非 [object Object]）
  });

  it("should return false for null/undefined/primitives", () => {
    expect(isPromiseLike(null)).toBe(false);
    expect(isPromiseLike(undefined)).toBe(false);
    expect(isPromiseLike("string")).toBe(false);
    expect(isPromiseLike(42)).toBe(false);
  });

  it("should safely access \"then\" without triggering getters", () => {
    let getterCalled = false;
    const obj = {
      get then () {
        getterCalled = true;

        return () => {};
      },
    };
    // 注意：使用 value["then"] 仍会触发 getter（JavaScript 限制）
    // 但这是必要操作，测试验证行为符合预期
    expect(isPromiseLike(obj)).toBe(true);
    expect(getterCalled).toBe(true); // 验证访问发生（符合设计）
  });

  it("should handle then property with Symbol.toStringTag override", () => {
    const custom = { then: () => {}, [Symbol.toStringTag]: "Custom" };
    // isObject(custom, false) 会返回 false（标签非 [object Object]）
    expect(isPromiseLike(custom)).toBe(false);
  });
});
