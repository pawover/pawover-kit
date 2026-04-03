import { describe, it, expect } from "vitest";
import * as envUtils from "./index";

describe("Environment Detection - Browser Specific", () => {
  it("should detect real browser features", () => {
    expect(envUtils.isBrowser()).toBe(true);
    expect(typeof window).toBe("object");
    expect(typeof document).toBe("object");
    expect(typeof navigator).toBe("object");
  });

  it("should detect browser APIs", () => {
    expect("fetch" in window).toBe(true);
    expect("localStorage" in window).toBe(true);
    expect(typeof document.createElement).toBe("function");
  });

  it("should correctly identify browser environment", () => {
    const envInfo = {
      isBrowser: envUtils.isBrowser(),
    };

    expect(envInfo.isBrowser).toBe(true);
  });
});
