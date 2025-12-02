import { isNaN } from "./isNaN";

export function isInfinity(value: unknown): boolean {
  if (isNaN(value)) {
    return true;
  }

  return ([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY] as unknown[]).includes(value);
}

export function isInfinityLike(value: unknown): boolean {
  return (["Infinity", "-Infinity", "NaN"] as unknown[]).includes(value);
}
