import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig } from "tsdown";

function fixCtsStubs () {
  const dist = join(process.cwd(), "dist");
  for (const file of readdirSync(dist)) {
    if (!file.endsWith(".d.cts")) {
      continue;
    }
    const base = file.slice(0, -".d.cts".length);
    writeFileSync(join(dist, file), `export type * from './${base}.d.ts'\n`);
  }
}

export default defineConfig({
  format: ["esm", "cjs"],
  dts: { cjsReexport: true },
  target: "es2022",
  platform: "neutral",
  tsconfig: true,
  hooks: {
    "build:done": fixCtsStubs,
  },
});
