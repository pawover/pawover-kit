export function isInteger<T extends number>(value: unknown): value is T {
  return Number.isInteger(value);
}
