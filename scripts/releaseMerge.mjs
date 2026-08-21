import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { PACKAGE_FILES } from "./packages.mjs";

/**
 * 发布合并脚本（feature → main 正式版发布入口）：
 * 在 feature 分支上运行，完成发布合并的所有准备动作并自动打开 PR。
 *
 * 流程：
 *  1. 前置校验：当前分支为 feature、工作区干净、无未完成合并、本地与 origin/feature
 *     同步（落后或分叉时报错要求先 pull / rebase；本地领先则放行——冲突解决
 *     `git merge --continue` 后重跑本脚本即为此场景）、无未消费 changeset；
 *  2. `git merge origin/main`（冲突时退出，手动解决后重跑本脚本续跑）；
 *  3. 剔除 `.changeset/pre/` 归档（v3.0.0 的 pre 模式 version 产生的消费归档，防止污染 main 的 changeset 判定）；
 *  4. 剥离各包版本号的 prerelease 后缀（0.0.2-alpha.0 → 0.0.2，含根包）；
 *  5. 防撞车校验：剥离后的版本若已发布到 npm 则报错停止（防静默失败）；
 *  6. 切到 release-main 分支并提交「剔除归档 + 剥离版本」变更（feature 保持 alpha 状态，
 *     发布合并 PR 被关闭时不会锁死 feature）；
 *  7. 清理远端旧 release-main 分支并推送新的 release-main；
 *  8. 自动创建 PR（release-main → main，已存在 open PR 时跳过），输出 PR 链接；
 *  9. 不启用 auto-merge —— 人工合并 PR 是正式版发布的人工确认节点；
 *  10. 收尾：切回 feature 并删除本地 release-main（远端保留至 PR 合并后自动删除）。
 *
 * 用法：
 *   pnpm release:merge
 *
 * 退出码：
 *  0 成功（PR 已创建或已存在）
 *  1 前置校验失败 / 合并冲突 / 版本撞车 / 网络或 API 错误
 */
const HEAD_BRANCH = "release-main";

