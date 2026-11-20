/**
 * 发布计划前置检查（感知 git tag）：
 * 在 CI 的 push 与 pull_request 事件上运行，校验「子包有源码变更 ⇒ 必须有待消费 changeset」，
 * 并对以下情况跳过校验：
 *  - 存在匹配 git tag（当前版本已发布）；
 *  - 变更仅涉及版本文件（版本号递增提交 / release:merge 的剥离提交，
 *    属发布流程自身产物，不要求 changeset）。
 *
 * changeset status 失败必须区分类型：changeset 内容错误（例如 frontmatter 引用了
 * 不在 workspace 包列表中的根包）直接阻断；命令缺失、网络、权限等环境类失败打印
 * warning 后跳过该项校验；无法归类时同样阻断，避免真实错误被降级为放行。
 *
 * 场景：
 *  - 有待消费 changeset → `changeset status` 通过即放行；
 *  - 仅版本文件变更（package.json / CHANGELOG.md / .changeset/**）→ 放行，
 *    否则 bump 提交会把 CI 拦红、进而被 release.yml 的 gate 挡住发布（死锁）；
 *  - 源码变更 + 存在匹配 tag（已发布）→ 放行（alpha 发布完成后的后续开发）；
 *  - 源码变更 + 无 tag → 拦截（开发改动没有 changeset）。
 *
 * 用法（在 ci.yml 的 verify release plan 步骤中）：
 *   node scripts/verifyReleasePlan.ts
 *
 * 退出码：
 *   0 计划合法（存在待消费 changeset，或仅版本文件变更，或变更子包均已发布）
 *   1 存在子包源码变更但没有 changeset 且当前版本未发布，或 changeset 内容无效
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
 * 这些归档不应被当作待消费 changeset，否则 status 结果会被归档撑起、前置检查失效。
 */
function pendingChangesets () {
  if (!existsSync(".changeset")) {
    return [];
  }

  return readdirSync(".changeset").filter((file) => file.endsWith(".md") && file !== "README.md");
}

const STATUS_COMMAND = "pnpm changeset status --output=.changeset/status.json";

const CONTENT_FAILURE_PATTERNS = [
  /not in the workspace/i,
  /invalid changeset/i,
  /unable to parse/i,
];

const ENVIRONMENT_FAILURE_PATTERNS = [
  /command not found/i,
  /is not recognized as an internal or external command/i,
  /cannot find module/i,
  /enotfound|eai_again|econnrefused|econnreset|etimedout|getaddrinfo|socket hang up/i,
  /\beacces\b|\beperm\b|\benospc\b/i,
];

interface StatusFailure {
  kind: "content" | "environment" | "unknown";
  detail: string;
}

function readErrorField (error: unknown, field: "code" | "stdout" | "stderr"): string {
  if (typeof error !== "object" || error === null) {
    return "";
  }
  const value: unknown = Reflect.get(error, field);

  return typeof value === "string"
    ? value
    : "";
}

function runChangesetStatus (): StatusFailure | null {
  try {
    process.stdout.write(execSync(STATUS_COMMAND, { encoding: "utf8" }));

    return null;
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "";
    const detail = [
      readErrorField(error, "stderr"),
      readErrorField(error, "stdout"),
      message,
    ]
      .join("\n")
      .trim();

    if (CONTENT_FAILURE_PATTERNS.some((pattern) => pattern.test(detail))) {
      return { kind: "content", detail };
    }
    if (
      readErrorField(error, "code") === "ENOENT"
      || ENVIRONMENT_FAILURE_PATTERNS.some((pattern) => pattern.test(detail))
    ) {
      return { kind: "environment", detail };
    }

    return { kind: "unknown", detail };
  }
}

function printFailureDetail (detail: string) {
  for (const line of detail.split(/\r?\n/)) {
    if (line.trim() !== "") {
      console.error(`   ${line}`);
    }
  }
}

if (pendingChangesets().length > 0) {
  const failure = runChangesetStatus();
  if (failure === null) {
    console.log("✔ 发布计划校验通过（存在待消费 changeset）");
    process.exit(0);
  }

  if (failure.kind === "environment") {
    console.warn("⚠ changeset status 因环境类问题未能执行，已跳过「changeset 合法性」校验：");
    printFailureDetail(failure.detail);
    console.warn("   后续仅按 tag / 版本文件规则判断，changeset 内容不会被验证。");
  } else {
    console.error("❌ 发布计划校验失败：changeset status 无法生成发布计划。");
    if (failure.kind === "content") {
      console.error("   原因：changeset 内容无效，常见为 frontmatter 引用了不在 workspace 包列表中的根包。");
    } else {
      console.error("   原因：未识别的失败，按阻断处理；如确认为环境问题，请人工确认后重试。");
    }
    printFailureDetail(failure.detail);
    process.exit(1);
  }
} else {
  console.log("✔ 无需 changeset，跳过校验（无待消费 changeset，已忽略 .changeset/pre/ 归档）");
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

// 版本发布流程产物指纹：changeset 已被消费（新增 .changeset/pre/ 归档
// 或删除 .changeset/*.md）或 .changeset 目录有删除。版本号递增提交（含此前
// 已配 changeset 的源码变更）是版本发布流程的合法产物，必须放行——
// 否则递增提交合并后 CI 被拦红、publish 永远无法触发（死锁）。
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
//  - 版本发布流程的版本号递增提交（仅 package.json / CHANGELOG / .changeset）；
//  - release:merge 的剥离提交（版本文件 + .changeset/pre 删除）；
//  - 根目录 / scripts / CI 配置等非子包改动（不触发子包发版，无需 changeset）。
// changeset 已被消费（版本发布流程产物）→ 源码变更随版本号递增一起放行。
if (changedSubs.length === 0 || changesetConsumed) {
  console.log(
    changedSubs.length === 0
      ? "✔ 发布计划校验通过（无子包源码变更，直接放行）"
      : "✔ 发布计划校验通过（changeset 已被版本发布流程消费，版本号递增提交放行）",
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
