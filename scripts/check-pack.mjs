/**
 * 发布物类型解析检查（check:pack）。
 * 参考 Nuxt 的 scripts/test-attw.ts：绕开 atw `--pack` 内部调用 `npm pack` 的坑
 * （npm 读不懂 pnpm 的 workspace: 协议，在 monorepo 中不稳定），改为：
 * `pnpm pack`（pnpm 原生处理 workspace 协议）→ atw 直查生成的 tgz → 清理临时目录。
 * 用法：pnpm check:pack
 */
import { execSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const packDir = mkdtempSync(join(tmpdir(), "pawover-kit-attw-"));
try {
  execSync(`pnpm pack --pack-destination ${packDir}`, { stdio: "inherit" });
  const tarball = readdirSync(packDir).find((f) => f.endsWith(".tgz"));
  if (!tarball) {
    console.error("[check-pack] pnpm pack did not produce a tarball");
    process.exit(1);
  }
  execSync(`pnpm exec attw ${join(packDir, tarball)} --profile node16`, { stdio: "inherit" });
} finally {
  rmSync(packDir, { recursive: true, force: true });
}
