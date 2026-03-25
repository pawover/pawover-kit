import { describe, it, expect } from "vitest";
import { isWindow } from "./isWindow";

describe("isWindow", () => {
  // 定义一个模拟的 Window 对象类型，以便在 Node 环境中创建 mock
  interface MockWindow extends Window {
    [key: string]: any; // Allow arbitrary properties
  }

  it("should return true if value is the global window object", () => {
    // This test requires a browser-like environment (e.g., jsdom in Vitest)
    if (typeof window !== "undefined") {
      expect(isWindow(window)).toBe(true);
    } else {
      // If window is not defined, the result must be false.
      expect(isWindow(undefined)).toBe(false);
    }
  });

  it("should return false for non-window objects", () => {
    // Primitive values
    expect(isWindow(undefined)).toBe(false);
    expect(isWindow(null)).toBe(false);
    expect(isWindow(true)).toBe(false);
    expect(isWindow(123)).toBe(false);
    expect(isWindow("a string")).toBe(false);
    expect(isWindow(Symbol("sym"))).toBe(false);

    // Common objects
    expect(isWindow({})).toBe(false);
    expect(isWindow([])).toBe(false);
    expect(isWindow(new Date())).toBe(false);
    expect(isWindow(/regex/)).toBe(false);
    expect(isWindow(new Map())).toBe(false);
    expect(isWindow(new Set())).toBe(false);
    expect(isWindow(new Error())).toBe(false);
    expect(isWindow(() => {})).toBe(false);
  });

  it("should return false for objects with similar structure to Window but are not the actual Window", () => {
    // An object that might mimic some Window properties but isn't one
    const fakeWindowLikeObject = {
      document: {},
      location: {},
      history: {},
      navigator: {},
      toString: () => "[object Window]", // Attempt to fool a naive check
    };

    // isWindow uses Object.prototype.toString, so this will correctly return false
    expect(isWindow(fakeWindowLikeObject)).toBe(false);
  });

  it("should return false for other global host objects", () => {
    // Tests are environment-dependent.
    // In a jsdom environment, these might be available.
    if (typeof document !== "undefined") {
      expect(isWindow(document)).toBe(false);
    }
    if (typeof console !== "undefined") {
      // `console` is not a Window object
      expect(isWindow(console)).toBe(false);
    }
  });

  it("should be a type guard, narrowing the type correctly", () => {
    const maybeWindow: unknown = typeof window !== "undefined" ? window : {};

    if (isWindow(maybeWindow)) {
      // Inside this block, TypeScript should recognize `maybeWindow` as `Window`.
      // The following line should not produce a TypeScript error if `isWindow` works as a guard.
      expect(() => {
        // Example: Accessing a property/method that exists on Window
        const innerWidth = maybeWindow.innerWidth;
        // If maybeWindow was not narrowed to Window, accessing innerWidth would cause a type error.
        expect(innerWidth).toBeDefined(); // Just a check to use the variable
      }).not.toThrow();
    } else {
      // Outside the block, it remains `unknown`.
      expect(maybeWindow).toBeDefined();
    }
  });
});
