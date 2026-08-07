import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * 根包构建后同步脚本：
 * 将 utils / hooks 构建产物的 metadata.json 复制到 entry/（聚合包薄入口目录）。
 * 根包已发布物不包含子包 dist，故 metadata 需在发布前同步。
 */
const root = resolve(import.meta.dirname, "..");
const entries = [
  ["packages/utils/dist/metadata.json", "entry/metadata.json"],
  ["packages/hooks/dist/metadata.json", "entry/hooks-metadata.json"],
];
for (const [from, to] of entries) {
  copyFileSync(resolve(root, from), resolve(root, to));
  console.log(`✔ ${to} synced from ${from}`);
}
