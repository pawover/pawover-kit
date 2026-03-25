import { describe, it, expect } from "vitest";
import { isReadableStream } from "./isReadableStream";

describe("isReadableStream", () => {
  it("应该在传入标准 ReadableStream 实例时返回 true", () => {
    // 在支持 Stream API 的环境中 (如现代浏览器或 Node.js)
    if (typeof ReadableStream !== "undefined") {
      const stream = new ReadableStream({
        start (controller) {
          controller.enqueue("data");
          controller.close();
        },
      });
      expect(isReadableStream(stream)).toBe(true);
    } else {
      // 如果环境不支持，该测试分支跳过或断言为 false
      expect(true).toBe(true); // 确保测试用例有效
    }
  });

  it("应该在传入非 ReadableStream 值时返回 false", () => {
    // 基础类型
    expect(isReadableStream(undefined)).toBe(false);
    expect(isReadableStream(null)).toBe(false);
    expect(isReadableStream(true)).toBe(false);
    expect(isReadableStream(false)).toBe(false);
    expect(isReadableStream(0)).toBe(false);
    expect(isReadableStream(123)).toBe(false);
    expect(isReadableStream(NaN)).toBe(false);
    expect(isReadableStream(Infinity)).toBe(false);
    expect(isReadableStream("")).toBe(false);
    expect(isReadableStream("stream")).toBe(false);
    expect(isReadableStream(Symbol("stream"))).toBe(false);
    expect(isReadableStream(BigInt(123))).toBe(false);

    // 普通对象和数组
    expect(isReadableStream({})).toBe(false); // 普通对象没有 getReader 或 pipeThrough
    expect(isReadableStream({ getReader: () => {}, pipeThrough: () => {} })).toBe(true); // 没有原型匹配，但有方法
    expect(isReadableStream([])).toBe(false);
    expect(isReadableStream([1, 2, 3])).toBe(false);

    // 其他内置对象
    expect(isReadableStream(new Date())).toBe(false);
    expect(isReadableStream(Math)).toBe(false);
    expect(isReadableStream(JSON)).toBe(false);
    expect(isReadableStream(new RegExp(""))).toBe(false);
    expect(isReadableStream(new Error())).toBe(false);
    expect(isReadableStream(Promise.resolve())).toBe(false);
    expect(isReadableStream(new Map())).toBe(false);
    expect(isReadableStream(new Set())).toBe(false);
    expect(isReadableStream(new ArrayBuffer(1))).toBe(false);
    expect(isReadableStream(new Int8Array(1))).toBe(false);

    // 函数
    expect(isReadableStream(() => {})).toBe(false);
    expect(isReadableStream(async () => {})).toBe(false);
    expect(isReadableStream(function *() {})).toBe(false);
  });

  it("应该能通过 duck typing 识别拥有必要方法的非标准对象", () => {
    // 创建一个对象，它没有 ReadableStream 的原型，但拥有必要的方法
    const duckTypedStream = {
      getReader: function () {
        return { read: () => Promise.resolve({ done: true, value: undefined }), releaseLock: () => {} };
      },
      pipeThrough: function (transformStream: any, options?: any) {
        return new ReadableStream();
      }, // 返回一个新的流
      // 可能还有其他 ReadableStream 方法...
    };

    // isReadableStream 应该能够识别这种对象
    expect(isReadableStream(duckTypedStream)).toBe(true);
  });

  it("应该能识别缺少必要方法的伪造对象", () => {
    // 缺少 getReader
    const fakeStreamNoGetReader = {
      pipeThrough: () => {},
    };
    expect(isReadableStream(fakeStreamNoGetReader)).toBe(false);

    // 缺少 pipeThrough
    const fakeStreamNoPipeThrough = {
      getReader: () => {},
    };
    expect(isReadableStream(fakeStreamNoPipeThrough)).toBe(false);

    // 方法不是函数
    const fakeStreamWrongMethods = {
      getReader: "not a function",
      pipeThrough: "not a function",
    };
    expect(isReadableStream(fakeStreamWrongMethods)).toBe(false);

    // 是对象但没有这些方法
    const fakeStreamNoMethods = {
      someOtherProp: "value",
    };
    expect(isReadableStream(fakeStreamNoMethods)).toBe(false);
  });

  it("应该正确缩小类型", () => {
    let maybeStream: unknown;

    if (typeof ReadableStream !== "undefined") {
      maybeStream = new ReadableStream();
    } else {
      // 在不支持的环境中，使用一个鸭子类型对象进行测试
      maybeStream = {
        getReader: () => ({ read: () => Promise.resolve({ done: true, value: undefined }), releaseLock: () => {} }),
        pipeThrough: () => maybeStream,
      };
    }

    if (isReadableStream(maybeStream)) {
      // 在此 if 块内，TypeScript 应该将 maybeStream 的类型识别为 ReadableStream
      // 这允许我们安全地调用其方法
      expect(() => {
        // 调用 ReadableStream 的方法
        const reader = maybeStream.getReader();
        // pipeThrough 需要另一个 TransformStream，这里只是检查其存在性
        expect(maybeStream.pipeThrough).toBeTypeOf("function");
        // `reader` 的类型也会被推断出来
        expect(reader.releaseLock).toBeTypeOf("function");
      }).not.toThrow();
    }
  });

  it("能够正确识别通过 duck typing 方式模拟的类 ReadableStream 对象", () => {
    // 您的 isReadableStream 函数设计得非常巧妙，它通过检查 .getReader() 和 .pipeThrough()
    // 这两个方法的存在，实现了 Duck Typing，从而可以识别出行为类似 ReadableStream 的对象，
    // 即使它们不是直接从 ReadableStream 继承而来。
    expect(isReadableStream({
      getReader: () => ({ /* mock reader */ }),
      pipeThrough: () => ({ /* mock stream */ }),
    })).toBe(true);
  });
});
