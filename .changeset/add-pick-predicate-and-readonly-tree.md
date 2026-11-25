---
"@pawover/kit-utils": minor
---

`ArrayUtil.pick` 新增类型谓词重载：`filter` 为 `(row) => row is S` 时返回 `S[]`，传 `mapper` 时其入参收窄为 `S`；`TreeUtil.forEach` / `find` / `filter` / `map` 接受 `readonly` 节点数组。
