import { isString } from "../typeof";

const m1 = /\S+/g;
const m2 = /[^a-zA-Z\u00C0-\u017F]/;

/**
 * 首字母大小写
 */
export function stringInitialCase(input: string, type: "lower" | "upper") {
  if (!isString(input) || input.length === 0) {
    return input;
  }

  return input.replace(m1, (word) => {
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
