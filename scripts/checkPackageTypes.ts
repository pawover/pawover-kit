/**
 * 各包 tsconfig 项目（IDE 归属项目）的类型检查（check:types:packages）。
 *
 * 背景：IDE 编辑包内文件时归属的项目是 packages/<pkg>/tsconfig.json——其 include 为默认的全量通配，
 * 而 extends 继承的 exclude 相对「源配置目录」解析、对子包无效；历史上曾把 dist 产物收进项目
 * 引发 IDE 误报（declare global 重复）。各包已显式排除通配模式的 node_modules 与 dist，
 * 本脚本把该项目的编译检查纳入 CI，防止再次漏网。
 * 用法：pnpm check:types:packages
 */

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const tscJs = resolve(root, "node_modules/typescript/lib/tsc.js");
const packagesDir = resolve(root, "packages");

const dirs = readdirSync(packagesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(resolve(packagesDir, entry.name, "tsconfig.json")))
  .map((entry) => entry.name)
  .sort();

let failed = false;
for (const dir of dirs) {
  const result = spawnSync(process.execPath, [tscJs, "-p", resolve(packagesDir, dir, "tsconfig.json"), "--noEmit"], { encoding: "utf8" });
  if (result.status === 0) {
    console.log(`  ✓ packages/${dir}`);
  } else {
    failed = true;
    console.error(`  ✗ packages/${dir}`);
    console.error(`${result.stdout ?? ""}${result.stderr ?? ""}`);
  }
}

if (failed) {
  console.error("\n❌ 包项目类型检查失败");
  process.exit(1);
} else {
  console.log("\n✅ 全部包项目类型检查通过");
}
