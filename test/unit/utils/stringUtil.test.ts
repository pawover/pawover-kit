import { describe, expect, it } from "vitest";
import { StringUtil } from "@pawover/kit/utils";

describe("StringUtil", () => {
  describe("cast", () => {
    it("should convert number to string", () => {
      expect(StringUtil.cast(123)).toBe("123");
    });

    it("should convert boolean to string", () => {
      expect(StringUtil.cast(true)).toBe("true");
    });

    it("should return empty string for null", () => {
      expect(StringUtil.cast(null)).toBe("");
    });

    it("should return empty string for undefined", () => {
      expect(StringUtil.cast(undefined)).toBe("");
    });

    it("should return 'null' for null when checkEmpty is false", () => {
      expect(StringUtil.cast(null, false)).toBe("null");
    });

    it("should trim by default", () => {
      expect(StringUtil.cast("  hello  ")).toBe("hello");
    });

    it("should not trim when trim is false", () => {
      expect(StringUtil.cast("  hello  ", true, false)).toBe("  hello  ");
    });

    it("should return empty string for blank string", () => {
      expect(StringUtil.cast("   ")).toBe("");
    });
  });

  describe("toNumber", () => {
    it("should extract number string from formatted input", () => {
      expect(StringUtil.toNumber("$1,234.56")).toBe("1234.56");
    });

    it("should handle negative numbers", () => {
      expect(StringUtil.toNumber("abc-123")).toBe("-123");
    });

    it("should return '0' for non-string input", () => {
      expect(StringUtil.toNumber(null as unknown as string)).toBe("0");
    });

    it("should return '0' for input with no digits", () => {
      expect(StringUtil.toNumber("abc")).toBe("0");
    });
  });

  describe("toLowerCase", () => {
    it("should convert string to lowercase", () => {
      expect(StringUtil.toLowerCase("HELLO")).toBe("hello");
    });

    it("should return empty string for invalid input", () => {
      expect(StringUtil.toLowerCase(null as unknown as string)).toBe("");
    });
  });

  describe("toUpperCase", () => {
    it("should convert string to uppercase", () => {
      expect(StringUtil.toUpperCase("hello")).toBe("HELLO");
    });

    it("should return empty string for invalid input", () => {
      expect(StringUtil.toUpperCase(null as unknown as string)).toBe("");
    });
  });

  describe("toInitialCase", () => {
    it("should convert first letter to lowercase", () => {
      expect(StringUtil.toInitialCase("Hello", "lower")).toBe("hello");
    });

    it("should convert first letter to uppercase", () => {
      expect(StringUtil.toInitialCase("hello", "upper")).toBe("Hello");
    });

    it("should return empty string for invalid input", () => {
      expect(StringUtil.toInitialCase(null as unknown as string)).toBe("");
    });
  });

  describe("toPosix", () => {
    it("should convert Windows path to POSIX", () => {
      const result = StringUtil.toPosix("C:\\Windows\\System32");
      expect(result).toMatch(/^\/Windows\/System32$/);
    });

    it("should remove leading slash when requested", () => {
      expect(StringUtil.toPosix("C:\\Windows", true)).toBe("Windows");
    });

    it("should return empty string for invalid input", () => {
      expect(StringUtil.toPosix(null)).toBe("");
    });
  });

  describe("toJson", () => {
    it("should parse valid JSON string", () => {
      expect(StringUtil.toJson<{ a: number }>('{"a":1}')).toEqual({ a: 1 });
    });

    it("should return undefined for invalid JSON", () => {
      expect(StringUtil.toJson("invalid")).toBeUndefined();
    });

    it("should return fallback for invalid JSON", () => {
      expect(StringUtil.toJson("invalid", { a: 0 })).toEqual({ a: 0 });
    });

    it("should return fallback for null input", () => {
      expect(StringUtil.toJson(null, {})).toEqual({});
    });
  });

  describe("toValues", () => {
    it("should split string into numbers by default", () => {
      expect(StringUtil.toValues("1,2,3")).toEqual([1, 2, 3]);
    });

    it("should split string by custom separator", () => {
      expect(StringUtil.toValues("a-b-c", "string", "-")).toEqual(["a", "b", "c"]);
    });

    it("should return empty array for null input", () => {
      expect(StringUtil.toValues(null)).toEqual([]);
    });
  });

  describe("trim", () => {
    it("should trim whitespace by default", () => {
      expect(StringUtil.trim("  hello  ")).toBe("hello");
    });

    it("should trim custom characters", () => {
      expect(StringUtil.trim("__hello__", "_")).toBe("hello");
    });

    it("should return empty string for null input", () => {
      expect(StringUtil.trim(null)).toBe("");
    });
  });

  describe("truncate", () => {
    it("should truncate with ellipsis", () => {
      expect(StringUtil.truncate("hello world", 8)).toBe("hello...");
    });

    it("should return full string if shorter than max length", () => {
      expect(StringUtil.truncate("hi", 8)).toBe("hi");
    });

    it("should return empty string for invalid input", () => {
      expect(StringUtil.truncate(null as unknown as string, 5)).toBe("");
    });
  });

  describe("template", () => {
    it("should replace {{key}} placeholders", () => {
      expect(StringUtil.template("Hello {{name}}", { name: "World" })).toBe("Hello World");
    });

    it("should preserve missing keys in template", () => {
      expect(StringUtil.template("Hello {{name}}", {})).toBe("Hello {{name}}");
    });

    it("should return empty string for invalid input", () => {
      expect(StringUtil.template(null as unknown as string, {})).toBe("");
    });
  });

  describe("replace", () => {
    it("should replace the first occurrence", () => {
      expect(StringUtil.replace("hello world", "world", "context")).toBe("hello context");
    });

    it("should return empty string for invalid input", () => {
      expect(StringUtil.replace(null as unknown as string, "a", "b")).toBe("");
    });
  });
});
