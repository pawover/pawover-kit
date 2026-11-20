---
name: kit
description: >-
  Use when installing @pawover/kit or choosing between the root package, a
  standalone subpackage, and a subpath such as @pawover/kit/utils,
  @pawover/kit/hooks/react, @pawover/kit/types/global,
  @pawover/kit/eslint-rules, or @pawover/kit/zod; also use when an import fails
  because the root entry only re-exports @pawover/kit-utils, the hooks root
  export is empty, or an optional peer dependency is missing.
metadata:
  purpose: Choose the correct @pawover/kit package and subpath, install optional
    peer dependencies, and avoid runtime import failures.
  type: lifecycle
  library: "@pawover/kit"
  library_version: "1.3.0-alpha.1"
sources:
  - package.json
  - entry/index.d.ts
  - entry/metadata.json
  - site/guide/import-paths.md
  - site/guide/installation.md
---

# Choose a `@pawover/kit` entry point

`@pawover/kit` is a thin re-export package. Its root `.` entry only re-exports
`@pawover/kit-utils`; types, hooks, the ESLint preset, and Zod schemas are
published through subpaths. The five standalone subpackages are also published
separately.

## Setup

Install the aggregate package when you want several capabilities:

```sh
pnpm add @pawover/kit
```

Install only the subpackage you need when the project uses a single capability:

```sh
pnpm add @pawover/kit-utils
```

Optional peer dependencies are not installed for you. Install the peers for the
feature you use:

| Feature | Peer dependencies |
| --- | --- |
| React hooks | `react` |
| Alova hooks | `alova` + `react` |
| Math utilities (`MathUtil`, `CurrencyUtil.toRealValue`) | `mathjs` |
| Vite proxy utility (`ViteUtil.toProxy`) | `vite` |
| Zod schemas | `zod` |

```sh
pnpm add react alova mathjs vite zod
```

## Core patterns

### Use the subpath that owns the capability

| Import | Contents |
| --- | --- |
| `@pawover/kit` | Only the core utility classes re-exported from `@pawover/kit-utils` |
| `@pawover/kit/utils` | Core static utility classes (`ArrayUtil`, `TypeUtil`, `TreeUtil`, …) |
| `@pawover/kit/utils/math` | `MathUtil` (alias: `@pawover/kit/math`) |
| `@pawover/kit/utils/vite` | `ViteUtil` (alias: `@pawover/kit/vite`) |
| `@pawover/kit/types` | Type utilities such as `AnyObject`, `PlainObject`, `TreeLike` |
| `@pawover/kit/types/react` | `Props`, `PropsWithChildren`, `PropsWithRef` |
| `@pawover/kit/types/global` | Type-only ambient entry; configure it in `tsconfig.types` |
| `@pawover/kit/types/react/global` | Type-only React ambient entry; configure it in `tsconfig.types` |
| `@pawover/kit/hooks/react` | React hooks |
| `@pawover/kit/hooks/alova` | Alova hooks |
| `@pawover/kit/eslint-rules` | ESLint flat config preset |
| `@pawover/kit/zod` | Prebuilt Zod v4 schemas |

```ts
import { TypeUtil, TreeUtil } from "@pawover/kit/utils";
import { useMount } from "@pawover/kit/hooks/react";
import { useAlovaRequest } from "@pawover/kit/hooks/alova";
import type { AnyObject } from "@pawover/kit/types";
import pawover from "@pawover/kit/eslint-rules";
import { id } from "@pawover/kit/zod";

const value: AnyObject = { enabled: true };
TypeUtil.isBoolean(value.enabled);
TreeUtil.rowsToTree([{ id: 1, parentId: null }]);
```

### Prefer root subpaths in applications, subpackages in libraries

Applications that install `@pawover/kit` should use `@pawover/kit/*` for a
single, consistent dependency. Libraries that want to expose only one
capability should depend on and import the standalone package, for example
`@pawover/kit-utils`, so consumers do not install unrelated packages.

```ts
// Application
import { ArrayUtil as RootArrayUtil } from "@pawover/kit/utils";

// Standalone subpackage
import { ArrayUtil as PackageArrayUtil } from "@pawover/kit-utils";
```

### Global type entries are configured, not imported

`@pawover/kit/types/global` and `@pawover/kit/types/react/global` are type-only
entries. Add them to `compilerOptions.types`; do not write a runtime `import`.

```json
{
  "compilerOptions": {
    "types": ["@pawover/kit-types/global", "@pawover/kit-types/react/global"]
  }
}
```

The React global entry requires `react` and `@types/react` in the consuming
project.

### ESM and CJS

Most packages publish both ESM and CJS. `@pawover/kit-eslint-rules` is ESM-only;
CommonJS consumers load it through Node's `require(esm)` support. Use `import`
in new code unless the surrounding tool requires `require`.

## Common mistakes

### Importing hooks from `@pawover/kit/hooks`

`@pawover/kit-hooks` has an empty root export. The following does not provide any
hook:

```ts no-check
import { useMount } from "@pawover/kit/hooks";
```

Use the concrete subpaths instead:

```ts
import { useMount } from "@pawover/kit/hooks/react";
import { useAlovaRequest } from "@pawover/kit/hooks/alova";
```

### Expecting the root `.` entry to export everything

The root entry only re-exports `@pawover/kit-utils`. `id`, `pawover`, `useMount`,
and `AnyObject` must come from their subpaths:

```ts no-check
import { id, pawover, useMount } from "@pawover/kit";
```

Use:

```ts
import { id } from "@pawover/kit/zod";
import pawover from "@pawover/kit/eslint-rules";
import { useMount } from "@pawover/kit/hooks/react";
```

### Importing `MathUtil` or `ViteUtil` from the core utils entry

`@pawover/kit/utils` and `@pawover/kit-utils` expose the core classes only.
`MathUtil` and `ViteUtil` live in their own entries because their peers are
optional:

```ts no-check
import { MathUtil } from "@pawover/kit/utils";
```

Use:

```ts
import { MathUtil } from "@pawover/kit/utils/math";
import { ViteUtil } from "@pawover/kit/utils/vite";
```

### Forgetting an optional peer

The package cannot resolve `alova`, `react`, `mathjs`, `vite`, or `zod` unless
the consuming project installs the peer for the feature it uses. A missing peer
fails when the corresponding module is loaded, not when `@pawover/kit` is
installed.

## Completion

- Every import uses a path that exists in the table above.
- The peers for each imported capability are installed.
- Global type entries, when used, appear in `compilerOptions.types` rather than
  in an `import` statement.
- The application builds without resolving `@pawover/kit/hooks` or a missing
  optional peer.
