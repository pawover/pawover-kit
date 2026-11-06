---
name: types
description: >-
  Use when typing objects, recursive trees, function signatures, readonly React
  props, or global ambient types with @pawover/kit-types, including configuring
  tsconfig types for @pawover/kit-types/global and
  @pawover/kit-types/react/global.
metadata:
  purpose: Type common object, tree, function, and React prop shapes with
    @pawover/kit-types, including ambient global type entries.
  type: core
  library: "@pawover/kit-types"
  library_version: "0.1.0"
sources:
  - src/index.ts
  - src/base.ts
  - src/advancedRecord.ts
  - src/api.ts
  - src/react.ts
  - src/global.d.ts
  - src/react-global.d.ts
---

# Use `@pawover/kit-types`

`@pawover/kit-types` is a type-only package. It has no runtime exports, so every
import must use `import type` (or a type-only named import). The package exposes
a module entry, a React subpath, and two ambient global entries.

## Setup

```ts
import type {
  AdvancedRecord,
  AnyFunction,
  AnyObject,
  PlainObject,
  TreeLike,
  TreeLikeOptionalChildren,
} from "@pawover/kit-types";
```

For React props, import from the React subpath:

```ts
import type { Props, PropsWithChildren, PropsWithRef } from "@pawover/kit-types/react";
```

The aggregate package exposes the same entries at `@pawover/kit/types` and
`@pawover/kit/types/react`.

## Core patterns

### Choose `PlainObject` unless `any` is intentional

`AnyObject` is `Record<K, any>` and disables value checking. `PlainObject` is
`Record<K, unknown>` and forces a narrowing step before use. Prefer
`PlainObject` for API payloads and configuration objects.

```ts
import type { AnyObject, PlainObject } from "@pawover/kit-types";

const loose: AnyObject = { id: 1, name: "Ada" };
const safe: PlainObject = { id: 1, name: "Ada" };

const id: unknown = safe.id;
const unchecked: string = loose.name; // any, no checking
```

Both types default their key to `PropertyKey` and accept narrower key/value
parameters:

```ts
import type { AnyObject, PlainObject } from "@pawover/kit-types";

const numberMap: AnyObject<"id", number> = { id: 1 };
const stringMap: PlainObject<string, string> = { key: "value" };
```

### Model a tree with required or optional children

`TreeLike<T>` requires the children key on every node. `TreeLikeOptionalChildren<T>`
allows leaves to omit it. Both default the key to `"children"` and accept a
custom key.

```ts
import type { TreeLike, TreeLikeOptionalChildren } from "@pawover/kit-types";

interface Node {
  id: number;
  name: string;
}

const required: TreeLike<Node> = {
  id: 1,
  name: "root",
  children: [{ id: 2, name: "leaf", children: [] }],
};

const optional: TreeLikeOptionalChildren<Node> = {
  id: 1,
  name: "root",
  children: [{ id: 2, name: "leaf" }],
};
```

Use `TreeLike` for normalized trees whose nodes always have a children array
(for example, the output of `TreeUtil.rowsToTree`). Use
`TreeLikeOptionalChildren` for sparse input data.

### Type functions, async functions, and generators

The function types carry parameter tuples and return types. They are useful for
generic callbacks, middleware signatures, and adapter boundaries.

```ts
import type {
  AnyAsyncFunction,
  AnyFunction,
  AnyGeneratorFunction,
} from "@pawover/kit-types";

const add: AnyFunction<[number, number], number> = (a, b) => a + b;
const load: AnyAsyncFunction<[string], number> = async (url) => (await fetch(url)).status;

const numbers: AnyGeneratorFunction<[], number> = function* () {
  yield 1;
  yield 2;
};
```

`AnyFunction` defaults to `any[]` / `any`, so prefer the parameterized form when
the signature is known.

### Control optional and readonly fields with `AdvancedRecord`

`AdvancedRecord<K, V, mode>` builds a record from a key union. The mode is a
two-tuple: `"!"` or `"?"` for required/optional, and `"W"` or `"R"` for
writable/readonly. The default is required and writable.

