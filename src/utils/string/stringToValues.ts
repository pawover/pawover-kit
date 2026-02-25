import { isString } from "../typeof";

/**
 * 字符串分割为数组
 * - 按指定分隔符分割字符串，并转换类型
 *
 * @param input 待处理字符串
 * @param valueType 数组中每一项的类型，默认为 "number"
 * @param splitSymbol 分隔符，默认为 `,`
 * @returns 分割后的数组
 * @example
 * ```ts
 * stringToValues("1,2,3"); // [1, 2, 3]
 * stringToValues("a-b-c", "string", "-"); // ["a", "b", "c"]
 * ```
 */
export function stringToValues (input: string | null | undefined, valueType?: "number" | undefined, splitSymbol?: string | undefined): number[];
export function stringToValues (input: string | null | undefined, valueType: "string", splitSymbol?: string | undefined): string[];
export function stringToValues (input: string | null | undefined, valueType: "number" | "string" = "number", splitSymbol = ","): (number | string)[] {
  if (!isString(input, true)) {
    return [];
  }

  try {
    const values = input.split(splitSymbol);

    if (valueType === "number") {
      return values.map((d) => Number(d));
    }

    return values;
  } catch (error) {
    return [];
  }
}
