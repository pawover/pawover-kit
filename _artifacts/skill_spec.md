# @pawover/kit skill spec

`@pawover/kit` is a TypeScript utility monorepo. Five published packages cover
type utilities, static utilities, React/Alova hooks, an ESLint flat config
preset, and Zod schemas; the root package re-exports the core utilities. The
skills in this batch teach package selection, common API usage, and the
non-obvious failure modes that are not visible from the type signatures alone.

## Domains

| Domain     | Description                                                    | Skills                       |
| ---------- | -------------------------------------------------------------- | ---------------------------- |
| `overview` | Package selection, subpaths, optional peers                    | `kit`                        |
| `types`    | Type-level utilities and ambient entries                       | `types`                      |
| `utils`    | Static utility classes and domain helpers                      | `utils`                      |
| `hooks`    | React lifecycle/responsive/title hooks and Alova request hooks | `react-hooks`, `alova-hooks` |
| `eslint`   | Flat config preset, groups, overrides, compiler switch         | `eslint-preset`              |
| `zod`      | Prebuilt Zod v4 schemas                                        | `zod-schemas`                |

## Skill inventory

| Skill           | Type      | Package                     | What it covers                                                                                                                                                                                                       | Failure modes |
| --------------- | --------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `kit`           | lifecycle | `@pawover/kit`              | Root vs subpackage imports, subpath map, optional peers, global type entries, ESM/CJS                                                                                                                                | 4             |
| `types`         | core      | `@pawover/kit-types`        | `AnyObject`, `PlainObject`, tree types, function types, `AdvancedRecord`, `ApiNameCheck`, React props, global entries                                                                                                | 4             |
| `utils`         | core      | `@pawover/kit-utils`        | `ArrayUtil`, `StringUtil`, `ObjectUtil`, `TreeUtil`, `TypeUtil`, `ValidateUtil`, specialized classes                                                                                                                 | 6             |
| `react-hooks`   | framework | `@pawover/kit-hooks`        | `useMount`, `useUnmount`, `useLatest`, `useResponsive`, `useTitle`                                                                                                                                                   | 4             |
| `alova-hooks`   | framework | `@pawover/kit-hooks`        | `useAlovaRequest`, `useAlovaPagination`, `useAlovaWatcher`, lifecycle callbacks, `immediate` defaults                                                                                                                | 3             |
| `eslint-preset` | core      | `@pawover/kit-eslint-rules` | Factory, group options, group/layer overrides, React Compiler switch, Vue parser, globs, style quick switches (`resolveStylisticShortcuts` / `resolveVueNamingShortcuts` / `mergeGroupOverrides` in `src/config.ts`) | 5             |
| `zod-schemas`   | core      | `@pawover/kit-zod`          | Ids, scalar schemas, nullable variants, object records                                                                                                                                                               | 3             |

## Failure mode inventory

| Skill           | Count | Highest-priority examples                                                                                                                                    |
| --------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `kit`           | 4     | Empty hooks root; root entry only re-exports utils; `MathUtil`/`ViteUtil` subpaths; missing peers                                                            |
| `types`         | 4     | Runtime import of a type-only package; required `TreeLike` children; global entries imported instead of configured; callback ref with `PropsWithRef`         |
| `utils`         | 6     | `merge` matcher append assumption; rejected tree parent; `find` mutation; `isChineseID` checksum assumption; `MathUtil` subpath; static class instantiation  |
| `react-hooks`   | 4     | Async `useMount` cleanup; SSR `useResponsive`; `useLatest` re-render assumption; multiple `useTitle` instances                                               |
| `alova-hooks`   | 3     | Watcher `immediate`; pagination `onPageChange`; missing `alova` peer or `statesHook`                                                                         |
| `eslint-preset` | 5     | `javascript` switch; factory `ignores`/`renamePlugins`; manual upstream plugins; React type-aware without TypeScript; quick switch precedence vs `overrides` |
| `zod-schemas`   | 3     | `AllowEmpty` naming; `id` domain; `empty` meaning                                                                                                            |

