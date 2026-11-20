# Spec：发版类 PR 的 intent 审查基线记录流程（T1-A 配套，T4 第 1 轮）

- 任务流：T4（第 1 轮，新建会话）；上游事实基线：`docs/agents/ci-review.md` T1-A 与第二节。
- 本文件为只读调研后的唯一写入，不改动任何代码 / workflow。

## 一、目标

让 changeset / release / sync 类 PR 在 Check Skills 的 `--base <PR base sha>` 全量净差视角下合法通过，且不削弱普通 feature PR 的审查强度（该视角与增量视角均保持原语义）。

核心机制已由 intent v0.5.6 自身能力保证：**记录条目按"当前内容 hash 快照"匹配，与记录时的 `--base` 取值无关**——同一文件内容未变即视为已审（`review-CEi4n4ir.mjs:297-299`）。因此只要在 PR head 内容定格时，以 PR base 视角把待审条目记录进 `.intent/review-state.json` 并随该内容入库，PR 侧 `maintainer check --base <base sha>` 即得 0 pending。且记录不动 `baseline`（state 存在且其 baseline 可达时，`recordReview` 保留原值：`review-CEi4n4ir.mjs:463,501-503`），CI / 本地 / pre-push 的增量视角完全不受影响。

## 二、验收标准

| # | 场景 | 判定方式 |
| --- | --- | --- |
| 1 | 版本 PR（`changeset-release/<branch>` → `<branch>`）创建后 | 在本地 checkout PR head，执行 `node node_modules/@tanstack/intent/dist/cli.mjs maintainer check --base <PR base tip sha> --artifacts _artifacts`，结果 0 pending、exit 0 |
| 2 | 同一 checkout 不带 `--base` | `maintainer check`（增量视角）同样 0 pending（证明未破坏 CI / pre-push 语义） |
| 3 | 普通 feature PR | 现有流程不变：agent 按 `AGENTS.md` intent-maintainer 程序记录；Check Skills validate 行为与今日一致 |
| 4 | 版本 job 记录白名单违约（混入真实源改动） | `pnpm ci:version` 以非零退出、version job 红、不产生 / 不更新版本 PR，错误信息指向人工记录指令 |
| 5 | 重复发版 / PR 已存在再触发 | 再次记录幂等：条目按 id 覆盖，内容未变的条目跳过；不产生重复 PR（releaseMerge 已有 `state=open&head=...` 查重，`scripts/releaseMerge.ts:272-282`） |
| 6 | `.intent/review-state.json` 的 `baseline` | 全流程记录后仍为 `948686c…`（或后续由人工流程显式前移），命令输出可证：`node -e "console.log(require('./.intent/review-state.json').baseline)"` |

## 三、范围与不做

**做**：
1. 版本 PR 记录自动化（release.yml version job + `ci:version` 链路新脚本）。
2. `scripts/intentReview.ts` 扩展为 base 视角 + 白名单 + `--record` 注解流（复用现有能力，不另造机制）。
3. releaseMerge / syncMain 记录视角决策（见方案 B 选项）。
4. 文档：本 Spec + `docs/agents/ci-review.md` T1-A 处补一行流程指针（由后续实现轮次决定）。

**不做**（与 T1-A 无关，均已在 T1 单独立单）：
- T1-B（bot PR CI 死等超时）、T1-C（changeset 引用根包）、T1-D/E/F/G/H。
- 分支过滤、校验降级、`check-skills.yml` 改动（TanStack reusable workflow 引用原样保留）。
- intent 升级 / 上游 PR。
- husky hook 变更。

## 四、方案与取舍

### 方案 A（推荐）：版本 PR 记录全自动 + 发版脚本视角升级

**触发时机与执行者**——两类发版 PR 分别处理：

1. **版本 PR（CI 自动）**：记录挂在 `pnpm ci:version` 链路尾部（新脚本 `scripts/recordVersionReview.ts`，仅当 env `INTENT_REVIEW_BASE` 非空时执行；release.yml version job 的 version 步骤注入 `INTENT_REVIEW_BASE: ${{ github.sha }}`）。在 `changesets/action/version@v2.1.2` 运行 script 时，版本改动尚是**工作区未提交变更**，此时以 `--base <github.sha>` 记录：diff(base→工作区) 恰为版本 bump 全部文件；记录结果（`.intent/review-state.json` 修改）随后被 action 自身的提交一并收进版本 commit。已实证 action 收集工作区全部改动（含 modified 与 untracked）并用 GitHub API `createCommitOnBranch` 提交（changesets/action v2.1.2 `dist/run-CIL9Fbt6.js` 的 `P()`：`git diff --name-status --diff-filter=ACDMRT <base>` + `git ls-files --others --exclude-standard`，本节证据取自 tag v2.1.2 对应 commit `66d7d1d` 的 dist 产物）。因此**版本 PR 在物理上不可能以"未记录"状态存在**——记录先于提交发生，"必须先记录才能合并"由构造保证，无需额外闸门。
   - PR base 漂移无害：条目按内容 hash 匹配（见第一节），base sha 取触发 push 的 sha 还是后续漂移后的 base tip，结论一致。
   - CI 中记录失败（intent CLI 错误或白名单违约）→ `ci:version` exit 1 → action 中止 → 无版本 PR → **阻断**（见待确认问题 4）。
