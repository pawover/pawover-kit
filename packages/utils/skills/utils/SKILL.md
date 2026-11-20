---
name: utils
description: >-
  Use when working with @pawover/kit-utils static utility classes for arrays,
  strings, objects, trees, type guards, validation, numbers, dates, currency,
  i18n locales, MIME types, environment detection, or theme constants;
  includes ArrayUtil, StringUtil, ObjectUtil, TreeUtil, TypeUtil, and
  ValidateUtil.
metadata:
  purpose: Use the static utility classes in @pawover/kit-utils for common
    data, tree, validation, formatting, and environment tasks.
  type: core
  library: "@pawover/kit-utils"
  library_version: "1.0.1"
sources:
  - src/index.ts
  - src/array/arrayUtil.ts
  - src/string/stringUtil.ts
  - src/object/objectUtil.ts
  - src/tree/treeUtil.ts
  - src/type/typeUtil.ts
  - src/validate/validateUtil.ts
  - src/number/numberUtil.ts
  - src/currency/currencyUtil.ts
  - src/dateTime/dateTimeUtil.ts
  - src/env/envUtil.ts
  - src/function/functionUtil.ts
  - src/i18n/i18nUtil.ts
  - src/mime/mimeUtil.ts
  - src/theme/themeUtil.ts
  - src/math/mathUtil.ts
  - src/vite/viteUtil.ts
---

# Use `@pawover/kit-utils`

All runtime exports are static classes. Call methods on the class; never
instantiate the classes. Import from `@pawover/kit-utils` when the project installs
that package, or from `@pawover/kit/utils` when it installs the aggregate
`@pawover/kit`.

`MathUtil` and `ViteUtil` are separate entries because `mathjs` and `vite` are
optional peers:

```ts
import { MathUtil } from "@pawover/kit-utils/math";
import { ViteUtil } from "@pawover/kit-utils/vite";
```

## Setup

```ts
import {
  ArrayUtil,
  ObjectUtil,
  StringUtil,
  TreeUtil,
  TypeUtil,
  ValidateUtil,
} from "@pawover/kit-utils";
```

Most methods return new values and do not mutate their inputs. The explicit
exceptions are called out below.

## Core patterns

### Build, split, and combine arrays

`ArrayUtil` covers the common collection operations without importing a
collection library. `cast` normalizes a value to an array, `pick` combines
filter and map, and `fork` separates matching and non-matching items.

```ts
import { ArrayUtil } from "@pawover/kit-utils";

ArrayUtil.cast(1); // [1]
ArrayUtil.cast(null); // []
ArrayUtil.cast(null, false); // [null]

ArrayUtil.pick([1, 2, 3, 4], (n) => n % 2 === 0, (n) => n * 10); // [20, 40]
ArrayUtil.fork([1, 2, 3, 4], (n) => n % 2 === 0); // [[2, 4], [1, 3]]
ArrayUtil.split([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

`zip` and `unzip` pad to the longest input by default; pass `{ truncate: true }`
to stop at the shortest:

```ts
import { ArrayUtil } from "@pawover/kit-utils";

ArrayUtil.zip([1, 2, 3], ["a"]); // [[1, "a"], [2, undefined], [3, undefined]]
ArrayUtil.zip([1, 2, 3], ["a"], { truncate: true }); // [[1, "a"]]
ArrayUtil.unzip([[1, 2], [3]], { truncate: true }); // [[1, 3]]
```

`difference`, `intersection`, and `merge` have two modes. Without a matcher,
`difference` de-duplicates, `intersection` compares element identity, and
`merge` performs a union. With a matcher, `merge` updates only items already in
the initial list; it does **not** append new items from the second list.

```ts
import { ArrayUtil } from "@pawover/kit-utils";

ArrayUtil.difference([1, 1, 2], [2]); // [1] — de-duplicated
ArrayUtil.difference([{ id: 1 }, { id: 1 }], [{ id: 2 }], (x) => x.id); // both kept

