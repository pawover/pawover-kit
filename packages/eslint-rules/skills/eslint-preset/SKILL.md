---
name: eslint-preset
description: >-
  Use when configuring ESLint flat config with @pawover/kit-eslint-rules,
  including enabling TypeScript, React, Vue, stylistic, antfu, imports, or
  importsSort groups; overriding rules per group or per layer; and handling React
  Compiler rules.
metadata:
  purpose: Configure ESLint flat config with the self-contained
    @pawover/kit-eslint-rules preset.
  type: core
  library: "@pawover/kit-eslint-rules"
  library_version: "0.2.0-alpha.1"
sources:
  - src/index.ts
  - src/config.ts
  - src/globs.ts
  - src/globExclude.ts
  - src/reactCompiler.ts
  - src/core.javascript.ts
  - src/core.typescript.ts
  - src/core.react.ts
  - src/core.vue.ts
---

# Configure `@pawover/kit-eslint-rules`

The package is a self-contained ESLint flat config preset. Every upstream plugin
it uses is a dependency and is registered by the factory; do not install or
register the preset's plugins manually.

The default export is `pawover(options?, ...userConfigs)`. It returns an
`eslint-flat-config-utils` `FlatConfigComposer`, which extends `Promise` and can
be exported directly from `eslint.config.js`.

## Setup

```ts
// eslint.config.js
import pawover from "@pawover/kit-eslint-rules";

export default pawover();
```

With no options, the preset returns the global ignore layer, the JavaScript
parser layer, and the JavaScript rules layer. `javascript` is always enabled.
Every other group is opt-in.

```ts
// eslint.config.js
import pawover from "@pawover/kit-eslint-rules";

const fullConfig = pawover({
  typescript: true,
  stylistic: true,
  antfu: true,
  imports: true,
  importsSort: true,
  react: true,
});
```

## Core patterns

### Enable the groups the project needs

| Option | Enables | Files |
| --- | --- | --- |
| `typescript` | TypeScript plugin, parser, and rules | `**/*.{ts,tsx}`; adds `*.vue` when `vue` is enabled |
| `stylistic` | Stylistic rules | source files |
| `antfu` | `eslint-plugin-antfu` rules | source files |
| `imports` | `eslint-plugin-import-lite` rules | source files |
| `importsSort` | `eslint-plugin-simple-import-sort` rules | source files |
| `react` | `@eslint-react` + `eslint-plugin-react-hooks` | source files; type-aware rules also cover `*.jsx` |
| `vue` | Vue parser and rules | `**/*.vue` |

`typescript` defaults the parser to `projectService: true`. Pass parser options
to match the project:

```ts
// eslint.config.js
import pawover from "@pawover/kit-eslint-rules";

const parserConfig = pawover({
  typescript: {
    parserOptions: { tsconfigRootDir: process.cwd() },
  },
});
```

The passed `parserOptions` are shallow-merged over the defaults; a same-named key
wins. Use `filesTypeAware` to narrow the type-aware file range; the default is
`GLOB_TYPESCRIPT` (`**/*.{ts,tsx}`).

### Override rules at the group level

Every group accepts `{ overrides }`. The override is merged into the preset's
rule map at generation time, so it inherits the group's file range and plugin
registration. This avoids the flat-config plugin-scope problem that occurs when
a later config layer uses a rule without registering its plugin.

```ts
// eslint.config.js
import pawover from "@pawover/kit-eslint-rules";

const overrideConfig = pawover({
  typescript: {
    overrides: {
      "ts/strict-void-return": [1, { allowReturnAny: true }],
    },
  },
  react: {
    overrides: {
      "react/no-implicit-key": "warn",
    },
  },
});
```

Type-aware rules use `overridesTypeAware`. They only apply inside
`filesTypeAware`; React's type-aware layer also includes `GLOB_JSX`:

```ts
import pawover, { GLOB_TYPESCRIPT } from "@pawover/kit-eslint-rules";

const typeAwareConfig = pawover({
  typescript: {
    filesTypeAware: GLOB_TYPESCRIPT,
    overridesTypeAware: {
      "ts/no-unsafe-assignment": "warn",
    },
  },
});
```

### Control React Compiler rules

When `react` is enabled, the preset switches ten overlapping rules from
`@eslint-react` to the official `eslint-plugin-react-hooks` implementations and
turns off the `@eslint-react` equivalents. This avoids duplicate diagnostics and
also disables `react/no-unstable-context-value` because React Compiler memoizes
context values.

