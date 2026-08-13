import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

/**
 * 根包构建后同步脚本：
 * 读取 utils / hooks 构建产物的导出名，生成 entry/ 下的 metadata 文件（根包发布物）。
 * 源文件缺失或导出读取失败时立即抛错（不静默产出损坏的元数据）。
 */
const root = resolve(import.meta.dirname, "..");

async function collectKeys (relativeDistPath: string): Promise<string[]> {
  const module = await import(pathToFileURL(resolve(root, relativeDistPath)).href);

  return Object.keys(module).sort();
}

async function main () {
  const utilsExports = await collectKeys("packages/utils/dist/index.js");
  const hooksAlovaExports = await collectKeys("packages/hooks/dist/alova.js");
  const hooksReactExports = await collectKeys("packages/hooks/dist/react.js");

  writeFileSync(resolve(root, "entry/metadata.json"), `${JSON.stringify(utilsExports, null, 2)}\n`);
  writeFileSync(
    resolve(root, "entry/hooks-metadata.json"),
    `${JSON.stringify({ alova: hooksAlovaExports, react: hooksReactExports }, null, 2)}\n`,
  );
  console.log("✔ entry/metadata.json generated");
  console.log("✔ entry/hooks-metadata.json generated");
}

main();