```ts
import type { AdvancedRecord } from "@pawover/kit-types";

type Required = AdvancedRecord<"id" | "name", string>;
// { id: string; name: string }

type OptionalReadonly = AdvancedRecord<"id", string, ["?", "R"]>;
// { readonly id?: string }

const value: OptionalReadonly = {};
```

`Readonly` is shallow: nested object values are still mutable unless they are
themselves readonly.

### Check API-style names at the type level

`ApiNameCheck<N>` accepts uppercase letters and underscores, strips trailing
underscores, and returns `""` when it encounters an invalid character. It is a
type-level helper, not a runtime validator.

```ts
import type { ApiNameCheck } from "@pawover/kit-types";

type A = ApiNameCheck<"GET_USER">; // "GET_USER"
type B = ApiNameCheck<"GET_USER_">; // "GET_USER"
type C = ApiNameCheck<"getUser">; // ""
```

### Type React props with readonly fields

`Props<P>` is `Readonly<P>`. `PropsWithChildren<P>` adds a readonly optional
`children: ReactNode`. `PropsWithRef<P, R>` adds a readonly optional
`ref: RefObject<R>`. These are type helpers, not runtime prop transforms.

```ts
import type { RefObject } from "react";
import type { Props, PropsWithChildren, PropsWithRef } from "@pawover/kit-types/react";

interface CardProps {
  title: string;
}

const props: Props<CardProps> = { title: "Hello" };
const withChildren: PropsWithChildren<CardProps> = {
  title: "Hello",
  children: "content",
};
const withRef: PropsWithRef<CardProps, HTMLDivElement> = {
  title: "Hello",
  ref: null as unknown as RefObject<HTMLDivElement>,
};
```

`PropsWithRef` expects a `RefObject`, not a callback ref. Use `Ref<R>` or a
callback-ref type when the component needs callback refs.

## Global type entries

The package ships two type-only entries:

- `@pawover/kit-types/global`: 15 base types (`Primitive`, `Nullish`,
  `AnyObject`, `PlainObject`, `TreeLike`, `TreeLikeOptionalChildren`,
  `AnyFunction`, `AnyAsyncFunction`, `AnyGeneratorFunction`,
  `AnyAsyncGeneratorFunction`, `IsPrimitive`, `HasStringIndex`,
  `AdvancedRecordMode`, `AdvancedRecord`, `ApiNameCheck`).
- `@pawover/kit-types/react/global`: `Props`, `PropsWithChildren`,
  `PropsWithRef`.

Configure them in `tsconfig.types`; do not import them at runtime:

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

The React global entry requires `react` and `@types/react`. Adding a `types`
array can exclude other ambient type packages; include any additional entries
the project needs.

For the complete global name list, delivery details, verification commands, and
conflict handling, read
[global type entries](references/global-entries.md) before enabling an ambient
entry in an application.

## Common mistakes

### Importing the package as a runtime value

The package has no runtime code. These fail at runtime even if TypeScript
accepts the type usage:

```ts no-check
import { AnyObject } from "@pawover/kit-types";
```

Use a type-only import:

```ts
import type { AnyObject } from "@pawover/kit-types";
```

### Expecting `AnyObject` to be type-safe

`AnyObject` uses `any` values. Prefer `PlainObject` and narrow with
`TypeUtil.isPlainObject` or a schema before accessing properties.

### Making `TreeLike` children optional

`TreeLike` requires `children` on every node. Use
`TreeLikeOptionalChildren` for input data where leaves omit the key.

```ts no-check
const leaf: TreeLike<{ id: number }> = { id: 2 }; // missing children
```

### Assuming `Props` is deeply readonly

`Props<P>` applies `Readonly<P>` at the top level. Nested objects remain
mutable unless their types are also readonly.

### Using `PropsWithRef` with a callback ref

`PropsWithRef` types `ref` as `RefObject<R>`. A callback ref such as
`(node: HTMLDivElement | null) => void` is not assignable.

## Completion

- Type-only imports are used for `@pawover/kit-types`.
- Object maps choose `PlainObject` unless `any` values are intentional.
- Trees use `TreeLike` for normalized data and `TreeLikeOptionalChildren` for
  sparse input.
- Global entries appear in `tsconfig.types`, not in runtime imports.
- React props use the `/react` subpath and `PropsWithRef` only with
  `RefObject`.
