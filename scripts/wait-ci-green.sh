#!/usr/bin/env bash
# 等待指定提交的 check-run 全部完成且成功（release.yml 的 gate 与 version job 共用）。
# 用法：bash scripts/wait-ci-green.sh <sha> [check-run名...]
#
# 环境变量：
#   GH_TOKEN                必需，GitHub token
#   GITHUB_REPOSITORY       必需，owner/repo
#   GITHUB_API_URL          可选，默认 https://api.github.com
#   CI_WAIT_TIMEOUT_SECONDS 可选，等待上限，默认 1800
#   CI_WAIT_POLL_SECONDS    可选，轮询间隔，默认 10
#   CI_QUEUED_STALL_SECONDS 可选，run 保持 queued 而不执行的容忍上限，默认 600
#   CI_NO_RUN_GRACE_SECONDS 可选，该 sha 完全没有 run/check-run 的容忍上限，默认 120
#   CI_MAX_CHECK_PAGES      可选，check-run 分页上限，默认 10（每页 100）
set -euo pipefail

api_url="${GITHUB_API_URL:-https://api.github.com}"
repo="${GITHUB_REPOSITORY:?缺少 GITHUB_REPOSITORY}"
token="${GH_TOKEN:?缺少 GH_TOKEN}"
sha="${1:?缺少 sha 参数}"
shift

check_names=("$@")
if [ ${#check_names[@]} -eq 0 ]; then
  check_names=(ci)
fi

timeout_seconds="${CI_WAIT_TIMEOUT_SECONDS:-1800}"
poll_seconds="${CI_WAIT_POLL_SECONDS:-10}"
queued_stall_seconds="${CI_QUEUED_STALL_SECONDS:-600}"
no_run_grace_seconds="${CI_NO_RUN_GRACE_SECONDS:-120}"
max_check_pages="${CI_MAX_CHECK_PAGES:-10}"

work_dir=$(mktemp -d)
trap 'rm -rf "$work_dir"' EXIT
last_api_note=""

fail() {
  echo "::error::$1" >&2
  exit 1
}

snippet() {
  tr -d '\r' < "$1" | tr '\n' ' ' | cut -c1-300
}

api_get() {
  local url="$1" out="$2" code
  if ! code=$(curl -sS -o "$out" -w '%{http_code}' \
    -H "Authorization: Bearer $token" \
    -H "Accept: application/vnd.github+json" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    "$url"); then
    fail "请求 GitHub API 失败：$url"
  fi
  printf '%s' "$code"
}

pause() {
  local seconds="$1" remaining
  remaining=$((deadline - SECONDS))
  if [ "$remaining" -le 0 ]; then
    return 0
  fi
  if [ "$seconds" -gt "$remaining" ]; then
    seconds="$remaining"
  fi
  sleep "$seconds"
}

collect_check_runs() {
  local out="$1" page=1 count code
  rm -f "$work_dir"/checks-*.json
  while :; do
    code=$(api_get "$api_url/repos/$repo/commits/$sha/check-runs?per_page=100&page=$page" "$work_dir/checks-$page.json")
    case "$code" in
      200) ;;
      403 | 429)
        last_api_note="check-runs API 返回 $code：$(snippet "$work_dir/checks-$page.json")"
        echo "::warning::$last_api_note" >&2
        return 75
        ;;
      *)
        fail "check-runs API 返回 $code：$(snippet "$work_dir/checks-$page.json")"
        ;;
    esac
    count=$(jq -r '.check_runs | length' "$work_dir/checks-$page.json")
    if [ "$count" -lt 100 ] || [ "$page" -ge "$max_check_pages" ]; then
      break
    fi
    page=$((page + 1))
  done
  jq -s '[.[].check_runs[]?]' "$work_dir"/checks-*.json > "$out"
}

deadline=$((SECONDS + timeout_seconds))
queued_since=""
empty_since=""
missing_since=""
last_report=""