const source = [{ id: 1, value: "a" }, { id: 2, value: "b" }];
const update = [{ id: 2, value: "new" }, { id: 3, value: "ignored" }];
ArrayUtil.merge(source, update, (x) => x.id);
// [{ id: 1, value: "a" }, { id: 2, value: "new" }]
```

`replaceMove` moves the first match to a position. A negative or non-integer
position silently falls back to appending at the end.

```ts
import { ArrayUtil } from "@pawover/kit-utils";

ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2, 0); // [5, 1, 3, 4]
ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2, -1); // [1, 3, 4, 5]
```

### Read and reshape objects with typed keys

`ObjectUtil.keys`, `values`, and `entries` preserve literal key types better than
the native `Object.*` methods. `pick`, `omit`, `invert`, and `crush` return new
objects rather than mutating the input.

```ts
import { ObjectUtil } from "@pawover/kit-utils";

const user = { id: 1, name: "Ada", active: true };

ObjectUtil.keys(user); // ["id", "name", "active"]
ObjectUtil.pick(user, ["id", "name"]); // { id: 1, name: "Ada" }
ObjectUtil.omit(user, ["active"]); // { id: 1, name: "Ada" }
ObjectUtil.invert({ a: "x", b: "y" }); // { x: "a", y: "b" }
ObjectUtil.crush({ profile: { name: "Ada" }, tags: ["admin"] });
// { "profile.name": "Ada", "tags.0": "admin" }
```

`enumKeys`, `enumValues`, and `enumEntries` accept TypeScript enums, including
numeric enums with reverse mappings. They throw when the value is not a valid
enum.

```ts
import { ObjectUtil } from "@pawover/kit-utils";

enum Status {
  Active = "active",
  Disabled = "disabled",
}

ObjectUtil.enumKeys(Status); // ["Active", "Disabled"]
ObjectUtil.enumValues(Status); // ["active", "disabled"]
```

### Normalize strings without losing type information

`StringUtil.cast` turns `null` and `undefined` into `""` by default, trims, and
preserves literal types for primitive inputs. `toNumber` extracts a numeric
string; it is not a general-purpose number parser.

```ts
import { StringUtil } from "@pawover/kit-utils";

StringUtil.cast("  hello  "); // "hello"
StringUtil.cast(null); // ""
StringUtil.cast(null, false); // "null"
StringUtil.toNumber("$1,234.56"); // "1234.56"
StringUtil.truncate("支持多字节的截断🐱", 6); // "支持多..."
StringUtil.template("Hello {{name}}", { name: "Ada" }); // "Hello Ada"
StringUtil.toPosix("C:\\work\\app"); // "/work/app"
```

`toValues` converts comma-separated values to numbers and leaves unparseable
segments as `NaN`; filter them yourself if that is not desired.

```ts
import { StringUtil } from "@pawover/kit-utils";

StringUtil.toValues("1,2,3"); // [1, 2, 3]
StringUtil.toValues("1,abc,3"); // [1, NaN, 3]
```

### Convert and traverse trees

`TreeUtil.rowsToTree` builds a tree from rows with `id` / `parentId` defaults,
fills every node with a `children` array, and uses the first row for a duplicate
id. Missing parents and self-referencing rows become roots.

```ts
import { TreeUtil } from "@pawover/kit-utils";

interface MenuRow {
  id: number;
  parentId: number | null;
  name: string;
}

const rows: MenuRow[] = [
  { id: 1, parentId: null, name: "Root" },
  { id: 2, parentId: 1, name: "Child" },
];

const tree = TreeUtil.rowsToTree(rows);
// [{ id: 1, parentId: null, name: "Root", children: [
//   { id: 2, parentId: 1, name: "Child", children: [] }
// ] }]

const flat = TreeUtil.treeToRows(tree);
// [{ id: 1, ..., children: undefined }, { id: 2, ..., children: undefined }]
```

Traversal callbacks receive `(row, meta)`; `meta.depth` is the depth from the
current root and `meta.parents` is the ancestor chain. `find` returns the
original node reference, not a copy.

```ts
import { TreeUtil } from "@pawover/kit-utils";

