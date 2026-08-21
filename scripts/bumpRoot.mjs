import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { SUB_PACKAGE_DIRS, SUB_PACKAGE_NAMES } from "./packages.mjs";

/**
 * 根包版本同步脚本：
 * 在 `changeset version` 之后运行，将根包 @pawover/kit 的版本与子包同步递增。
 *
 * changesets 的包列表（packages.packages）不包含根包（getPackages 将根包
 * 单独放在 rootPackage），因此根包无法通过 changeset / linked / dependents
 * 机制联动发布。本脚本读取子包 version 后的新版本，按相同 bump 类型
 * （patch / minor / major）与 pre 计数（如 alpha.5）同步递增根包版本，
 * 并硬校验「子包版本变化 ⇒ 根包必变」，失败时退出码为 1。
 *
 * 用法（在 ci:version 中，changeset version 之后）：
 *   node scripts/bump-root.mjs
 *
 * 退出码：
 *   0 根包版本已正确同步（或无子包版本变化）
 *   1 子包版本变化但根包未同步 / 根包变化类型不一致
 */
const ROOT_PACKAGE = "@pawover/kit";

function getVersion(pkgPath) {
  return JSON.parse(readFileSync(pkgPath, "utf8")).version;
}

function readGitVersion(pkgPath) {
  const out = execSync(`git show HEAD:${pkgPath}`, { encoding: "utf8" });
  return JSON.parse(out).version;
}

function bumpType(oldVersion, newVersion) {
  const oldParts = oldVersion.split("-")[0].split(".").map(Number);
  const newParts = newVersion.split("-")[0].split(".").map(Number);
  if (newParts[0] > oldParts[0]) return "major";
  if (newParts[1] > oldParts[1]) return "minor";
  if (newParts[2] > oldParts[2]) return "patch";
  if (getPreCount(oldVersion) !== getPreCount(newVersion)) return "patch";
  return "none";
}

function getPreTag(version) {
  const pre = version.split("-")[1];
  return pre ? pre.split(".")[0] : null;
}

function getPreCount(version) {
  const pre = version.split("-")[1];
  if (!pre) return null;
  const count = Number(pre.split(".")[1]);
  return Number.isNaN(count) ? null : count;
}

function bumpVersion(version, type, preTag, preCount) {
  const main = version.split("-")[0];
  const oldPre = version.split("-")[1] ?? null;
  if (oldPre != null && preTag == null) {
    return main;
  }
  const parts = main.split(".").map(Number);
  if (type === "major") {
    parts[0] += 1;
    parts[1] = 0;
    parts[2] = 0;
  } else if (type === "minor") {
    parts[1] += 1;
    parts[2] = 0;
  } else if (oldPre == null || preTag == null) {
    parts[2] += 1;
  }
  // 否则（oldPre 与 preTag 均存在）：pre 模式内 patch，仅递增 prerelease 计数
  // （0.9.1-alpha.0 → 0.9.1-alpha.1），与 changesets 的子包行为保持一致，
  // 避免根包主数字虚高膨胀
  let next = parts.join(".");
  if (preTag != null && preCount != null) next += `-${preTag}.${preCount}`;
  return next;
}

const rootPackage = JSON.parse(readFileSync("package.json", "utf8"));
const rootOld = readGitVersion("package.json");

let changedType = "none";
let preTag = null;
let preCount = null;

for (let i = 0; i < SUB_PACKAGE_NAMES.length; i++) {
  const pkgPath = `${SUB_PACKAGE_DIRS[i]}/package.json`;
  const oldVersion = readGitVersion(pkgPath);
  const newVersion = getVersion(pkgPath);
  if (oldVersion === newVersion) continue;
  const type = bumpType(oldVersion, newVersion);
  if (changedType === "none" || type === "major" || (type === "minor" && changedType === "patch")) {
    changedType = type;
  }
  const tag = getPreTag(newVersion);
  const count = getPreCount(newVersion);
  if (tag != null) preTag = tag;
  if (count != null) preCount = count;
}

if (changedType === "none") {
  console.log("✔ 无子包版本变化，根包保持", rootPackage.version);
  process.exit(0);
}

const expected = bumpVersion(rootOld, changedType, preTag, preCount);

if (rootPackage.version !== expected) {
  rootPackage.version = expected;
  writeFileSync("package.json", `${JSON.stringify(rootPackage, null, 2)}\n`);
  console.log(`✔ 根包版本已同步：${rootOld} -> ${expected}（子包 ${changedType}${preTag ? ` / ${preTag}.${preCount}` : ""}）`);
} else if (rootPackage.version !== rootOld) {
  console.log(`✔ 根包版本已同步：${rootOld} -> ${rootPackage.version}`);
} else {
  console.error(`❌ 根包版本同步失败：`);
  console.error(`   子包已发布（${changedType}${preTag ? ` / ${preTag}.${preCount}` : ""}），`);
  console.error(`   但根包 ${ROOT_PACKAGE} 版本仍为 ${rootPackage.version}（期望 ${expected}）。`);
  console.error(`   请检查 scripts/bump-root.mjs 或发布流程配置。`);
  process.exit(1);
}
