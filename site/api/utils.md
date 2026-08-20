# @pawover/kit-utils

静态工具类：15 个类、144 个静态方法。核心入口 13 个类，`MathUtil` / `ViteUtil` 走子路径。

## 核心工具类

| 类 | 方法数 | 说明 |
| :--- | :--- | :--- |
| `ArrayUtil` | 16 | 数组构造、差集/交集、合并去重、zip 压缩、分块、分组 |
| `TypeUtil` | 44 | 类型判定与收窄（isXxx 族） |
| `ValidateUtil` | 32 | 手机号、邮箱、身份证、车牌、路径、数值等格式校验 |
| `ObjectUtil` | 11 | keys/values/entries、pick/omit、invert、crush 压平、枚举工具 |
| `StringUtil` | 12 | 类型化 cast、数字提取、模板替换、码位截断、路径转 POSIX |
| `TreeUtil` | 6 | 行转树、树转行、遍历、查找、过滤、映射 |
| `EnvUtil` | 10 | 浏览器/Worker/RN/iframe/桌面/移动/平板环境判定 |
| `CurrencyUtil` | 2 | 货币格式化（Intl）、精确十进制转换（mathjs） |
| `DateTimeUtil` | 1 + 常量 | 时间常量、`FORMAT` 模板、时区获取 |
| `MimeUtil` | 2 + 常量 | 110+ 文件 MIME 常量、后缀名双向转换 |
| `FunctionUtil` | 3 | Promise 转元组、Arguments 转数组、统一 Promise 化 |
| `NumberUtil` | 1 | 区间检查 |
| `ThemeUtil` | 常量 | `THEME` / `THEME_MODE` 枚举常量 |

## 子路径

| 导入路径 | 类 | 说明 |
| :--- | :--- | :--- |
| `@pawover/kit/utils/math`（或 `@pawover/kit/math`） | `MathUtil` | mathjs 封装：BigNumber 转换、十进制、表达式求值 |
| `@pawover/kit/utils/vite`（或 `@pawover/kit/vite`） | `ViteUtil` | Vite `server.proxy` 配置生成 |

## 用法

```ts
import { ArrayUtil, TreeUtil, TypeUtil } from "@pawover/kit/utils";
import { MathUtil } from "@pawover/kit/utils/math";
import { ViteUtil } from "@pawover/kit/utils/vite";

ArrayUtil.zip([1, 2], ["a", "b"]); // [[1, "a"], [2, "b"]]
TypeUtil.isPlainObject({}); // true
TreeUtil.rowsToTree(rows); // 行转树
```

> [!WARNING]
> `CurrencyUtil.toRealValue` 与 `MathUtil` 需要 `mathjs`（可选 peer 依赖）。

## 完整参考

- [核心入口全部导出（自动生成）](utils/index/) —— 每个类、方法的签名与 JSDoc 示例
- [math 子路径（自动生成）](utils/math/) / [vite 子路径（自动生成）](utils/vite/)
