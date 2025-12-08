/**
 * 从字符串中提取数字
 */
export function stringToNumber(input: string) {
  const cleaned = input.replace(/[^0-9.-]/g, "");
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
