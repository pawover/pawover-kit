/**
 * Post-build smoke test.
 * Run after `pnpm build` to verify dist entries are importable.
 * Usage: node test/scripts/smoke.ts
 */

import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "../..");
const require = createRequire(import.meta.url);

const entries = [
  { name: "@pawover/kit/utils", path: resolve(root, "packages/utils/dist/index.js") },
  { name: "@pawover/kit/utils/math", path: resolve(root, "packages/utils/dist/math.js") },
  { name: "@pawover/kit/utils/vite", path: resolve(root, "packages/utils/dist/vite.js") },
  { name: "@pawover/kit/hooks/react", path: resolve(root, "packages/hooks/dist/react.js") },
  { name: "@pawover/kit/hooks/alova", path: resolve(root, "packages/hooks/dist/alova.js") },
  { name: "@pawover/kit/eslint-rules", path: resolve(root, "packages/eslint-rules/dist/index.js") },
  { name: "@pawover/kit/types", path: resolve(root, "packages/types/dist/index.js") },
  { name: "@pawover/kit/zod", path: resolve(root, "packages/zod/dist/index.js") },
];

const cjsEntries = [
  { name: "@pawover/kit/utils (cjs)", path: resolve(root, "packages/utils/dist/index.cjs") },
  { name: "@pawover/kit/utils/math (cjs)", path: resolve(root, "packages/utils/dist/math.cjs") },
  { name: "@pawover/kit/utils/vite (cjs)", path: resolve(root, "packages/utils/dist/vite.cjs") },
  { name: "@pawover/kit/hooks/react (cjs)", path: resolve(root, "packages/hooks/dist/react.cjs") },
  { name: "@pawover/kit/hooks/alova (cjs)", path: resolve(root, "packages/hooks/dist/alova.cjs") },
  { name: "@pawover/kit/eslint-rules (cjs)", path: resolve(root, "packages/eslint-rules/dist/index.cjs") },
  { name: "@pawover/kit/types (cjs)", path: resolve(root, "packages/types/dist/index.cjs") },
  { name: "@pawover/kit/zod (cjs)", path: resolve(root, "packages/zod/dist/index.cjs") },
];

let failed = false;

for (const entry of entries) {
  try {
    const mod = await import(pathToFileURL(entry.path).href);
    console.log(`  ✓ ${entry.name} — imported successfully`);
    if (Object.keys(mod).length === 0) {
      console.warn(`  ⚠ ${entry.name} — has no named exports`);
    }
  } catch (err) {
    console.error(`  ✗ ${entry.name} — FAILED: ${(err instanceof Error ? err.message : String(err))}`);
    failed = true;
  }
}

for (const entry of cjsEntries) {
  try {
    const mod = require(entry.path);
    console.log(`  ✓ ${entry.name} — required successfully`);
    if (Object.keys(mod).length === 0) {
      console.warn(`  ⚠ ${entry.name} — has no named exports`);
    }
  } catch (err) {
    console.error(`  ✗ ${entry.name} — FAILED: ${(err instanceof Error ? err.message : String(err))}`);
    failed = true;
  }
}

if (failed) {
  console.error("\n❌ Smoke test failed");
  process.exit(1);
} else {
  console.log("\n✅ All dist entries are importable");
}
