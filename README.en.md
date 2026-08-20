<div align="center">
  <img src="site/public/logo.svg" width="64" alt="pawover-kit logo">
  <h1>pawover-kit</h1>
  <p><a href="README.md">简体中文</a> | <b>English</b></p>
</div>

[![npm version](https://img.shields.io/npm/v/@pawover/kit.svg)](https://www.npmjs.com/package/@pawover/kit)
[![Node version](https://img.shields.io/badge/node-%3E%3D22.20.0-brightgreen.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Docs](https://img.shields.io/badge/docs-pawover--kit--docs-3B82F6.svg)](https://pawover.github.io/pawover-kit/)

> An open-source TypeScript toolkit: type utilities, static utility classes, React / Alova hooks, ESLint rulesets and Zod schemas, ready to use with complete type definitions.

pawover-kit is a pnpm monorepo made of 5 independently publishable packages. The root package `@pawover/kit` re-exports every subpackage, while each subpackage can also be installed and used on its own.

> 📚 **Documentation**: [https://pawover.github.io/pawover-kit/](https://pawover.github.io/pawover-kit/) — full API reference, guides and practical examples live on the docs site; this file keeps only the essentials.

## Features

- **Type-only utilities** `@pawover/kit-types`: no runtime code, providing `AnyObject`, `TreeLike`, the `AnyFunction` family, `AdvancedRecord`, `ApiNameCheck` and more
- **Static utility classes** `@pawover/kit-utils`: 15+ utility classes covering arrays, strings, objects, trees, currency, dates, math and more
- **React / Alova hooks** `@pawover/kit-hooks`: `useMount`, `useUnmount`, `useLatest`, `useResponsive`, `useTitle` and Alova request hooks
- **ESLint rulesets** `@pawover/kit-eslint-rules`: 9 rule groups (javascript / typescript / react / reactHooks / vue / stylistic / antfu / imports / importsSort) plus `GLOB_EXCLUDE` and `createRules`
- **Zod v4 schemas** `@pawover/kit-zod`: common validators for id, string, number, boolean, bigint and more
- Dual ESM / CJS builds with full type declarations
- `exports` only points to `dist` outputs, resolvable by any toolchain (node / vite / vitest / webpack, etc.)

## Packages

| Package | Description | Import path |
| :--- | :--- | :--- |
| `@pawover/kit-types` | Type-only utilities (no runtime code) | `@pawover/kit/types`, React types via `@pawover/kit/types/react` |
| `@pawover/kit-utils` | Static utility classes | `@pawover/kit/utils` (also `./math` and `./vite` subpaths) |
| `@pawover/kit-hooks` | React + Alova hooks | `@pawover/kit/hooks/react`, `@pawover/kit/hooks/alova` |
| `@pawover/kit-eslint-rules` | ESLint rulesets | `@pawover/kit/eslint-rules` |
| `@pawover/kit-zod` | Zod v4 schemas | `@pawover/kit/zod` |

> [!NOTE]
> The root export of `@pawover/kit-hooks` is empty. Always import from the `@pawover/kit/hooks/react` or `@pawover/kit/hooks/alova` subpaths.

## Installation

Install the umbrella package:

```bash
npm install @pawover/kit
```

Or install individual subpackages:

```bash
npm install @pawover/kit-types
npm install @pawover/kit-utils
npm install @pawover/kit-hooks
npm install @pawover/kit-eslint-rules
npm install @pawover/kit-zod
```

> [!WARNING]
> `alova`, `mathjs`, `react`, `vite` and `zod` are optional peer dependencies: install them yourself when using the related features (for example `alova` and `react` are required for `@pawover/kit/hooks/alova`).

## Quick start

```ts
import { TypeUtil } from "@pawover/kit/utils";
import { useMount } from "@pawover/kit/hooks/react";
import { useAlovaRequest } from "@pawover/kit/hooks/alova";
import type { AnyObject } from "@pawover/kit/types";
import eslintRules from "@pawover/kit/eslint-rules";
import { id } from "@pawover/kit/zod";

// Type utilities
const obj: AnyObject = { a: 1, b: "2" };

// Static utility classes
TypeUtil.isString("hello"); // true

// React hooks
useMount(() => {
  console.log("mounted");
});

// ESLint rulesets (flat config)
export default [
  { ignores: eslintRules.GLOB_EXCLUDE },
  { files: ["**/*.ts"], rules: { ...eslintRules.javascript, ...eslintRules.typescript } },
];

// Zod schemas
id.parse("abc"); // "abc"
```

## Requirements

- Node.js >= 22.20.0
- pnpm >= 11

## Development

```bash
git clone https://github.com/pawover/pawover-kit.git
cd pawover-kit
pnpm install
```

Common commands:

| Command | Description |
| :--- | :--- |
| `pnpm test` | Run all vitest suites (814 tests / 31 files, node + jsdom environments) |
| `pnpm test:types` | Type-check the test files |
| `pnpm test:ci` | Full CI pipeline: type check → tests → build → smoke → pack check |
| `pnpm build` | Build every subpackage with turbo (tsdown emits ESM/CJS builds and type declarations) |
| `pnpm check` | Run types / eslint / format checks in parallel |
| `pnpm docs:dev` | Preview the docs site locally (VitePress, source in `site/`) |
| `pnpm docs:gen` | Regenerate API reference pages from source JSDoc (re-run after editing source comments) |

## Release

A **dual-channel release model** driven by Changesets v3 + GitHub Actions (full details in [.changeset/README.md](./.changeset/README.md)):

- **feature = alpha pre-release channel**: pushing to `feature` is fully automatic — CI guard (`verify-release-plan.mjs`) → select-mode → version PR → version job merges once CI is green → dispatch triggers publish, releasing under the `alpha` dist-tag
- **main = stable channel**: code only lands via a **release merge** — `pnpm release:merge` (sync checks → strip prerelease → collision guard → create release-main PR) → **manual merge of the PR** (the human gate for stable releases) → publish `latest` → CI pushes the stable version back to `feature` (baseline sync, next alpha bumps on top of the new stable)
- **Core design**: there is always a human gate between alpha and stable — no automation ever crosses it

Common commands:

| Action | Command |
| :--- | :--- |
| Write a changeset | `pnpm changeset` |
| Publish alpha (automatic) | `git push origin feature` |
| Start a stable release (human gate) | `pnpm release:merge` → manually merge the PR |
| Baseline sync | Automatic (CI pushes back after a main release); manual fallback: `git merge origin/main` on `feature` (take the main-side version) |
| Emergency manual release | `pnpm pre:enter-alpha && pnpm build && pnpm changeset publish` |

> Trusted Publishing / OIDC: no npm token is ever needed; branch protection, guard details and FAQ live in `.changeset/README.md`.

## Testing

- **Unit tests**: vitest with two projects (node environment for utils / zod / eslint-rules, jsdom environment for hooks)
- **Type tests**: type-level API tests ending with `.test.type.ts` under `test/types/`, fully checked by `test:types`
- **Smoke tests**: verify every dist entry is importable after the build

## Build pipeline

```text
tsdown (build:source) → metadata extraction (build:metadata) → turbo build
```

- **tsdown** produces the bundles and type declarations
- **sync-entry.ts** (root postbuild) reads the runtime exports of utils / hooks from dist and writes `entry/metadata.json` and `entry/hooks-metadata.json`
- In-repo tests (`test:types` / vitest) resolve the source directly via tsconfig `paths` and `resolve.alias` — no build needed before testing