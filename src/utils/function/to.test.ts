import { describe, expect, it } from "vitest";
import { to } from "./to";

describe("to", () => {
  it("Promise resolve 时应返回 [null, data]", async () => {
    const p = Promise.resolve("success");
    const [err, data] = await to(p);
    expect(err).toBeNull();
    expect(data).toBe("success");
  });

  it("Promise reject 时应返回 [err, undefined]", async () => {
    const error = new Error("fail");
    const p = Promise.reject(error);
    const [err, data] = await to(p);
    expect(err).toBe(error);
    expect(data).toBeUndefined();
  });

  it("带有 errorExt 时应合并错误信息", async () => {
    const p = Promise.reject({ msg: "fail" });
    const [err, _] = await to(p, { type: "network" });
    expect(err).toEqual({ msg: "fail", type: "network" });
  });

  it("当 reject 是 Error 对象且带有 errorExt 时，测试属性保留情况", async () => {
    const error = new Error("fail");
    // @ts-expect-error force assign property for testing
    error.code = 500;

    // 当前实现：{ ...err, ...errorExt }
    // 对于 Error 对象，spread 操作不会复制 message 和 stack (因为它们不可枚举)
    // 但会复制 code (如果它是可枚举的)

    const [err, _] = await to(Promise.reject(error), { extra: true });

    // 验证：Error 属性是否保留
    // @ts-expect-error test
    expect(err.message).toBe("fail");
    // @ts-expect-error test
    expect(err.extra).toBe(true);
  });
});
