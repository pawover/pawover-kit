import { describe, it, expect } from "vitest";
import { stringTruncate } from "./stringTruncate";

describe("stringTruncate", () => {
  // --- 测试修复后的行为 ---

  it("should truncate a string based on maxLength - ellipsis.length using code points", () => {
    // maxLength=8, ellipsis="..." (len=3). Content len = 8-3=5. "hello" + "..." = "hello..."
    expect(stringTruncate("hello world", 8)).toBe("hello...");
    // maxLength=5, ellipsis="..." (len=3). Content len = 5-3=2. "he" + "..." = "he..."
    expect(stringTruncate("hello world", 5)).toBe("he...");
  });

  it("should use a custom ellipsis correctly", () => {
    // maxLength=6, ellipsis=".." (len=2). Content len = 6-2=4. "hell" + ".." = "hell.."
    expect(stringTruncate("hello world", 6, "..")).toBe("hell..");
    // maxLength=8, ellipsis="---" (len=3). Content len = 8-3=5. "hello" + "---" = "hello---"
    expect(stringTruncate("hello world", 8, "---")).toBe("hello---");
  });

  // --- 测试修复后的行为 ---
  it("should handle multi-byte characters correctly", () => {
    // maxLength=3, ellipsis="..." (len=3). Content len = 3-3=0. No space for content, returns "".
    expect(stringTruncate("你好世界", 3, "...")).toBe("");
    // maxLength=2, ellipsis="~" (len=1). Content len = 2-1=1. "🚀" + "~" = "🚀~"
    expect(stringTruncate("🚀🚀🚀", 2, "~")).toBe("🚀~");
  });

  it("should return the original string if it is within the max length", () => {
    expect(stringTruncate("hello", 10)).toBe("hello");
    expect(stringTruncate("hello", 5)).toBe("hello"); // Equal length
  });

  // --- 测试边界情况 ---

  it("should return an empty string if input is null or undefined", () => {
    expect(stringTruncate(null as any, 10)).toBe("");
    expect(stringTruncate(undefined as any, 10)).toBe("");
  });

  it("should return the original string if maxLength is not a non-negative integer", () => {
    // This includes negative numbers, NaN, Infinity.
    expect(stringTruncate("hello", -1)).toBe("hello");
    expect(stringTruncate("hello", NaN as any)).toBe("hello");
    expect(stringTruncate("hello", Infinity as any)).toBe("hello");
    expect(stringTruncate("hello", -0.5)).toBe("hello");
  });

  // Note: maxLength of 0 is now handled by the truncation logic, not this condition
  it("should return an empty string when maxLength is 0", () => {
    // maxLength=0, ellipsis="...". Content len = 0-3=-3. Since -3 <= 0, return "".
    expect(stringTruncate("hello world", 0)).toBe("");
    expect(stringTruncate("hello world", 0, "...")).toBe("");
    expect(stringTruncate("hello world", 0, "")).toBe("");
  });

  it("should return an empty string when maxLength is smaller than or equal to the ellipsis length", () => {
    // When maxLength is smaller than or equal to ellipsis length, no space for content.
    expect(stringTruncate("hello world", 2, "...")).toBe("");
    expect(stringTruncate("hello world", 3, "...")).toBe("");
  });

  it("should return the ellipsis if there is exactly enough space for it and one character", () => {
    // maxLength=4, ellipsis="..." (len=3). Content len = 4-3=1.
    // input.slice(0, 1) -> "h". Then "h" + "..." -> "h..."
    expect(stringTruncate("hello world", 4, "...")).toBe("h...");
  });

  it("should return a string with content and ellipsis when maxLength is just large enough", () => {
    // maxLength=6, ellipsis="..." (len=3). Content len = 6-3=3.
    // input.slice(0, 3) -> "hel". Then "hel" + "..." -> "hel..."
    expect(stringTruncate("hello world", 6, "...")).toBe("hel...");
  });
});
