/**
 * 发布计划守卫（tag 感知版）：
 * 在 CI push 时运行，校验「子包有源码变更 ⇒ 必须有待消费 changeset」，
 * 并对以下情况豁免：
 *  - 存在匹配 git tag（当前版本已发布）；
 *  - 变更仅涉及版本文件（version 通道的 bump 提交 / release:merge 的剥离提交，
 *    属发布流程自身产物，不要求 changeset）。
 *
 * 场景：
 *  - 有待消费 changeset → `changeset status` 通过即放行；
 *  - 仅版本文件变更（package.json / CHANGELOG.md / .changeset/**）→ 放行，
 *    否则 bump 提交会把 CI 拦红、进而被 release.yml 的 gate 挡住发布（死锁）；
 *  - 源码变更 + 存在匹配 tag（已发布）→ 放行（alpha 发布完成后的后续开发）；
 *  - 源码变更 + 无 tag → 拦截（开发改动没有 changeset）。
 *
 * 用法（在 ci.yml 的 push 事件步骤中）：
 *   node scripts/verifyReleasePlan.ts
 *
 * 退出码：
 *   0 计划合法（存在待消费 changeset，或仅版本文件变更，或变更子包均已发布）
 *   1 存在子包源码变更但没有 changeset，且当前版本未发布
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { SUB_PACKAGES, VERSION_FILES } from "./packages.ts";

function mergeBase () {
  try {
    return execSync("git merge-base main HEAD", { encoding: "utf8" }).trim();
  } catch {
    return execSync("git merge-base refs/remotes/origin/main HEAD", { encoding: "utf8" }).trim();
  }
}

/**
 * 根目录待消费 changeset（排除 pre/ 归档与说明文件）。
 * v3.0.0 的 pre 模式 version 会把消费的 changeset 移动到 .changeset/pre/，
 * 这些归档不应被当作待消费 changeset，否则 status 会被归档撑起、守卫失效。
 */
function pendingChangesets () {
  if (!existsSync(".changeset")) {
    return [];
  }

  return readdirSync(".changeset").filter((file) => file.endsWith(".md") && file !== "README.md");
}

if (pendingChangesets().length > 0) {
  try {
    execSync("pnpm changeset status --output=.changeset/status.json", { stdio: "inherit" });
    console.log("✔ 发布计划校验通过（存在待消费 changeset）");
    process.exit(0);
  } catch {
    // 根目录有 changeset 但 status 失败，走已发布版本豁免逻辑
  }
} else {
  console.log("✔ 无待消费 changeset（忽略 .changeset/pre/ 归档），走豁免逻辑");
}

const base = mergeBase();
const changedFiles = execSync(`git diff --name-only ${base} HEAD`, { encoding: "utf8" })
  .split("\n")
  .map((file) => file.trim())
  .filter(Boolean);

const changedSubs = SUB_PACKAGES.filter(([dir]) => {
  return changedFiles.some(
    (file) => file.startsWith(`packages/${dir}/`) && !VERSION_FILES.has(file),
  );
});

// version 通道产物指纹：changeset 已被消费（新增 .changeset/pre/ 归档
// 或删除 .changeset/*.md）或 .changeset 目录有删除。bump 提交（含此前
// 已配 changeset 的源码变更）是 version 通道的合法产物，必须放行——
// 否则 bump 提交合并后 CI 被拦红、publish 永远无法触发（死锁）。
const changedStatuses = execSync(`git diff --name-status ${base} HEAD`, { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);
const changesetConsumed = changedStatuses.some((line) => {
  const [status, file] = line.split("\t");
  if (!file || !file.startsWith(".changeset/")) {
    return false;
  }

  return status?.startsWith("D") || file?.startsWith(".changeset/pre/");
});

// 无子包源码变更 → 放行。覆盖三类提交：
//  - version 通道的 bump 提交（仅 package.json / CHANGELOG / .changeset）；
//  - release:merge 的剥离提交（版本文件 + .changeset/pre 删除）；
//  - 根目录 / scripts / CI 配置等非子包改动（不触发子包发版，无需 changeset）。
// changeset 已被消费（version 通道产物）→ 源码变更随 bump 一起放行。
if (changedSubs.length === 0 || changesetConsumed) {
  console.log(
    changedSubs.length === 0
      ? "✔ 发布计划校验通过（无子包源码变更，直接放行）"
      : "✔ 发布计划校验通过（changeset 已被 version 通道消费，bump 提交放行）",
  );
  process.exit(0);
}

const unreleased = [];
for (const [dir, name] of changedSubs) {
  const { version } = JSON.parse(readFileSync(path.join("packages", dir, "package.json"), "utf8"));
  const tag = `${name}@${version}`;
  if (execSync(`git tag -l "${tag}"`, { encoding: "utf8" }).trim() !== tag) {
    unreleased.push({ dir, version });
  }
}

if (unreleased.length === 0) {
  const detail = changedSubs.map(([, name]) => name).join(", ") || "无";
  console.log(`✔ 发布计划校验通过（变更子包均已发布：${detail}）`);
  process.exit(0);
}

console.error("❌ 发布计划校验失败：");
console.error("   以下子包存在源码变更但没有待消费 changeset，且当前版本尚未发布：");
for (const { dir, version } of unreleased) {
  console.error(`   - packages/${dir}（${version}）`);
}
console.error("   请运行 pnpm changeset add 添加 changeset（或 changeset add --empty 声明无需发版）。");
process.exit(1);
