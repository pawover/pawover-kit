import { tsdownFixCtsStubs, tsdownVisualizerPlugins } from "@pawover/kit-internal";
import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    "index": "src/index.ts",
    "core.antfu": "src/core.antfu.ts",
    "core.imports": "src/core.imports.ts",
    "core.importsSort": "src/core.importsSort.ts",
    "core.javascript": "src/core.javascript.ts",
    "core.react": "src/core.react.ts",
    "core.reactHooks": "src/core.reactHooks.ts",
    "core.stylistic": "src/core.stylistic.ts",
    "core.typescript": "src/core.typescript.ts",
    "core.vue": "src/core.vue.ts",
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
