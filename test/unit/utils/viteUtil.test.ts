import { ViteUtil } from "@pawover/kit/utils/vite";
import { describe, expect, it } from "vitest";

describe("ViteUtil", () => {
  describe("toProxy", () => {
    it("should create proxy config for http target", () => {
      const result = ViteUtil.toProxy([["/api", "http://localhost:3000"]]);
      expect(result["/api"]).toBeDefined();
      expect(result["/api"].target).toBe("http://localhost:3000");
      expect(result["/api"].changeOrigin).toBe(true);
      expect(result["/api"].ws).toBe(true);
    });

    it("should add secure: false for https target", () => {
      const result = ViteUtil.toProxy([["/api", "https://example.com"]]);
      expect(result["/api"].secure).toBe(false);
    });

    it("should handle multiple proxy entries", () => {
      const result = ViteUtil.toProxy([["/api", "http://localhost:3000"], ["/mock", "https://example.com"]]);
      expect(result["/api"]).toBeDefined();
      expect(result["/mock"]).toBeDefined();
    });

    it("should override options with provided options", () => {
      const result = ViteUtil.toProxy([["/api", "http://localhost:3000"]], { changeOrigin: false });
      expect(result["/api"].changeOrigin).toBe(false);
    });

    it("should return empty object for non-object input", () => {
      const result = ViteUtil.toProxy(null as unknown as [string, string][]);
      expect(result).toEqual({});
    });

    it("rewrite function should strip the prefix", () => {
      const result = ViteUtil.toProxy([["/api", "http://localhost:3000"]]);
      const rewritten = result?.["/api"].rewrite?.("/api/users");
      expect(rewritten).toBe("/users");
    });
  });
});
