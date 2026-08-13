import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * 发布计划守卫（tag 感知版）：
 * 在 CI push 时运行，校验「子包有变更 ⇒ 必须有待消费 changeset」，
 * 但对「已发布（存在匹配 git tag）」的版本豁免。
 *
 * alpha 通道（feature 分支）的版本号递增由 version 通道提交，其后
 * feature 上暂无待消费 changeset 属于正常状态，不应让 CI 变红；
 * 而开发改动没有 changeset 仍会被拦截。
 *
 * 流程：
 *  1. 先跑 `changeset status --output=.changeset/status.json`；
 *  2. 成功则直接退出（有待消费 changeset，计划合法）；
 *  3. 失败则收集自 main 分叉点以来变更的子包，凡当前版本存在
 *     `<pkg>@<version>` tag 的视为已发布并豁免，全部豁免则放行，
 *     否则报错。
 *
 * 用法（在 ci.yml 的 push 事件步骤中）：
 *   node scripts/verify-release-plan.mjs
 *
 * 退出码：
 *   0 计划合法（存在待消费 changeset，或变更子包均已发布）
 *   1 存在子包变更但没有 changeset，且当前版本未发布
 */
const SUB_PACKAGES = [
  ["eslint-rules", "@pawover/kit-eslint-rules"],
  ["hooks", "@pawover/kit-hooks"],
  ["types", "@pawover/kit-types"],
  ["utils", "@pawover/kit-utils"],
  ["zod", "@pawover/kit-zod"],
];

function mergeBase() {
  try {
    return execSync("git merge-base main HEAD", { encoding: "utf8" }).trim();
  } catch {
    return execSync("git merge-base refs/remotes/origin/main HEAD", { encoding: "utf8" }).trim();
  }
}

try {
  execSync("pnpm changeset status --output=.changeset/status.json", { stdio: "inherit" });
  console.log("✔ 发布计划校验通过（存在待消费 changeset）");
  process.exit(0);
} catch {
  // 无待消费 changeset，走已发布版本豁免逻辑
}

const base = mergeBase();
const changedFiles = execSync(`git diff --name-only ${base} HEAD`, { encoding: "utf8" })
  .split("\n")
  .map((file) => file.trim())
  .filter(Boolean);

const changedSubs = SUB_PACKAGES.filter(([dir]) => {
  return changedFiles.some(
    (file) => file === `packages/${dir}/package.json` || file === `packages/${dir}/CHANGELOG.md`,
  );
});

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
console.error("   以下子包存在变更但没有待消费 changeset，且当前版本尚未发布：");
for (const { dir, version } of unreleased) console.error(`   - packages/${dir}（${version}）`);
console.error("   请运行 pnpm changeset add 添加 changeset（或 changeset add --empty 声明无需发版）。");
process.exit(1);
