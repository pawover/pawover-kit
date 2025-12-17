import { objectEntries } from "./objectEntries";

export function mapEntries<K extends PropertyKey, V, NK extends PropertyKey, NV>(obj: PlainObject<K, V>, toEntry: (key: K, value: V) => [NK, NV]): PlainObject<NK, NV> {
  const defaultResult = {} as PlainObject<NK, NV>;

  if (!obj) {
    return defaultResult;
  }

  return objectEntries(obj).reduce((acc, [key, value]) => {
    const [newKey, newValue] = toEntry(key, value);
    acc[newKey] = newValue;

    return acc;
  }, defaultResult);
}
