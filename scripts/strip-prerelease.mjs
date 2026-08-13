import { readFileSync, writeFileSync } from "node:fs";

/**
 * 发布合并辅助脚本（剥离 prerelease 后缀）：
 * 在 feature → main 的发布合并（feature 侧版本去 alpha 标记）之后运行，
 * 将各包 package.json 中形如 `X.Y.Z-alpha.N` 的版本剥离为 `X.Y.Z`。
 *
 * 双通道模型的发布合并规则：
 *  - feature 永远领先 main（alpha 版本号高于 main 已发布稳定版）；
 *  - 合并冲突时版本号取 feature 侧，随后剥离 prerelease 后缀，
 *    使 main 直接携带稳定版本号，publish 通道据此发布 latest；
 *  - 无 prerelease 版本时脚本为 no-op（幂等）。
 *
 * 用法（发布合并后、提交前）：
 *   node scripts/strip-prerelease.mjs
 *
 * 退出码：恒为 0（幂等；仅剥离存在的 prerelease 后缀）。
 */
const PACKAGES = [
  "package.json",
  "packages/eslint-rules/package.json",
  "packages/hooks/package.json",
  "packages/types/package.json",
  "packages/utils/package.json",
  "packages/zod/package.json",
];

let stripped = 0;
for (const file of PACKAGES) {
  const pkg = JSON.parse(readFileSync(file, "utf8"));
  const main = pkg.version.split("-")[0];
  if (pkg.version !== main) {
    console.log(`✔ ${pkg.name}: ${pkg.version} -> ${main}`);
    pkg.version = main;
    writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
    stripped += 1;
  }
}

if (stripped === 0) {
  console.log("✔ 无 prerelease 版本，无需剥离");
}
