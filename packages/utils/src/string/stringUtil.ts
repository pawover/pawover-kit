import type { AnyObject, PlainObject } from "@pawover/types";
import type { Replace } from "type-fest";

import { TypeUtil } from "../type";

/**
 * 字符串工具类
 */
export class StringUtil {
  /**
   * 从字符串中提取数字字符串
   * - 移除非数字字符，保留符号和小数点
   *
   * @param input 待处理字符串
   * @returns 提取出的数字字符串
   * @example
   * ```ts
   * StringUtil.toNumber("$1,234.56"); // "1234.56"
   * StringUtil.toNumber("abc-123"); // "-123"
   * ```
   */
  static toNumber (input: string) {
    if (!TypeUtil.isString(input, true)) {
      return "0";
    }

    const cleaned = input.replace(/[^0-9.-]/g, "");

    if (!cleaned) {
      return "0";
    }

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

  /**
   * 将字符串转换为小写
   * - 将字符串字面量类型转换为其小写形式
   * - 当输入无效时，返回空字符串
   *
   * @param input 待处理字符串
   * @returns 转换后的小写字符串类型，如果输入无效则返回空字符串类型 ""
   * @example
   * ```ts
   * StringUtil.toLowerCase("HELLO"); // "hello"
   * StringUtil.toLowerCase(null); // ""
   * ```
   */
  static toLowerCase<const T extends string>(input: T): Lowercase<T>;
  static toLowerCase (input: unknown): "";
  static toLowerCase<const T extends string>(input: T): Lowercase<T> | "" {
    if (!TypeUtil.isString(input, true)) {
      return "";
    }

    return input.toLowerCase() as Lowercase<T>;
  }

  /**
   * 将字符串转换为大写
   * - 将字符串字面量类型转换为其大写形式
   * - 当输入无效时，返回空字符串
   *
   * @param input 待处理字符串
   * @returns 转换后的大写字符串，如果输入无效则返回空字符串
   * @example
   * ```ts
   * StringUtil.toUpperCase("hello"); // "HELLO"
   * StringUtil.toUpperCase(null); // ""
   * ```
   */
  static toUpperCase<const T extends string>(input: T): Uppercase<T>;
  static toUpperCase (input: unknown): "";
  static toUpperCase<const T extends string>(input: T): Uppercase<T> | "" {
    if (!TypeUtil.isString(input, true)) {
      return "";
    }

    return input.toUpperCase() as Uppercase<T>;
  }

  /**
   * 字符串首字母大小写
   * - 包含非西欧字母字符时，不处理
   * - 纯字母且全大写时，不处理
   * - 纯字母且非全大写时，首字母小写，其余保留
   * - 纯字母且非全大写时，首字母大写，其余保留
   *
   * @param input 待处理字符串
   * @param caseType 大小写类型
   * @returns 处理后的字符串
   * @example
   * ```ts
   * StringUtil.toInitialCase("Hello", "lower"); // "hello"
   * StringUtil.toInitialCase("hello", "upper"); // "Hello"
   * ```
   */
  static toInitialCase (input: string, caseType?: "lower" | "upper" | undefined) {
    if (!TypeUtil.isString(input, true)) {
      return "";
    }

    return input.replace(/\S+/g, (word) => {
      // 非西欧字母字符（如.,'-等）→ 保留
      if (/[^a-zA-Z\u00C0-\u017F]/.test(word)) {
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

  /**
   * 将路径转换为 POSIX 风格
   * - 统一使用正斜杠 (/)
   * - 可选移除 Windows 盘符 (如 C:)
   * - 可选移除开头的斜杠
   * - 规范化连续斜杠为单个斜杠
   *
   * @param input 待处理字符串
   * @param removeLeadingSlash 是否移除开头斜杠，默认为 `false`。如果移除了盘符，路径通常会以 / 开头，此参数可控制是否保留该 /
   * @returns 转换后的路径，如果输入无效则返回空字符串
   *
   * @example
   * ```ts
   * StringUtil.toPosix("C:\\Windows\\System32"); // 默认: "/Windows/System32" (移除了 C: 并标准化)
   *
   * StringUtil.toPosix("C:\\Windows\\System32", true); // 移除开头斜杠: "Windows/System32"
   *
   * StringUtil.toPosix("\\\\server\\share\\file.txt"); // UNC 路径: "/server/share/file.txt"
   *
   * StringUtil.toPosix("folder\\subfolder\\file.txt"); // 相对路径: "folder/subfolder/file.txt"
   * ```
   */
  static toPosix (input: string | null | undefined, removeLeadingSlash = false) {
    if (!TypeUtil.isString(input, true)) {
      return "";
    }

    // 1. 移除 Windows 盘符 (例如 "C:", "d:") 替换为: 如果盘符后有斜杠，则保留一个正斜杠作为根目录标识；否则不留斜杠
    let normalized = input.replace(/^[A-Za-z]:([\\/])?/, (_, separator) => {
      // 如果盘符后有分隔符 (如 C:\ 或 C:/)，则替换为单个正斜杠 "/"
      // 如果盘符后无分隔符 (如 C:file.txt，这是 Windows 相对当前目录的路径)，则替换为空字符串
      return separator ? "/" : "";
    });
    // 2. 替换所有反斜杠为正斜杠
    normalized = normalized.replace(/\\/g, "/");
    // 3. 合并连续斜杠
    normalized = normalized.replace(/\/+/g, "/");
    // 4. 移除开头斜杠
    if (removeLeadingSlash && normalized.startsWith("/")) {
      normalized = normalized.substring(1);
    }

    return normalized;
  }

  /**
   * 处理 JSON 字符串
   *
   * @param input 待处理字符串
   * @param fallback 当解析失败或输入无效时的返回
   * @returns 解析后的对象 或 安全值
   * @example
   * ```ts
   * StringUtil.toJson('{"a": 1}', {}); // { a: 1 }
   * StringUtil.toJson('invalid', {}); // {}
   * ```
   */
  static toJson<D extends AnyObject = AnyObject>(input: string | null | undefined): D | undefined;
  static toJson<D extends AnyObject = AnyObject>(input: string | null | undefined, fallback: D): D;
  static toJson<D extends AnyObject = AnyObject>(input: string | null | undefined, fallback?: D | undefined): D | undefined {
    if (!TypeUtil.isString(input, true)) {
      return fallback;
    }

    try {
      const value = JSON.parse(input);

      return value;
    } catch (error) {
      return fallback;
    }
  }

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
   * StringUtil.toValues("1,2,3"); // [1, 2, 3]
   * StringUtil.toValues("a-b-c", "string", "-"); // ["a", "b", "c"]
   * ```
   */
  static toValues (input: string | null | undefined, valueType?: "number" | undefined, splitSymbol?: string | undefined): number[];
  static toValues (input: string | null | undefined, valueType: "string", splitSymbol?: string | undefined): string[];
  static toValues (input: string | null | undefined, valueType: "number" | "string" = "number", splitSymbol = ","): (number | string)[] {
    if (!TypeUtil.isString(input, true)) {
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

  /**
   * 从字符串中裁切掉所有的前缀和后缀字符
   *
   * @param input 待处理字符串
   * @param charsToTrim 裁切字符，默认为 `" "`
   * @returns 裁切后的字符串
   * @example
   * ```ts
   * StringUtil.trim("  hello  "); // "hello"
   * StringUtil.trim("__hello__", "_"); // "hello"
   * ```
   */
  static trim (input: string | null | undefined, charsToTrim = " "): string {
    if (!TypeUtil.isString(input, true)) {
      return "";
    }
    const toTrim = charsToTrim.replace(/[\W]{1}/g, "\\$&");
    const regex = new RegExp(`^[${toTrim}]+|[${toTrim}]+$`, "g");

    return input.replace(regex, "");
  }

  /**
   * 截取字符串
   * - 支持自定义省略符，不会截断在汉字中间（因为JS字符串本身按字符处理）
   *
   * @param input 待处理字符串
   * @param maxLength 最大长度 (包含省略符)
   * @param ellipsis 省略符，默认为 `...`
   * @returns 截取后的字符串
   * @example
   * ```ts
   * StringUtil.truncate("hello world", 8); // "hello..."
   * ```
   */
  static truncate (input: string, maxLength: number, ellipsis = "...") {
    if (!TypeUtil.isString(input, true)) {
      return "";
    }

    // 将字符串转换为码位数组，以正确处理多字节字符
    const codePoints = Array.from(input);

    if (!TypeUtil.isInteger(maxLength) || maxLength < 0) {
      return input;
    }

    // 如果整个字符串（以码位计数）都短于或等于最大长度，则返回原字符串
    if (codePoints.length <= maxLength) {
      return input;
    }

    // 计算可用于原始内容的码位数量
    const availableLength = maxLength - ellipsis.length;

    if (availableLength <= 0) {
      return "";
    }

    const truncated = codePoints.slice(0, availableLength).join("");

    return truncated + ellipsis;
  }

  /**
   * 字符串模板替换
   * - 使用对象的属性值替换字符串中的 {{key}} 模板
   *
   * @param input 待处理字符串
   * @param template 模板对象
   * @param regex 模板匹配正则 (默认: `\{\{(.+?)\}\}`)
   * @returns 替换后的字符串
   * @example
   * ```ts
   * StringUtil.template("Hello {{name}}", { name: "World" }); // "Hello World"
   * ```
   */
  static template (input: string, template: PlainObject, regex = /\{\{(.+?)\}\}/g) {
    if (!TypeUtil.isString(input, true)) {
      return "";
    }

    // 重置正则表达式的 lastIndex，防止上次执行的影响
    regex.lastIndex = 0;

    let result = "";
    let from = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(input))) {
      // 获取模板对象中对应的值
      const replacement = template[match[1]!];
      // 如果值为 null 或 undefined，则保留原始的占位符
      const valueToInsert = replacement === null || replacement === undefined ? match[0] : replacement;

      result += input.slice(from, match.index) + valueToInsert;
      from = regex.lastIndex;
    }

    return result + input.slice(from);
  }

  /**
   * 字符串替换
   * - 替换第一个匹配项
   *
   * @param input 待处理字符串
   * @param search 匹配项
   * @param replacement 替换项
   * @returns 替换后的字符串
   * @example
   * ```ts
   * StringUtil.replace("hello world", "world", "context"); // "hello context"
   * ```
   */
  static replace<I extends string, S extends string, R extends string>(input: I, search: S, replacement: R) {
    if (!TypeUtil.isString(input, true)) {
      return "" as Replace<I, S, R>;
    }

    return input.replace(search, replacement) as Replace<I, S, R>;
  }
}
