# 表单校验实战

`ValidateUtil` 提供 32 个常用格式校验，`zod` 包提供 30 个 Schema，两者可单独使用也可组合。

## 单字段校验

```ts
import { ValidateUtil } from "@pawover/kit/utils";

ValidateUtil.isPhone("13800138000"); // true
ValidateUtil.isEmail("dev@pawover.dev"); // true
ValidateUtil.isChineseName("张三"); // true
ValidateUtil.isUSCC("91350100M000100Y43"); // 统一社会信用代码
ValidateUtil.isEVCarNumber("粤BD12345"); // 新能源车牌
ValidateUtil.isGVCarNumber("京A12345"); // 燃油车牌
ValidateUtil.isChineseID("110101199003071234"); // 身份证（格式 + 生日合法性）
ValidateUtil.isSignedFloat("-3.14"); // true
ValidateUtil.isUnsignedInteger("42"); // true
```

## 正则之外的数值区间

`NumberUtil.within` 做区间检查（默认左闭右开）：

```ts
import { NumberUtil } from "@pawover/kit/utils";

NumberUtil.within(5, [1, 10]); // true
NumberUtil.within(10, [1, 10]); // false（右开）
NumberUtil.within(10, [1, 10], true, true); // true（双闭）
NumberUtil.within(0, [1, 10]); // throws：非法输入
```

## 类型判空组合

`TypeUtil` 的判空与类型收窄在表单逻辑里很常用：

```ts
import { TypeUtil } from "@pawover/kit/utils";

function normalize(input: unknown) {
  if (TypeUtil.isNullish(input) || TypeUtil.isString(input, true) === false) {
    return "";
  }
  return input.trim();
}
```

## Zod Schema 组合表单

```ts
import { z } from "zod";
import { id, stringNoEmpty, integerPositive } from "@pawover/kit/zod";

const userSchema = z.object({
  id: id, // string 或 number，均非空
  name: stringNoEmpty, // 非空字符串
  age: integerPositive, // 正整数和零
});

userSchema.parse({ id: 1, name: "张三", age: 18 });
```

## 字符串工具兜底

输入清洗常用 `StringUtil`：

```ts
import { StringUtil } from "@pawover/kit/utils";

StringUtil.toNumber("$1,234.56"); // "1234.56"
StringUtil.truncate("支持多字节的截断🐱", 6); // "支持多..."（码位截断，省略符计入长度）
StringUtil.template("你好，{{name}}", { name: "张三" }); // "你好，张三"
```
