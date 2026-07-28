import { describe, expect, it } from "vitest";
import { FunctionUtil } from "@pawover/kit/utils";

describe("FunctionUtil", () => {
  describe("to", () => {
    it("should return [null, data] on resolve", async () => {
      const [err, data] = await FunctionUtil.to(Promise.resolve(42));
      expect(err).toBeNull();
      expect(data).toBe(42);
    });

    it("should return [err, undefined] on reject", async () => {
      const [err, data] = await FunctionUtil.to(Promise.reject(new Error("fail")));
      expect(data).toBeUndefined();
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe("fail");
    });

    it("should extend error with errorExt", async () => {
      const [err] = await FunctionUtil.to(Promise.reject(new Error("fail")), { code: 500 });
      expect(err).toHaveProperty("code", 500);
    });

    it("should handle non-error rejection with errorExt", async () => {
      const [err] = await FunctionUtil.to(Promise.reject("string error"), { code: 500 });
      expect(err).toHaveProperty("code", 500);
    });

    it("should use defaultError for falsy rejection", async () => {
      const [err] = await FunctionUtil.to(Promise.reject(null));
      expect(err).toBeInstanceOf(Error);
      expect((err as Error).message).toBe("defaultError");
    });

    it("should extend Error instance with errorExt and preserve own properties", async () => {
      const customError = new Error("custom");
      Object.defineProperty(customError, "status", { value: 400, enumerable: true });
      const [err] = await FunctionUtil.to(Promise.reject(customError), { extra: "info" });
      expect(err).toHaveProperty("extra", "info");
      expect(err).toHaveProperty("status", 400);
    });
  });

  describe("toArgs", () => {
    it("should convert arguments to array", () => {
      function testFn (a: number, b: number) {
        return FunctionUtil.toArgs(arguments);
      }
      const result = testFn(1, 2);
      expect(result).toEqual([1, 2]);
    });

    it("should respect start index", () => {
      function testFn (a: number, b: number, c: number) {
        return FunctionUtil.toArgs(arguments, 1);
      }
      const result = testFn(1, 2, 3);
      expect(result).toEqual([2, 3]);
    });

    it("should throw for null", () => {
      expect(() => FunctionUtil.toArgs(null as unknown as IArguments)).toThrow(TypeError);
    });

    it("should throw for undefined", () => {
      expect(() => FunctionUtil.toArgs(undefined as unknown as IArguments)).toThrow(TypeError);
    });
  });

  describe("toPromise", () => {
    it("should wrap sync return value in promise", async () => {
      const result = await FunctionUtil.toPromise(() => 42);
      expect(result).toBe(42);
    });

    it("should wrap async return value", async () => {
      const result = await FunctionUtil.toPromise(async () => 42);
      expect(result).toBe(42);
    });

    it("should catch sync throw", async () => {
      await expect(FunctionUtil.toPromise(() => { throw new Error("sync"); })).rejects.toThrow("sync");
    });
  });
});
