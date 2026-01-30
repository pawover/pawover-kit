import { describe, expect, it } from "vitest";
import { getTimeZone } from "./timeZone";

describe("getTimeZone", () => {
  it("应该返回时区信息结构", () => {
    const result = getTimeZone();
    expect(result).toHaveProperty("UTC");
    expect(result).toHaveProperty("timeZone");
    expect(typeof result.UTC).toBe("string");
    expect(typeof result.timeZone).toBe("string");
    expect(result.UTC).toMatch(/^UTC[+-]?\d+(\.\d+)?$/);
  });
});
