import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: {
      index: "src/utils/index.ts",
      enums: "src/enums/index.ts",
      vite: "src/vite/index.ts",
      zod: "src/zod/index.ts",
    },
    dts: {
      resolve: ["radashi"],
    },
    target: "es2020",
    platform: "neutral",
    tsconfig: "tsconfig.build.json",
  },
  {
    entry: {
      "hooks-alova": "src/hooks/alova/index.ts",
      "hooks-react": "src/hooks/react/index.ts",
    },
    dts: {
      resolve: ["radashi"],
    },
    target: "es2020",
    platform: "neutral",
    tsconfig: "tsconfig.build.json",
  },
]);
