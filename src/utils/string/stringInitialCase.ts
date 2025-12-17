import { isString } from "../typeof";

const R1 = /\S+/g;
const R2 = /[^a-zA-Z\u00C0-\u017F]/;

/**
 * 字符串首字母大小写
 * - 包含非西欧字母字符时，不处理
 * - 纯字母且全大写时，不处理
 * - 纯字母且非全大写时，首字母小写，其余保留
 * - 纯字母且非全大写时，首字母大写，其余保留
 *
 * @param input 待处理字符串
 * @param caseType 大小写类型
 */
export function stringInitialCase(input: string, caseType?: "lower" | "upper" | undefined) {
  if (!isString(input) || !input.length) {
    return "";
  }

  return input.replace(R1, (word) => {
    // 非西欧字母字符（如.,'-等）→ 保留
    if (R2.test(word)) {
      return word;
    }
    // 纯字母且全大写 → 保留
    if (word === word.toLocaleUpperCase()) {
      return word;
    }
    // 纯字母且非全大写 → 首字母小写，其余保留
    if (caseType === "lower" && word[0]) {
      return word[0].toLocaleLowerCase() + word.slice(1);
    }
    // 纯字母且非全大写 → 首字母大写，其余保留
    if (caseType === "upper" && word[0]) {
      return word[0].toLocaleUpperCase() + word.slice(1);
    }

    return word;
  });
}
