import { existsSync, readFileSync } from "node:fs";

/**
 * 发布计划守卫脚本：
 * 在「子包发布 ⇒ 根包必发」规则上做硬校验，防止误配置导致根包漏发。
 *
 * 用法：先运行 `pnpm changeset status --output=status.json`（changesets 目录下），再：
 *   node scripts/verify-release.mjs [status.json 路径]
 *
 * 退出码：
 *   0 校验通过（或无待发布变更）
 *   1 存在子包发布但根包未纳入发布计划
 */
const ROOT_PACKAGE = "@pawover/kit";
const SUB_PACKAGES = [
  "@pawover/kit-eslint-rules",
  "@pawover/kit-hooks",
  "@pawover/kit-types",
  "@pawover/kit-utils",
  "@pawover/kit-zod",
];

const statusPath = process.argv[2] ?? ".changeset/status.json";

if (!existsSync(statusPath)) {
  console.log("✔ 无待发布变更，跳过校验");
  process.exit(0);
}

/** @type {{ releases: Array<{ name: string; type: string }> }} */
const status = JSON.parse(readFileSync(statusPath, "utf8"));
const released = new Set(status.releases.map((item) => item.name));
const releasedSubs = SUB_PACKAGES.filter((name) => released.has(name));

if (releasedSubs.length > 0 && !released.has(ROOT_PACKAGE)) {
  console.error(`❌ 发布顺序校验失败：`);
  console.error(`   子包将发布：${releasedSubs.join(", ")}`);
  console.error(`   但根包 ${ROOT_PACKAGE} 不在发布计划中。`);
  console.error(`   根包直接依赖全部子包（workspace:*），子包发布时根包必须同步发布。`);
  console.error(`   请检查 .changeset/config.json 的 updateInternalDependencies 配置或补充根包 changeset。`);
  process.exit(1);
}

const detail = released.size === 0
  ? "本次不发布任何包"
  : `本次将发布：${[...released].join(", ")}`;
console.log(`✔ 发布顺序校验通过（${detail}）`);
