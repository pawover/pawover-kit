# ADR-0007: 升级 tsdown 0.23——移除 cjsReexport 存根修复，采用原生 CJS 声明

tsdown 0.23 移除了 `dts.cjsReexport`：双格式构建改为在独立 pass 生成**完整**的 CJS 声明（`.d.cts` 与 `.d.ts` 同量级）。升级必须同步移除该选项与配套的 `tsdownFixCtsStubs`（ADR-0004 期间引入的 internal `build:done` hook——0.22 下 `cjsReexport` 产出空 `.d.cts` 存根，由该 hook 改写为对 `.d.ts` 的 re-export）。决策：6 个包配置改为 `dts: true`，删除该 hook 及其 internal 导出，信任 0.23 原生产物。

曾评估：A) 升级但保留存根改写——会覆掉原生完整声明的 CJS 特定信息，并保留无谓的维护点，被否；B) 停留 0.22——仅为回避本次迁移而积压工具链，被否；C) 本方案。上游迁移指南建议升级前用 0.22.14 跑一次构建清理弃用警告（已执行）。

连带后果：`.d.cts` 体积从 ~34B 存根变为与 `.d.ts` 同量级（CJS / ESM 各一份完整声明，发布物略增）；正确性由 `check:pack`（attw node16，已扩展为检查全部发布包）与 `test:smoke`（CJS require）作为回归防线。tsdown 0.23 要求 Node `^22.18 || ^24.11 || >=26`，与仓库基准 24.21 兼容。

Status: accepted
