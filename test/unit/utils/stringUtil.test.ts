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

    it("should return 'null' for null when checkNullish is false", () => {
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

    it("should convert Symbol to string", () => {
      expect(StringUtil.cast(Symbol("foo"))).toBe("Symbol(foo)");
    });

    it("should convert BigInt to string", () => {
      expect(StringUtil.cast(42n)).toBe("42");
    });

    it("should convert object via toString", () => {
      expect(StringUtil.cast({})).toBe("[object Object]");
    });

    it("should convert array to string", () => {
      expect(StringUtil.cast([1, 2, 3])).toBe("1,2,3");
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

    it("should return '0' for empty string", () => {
      expect(StringUtil.toNumber("")).toBe("0");
    });

    it("should preserve single decimal point", () => {
      expect(StringUtil.toNumber("12.34")).toBe("12.34");
    });

    it("should remove extra decimal points", () => {
      expect(StringUtil.toNumber("12.34.56")).toBe("12.3456");
    });

    it("should handle double minus making positive", () => {
      expect(StringUtil.toNumber("a--1")).toBe("1");
    });

    it("should handle only minus signs", () => {
      expect(StringUtil.toNumber("---")).toBe("-0");
    });

    it("should add leading zero for leading decimal", () => {
      expect(StringUtil.toNumber(".5")).toBe("0.5");
    });

    it("should remove trailing decimal", () => {
      expect(StringUtil.toNumber("5.")).toBe("5");
    });
  });

  describe("toLowerCase", () => {
    it("should convert string to lowercase", () => {
      expect(StringUtil.toLowerCase("HELLO")).toBe("hello");
    });

    it("should return empty string for invalid input", () => {
      expect(StringUtil.toLowerCase(null as unknown as string)).toBe("");
    });

    it("should handle mixed case", () => {
      expect(StringUtil.toLowerCase("HeLLo WoRLd")).toBe("hello world");
    });

    it("should handle non-Latin characters", () => {
      expect(StringUtil.toLowerCase("CAFÉ")).toBe("café");
    });

    it("should handle numbers and symbols", () => {
      expect(StringUtil.toLowerCase("HELLO123!")).toBe("hello123!");
    });

    it("should return empty string for undefined", () => {
      expect(StringUtil.toLowerCase(undefined as unknown as string)).toBe("");
    });
  });

  describe("toUpperCase", () => {
    it("should convert string to uppercase", () => {
      expect(StringUtil.toUpperCase("hello")).toBe("HELLO");
    });

    it("should return empty string for invalid input", () => {
      expect(StringUtil.toUpperCase(null as unknown as string)).toBe("");
    });

    it("should handle mixed case", () => {
      expect(StringUtil.toUpperCase("HeLLo WoRLd")).toBe("HELLO WORLD");
    });

    it("should handle non-Latin characters", () => {
      expect(StringUtil.toUpperCase("café")).toBe("CAFÉ");
    });

    it("should return empty string for undefined", () => {
      expect(StringUtil.toUpperCase(undefined as unknown as string)).toBe("");
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

    it("should preserve all-caps words", () => {
      expect(StringUtil.toInitialCase("NASA", "lower")).toBe("NASA");
    });

    it("should preserve words with non-Latin chars", () => {
      expect(StringUtil.toInitialCase("héllo", "upper")).toBe("Héllo");
    });

    it("should keep words with punctuation unchanged", () => {
      expect(StringUtil.toInitialCase("hello.world", "upper")).toBe("hello.world");
    });

    it("should do nothing for undefined caseType", () => {
      expect(StringUtil.toInitialCase("hello")).toBe("hello");
    });

    it("should handle empty string", () => {
      expect(StringUtil.toInitialCase("", "upper")).toBe("");
    });

    it("should handle numbers in string", () => {
      expect(StringUtil.toInitialCase("123abc", "upper")).toBe("123abc");
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

    it("should convert UNC path", () => {
      expect(StringUtil.toPosix("\\\\server\\share\\file.txt")).toBe("/server/share/file.txt");
    });

    it("should convert relative path", () => {
      expect(StringUtil.toPosix("folder\\subfolder\\file.txt")).toBe("folder/subfolder/file.txt");
    });

    it("should normalize multiple slashes", () => {
      expect(StringUtil.toPosix("a\\\\b\\/c")).toBe("a/b/c");
    });

    it("should handle forward slashes already", () => {
      expect(StringUtil.toPosix("/usr/local/bin")).toBe("/usr/local/bin");
    });

    it("should remove drive letter even without separator", () => {
      expect(StringUtil.toPosix("C:file.txt")).toBe("file.txt");
    });

    it("should return empty string for undefined", () => {
      expect(StringUtil.toPosix(undefined)).toBe("");
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

    it("should return undefined for empty string", () => {
      expect(StringUtil.toJson("")).toBeUndefined();
    });

    it("should return fallback for whitespace string", () => {
      expect(StringUtil.toJson("   ", null as any)).toBeNull();
    });

    it("should parse JSON array", () => {
      expect(StringUtil.toJson<number[]>('[1,2,3]')).toEqual([1, 2, 3]);
    });

    it("should parse JSON primitive", () => {
      expect(StringUtil.toJson('42')).toBe(42);
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

    it("should return empty array for undefined input", () => {
      expect(StringUtil.toValues(undefined)).toEqual([]);
    });

    it("should return empty array for empty string", () => {
      expect(StringUtil.toValues("")).toEqual([]);
    });

    it("should handle empty values as 0 in number mode", () => {
      const result = StringUtil.toValues("1,,2");
      expect(result[0]).toBe(1);
      expect(result[1]).toBe(0);
      expect(result[2]).toBe(2);
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

    it("should trim multiple custom characters", () => {
      expect(StringUtil.trim("***hello***", "*")).toBe("hello");
    });

    it("should trim special regex characters", () => {
      expect(StringUtil.trim("$$hello$$", "$")).toBe("hello");
      expect(StringUtil.trim("^^hello^^", "^")).toBe("hello");
      expect(StringUtil.trim("..hello..", ".")).toBe("hello");
    });

    it("should return original string if chars not found", () => {
      expect(StringUtil.trim("hello", "_")).toBe("hello");
    });

    it("should return empty string for undefined", () => {
      expect(StringUtil.trim(undefined)).toBe("");
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

    it("should return empty string when maxLength is less than ellipsis length", () => {
      expect(StringUtil.truncate("hello world", 2)).toBe("");
    });

    it("should handle zero maxLength", () => {
      expect(StringUtil.truncate("hello", 0)).toBe("");
    });

    it("should handle negative maxLength", () => {
      expect(StringUtil.truncate("hello", -1)).toBe("hello");
    });

    it("should handle custom ellipsis", () => {
      expect(StringUtil.truncate("hello world", 9, "---")).toBe("hello ---");
    });

    it("should return full string when emoji fits within maxLength", () => {
      expect(StringUtil.truncate("a😀b", 3)).toBe("a😀b");
    });

    it("should handle empty ellipsis", () => {
      expect(StringUtil.truncate("hello world", 5, "")).toBe("hello");
    });

    it("should return empty string for undefined input", () => {
      expect(StringUtil.truncate(undefined as unknown as string, 5)).toBe("");
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

    it("should replace multiple placeholders", () => {
      expect(StringUtil.template("{{a}} {{b}} {{c}}", { a: "1", b: "2", c: "3" })).toBe("1 2 3");
    });

    it("should replace same placeholder multiple times", () => {
      expect(StringUtil.template("{{x}}{{x}}", { x: "A" })).toBe("AA");
    });

    it("should convert null value to empty string", () => {
      expect(StringUtil.template("value: {{x}}", { x: null })).toBe("value: {{x}}");
    });

    it("should convert undefined value to empty string", () => {
      expect(StringUtil.template("value: {{x}}", { x: undefined })).toBe("value: {{x}}");
    });

    it("should use custom regex", () => {
      expect(StringUtil.template("Hello <name>", { name: "World" }, /<(.+?)>/g)).toBe("Hello World");
    });

    it("should force global flag on non-global regex", () => {
      expect(StringUtil.template("Hello <name>!", { name: "World" }, /<(.+?)>/)).toBe("Hello World!");
    });

    it("should work with no placeholders", () => {
      expect(StringUtil.template("hello world", { x: "y" })).toBe("hello world");
    });
  });

  describe("replace", () => {
    it("should replace the first occurrence", () => {
      expect(StringUtil.replace("hello world", "world", "context")).toBe("hello context");
    });

    it("should return empty string for invalid input", () => {
      expect(StringUtil.replace(null as unknown as string, "a", "b")).toBe("");
    });

    it("should only replace first occurrence", () => {
      expect(StringUtil.replace("a a a", "a", "b")).toBe("b a a");
    });

    it("should return original string if search not found", () => {
      expect(StringUtil.replace("hello", "x", "y")).toBe("hello");
    });

    it("should replace with empty string", () => {
      expect(StringUtil.replace("hello world", "world", "")).toBe("hello ");
    });

    it("should handle empty input string", () => {
      expect(StringUtil.replace("", "a", "b")).toBe("");
    });

    it("should return empty string for undefined input", () => {
      expect(StringUtil.replace(undefined as unknown as string, "a", "b")).toBe("");
    });
  });
});
