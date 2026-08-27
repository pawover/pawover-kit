import { tsdownFixCtsStubs, tsdownVisualizerPlugins } from "@pawover/kit-internal";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    alova: "src/alova/index.ts",
    react: "src/react/index.ts",
  },
  format: ["esm", "cjs"],
  dts: { cjsReexport: true },
  target: "es2022",
  platform: "neutral",
  tsconfig: true,
  plugins: tsdownVisualizerPlugins(),
  hooks: {
    "build:done": tsdownFixCtsStubs,
  },
});
