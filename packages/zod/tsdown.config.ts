import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  target: "es2022",
  platform: "neutral",
  tsconfig: true,
});
