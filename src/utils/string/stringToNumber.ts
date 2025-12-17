import { isString } from "../typeof";

const R1 = /[^0-9.-]/g;

/**
 * 从字符串中提取数字字符串
 *
 * @param input 待处理字符串
 */
export function stringToNumber(input: string) {
  if (!isString(input) || !input.length) {
    return "";
  }

  const cleaned = input.replace(R1, "");
  let isDecimal = false;
  let signCount = 0;
  let firstIndex = -1;
  const stringList = cleaned.split("").map((s, i) => {
    if (s === ".") {
      if (isDecimal) {
        return "";
      }
      isDecimal = true;

      return ".";
    }
    if (s === "-") {
      firstIndex === -1 && signCount++;

      return "";
    }

    firstIndex === -1 && (firstIndex = i);

    return s;
  });

  const sign = signCount % 2 === 1 ? "-" : "";

  if (firstIndex === -1) {
    return sign + "0";
  }

  // 组合符号和数字部分，并处理前导小数点
  let result = stringList.join("");
  if (result.startsWith(".")) {
    result = "0" + result;
  }
  if (result.endsWith(".")) {
    result = result.slice(0, -1);
  }

  return sign + result;
}
