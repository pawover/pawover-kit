/**
 * 发布后基线同步脚本（main 发布成功 → 稳定版版本号回推 feature）。
 *
 * 背景：main 正式版通道发布后，feature 的版本基线仍停留在上次 alpha
 * （如 0.9.5-alpha.0），下一轮 alpha bump 会产出 0.9.5-alpha.1，剥离后
 * 撞已发布的 0.9.5 → release:merge 防撞车拦截、正式版发不出。基线同步
 * 把 feature 的 6 个 package.json 版本抬到 main 的稳定值，后续 alpha
 * 才能从 0.9.6-alpha.0 起正确递增。
 *
 * 设计要点：
 *  - 用真实 merge（`git merge origin/main -X theirs`）而非直接改写版本：
 *    冲突时取 main 侧，顺带带回 main 的 .changeset/pre 归档剔除；
 *  - 守卫 1：feature 有待消费 changeset 时跳过（version PR 流程优先，
 *    避免与 changeset-release 分支打架）；
 *  - 守卫 2：main 相对合并基的改动必须仅限版本文件 + pre 归档，
 *    否则说明 main 含 feature 没有的源码变更（异常），跳过并提示手动合并；
 *  - 合并后校验：相对 origin/feature 的差异仍仅限版本文件，否则回滚报错；
 *  - 推送失败不阻断（警告 + 退出 0）：发布已完成，同步是善后动作。
 *
 * 用法：
 *   node scripts/syncBaseline.ts            # 完整执行（合并 + 推送）
 *   node scripts/syncBaseline.ts --no-push  # 仅合并，不推送（本地演练）
 *
 * 退出码：
 *   0 同步完成 / 无需同步 / 守卫跳过（原因已打印）
 *   1 环境异常（非 feature 分支 / 工作区不干净 / 合并异常）
 */

import { execSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { PACKAGE_FILES, VERSION_FILES } from "./packages.ts";

const SYNC_BRANCH = "feature";
const MAIN_BRANCH = "main";

function run (cmd: string, options = {}) {
  return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"], ...options });
}

function git (...args: string[]) {
  return run(`git ${args.map((a) => JSON.stringify(a)).join(" ")}`).trim();
}

function isAncestor (ancestor: string, descendant: string) {
  try {
    run(`git merge-base --is-ancestor ${ancestor} ${descendant}`, { stdio: "ignore" });

    return true;
  } catch {
    return false;
  }
}

function hasMergeInProgress () {
  try {
    run("git rev-parse --verify --quiet MERGE_HEAD", { stdio: "ignore" });

    return true;
  } catch {
    return false;
  }
}

/** 允许随同步进入 feature 的路径：版本文件 + pre 模式归档。 */
function isAllowed (file: string) {
  return VERSION_FILES.has(file) || file.startsWith(".changeset/pre/");
}

/** 根目录待消费 changeset（pre/ 是子目录，天然被 .md 过滤排除）。 */
function pendingChangesets () {
  return readdirSync(".changeset").filter((f) => f.endsWith(".md") && f !== "README.md");
}

/** git config --get 失败（未设置）时返回空串。 */
function gitConfig (name: string) {
  try {
    return run(`git config --get ${name}`).trim();
  } catch {
    return "";
  }
}

function warn (message: string) {
  console.log(`   ⚠ ${message}`);
}

async function main () {
  const noPush = process.argv.includes("--no-push");
  const branch = git("rev-parse", "--abbrev-ref", "HEAD");
  if (branch !== SYNC_BRANCH) {
    throw new Error(`必须在 ${SYNC_BRANCH} 分支运行（当前：${branch}）`);
  }
  const dirty = run("git status --porcelain").trim();
  if (dirty) {
    throw new Error(`工作区不干净，请先提交或暂存改动：\n${dirty}`);
  }
  if (hasMergeInProgress()) {
    throw new Error("检测到未完成的合并，请先 git merge --continue 或 git merge --abort 后重跑");
  }

  console.log("① 拉取远端 refs");
  run("git fetch origin feature main");

  if (pendingChangesets().length > 0) {
    warn(`feature 存在待消费 changeset（${pendingChangesets().join(", ")}），跳过基线同步（version PR 流程优先）`);

    return;
  }

  const base = git("merge-base", `origin/${SYNC_BRANCH}`, `origin/${MAIN_BRANCH}`);
  const mainChanged = run(`git diff --name-only ${base} origin/${MAIN_BRANCH}`)
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);
  const unexpected = mainChanged.filter((f) => !isAllowed(f));
  if (unexpected.length > 0) {
    warn(
      `main 相对合并基含 feature 没有的变更（${unexpected.join(", ")}），`
      + `跳过自动基线同步，请手动 git merge origin/${MAIN_BRANCH} 后重跑`,
    );

    return;
  }

  console.log("② 合并 origin/main（冲突取 main 侧稳定版本）");
  if (isAncestor(`origin/${MAIN_BRANCH}`, "HEAD")) {
    console.log("   ✔ 基线已是最新，无需同步");

    return;
  }
  if (!gitConfig("user.name") || !gitConfig("user.email")) {
    run("git config user.name \"github-actions[bot]\"");
    run("git config user.email \"41898282+github-actions[bot]@users.noreply.github.com\"");
  }
  try {
    git("merge", `origin/${MAIN_BRANCH}`, "--no-edit", "-X", "theirs");
  } catch (err) {
    if (hasMergeInProgress()) {
      run("git merge --abort", { stdio: "ignore" });
    }
    throw new Error(`合并 origin/${MAIN_BRANCH} 失败（已回滚）：${String((err as any).stderr ?? (err as any).message).trim().slice(0, 300)}`);
  }

  console.log("③ 校验合并结果（相对 origin/feature 应仅版本文件 + pre 归档）");
  const mergedChanged = run(`git diff --name-only origin/${SYNC_BRANCH} HEAD`)
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);
  const mergedUnexpected = mergedChanged.filter((f) => !isAllowed(f));
  if (mergedUnexpected.length > 0) {
    run(`git reset --hard origin/${SYNC_BRANCH}`, { stdio: "ignore" });
    throw new Error(
      `合并结果含预期外变更（${mergedUnexpected.join(", ")}），已回滚。请人工审查后手动合并`,
    );
  }
  for (const file of PACKAGE_FILES) {
    const { name, version } = JSON.parse(run(`git show HEAD:${file}`));
    console.log(`   ✔ ${name}: ${version}`);
  }

  if (noPush) {
    console.log("④ 跳过推送（--no-push）");

    return;
  }
  console.log(`④ 推送 origin/${SYNC_BRANCH}`);
  try {
    git("push", "origin", SYNC_BRANCH);
    console.log("   ✔ 基线同步完成（main 稳定版本已回推 feature）");
  } catch (err) {
    warn(
      `推送失败：${String((err as any).stderr ?? (err as any).message).trim().slice(0, 200)}。`
      + `请手动运行 git push origin ${SYNC_BRANCH}（或按文档手动基线同步）`,
    );
  }
}

main().catch((err) => {
  console.error(`\n❌ ${err.message}`);
  process.exit(1);
});
