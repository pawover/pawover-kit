import { tsdownFixCtsStubs, tsdownVisualizerPlugins } from "@pawover/kit-internal";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    react: "src/react.ts",
  },
  format: ["esm", "cjs"],
  dts: { cjsReexport: true },
  target: "es2022",
  platform: "neutral",
  tsconfig: "tsconfig.build.json",
  plugins: tsdownVisualizerPlugins(),
  hooks: {
    "build:done": tsdownFixCtsStubs,
  },
});