2. **release-main / sync-main PR（本地脚本）**：`releaseMerge.ts` / `syncMain.ts` 现有 step ⑤/⑥（`scripts/releaseMerge.ts:239-244`、`syncMain.ts` 对应步骤）从"baseline 增量视角"升级为"`--base origin/main` 视角"：先 `maintainer review --base origin/main --json` 取待审条目 → 白名单校验（发版元数据：根/子包 `package.json`、`CHANGELOG.md`、`.changeset/**`）→ 全部命中白名单则以固定理由逐条注解并 `--record`；否则抛错并给出人工指令（`intent maintainer review --base origin/main --interactive`）。这一步等价于"PR 侧 validate 将通过"的前置断言：PR base=main tip，净差中未记录条目会提前在脚本阶段暴露，而非等 Check Skills 红灯后救火。

**记录机制**（全部复用 intent CLI 原生命令，无新存储）：
- 报告来源：`intent maintainer review --base <ref> --json`（`maintainer review` 无 one-shot 选项时直接委托 `intent review`，`maintainer-DXmixQ6W.mjs:826-828`）；输出含 `schemaVersion/root/head/base/items[]`，`items[]` 含 `id/kind/path/fingerprint/snapshot/changedFiles/problems`（`review-CEi4n4ir.mjs:438-445`）。
- 记录：给报告逐条注解 `outcome=no-change` + `reason` + `evidence` 后写临时 JSON，`intent maintainer review --record <file>`（`review-DK4Dt6am.mjs:11-20`；`recordReview` 校验 root / fingerprint 未变，`review-CEi4n4ir.mjs:459-474`，两阶段 TOCTOU 由 fingerprint 复检兜住）。
- 落点：`review-state.json` 常态写入 `.intent/review-state.json`（唯一存储，无备选），随版本 commit / release-main 提交进入 PR 分支，PR 侧 validate checkout PR head 后即可读到。
- 版本 PR 固定理由（固定文案 + 白名单硬校验，语义诚实）："发版版本号 bump：changeset version 消费待发 changeset，仅版本号 / CHANGELOG / changeset 归档变更，无源码实现、skill 内容或 planning 记录变动。"
- 版本 PR 白名单（`RELEASE_METADATA_PATHS`，`scripts/intentReview.ts:19-22`）：`^package\.json$`、`^packages/[^/]+/package\.json$`、`^packages/[^/]+/CHANGELOG\.md$`、`^\.changeset/pre\.json$`、`^\.changeset/pre/`、`^\.changeset/[^/]+\.md$`（消费删除）。不纳入 `pnpm-lock.yaml`——出现即违约阻断（version 场景 lockfile 不应变化；`ci:version` 的 `pnpm install` 对 workspace 依赖为 `workspace:*`，锁文件不受版本号影响）。

**幂等与重复发版**：
- version job 重跑：PR branch 被 action force 重写（branch 存在且 head ≠ base 时走 temp branch force 流程，`run-CIL9Fbt6.js` 的 `k()`），每次重跑记录均基于当次工作区内容重新生成并覆盖同 id 条目。
- 重复记录同一内容：`add()` 快照匹配直接跳过（`review-CEi4n4ir.mjs:297-299`），0 pending 时记录步骤空转返回（`recordPendingReview` 对空报告抛 "Nothing is pending review."，脚本需先判 `items.length === 0` 再决定是否记录，现有 `intentReview.ts:91-96` 已是此模式）。
- releaseMerge 重跑：重建 release-main 分支 + 查重 open PR（已存在则跳过创建），记录随分支重建。

**对普通 feature PR 的影响**：零改动。记录只增不改 `baseline`；agent 维护流程（`AGENTS.md` intent-maintainer 段）原样；pre-push / CI `pnpm check:skills` 语义不变。

### 方案 B（备选）：仅版本 PR 自动记录，发版脚本维持现状

只做方案 A 第 1 点；releaseMerge / syncMain 记录保持 baseline 增量视角。
- 优点：改动面最小，行为完全可预测。
- 缺点：release-main / sync-main PR 在 base=main 视角下仍可能红（存量未记录内容；PR #49 实测 27 项 unmapped，run 44700892996），每次红灯后人工 interactive 清缴，反馈滞后于发版脚本。版本 PR 记录入库后，大部分条目因内容匹配会自动消除，残留项趋近于"一次性存量"，但暴露点仍在 PR 侧而非脚本侧。
- 取舍理由：若用户希望发版脚本零行为变化，选 B；否则 A 的"前置断言"更早暴露、指令更可操作。

