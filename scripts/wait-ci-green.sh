#!/usr/bin/env bash
# 等待指定提交的 ci check-run 完成且成功（供 release.yml 的 gate 与 version job 复用）。
# 用法：bash scripts/wait-ci-green.sh <sha> [timeout秒] [check-run名]
# 环境变量：GH_TOKEN（GitHub token）、GITHUB_REPOSITORY（owner/repo）
set -euo pipefail

sha="${1:?缺少 sha 参数}"
timeout="${2:-180}"
label="${3:-ci}"

for i in $(seq 1 "$timeout"); do
  body=$(curl -s -H "Authorization: Bearer $GH_TOKEN" -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$GITHUB_REPOSITORY/commits/$sha/check-runs")
  run=$(echo "$body" | jq -r ".check_runs[]? | select(.name == \"$label\") | .status + \":\" + (.conclusion // \"\")" | tail -1)
  if [ -n "$run" ]; then
    status=${run%%:*}
    conclusion=${run##*:}
    if [ "$status" = "completed" ]; then
      if [ "$conclusion" = "success" ]; then
        echo "✔ CI passed ($sha)"
        exit 0
      fi
      echo "::error::CI failed ($conclusion), release blocked"
      exit 1
    fi
  fi
  sleep 10
done

echo "::error::Timed out waiting for CI on $sha"
exit 1