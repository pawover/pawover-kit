import { isString } from "../typeof";

export function stringToValues<T extends number | string = number>(data: string | null | undefined, valueType: "number" | "string" = "number", splitSymbol = ","): T[] {
  if (isString(data) && data) {
    try {
      const values = data.split(splitSymbol);

      if (valueType === "number") {
        return values.map((d) => Number(d)) as unknown as T[];
      }

      return values as unknown as T[];
    } catch (error) {
      return [];
    }
  } else {
    return [];
  }
}
