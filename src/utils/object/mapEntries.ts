import { objectEntries } from "./objectEntries";

export function mapEntries<TKey extends PropertyKey, TValue, TNewKey extends PropertyKey, TNewValue>(
  obj: UnknownObject<TKey, TValue>,
  toEntry: (key: TKey, value: TValue) => [TNewKey, TNewValue],
): UnknownObject<TNewKey, TNewValue> {
  const defaultResult = {} as UnknownObject<TNewKey, TNewValue>;

  if (!obj) {
    return defaultResult;
  }

  return objectEntries(obj).reduce((acc, [key, value]) => {
    const [newKey, newValue] = toEntry(key, value);
    acc[newKey] = newValue;

    return acc;
  }, defaultResult);
}