## Tensions and cross-references

- **Aggregate vs standalone**: the aggregate package is convenient, but its
  root entry only exposes utils. Applications use root subpaths; libraries may
  depend on one standalone package.
- **Nullable vs empty-string**: `stringAllowEmpty` is about `null`/`undefined`;
  `stringEmpty` is the literal empty string.
- **Root vs package-owned skills**: `kit` is a repository-level discovery skill;
  every API skill lives beside its owning package so it ships with that package.

## Coverage and batch history

### 2026-11-06 — Initial batch (all published packages)

- Scope: all five published packages plus the root aggregate package. Seven
  skills authored, no planned or retired skills.
- Placement: `skills/kit` at the repository root; `packages/<pkg>/skills/<name>`
  for the five packages. `_artifacts/` remains the single shared planning
  record.
- Distribution: package-only (default). No Claude/Cursor plugin manifests or
  marketplace entries were selected. Consumers discover the skills through
  their installed packages.
- Language: activation descriptions and bodies are written in English so the
  guidance is usable by agents outside this Chinese-first repository; API names
  and source evidence remain unchanged.
- Dense API surfaces: `utils` uses three references instead of one large
  `SKILL.md`; `types` uses one reference for the ambient global entries;
  `eslint-preset` uses one reference for the full option and layer table.
- Version claims: root `1.3.0-alpha.1`; `types` `0.1.0`; `utils` `1.0.1`;
  `hooks` `0.0.9`; `eslint-rules` `0.2.0-alpha.1`; `zod` `0.0.4`.
- Source evidence: package source, package manifests, `entry/`, `site/guide/`,
  `site/examples/`, unit tests under `test/unit/`, and type tests under
  `test/types/`.
- Consequential decisions:
  - Split hooks into `react-hooks` and `alova-hooks` because they have different
    peers, APIs, and developer tasks; `alova-hooks` is framework-agnostic and
    takes its framework from the Alova instance's `statesHook`.
  - Keep one `utils` skill instead of one per class; the classes are commonly
    used together and share static-class and nullish conventions.
  - Document `createBeforeRequestMiddleware` as internal and direct consumers to
    the public `onBeforeRequest` option; the package entry does not export the
    helper.
  - Document pagination with `update({ page })` because Alova 3.5.5 does not
    expose `onPageChange`.
  - Treat `isChineseID` as a format/birthday check, not a checksum proof.
  - Document `useResponsive` as client-only because it reads `window.innerWidth`
    during render.
- Checks run during authoring:
  - `pnpm exec intent validate` — passed for all 7 skills after the final
    version-label correction.
  - `pnpm exec intent maintainer sync` — synchronized six package manifests and
    the skill tree.
  - `pnpm test` — 33 test files and 910 tests passed.
  - `pnpm test:types` — passed.
  - `pnpm check:types` — passed for the root project and all six package
    projects.
  - `pnpm test:ci` — passed end to end: type checks, 910 tests, build, smoke
    imports, global-type consumer checks, and pack checks. The packed tarballs
    include each package's `skills/` directory.
  - `pnpm check:format` — all JSON files unchanged.
  - `intent maintainer review --record` — initial eight items and the follow-up
    documentation corrections were recorded; `intent maintainer check` reports
    0 pending review items.
- Checks not yet run or not available:
  - No isolated fresh-consumer session was run. Consumer activation is therefore
    unverified; the structural validation and existing unit/type tests are the
    current evidence.

### 2026-11-23 — `CurrencyUtil` formatting helpers (T1 phase 1)

- Scope: `CurrencyUtil` gains `numberFormat`, `moneyFormat`, `resolveSymbol`,
  and `compactNumberFormat`; no other class or package changed.
- Guidance: `packages/utils/skills/utils/references/specialized.md` now covers
  the four methods, the `locale` / `emptyText` options (including
  `resolveSymbol(currency, locale?)` and the `CURRENCY_ENUM` / `en-US`
  fallback), the `Intl`-only
  dependency, `moneyFormat`'s `signPlacement` minus-sign behavior, and the
  `compactNumberFormat` naming caveat (fraction trimming, not compact notation).
  `_artifacts/domain_map.yaml` records the new coverage and two user-facing
  failure modes (locale does not localize the symbol; compact naming).
