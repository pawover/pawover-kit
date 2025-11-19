import type { Replace } from "type-fest";

export function stringReplace<I extends string, S extends string, R extends string>(input: I, search: S, replacement: R) {
  return input.replace(search, replacement) as Replace<I, S, R>;
}
