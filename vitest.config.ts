import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          environment: "happy-dom",
          include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
          exclude: ["src/utils/typeof/isIframe.test.ts"],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
      {
        extends: true,
        test: {
          environment: "node",
          include: ["src/utils/typeof/isIframe.test.ts"],
        },
      },
    ],
  },
});
