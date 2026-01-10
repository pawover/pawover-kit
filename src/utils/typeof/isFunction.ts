import type { AnyAsyncFunction, AnyAsyncGeneratorFunction, AnyFunction, AnyGeneratorFunction } from "@pawover/types";
import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

export function isFunction(value: unknown): value is AnyFunction {
  return typeof value === "function";
}

export function isAsyncFunction(value: unknown): value is AnyAsyncFunction {
  return isFunction(value) && resolvePrototypeString(value) === PROTOTYPE_TAGS.asyncFunction;
}

export function isGeneratorFunction(value: unknown): value is AnyGeneratorFunction {
  return isFunction(value) && resolvePrototypeString(value) === PROTOTYPE_TAGS.generatorFunction;
}

export function isAsyncGeneratorFunction(value: unknown): value is AnyAsyncGeneratorFunction {
  return isFunction(value) && resolvePrototypeString(value) === PROTOTYPE_TAGS.asyncGeneratorFunction;
}
