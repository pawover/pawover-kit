import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  target: "es2020",
  platform: "neutral",
  tsconfig: true,
});
