import type { AnyAsyncFunction, AnyAsyncGeneratorFunction, AnyFunction, AnyGeneratorFunction } from "@pawover/types";
import { PROTOTYPE_TAGS, resolvePrototypeString } from "./types";

/**
 * 检查 value 是否为 Function
 * @param value 待检查值
 * @returns 是否为 Function
 */
export function isFunction (value: unknown): value is AnyFunction {
  return typeof value === "function";
}

/**
 * 检查 value 是否为 AsyncFunction
 * @param value 待检查值
 * @returns 是否为 AsyncFunction
 */
export function isAsyncFunction (value: unknown): value is AnyAsyncFunction {
  return isFunction(value) && resolvePrototypeString(value) === PROTOTYPE_TAGS.asyncFunction;
}

/**
 * 检查 value 是否为 GeneratorFunction
 * @param value 待检查值
 * @returns 是否为 GeneratorFunction
 */
export function isGeneratorFunction (value: unknown): value is AnyGeneratorFunction {
  return isFunction(value) && resolvePrototypeString(value) === PROTOTYPE_TAGS.generatorFunction;
}

/**
 * 检查 value 是否为 AsyncGeneratorFunction
 * @param value 待检查值
 * @returns 是否为 AsyncGeneratorFunction
 */
export function isAsyncGeneratorFunction (value: unknown): value is AnyAsyncGeneratorFunction {
  return isFunction(value) && resolvePrototypeString(value) === PROTOTYPE_TAGS.asyncGeneratorFunction;
}
