# pawover-kit

[![npm version](https://img.shields.io/npm/v/@pawover/kit.svg)](https://www.npmjs.com/package/@pawover/kit)
[![Node version](https://img.shields.io/badge/node-%3E%3D22.20.0-brightgreen.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> An open-source TypeScript toolkit: type utilities, static utility classes, React / Alova hooks, ESLint rulesets and Zod schemas, ready to use with complete type definitions.

pawover-kit is a pnpm monorepo made of 5 independently publishable packages. The root package `@pawover/kit` re-exports every subpackage, while each subpackage can also be installed and used on its own.

## Features

- **Type-only utilities** `@pawover/kit-types`: no runtime code, providing `AnyObject`, `TreeLike`, the `AnyFunction` family, `AdvancedRecord`, `ApiNameCheck` and more
- **Static utility classes** `@pawover/kit-utils`: 14+ utility classes covering arrays, strings, objects, trees, currency, dates, math and more
- **React / Alova hooks** `@pawover/kit-hooks`: `useMount`, `useUnmount`, `useLatest`, `useResponsive`, `useTitle` and Alova request hooks
- **ESLint rulesets** `@pawover/kit-eslint-rules`: 9 rule groups (javascript / typescript / react / reactHooks / vue / stylistic / antfu / imports / importsSort) plus `GLOB_EXCLUDE` and `createRules`
- **Zod v4 schemas** `@pawover/kit-zod`: common validators for id, string, number, boolean, bigint and more
- Dual ESM / CJS builds with full type declarations
- `development` export condition so bundlers can use the source directly in development

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
| `pnpm test` | Run all vitest suites (801 tests / 31 files, node + jsdom environments) |
| `pnpm test:types` | Type-check the test files |
| `pnpm test:ci` | Full CI pipeline: type check → tests → build → smoke → pack check |
| `pnpm build` | Build every subpackage with turbo (tsdown emits ESM/CJS builds and type declarations) |
| `pnpm check` | Run types / eslint / format checks in parallel |

## Testing

- **Unit tests**: vitest with two projects (node environment for utils / zod / eslint-rules, jsdom environment for hooks)
- **Type tests**: type-level API tests ending with `.test.type.ts` under `test/types/`, fully checked by `test:types`
- **Smoke tests**: verify every dist entry is importable after the build

## Build pipeline

```
tsdown (build:source) → metadata extraction (build:metadata) → turbo build
```

- **tsdown** produces the bundles and type declarations
- **metadata.ts** extracts the runtime exports of utils / hooks into `dist/metadata.json`
- Every subpath export ships a `"development": "./src/index.ts"` alias so dev toolchains can consume the source directly
