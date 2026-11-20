# GitHub App 配置与故障排查

本仓库使用 GitHub App `pawover-kit-release` 创建版本 PR，避免 `github-actions[bot]` 创建的 PR 其 workflow run 停在 `action_required` 等待人工批准。

## 一、App 信息

| 项 | 值 |
| --- | --- |
| App 名称 | `pawover-kit-release` |
| Client ID | `Iv23li75vqj0U4UhZdiv` |
| App ID | `5845739`（兼容保留，可删除） |
| 仓库 secrets | `RELEASE_APP_CLIENT_ID`、`RELEASE_APP_PRIVATE_KEY`；`RELEASE_APP_ID` 兼容保留 |
| 权限 | `Contents: write`、`Pull requests: write` |

## 二、回退链

版本 PR 创建 token 的优先级：

1. **App installation token**（推荐）：`actions/create-github-app-token@v3` 使用 `RELEASE_APP_CLIENT_ID` 与 `RELEASE_APP_PRIVATE_KEY` 生成；若 `RELEASE_APP_CLIENT_ID` 缺失则回退到 `RELEASE_APP_ID`（兼容保留）。
2. **PAT**：`secrets.RELEASE_PR_TOKEN`（若配置）。App token 不可用时回退到此，并输出 `::warning::`。
3. **`github.token`**：最后兜底。此 token 创建的 PR 其 workflow run 会停在 `action_required`，feature 通道的自动合并将失败。

判断逻辑在 `.github/workflows/release.yml` 的 `Resolve version PR token` 步骤：

```bash
if [ -n "$APP_TOKEN" ]; then
  token="$APP_TOKEN"
elif [ -n "$PAT_TOKEN" ]; then
  token="$PAT_TOKEN"
else
  token="${{ github.token }}"
  echo "::warning::未配置 RELEASE_APP_CLIENT_ID（或 RELEASE_APP_ID）/RELEASE_APP_PRIVATE_KEY 与 RELEASE_PR_TOKEN：version PR 退回 github.token 创建，其 workflow run 会停在待人工批准状态（action_required），feature 通道的自动合并将失败。"
fi
```

## 三、私钥轮换

1. 在 GitHub App 设置页生成新私钥（会下载 `.pem` 文件，App 的 `Key pairs` 页面会保留新 key 并列出所有已生成 key）。
2. 更新仓库 secret `RELEASE_APP_PRIVATE_KEY` 为新私钥内容。
3. 在 App 的 `Key pairs` 页面手动删除旧 key（旧 key 不删除仍可继续生成 token，多把 key 可并存）。

**注意**：私钥包含换行符，直接粘贴整个 `.pem` 文件内容到 secret 值。

## 四、`action_required` 排查

若版本 PR 的 CI 显示 `action_required`：

1. **检查 token 来源**：在 Release workflow run 的 `Resolve version PR token` 步骤日志中查看使用了哪个 token。
   - 若显示 `using GitHub App installation token`：App 配置正常，问题在其他地方。
   - 若显示 `回退 secrets.RELEASE_PR_TOKEN`：App token 生成失败，检查 `RELEASE_APP_CLIENT_ID`（或 `RELEASE_APP_ID`）与 `RELEASE_APP_PRIVATE_KEY`。
   - 若显示 `退回 github.token`：未配置 App 与 PAT，需配置。

2. **检查 App 安装状态**：确认 App `pawover-kit-release` 已安装到个人账号 `pawover`（`target_type=User`），且权限包含 `Contents: write` 与 `Pull requests: write`。

3. **检查私钥格式**：`RELEASE_APP_PRIVATE_KEY` 必须包含完整的 PEM 内容（含 `-----BEGIN RSA PRIVATE KEY-----` 与 `-----END RSA PRIVATE KEY-----`）。

4. **人工批准**：若 token 来源为 `github.token`，`github-actions[bot]` 创建的 PR 其 workflow run 会停在 `action_required` 等待人工批准（具体审批行为取决于仓库 Actions 设置）。可在 Actions 页手动批准该 PR 的 workflow run，或配置 `RELEASE_APP_CLIENT_ID` / `RELEASE_APP_PRIVATE_KEY` 让 App 创建 PR（App token 创建的 PR 不出现该状态）。

## 五、合并与 dispatch 的 token 选择

**关键约束**：合并版本 PR 与 `workflow run` dispatch 必须使用 `github.token`，而非 App installation token。

原因：App/PAT 合并产生的 push 会再触发一次 `release.yml` 的 push 通道，与随后的 dispatch 双跑。`github.token` 触发的合并 push 不产生 workflow run（GitHub 既有规则），dispatch 是例外。

相关配置在 `.github/workflows/release.yml` 的 `Wait for version PR CI, merge and trigger publish` 步骤：

```yaml
env:
  # 合并与 dispatch 必须用 github.token：用 App/PAT 合并产生的 push 会再触发
  # 一次 release.yml 的 push 通道，与随后的 dispatch 双跑。
  GH_TOKEN: ${{ github.token }}
```

## 六、`workflow_dispatch` 通道语义

`release.yml` 的 `gate` job 对 `workflow_dispatch` 事件直接放行（跳过 CI 校验），这是**有意的设计**，语义为「人工担责发布」。

- 任何有 `workflow_dispatch` 触发权（默认 write 协作者）的成员可 `gh workflow run release.yml --ref feature`，不经 CI 校验直接进入 pack → publish。
- 该 dispatch 通道是 version job 自动化链路的必需例外（合并版本 PR 后自动触发发布），但同样对人工开放。
- **不增加 `confirm` 输入参数或 environment 保护**：发布决策由触发者担责，不通过机制强制确认。

此暗门在内部信任模型下风险中低，属于「CI 未绿即发布」的有意通道。

## 七、故障排查速查

| 现象 | 可能原因 | 处理 |
| --- | --- | --- |
| version PR CI 显示 `action_required` | 使用 `github.token` 创建 PR | 配置 `RELEASE_APP_CLIENT_ID` 与 `RELEASE_APP_PRIVATE_KEY`，或人工批准 |
| `Create release App token` 步骤失败 | App 未安装或权限不足 | 检查 App 安装状态与权限 |
| `Resolve version PR token` 显示回退 PAT | App token 生成失败 | 检查 `RELEASE_APP_PRIVATE_KEY` 格式 |
| 合并后触发两次 Release run | 使用 App/PAT 合并 | 确认合并步骤使用 `github.token` |