while :; do
  if [ "$SECONDS" -ge "$deadline" ]; then
    break
  fi

  runs_body="$work_dir/runs.json"
  code=$(api_get "$api_url/repos/$repo/actions/runs?head_sha=$sha&per_page=100" "$runs_body")
  case "$code" in
    200) ;;
    403 | 429)
      last_api_note="workflow runs API 返回 $code：$(snippet "$runs_body")"
      echo "::warning::$last_api_note" >&2
      pause "$poll_seconds"
      continue
      ;;
    *)
      fail "workflow runs API 返回 $code：$(snippet "$runs_body")"
      ;;
  esac

  merged="$work_dir/checks.json"
  if ! collect_check_runs "$merged"; then
    pause "$poll_seconds"
    continue
  fi

  blocked=$(jq -r '[.workflow_runs[]? | select(.conclusion == "action_required" or .status == "waiting") | "\(.name // "workflow")(\(.status)/\(.conclusion // "-"))"] | join("、")' "$runs_body")
  if [ -n "$blocked" ]; then
    fail "「$sha」的 workflow run 需人工批准后才能执行（action_required/waiting）：$blocked。请在 https://github.com/$repo/actions 批准，或配置 secrets.RELEASE_PR_TOKEN 让可执行 actor 创建 PR。"
  fi

  broken=$(jq -r '[.workflow_runs[]? | select(.conclusion == "startup_failure") | .name // "workflow"] | join("、")' "$runs_body")
  if [ -n "$broken" ]; then
    fail "「$sha」的 workflow run 启动失败（startup_failure）：$broken。"
  fi

  run_total=$(jq -r '.total_count // 0' "$runs_body")
  run_open=$(jq -r '[.workflow_runs[]? | select(.status != "completed")] | length' "$runs_body")
  run_running=$(jq -r '[.workflow_runs[]? | select(.status == "in_progress")] | length' "$runs_body")
  run_queued=$(jq -r '[.workflow_runs[]? | select(.status == "queued" or .status == "requested" or .status == "pending")] | length' "$runs_body")
  check_total=$(jq -r 'length' "$merged")

  all_success=true
  missing_any=false
  parts=""
  for name in "${check_names[@]}"; do
    entry=$(jq -r --arg n "$name" '[.[] | select(.name == $n)] | sort_by(.started_at // "") | last // empty | "\(.status)\t\(.conclusion // "")"' "$merged")
    if [ -z "$entry" ]; then
      all_success=false
      missing_any=true
      parts="${parts}${parts:+, }$name:缺失"
      continue
    fi
    status=${entry%%$'\t'*}
    conclusion=${entry#*$'\t'}
    parts="${parts}${parts:+, }$name:$status${conclusion:+/$conclusion}"
    if [ "$status" != "completed" ]; then
      all_success=false
      continue
    fi
    case "$conclusion" in
      success) ;;
      action_required)
        fail "「$sha」的 $name 检查需人工批准（action_required），不会自行完成。"
        ;;
      cancelled)
        fail "「$sha」的 $name 检查被取消（cancelled）：可能有新 push 取消了本次运行，等待新的 Release run。"
        ;;
      *)
        fail "「$sha」的 $name 检查未通过（$conclusion），阻塞发布：https://github.com/$repo/commit/$sha/checks"
        ;;
    esac
  done

  if [ "$all_success" = "true" ]; then
    echo "✔ CI 已通过（$sha）：$parts"
    exit 0
  fi

  if [ "$run_total" -eq 0 ] && [ "$check_total" -eq 0 ]; then
    if [ -z "$empty_since" ]; then
      empty_since=$SECONDS
    fi
    if [ $((SECONDS - empty_since)) -ge "$no_run_grace_seconds" ]; then
      fail "「$sha」没有任何 workflow run 或 check-run：GITHUB_TOKEN 触发的 push 不产生 run，PR 的 run 也可能一直待批准。"
    fi
  else
    empty_since=""
  fi

  if [ "$run_total" -gt 0 ] && [ "$run_open" -eq 0 ] && [ "$missing_any" = "true" ]; then
    if [ -z "$missing_since" ]; then
      missing_since=$SECONDS
    fi
    if [ $((SECONDS - missing_since)) -ge "$no_run_grace_seconds" ]; then
      existing=$(jq -r '[.[] | .name] | unique | join("、")' "$merged")
      fail "「$sha」的 run 已结束但找不到 check-run「${check_names[*]}」，现有检查：${existing:-无}（可能是 job 改名或该 workflow 未在本次事件触发）。"
    fi
  else
    missing_since=""
  fi

  if [ "$run_queued" -gt 0 ] && [ "$run_running" -eq 0 ]; then
    if [ -z "$queued_since" ]; then
      queued_since=$SECONDS
    fi
    if [ $((SECONDS - queued_since)) -ge "$queued_stall_seconds" ]; then
      fail "「$sha」的 workflow run 已排队 $((SECONDS - queued_since))s 仍未开始执行（queued/requested），停止等待。"
    fi
  else
    queued_since=""
  fi

  run_report=$(jq -r '[.workflow_runs[]? | "\(.name // "-"):\(.status)"] | join(", ")' "$runs_body")
  report="runs={${run_report:-无}} checks={$parts}"
  if [ "$report" != "$last_report" ]; then
    echo "… 等待 $sha：$report"
    last_report="$report"
  fi

  pause "$poll_seconds"
done

fail "等待 $sha 的 CI 超时（${timeout_seconds}s）：${last_report:-无状态}${last_api_note:+；最近一次 API 错误：$last_api_note}"
