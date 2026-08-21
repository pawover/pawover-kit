/**
 * 发布流程共享的包清单（单一事实来源）。
 *
 * 五个发布脚本（releaseMerge / verifyReleasePlan / verifyRelease / bumpRoot
 * / stripPrerelease）曾各自维护 6 包清单，新增子包需改 5 处；现统一由此导出：
 *  - SUB_PACKAGES：`[目录, 包名]` 数组（目录不带 packages/ 前缀）；
 *  - SUB_PACKAGE_DIRS：`packages/<目录>` 数组；
 *  - SUB_PACKAGE_NAMES：包名数组；
 *  - PACKAGE_FILES：含根包在内的 package.json 相对路径数组；
 *  - VERSION_FILES：版本通道产物的完整文件集合（package.json + CHANGELOG.md）。
 */

export const SUB_PACKAGES = [
  ["eslint-rules", "@pawover/kit-eslint-rules"],
  ["hooks", "@pawover/kit-hooks"],
  ["types", "@pawover/kit-types"],
  ["utils", "@pawover/kit-utils"],
  ["zod", "@pawover/kit-zod"],
] as const;

export const SUB_PACKAGE_DIRS = SUB_PACKAGES.map(([dir]) => `packages/${dir}`);

export const SUB_PACKAGE_NAMES = SUB_PACKAGES.map(([, name]) => name);

export const PACKAGE_FILES = ["package.json", ...SUB_PACKAGES.map(([dir]) => `packages/${dir}/package.json`)];

export const VERSION_FILES = new Set([
  ...PACKAGE_FILES,
  ...SUB_PACKAGE_DIRS.map((dir) => `${dir}/CHANGELOG.md`),
]);
