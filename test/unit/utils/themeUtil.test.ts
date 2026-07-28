import { describe, expect, it } from "vitest";
import { ThemeUtil } from "@pawover/kit/utils";

describe("ThemeUtil", () => {
  describe("THEME", () => {
    it("should have LIGHT and DARK", () => {
      expect(ThemeUtil.THEME.LIGHT).toBe("light");
      expect(ThemeUtil.THEME.DARK).toBe("dark");
    });
  });

  describe("THEME_MODE", () => {
    it("should have LIGHT, DARK and SYSTEM", () => {
      expect(ThemeUtil.THEME_MODE.LIGHT).toBe("light");
      expect(ThemeUtil.THEME_MODE.DARK).toBe("dark");
      expect(ThemeUtil.THEME_MODE.SYSTEM).toBe("system");
    });
  });
});
