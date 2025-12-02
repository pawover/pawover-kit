import { isNaN } from "./isNaN";

export function isFalsy(value: unknown): boolean {
  if (isNaN(value)) {
    return true;
  }

  return ([null, undefined, false, 0, 0n, ""] as unknown[]).includes(value);
}

export function isFalsyLike(value: unknown): boolean {
  return (["null", "undefined", "false", "NaN"] as unknown[]).includes(value);
}
