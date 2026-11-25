---
"@pawover/kit-utils": minor
---

`TreeUtil.rowsToTree` 新增 `rootParentId` 选项：`parentId` 等于自定义根标记（如 `"0"` 或 `0`）的行视为根节点，即使存在同 id 的行也不挂到其下；未传时不额外识别根标记，nullish 与自引用为根，`orphan: "promote"` 下缺失父节点的行也会提升为根，默认行为不变。
