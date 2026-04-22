import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    alova: "src/alova/index.ts",
    react: "src/react/index.ts",
  },
  dts: true,
  target: "es2020",
  platform: "browser",
  tsconfig: true,
});
