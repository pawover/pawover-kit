import { describe, it, expect } from "vitest";
import { stringReplace } from "./stringReplace";

describe("stringReplace", () => {
  it("should replace the first occurrence of a substring", () => {
    expect(stringReplace("hello world", "world", "context")).toBe("hello context");
    expect(stringReplace("aabbcc", "bb", "XX")).toBe("aaXXcc");
  });

  it("should only replace the first match, not all matches", () => {
    expect(stringReplace("hello hello hello", "hello", "hi")).toBe("hi hello hello");
    expect(stringReplace("ababab", "ab", "X")).toBe("Xabab");
  });

  it("should replace a substring at the beginning of the string", () => {
    expect(stringReplace("start middle end", "start", "begin")).toBe("begin middle end");
  });

  it("should replace a substring at the end of the string", () => {
    expect(stringReplace("start middle end", "end", "finish")).toBe("start middle finish");
  });

  it("should return the original string if the search term is not found", () => {
    expect(stringReplace("hello world", "universe", "galaxy")).toBe("hello world");
    expect(stringReplace("typescript", "java", "rust")).toBe("typescript");
  });

  it("should handle empty search and replacement strings", () => {
    // Replacing an empty string inserts the replacement at the start
    expect(stringReplace("hello", "", "prefix")).toBe("prefixhello");
    // Replacing a string with an empty string removes it
    expect(stringReplace("hello", "ell", "")).toBe("ho");
  });

  it("should return an empty string if the input is not a valid string", () => {
    // @ts-ignore Testing incorrect type on purpose
    expect(stringReplace(null, "search", "replace")).toBe("");
    // @ts-ignore
    expect(stringReplace(undefined, "search", "replace")).toBe("");
    // @ts-ignore
    expect(stringReplace(123, "search", "replace")).toBe("");
  });

  it("should handle special characters in search and replacement strings", () => {
    expect(stringReplace("hello world!", "world!", "there.")).toBe("hello there.");
    expect(stringReplace("key=value&other=123", "=", ":")).toBe("key:value&other=123");
  });

  it("should preserve case sensitivity", () => {
    expect(stringReplace("Hello World", "world", "context")).toBe("Hello World");
    expect(stringReplace("Hello World", "World", "context")).toBe("Hello context");
  });

  it("should infer correct literal types with generics", () => {
    // This test primarily ensures type inference works at compile time.
    // At runtime, we just check the value.
    const result = stringReplace("hello world", "world", "typescript");
    expect(result).toBe("hello typescript");
  });
});
