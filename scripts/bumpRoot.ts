/**
 * 根包版本同步脚本：
 * 在 `changeset version` 之后运行，将根包 @pawover/kit 的版本与子包同步递增。
 *
 * changesets 的包列表（packages.packages）不包含根包（getPackages 将根包
 * 单独放在 rootPackage），因此根包无法通过 changeset / linked / dependents
 * 机制联动发布。本脚本读取子包 version 后的新版本，按子包中的最高 bump
 * 类型（patch / minor / major）同步根包版本；pre 计数（如 alpha.1）取自
 * 根包自身并单调 +1（与 changesets 对子包的实测行为一致），
 * 并硬校验「子包版本变化 ⇒ 根包必变」，失败时退出码为 1。
 *
 * 用法（在 ci:version 中，changeset version 之后）：
 *   node scripts/bumpRoot.ts
 *
 * 退出码：
 *   0 根包版本已正确同步（或无子包版本变化）
 *   1 子包版本变化但根包未同步 / 根包变化类型不一致
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { SUB_PACKAGE_DIRS, SUB_PACKAGE_NAMES } from "./packages.ts";

const ROOT_PACKAGE = "@pawover/kit";

function getVersion (pkgPath: string) {
  return JSON.parse(readFileSync(pkgPath, "utf8")).version;
}

function readGitVersion (pkgPath: string) {
  const out = execSync(`git show HEAD:${pkgPath}`, { encoding: "utf8" });

  return JSON.parse(out).version;
}

function parseTriple (version: string): [number, number, number] {
  const parts = (version.split("-")[0] ?? "0.0.0").split(".").map(Number);

  return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0];
}

function getPreCount (version: string): number | null {
  const pre = version.split("-")[1];
  if (!pre) {
    return null;
  }
  const count = Number(pre.split(".")[1]);

  return Number.isNaN(count) ? null : count;
}

function bumpType (oldVersion: string, newVersion: string): "major" | "minor" | "patch" | "none" {
  const [oldMajor, oldMinor, oldPatch] = parseTriple(oldVersion);
  const [newMajor, newMinor, newPatch] = parseTriple(newVersion);
  if (newMajor > oldMajor) {
    return "major";
  }
  if (newMinor > oldMinor) {
    return "minor";
  }
  if (newPatch > oldPatch) {
    return "patch";
  }
  if (getPreCount(oldVersion) !== getPreCount(newVersion)) {
    return "patch";
  }

  return "none";
}

/**
 * 按 bump 类型与 pre 系列计算根包新版本。
 *
 * - 同一 pre 系列内：major / minor 升对应主数字位，patch 保持主数字；
 *   pre 计数在根包自身计数上单调 +1（与 changesets 对子包的行为一致）
 * - 非 pre 系列：patch / minor / major 升对应主数字位，pre 计数从 0 起
 * - `preTag` 为 null（正式通道）：剥离 prerelease 后缀（旧版本含后缀时），
 *   否则按类型递增主版本
 *
 * @param oldVersion 根包当前版本（git HEAD）
 * @param type 子包中的最高 bump 类型
 * @param preTag 预发布标签（如 `alpha`）；非 pre 通道为 null
 * @returns 根包同步后的新版本
 */
function bumpVersion (oldVersion: string, type: string, preTag: string | null) {
  let [major, minor, patch] = parseTriple(oldVersion);
  const oldPre = oldVersion.split("-")[1] ?? null;
  const oldCount = getPreCount(oldVersion);
  const oldTag = oldPre ? (oldPre.split(".")[0] ?? null) : null;

  if (preTag === null) {
    if (oldPre !== null) {
      return `${major}.${minor}.${patch}`;
    }
    if (type === "major") {
      major += 1;
      minor = 0;
      patch = 0;
    } else if (type === "minor") {
      minor += 1;
      patch = 0;
    } else {
      patch += 1;
    }

    return `${major}.${minor}.${patch}`;
  }

  const inSameSeries = oldPre !== null && oldTag === preTag && oldCount !== null;
  if (type === "major") {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (type === "minor") {
    minor += 1;
    patch = 0;
  } else if (!inSameSeries) {
    patch += 1;
  }
  const count = inSameSeries ? (oldCount ?? 0) + 1 : 0;

  return `${major}.${minor}.${patch}-${preTag}.${count}`;
}

const rootPackage = JSON.parse(readFileSync("package.json", "utf8"));
const rootOld = readGitVersion("package.json");

let changedType: "major" | "minor" | "patch" | "none" = "none";
let preTag: string | null = null;

for (let i = 0; i < SUB_PACKAGE_NAMES.length; i++) {
  const pkgPath = `${SUB_PACKAGE_DIRS[i]}/package.json`;
  const oldVersion = readGitVersion(pkgPath);
  const newVersion = getVersion(pkgPath);
  if (oldVersion === newVersion) {
    continue;
  }
  const type = bumpType(oldVersion, newVersion);
  if (changedType === "none" || type === "major" || (type === "minor" && changedType === "patch")) {
    changedType = type;
  }
  const tag = newVersion.split("-")[1]?.split(".")[0];
  if (tag) {
    preTag = tag;
  }
}

if (changedType === "none") {
  console.log(`✔ 无子包版本变化，根包保持 ${rootPackage.version}`);
  process.exit(0);
}

const expected = bumpVersion(rootOld, changedType, preTag);

if (rootPackage.version !== expected) {
  rootPackage.version = expected;
  writeFileSync("package.json", `${JSON.stringify(rootPackage, null, 2)}\n`);
  console.log(`✔ 根包版本已同步：${rootOld} -> ${expected}（子包最高 ${changedType}${preTag ? ` / ${preTag}` : ""}）`);
} else if (rootPackage.version !== rootOld) {
  console.log(`✔ 根包版本已同步：${rootOld} -> ${rootPackage.version}`);
} else {
  console.error("❌ 根包版本同步失败：");
  console.error(`   子包已发布（${changedType}${preTag ? ` / ${preTag}` : ""}），`);
  console.error(`   但根包 ${ROOT_PACKAGE} 版本仍为 ${rootPackage.version}（期望 ${expected}）。`);
  console.error("   请检查 scripts/bumpRoot.ts 或发布流程配置。");
  process.exit(1);
}
