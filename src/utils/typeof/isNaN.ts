export function isNaN<T extends number>(value: unknown): value is T {
  return Number.isNaN(value);
}
