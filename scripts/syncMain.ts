/**
 * 普通同步脚本（feature → main 非发布同步入口）：
 * 在 feature 分支上运行，把 feature 内容（文档等非发布改动）同步到 main 并自动打开 PR。
 *
 * 与 `pnpm release:merge`（发布合并）的区别：
 *  - 不剥离 prerelease、不做防撞车校验——版本号整体还原为 origin/main 侧，
 *    保证 main 版本不变、不触发发布通道；
 *  - 分支名为 sync-main，可与 release-main 的发布 PR 并存；
 *  - 同样的前置校验（feature 分支 / 工作区干净 / 无未消费 changeset），
 *    并剔除 `.changeset/pre/` 归档，防止污染 main 的 changeset 判定。
 *
 * 流程：
 *  1. 前置校验（同 releaseMerge）；
 *  2. `git merge origin/main`（冲突时退出，手动解决后重跑本脚本续跑）；
 *  3. 剔除 `.changeset/pre/` 归档；
 *  4. 还原 PACKAGE_FILES 版本号为 origin/main 侧（feature 的 alpha 版本不进入 main）；
 *  5. 切到 sync-main 分支并提交同步变更（feature 保持原状）；
 *  6. 清理远端旧 sync-main 并推送；
 *  7. 自动创建 PR（sync-main → main，已存在 open PR 时跳过），输出 PR 链接；
 *  8. 不启用 auto-merge —— 人工合并 PR；
 *  9. 收尾：切回 feature 并删除本地 sync-main（远端保留至 PR 合并后自动删除）。
 *
 * 用法：
 *   pnpm sync:main
 *
 * 退出码：
 *  0 成功（PR 已创建或已存在）
 *  1 前置校验失败 / 合并冲突 / 网络或 API 错误
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { PACKAGE_FILES } from "./packages.ts";

const HEAD_BRANCH = "sync-main";

function isAncestor (ancestor: string, descendant: string) {
  try {
    run(`git merge-base --is-ancestor ${ancestor} ${descendant}`, { stdio: "ignore" });

    return true;
  } catch {
    return false;
  }
}

function run (cmd: string, options = {}) {
  return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"], ...options });
}

function git (...args: unknown[]) {
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

function getToken () {
  if (process.env["GH_TOKEN"]) {
    return process.env["GH_TOKEN"];
  }
  const out = run("git credential fill", { input: "protocol=https\nhost=github.com\n\n" });
  const match = out.match(/^password=(.+)$/m);
  if (!match) {
    throw new Error("git credential 未返回 password，请设置 GH_TOKEN 环境变量");
  }

  return match[1]!.trim();
}

async function api (method: string, url: string, body?: unknown) {
  const token = getToken();
  const res = await fetch(`https://api.github.com${url}`, {
    method,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github+json",
      "User-Agent": "pawover-kit-sync-main",
      "Content-Type": "application/json",
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`GitHub API ${method} ${url} -> ${res.status}: ${text.slice(0, 300)}`);
  }

  return text ? JSON.parse(text) : null;
}

async function main () {
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
  run("git fetch origin");
  const localHead = git("rev-parse", "HEAD");
  const remoteHead = run("git ls-remote --heads origin refs/heads/feature").trim().split(/\s+/)[0] ?? "";
  if (localHead !== remoteHead) {
    if (isAncestor(remoteHead, localHead)) {
      console.log(`   ⚠ 本地 feature（${localHead.slice(0, 7)}）领先 origin/feature（${remoteHead.slice(0, 7)}），`
        + "放行续跑（领先提交将随 sync-main 推送，feature 请稍后 push）");
    } else if (isAncestor(localHead, remoteHead)) {
      throw new Error(
        `本地 feature（${localHead.slice(0, 7)}）落后于 origin/feature（${remoteHead.slice(0, 7)}），`
        + "请先 git pull --rebase origin feature 后再运行",
      );
    } else {
      throw new Error(
        `本地 feature（${localHead.slice(0, 7)}）与 origin/feature（${remoteHead.slice(0, 7)}）已分叉，`
        + "请先 git pull --rebase origin feature 后再运行",
      );
    }
  }
  const pending = readdirSync(".changeset").filter((f) => f.endsWith(".md") && f !== "README.md");
  if (pending.length > 0) {
    throw new Error(
      `存在未消费 changeset：${pending.join(", ")}。同步前必须消费（走 version 通道）`
      + "或删除，否则会污染 main 的 changeset 判定并触发幽灵 version PR",
    );
  }
  const existingReleasePr = await api(
    "GET",
    `/repos/${repoOf()}/pulls?state=open&head=${repoOf().split("/")[0]}:release-main&base=main`,
  ).catch(() => []);
  if (existingReleasePr.length > 0) {
    console.log(
      `   ⚠ 存在 open 发布合并 PR #${existingReleasePr[0].number}：${existingReleasePr[0].html_url}`,
      "\n    同步内容与发布合并内容将同时在 main 上生效，请确认两者不冲突。",
    );
  }

  console.log("① 同步 origin/main 并合并（冲突时版本号还原为 main 侧）");
  run("git fetch origin");
  try {
    git("merge", "origin/main", "--no-edit");
  } catch (err) {
    if (hasMergeInProgress()) {
      throw new Error(
        "合并存在冲突：请手动解决（版本号可任取，第③步会还原为 main 侧），完成后 git add 全部文件并 git merge --continue，再重跑 pnpm sync:main",
      );
    }
    throw err;
  }
  console.log("   ✔ 合并完成");

  console.log("② 剔除 pre 模式归档");
  const preDir = path.join(".changeset", "pre");
  if (existsSync(preDir)) {
    run(`git rm -r -q ${preDir}`);
    console.log("   ✔ 已剔除 .changeset/pre/ 归档（避免污染 main 的 changeset 判定）");
  }

  console.log("③ 还原版本号为 origin/main 侧（feature 的 prerelease 版本不进入 main）");
  const restored = [];
  for (const file of PACKAGE_FILES) {
    const mainVersion = JSON.parse(run(`git show origin/main:${file}`)).version;
    const pkg = JSON.parse(readFileSync(file, "utf8"));
    if (pkg.version !== mainVersion) {
      pkg.version = mainVersion;
      writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
      restored.push({ name: pkg.name, version: mainVersion });
    }
  }
  for (const { name, version } of restored) {
    console.log(`   ✔ ${name}: 还原为 ${version}`);
  }
  if (restored.length === 0) {
    console.log("   ✔ 版本号与 main 一致，无需还原");
  }

  console.log("④ 切到 sync-main 分支并提交同步变更");
  try {
    run(`git branch -D ${HEAD_BRANCH}`, { stdio: "ignore" });
  } catch {
    /* 本地无此分支 */
  }
  git("switch", "-c", HEAD_BRANCH);
  run("git add -A");
  const staged = run("git diff --cached --name-only").trim();
  if (staged) {
    run("git commit -m \"chore: 同步 feature 内容至 main（非发布）\"");
    console.log("   ✔ 已提交到 sync-main（feature 分支保持原状）");
  } else {
    console.log("   ✔ 无变更可提交（feature 与 main 内容一致）");
  }

  console.log("⑤ 清理远端旧 sync-main 并推送新分支");
  try {
    const remoteHas = run(`git ls-remote --heads origin ${HEAD_BRANCH}`).trim() !== "";
    if (remoteHas) {
      run(`git push origin --delete ${HEAD_BRANCH}`);
    }
  } catch (err) {
    throw new Error(
      `清理远端 ${HEAD_BRANCH} 分支失败：${String((err as any).stderr ?? (err as any).message ?? err).trim().slice(0, 200)}`
      + "（可能受分支保护，请手动删除后重试）",
    );
  }
  run(`git push -u origin ${HEAD_BRANCH}`);
  console.log("   ✔ sync-main 已推送");

  console.log("⑥ 创建同步 PR（人工合并）");
  const repo = repoOf();
  const owner = repo.split("/")[0];
  const existing = await api("GET", `/repos/${repo}/pulls?state=open&head=${owner}:${HEAD_BRANCH}&base=main`);
  if (existing.length > 0) {
    console.log(`   ✔ 已存在 open 同步 PR #${existing[0].number}：${existing[0].html_url}`);
    console.log("   → 如需重建，请先关闭该 PR 后重跑");
    await cleanup();

    return;
  }
  const pr = await api("POST", `/repos/${repo}/pulls`, {
    title: "chore: Sync feature content to main (non-release)",
    head: HEAD_BRANCH,
    base: "main",
    body:
      "非发布同步 PR：将 feature 的文档等非发布内容合入 main（版本号保持 main 侧，不触发发布通道）。\n\n"
      + "**此 PR 不启用 auto-merge，需人工审查后手动合并。**",
  });
  console.log(`   ✔ PR #${pr.number} 已创建：${pr.html_url}`);
  console.log("   → 请人工审查后合并（合并不触发版本发布）");
  await cleanup();
}

function repoOf () {
  const repoUrl = git("config", "--get", "remote.origin.url");

  return repoUrl.replace(/\.git$/, "").replace(/^.*github\.com[:/]/, "");
}

async function cleanup () {
  console.log("⑦ 清理本地 sync-main 并切回 feature");
  git("switch", "feature");
  try {
    run(`git branch -D ${HEAD_BRANCH}`, { stdio: "ignore" });
    console.log("   ✔ 已切回 feature 并删除本地 sync-main（远端保留至 PR 合并后自动删除）");
  } catch {
    console.log("   ✔ 已切回 feature（本地 sync-main 删除失败，可手动清理）");
  }
}

main().catch((err) => {
  console.error(`\n❌ ${err.message}`);
  process.exit(1);
});
