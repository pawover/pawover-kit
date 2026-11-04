import { tsdownVisualizerPlugins } from "@pawover/kit-internal";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm"],
  dts: true,
  target: "es2022",
  platform: "neutral",
  tsconfig: true,
  plugins: tsdownVisualizerPlugins(),
});
