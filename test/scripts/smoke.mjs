import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

/**
 * Post-build smoke test.
 * Run after `pnpm build` to verify dist entries are importable.
 * Usage: node test/scripts/smoke.mjs
 */

const root = resolve(import.meta.dirname, "../..");

const entries = [
  { name: "@pawover/kit/utils", path: resolve(root, "packages/utils/dist/index.js") },
  { name: "@pawover/kit/utils/math", path: resolve(root, "packages/utils/dist/math.js") },
  { name: "@pawover/kit/utils/vite", path: resolve(root, "packages/utils/dist/vite.js") },
  { name: "@pawover/kit/hooks/react", path: resolve(root, "packages/hooks/dist/react.js") },
  { name: "@pawover/kit/hooks/alova", path: resolve(root, "packages/hooks/dist/alova.js") },
  { name: "@pawover/kit/zod", path: resolve(root, "packages/zod/dist/index.js") },
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

if (failed) {
  console.error("\n❌ Smoke test failed");
  process.exit(1);
} else {
  console.log("\n✅ All dist entries are importable");
}
