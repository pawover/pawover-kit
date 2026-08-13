# Issue tracker: GitHub

本仓库的 issues 与 spec 存于 GitHub issues。所有操作使用 `gh` CLI。

## 约定

- **创建 issue**：`gh issue create --title "..." --body "..."`。多行 body 用 heredoc。
- **读取 issue**：`gh issue view <number> --comments`，用 `jq` 过滤评论并同时获取标签。
- **列出 issues**：`gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'`，配合适当的 `--label` 与 `--state` 过滤。
- **评论 issue**：`gh issue comment <number> --body "..."`
- **打标签 / 去标签**：`gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **关闭**：`gh issue close <number> --comment "..."`

仓库信息从 `git remote -v` 推断 —— 在克隆内运行时 `gh` 会自动完成。

## Pull requests 作为 triage 请求面

**PRs as a request surface: no.** （若本仓库将外部 PR 视为功能请求，改为 `yes`；`/triage` 会读取此标志。）

设为 `yes` 时，PR 与 issue 走同一套标签与状态机，使用对应的 `gh pr` 命令：

- **读取 PR**：`gh pr view <number> --comments`，diff 用 `gh pr diff <number>`。
- **列出待 triage 的外部 PR**：`gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments`，只保留 `authorAssociation` 为 `CONTRIBUTOR`、`FIRST_TIME_CONTRIBUTOR` 或 `NONE` 的（排除 `OWNER`/`MEMBER`/`COLLABORATOR`）。
- **评论 / 打标签 / 关闭**：`gh pr comment`、`gh pr edit --add-label`/`--remove-label`、`gh pr close`。

GitHub 的 issue 与 PR 共用同一编号空间，裸 `#42` 可能是其中任意一种 —— 先用 `gh pr view 42` 解析，失败再回退到 `gh issue view 42`。

## 当 skill 说 "publish to the issue tracker"

创建 GitHub issue。

## 当 skill 说 "fetch the relevant ticket"

运行 `gh issue view <number> --comments`。

## Wayfinding 操作

供 `/wayfinder` 使用。**map** 是单个 issue，**child** issues 是 tickets。

- **Map**：单个带 `wayfinder:map` 标签的 issue，body 承载 Notes / Decisions-so-far / Fog。`gh issue create --label wayfinder:map`。
- **Child ticket**：通过 GitHub sub-issue 接口（`gh api` 的 sub-issues endpoint）链接到 map 的 issue。若未启用 sub-issues，则在 map body 的任务清单中追加 child，并在 child body 顶部写 `Part of #<map>`。标签：`wayfinder:<type>`（`research`/`prototype`/`grilling`/`task`）。认领后 ticket 指派给主导开发者。
- **阻塞关系**：GitHub **原生 issue dependencies** —— 规范、UI 可见的表示。添加边：`gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`，其中 `<blocker-db-id>` 是阻塞者的数字 **database id**（`gh api repos/<owner>/<repo>/issues/<n> --jq .id`，_不是_ `#number` 或 `node_id`）。GitHub 通过 `issue_dependencies_summary.blocked_by` 报告（仅开放中的阻塞者 —— 实时闸门）。依赖不可用时，回退到 child body 顶部的 `Blocked by: #<n>, #<n>` 行。当所有阻塞者关闭后 ticket 解除阻塞。
- **前沿查询（frontier query）**：列出 map 的开放 children（`gh issue list --state open`，限定 map 的 sub-issues / 任务清单），剔除带开放阻塞者（`issue_dependencies_summary.blocked_by > 0`，或 `Blocked by` 行中有开放 issue）或已指派人的；按 map 顺序取第一个。
- **认领**：`gh issue edit <n> --add-assignee @me` —— 会话的第一次写入。
- **解决**：`gh issue comment <n> --body "<answer>"`，然后 `gh issue close <n>`，最后向 map 的 Decisions-so-far 追加上下文指针（gist + 链接）。