function isAncestor(ancestor, descendant) {
  try {
    run(`git merge-base --is-ancestor ${ancestor} ${descendant}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

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
  run("git fetch origin");
  const localHead = git("rev-parse", "HEAD");
  // --heads + 精确 ref：`git ls-remote origin feature` 会误匹配 changeset-release/feature 分支
  const remoteHead = run("git ls-remote --heads origin refs/heads/feature").trim().split(/\s+/)[0] ?? "";
  if (localHead !== remoteHead) {
    if (isAncestor(remoteHead, localHead)) {
      // 本地领先（冲突解决后 git merge --continue 重跑本脚本即此场景）：
      // 放行，领先提交随 release-main 推送，feature 稍后由用户 push
      console.log(`   ⚠ 本地 feature（${localHead.slice(0, 7)}）领先 origin/feature（${remoteHead.slice(0, 7)}），` +
        "放行续跑（领先提交将随 release-main 推送，feature 请稍后 push）");
    } else if (isAncestor(localHead, remoteHead)) {
      throw new Error(
        `本地 feature（${localHead.slice(0, 7)}）落后于 origin/feature（${remoteHead.slice(0, 7)}），` +
          "请先 git pull --rebase origin feature 后再运行（否则发布合并内容不完整）",
      );
    } else {
      throw new Error(
        `本地 feature（${localHead.slice(0, 7)}）与 origin/feature（${remoteHead.slice(0, 7)}）已分叉，` +
          "请先 git pull --rebase origin feature 后再运行",
      );
    }
  }
  const pending = readdirSync(".changeset").filter((f) => f.endsWith(".md") && f !== "README.md");
  if (pending.length > 0) {
    throw new Error(
      `存在未消费 changeset：${pending.join(", ")}。发布合并前必须消费（走 version 通道）` +
        "或删除，否则会污染 main 的 changeset 判定并触发幽灵 version PR",
    );
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
      stripped.push({ name: pkg.name, version: mainVersion });
    }
  }
  for (const { name, version } of stripped) console.log(`   ✔ ${name}: 剥离为 ${version}`);
  if (stripped.length === 0) console.log("   ✔ 无 prerelease 版本");

  console.log("③ 防撞车校验（仅检查本次剥离的版本）");
  for (const { name, version } of stripped) {
    let exists = false;
    try {
      const out = run(`npm view ${name}@${version} version`);
      exists = out.trim() !== "";
    } catch (err) {
      const stderr = String(err.stderr ?? "");
      if (/E404|is not in this registry/i.test(stderr)) {
        exists = false;
      } else {
        throw new Error(
          `防撞车检查失败（npm registry 访问异常，无法确认 ${name}@${version} 是否已发布）：` +
            stderr.trim().slice(0, 200),
        );
      }
    }
    if (exists) {
      throw new Error(
        `版本撞车：${name}@${version} 已发布。请先执行基线同步（merge main 取 main 侧）后重试`,
      );
    }
  }
  console.log("   ✔ 剥离后版本均未发布");

  console.log("④ 切到 release-main 分支并提交发布合并准备变更");
  try {
    run(`git branch -D ${HEAD_BRANCH}`, { stdio: "ignore" });
  } catch {
    /* 本地无此分支 */
  }
  git("switch", "-c", HEAD_BRANCH);
  run("git add -A");
  const staged = run("git diff --cached --name-only").trim();
  if (staged) {
    run('git commit -m "chore: 发布合并准备（剔除归档 + 剥离预发布）"');
    console.log("   ✔ 已提交到 release-main（feature 分支版本号暂时保持 alpha 状态，待基线同步 main 分支后回推稳定版本）");
  } else {
    console.log("   ✔ 无变更可提交");
  }

  console.log("⑤ 清理远端旧 release-main 并推送新分支");
  try {
    const remoteHas = run(`git ls-remote --heads origin ${HEAD_BRANCH}`).trim() !== "";
    if (remoteHas) run(`git push origin --delete ${HEAD_BRANCH}`);
  } catch (err) {
    throw new Error(
      `清理远端 ${HEAD_BRANCH} 分支失败：${String(err.stderr ?? err.message ?? err).trim().slice(0, 200)}` +
        `（可能受分支保护，请手动删除后重试）`,
    );
  }
  run(`git push -u origin ${HEAD_BRANCH}`);
  console.log("   ✔ release-main 已推送");

  console.log("⑥ 创建发布合并 PR（人工合并 = 正式版发布确认节点）");
  const rootVersion = versionOf("package.json");
  const title = `chore: Release merge from feature (${rootVersion})`;
  const body =
    "发布合并 PR：将 feature 最新代码与稳定版本号合入 main，合并后自动发布 latest。\n\n" +
    "**此 PR 不启用 auto-merge，需人工审查版本号后手动合并。**";
  const repoUrl = git("config", "--get", "remote.origin.url");
  const repo = repoUrl.replace(/\.git$/, "").replace(/^.*github\.com[:\/]/, "");
  const owner = repo.split("/")[0];
  const existing = await api(
    "GET",
    `/repos/${repo}/pulls?state=open&head=${owner}:${HEAD_BRANCH}&base=main`,
  );
  if (existing.length > 0) {
    console.log(`   ✔ 已存在 open 发布合并 PR #${existing[0].number}：${existing[0].html_url}`);
    console.log("   → 如需重建，请先关闭该 PR 后重跑");
    await cleanup();
    return;
  }
  const pr = await api("POST", `/repos/${repo}/pulls`, {
    title,
    head: HEAD_BRANCH,
    base: "main",
    body,
  });
  console.log(`   ✔ PR #${pr.number} 已创建：${pr.html_url}`);
  console.log(`   → 请人工审查版本号后合并（合并后自动发布 latest 正式版）`);
  await cleanup();
}

async function cleanup() {
  console.log("⑦ 清理本地 release-main 并切回 feature");
  git("switch", "feature");
  try {
    run(`git branch -D ${HEAD_BRANCH}`, { stdio: "ignore" });
    console.log("   ✔ 已切回 feature 并删除本地 release-main（远端保留至 PR 合并后自动删除）");
  } catch {
    console.log("   ✔ 已切回 feature（本地 release-main 删除失败，可手动清理）");
  }
}

main().catch((err) => {
  console.error(`\n❌ ${err.message}`);
  process.exit(1);
});
