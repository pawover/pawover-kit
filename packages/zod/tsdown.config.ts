import { tsdownVisualizerPlugins } from "@pawover/kit-internal";
import { defineConfig } from "tsdown";

export default defineConfig({
  format: ["esm", "cjs"],
  dts: true,
  target: "es2022",
  platform: "neutral",
  tsconfig: true,
  plugins: tsdownVisualizerPlugins(),
});
