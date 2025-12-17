import { isString } from "../typeof";


/**
 * 字符串分割为数组
 *
 * @param input 待处理字符串
 * @param valueType 数组中每一项的类型
 * @param splitSymbol 分隔符，默认为 `,`
 */
export function stringToValues(input: string | null | undefined, valueType?: "number" | undefined, splitSymbol?: string | undefined): number[];
export function stringToValues(input: string | null | undefined, valueType: "string", splitSymbol?: string | undefined): string[];
export function stringToValues(input: string | null | undefined, valueType: "number" | "string" = "number", splitSymbol = ","): (number | string)[] {
  if (!isString(input) || !input.length) {
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
