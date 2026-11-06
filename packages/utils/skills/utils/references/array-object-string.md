# Array, object, and string helpers

This reference expands the three highest-traffic utility classes. All examples
import from `@pawover/kit-utils` and use the static methods directly.

## `ArrayUtil`

### Construction and access

| Method | Behavior |
| --- | --- |
| `cast(value, checkNullish?)` | Wraps a non-array value, copies an array. With the default `checkNullish: true`, `null` / `undefined` become `[]`; with `false`, `[null]` / `[undefined]` are kept. |
| `first(list, fallback?)` | Returns the first item or `fallback` / `undefined`. |
| `last(list, fallback?)` | Returns the last item or `fallback` / `undefined`. |
| `compete(list, match)` | Reduces with a comparator and returns the winning item, or `null` for an empty list. |
| `count(list, match)` | Counts occurrences by the key returned from `match`. Keys are stringified. |

```ts
import { ArrayUtil } from "@pawover/kit-utils";

ArrayUtil.cast(1); // [1]
ArrayUtil.cast([1, 2]); // [1, 2]
ArrayUtil.cast(null); // []
ArrayUtil.cast(null, false); // [null]

ArrayUtil.first([1, 2]); // 1
ArrayUtil.first([], 0); // 0
ArrayUtil.last([1, 2, 3]); // 3
ArrayUtil.compete([1, 10, 5], (a, b) => (a > b ? a : b)); // 10
ArrayUtil.count(["a", "b", "a"], (x) => x); // { a: 2, b: 1 }
```

### Set-like operations

| Method | Without matcher | With matcher |
| --- | --- | --- |
| `difference(initial, other, match?)` | De-duplicates the result. | Preserves duplicates and order from `initial`; compares matcher keys. |
| `intersection(initial, other, match?)` | Compares element identity. | Compares matcher keys. |
| `merge(initial, incoming, match?)` | Union, de-duplicated. | Left-join update: updates matching items in `initial` and ignores incoming-only items. |

```ts
import { ArrayUtil } from "@pawover/kit-utils";

ArrayUtil.difference([1, 1, 2], [2]); // [1]
ArrayUtil.intersection([1, 2], [2, 3]); // [2]

const source = [{ id: 1, value: "a" }, { id: 2, value: "b" }];
const update = [{ id: 2, value: "new" }, { id: 3, value: "ignored" }];
ArrayUtil.merge(source, update, (x) => x.id);
// [{ id: 1, value: "a" }, { id: 2, value: "new" }]
```

### Selection, replacement, and grouping

| Method | Behavior |
| --- | --- |
| `pick(list, filter, mapper?)` | One pass of filter and optional map. |
| `replace(list, newItem, match)` | Replaces the first match; otherwise returns a copy. |
| `replaceMove(list, newItem, match, position?)` | Removes the first match and reinserts `newItem`. `position` accepts `"start"`, `"end"`, or an index. Negative / non-integer indexes fall back to append. |
| `split(list, size)` | Splits into chunks; invalid size returns `[]`. |
| `fork(list, match)` | Returns `[matching, nonMatching]`. |

```ts
import { ArrayUtil } from "@pawover/kit-utils";

ArrayUtil.pick([1, 2, 3, 4], (n) => n % 2 === 0); // [2, 4]
ArrayUtil.pick([1, 2, 3, 4], (n) => n % 2 === 0, (n) => n * 2); // [4, 8]
ArrayUtil.replace([1, 2, 3], 4, (n) => n === 2); // [1, 4, 3]
ArrayUtil.replaceMove([1, 2, 3, 4], 5, (n) => n === 2, 0); // [5, 1, 3, 4]
ArrayUtil.split([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
ArrayUtil.fork([1, 2, 3, 4], (n) => n % 2 === 0); // [[2, 4], [1, 3]]
```

### Compression and object creation

`zip` and `unzip` default to longest-input padding with `undefined`. Pass
`{ truncate: true }` for shortest-input truncation. `zipToObject` accepts an
array of values, a generator function, or a single static value.

```ts
import { ArrayUtil } from "@pawover/kit-utils";

ArrayUtil.zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
ArrayUtil.zip([1, 2, 3], ["a"]); // [[1, "a"], [2, undefined], [3, undefined]]
ArrayUtil.unzip([[1, "a"], [2, "b"]]); // [[1, 2], ["a", "b"]]

ArrayUtil.zipToObject(["a", "b"], [1, 2]); // { a: 1, b: 2 }
ArrayUtil.zipToObject(["a", "b"], (key, index) => `${key}${index}`); // { a: "a0", b: "b1" }
ArrayUtil.zipToObject(["a", "b"], true); // { a: true, b: true }
```

## `StringUtil`

### Casting and numeric extraction

`cast` returns `""` for `null`, `undefined`, and whitespace-only strings when
`checkNullish` is `true` (the default). It trims by default. With
`checkNullish: false`, `null` becomes `"null"` and `undefined` becomes
`"undefined"`. `toNumber` extracts digits, one decimal point, and a sign; it is
not a full numeric parser.

