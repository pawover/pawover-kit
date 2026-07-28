import { describe, expect, it } from "vitest";

describe("root package subpath exports", () => {
  it("@pawover/kit/utils should be importable", async () => {
    const mod = await import("@pawover/kit/utils");
    expect(mod).toBeDefined();
    expect(typeof mod).toBe("object");
  });

  it("@pawover/kit/utils/math should be importable", async () => {
    const mod = await import("@pawover/kit/utils/math");
    expect(mod).toBeDefined();
  });

  it("@pawover/kit/zod should be importable", async () => {
    const mod = await import("@pawover/kit/zod");
    expect(mod).toBeDefined();
  });
});
