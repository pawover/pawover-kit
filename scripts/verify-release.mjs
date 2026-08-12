import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

/**
 * 发布顺序复核脚本：
 * 在 version 通道（changesets/action/version 的 version-script 执行后）运行，
 * 复核「子包版本变化 ⇒ 根包必变」规则，防止 ci:version 被改坏后根包漏发。
 *
 * changesets 的包列表不包含根包（getPackages 将根包单独放在 rootPackage），
 * 根包无法进入 changesets 的 releases；根包版本由 scripts/bump-root.mjs 在
 * `changeset version` 之后同步递增。本脚本对比 git HEAD 与工作区的版本：
 * 若任一子包版本变化而根包版本未变，则校验失败。
 *
 * 用法（在 version 通道的 version action 之后运行）：
 *   node scripts/verify-release.mjs
 *
 * 退出码：
 *   0 校验通过（或无子包版本变化）
 *   1 子包版本变化但根包版本未变
 */
const SUB_PACKAGE_PATHS = [
  "packages/eslint-rules",
  "packages/hooks",
  "packages/types",
  "packages/utils",
  "packages/zod",
];

function gitShowVersion(pkgPath) {
  const out = execSync(`git show HEAD:${pkgPath}`, { encoding: "utf8" });
  return JSON.parse(out).version;
}

function worktreeVersion(pkgPath) {
  return JSON.parse(readFileSync(pkgPath, "utf8")).version;
}

const rootOld = gitShowVersion("package.json");
const rootNew = worktreeVersion("package.json");
const changedSubs = SUB_PACKAGE_PATHS.filter((pkgPath) => {
  const file = `${pkgPath}/package.json`;
  return gitShowVersion(file) !== worktreeVersion(file);
});

if (changedSubs.length > 0 && rootOld === rootNew) {
  console.error(`❌ 发布顺序校验失败：`);
  console.error(`   子包版本已变化：${changedSubs.join(", ")}`);
  console.error(`   但根包 @pawover/kit 版本未变化（仍为 ${rootNew}）。`);
  console.error(`   根包直接依赖全部子包（workspace:*），子包发布时根包必须同步发布。`);
  console.error(`   请检查 scripts/bump-root.mjs 与 ci:version 配置。`);
  process.exit(1);
}

const detail = changedSubs.length === 0
  ? "本次无子包版本变化"
  : `子包版本变化：${changedSubs.join(", ")}，根包同步为 ${rootNew}`;
console.log(`✔ 发布顺序校验通过（${detail}）`);
