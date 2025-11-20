import { prototypeStrings, resolvePrototypeString } from "./types";

export function isFunction<T extends Func>(value: unknown): value is T {
  const prototypeList: string[] = [prototypeStrings.function, prototypeStrings.generatorFunction, prototypeStrings.asyncFunction];

  return prototypeList.includes(resolvePrototypeString(value));
}
