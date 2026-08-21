/**
 * 从源码 JSDoc 生成 API 参考页（site/api/*）
 *
 * 每个子包一个 typedoc 调用，产物提交进仓库（GitHub Pages 构建不再重复生成）。
 * 入口策略按包的实际导出结构配置：
 *   - types: 核心 index + react 子路径（react 不参与核心导出，需单独入口）
 *   - utils: 核心 index + math / vite 子路径（二者不在核心入口内）
 *   - hooks: react / alova 两个子路径（根导出为空）
 *   - eslint-rules / zod: 单入口
 */

import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const typedocBin = resolve("node_modules/.bin/typedoc");

const packages = [
  {
    name: "@pawover/kit-types",
    out: "site/api/types",
    entryPoints: ["packages/types/src/index.ts", "packages/types/src/react.ts"],
  },
  {
    name: "@pawover/kit-utils",
    out: "site/api/utils",
    entryPoints: [
      "packages/utils/src/index.ts",
      "packages/utils/src/math/index.ts",
      "packages/utils/src/vite/index.ts",
    ],
  },
  {
    name: "@pawover/kit-hooks",
    out: "site/api/hooks",
    entryPoints: ["packages/hooks/src/react/index.ts", "packages/hooks/src/alova/index.ts"],
  },
  {
    name: "@pawover/kit-eslint-rules",
    out: "site/api/eslint-rules",
    entryPoints: ["packages/eslint-rules/src/index.ts"],
  },
  {
    name: "@pawover/kit-zod",
    out: "site/api/zod",
    entryPoints: ["packages/zod/src/index.ts"],
  },
];

const baseArgs = [
  "--skipErrorChecking",
  "--readme",
  "none",
  "--githubPages",
  "false",
  "--tsconfig",
  "tsconfig.build.json",
  "--plugin",
  "typedoc-plugin-markdown",
  "--entryFileName",
  "index",
];

let failed = false;

for (const pkg of packages) {
  const args = [...baseArgs, "--name", pkg.name, "--out", pkg.out, "--entryPointStrategy", "expand"];

  for (const entryPoint of pkg.entryPoints) {
    args.push("--entryPoints", entryPoint);
  }

  process.stdout.write(`\n> typedoc ${pkg.name} → ${pkg.out}\n`);
  const result = spawnSync(typedocBin, args, { stdio: "inherit", shell: process.platform === "win32" });

  if (result.status !== 0) {
    failed = true;
    process.stderr.write(`✗ ${pkg.name} 生成失败\n`);
  } else {
    process.stdout.write(`✓ ${pkg.name} 完成\n`);
  }
}

if (failed) {
  process.exit(1);
}
