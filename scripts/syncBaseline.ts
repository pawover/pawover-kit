/**
 * 发布后把稳定版版本号同步回 feature 的脚本（main 正式版发布成功后运行）。
 *
 * 背景：main 正式版发布后，feature 的版本号仍停在上一轮 alpha
 * （如 0.9.5-alpha.0）。下一轮 alpha 递增会产出 0.9.5-alpha.1，还原成正式版后
 * 与已发布的 0.9.5 重复，正式版合并会因版本已存在被拦下、发不出去。本脚本
 * 把 feature 的 PACKAGE_FILES 中 `version` 字段改写为 main 的稳定版值，后续
 * alpha 才能从 0.9.6-alpha.0 起正确递增。
 *
 * 设计要点：
 *  - 只 patch `version` 字段：feature 侧新增的依赖、script 等字段原样保留，
 *    CHANGELOG 保持 feature 的 alpha 记录，依赖与 pnpm-lock.yaml 不变；
 *  - 不合并整分支，main 上的工具、文档与 CI 改动不会进入 feature；
 *  - origin/main 没有 .changeset/pre/ 时删除 feature 的预发布归档；
 *  - main 的 version 不是非空字符串或不是合法版本号、或 feature 版本基数已高于
 *    main 时跳过该文件并告警，避免写入非法值或回退版本后重复 alpha；
 *  - 前置检查：feature 有待消费 changeset 时跳过（版本 PR 流程优先）；
 *  - 同步后校验改动仅限 PACKAGE_FILES + .changeset/pre/，否则回滚（含未跟踪文件，
 *    路径按 `git status -z` 解析以支持空格与非 ASCII 文件名）；
 *  - 无版本改动但本地有未推送提交时仍推送；
 *  - 推送失败不阻断（警告 + 退出 0）：发布已完成，同步只是收尾动作。
 *
 * 用法：
 *   node scripts/syncBaseline.ts            # 完整执行（同步 + 提交 + 推送）
 *   node scripts/syncBaseline.ts --no-push  # 仅同步并提交，不推送（本地演练）
 *
 * 退出码：
 *   0 同步完成 / 已是最新 / 前置检查跳过（原因已打印）
 *   1 环境异常（非 feature 分支 / 工作区不干净 / 未完成合并 / 预期外改动）
 */

import { execSync } from "node:child_process";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { PACKAGE_FILES } from "./packages.ts";

const SYNC_BRANCH = "feature";
const MAIN_BRANCH = "main";
const PRE_ARCHIVE_DIR = ".changeset/pre";
const PRE_ARCHIVE_PREFIX = `${PRE_ARCHIVE_DIR}/`;
const COMMIT_MESSAGE = "chore: sync stable versions from main";
const BOT_IDENTITY = [
  "-c",
  "user.name=github-actions[bot]",
  "-c",
  "user.email=41898282+github-actions[bot]@users.noreply.github.com",
];

function run (cmd: string, options = {}) {
  return execSync(cmd, {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
    ...options,
  });
}

function git (...args: string[]) {
  return run(`git ${args.map((a) => JSON.stringify(a)).join(" ")}`).trim();
}

function hasMergeInProgress () {
  try {
    run("git rev-parse --verify --quiet MERGE_HEAD", { stdio: "ignore" });

    return true;
  } catch {
    return false;
  }
}

/** 根目录待消费 changeset（pre/ 是子目录，天然被 .md 过滤排除）。 */
function pendingChangesets () {
  return readdirSync(".changeset").filter((f) => f.endsWith(".md") && f !== "README.md");
}

function warn (message: string) {
  console.log(`   ⚠ ${message}`);
}

/**
 * 解析 `git status --porcelain -z` 的条目：NUL 分隔、路径不做 C 风格引号转义。
 * rename/copy 条目的下一个 NUL 段是原路径。
 */
export interface StatusEntry {
  code: string;
  path: string;
  originalPath?: string;
}

