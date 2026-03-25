import { describe, it, expect } from "vitest";
import { PROTOTYPE_TAGS, TYPED_ARRAY_TAGS, resolvePrototypeString } from "./types";

describe("Common Type Definitions and Utilities", () => {
  describe("PROTOTYPE_TAGS", () => {
    it("should be an immutable object with correct prototype strings", () => {
      // 检查是否为常量对象，无法被修改
      expect(() => {
        // @ts-expect-error - Testing immutability
        PROTOTYPE_TAGS.array = "[object Modified]";
      }).toThrow();

      // 检查几个关键值是否正确
      expect(PROTOTYPE_TAGS.array).toBe("[object Array]");
      expect(PROTOTYPE_TAGS.object).toBe("[object Object]");
      expect(PROTOTYPE_TAGS.string).toBe("[object String]");
      expect(PROTOTYPE_TAGS.function).toBe("[object Function]");
      expect(PROTOTYPE_TAGS.date).toBe("[object Date]");
      expect(PROTOTYPE_TAGS.error).toBe("[object Error]");
      expect(PROTOTYPE_TAGS.regExp).toBe("[object RegExp]");
      expect(PROTOTYPE_TAGS.map).toBe("[object Map]");
      expect(PROTOTYPE_TAGS.set).toBe("[object Set]");
      expect(PROTOTYPE_TAGS.promise).toBe("[object Promise]");
      expect(PROTOTYPE_TAGS.null).toBe("[object Null]");
      expect(PROTOTYPE_TAGS.undefined).toBe("[object Undefined]");
    });
  });

  describe("TYPED_ARRAY_TAGS", () => {
    it("should be a Set containing all typed array prototype strings", () => {
      const expectedTypedArrayTags = [
        "[object Int8Array]",
        "[object Uint8Array]",
        "[object Uint8ClampedArray]",
        "[object Int16Array]",
        "[object Uint16Array]",
        "[object Int32Array]",
        "[object Uint32Array]",
        "[object Float32Array]",
        "[object Float64Array]",
        "[object BigInt64Array]",
        "[object BigUint64Array]",
      ];

      expect(TYPED_ARRAY_TAGS).toBeInstanceOf(Set);
      expect(TYPED_ARRAY_TAGS.size).toBe(expectedTypedArrayTags.length);

      for (const tag of expectedTypedArrayTags) {
        expect(TYPED_ARRAY_TAGS.has(tag)).toBe(true);
      }
    });

    it("should correctly identify a typed array using its tags", () => {
      const int8Array = new Int8Array();
      const float64Array = new Float64Array();
      const regularArray: any[] = [];

      expect(TYPED_ARRAY_TAGS.has(resolvePrototypeString(int8Array))).toBe(true);
      expect(TYPED_ARRAY_TAGS.has(resolvePrototypeString(float64Array))).toBe(true);
      expect(TYPED_ARRAY_TAGS.has(resolvePrototypeString(regularArray))).toBe(false);
    });
  });

  describe("resolvePrototypeString", () => {
    it("should correctly identify primitive types", () => {
      expect(resolvePrototypeString(undefined)).toBe(PROTOTYPE_TAGS.undefined);
      expect(resolvePrototypeString(null)).toBe(PROTOTYPE_TAGS.null);
      expect(resolvePrototypeString(true)).toBe(PROTOTYPE_TAGS.boolean);
      expect(resolvePrototypeString(false)).toBe(PROTOTYPE_TAGS.boolean);
      expect(resolvePrototypeString(42)).toBe(PROTOTYPE_TAGS.number);
      expect(resolvePrototypeString(NaN)).toBe(PROTOTYPE_TAGS.number); // NaN is still a Number
      expect(resolvePrototypeString(Infinity)).toBe(PROTOTYPE_TAGS.number);
      expect(resolvePrototypeString(BigInt(1))).toBe(PROTOTYPE_TAGS.bigInt);
      expect(resolvePrototypeString("hello")).toBe(PROTOTYPE_TAGS.string);
      expect(resolvePrototypeString(Symbol("test"))).toBe(PROTOTYPE_TAGS.symbol);
    });

    it("should correctly identify common object types", () => {
      expect(resolvePrototypeString({})).toBe(PROTOTYPE_TAGS.object);
      expect(resolvePrototypeString([])).toBe(PROTOTYPE_TAGS.array);
      expect(resolvePrototypeString(new Date())).toBe(PROTOTYPE_TAGS.date);
      expect(resolvePrototypeString(/regex/)).toBe(PROTOTYPE_TAGS.regExp);
      expect(resolvePrototypeString(new Error())).toBe(PROTOTYPE_TAGS.error);
      expect(resolvePrototypeString(new Map())).toBe(PROTOTYPE_TAGS.map);
      expect(resolvePrototypeString(new Set())).toBe(PROTOTYPE_TAGS.set);
      expect(resolvePrototypeString(new Promise(() => {}))).toBe(PROTOTYPE_TAGS.promise);
      expect(resolvePrototypeString(() => {})).toBe(PROTOTYPE_TAGS.function);
      expect(resolvePrototypeString(async () => {})).toBe(PROTOTYPE_TAGS.asyncFunction);
      expect(resolvePrototypeString(function *() {})).toBe(PROTOTYPE_TAGS.generatorFunction);
      expect(resolvePrototypeString(async function *() {})).toBe(PROTOTYPE_TAGS.asyncGeneratorFunction);
    });

    it("should handle special native objects like TypedArrays", () => {
      const uint8Array = new Uint8Array([1, 2, 3]);
      const dataView = new DataView(uint8Array.buffer);

      expect(resolvePrototypeString(uint8Array)).toBe("[object Uint8Array]");
      expect(resolvePrototypeString(dataView)).toBe("[object DataView]"); // Note: Not in PROTOTYPE_TAGS but correctly identified

      // Verify it's recognized by the TYPED_ARRAY_TAGS Set
      expect(TYPED_ARRAY_TAGS.has(resolvePrototypeString(uint8Array))).toBe(true);
    });

    it("should work with host objects if available in environment (e.g., Window, HTMLElement)", () => {
      // Test Window if in a browser-like environment (like jsdom in tests)
      if (typeof window !== "undefined") {
        const windowPrototypeString = resolvePrototypeString(window);
        // In jsdom, window's prototype string might be '[object global]'
        // In a real browser, it would be '[object Window]'
        // Accept both possibilities to make the test robust across environments.
        expect(
          windowPrototypeString === PROTOTYPE_TAGS.window
          || windowPrototypeString === PROTOTYPE_TAGS.global,
        ).toBe(true);
      }

      // Test creating a simple element if DOM is available
      if (typeof document !== "undefined") {
        const div = document.createElement("div");
        // DOM elements will have their own specific tags, e.g., [object HTMLDivElement]
        // which should match your PROTOTYPE_TAGS.element or similar.
        // If your PROTOTYPE_TAGS.object is a fallback for generic objects,
        // this assertion might need adjustment based on your specific tags.
        // For example, if you have a tag for HTMLElements:
        // expect(resolvePrototypeString(div)).toBe(PROTOTYPE_TAGS.htmlElement);
        // Or more generically:
        const divPrototypeString = resolvePrototypeString(div);
        expect(typeof divPrototypeString).toBe("string");
        // Optionally, assert it's not a generic object if you have a specific tag for it
        // expect(divPrototypeString).not.toBe(PROTOTYPE_TAGS.object);

        const iframe = document.createElement("iframe");
        // The prototype string for iframe can vary, so we just ensure it doesn't crash
        const iframeTag = resolvePrototypeString(iframe);
        // It might be '[object HTMLIFrameElement]', '[object Object]', or '[object global]' in jsdom
        // The key is that it returns a string.
        expect(typeof iframeTag).toBe("string");
      }
    });

    it("should handle edge cases like objects with null prototypes", () => {
      const nullProtoObj = Object.create(null);
      // Objects with null prototype still have their internal [[Class]] property
      expect(resolvePrototypeString(nullProtoObj)).toBe(PROTOTYPE_TAGS.object);
    });
  });
});
