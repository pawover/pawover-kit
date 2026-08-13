import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * 发布合并脚本（feature → main 正式版发布入口）：
 * 在 feature 分支上运行，完成发布合并的所有准备动作并自动打开 PR。
 *
 * 流程：
 *  1. 前置校验：当前分支为 feature、工作区干净、origin/main 已同步；
 *  2. `git merge origin/main`（冲突时退出，手动解决后重跑本脚本续跑）；
 *  3. 剔除 `.changeset/pre/` 归档（v3.0.0 的 pre 模式 version 产生的消费归档，防止污染 main 的 changeset 判定）；
 *  4. 剥离各包版本号的 prerelease 后缀（0.0.2-alpha.0 → 0.0.2，含根包）；
 *  5. 防撞车校验：剥离后的版本若已发布到 npm 则报错停止（防静默失败）；
 *  6. 清理远端旧 release-main 分支并推送新的 release-main；
 *  7. 自动创建 PR（release-main → main），输出 PR 链接；
 *  8. 不启用 auto-merge —— 人工合并 PR 是正式版发布的人工确认节点。
 *
 * 用法：
 *   pnpm release:merge
 *
 * 退出码：
 *  0 成功（PR 已创建）
 *  1 前置校验失败 / 合并冲突 / 版本撞车 / 网络或 API 错误
 */
const SUB_PACKAGES = [
  ["eslint-rules", "@pawover/kit-eslint-rules"],
  ["hooks", "@pawover/kit-hooks"],
  ["types", "@pawover/kit-types"],
  ["utils", "@pawover/kit-utils"],
  ["zod", "@pawover/kit-zod"],
];
const PACKAGE_FILES = ["package.json", ...SUB_PACKAGES.map(([dir]) => `packages/${dir}/package.json`)];
const HEAD_BRANCH = "release-main";

function run(cmd, options = {}) {
  return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"], ...options });
}

function git(...args) {
  return run(`git ${args.map((a) => JSON.stringify(a)).join(" ")}`).trim();
}

function hasMergeInProgress() {
  try {
    run("git rev-parse --verify --quiet MERGE_HEAD", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function getToken() {
  if (process.env.GH_TOKEN) return process.env.GH_TOKEN;
  const out = run("git credential fill", { input: "protocol=https\nhost=github.com\n\n" });
  const match = out.match(/^password=(.+)$/m);
  if (!match) throw new Error("git credential 未返回 password，请设置 GH_TOKEN 环境变量");
  return match[1].trim();
}

async function api(method, url, body) {
  const token = getToken();
  const res = await fetch(`https://api.github.com${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "pawover-kit-release-merge",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`GitHub API ${method} ${url} -> ${res.status}: ${text.slice(0, 300)}`);
  }
  return text ? JSON.parse(text) : null;
}

function versionOf(file) {
  return JSON.parse(readFileSync(file, "utf8")).version;
}

async function main() {
  const branch = git("rev-parse", "--abbrev-ref", "HEAD");
  if (branch !== "feature") {
    throw new Error(`必须在 feature 分支运行（当前：${branch}）`);
  }
  const dirty = run("git status --porcelain").trim();
  if (dirty) {
    throw new Error(`工作区不干净，请先提交或暂存改动：\n${dirty}`);
  }
  if (hasMergeInProgress()) {
    throw new Error("检测到未完成的合并，请先 git merge --continue 或 git merge --abort 后重跑");
  }

  console.log("① 同步 origin/main 并合并（冲突时版本号取 feature 侧）");
  run("git fetch origin");
  try {
    git("merge", "origin/main", "--no-edit");
  } catch (err) {
    if (hasMergeInProgress()) {
      throw new Error(
        "合并存在冲突：请手动解决（版本号保留 feature 侧），完成后 git add 全部文件并 git merge --continue，再重跑 pnpm release:merge",
      );
    }
    throw err;
  }
  console.log("   ✔ 合并完成");

  console.log("② 剔除 pre 模式归档并剥离 prerelease 后缀");
  const preDir = path.join(".changeset", "pre");
  if (existsSync(preDir)) {
    run(`git rm -r -q ${preDir}`);
    console.log("   ✔ 已剔除 .changeset/pre/ 归档（避免污染 main 的 changeset 判定）");
  }
  const stripped = [];
  for (const file of PACKAGE_FILES) {
    const pkg = JSON.parse(readFileSync(file, "utf8"));
    const mainVersion = pkg.version.split("-")[0];
    if (pkg.version !== mainVersion) {
      pkg.version = mainVersion;
      writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
      stripped.push(`${pkg.name}: ${pkg.version} -> ${mainVersion}`);
    }
  }
  for (const line of stripped) console.log(`   ✔ ${line}`);
  if (stripped.length === 0) console.log("   ✔ 无 prerelease 版本");

  console.log("③ 防撞车校验（剥离后版本不得已存在于 npm）");
  const all = [
    ["package.json", "@pawover/kit"],
    ...SUB_PACKAGES.map(([dir, name]) => [`packages/${dir}/package.json`, name]),
  ];
  for (const [file, name] of all) {
    const version = versionOf(file);
    let exists = false;
    try {
      run(`npm view ${name}@${version} version`, { stdio: "ignore" });
      exists = true;
    } catch {
      /* not found */
    }
    if (exists) {
      throw new Error(
        `版本撞车：${name}@${version} 已发布。请先执行基线同步（merge main 取 main 侧）后重试`,
      );
    }
  }
  console.log("   ✔ 版本均未发布");

  console.log("④ 清理旧 release-main 并推送新分支");
  try {
    run(`git branch -D ${HEAD_BRANCH}`, { stdio: "ignore" });
  } catch {
    /* 本地无此分支 */
  }
  try {
    const remoteHas = run(`git ls-remote --heads origin ${HEAD_BRANCH}`).trim() !== "";
    if (remoteHas) run(`git push origin --delete ${HEAD_BRANCH}`);
  } catch {
    /* 远端无此分支 */
  }
  git("switch", "-c", HEAD_BRANCH);
  run(`git push -u origin ${HEAD_BRANCH}`);
  console.log("   ✔ release-main 已推送");

  console.log("⑤ 创建发布合并 PR（人工合并 = 正式版发布确认节点）");
  const rootVersion = versionOf("package.json");
  const title = `chore: 发布合并 feature（${rootVersion}）`;
  const body =
    "发布合并 PR：将 feature 最新代码与稳定版本号合入 main，合并后自动发布 latest。\n\n" +
    "**此 PR 不启用 auto-merge，需人工审查版本号后手动合并。**";
  const repoUrl = git("config", "--get", "remote.origin.url");
  const repo = repoUrl.replace(/\.git$/, "").replace(/^.*github\.com[:\/]/, "");
  const pr = await api("POST", `/repos/${repo}/pulls`, {
    title,
    head: HEAD_BRANCH,
    base: "main",
    body,
  });
  console.log(`   ✔ PR #${pr.number} 已创建：${pr.html_url}`);
  console.log(`   → 请人工审查版本号后合并（合并后自动发布 latest 正式版）`);
}

main().catch((err) => {
  console.error(`\n❌ ${err.message}`);
  process.exit(1);
});
