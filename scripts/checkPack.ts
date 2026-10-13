/**
 * 发布物类型解析检查（check:pack）。
 * 参考 Nuxt 的 scripts/test-attw.ts：绕开 atw `--pack` 内部调用 `npm pack` 的坑
 * （npm 读不懂 pnpm 的 workspace: 协议，在 monorepo 中不稳定），改为：
 * `pnpm pack`（pnpm 原生处理 workspace 协议）→ atw 直查生成的 tgz → 清理临时目录。
 * 覆盖根包 + 5 个子包；额外校验：exports 声明的每个目标文件必须存在于 tgz 内
 * （防止指向未打包的 src / 失效的 metadata.json 等）；attw（node16 profile）
 * 对全部 tarball 逐一检查类型解析。
 * 用法：pnpm check:pack
 */

import { execSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { SUB_PACKAGE_DIRS } from "./packages.ts";

const root = resolve(import.meta.dirname, "..");

function collectTargets (node: unknown, targets: string[]): void {
  if (typeof node === "string") {
    if (node.startsWith("./")) {
      targets.push(node);
    }

    return;
  }
  if (node !== null && typeof node === "object") {
    for (const value of Object.values(node)) {
      collectTargets(value, targets);
    }
  }
}

function validateExportsTargets (packDir: string, tarball: string): void {
  const packed: Record<"exports" | "name", unknown> = JSON.parse(
    execSync(`tar -xOf "${tarball}" package/package.json`, { encoding: "utf8", cwd: packDir }),
  );
  const files = new Set<string>(
    execSync(`tar -tf "${tarball}"`, { encoding: "utf8", cwd: packDir })
      .split("\n")
      .map((f) => f.replace(/\r$/, "").replace(/^package\//, ""))
      .filter(Boolean),
  );
  const targets: string[] = [];
  collectTargets(packed.exports, targets);
  const missing = targets.filter((t) => !t.includes("*") && !files.has(t.replace(/^\.\//, "")));
  if (missing.length > 0) {
    console.error(`[check-pack] ${packed.name} exports 引用了包内不存在的文件：\n  ${missing.join("\n  ")}`);
    process.exit(1);
  }
}

const packDir = mkdtempSync(join(tmpdir(), "pawover-kit-attw-"));
try {
  for (const dir of ["", ...SUB_PACKAGE_DIRS]) {
    execSync(`pnpm pack --pack-destination ${packDir}`, { stdio: "inherit", cwd: join(root, dir) });
  }
  const tarballs = readdirSync(packDir).filter((f) => f.endsWith(".tgz"));
  const expected = 1 + SUB_PACKAGE_DIRS.length;
  if (tarballs.length !== expected) {
    console.error(`[check-pack] expected ${expected} tarballs, got ${tarballs.length}`);
    process.exit(1);
  }
  for (const tarball of tarballs) {
    validateExportsTargets(packDir, tarball);
    const tarballPath = join(packDir, tarball);
    try {
      execSync(`pnpm exec attw ${tarballPath} --profile node16 --quiet`);
    } catch {
      console.error(`[check-pack] ${tarball} 类型解析失败，完整报告：`);
      execSync(`pnpm exec attw ${tarballPath} --profile node16`, { stdio: "inherit" });
      process.exit(1);
    }
    console.log(`✔ ${tarball} 类型解析通过`);
  }
} finally {
  rmSync(packDir, { recursive: true, force: true });
}
