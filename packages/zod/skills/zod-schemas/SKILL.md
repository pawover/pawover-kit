---
name: zod-schemas
description: >-
  Use when validating ids, strings, numbers, integers, bigints, booleans,
  property keys, or object records with the prebuilt Zod v4 schemas in
  @pawover/kit-zod.
metadata:
  purpose: Validate common value shapes with the prebuilt Zod v4 schemas in
    @pawover/kit-zod.
  type: core
  library: "@pawover/kit-zod"
  library_version: "0.0.4"
sources:
  - src/index.ts
  - src/server.ts
  - src/type.ts
---

# Use `@pawover/kit-zod`

`@pawover/kit-zod` exports prebuilt Zod v4 schemas. Install `zod` as a peer
dependency and import the schemas from the package root. Compose them with
`z.object`, `z.array`, `z.union`, and the other Zod constructors.

## Setup

```sh
pnpm add @pawover/kit-zod zod
```

```ts
import { z } from "zod";
import { id, integerPositive, stringNoEmpty } from "@pawover/kit-zod";

const userSchema = z.object({
  id,
  name: stringNoEmpty,
  age: integerPositive,
});

const user = userSchema.parse({ id: 1, name: "Ada", age: 36 });
```

With the aggregate package, import from `@pawover/kit/zod`.

## Core patterns

### Ids

`id` accepts a non-empty string or a finite number. `idAllowEmpty` adds `null`
and `undefined` but still rejects the empty string.

```ts
import { id, idAllowEmpty } from "@pawover/kit-zod";

id.parse("abc"); // "abc"
id.parse(42); // 42
id.parse(""); // throws
idAllowEmpty.parse(null); // null
idAllowEmpty.parse(""); // throws
```

`id` is an input shape, not a semantic identifier. It accepts negative numbers,
zero, and decimals. Add `.positive()` / `.int()` or a custom refinement when the
domain requires a positive integer id.

### Strings

| Schema | Accepts |
| --- | --- |
| `string` | Any string, including `""` |
| `stringNoEmpty` | A string with at least one character |
| `stringAllowEmpty` | A string or `null` / `undefined`; the name means nullable, not empty-string-friendly |
| `stringEmpty` | Only `""`, `null`, or `undefined` |

```ts
import { stringAllowEmpty, stringEmpty, stringNoEmpty } from "@pawover/kit-zod";

stringNoEmpty.parse("Ada"); // "Ada"
stringNoEmpty.parse(""); // throws
stringAllowEmpty.parse(null); // null
stringAllowEmpty.parse(""); // ""
stringEmpty.parse(""); // ""
stringEmpty.parse("Ada"); // throws
```

Use `stringAllowEmpty` when the field may be absent or null. Use
`stringNoEmpty` when the field must contain text. Use `stringEmpty` only when the
empty string is the sole meaningful value.

### Numbers, integers, and bigints

| Schema | Accepts |
| --- | --- |
| `number` / `numberAllowEmpty` | A finite number, optionally nullable |
| `integer` / `integerAllowEmpty` | An integer, optionally nullable |
| `integerPositive` / `integerPositiveAllowEmpty` | An integer `>= 0`, optionally nullable |
| `integerNegative` / `integerNegativeAllowEmpty` | An integer `<= 0`, optionally nullable |
| `bigint` / `bigintAllowEmpty` | A bigint, optionally nullable |
| `bigintPositive` / `bigintPositiveAllowEmpty` | A bigint `>= 0n`, optionally nullable |
| `bigintNegative` / `bigintNegativeAllowEmpty` | A bigint `<= 0n`, optionally nullable |

```ts
import { integerPositive, numberAllowEmpty } from "@pawover/kit-zod";

integerPositive.parse(0); // 0
integerPositive.parse(3); // 3
integerPositive.parse(-1); // throws

numberAllowEmpty.parse(null); // null
numberAllowEmpty.parse(1.5); // 1.5
```

The "positive" schemas are non-negative, so zero is valid. Add `.positive()` if
zero must be rejected.

### Booleans, symbols, and object records

| Schema | Accepts |
| --- | --- |
| `boolean` / `booleanAllowEmpty` | A boolean, optionally nullable |
| `symbol` | A symbol |
| `propertyKey` | A string, number, or symbol |
| `anyObject` | A record with `PropertyKey` keys and `any` values |
| `plainObject` | A record with `PropertyKey` keys and `unknown` values |
| `any` / `unknown` / `never` | The corresponding Zod schema |
| `empty` | `null` or `undefined` |

```ts
import { anyObject, plainObject, propertyKey } from "@pawover/kit-zod";

propertyKey.parse("key");
propertyKey.parse(1);
propertyKey.parse(Symbol("key"));

anyObject.parse({ id: 1, name: "Ada" });
plainObject.parse({ id: 1, name: "Ada" });
```

Prefer `plainObject` when consumers must narrow values before use. `anyObject`
opts out of value checking.

### Compose a form or payload schema

Use the prebuilt schemas for individual fields and `z.object` for the shape. The
nullable variants compose without extra `.nullable()` calls.

```ts
import { z } from "zod";
import {
  booleanAllowEmpty,
  id,
  integerPositive,
  stringNoEmpty,
} from "@pawover/kit-zod";

const createUserSchema = z.object({
  id,
  name: stringNoEmpty,
  age: integerPositive,
  active: booleanAllowEmpty,
});

type CreateUser = z.infer<typeof createUserSchema>;
```

`z.infer` keeps the schema's input / output types, so the nullable variants
produce `boolean | null | undefined` rather than `boolean`.

## Common mistakes

### Reading `AllowEmpty` as "empty string is allowed"

`stringAllowEmpty` is `z.string().nullish()`. It accepts `""`, `null`, and
`undefined`, but the "allow empty" part refers to nullable input, not a
dedicated empty-string case. Use `stringEmpty` for the literal empty string, and
`stringNoEmpty` for required text.

### Expecting `id` to be a positive integer

`id` is `z.union([z.string().min(1), z.number()])`. It accepts `0`, negative
numbers, and decimals. Refine it for domain-specific ids:

```ts
import { z } from "zod";

const positiveId = z.union([z.string().min(1), z.number().int().positive()]);
```

This union keeps both id forms while constraining the numeric branch. Use a
custom string branch when the string format matters too.

### Using the nullable variants twice

`numberAllowEmpty` already includes `null` and `undefined`. Adding
`.nullable()` or `.optional()` again is redundant and can make the type harder to
read.

### Using `anyObject` and then accessing values directly

`anyObject` values are `any`; `plainObject` values are `unknown`. Prefer
`plainObject` and narrow before property access, or use a `z.object` shape for
known keys.

### Expecting `empty` to mean an empty object or string

`empty` is `z.union([z.null(), z.undefined()])`. It accepts only `null` and
`undefined`.

## Completion

- `zod` is installed as a peer dependency.
- The schema names match the intended nullability and value domain.
- `id` is refined when the domain requires a positive integer.
- Object payloads use `plainObject` or a `z.object` shape rather than
  `anyObject` when values need checking.
- `z.infer` output is used at the boundary instead of re-declaring the shape.
