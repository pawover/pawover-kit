import { describe, it, expect } from "vitest";
import { stringToPosix } from "./stringToPosix";

describe("stringToPosix", () => {
  it("should convert Windows paths to POSIX style and add leading slash", () => {
    expect(stringToPosix("C:\\Windows\\System32")).toBe("/Windows/System32");
    expect(stringToPosix("D:\\Projects\\MyApp\\src")).toBe("/Projects/MyApp/src");
    expect(stringToPosix("E:\\some\\path\\with\\backslashes\\")).toBe("/some/path/with/backslashes/");
    // Test without trailing slash after drive letter
    expect(stringToPosix("F:\\Path")).toBe("/Path");
    expect(stringToPosix("c:\\lowercase\\drive")).toBe("/lowercase/drive");
  });

  it("should handle paths without drive letters", () => {
    expect(stringToPosix("\\folder\\subfolder")).toBe("/folder/subfolder");
    expect(stringToPosix("relative\\path\\file.txt")).toBe("relative/path/file.txt");
    expect(stringToPosix("path\\\\with\\\\double\\\\slashes")).toBe("path/with/double/slashes");
  });

  it("should handle Unix/Linux paths", () => {
    expect(stringToPosix("/home/user/documents")).toBe("/home/user/documents");
    expect(stringToPosix("usr/local/bin")).toBe("usr/local/bin");
    expect(stringToPosix("/absolute//path///with///multiple///slashes")).toBe("/absolute/path/with/multiple/slashes");
  });

  it("should remove leading slash when removeLeadingSlash is true", () => {
    expect(stringToPosix("/absolute/path", true)).toBe("absolute/path");
    expect(stringToPosix("C:\\Windows\\System32", true)).toBe("Windows/System32");
    expect(stringToPosix("\\folder\\subfolder", true)).toBe("folder/subfolder");
    expect(stringToPosix("no/leading/slash", true)).toBe("no/leading/slash");
  });

  it("should not remove leading slash when removeLeadingSlash is false (default)", () => {
    expect(stringToPosix("/absolute/path", false)).toBe("/absolute/path");
    expect(stringToPosix("/absolute/path")).toBe("/absolute/path"); // Default value check
    expect(stringToPosix("C:\\Windows\\System32", false)).toBe("/Windows/System32");
  });

  it("should return an empty string for null or undefined input", () => {
    expect(stringToPosix(null)).toBe("");
    expect(stringToPosix(undefined)).toBe("");
  });

  it("should return an empty string for an empty string", () => {
    expect(stringToPosix("")).toBe("");
  });

  it("should handle paths with mixed slashes", () => {
    expect(stringToPosix("C:/mixed\\path\\style")).toBe("/mixed/path/style");
    expect(stringToPosix("/start\\middle/end/")).toBe("/start/middle/end/");
  });

  it("should handle paths that are just slashes", () => {
    expect(stringToPosix("/")).toBe("/");
    expect(stringToPosix("\\")).toBe("/");
    expect(stringToPosix("//")).toBe("/");
    expect(stringToPosix("\\\\")).toBe("/");
    expect(stringToPosix("\\\\//")).toBe("/");
    expect(stringToPosix("/", true)).toBe("");
    expect(stringToPosix("//", true)).toBe("");
  });

  it("should handle paths starting with multiple slashes", () => {
    expect(stringToPosix("//network/path")).toBe("/network/path");
    expect(stringToPosix("\\\\network\\path")).toBe("/network/path");
    expect(stringToPosix("///triple/slash")).toBe("/triple/slash");
    expect(stringToPosix("//unc//path//with//slashes")).toBe("/unc/path/with/slashes");
  });
});
