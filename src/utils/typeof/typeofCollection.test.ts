import { describe, expect, it } from "vitest";
import { isIterable } from "./isIterable";
import { isMap, isWeakMap } from "./isMap";
import { isSet, isWeakSet } from "./isSet";

describe("typeof collection", () => {
  it("isMap", () => {
    expect(isMap(new Map())).toBe(true);
    expect(isMap(new WeakMap())).toBe(false);
    expect(isMap({})).toBe(false);
  });

  it("isWeakMap", () => {
    expect(isWeakMap(new WeakMap())).toBe(true);
    expect(isWeakMap(new Map())).toBe(false);
  });

  it("isSet", () => {
    expect(isSet(new Set())).toBe(true);
    expect(isSet(new WeakSet())).toBe(false);
    expect(isSet([])).toBe(false);
  });

  it("isWeakSet", () => {
    expect(isWeakSet(new WeakSet())).toBe(true);
    expect(isWeakSet(new Set())).toBe(false);
  });

  it("isIterable", () => {
    expect(isIterable([])).toBe(true);
    expect(isIterable("str")).toBe(true); // String is iterable
    expect(isIterable(new Set())).toBe(true);
    expect(isIterable(new Map())).toBe(true);
    // Generator function invocation returns iterable iterator
    function *gen() {}
    expect(isIterable(gen())).toBe(true);

    expect(isIterable({})).toBe(false);
    expect(isIterable(null)).toBe(false);
  });
});
