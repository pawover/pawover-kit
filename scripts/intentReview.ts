/**
 * 发布 / 同步脚本共享的 intent 审查结论记录。
 *
 * `release:merge` 与 `sync:main` 都会做两类机械改动：删除 `.changeset/pre/`
 * 归档、改写各包 `package.json` 版本号。这些改动会被 intent 识别为待审条目
 * （根 `package.json` 属于 skill / planning 快照，归档文件属于未映射变更），
 * 导致推送时 pre-push 的 `pnpm check:skills` 必然失败。
 *
 * 本模块在提交机械改动后调用 `intent maintainer review --unchanged` 记录
 * no-change 结论。记录前先校验全部待审项都落在白名单内；一旦混入真实源改动
 * 就抛错要求人工审查，避免把需要更新指引的改动静默记为无需更新。
 */

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";

/** 允许自动记录的路径：根 package.json（版本号）与 pre 归档 */
const AUTO_RECORD_PATHS = [
  /^package\.json$/,
  /^\.changeset\/pre\//,
];

interface ReviewItem {
  id: string;
  changedFiles: string[];
}

interface ReviewReport {
  items: ReviewItem[];
}

/**
 * 解析仓库内 intent CLI 的绝对路径。
 *
 * @returns `node` 可直接执行的 CLI 入口（`dist/cli.mjs`）绝对路径
 * @throws 依赖缺失或包未声明 `intent` 可执行入口时抛出
 */
function intentCliPath (): string {
  const pkgPath = path.join(process.cwd(), "node_modules", "@tanstack", "intent", "package.json");
  let pkg: { bin?: Record<string, string> | string };
  try {
    pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  } catch (error) {
    throw new Error(`无法定位 intent CLI（${pkgPath}），请先执行 pnpm install`, { cause: error });
  }
  const bin = typeof pkg.bin === "string"
    ? pkg.bin
    : pkg.bin?.["intent"];
  if (!bin) {
    throw new Error(`intent 包未声明 intent 可执行入口（${pkgPath}）`);
  }

  return path.resolve(path.dirname(pkgPath), bin);
}

/**
 * 以当前 Node 执行 intent CLI，绕过 shell 转义问题。
 *
 * @param args 传给 intent 的参数（不含可执行文件本身）
 * @returns CLI 的标准输出
 */
function intent (...args: string[]): string {
  return execFileSync(process.execPath, [
    intentCliPath(),
    ...args,
  ], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

/**
 * 记录发布准备机械改动的 intent 审查结论。
 *
 * 待审项必须全部属于根 `package.json` 或 `.changeset/pre/`；否则说明存在
 * 尚未人工审查的改动，此时抛错中止，要求先记录真实结论。
 *
 * @param reason 写入 review-state 的统一 no-change 理由
 * @returns 是否写入了新的审查结论（无待审项时返回 `false`）
 * @throws 待审项超出白名单范围，或 intent CLI 执行失败时抛出
 * @example
 * ```ts
 * if (recordReleaseReviewOutcomes("release 准备：仅版本号与归档变更")) {
 *   run("git add .intent/review-state.json");
 *   run("git commit -m \"chore(release): 记录审查结论\"");
 * }
 * ```
 */
export function recordReleaseReviewOutcomes (reason: string): boolean {
  const report: ReviewReport = JSON.parse(intent("maintainer", "review", "--json"));
  if (report.items.length === 0) {
    console.log("   ✔ 无待审条目，无需记录");

    return false;
  }
  const outside = report.items.filter((item) => item.changedFiles.some((file) => !AUTO_RECORD_PATHS.some((pattern) => pattern.test(file))));
  if (outside.length > 0) {
    throw new Error(
      "检测到发布准备之外的待审改动，请先人工执行 pnpm check:skills 并记录审查结论：\n"
      + outside.map((item) => `  - ${item.id}（${item.changedFiles.join(", ")}）`).join("\n"),
    );
  }
  intent("maintainer", "review", "--unchanged", reason);
  console.log(`   ✔ 已记录 ${report.items.length} 项发布元数据审查结论`);

  return true;
}
