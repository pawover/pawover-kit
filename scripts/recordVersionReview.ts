/**
 * 版本 PR 的 intent 审查结论记录入口。
 *
 * 仅由 CI 版本发布流程调用：changesets/action 在版本改动仍是工作区未提交变更时执行
 * `pnpm ci:version`，此时以 `INTENT_REVIEW_BASE`（version PR 的 base tip）为视角
 * 记录结论，记录结果随 action 的提交一并进入版本 PR。本地与未注入该变量时完全跳过。
 */

import { recordReviewOutcomes } from "./intentReview.ts";

const VERSION_REVIEW_REASON
  = "发版版本号 bump：changeset version 消费待发 changeset，仅版本号 / CHANGELOG / changeset 归档变更，"
    + "无源码实现、skill 内容或 planning 记录变动。";

const reviewBase = process.env["INTENT_REVIEW_BASE"]?.trim();

if (!reviewBase) {
  console.log("   ✔ 未设置 INTENT_REVIEW_BASE，跳过版本 PR 审查记录");
} else {
  try {
    recordReviewOutcomes({ base: reviewBase, reason: VERSION_REVIEW_REASON });
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : String(error);
    console.error(`\n❌ 版本 PR 审查记录失败，发版已阻断：${message}`);
    console.error("   → 按上面的指令记录审查结论后重跑发版");
    process.exit(1);
  }
}