- Source evidence: `packages/utils/src/currency/currencyUtil.ts`,
  `packages/utils/src/currency/index.type.ts`,
  `test/unit/utils/currencyUtil.test.ts`,
  `test/types/utils/utilsApi.test.type.ts`.
- Maintainer decision: `MathUtil.round` is not part of this batch, so G11
  rounding stays with the CRM consumer and the skill documents no rounding
  helper.
- Version claims: root `1.4.0`; `utils` `1.1.0` (stable baseline restored before
  the `1.4.1-alpha.0` republish).
- Checks: unit and type tests plus `pnpm check:skills`; see the T1 phase 1
  delivery record for exact results.

### 2026-11-23 — `CurrencyUtil` phase 2 (integer, percent, trailing-zero, percent conversion)

- Scope: `CurrencyUtil.integerFormat` / `percentFormat` / `trailingZeroTrim`,
  `MathUtil.toPercent` / `fromPercent`, and `TypeUtil.isFiniteNumber`; the
  phase-1 formatters and `resolveSymbol(currency, locale?)` are unchanged.
  `trailingZeroTrim` was later folded into `numberFormat` in phase 3.
- Guidance: `references/specialized.md` documents the phase-2 helpers and the
  percent conversions (fixed precision, `0`–`20` clamp, nullish → `null`),
  `integerFormat`'s `Math.round` semantics with negative zero formatted as
  zero, and `percentFormat`'s locale-driven sign and spacing. `SKILL.md` adds
  `TypeUtil.isFiniteNumber` as the guard before numeric formatting or
  arithmetic.
- Source evidence: `packages/utils/src/currency/currencyUtil.ts`,
  `packages/utils/src/math/mathUtil.ts`,
  `packages/utils/src/type/typeUtil.ts`,
  `test/unit/utils/{currencyUtil,mathUtil,typeUtil}.test.ts`.
- Shared constant: `MAX_FRACTION_DIGITS` (`currencyUtil.ts`) and
  `MAX_PRECISION` (`mathUtil.ts`) both clamp to `20`; their comments
  cross-reference each other to prevent drift.
- Checks: `pnpm vitest run` on the three unit files — 324 passed; `pnpm
  check:skills` after recording.

### 2026-11-23 — `CurrencyUtil` phase 3 (merged helpers, `percentText`, `moneyFormat` signs)

- Scope: `compactNumberFormat` and `trailingZeroTrim` were folded into
  `numberFormat` fraction options and removed as separate entries; `percentText`
  added; `moneyFormat` gains `signDisplay` and `minusSign` (G9). Six public
  format entries remain: `numberFormat`, `moneyFormat`, `resolveSymbol`,
  `integerFormat`, `percentFormat`, `percentText`.
- Guidance: `references/specialized.md` lists the six entries, gives the
  `numberFormat` equivalents for compact and trailing-zero output,
  `percentText`'s positive-by-default and zero-sign behavior, and the
  signed-delta shape (`signDisplay: "always"`, `minusSign: "−"`,
  `signPlacement: "beforeSymbol"`, `spacing: "none"`).
- Source evidence: `packages/utils/src/currency/currencyUtil.ts`,
  `packages/utils/src/currency/index.type.ts`,
  `test/unit/utils/currencyUtil.test.ts`,
  `test/types/utils/utilsApi.test.type.ts`.
- Checks: `pnpm vitest run test/unit/utils/currencyUtil.test.ts — passed`;
  `pnpm check:skills` after recording.

### 2026-11-23 — utils fixes (scientific notation, percent grouping)

- Scope: `MathUtil.toBignumber` keeps scientific-notation values exact (numbers
  and numeric strings go straight to `bignumber`; dirty text such as
  `$1,234.56` still goes through `StringUtil.toNumber`), and `percentFormat` /
  `percentText` accept `useGrouping` (default `true`).
