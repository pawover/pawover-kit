# Global type entries

The package has two ambient entries. They are consumed through
`compilerOptions.types`, not through an `import` statement.

## Configuration

Base types only:

```json
{
  "compilerOptions": {
    "types": ["@pawover/kit-types/global"]
  }
}
```

Base and React types:

```json
{
  "compilerOptions": {
    "types": [
      "@pawover/kit-types/global",
      "@pawover/kit-types/react/global"
    ]
  }
}
```

When the project installs the aggregate package, use the root subpaths instead:

```json
{
  "compilerOptions": {
    "types": [
      "@pawover/kit/types/global",
      "@pawover/kit/types/react/global"
    ]
  }
}
```

The React entry requires `react` and `@types/react` in the consuming project.

## Exposed names

`@pawover/kit-types/global` adds:

`Primitive`, `Nullish`, `AnyObject`, `PlainObject`, `TreeLike`,
`TreeLikeOptionalChildren`, `AnyFunction`, `AnyAsyncFunction`,
`AnyGeneratorFunction`, `AnyAsyncGeneratorFunction`, `IsPrimitive`,
`HasStringIndex`, `AdvancedRecordMode`, `AdvancedRecord`, `ApiNameCheck`.

`@pawover/kit-types/react/global` adds:

`Props`, `PropsWithChildren`, `PropsWithRef`.

After configuration, these names are available without an import:

```ts no-check
const object: AnyObject = { id: 1 };
const tree: TreeLike<{ id: number }> = { id: 1, children: [] };
const props: Props<{ title: string }> = { title: "Hello" };
```

Do not put `import type { AnyObject } from "@pawover/kit-types"` in the same
file unless the import is intentional; the module entry and the global entry
share names.

## How the entries are delivered

The global entries are hand-written `.d.ts` files. They use
`import type * as KitTypes from "./index.js"` and re-declare each type inside
`declare global`, so the signatures follow the module definitions. The build
copies the declarations into `dist/`; the package exports are type-only
subpaths.

This means:

- There is no runtime file to import.
- The declarations are not generated from the implementation at build time.
- The source `.d.ts` files are the single maintenance point.

## Verification

In this repository, the global entries are covered by:

```sh
pnpm test:types
pnpm test:global-types
```

`test:types` includes reverse type assertions for every global name.
`test:global-types` builds the package and compiles a consumer project that
uses the entries through `tsconfig.types`.

In a consuming project, verify by creating a file with a deliberate type error
against one of the globals and running `tsc --noEmit`. If the name is missing,
the error is "Cannot find name"; if the entry is configured correctly, the error
comes from the assigned value instead.

## Common mistakes

### Importing a global entry

`@pawover/kit-types/global` has no runtime export and no module value. An import
will not inject the declarations; use `tsconfig.types`.

### Adding `types` without keeping existing entries

Setting `compilerOptions.types` replaces the default automatic inclusion of
`@types/*` packages for that compilation. If the project relies on
`@types/node` or another ambient package, add it to the same array.

### Using global names in a library's public declarations

Global injection is convenient inside an application, but a published library
should usually import the types explicitly. This keeps the dependency visible
and avoids conflicts with a consumer's global names.

### Declaring a conflicting global

If the project or another package already declares `Props`, `AnyObject`, or a
similarly generic name, the declarations can merge or conflict. Prefer the
module entry in that case, or scope the global entry to a dedicated compilation.
