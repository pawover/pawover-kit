/**
 * 全局类型入口消费端校验（构建后运行）
 *
 * 三层防线中的两层在此落地（另一层为 test/types 的 @ts-expect-error 探针）：
 *   - 源码级严格场景：skipLibCheck: false 直接编译 src/global.d.ts 与 src/react-global.d.ts（不依赖构建）
 *   - 产物级严格场景：构造发布态伪 node_modules（publishConfig 合并的 package.json + dist/entry），
 *     以 tsconfig `types` 数组消费 4 个子路径 × lib / 模块解析组合（含 Node16）
 *
 * 严格场景不开启 skipLibCheck（主测试编译会掩盖声明冲突，不能作防线）；DOM 与 WebWorker 双开时
 * TypeScript lib 自身互斥（真实项目必须开 skipLibCheck），该组合以 skipLibCheck 场景覆盖。
 * 运行前置（仅产物级场景）：先执行 `pnpm build`（或至少构建 @pawover/kit-types）。
 *
 * Usage: node test/scripts/globalTypes.ts
 */

import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const tmp = resolve(root, ".cache/global-types-check");
const tscJs = resolve(root, "node_modules/typescript/lib/tsc.js");
const typesDir = resolve(root, "packages/types");

const baseUsage = `const primitive: Primitive = "str";
const nullish: Nullish = null;
const anyObj: AnyObject<"id", number> = { id: 1 };
const plainObj: PlainObject = { a: 1 };
const tree: TreeLike<{ id: number }> = { id: 1, children: [{ id: 2, children: [] }] };
const treeOpt: TreeLikeOptionalChildren<{ id: number }> = { id: 1 };
const fn: AnyFunction = () => 1;
const asyncFn: AnyAsyncFunction = async () => 1;
const genFn: AnyGeneratorFunction = function* () {
  yield 1;
};
const asyncGenFn: AnyAsyncGeneratorFunction = async function* () {
  yield 1;
};
const isPrim: IsPrimitive<string> = true;
const hasIdx: HasStringIndex<Record<string, number>> = true;
const advMode: AdvancedRecordMode = ["!", "W"];
const advRecord: AdvancedRecord<"id", string> = { id: "1" };
const apiName: ApiNameCheck<"GET_USER"> = "GET_USER";
// @ts-expect-error — ApiNameCheck 剥离尾随下划线后不再是 "GET_USER_"
const strippedApiName: "GET_USER_" = "GET_USER" as ApiNameCheck<"GET_USER_">;
// @ts-expect-error — AdvancedRecord 的 mode 必须符合 AdvancedRecordMode 约束
const badRecordMode: AdvancedRecord<"id", string, ["?", "X"]> = {};
`;

const reactUsage = `const props: Props<{ title: string }> = { title: "hello" };
const withChildren: PropsWithChildren<{ title: string }> = { title: "hello", children: "content" };
const withRef: PropsWithRef<{ title: string }, HTMLDivElement> = { title: "hello" };
`;

// 无 DOM lib 时 VoidFunction 必须不可解析 —— 防止它被重新加回全局入口（含 interface 形态）的防线
const noDomUsage = `${baseUsage}
// @ts-expect-error — VoidFunction 不由本包提供（无 DOM lib 时应解析失败）
const removedVoidFunction: VoidFunction = () => {};
`;

// —— 仓库本地类型包路径（供 scenario 的 paths 解析 type-fest 与 react；全局入口经 ./index 引用模块版，间接需要 type-fest） ——
const typeFestPath = resolve(typesDir, "node_modules/type-fest/index.d.ts").replaceAll("\\", "/");
const reactTypesPath = `${realpathSync(resolve(typesDir, "node_modules/@types/react")).replaceAll("\\", "/")}/index.d.ts`;

rmSync(tmp, { recursive: true, force: true });

let failed = false;
let scenarioIndex = 0;

function runScenario (name: string, tsconfig: object, files: Record<string, string>): void {
  scenarioIndex += 1;
  const dir = resolve(tmp, "scenarios", String(scenarioIndex));
  mkdirSync(dir, { recursive: true });
  for (const [fileName, content] of Object.entries(files)) {
    writeFileSync(resolve(dir, fileName), content);
  }
  writeFileSync(resolve(dir, "tsconfig.json"), JSON.stringify(tsconfig, null, 2));

  // Windows 首次 tsc 偶发解析失败（TS2688，伪 node_modules 初建的瞬时状态），重试一次消化
  let result = spawnSync(process.execPath, [tscJs, "-p", dir], { encoding: "utf8" });
  if (result.status !== 0) {
    result = spawnSync(process.execPath, [tscJs, "-p", dir], { encoding: "utf8" });
  }
  if (result.status === 0) {
    console.log(`  ✓ ${name}`);
  } else {
    failed = true;
    console.error(`  ✗ ${name}`);
    console.error(`${result.stdout ?? ""}${result.stderr ?? ""}`);
  }
}

// —— 防线②：源码级严格场景（不依赖构建，直接严格编译声明文件） ——
const sourceScenarios = [
  { name: "源码级：src/global.d.ts（严格）", entry: resolve(typesDir, "src/global.d.ts"), usage: baseUsage },
  { name: "源码级：src/react-global.d.ts（严格）", entry: resolve(typesDir, "src/react-global.d.ts"), usage: reactUsage },
];
for (const scenario of sourceScenarios) {
  runScenario(
    scenario.name,
    {
      compilerOptions: {
        target: "ES2022",
        lib: ["ES2023", "DOM"],
        strict: true,
        noEmit: true,
        module: "ESNext",
        moduleResolution: "Bundler",
        skipLibCheck: false,
        paths: { react: [reactTypesPath] },
      },
      include: ["main.ts", scenario.entry.replaceAll("\\", "/")],
    },
    { "main.ts": scenario.usage },
  );
}