```ts
import { StringUtil } from "@pawover/kit-utils";

StringUtil.cast("  hello  "); // "hello"
StringUtil.cast(null); // ""
StringUtil.cast(null, false); // "null"
StringUtil.cast(123); // "123"

StringUtil.toNumber("$1,234.56"); // "1234.56"
StringUtil.toNumber("abc-123"); // "-123"
StringUtil.toNumber("abc"); // "0"
```

### Case, path, and JSON helpers

| Method | Behavior |
| --- | --- |
| `toLowerCase(input)` / `toUpperCase(input)` | Returns `""` for invalid input. Literal inputs keep literal types. |
| `toInitialCase(input, caseType?)` | Changes the first letter of each purely alphabetic word. Omitting `caseType` is a no-op. |
| `toPosix(input, removeLeadingSlash?)` | Converts Windows paths to POSIX, removes drive letters, collapses repeated slashes. |
| `toJson(input, fallback?)` | Parses JSON and returns `fallback` / `undefined` on failure. |
| `split(input, separator)` | Returns a literal tuple for literal inputs, otherwise `string[]`. |
| `toValues(input, valueType?, separator?)` | Converts separated values; numeric mode leaves bad fragments as `NaN`. |

```ts
import { StringUtil } from "@pawover/kit-utils";

StringUtil.toLowerCase("HELLO"); // "hello"
StringUtil.toUpperCase("hello"); // "HELLO"
StringUtil.toInitialCase("hello world", "upper"); // "Hello World"
StringUtil.toInitialCase("Hello"); // "Hello" (no caseType)

StringUtil.toPosix("C:\\Windows\\System32"); // "/Windows/System32"
StringUtil.toPosix("C:\\Windows\\System32", true); // "Windows/System32"

StringUtil.toJson<{ a: number }>("{\"a\":1}"); // { a: 1 }
StringUtil.toJson("invalid", { a: 0 }); // { a: 0 }

StringUtil.split("en-US", "-"); // ["en", "US"]
StringUtil.toValues("1,2,3"); // [1, 2, 3]
StringUtil.toValues("1,abc,3"); // [1, NaN, 3]
```

### Trimming, truncation, and templates

`trim` removes any leading/trailing characters in the supplied set, not just
whitespace. `truncate` counts Unicode code points and includes the ellipsis in
`maxLength`. `template` replaces `{{key}}` placeholders and keeps the original
placeholder when the value is `null` or `undefined`.

```ts
import { StringUtil } from "@pawover/kit-utils";

StringUtil.trim("__hello__", "_"); // "hello"
StringUtil.truncate("hello world", 8); // "hello..."
StringUtil.template("Hello {{name}}", { name: "Ada" }); // "Hello Ada"
StringUtil.template("Hello {{name}}", { name: null }); // "Hello {{name}}"
StringUtil.replace("hello world", "world", "context"); // "hello context"
```

`replace` replaces only the first occurrence. Use `String.prototype.replaceAll`
or a global regular expression when every occurrence must change.

## `ObjectUtil`

### Typed `keys`, `values`, and `entries`

These methods improve on `Object.*` by preserving key / value types where
possible. Strings and array-like values also work.

```ts
import { ObjectUtil } from "@pawover/kit-utils";

const user = { id: 1, name: "Ada" };

ObjectUtil.keys(user); // ["id", "name"]
ObjectUtil.values(user); // [1, "Ada"]
ObjectUtil.entries(user); // [["id", 1], ["name", "Ada"]]
ObjectUtil.entriesMap(user, (key, value) => [key, `${value}!`]);
// { id: "1!", name: "Ada!" }
```

### Selection, inversion, and flattening

`pick` and `omit` return new objects. `invert` swaps keys and values for string,
number, and symbol values. `crush` flattens nested objects and arrays with
dot-separated paths.

```ts
import { ObjectUtil } from "@pawover/kit-utils";

ObjectUtil.pick({ a: 1, b: 2 }, ["a"]); // { a: 1 }
ObjectUtil.omit({ a: 1, b: 2 }, ["a"]); // { b: 2 }
ObjectUtil.invert({ a: "x", b: "y" }); // { x: "a", y: "b" }
ObjectUtil.crush({ profile: { name: "Ada" }, tags: ["admin"] });
// { "profile.name": "Ada", "tags.0": "admin" }
```

### Enum helpers

`enumKeys`, `enumValues`, and `enumEntries` handle string enums and numeric
enums (including TypeScript's reverse mappings). They throw if the argument is
not a valid enum.

```ts
import { ObjectUtil } from "@pawover/kit-utils";

enum Status {
  Active = "active",
  Disabled = "disabled",
}

ObjectUtil.enumKeys(Status); // ["Active", "Disabled"]
ObjectUtil.enumValues(Status); // ["active", "disabled"]
ObjectUtil.enumEntries(Status); // [["Active", "active"], ["Disabled", "disabled"]]
```

### Common mistakes

- `ObjectUtil.invert` ignores values that are not string, number, or symbol.
- `ObjectUtil.crush` uses array indexes as path segments; it does not preserve
  array structure.
- `ObjectUtil.pick` uses the `in` operator, so inherited keys can be selected
  when they exist on the object's prototype.
- `ObjectUtil.enumKeys` / `enumValues` / `enumEntries` throw on empty objects and
  on objects that do not satisfy the enum shape.
