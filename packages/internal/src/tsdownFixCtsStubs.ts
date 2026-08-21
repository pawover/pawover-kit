import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * 修复 tsdown 生成的 `.d.cts` 存根，使其 re-export 对应的 `.d.ts` 类型。
 *
 * tsdown 的 `dts: { cjsReexport: true }` 会为 CJS 产物生成空的 `.d.cts` 存根，
 * 此函数在构建完成后将其改写为 `export type * from './<base>.d.ts'`，
 * 确保 `require` 路径也能获得完整类型。
 *
 * @returns 无返回值；副作用为覆写 `dist` 目录下的 `.d.cts` 文件
 *
 * @example
 * ```ts
 * hooks: {
 *   "build:done": tsdownFixCtsStubs,
 * }
 * ```
 */
export function tsdownFixCtsStubs () {
  const dist = join(process.cwd(), "dist");
  for (const file of readdirSync(dist)) {
    if (!file.endsWith(".d.cts")) {
      continue;
    }
    const base = file.slice(0, -".d.cts".length);
    writeFileSync(join(dist, file), `export type * from './${base}.d.ts'\n`);
  }
}
