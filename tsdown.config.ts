import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: {
      index: "src/utils/index.ts",
      enums: "src/enums/index.ts",
      zod: "src/zod/index.ts",
      metadata: "src/metadata.ts",
    },
    external: ["zod"],
    dts: true,
    target: "es2020",
    platform: "neutral",
    exports: false,
  },
  {
    entry: {
      "hooks-react": "src/hooks/react/index.ts",
    },
    external: ["react"],
    dts: true,
    target: "es2020",
    platform: "browser",
  },
]);
