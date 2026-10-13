import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  target: "es2022",
  platform: "neutral",
  tsconfig: true,
  deps: { neverBundle: true },
});
