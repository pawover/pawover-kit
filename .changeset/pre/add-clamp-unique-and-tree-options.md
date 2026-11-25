---
"@pawover/kit-utils": minor
---

新增 `NumberUtil.clamp` 与 `ArrayUtil.uniqueBy`；`NumberUtil.clamp` 与 `within` 采用一致的入参校验：`value` / `input` 必须为有限数，`interval` 必须为两个有限数字组成的二元组（`NaN` 与 `±Infinity` 抛错）。`TreeUtil.find` / `TreeUtil.forEach` 支持 `prune` 剪枝选项（返回 `true` 时不再下探该节点子树，需为纯函数，求值时机随 `strategy` 不同）；`TreeUtil.rowsToTree` 新增 `orphan` 选项，默认 `"promote"` 保持缺失父节点提升为根，可选 `"drop"` 丢弃缺失父节点的节点及其子树（两种模式都不输出父链成环的行）；`TreeUtil.treeToRows` 的 options 不含 `prune`，运行期传入也会被忽略。
