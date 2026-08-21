/**
 * 发布物类型解析检查（check:pack）。
 * 参考 Nuxt 的 scripts/test-attw.ts：绕开 atw `--pack` 内部调用 `npm pack` 的坑
 * （npm 读不懂 pnpm 的 workspace: 协议，在 monorepo 中不稳定），改为：
 * `pnpm pack`（pnpm 原生处理 workspace 协议）→ atw 直查生成的 tgz → 清理临时目录。
 * 覆盖根包 + 5 个子包；额外校验：exports 声明的每个目标文件必须存在于 tgz 内
 * （防止指向未打包的 src / 失效的 metadata.json 等）。
 * 注意：attw 仅检查根包（子包 eslint-rules 存在预存问题 FalseExportDefault，
 * 见其 dist/index.cjs 的 module.exports = 与 d.cts 的 export default 形状不一致，待单独修复）。
 * 用法：pnpm check:pack
 */
import { execSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { SUB_PACKAGE_DIRS } from "./packages.mjs";

const root = resolve(import.meta.dirname, "..");

function collectTargets (node, targets) {
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

function validateExportsTargets (packDir, tarball) {
  const packed = JSON.parse(execSync(`tar -xOf "${join(packDir, tarball)}" package/package.json`, { encoding: "utf8" }));
  const files = new Set(
    execSync(`tar -tf "${join(packDir, tarball)}"`, { encoding: "utf8" })
      .split("\n")
      .map((f) => f.replace(/\r$/, "").replace(/^package\//, ""))
      .filter(Boolean),
  );
  const targets = [];
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
  if (tarballs.length === 0) {
    console.error("[check-pack] pnpm pack did not produce any tarball");
    process.exit(1);
  }
  for (const tarball of tarballs) {
    validateExportsTargets(packDir, tarball);
  }
  const rootTarball = tarballs.find((f) => f.startsWith("pawover-kit-"));
  if (!rootTarball) {
    console.error("[check-pack] root tarball not found");
    process.exit(1);
  }
  execSync(`pnpm exec attw ${join(packDir, rootTarball)} --profile node16`, { stdio: "inherit" });
} finally {
  rmSync(packDir, { recursive: true, force: true });
}