- Guidance: `references/specialized.md` documents both behaviors with examples
  (`toBignumber(math, "1e-7")` stays `1e-7`;
  `percentFormat(..., { useGrouping: false })` drops separators).
- Source evidence: `packages/utils/src/math/mathUtil.ts`,
  `packages/utils/src/currency/currencyUtil.ts`,
  `packages/utils/src/currency/index.type.ts`,
  `test/unit/utils/{mathUtil,currencyUtil}.test.ts`.
- Checks: `pnpm vitest run` on the two unit files — 131 passed;
  `pnpm check:skills` after recording.

### Existing executable evidence

The skills reuse the repository's existing tests rather than duplicating them:

| Skill           | Existing evidence                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| `kit`           | `test/integration/exports/rootExports.test.ts`                                                                       |
| `types`         | `test/types/types/typesApi.test.type.ts`, `test/types/types/globalTypes.test.type.ts`, `test/scripts/globalTypes.ts` |
| `utils`         | `test/unit/utils/*.test.ts`, `test/types/utils/utilsApi.test.type.ts`                                                |
| `react-hooks`   | `test/unit/hooks/react/*.test.tsx`, `test/types/hooks/hooksReactApi.test.type.ts`                                    |
| `alova-hooks`   | `test/unit/hooks/alova/*.test.ts(x)`                                                                                 |
| `eslint-preset` | `test/unit/eslint-rules/eslintRules.test.ts`, `test/types/eslint-rules/eslintRulesApi.test.type.ts`                  |
| `zod-schemas`   | `test/unit/zod/*.test.ts`, `test/types/zod/zodApi.test.type.ts`                                                      |

## Remaining work

- Fresh-consumer discovery and task execution remain unverified. If a disposable
  consumer project is available, install a packed package and run the
  representative tasks from `SKILL.md`.
- Consider dedicated reference files for the complete `I18nUtil` locale tables
  and `MimeUtil` MIME map only if consumers need to browse them; they are
  intentionally left as source pointers to avoid duplicating generated data.
- Consider repository distribution (Claude/Cursor plugin or GitHub installer)
  only if the maintainer wants pre-install discovery; the current batch is
  package-only.

### 2026-11-25 — `NumberUtil.clamp`, `ArrayUtil.uniqueBy`, `TreeUtil` prune / orphan

- Scope: `NumberUtil.clamp(value, [lower, upper])` bounds to a closed interval,
  validates its arguments like `within` (finite value, tuple of two finite
  numbers), and throws on reversed bounds; `ArrayUtil.uniqueBy(list, keyFn)`
  keeps the first item per key (`readonly` input, element-typed result, original
  input index); `TreeUtil.find` / `TreeUtil.forEach` accept `prune(row, meta)` to
  skip a subtree while still visiting the node, and it must be pure;
  `TreeUtil.rowsToTree` accepts `orphan` (`"promote"` default, `"drop"` discards
  missing-parent rows with their subtrees); `TreeUtil.treeToRows` options exclude
  `prune`, which is also ignored at runtime.
- Guidance: `references/specialized.md` holds the quick-reference table;
  `references/array-object-string.md` adds `uniqueBy` to the selection table;
  `references/tree.md` covers `prune`, `orphan`, and the `treeToRows` option
  set; `SKILL.md` mentions all three in its core patterns. Neither `orphan` mode
  emits a parent cycle.
- Source evidence: `packages/utils/src/number/numberUtil.ts`,
  `packages/utils/src/array/arrayUtil.ts`,
  `packages/utils/src/tree/{treeUtil,find,forEach,index.type}.ts`,
  `test/unit/utils/{numberUtil,arrayUtil,treeUtil}.test.ts`,
  `test/types/utils/utilsApi.test.type.ts`.
- Checks: `pnpm test:types`, `pnpm check:types:packages`, `pnpm test`,
  `pnpm test:coverage` after implementation; `pnpm check:skills` after recording.
