# Preset options and layers

This reference lists the generated layers, the option shapes, and the glob
constants. Use it when a layer name or option boundary is not obvious from the
main skill.

## Generated layer names

The factory emits layers in this order when the corresponding group is enabled:

| Layer name                             | Contents                                                                                                                                                                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pawover/ignores`                      | The `GLOB_EXCLUDE` ignore list.                                                                                                                                                                                                       |
| `pawover/javascript/parser`            | JavaScript parser settings (`ecmaVersion: "latest"`, `sourceType: "module"`, JSX enabled).                                                                                                                                            |
| `pawover/javascript/rules`             | JavaScript rule map and `javascript.overrides`.                                                                                                                                                                                       |
| `pawover/typescript/setup`             | Registers the `ts` plugin.                                                                                                                                                                                                            |
| `pawover/typescript/parser`            | TypeScript parser with `projectService: true`, `typescript.parserOptions`, and the preset-merged `extraFileExtensions` (`.vue` appended and de-duplicated only when `vue` is enabled; user value passed through unchanged otherwise). |
| `pawover/typescript/rules`             | TypeScript rule map and `typescript.overrides`.                                                                                                                                                                                       |
| `pawover/typescript/type-aware`        | `typescript.overridesTypeAware` on `filesTypeAware`.                                                                                                                                                                                  |
| `pawover/stylistic/setup` / `rules`    | Registers the `stylistic` plugin and applies its rules. `stylistic.overrides` is merged last; style shortcut keys (`quotes` / `semi`) compile into rule overrides between the rule map default and `overrides`.                       |
| `pawover/antfu/setup` / `rules`        | Registers the `antfu` plugin and applies its rules.                                                                                                                                                                                   |
| `pawover/imports/setup` / `rules`      | Registers the `imports` plugin and applies its rules.                                                                                                                                                                                 |
| `pawover/imports-sort/setup` / `rules` | Registers the `importsSort` plugin and applies its rules.                                                                                                                                                                             |
| `pawover/react/setup`                  | Registers `react` and `react-hooks` (or the no-op `react` implementation without TypeScript).                                                                                                                                         |
| `pawover/react/rules`                  | React base rules, hooks rules, compiler switch, and `react.overrides`.                                                                                                                                                                |
| `pawover/react/type-aware`             | React type-aware rules and `react.overridesTypeAware`.                                                                                                                                                                                |
| `pawover/vue/setup`                    | Registers the `vue` plugin.                                                                                                                                                                                                           |
| `pawover/vue/parser`                   | `vue-eslint-parser` with the `vue/vue` processor (consumes `vue/comment-directive` `clear` messages; without it each `clear` surfaces as an error), optionally delegating `<script>` to the TypeScript parser.                        |
| `pawover/vue/rules`                    | Vue rule map and `vue.overrides`. Style shortcut keys (`naming` / `templateNaming` / `attributeNaming` / `eventNaming`) compile into rule overrides between the rule map default and `overrides`.                                     |

Group names in layer names use kebab-case: `importsSort` becomes
`imports-sort`.

## Option shapes

```ts
import type { PawoverOptions } from "@pawover/kit-eslint-rules";

