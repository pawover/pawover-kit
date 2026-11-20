/**
 * 发布类 PR 共享的 intent 审查结论记录。
 *
 * 版本 PR 与本地 release:merge / sync:main 的机械改动都会成为待审条目：版本号
 * bump 命中 skill / planning 快照，归档与已消费的 changeset 属于未映射变更。
 * PR 侧 `intent maintainer check --base <PR base sha>` 以净差视角校验，这些条目
 * 若未记录会让 Check Skills 必然失败，因此需在分支内容定格时以 `--base` 视角
 * 记录结论。
 *
 * 记录前校验待审项全部落在发版元数据白名单内；混入真实改动时抛错，要求人工审查。
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

/** 发版元数据白名单：版本通道的 package.json、子包 CHANGELOG 与 changeset 归档 */
export const RELEASE_METADATA_PATHS = [
  /^package\.json$/,
  /^packages\/[^/]+\/package\.json$/,
  /^packages\/[^/]+\/CHANGELOG\.md$/,
  /^\.changeset\/pre\.json$/,
  /^\.changeset\/pre\//,
  /^\.changeset\/[^/]+\.md$/,
];

export interface ReviewItem {
  id: string;
  kind: "skill" | "planning" | "source";
  path: string;
  fingerprint: string;
  snapshot: Record<string, string | null>;
  changedFiles: string[];
  problems: string[];
}

export interface ReviewReport {
  schemaVersion: 1;
  root: string;
  head: string;
  base: string;
  items: ReviewItem[];
}

export interface AnnotatedReviewItem extends ReviewItem {
  outcome: "no-change";
  reason: string;
  evidence: string[];
}

export interface AnnotatedReviewReport extends Omit<ReviewReport, "items"> {
  items: AnnotatedReviewItem[];
}

export interface RecordReviewOptions {
  /** 写入 review-state 的统一 no-change 理由 */
  reason: string;
  /** 审查视角的 Git 基准；缺省沿用 review-state 的 baseline */
  base?: string;
  /** 允许自动记录的路径白名单，默认发版元数据 */
  patterns?: readonly RegExp[];
}

export interface WhitelistPartition {
  whitelisted: ReviewItem[];
  outside: ReviewItem[];
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
 * 读取指定视角下的待审报告。
 *
 * @param base 审查基准的 Git revision；缺省时由 intent 退回 review-state 的 baseline
 * @returns intent 输出的审查报告
 * @throws intent CLI 执行失败或输出不是合法 JSON 时抛出
 */
function readReviewReport (base?: string): ReviewReport {
  const args = ["maintainer", "review", "--json"];
  if (base) {
    args.push("--base", base);
  }

  return JSON.parse(intent(...args));
}

/**
 * 按路径白名单划分待审条目。
 *
 * 条目的每个变动文件都必须命中白名单；没有任何变动文件的条目（通常带未解决的
 * problems）视为白名单外，交由人工判断。
 *
 * @param report 待审报告
 * @param patterns 允许自动记录的路径白名单
 * @returns 白名单内与白名单外的条目
 * @example
 * ```ts
 * const { whitelisted, outside } = filterWhitelisted(report, RELEASE_METADATA_PATHS);
 * ```
 */
export function filterWhitelisted (report: ReviewReport, patterns: readonly RegExp[]): WhitelistPartition {
  const whitelisted: ReviewItem[] = [];
  const outside: ReviewItem[] = [];
  for (const item of report.items) {
    const isWhitelisted = item.changedFiles.length > 0
      && item.changedFiles.every((file) => patterns.some((pattern) => pattern.test(file)));
    (isWhitelisted ? whitelisted : outside).push(item);
  }

  return { whitelisted, outside };
}

/**
 * 为报告内的全部条目补上 no-change 结论。
 *
 * @param report 待审报告
 * @param reason 写入 review-state 的统一理由
 * @param head 记录时的仓库 revision，写入证据
 * @returns 可直接交给 `maintainer review --record` 的报告
 * @example
 * ```ts
 * const annotated = annotate(report, "发版版本号 bump", report.head);
 * ```
 */
export function annotate (report: ReviewReport, reason: string, head: string): AnnotatedReviewReport {
  return {
    ...report,
    items: report.items.map((item) => ({
      ...item,
      outcome: "no-change",
      reason,
      evidence: [
        item.changedFiles.length > 0
          ? `Changed: ${item.changedFiles.join(", ")} at ${head}`
          : `No changed files at ${head}`,
      ],
    })),
  };
}

/**
 * 把注解后的报告交给 intent 写入 review-state。
 *
 * @param report 已注解的审查报告
 * @throws intent CLI 执行失败时抛出
 */
function recordAnnotatedReport (report: AnnotatedReviewReport): void {
  const directory = mkdtempSync(path.join(tmpdir(), "intent-review-"));
  const file = path.join(directory, "report.json");
  try {
    writeFileSync(file, JSON.stringify(report, null, 2));
    intent("maintainer", "review", "--record", file);
  } finally {
    rmSync(directory, { force: true, recursive: true });
  }
}

/**
 * 记录发版机械改动的 intent 审查结论。
 *
 * 待审项必须全部落在白名单内；否则说明存在尚未人工审查的改动，此时抛错中止并
 * 给出人工记录命令。
 *
 * @param options 记录选项
 * @returns 是否写入了新的审查结论（无待审项时返回 `false`）
 * @throws 待审项超出白名单范围，或 intent CLI 执行失败时抛出
 * @example
 * ```ts
 * if (recordReviewOutcomes({ base: "origin/main", reason: "release 准备：仅版本号与归档变更" })) {
 *   run("git add .intent/review-state.json");
 *   run("git commit -m \"chore(release): 记录审查结论\"");
 * }
 * ```
 */
export function recordReviewOutcomes (options: RecordReviewOptions): boolean {
  const { base, patterns = RELEASE_METADATA_PATHS, reason } = options;
  const report = readReviewReport(base);
  if (report.items.length === 0) {
    console.log("   ✔ 无待审条目，无需记录");

    return false;
  }
  const { whitelisted, outside } = filterWhitelisted(report, patterns);
  if (outside.length > 0) {
    const reviewCommand = base
      ? `intent maintainer review --base ${base} --interactive`
      : "intent maintainer review --interactive";
    throw new Error(
      "检测到发版元数据之外的待审改动，请先人工审查并记录结论：\n"
      + outside.map((item) => `  - ${item.id}（${item.changedFiles.join(", ") || "无改动文件"}）`).join("\n")
      + `\n  在仓库根目录执行：${reviewCommand}`,
    );
  }
  recordAnnotatedReport(annotate(report, reason, report.head));
  console.log(`   ✔ 已记录 ${whitelisted.length} 项发版元数据审查结论`);

  return true;
}
