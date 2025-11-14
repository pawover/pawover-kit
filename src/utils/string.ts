import { isString } from "./typeof";

/**
 * 转义特殊字符
 *
 * @link https://github.com/sindresorhus/escape-string-regexp
 * @param value 字符串
 */
export function escapeStringRegexp(value: string): string {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

/**
 * 首字母大小写
 */
export function stringInitialCase(value: string, type: "lower" | "upper") {
  if (!isString(value) || value.length === 0) {
    return value;
  }

  const m1 = /\S+/g;
  const m2 = /[^a-zA-Z\u00C0-\u017F]/;

  return value.replace(m1, (word) => {
    // 单词含非字母字符（如.,'-等）→ 原样保留
    if (m2.test(word)) {
      return word;
    }
    // 纯字母且全大写 → 保留
    if (word === word.toLocaleUpperCase()) {
      return word;
    }
    // 纯字母且非全大写 → 首字母小写，其余保留
    if (type === "lower" && word[0]) {
      return word[0].toLocaleLowerCase() + word.slice(1);
    }
    // 纯字母且非全大写 → 首字母大写写，其余保留
    if (type === "upper" && word[0]) {
      return word[0].toLocaleUpperCase() + word.slice(1);
    }

    return word;
  });
}

export function stringToJson<R extends AnyObject = AnyObject, D extends R = R>(
  data: string | null | undefined,
  safeValue: D,
): R {
  if (isString(data) && data) {
    try {
      const value = JSON.parse(data);

      return value;
    } catch (error) {
      return safeValue;
    }
  } else {
    return safeValue;
  }
}

export function stringToValues<T extends number | string = number>(
  data: string | null | undefined,
  valueType: "number" | "string" = "number",
): T[] {
  if (isString(data) && data) {
    try {
      const values = data.split(",");

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
