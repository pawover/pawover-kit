import { describe, it, expect } from "vitest";
import { isBlob, isFile } from "./isBlob";

describe("isBlob", () => {
  it("should return true for Blob instances", () => {
    const blob = new Blob(["hello", " ", "world"], { type: "text/plain" });
    expect(isBlob(blob)).toBe(true);
  });

  it("should return false for non-Blob values", () => {
    expect(isBlob(undefined)).toBe(false);
    expect(isBlob(null)).toBe(false);
    expect(isBlob(true)).toBe(false);
    expect(isBlob(false)).toBe(false);
    expect(isBlob(0)).toBe(false);
    expect(isBlob(1)).toBe(false);
    expect(isBlob(NaN)).toBe(false);
    expect(isBlob(Infinity)).toBe(false);
    expect(isBlob("")).toBe(false);
    expect(isBlob("blob")).toBe(false);
    expect(isBlob({})).toBe(false);
    expect(isBlob([])).toBe(false);
    expect(isBlob(new File(["content"], "file.txt"))).toBe(false); // A File is not a Blob in terms of type guard here, though File inherits from Blob
    expect(isBlob(new ArrayBuffer(8))).toBe(false);
    expect(isBlob(() => {})).toBe(false);
    expect(isBlob(Symbol("a"))).toBe(false);
    expect(isBlob(BigInt(123))).toBe(false);
  });
});

describe("isFile", () => {
  it("should return true for File instances", () => {
    const file = new File(["file content"], "test.txt", { type: "text/plain" });
    expect(isFile(file)).toBe(true);
  });

  it("should return false for non-File values", () => {
    expect(isFile(undefined)).toBe(false);
    expect(isFile(null)).toBe(false);
    expect(isFile(true)).toBe(false);
    expect(isFile(false)).toBe(false);
    expect(isFile(0)).toBe(false);
    expect(isFile(1)).toBe(false);
    expect(isFile(NaN)).toBe(false);
    expect(isFile(Infinity)).toBe(false);
    expect(isFile("")).toBe(false);
    expect(isFile("file")).toBe(false);
    expect(isFile({})).toBe(false);
    expect(isFile([])).toBe(false);
    expect(isFile(new Blob(["content"], { type: "text/plain" }))).toBe(false); // A Blob is not a File
    expect(isFile(new ArrayBuffer(8))).toBe(false);
    expect(isFile(() => {})).toBe(false);
    expect(isFile(Symbol("a"))).toBe(false);
    expect(isFile(BigInt(123))).toBe(false);
  });
});
