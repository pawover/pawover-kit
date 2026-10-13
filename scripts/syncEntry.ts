import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { format, resolveConfig } from "prettier";

/**
 * 根包构建后同步脚本：
 * 读取 utils / hooks 构建产物的导出名，生成 entry/ 下的 metadata 文件（根包发布物）。
 * 输出按仓库 prettier 配置格式化（与 check:format 规则一致，避免 build 与 format 交替改写）。
 * 源文件缺失或导出读取失败时立即抛错（不静默产出损坏的元数据）。
 */
const root = resolve(import.meta.dirname, "..");

async function collectKeys (relativeDistPath: string): Promise<string[]> {
  const module = await import(pathToFileURL(resolve(root, relativeDistPath)).href);

  return Object.keys(module).sort();
}

async function writeJson (relativePath: string, data: unknown): Promise<void> {
  const filePath = resolve(root, relativePath);
  const prettierOptions = await resolveConfig(filePath);
  writeFileSync(filePath, await format(JSON.stringify(data), { ...prettierOptions, filepath: filePath }));
}

async function main () {
  const utilsExports = await collectKeys("packages/utils/dist/index.js");
  const hooksAlovaExports = await collectKeys("packages/hooks/dist/alova.js");
  const hooksReactExports = await collectKeys("packages/hooks/dist/react.js");

  await writeJson("entry/metadata.json", utilsExports);
  await writeJson("entry/hooks-metadata.json", { alova: hooksAlovaExports, react: hooksReactExports });
  console.log("✔ entry/metadata.json generated");
  console.log("✔ entry/hooks-metadata.json generated");
}

main();
