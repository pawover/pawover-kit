import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@pawover/kit/utils/math", replacement: resolve("packages/utils/src/math/index.ts") },
      { find: "@pawover/kit/utils/vite", replacement: resolve("packages/utils/src/vite/index.ts") },
      { find: "@pawover/kit/utils", replacement: resolve("packages/utils/src/index.ts") },
      { find: "@pawover/kit/hooks/react", replacement: resolve("packages/hooks/src/react/index.ts") },
      { find: "@pawover/kit/hooks/alova", replacement: resolve("packages/hooks/src/alova/index.ts") },
      { find: "@pawover/kit/zod", replacement: resolve("packages/zod/src/index.ts") },
    ],
  },
  test: {
    setupFiles: ["./test/setup/vitest.setup.ts"],
    coverage: {
      enabled: false,
      reportsDirectory: ".cache/coverage",
      provider: "v8",
      thresholds: {
        lines: 80,
        branches: 70,
        functions: 80,
        statements: 80,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          environment: "node",
          include: [
            "test/unit/utils/**/*.test.ts",
            "test/unit/zod/**/*.test.ts",
            "test/integration/**/*.test.ts",
          ],
        },
      },
      {
        extends: true,
        test: {
          environment: "jsdom",
          include: ["test/unit/hooks/**/*.test.{ts,tsx}"],
        },
      },
    ],
  },
});
