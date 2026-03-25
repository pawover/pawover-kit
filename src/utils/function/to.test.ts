import { describe, it, expect } from "vitest";
import { to } from "./to";

describe("to", () => {
  it("should resolve with [null, data] for a successful promise", async () => {
    const [err, data] = await to(Promise.resolve("success"));
    expect(err).toBeNull();
    expect(data).toBe("success");
  });

  it("should reject with [error, undefined] for a failed promise", async () => {
    const testError = new Error("Something went wrong");
    const [err, data] = await to(Promise.reject(testError));

    expect(data).toBeUndefined();
    expect(err).toBe(testError);
  });

  it("should return a default error if rejected with a falsy value", async () => {
    const [err, data] = await to(Promise.reject(null));
    expect(data).toBeUndefined();
    expect(err).toBeInstanceOf(Error);
    expect((err as Error).message).toBe("defaultError");
  });

  it("should extend the error object with errorExt properties", async () => {
    const originalError = new Error("Original message");
    originalError.name = "TestError";
    const extension = { code: 500, source: "api" };

    const [err, data] = await to(Promise.reject(originalError), extension);

    expect(data).toBeUndefined();
    expect(err).toMatchObject({
      message: "Original message",
      name: "TestError",
      code: 500,
      source: "api",
    });
  });

  it("should extend a non-Error object with errorExt properties", async () => {
    const originalError = { message: "Custom error", status: 400 };
    const extension = { timestamp: Date.now(), path: "/test" };

    const [err, data] = await to(Promise.reject(originalError), extension);

    expect(data).toBeUndefined();
    expect(err).toMatchObject({
      message: "Custom error",
      status: 400,
      timestamp: expect.any(Number),
      path: "/test",
    });
  });

  it("should allow errorExt to override properties of the original error", async () => {
    const originalError = new Error("Original message");
    const extension = { message: "Overridden message", customProp: "added" };

    const [err, data] = await to(Promise.reject(originalError), extension);

    expect(data).toBeUndefined();
    expect(err).toMatchObject({
      message: "Overridden message", // Overridden by errorExt
      customProp: "added", // Added from errorExt
    });
  });
});
