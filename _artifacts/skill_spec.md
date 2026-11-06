# @pawover/kit skill spec

`@pawover/kit` is a TypeScript utility monorepo. Five published packages cover
type utilities, static utilities, React/Alova hooks, an ESLint flat config
preset, and Zod schemas; the root package re-exports the core utilities. The
skills in this batch teach package selection, common API usage, and the
non-obvious failure modes that are not visible from the type signatures alone.

## Domains

| Domain | Description | Skills |
| --- | --- | --- |
| `overview` | Package selection, subpaths, optional peers | `kit` |
| `types` | Type-level utilities and ambient entries | `types` |
| `utils` | Static utility classes and domain helpers | `utils` |
| `hooks` | React lifecycle/responsive/title hooks and Alova request hooks | `react-hooks`, `alova-hooks` |
| `eslint` | Flat config preset, groups, overrides, compiler switch | `eslint-preset` |
| `zod` | Prebuilt Zod v4 schemas | `zod-schemas` |

## Skill inventory

| Skill | Type | Package | What it covers | Failure modes |
| --- | --- | --- | --- | --- |
| `kit` | lifecycle | `@pawover/kit` | Root vs subpackage imports, subpath map, optional peers, global type entries, ESM/CJS | 4 |
| `types` | core | `@pawover/kit-types` | `AnyObject`, `PlainObject`, tree types, function types, `AdvancedRecord`, `ApiNameCheck`, React props, global entries | 4 |
| `utils` | core | `@pawover/kit-utils` | `ArrayUtil`, `StringUtil`, `ObjectUtil`, `TreeUtil`, `TypeUtil`, `ValidateUtil`, specialized classes | 6 |
| `react-hooks` | framework | `@pawover/kit-hooks` | `useMount`, `useUnmount`, `useLatest`, `useResponsive`, `useTitle` | 4 |
| `alova-hooks` | framework | `@pawover/kit-hooks` | `useAlovaRequest`, `useAlovaPagination`, `useAlovaWatcher`, lifecycle callbacks, `immediate` defaults | 3 |
| `eslint-preset` | core | `@pawover/kit-eslint-rules` | Factory, group options, group/layer overrides, React Compiler switch, Vue parser, globs | 4 |
| `zod-schemas` | core | `@pawover/kit-zod` | Ids, scalar schemas, nullable variants, object records | 3 |

## Failure mode inventory

| Skill | Count | Highest-priority examples |
| --- | --- | --- |
| `kit` | 4 | Empty hooks root; root entry only re-exports utils; `MathUtil`/`ViteUtil` subpaths; missing peers |
| `types` | 4 | Runtime import of a type-only package; required `TreeLike` children; global entries imported instead of configured; callback ref with `PropsWithRef` |
| `utils` | 6 | `merge` matcher append assumption; rejected tree parent; `find` mutation; `isChineseID` checksum assumption; `MathUtil` subpath; static class instantiation |
| `react-hooks` | 4 | Async `useMount` cleanup; SSR `useResponsive`; `useLatest` re-render assumption; multiple `useTitle` instances |
| `alova-hooks` | 3 | Watcher `immediate`; pagination `onPageChange`; missing `alova`/`react` peers |
| `eslint-preset` | 4 | `javascript` switch; factory `ignores`/`renamePlugins`; manual upstream plugins; React type-aware without TypeScript |
| `zod-schemas` | 3 | `AllowEmpty` naming; `id` domain; `empty` meaning |

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
    peers, APIs, and developer tasks.
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

### Existing executable evidence

The skills reuse the repository's existing tests rather than duplicating them:

| Skill | Existing evidence |
| --- | --- |
| `kit` | `test/integration/exports/rootExports.test.ts` |
| `types` | `test/types/types/typesApi.test.type.ts`, `test/types/types/globalTypes.test.type.ts`, `test/scripts/globalTypes.ts` |
| `utils` | `test/unit/utils/*.test.ts`, `test/types/utils/utilsApi.test.type.ts` |
| `react-hooks` | `test/unit/hooks/react/*.test.tsx`, `test/types/hooks/hooksReactApi.test.type.ts` |
| `alova-hooks` | `test/unit/hooks/alova/*.test.ts(x)` |
| `eslint-preset` | `test/unit/eslint-rules/eslintRules.test.ts`, `test/types/eslint-rules/eslintRulesApi.test.type.ts` |
| `zod-schemas` | `test/unit/zod/*.test.ts`, `test/types/zod/zodApi.test.type.ts` |

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