```ts
// Default: official recommended Compiler rules
const recommendedConfig = pawover({ typescript: true, react: true });

// Keep the @eslint-react implementations instead
const legacyConfig = pawover({ typescript: true, react: { compiler: false } });

// Add the experimental void-use-memo rule
const latestConfig = pawover({ typescript: true, react: { compiler: "latest" } });
```

`react.overrides` is applied last, so it can override any switched rule. The
official-only `config`, `gating`, `incompatible-library`, and
`preserve-manual-memoization` rules are always provided by `react-hooks`.

Without `typescript`, the React group disables the type-aware rules and registers
a no-op plugin implementation. A later override that forces one of those rules
on will not throw "requires type information". With `typescript` enabled, the
type-aware rules apply to `filesTypeAware` plus `*.jsx`; the `.jsx` type
availability still depends on the project's `tsconfig` `include` / `allowJs`.

### Override a specific generated layer

Each layer has a unique name. Use the composer's `override(name, config)` to
target it precisely:

```ts
import pawover from "@pawover/kit-eslint-rules";

const layerConfig = pawover({ typescript: true }).override(
  "pawover/typescript/rules",
  {
    rules: {
      "ts/consistent-type-definitions": ["error", "interface"],
    },
  },
);
```

Layer names are `pawover/<group>/<setup|parser|rules|type-aware>`; group names use
kebab-case (`importsSort` → `imports-sort`). The global ignore layer is
`pawover/ignores`. See
[the options reference](references/options.md) for the complete layer list.

### Append or prepend your own config

The second and later arguments are appended as flat configs. They can be a
single object, an array, a composer, or a Promise of an array. You can also use
the composer methods directly.

```ts
import pawover from "@pawover/kit-eslint-rules";

const appendedConfig = pawover(
  { typescript: true },
  { rules: { "no-console": "error" } },
);

// Equivalent composition style
const composerConfig = pawover({ typescript: true }).append({
  rules: { "no-console": "error" },
});
```

### Use the exported glob constants

`GLOB_SOURCE`, `GLOB_TYPESCRIPT`, `GLOB_JSX`, `GLOB_VUE`, and `GLOB_EXCLUDE` are
available for custom layers and overrides.

```ts
import pawover, { GLOB_JSX, GLOB_TYPESCRIPT } from "@pawover/kit-eslint-rules";

const globConfig = pawover({ typescript: true }).append({
  files: [...GLOB_TYPESCRIPT, GLOB_JSX],
  rules: {
    "no-console": "warn",
  },
});
```

`GLOB_EXCLUDE` already covers dependency directories, build outputs, lockfiles,
editor directories, caches, and generated declaration files. Extend ignores by
appending a layer or overriding `pawover/ignores`; the factory does not accept an
`ignores` option.

## Common mistakes

### Passing `javascript: true`

The JavaScript group is always on and is not a switch. Use its option object only
for overrides:

```ts no-check
pawover({ javascript: true }); // javascript is always enabled
```

```ts
pawover({ javascript: { overrides: { "no-console": "error" } } });
```

### Passing `ignores` or `renamePlugins` to the factory

The factory does not accept these options. Append a config layer for ignores, or
use the composer's `.renamePlugins()`:

```ts no-check
pawover({ ignores: ["dist/**"] });
pawover({ renamePlugins: { ts: "typescript" } });
```

Use:

```ts
import pawover from "@pawover/kit-eslint-rules";

const customConfig = pawover({ typescript: true })
  .append({ ignores: ["dist/**"] })
  .renamePlugins({ ts: "typescript" });
```

### Installing the preset's plugins manually

The preset is self-contained. Installing `@eslint-react`, `typescript-eslint`,
`eslint-plugin-vue`, and the rest separately can produce a second copy or a
different version than the one the preset registers. Install only
`@pawover/kit-eslint-rules` (plus ESLint itself), then add custom plugins in your
own config layer when needed.

### Enabling React type-aware rules without TypeScript

The React group only enables type-aware rules when `typescript` is also enabled.
Without it, the preset registers no-op implementations so forced rules do not
throw. If the project needs those checks, enable `typescript` and ensure the
files are covered by the project's `tsconfig`.

### Assuming `.jsx` is type-aware in a TS project

React's type-aware range adds `*.jsx`, but TypeScript only has type information
for those files when the project's `tsconfig` includes them and `allowJs` allows
them. Files outside the project are reported as "not in the project".

## Completion

- `pawover()` is the default export of `eslint.config.js`.
- Only the needed groups are enabled; `javascript` is left implicit.
- Group overrides use `overrides` / `overridesTypeAware`, not a separate layer
  that lacks plugin registration.
- Layer overrides use the exact generated layer name.
- The project does not install the preset's upstream plugins separately.
- The config runs with the project's package manager and the ESLint version the
  preset supports.
