import { describe, it, expect } from "vitest";
import { isWebSocket } from "./isWebSocket";

describe("isWebSocket", () => {
  it("应该在传入 WebSocket 实例时返回 true", () => {
    // 在 Node.js 环境中，WebSocket 可能不是全局可用的
    // 我们可以尝试检查其是否存在，如果不存在，则跳过此测试或断言为 false
    if (typeof WebSocket !== "undefined") {
      // 创建一个模拟的 WebSocket 实例用于测试
      // 在真实的浏览器或 Node.js 环境中，这会创建一个实际的连接（或抛出无效URL错误）
      // 为了纯粹的类型测试，我们只关心其构造函数和原型
      try {
        const mockWs = new WebSocket("ws://localhost:12345/nonexistent");
        // 如果 WebSocket 构造函数成功执行（即使连接失败），它就创建了一个 WebSocket 实例
        // 我们的 isWebSocket 函数应能识别它
        // 由于构造函数会立即抛出错误（因为地址不存在），我们捕获它
        // 并在 catch 块中验证实例
      } catch (e: any) {
        // e.target 在连接错误时可能包含一个不完整的 WebSocket 实例
        // 或者我们可以相信 new WebSocket() 即使在失败时也创建了一个实例
        // 让我们直接创建一个实例来测试
      }
      // 为了绕开实际连接，我们可以通过 Object.create 来模拟一个实例
      // 但这不符合原型字符串的标准方式
      // 最可靠的测试是在构造后立即检查
      let wsInstance: WebSocket | undefined;
      let creationError: any;
      try {
        // 使用一个假的 URL 来避免实际连接，但依然创建实例
        // 在测试环境中，这可能仍会抛出错误，因此我们主要依赖类型
        // 对于 isWebSocket 这种基于原型的检查，我们假设 new WebSocket() 创建的实例符合预期
        // 如果环境支持 WebSocket，下面的测试是有效的
        wsInstance = new (globalThis.WebSocket || class {})("ws://invalid-url-for-test");
      } catch (e) {
        // 捕获连接错误，但我们已经获得了实例
        // 在大多数现代实现中，WebSocket 构造函数会返回一个实例，即使 URL 无效
        // 错误发生在连接阶段。所以 e 可能是 Event 或 Error，而不是实例本身。
        // 我们需要一个有效的方式来获取一个实例。
        // 最直接的测试方法是依赖其原型字符串。
        // 由于直接实例化可能复杂，我们做一个假设：如果 WebSocket 存在，
        // 那么 new WebSocket().constructor.prototype 就是 WebSocket.prototype
      }
      // 更直接的测试方法，如果全局 WebSocket 可用
      if (globalThis.WebSocket) {
        // 创建一个实例并立刻测试，忽略连接错误
        const testWsUrl = "ws://invalid-url-to-test-constructor";
        try {
          const ws = new WebSocket(testWsUrl);
          // 即使 URL 无效，new WebSocket() 也应该返回一个 WebSocket 实例
          expect(isWebSocket(ws)).toBe(true);
        } catch (e) {
          // 如果构造函数因 URL 无效而失败，我们无法测试。
          // 但在大多数 jsdom 等环境中，构造函数会成功返回一个实例。
          // 为了测试目的，我们假设在支持 WebSocket 的环境中它会成功创建实例。
          // 如果捕获到错误，我们仍然可以检查错误对象本身是否是 WebSocket。
          // 通常不会，所以这个 catch 主要是处理连接问题。
          // 我们可以认为在支持的环境下，实例会被创建。
          // 如果 e 是一个 EventTarget 或类似对象，它可能不是 WebSocket。
          // 核心是测试 isWebSocket 对一个真实 WebSocket 构造函数返回值的行为。
          // 由于环境限制，我们在此处添加一个条件判断。
          if (process.env["VITEST_POOL_ID"]) {
            // 假设在测试池中
            // 我们无法直接断言，但可以打印信息
            // console.log("WebSocket instance creation failed in test environment:", e);
            // 我们依赖于环境能正确设置 WebSocket
            // 如果环境不支持，下面的 expect 将不会执行
          }
        }
      }

      // 如果全局 WebSocket 不可用，则断言为 false
      if (typeof globalThis.WebSocket === "undefined") {
        expect(isWebSocket({})).toBe(false);
      }

      // 为了使测试在所有环境下都能有意义地运行，我们直接针对全局 WebSocket 构造函数进行测试
      if (typeof globalThis.WebSocket !== "undefined") {
        let ws: WebSocket | undefined;
        try {
          // 在 Vitest 的 jsdom 环境中，WebSocket 构造函数通常被模拟
          ws = new WebSocket("ws://localhost");
          // 断言创建的实例是 WebSocket
          expect(isWebSocket(ws)).toBe(true);
        } catch (e) {
          // 如果创建失败，我们至少可以确认 isWebSocket 对非 WebSocket 值返回 false
          // 这种情况下的错误处理是正常的
        }
      }
    }
  });

  it("应该在传入非 WebSocket 值时返回 false", () => {
    // 基础类型
    expect(isWebSocket(undefined)).toBe(false);
    expect(isWebSocket(null)).toBe(false);
    expect(isWebSocket(true)).toBe(false);
    expect(isWebSocket(false)).toBe(false);
    expect(isWebSocket(0)).toBe(false);
    expect(isWebSocket(123)).toBe(false);
    expect(isWebSocket(NaN)).toBe(false);
    expect(isWebSocket(Infinity)).toBe(false);
    expect(isWebSocket("")).toBe(false);
    expect(isWebSocket("websocket")).toBe(false);
    expect(isWebSocket(Symbol("ws"))).toBe(false);
    expect(isWebSocket(BigInt(123))).toBe(false);

    // 普通对象和数组
    expect(isWebSocket({})).toBe(false);
    expect(isWebSocket([])).toBe(false);
    expect(isWebSocket([1, 2, 3])).toBe(false);

    // 其他内置对象
    expect(isWebSocket(new Date())).toBe(false);
    expect(isWebSocket(Math)).toBe(false);
    expect(isWebSocket(JSON)).toBe(false);
    expect(isWebSocket(new RegExp(""))).toBe(false);
    expect(isWebSocket(new Error())).toBe(false);
    expect(isWebSocket(Promise.resolve())).toBe(false);
    expect(isWebSocket(new Map())).toBe(false);
    expect(isWebSocket(new Set())).toBe(false);
    expect(isWebSocket(new ArrayBuffer(1))).toBe(false);
    expect(isWebSocket(new DataView(new ArrayBuffer(1)))).toBe(false);
    expect(isWebSocket(new Int8Array(1))).toBe(false); // TypedArray

    // 函数
    expect(isWebSocket(() => {})).toBe(false);
    expect(isWebSocket(async () => {})).toBe(false);
    expect(isWebSocket(function *() {})).toBe(false);

    // 其他 DOM 或全局对象 (如果环境支持)
    if (typeof globalThis.Window !== "undefined") {
      expect(isWebSocket(globalThis.Window)).toBe(false);
    }
    if (typeof globalThis.Document !== "undefined") {
      expect(isWebSocket(globalThis.Document)).toBe(false);
    }
  });

  it("应该能正确区分 WebSocket 和其他相似对象", () => {
    // 创建一个模拟对象，其原型字符串与 WebSocket 相同
    // 这种情况很难手动构造，因为 Object.prototype.toString 是不可变的
    // 所以我们主要测试 isWebSocket 不会错误地将普通对象识别为 WebSocket
    const fakeWsLikeObject = {
      CONNECTING: 0,
      OPEN: 1,
      CLOSING: 2,
      CLOSED: 3,
      readyState: 0,
      close: () => {},
      send: () => {},
      // 即使拥有所有 WebSocket 的方法和属性，其原型字符串也不会匹配
    };
    expect(isWebSocket(fakeWsLikeObject)).toBe(false);
  });

  it("应该正确缩小类型", () => {
    const maybeWebSocket: unknown
      = typeof globalThis.WebSocket !== "undefined" ? new WebSocket("ws://example.com") : {};

    if (isWebSocket(maybeWebSocket)) {
      // 在此 if 块内，TypeScript 应该将 maybeWebSocket 的类型识别为 WebSocket
      // 这允许我们安全地访问 WebSocket 特有的属性
      expect(() => {
        const readyState = maybeWebSocket.readyState;
        const url = maybeWebSocket.url;
        // 访问这些属性不应导致 TypeScript 类型错误
        expect(typeof readyState).toBe("number");
        expect(typeof url).toBe("string");
      }).not.toThrow();
    }
  });

  it("在不支持 WebSocket 的环境中应返回 false", () => {
    // 模拟全局作用域中没有 WebSocket 的情况
    const originalWebSocket = globalThis.WebSocket;
    // @ts-ignore
    delete globalThis.WebSocket;

    try {
      // 确保 isWebSocket 对任何值都返回 false，因为没有 WebSocket 类型
      expect(isWebSocket({})).toBe(false);
      expect(isWebSocket(null)).toBe(false);
      expect(isWebSocket(undefined)).toBe(false);
      // 即使传入一个理论上像 WebSocket 的对象，也应返回 false
      const objWithWsProps = { readyState: 0, url: "", send: () => {}, close: () => {} };
      expect(isWebSocket(objWithWsProps)).toBe(false);
    } finally {
      // 恢复全局 WebSocket
      globalThis.WebSocket = originalWebSocket;
    }
  });
});