const options: PawoverOptions = {
  javascript: { overrides: { "no-console": "error" } },
  typescript: {
    overrides: { "ts/consistent-type-definitions": ["error", "interface"] },
    overridesTypeAware: { "ts/no-unsafe-assignment": "warn" },
    filesTypeAware: ["**/*.{ts,tsx}"],
    parserOptions: { tsconfigRootDir: "/repo" },
  },
  stylistic: { quotes: "single", semi: false },
  antfu: true,
  imports: true,
  importsSort: true,
  react: {
    compiler: "latest",
    overrides: { "react/no-implicit-key": "warn" },
    overridesTypeAware: { "react/no-unused-props": "off" },
  },
  vue: {
    naming: "kebab-case",
    templateNaming: "PascalCase",
    overrides: { "vue/multi-word-component-names": "off" },
  },
};
```

`javascript` is always enabled; its option only accepts overrides. All other
groups accept `true` or an options object. Each group's `overrides` is merged
into that group's rule map at generation time.

## Style quick switches

`stylistic` and `vue` options accept shortcut keys that compile into rule
overrides at assembly time. The precedence is
`overrides` > per-item shortcut > group shortcut > rule map default.

**`StylisticOptions`**:

- `quotes?: "single" | "double"` — toggles `stylistic/quotes` and
  `stylistic/jsx-quotes` in tandem (`single` → `prefer-single`,
  `double` → `prefer-double`). Does not inject `allowTemplateLiterals`.
- `semi?: boolean` — toggles `stylistic/semi`; when `false`, additionally
  rewrites `stylistic/member-delimiter-style` (multiline:
  `delimiter: "none"`, `requireLast: false`; singleline:
  `delimiter: "comma"`).

The two keys only affect the rules they explicitly own. Rules that are **not**
touched: `semi-spacing`, `semi-style`, `no-extra-semi`, `quote-props`, and
`vue/html-quotes` (HTML attribute quotes stay at `double` regardless of the
switch).

**`VueOptions`**:

- `naming?: "PascalCase" | "camelCase" | "kebab-case"` — one-shot setter for
  `vue/component-name-in-template-casing`, `vue/attribute-hyphenation`, and
  `vue/v-on-event-hyphenation`.
- `templateNaming?` / `attributeNaming?` / `eventNaming?` — per-item
  overrides; each takes precedence over `naming` for its own rule.

Both shortcut sets remain fully compatible with the existing `{ overrides }`
shape.

## Glob constants

| Constant          | Value                              | Meaning                                                                                     |
| ----------------- | ---------------------------------- | ------------------------------------------------------------------------------------------- |
| `GLOB_SOURCE`     | `["**/*.{js,cjs,mjs,jsx,ts,tsx}"]` | All source files. Append `GLOB_VUE` when customizing Vue sources.                           |
| `GLOB_TYPESCRIPT` | `["**/*.{ts,tsx}"]`                | TypeScript files; default for type-aware layers.                                            |
| `GLOB_JSX`        | `"**/*.jsx"`                       | JSX files; added to React's type-aware range.                                               |
| `GLOB_VUE`        | `"**/*.vue"`                       | Vue single-file components.                                                                 |
| `GLOB_EXCLUDE`    | Array of ignore globs              | Dependencies, build outputs, lockfiles, caches, editor directories, generated declarations. |

## React Compiler switch

The switch covers ten rules that exist in both `@eslint-react` and
`eslint-plugin-react-hooks`:

`error-boundaries`, `globals`, `immutability`, `purity`, `refs`,
`set-state-in-effect`, `set-state-in-render`, `static-components`,
`unsupported-syntax`, `use-memo`.

When enabled, the `@eslint-react` equivalents are set to `0` and the
`react-hooks` implementations are enabled at the level from the official
`recommended` preset. It also disables `react/no-unstable-context-value`.
`compiler: "latest"` adds the experimental `react-hooks/void-use-memo`.

`compiler: false` turns off the ten `react-hooks` compiler rules and leaves the
`@eslint-react` implementations in place. The official-only rules (`config`,
`gating`, `incompatible-library`, `preserve-manual-memoization`) remain from
`react-hooks` in all modes.

## Composer operations

The returned value is a `FlatConfigComposer` and inherits `Promise`. Useful
methods:

```ts
import pawover from "@pawover/kit-eslint-rules";

const config = pawover({ typescript: true })
  .append({ rules: { "no-console": "error" } })
  .prepend({ files: ["**/*.ts"], rules: { "no-console": "warn" } })
  .override("pawover/typescript/rules", {
    rules: { "ts/consistent-type-definitions": ["error", "interface"] },
  })
  .renamePlugins({ ts: "typescript" });
```

`append` and `prepend` accept a config, an array, a composer, or a Promise of an
array. `override` targets a layer by its generated name. `renamePlugins` renames
matching plugin keys and rule prefixes across all configurations in the
composer.

## Common option mistakes

- `javascript` is not a boolean switch; passing `true` is not meaningful.
- `filesTypeAware` only accepts `string[]`; a single glob string is invalid.
- `parserOptions` is shallow-merged, so nested objects are replaced rather than
  deep-merged — except `extraFileExtensions`, which is de-duplicated and merged
  with the preset's required entries (`.vue` when `vue` is enabled) instead of
  being overwritten. Without `vue`, the user value is passed through unchanged.
  De-duplication uses strict string equality: `.Vue` and `.vue` are treated as
  distinct entries — normalize casing yourself before passing the array.
- `ignores` and `renamePlugins` are composer concerns, not factory options.
- `react.compiler` accepts `true`, `false`, `"recommended"`, or `"latest"`.
- A custom plugin layer must register the plugin before using its rules; the
  preset's setup layers only cover the preset's own plugins.
