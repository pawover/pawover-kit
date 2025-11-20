import { isArray, isMap, isObject, isSet } from "../typeof";

interface CloningStrategy {
  cloneMap: <K, V>(parent: Map<K, V>, track: (newParent: Map<K, V>) => Map<K, V>, clone: <T>(value: T) => T) => Map<K, V> | null;
  cloneSet: <T>(parent: Set<T>, track: (newParent: Set<T>) => Set<T>, clone: <T>(value: T) => T) => Set<T> | null;
  cloneArray: <T>(parent: readonly T[], track: (newParent: T[]) => T[], clone: <T>(value: T) => T) => T[] | null;
  cloneObject: <T extends AnyObject>(parent: T, track: (newParent: T) => T, clone: <T>(value: T) => T) => T | null;
  cloneOther: <T>(parent: T, track: (newParent: T) => T, clone: <T>(value: T) => T) => T | null;
}

const DefaultCloningStrategy: CloningStrategy = {
  cloneMap<K, V>(input: Map<K, V>, track: (newParent: Map<K, V>) => Map<K, V>, clone: <T>(value: T) => T): Map<K, V> {
    const output = track(new Map());
    for (const [key, value] of input) {
      output.set(key, clone(value));
    }

    return output;
  },
  cloneSet<T>(input: Set<T>, track: (newParent: Set<T>) => Set<T>, clone: <T>(value: T) => T): Set<T> {
    const output = track(new Set());
    for (const value of input) {
      output.add(clone(value));
    }

    return output;
  },
  cloneArray<T>(input: readonly T[], track: (newParent: T[]) => T[], clone: <T>(value: T) => T): T[] {
    // Use .forEach for correct handling of sparse arrays
    const output = track(new Array(input.length));
    input.forEach((value, index) => {
      output[index] = clone(value);
    });

    return output;
  },
  cloneObject<T extends AnyObject>(input: T, track: (newParent: T) => T, clone: <T>(value: T) => T): T {
    const output = track(Object.create(Object.getPrototypeOf(input)));
    for (const key of Reflect.ownKeys(input)) {
      // By copying the property descriptors, we preserve computed
      // properties and non-enumerable properties.
      const descriptor = Object.getOwnPropertyDescriptor(input, key)!;
      if ("value" in descriptor) {
        descriptor.value = clone(descriptor.value);
      }
      Object.defineProperty(output, key, descriptor);
    }

    return output;
  },
  cloneOther<T>(input: T, track: (newParent: T) => T): T {
    return track(input);
  },
};


/**
 * cloneDeep
 * @reference https://github.com/radashi-org/radashi/blob/main/src/object/cloneDeep.ts
 */
export function cloneDeep<T extends AnyObject>(root: T, customStrategy?: Partial<CloningStrategy>): T {
  const strategy = { ...DefaultCloningStrategy, ...customStrategy };

  const tracked = new Map<unknown, unknown>();
  const track = (parent: unknown, newParent: unknown) => {
    tracked.set(parent, newParent);

    return newParent;
  };

  const clone = <T>(value: T): T => {
    return value && typeof value === "object" ? ((tracked.get(value) ?? cloneDeep(value, strategy)) as T) : value;
  };

  const cloneDeep = (parent: unknown, strategy: CloningStrategy): unknown => {
    const cloneParent = (
      isObject(parent)
        ? strategy.cloneObject
        : isArray(parent)
          ? strategy.cloneArray
          : isMap(parent)
            ? strategy.cloneMap
            : isSet(parent)
              ? strategy.cloneSet
              : strategy.cloneOther
    ) as (newParent: unknown, track: (newParent: unknown) => unknown, clone: (value: unknown) => unknown) => unknown;

    const newParent = cloneParent(parent, track.bind(null, parent), clone);
    if (!newParent) {
      // Use the default strategy if null is returned.
      return cloneDeep(parent, DefaultCloningStrategy);
    }

    tracked.set(parent, newParent);

    return newParent;
  };

  return cloneDeep(root, strategy) as T;
}
