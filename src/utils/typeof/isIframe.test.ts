import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { isIframe, isInIframe } from "./isIframe";

describe("isIframe", () => {
  beforeEach(() => {
    // 在每个测试前，模拟浏览器环境
    vi.stubGlobal("window", globalThis.window);
  });

  afterEach(() => {
    // 在每个测试后，恢复全局变量
    vi.unstubAllGlobals();
  });

  it("在非浏览器环境下应返回 false", () => {
    // 移除 window 模拟，模拟 Node.js 环境
    vi.stubGlobal("window", undefined);
    expect(isIframe({})).toBe(false);
  });

  it("在浏览器环境下，传入 HTMLIFrameElement 实例应返回 true", () => {
    // 在 jsdom 环境中创建一个 iframe 元素
    const iframeElement = document.createElement("iframe");
    document.body.appendChild(iframeElement);

    expect(isIframe(iframeElement)).toBe(true);

    // 清理 DOM
    document.body.removeChild(iframeElement);
  });

  it("在浏览器环境下，传入非 HTMLIFrameElement 的值应返回 false", () => {
    // 创建其他类型的元素
    const divElement = document.createElement("div");
    const spanElement = document.createElement("span");
    const buttonElement = document.createElement("button");

    expect(isIframe(divElement)).toBe(false);
    expect(isIframe(spanElement)).toBe(false);
    expect(isIframe(buttonElement)).toBe(false);

    // 其他类型
    expect(isIframe({})).toBe(false);
    expect(isIframe(undefined)).toBe(false);
    expect(isIframe(null)).toBe(false);
    expect(isIframe("iframe")).toBe(false);
    expect(isIframe(123)).toBe(false);
  });
});

describe("isInIframe", () => {
  beforeEach(() => {
    // 在每个测试前，清理可能的模拟
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    // 在每个测试后，恢复全局变量
    vi.unstubAllGlobals();
  });

  it("在非浏览器环境下应返回 false", () => {
    // 移除 window 模拟，模拟 Node.js 环境
    vi.stubGlobal("window", undefined);
    expect(isInIframe()).toBe(false);
  });

  it("在顶层窗口（非 iframe）中应返回 false", () => {
    // 模拟一个顶层窗口的环境，其中 top === self
    const mockWindow = {
      top: { /* 模拟顶级窗口 */ },
      self: { /* 模拟当前窗口 */ },
    };
    // 让 top 和 self 引用同一个对象
    mockWindow.top = mockWindow.self;

    vi.stubGlobal("window", mockWindow);

    expect(isInIframe()).toBe(false);
  });

  it("在 iframe 环境中（top !== self）应返回 true", () => {
    // 模拟一个 iframe 环境，其中 top !== self
    const mockTopWindow = { name: "top_window" };
    const mockSelfWindow = { name: "self_in_iframe" };

    const mockWindow = {
      top: mockTopWindow,
      self: mockSelfWindow,
    };

    vi.stubGlobal("window", mockWindow);

    expect(isInIframe()).toBe(true);
  });

  it("在访问 top 属性发生 SecurityError（跨域）时应返回 true", () => {
    // 模拟一个访问 top 会抛出 SecurityError 的 window 对象
    const mockWindow = {
      get top () {
        throw new DOMException("Blocked a frame with origin 'http://example.com' from accessing a cross-origin frame.", "SecurityError");
      },
      self: { name: "self_in_cross_origin_iframe" },
    };

    vi.stubGlobal("window", mockWindow);

    expect(isInIframe()).toBe(true);
  });

  it("在访问 top 属性发生其他错误时应返回 false", () => {
    // 模拟一个访问 top 会抛出其他类型错误的 window 对象
    const mockWindow = {
      get top () {
        throw new Error("Some other error");
      },
      self: { name: "self_with_other_error" },
    };

    vi.stubGlobal("window", mockWindow);

    expect(isInIframe()).toBe(false);
  });
});
