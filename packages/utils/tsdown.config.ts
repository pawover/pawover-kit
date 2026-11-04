import { tsdownVisualizerPlugins } from "@pawover/kit-internal";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    math: "src/math/index.ts",
    vite: "src/vite/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  target: "es2022",
  platform: "neutral",
  tsconfig: true,
  plugins: tsdownVisualizerPlugins(),
});