export function parseStatusEntries (status: string): StatusEntry[] {
  const tokens = status.split("\0");
  const entries: StatusEntry[] = [];

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];

    if (token === undefined || token.length === 0) {
      continue;
    }

    const code = token.slice(0, 2);
    const entry: StatusEntry = {
      code,
      path: token.slice(3),
    };

    if (code.includes("R") || code.includes("C")) {
      const originalPath = tokens[index + 1];
      if (originalPath !== undefined && originalPath.length > 0) {
        entry.originalPath = originalPath;
        index += 1;
      }
    }

    entries.push(entry);
  }

  return entries;
}

/** 解析 `git status --porcelain -z` 的全部路径，rename/copy 同时返回新旧路径。 */
export function parseStatusPaths (status: string): string[] {
  return parseStatusEntries(status).flatMap((entry) => (entry.originalPath === undefined
    ? [entry.path]
    : [entry.path, entry.originalPath]));
}

/** 列出未跟踪路径，回滚时需要显式清理（`git reset --hard` 不会删除它们）。 */
export function untrackedPaths (status: string): string[] {
  return parseStatusEntries(status)
    .filter((entry) => entry.code === "??")
    .map((entry) => entry.path);
}

/** 稳定版基线同步允许出现的路径：包清单版本文件 + 预发布归档。 */
export function isBaselinePath (file: string): boolean {
  return PACKAGE_FILES.includes(file) || file.startsWith(PRE_ARCHIVE_PREFIX);
}

function mainHasFile (file: string) {
  try {
    run(`git cat-file -e ${JSON.stringify(`origin/${MAIN_BRANCH}:${file}`)}`, { stdio: "ignore" });

    return true;
  } catch {
    return false;
  }
}

function mainHasPreArchive () {
  return git("ls-tree", "-d", "--name-only", `origin/${MAIN_BRANCH}`, PRE_ARCHIVE_DIR).length > 0;
}