TreeUtil.forEach(tree, (row, meta) => {
  console.log(meta.depth, row.name);
});

const child = TreeUtil.find(tree, (row) => row.id === 2);
const visible = TreeUtil.filter(tree, (row) => row.name !== "Child");
const renamed = TreeUtil.map(tree, (row) => ({ ...row, name: row.name.toUpperCase() }));
```

`filter` and `map` return new trees. With the default `pre` strategy, rejecting a
parent removes its whole subtree. `find` and `forEach` use the original nodes.

### Guard types before touching values

`TypeUtil` guards narrow values and encode the project's nullish conventions.
The optional second argument changes the meaning: `isString(value, true)` rejects
empty and whitespace-only strings, and `isNumber` rejects `NaN` by default.

```ts
import { TypeUtil } from "@pawover/kit-utils";

TypeUtil.isString("abc"); // true
TypeUtil.isString("   ", true); // false
TypeUtil.isNumber(NaN); // false
TypeUtil.isNumber(NaN, false); // true
TypeUtil.isPlainObject({}); // true
TypeUtil.isPlainObject(Object.create(null)); // false
TypeUtil.isPlainObject(Object.create(null), false); // true
```

`isPlainObject` checks the prototype by default, so class instances and
null-prototype objects are rejected unless the second argument is `false`.
`isDate` rejects `Invalid Date` unless its second argument is `false`.

### Validate user input with the format checks

`ValidateUtil` provides regex-based validators for common Chinese and network
formats. They return a boolean and accept a string.

```ts
import { ValidateUtil } from "@pawover/kit-utils";

ValidateUtil.isPhone("13800138000"); // true
ValidateUtil.isEmail("dev@pawover.dev"); // true
ValidateUtil.isChineseName("张三"); // true
ValidateUtil.isUSCC("91350100M000100Y43"); // true
ValidateUtil.isChineseID("110101199003071234"); // true
```

`isChineseID` validates the 18-character shape and birthday legality only. It
does **not** verify the 18th checksum digit, so it is not proof that an ID was
issued. Use `NumberUtil.within` for numeric ranges; it defaults to a
left-closed, right-open interval and throws on non-finite input or an invalid
interval.

```ts
import { NumberUtil } from "@pawover/kit-utils";

NumberUtil.within(5, [1, 10]); // true
NumberUtil.within(10, [1, 10]); // false
NumberUtil.within(10, [1, 10], true, true); // true
```

### Use the specialized classes only when the task needs them

`CurrencyUtil`, `DateTimeUtil`, `EnvUtil`, `FunctionUtil`, `I18nUtil`,
`MimeUtil`, and `ThemeUtil` cover formatting, locale, environment, and MIME
concerns. Some have important constraints:

- `CurrencyUtil.toRealValue` requires a `mathjs` instance; `currencyFormatter`
  works with `Intl.NumberFormat` alone.
- `EnvUtil.isBrowser`, `isWebWorker`, and `isReactNative` are static values
  computed once at module load. Importing the package on Node makes
  `isBrowser()` permanently `false` for that module instance.
- `I18nUtil.toFullLocale` returns the input when it cannot normalize it; a
  returned value is not guaranteed to be a valid BCP 47 tag.
- `FunctionUtil.to` returns `[error, undefined]` or `[null, data]`, so check the
  first element before using the second.

```ts
import { create, all } from "mathjs";
import { CurrencyUtil, DateTimeUtil, EnvUtil } from "@pawover/kit-utils";

const math = create(all);
CurrencyUtil.currencyFormatter(1234.56, {
  locales: [CurrencyUtil.CURRENCY_ENUM.CNY, CurrencyUtil.CURRENCY_ENUM.USD],
  currencySign: "¥",
  currencySignPosition: "start",
  currencyFormatOptions: { style: "currency", currency: "CNY" },
}); // "¥ 1,234.56"

