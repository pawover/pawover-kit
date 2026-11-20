/**
 * changeset frontmatter 校验：拦截引用了根包 @pawover/kit 的 changeset。
 *
 * changesets 的 workspace 包列表不含根包（getPackages 把根包单独放在
 * rootPackage），根包一旦出现在 changeset frontmatter，`changeset status` 与
 * `changeset version` 都会直接抛错、阻断发布。根包版本由
 * scripts/bumpRoot.ts 在 version 之后同步，不应通过 changeset 声明。
 *
 * 只扫描 .changeset 根目录的 *.md：pre/ 是版本发布流程的归档产物、不再被
 * 消费，其中可能保留历史 changeset，不能据此阻断；README.md 为说明文档。
 *
 * 用法（在 pnpm test:ci 早期执行）：
 *   node scripts/checkChangesets.ts
 *
 * 退出码：
 *   0 无 changeset 引用根包
 *   1 存在引用根包的 changeset
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const CHANGESET_DIR = join(root, ".changeset");
const ROOT_PACKAGE = String(JSON.parse(readFileSync(join(root, "package.json"), "utf8")).name);

const PACKAGE_KEY = /^\s*(?:-\s*)?(["']?)([^"'\s:]+)\1\s*:/;

function changesetFiles (): string[] {
  if (!existsSync(CHANGESET_DIR)) {
    return [];
  }

  return readdirSync(CHANGESET_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name !== "README.md")
    .map((entry) => entry.name);
}

function frontmatterPackageNames (content: string): string[] {
  const lines = content.replace(/^\uFEFF/, "").split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() !== "");
  if (start === -1 || lines[start]?.trim() !== "---") {
    return [];
  }
  const end = lines.findIndex((line, index) => index > start && line.trim() === "---");
  if (end === -1) {
    return [];
  }

  return lines.slice(start + 1, end).flatMap((line) => PACKAGE_KEY.exec(line)?.[2] ?? []);
}

const offenders = changesetFiles().filter((file) => {
  const content = readFileSync(join(CHANGESET_DIR, file), "utf8");

  return frontmatterPackageNames(content).includes(ROOT_PACKAGE);
});

if (offenders.length === 0) {
  console.log(`✔ changeset frontmatter 校验通过（无引用根包 ${ROOT_PACKAGE} 的 changeset）`);
  process.exit(0);
}

console.error(`❌ changeset frontmatter 引用了根包 ${ROOT_PACKAGE}：`);
for (const file of offenders) {
  console.error(`   - .changeset/${file}`);
}
console.error("   根包不在 changesets 的 workspace 包列表中，changeset status / version 会直接失败。");
console.error("   请引用 packages/* 下的子包，根包版本由 scripts/bumpRoot.ts 在 version 之后同步。");
process.exit(1);