function parseVersion (version: unknown): [number, number, number] | null {
  if (typeof version !== "string") {
    return null;
  }

  const match = /^(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(version);

  if (!match) {
    return null;
  }

  return [
    Number(match[1]),
    Number(match[2]),
    Number(match[3]),
  ];
}

/** feature 的版本基数高于 main 稳定版时回退会造成 alpha 版本号重复。 */
function isVersionAhead (currentVersion: unknown, mainVersion: string): boolean {
  const current = parseVersion(currentVersion);
  const main = parseVersion(mainVersion);

  if (!current || !main) {
    return false;
  }

  const [currentMajor, currentMinor, currentPatch] = current;
  const [mainMajor, mainMinor, mainPatch] = main;

  if (currentMajor !== mainMajor) {
    return currentMajor > mainMajor;
  }
  if (currentMinor !== mainMinor) {
    return currentMinor > mainMinor;
  }

  return currentPatch > mainPatch;
}

export type PackageVersionPatch =
  | { status: "patched"; content: string; name: string; version: string }
  | { status: "unchanged" }
  | { status: "skipped"; reason: string };

/**
 * 只改写 `version`，保留其余字段与键序，输出统一为 `JSON.stringify(2)` + 换行。
 * main 的 version 不是非空字符串或不是合法版本号、或 feature 版本已领先时返回
 * skipped，由调用方跳过该文件。
 */
export function patchPackageVersion (content: string, mainVersion: unknown): PackageVersionPatch {
  if (typeof mainVersion !== "string" || mainVersion.length === 0) {
    return { status: "skipped", reason: "origin/main 的 version 不是非空字符串" };
  }
  if (parseVersion(mainVersion) === null) {
    return { status: "skipped", reason: `origin/main 的 version ${mainVersion} 不是合法版本号` };
  }

  const pkg = JSON.parse(content);

  if (pkg.version === mainVersion) {
    return { status: "unchanged" };
  }

  if (isVersionAhead(pkg.version, mainVersion)) {
    return {
      status: "skipped",
      reason: `feature 版本 ${pkg.version} 高于 main 的 ${mainVersion}，跳过以避免回退版本`,
    };
  }

  pkg.version = mainVersion;

  return {
    status: "patched",
    content: `${JSON.stringify(pkg, null, 2)}\n`,
    name: pkg.name,
    version: mainVersion,
  };
}

function syncPackageVersion (file: string): { name: string; version: string } | null {
  const mainVersion = JSON.parse(run(`git show ${JSON.stringify(`origin/${MAIN_BRANCH}:${file}`)}`)).version;
  const result = patchPackageVersion(readFileSync(file, "utf8"), mainVersion);

  if (result.status === "skipped") {
    warn(`${file}: ${result.reason}`);

    return null;
  }
  if (result.status === "unchanged") {
    return null;
  }

  writeFileSync(file, result.content);

  return { name: result.name, version: result.version };
}

function rollback (untracked: string[]) {
  if (untracked.length > 0) {
    git("clean", "-fdq", "--", ...untracked);
  }
  run("git reset --hard HEAD", { stdio: "ignore" });
}

function hasUnpushedCommits () {
  return git("rev-list", `origin/${SYNC_BRANCH}..HEAD`).length > 0;
}

function push () {
  console.log(`⑤ 推送 origin/${SYNC_BRANCH}`);
  try {
    git("push", "origin", SYNC_BRANCH);
    console.log("   ✔ 同步完成（main 的稳定版版本号已同步回 feature）");
  } catch (err) {
    warn(
      `推送失败：${String((err as any).stderr || (err as any).message).trim().slice(0, 200)}。`
      + `请手动运行 git push origin ${SYNC_BRANCH}（或按文档手动同步版本号）`,
    );
  }
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

  console.log("① 获取远端最新分支");
  run(`git fetch origin ${SYNC_BRANCH} ${MAIN_BRANCH}`);

  const pending = pendingChangesets();
  if (pending.length > 0) {
    warn(`feature 存在待消费 changeset（${pending.join(", ")}），跳过稳定版版本号同步（版本 PR 流程优先）`);

    return;
  }

  console.log(`② 将 ${PACKAGE_FILES.length} 个 package.json 的 version 对齐到 origin/${MAIN_BRANCH}`);
  const synced: { name: string; version: string }[] = [];
  for (const file of PACKAGE_FILES) {
    if (!mainHasFile(file)) {
      continue;
    }
    const result = syncPackageVersion(file);
    if (result) {
      synced.push(result);
    }
  }

  console.log("③ 对齐预发布归档");
  if (!mainHasPreArchive() && git("ls-files", PRE_ARCHIVE_DIR).length > 0) {
    git("rm", "-r", "-q", PRE_ARCHIVE_DIR);
    console.log(`   ✔ 已移除 ${PRE_ARCHIVE_DIR}/（main 无预发布归档）`);
  }

  console.log("④ 校验同步结果");
  const status = run("git status --porcelain -z");
  const changed = parseStatusPaths(status);
  const unexpected = changed.filter((file) => !isBaselinePath(file));
  if (unexpected.length > 0) {
    rollback(untrackedPaths(status));
    throw new Error(
      `同步结果含预期外变更（${unexpected.join(", ")}），已回滚。请人工检查后手动同步版本号`,
    );
  }
  if (changed.length > 0) {
    try {
      run("git add -A");
      git(...BOT_IDENTITY, "commit", "-m", COMMIT_MESSAGE);
    } catch (err) {
      rollback(untrackedPaths(run("git status --porcelain -z")));
      throw new Error(
        `同步提交失败（已回滚）：${String((err as any).stderr || (err as any).message).trim().slice(0, 300)}`,
        { cause: err },
      );
    }
    for (const { name, version } of synced) {
      console.log(`   ✔ ${name}: ${version}`);
    }
  } else {
    console.log("   ✔ 已是最新稳定版基线");
  }

  const shouldPush = changed.length > 0 || hasUnpushedCommits();
  if (!shouldPush) {
    console.log("   ✔ 无待推送提交");

    return;
  }
  if (noPush) {
    console.log("⑤ 跳过推送（--no-push）");

    return;
  }
  push();
}

const isEntryPoint = process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isEntryPoint) {
  main().catch((err) => {
    console.error(`\n❌ ${err.message}`);
    process.exit(1);
  });
}