// —— 防线③：产物级严格场景（需先构建） ——
const requiredArtifacts = [
  resolve(typesDir, "dist/global.d.ts"),
  resolve(typesDir, "dist/react-global.d.ts"),
  resolve(root, "entry/types-global.d.ts"),
  resolve(root, "entry/types-react-global.d.ts"),
];
for (const artifact of requiredArtifacts) {
  if (!existsSync(artifact)) {
    console.error(`✗ 缺少 ${relative(root, artifact)}，请先执行 pnpm build 并完成全局入口实现`);
    process.exit(1);
  }
}

// 构造发布态伪 node_modules
const typesPkg = JSON.parse(readFileSync(resolve(typesDir, "package.json"), "utf8")) as {
  name: string;
  version: string;
  type: string;
  publishConfig: { main: string; module: string; types: string; exports: unknown };
};
const pseudoTypes = resolve(tmp, "node_modules/@pawover/kit-types");
cpSync(resolve(typesDir, "dist"), resolve(pseudoTypes, "dist"), { recursive: true });
writeFileSync(
  resolve(pseudoTypes, "package.json"),
  JSON.stringify(
    {
      name: typesPkg.name,
      version: typesPkg.version,
      type: typesPkg.type,
      main: typesPkg.publishConfig.main,
      module: typesPkg.publishConfig.module,
      types: typesPkg.publishConfig.types,
      exports: typesPkg.publishConfig.exports,
    },
    null,
    2,
  ),
);

const rootPkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")) as {
  name: string;
  version: string;
  type: string;
  exports: unknown;
};
const pseudoRoot = resolve(tmp, "node_modules/@pawover/kit");
cpSync(resolve(root, "entry"), resolve(pseudoRoot, "entry"), { recursive: true });
writeFileSync(
  resolve(pseudoRoot, "package.json"),
  JSON.stringify({ name: rootPkg.name, version: rootPkg.version, type: rootPkg.type, exports: rootPkg.exports }, null, 2),
);

const scenarios = [
  { name: "@pawover/kit-types/global（ES2023 + DOM，严格）", types: ["@pawover/kit-types/global"], libs: ["ES2023", "DOM"], usage: baseUsage, skipLibCheck: false, module: "ESNext", moduleResolution: "Bundler" },
  { name: "@pawover/kit-types/global（ES2023，无 DOM，严格）", types: ["@pawover/kit-types/global"], libs: ["ES2023"], usage: noDomUsage, skipLibCheck: false, module: "ESNext", moduleResolution: "Bundler" },
  { name: "@pawover/kit-types/global（ES2022 + WebWorker，严格）", types: ["@pawover/kit-types/global"], libs: ["ES2022", "WebWorker"], usage: baseUsage, skipLibCheck: false, module: "ESNext", moduleResolution: "Bundler" },
  {
    name: "@pawover/kit-types/global（DOM + WebWorker + DOM.Iterable，skipLibCheck）",
    types: ["@pawover/kit-types/global"],
    libs: ["ES2022", "DOM", "DOM.Iterable", "WebWorker"],
    usage: baseUsage,
    skipLibCheck: true,
    module: "ESNext",
    moduleResolution: "Bundler",
  },
  { name: "@pawover/kit-types/global（Node16 解析，严格）", types: ["@pawover/kit-types/global"], libs: ["ES2023", "DOM"], usage: baseUsage, skipLibCheck: false, module: "Node16", moduleResolution: "Node16" },
  { name: "@pawover/kit/types/global（Node16 解析，严格）", types: ["@pawover/kit/types/global"], libs: ["ES2023", "DOM"], usage: baseUsage, skipLibCheck: false, module: "Node16", moduleResolution: "Node16" },
  { name: "@pawover/kit-types/react/global（Node16 解析，严格）", types: ["@pawover/kit-types/react/global"], libs: ["ES2023", "DOM"], usage: reactUsage, skipLibCheck: false, module: "Node16", moduleResolution: "Node16" },
  { name: "@pawover/kit/types/global（ES2023 + DOM，严格）", types: ["@pawover/kit/types/global"], libs: ["ES2023", "DOM"], usage: baseUsage, skipLibCheck: false, module: "ESNext", moduleResolution: "Bundler" },
  { name: "@pawover/kit-types/react/global（ES2023 + DOM，严格）", types: ["@pawover/kit-types/react/global"], libs: ["ES2023", "DOM"], usage: reactUsage, skipLibCheck: false, module: "ESNext", moduleResolution: "Bundler" },
  { name: "@pawover/kit/types/react/global（ES2023 + DOM，严格）", types: ["@pawover/kit/types/react/global"], libs: ["ES2023", "DOM"], usage: reactUsage, skipLibCheck: false, module: "ESNext", moduleResolution: "Bundler" },
];
for (const scenario of scenarios) {
  runScenario(
    scenario.name,
    {
      compilerOptions: {
        target: "ES2022",
        lib: scenario.libs,
        strict: true,
        noEmit: true,
        module: scenario.module,
        moduleResolution: scenario.moduleResolution,
        skipLibCheck: scenario.skipLibCheck,
        types: scenario.types,
        paths: { "type-fest": [typeFestPath], "react": [reactTypesPath] },
      },
      include: ["main.ts"],
    },
    { "main.ts": scenario.usage },
  );
}

if (failed) {
  console.error("\n❌ 全局类型入口校验失败");
  process.exit(1);
} else {
  console.log("\n✅ 全局类型入口的源码与发布态产物均可通过 tsconfig types 消费");
}
