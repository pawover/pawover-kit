import type { PlainObject } from "@pawover/types";

/**
 * 判断一个对象是否为有效的枚举
 * - 枚举成员不能为空
 * - 枚举成员的键不能具有数值名
 * - 枚举成员的值必须类型一致且为 `string` 或 `number` 类型
 * - 枚举成员的值不能重复
 * - 枚举成员的值必须全部为双向映射或非双向映射
 *
 * @param enumeration 待检查值
 * @returns [是否为有效的枚举, 是否为双向枚举]
 */
export function isEnumeration (enumeration: PlainObject): [boolean, boolean] {
  if (typeof enumeration !== "object" || enumeration === null) {
    return [false, false];
  }

  const keys = Object.keys(enumeration);

  // 枚举成员不能为空
  if (keys.length === 0) {
    return [false, false];
  }

  const originalKeys: string[] = [];
  const numericKeys: string[] = [];

  // 区分 "原始枚举键" 和 "反向映射产生的数值键"
  for (const key of keys) {
    // 正则 /^\d+$/ 匹配纯数字字符串，如 "0", "1", "123"
    // 注意：这只会匹配键名，不会匹配值
    if (/^\d+$/.test(key)) {
      numericKeys.push(key);
    } else {
      originalKeys.push(key);
    }
  }

  // 必须有原始的枚举成员（即键名不能全是数字）
  if (originalKeys.length === 0) {
    return [false, false];
  }

  // 5. 检查原始枚举成员的值
  let valueType: "string" | "number" | null = null;
  const values: (string | number)[] = [];

  for (const key of originalKeys) {
    const value = enumeration[key];
    const type = typeof value;

    // 值必须是 string 或 number
    if (type !== "string" && type !== "number") {
      return [false, false];
    }

    // 检查类型一致性
    if (valueType === null) {
      valueType = type;
    } else if (type !== valueType) {
      return [false, false];
    }

    values.push(value as string | number);
  }

  // 检查值是否重复
  if (new Set(values).size !== values.length) {
    return [false, false];
  }

  // 判断是否为双向枚举
  let isBidirectional = false;

  // 如果 numericKeys.length === 0 说明没有反向映射键
  if (numericKeys.length > 0) {
    // 如果存在数值键，说明可能是 TS 数字枚举编译后的结果
    // 此时必须满足严格的双向映射规则：

    // 数值键数量必须等于原始键数量
    if (numericKeys.length !== originalKeys.length) {
      return [false, false];
    }

    const reverseMappedNames = new Set<string>();

    for (const numKey of numericKeys) {
      const reverseValue = enumeration[numKey];

      // 反向映射的值必须是字符串（即原始键名）
      if (typeof reverseValue !== "string") {
        return [false, false];
      }

      // 反向映射的值必须是已知的原始键名之一
      if (!originalKeys.includes(reverseValue)) {
        return [false, false];
      }

      reverseMappedNames.add(reverseValue);
    }

    // 所有原始键名都必须和反向映射对应
    if (reverseMappedNames.size !== originalKeys.length) {
      return [false, false];
    }

    isBidirectional = true;
  }

  return [true, isBidirectional];
}
