import { prototypeStrings, resolvePrototypeString } from "./types";

export function isGeneratorFunction<T extends Func>(value: unknown): value is T {
  return resolvePrototypeString(value) === prototypeStrings.generatorFunction;
}
