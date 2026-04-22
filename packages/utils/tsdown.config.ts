import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    math: "src/math/index.ts",
    vite: "src/vite/index.ts",
  },
  dts: true,
  target: "es2020",
  platform: "neutral",
  tsconfig: true,
});