CurrencyUtil.toRealValue(math, 0.1 + 0.2, 2); // "0.30"
DateTimeUtil.getTimeZone(); // { UTC: "UTC+8", timeZone: "Asia/Shanghai" }
EnvUtil.isMobile(); // browser-only classification
```

## Common mistakes

### Instantiating a static utility class

The classes expose static methods; `new ArrayUtil()` is not part of the API.

```ts no-check
const utils = new ArrayUtil();
```

Call the class directly:

```ts
import { ArrayUtil } from "@pawover/kit-utils";

ArrayUtil.cast([1, 2]);
```

### Expecting `merge` with a matcher to append new items

`ArrayUtil.merge(initial, incoming, match)` is a left-join update: it replaces
items in `initial` whose matcher result appears in `incoming` and ignores
incoming-only items. Use the no-matcher overload for a union, or concatenate
explicitly when append semantics are required.

```ts
import { ArrayUtil } from "@pawover/kit-utils";

const source = [{ id: 1, value: "a" }];
const incoming = [{ id: 1, value: "new" }, { id: 2, value: "new" }];

ArrayUtil.merge(source, incoming, (x) => x.id); // [{ id: 1, value: "new" }]
ArrayUtil.merge(source, incoming); // both objects, identity-based union
```

### Filtering a tree with `pre` and expecting descendants to survive

With `pre`, rejecting a node stops descent, so its descendants are never visited.
With `post`, children are visited first, but a rejected parent still removes its
subtree from the final result. Use the strategy that matches the traversal order
or side effects you need; neither strategy keeps children under a rejected
parent. If descendants must survive, keep the parent in the result (for example,
include a parent that has visible descendants) or filter before building the
tree.

```ts
import { TreeUtil } from "@pawover/kit-utils";

const tree = [{ id: 1, visible: false, children: [{ id: 2, visible: true, children: [] }] }];
TreeUtil.filter(tree, (row) => row.visible); // []
TreeUtil.filter(tree, (row) => row.visible, { strategy: "post" }); // [] — children visited, then parent rejected
```

### Mutating the node returned by `find`

`find` returns the original node reference. Mutating it mutates the source tree.
Use `map` or `filter` to produce a new tree.

```ts no-check
const node = TreeUtil.find(tree, (row) => row.id === 2);
node.name = "changed"; // mutates the original tree
```

### Using `isPlainObject` on a null-prototype object

`Object.create(null)` has no `Object.prototype`; the default prototype check
rejects it. Pass `false` only when the task intentionally accepts any object tag.

```ts
import { TypeUtil } from "@pawover/kit-utils";

TypeUtil.isPlainObject(Object.create(null)); // false
TypeUtil.isPlainObject(Object.create(null), false); // true
```

### Treating `isChineseID` as a checksum validator

`ValidateUtil.isChineseID` checks the 18-character layout and birthday only.
Do not use it to prove an ID is genuine; validate the checksum separately when
that guarantee is required.

## References

- For detailed `ArrayUtil`, `StringUtil`, and `ObjectUtil` overloads, edge
  cases, and return types, read
  [array, object, and string helpers](references/array-object-string.md) before
  replacing native methods.
- For traversal strategies, custom children keys, and reference semantics in
  `TreeUtil`, read [tree operations](references/tree.md) before transforming
  nested data.
- For `CurrencyUtil`, `DateTimeUtil`, `EnvUtil`, `FunctionUtil`, `I18nUtil`,
  `MimeUtil`, `ThemeUtil`, `MathUtil`, and `ViteUtil`, read
  [specialized utilities](references/specialized.md) when the task needs
  formatting, locale, environment, MIME, math, or Vite behavior.

## Completion

- The chosen class and method exist in `@pawover/kit-utils`; `MathUtil` and
  `ViteUtil` come from their subpaths.
- Inputs are not mutated unless the method explicitly says so.
- Tree transformations use the intended strategy and reference semantics.
- Validation code treats regex checks as format checks, not proof of authenticity.
- Run the package tests or the repository's `intent validate` command after
  editing skill examples.