### 方案 C（不推荐）：半自动人工记录

CI 仅产出报告 artifact（version job 上传 `--base --json` 报告），人工执行注解 + `--record` 后重跑。
- 缺点：版本 PR 创建先于记录 → Check Skills 首轮必红（违背"先记录才能合并"的构造保证）；多一轮人工往返。仅当用户不信任自动 no-change 文案时考虑。

## 五、影响面

| 文件 | 改动 | 阶段 |
| --- | --- | --- |
| `scripts/intentReview.ts` | 扩展 base 参数、白名单、`--record` 注解流；拆出纯函数（白名单过滤 / 注解构造）供单测 | 实现 |
| `scripts/recordVersionReview.ts`（新） | env 门控的版本记录入口，挂入 `ci:version` 链 | 实现 |
| `package.json` | `ci:version` 追加 `&& node scripts/recordVersionReview.ts` | 实现 |
| `.github/workflows/release.yml` | version job version 步骤注入 `INTENT_REVIEW_BASE: ${{ github.sha }}` env | 实现 |
| `scripts/releaseMerge.ts` / `scripts/syncMain.ts` | 方案 A：记录视角升级为 `--base origin/main` + 白名单阻断（方案 B：不动） | 实现 |
| `test/unit/**` | 新增白名单过滤 / 注解构造单测 | 实现 |
| `docs/agents/ci-review.md` | T1-A 处补流程指针 | 文档 |
| `docs/agents/intent-baseline-flow.md` | 本 Spec（已写入） | 已完成 |

**GitHub 侧无需新设置**：version job 已有 `contents: write + pull-requests: write`（`release.yml:81-84`）；`INTENT_REVIEW_PULL_REQUESTS` 变量仅涉 publish-review（`check-skills.yml:51-53`），与本流程无关。**外部依赖**：bot PR 的 workflow run 需人工批准（T1-B 现象），记录落地不受其影响（记录先于 PR 存在），但 PR 的 CI / Check Skills run 需人工批准后才会执行——该问题归属 T1-B，不在本 Spec 处理。

## 六、测试 Seam（不发版、不碰真实 PR）

1. **纯函数单测**（vitest，`test/unit/`）：从 `intentReview.ts` 拆出 `filterWhitelisted(report, patterns)` 与 `annotate(report, reason, head)`；用夹具报告（含 skill / planning / source 条目、白名单内外混合、删除条目 snapshot=null）断言分类与注解输出。不调 CLI。
2. **本地 git 演练（端到端，无需 GitHub）**：临时目录 `git init` 复刻最小结构（commit A 为 base；模拟版本 bump：改根/子包 `package.json` + 新建 `.changeset/pre.json` + 删除一个已跟踪 md），然后：
   - `INTENT_REVIEW_BASE=<A sha> node scripts/recordVersionReview.ts` → 断言 `.intent/review-state.json` 新增条目、`baseline` 未变；
   - `intent maintainer check --base <A sha> --artifacts _artifacts` → 0 pending（模拟 PR 侧 validate）；
   - `intent maintainer check --artifacts _artifacts` → 0 pending（模拟 CI 增量视角）；
   - 在工作区追加一个白名单外文件重跑记录 → exit 1 且错误信息含人工指令（验收标准 4）。
3. **CI 等价性回归**：本地 `pnpm ci:version`（无 env）确认记录步骤跳过、行为与今日一致。
4. **首次真实验证**留给下一轮版本 PR：PR 创建后本地执行验收标准 1/2 的两条命令即可，无需等 CI。

## 七、待确认问题

1. **版本 PR 自动记录 vs 半自动**（已确认，方案 A）：A. 全自动（固定理由 + 白名单硬校验，推荐）；B. 方案 C 半自动（CI 产报告、人工记录）。选 A 则版本 PR 永远带记录出生。
2. **releaseMerge / syncMain 记录视角**（已确认，方案 A）：A. 升级为 `--base origin/main` 视角 + 白名单阻断（推荐，红灯前置到脚本阶段）；B. 维持 baseline 增量视角（方案 B，残留项人工清缴）。
3. **存量未记录内容**（release-main PR 相对 main 的历史净差，如 PR #49 的 27 项）（已确认，方案 A）：A. 发版前由 maintainer 按正常流程一次性 `intent maintainer review --base origin/main --interactive` 清缴（推荐，诚实且一次性）；B. 由脚本以"intent 采纳前历史存量"理由批量自动 no-change（一次写入脚本、长期免人工，但弱化语义）。
4. **记录失败语义**（已确认，方案 A）：版本 job 中白名单违约 / CLI 失败按**阻断**处理（exit 1、不发版、明确指向人工记录），还是降级为告警放行？（推荐阻断——告警放行会重新制造"PR 带未记录变更"的原始问题。）
