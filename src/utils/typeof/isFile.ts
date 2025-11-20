import { prototypeStrings, resolvePrototypeString } from "./types";

export function isFile<T extends File>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.file;
}
