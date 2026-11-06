---
"@pawover/kit-types": minor
"@pawover/kit-utils": minor
"@pawover/kit-hooks": minor
"@pawover/kit-eslint-rules": minor
"@pawover/kit-zod": minor
---

新增随 npm 包发布的 TanStack Intent Agent Skills：每个发布包在包内提供 `skills/<name>/SKILL.md`（types / utils / eslint-preset 含 references），提供类型、工具类、React 与 Alova Hooks、ESLint flat config 预设和 Zod schema 的使用指引；各包 `files` 与 `tanstack-intent` keyword 已同步，skill 会随对应包版本一起发布。根包（`@pawover/kit`）不在 workspace 包列表中，仍由发布脚本在子包发版后同步递增。
