import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ["alova"],
    alias: [
      { find: "@pawover/kit/utils/math", replacement: resolve("packages/utils/src/math/index.ts") },
      { find: "@pawover/kit/utils/vite", replacement: resolve("packages/utils/src/vite/index.ts") },
      { find: "@pawover/kit/utils", replacement: resolve("packages/utils/src/index.ts") },
      { find: "@pawover/kit/hooks/react", replacement: resolve("packages/hooks/src/react/index.ts") },
      { find: "@pawover/kit/hooks/alova", replacement: resolve("packages/hooks/src/alova/index.ts") },
      { find: "@pawover/kit/eslint-rules", replacement: resolve("packages/eslint-rules/src/index.ts") },
      { find: "@pawover/kit/types", replacement: resolve("packages/types/src/index.ts") },
      { find: "@pawover/kit/zod", replacement: resolve("packages/zod/src/index.ts") },
      { find: "@pawover/kit-utils/math", replacement: resolve("packages/utils/src/math/index.ts") },
      { find: "@pawover/kit-utils/vite", replacement: resolve("packages/utils/src/vite/index.ts") },
      { find: "@pawover/kit-utils", replacement: resolve("packages/utils/src/index.ts") },
      { find: "@pawover/kit-hooks/react", replacement: resolve("packages/hooks/src/react/index.ts") },
      { find: "@pawover/kit-hooks/alova", replacement: resolve("packages/hooks/src/alova/index.ts") },
      { find: "@pawover/kit-types", replacement: resolve("packages/types/src/index.ts") },
      { find: "@pawover/kit-zod", replacement: resolve("packages/zod/src/index.ts") },
      { find: "@pawover/kit-eslint-rules", replacement: resolve("packages/eslint-rules/src/index.ts") },
    ],
  },
  test: {
    clearMocks: true,
    setupFiles: ["./test/setup/vitest.setup.ts"],
    coverage: {
      enabled: false,
      reportsDirectory: ".cache/coverage",
      provider: "v8",
      include: ["packages/**/src/**/*.ts", "packages/**/src/**/*.tsx"],
      thresholds: {
        lines: 90,
        branches: 90,
        functions: 90,
        statements: 90,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          environment: "node",
          include: [
            "test/unit/utils/**/*.test.ts",
            "test/unit/zod/**/*.test.ts",
            "test/unit/eslint-rules/**/*.test.ts",
            "test/integration/**/*.test.ts",
          ],
        },
      },
      {
        extends: true,
        test: {
          name: "dom",
          environment: "jsdom",
          include: ["test/unit/hooks/**/*.test.{ts,tsx}"],
        },
      },
    ],
  },
});
