/**
 * 预设配置
 *
 * 供各规则组共享的基础预设：缩进大小与 TypeScript 类成员排序规则。
 *
 * @example
 * ```ts
 * import preset from "@pawover/kit-eslint-rules/src/preset";
 *
 * console.log(preset.indent); // 2
 * ```
 */
export default {
  /** 缩进大小 */
  indent: 2,
  /** TypeScript 类成员排序 */
  tsMemberOrder: [
    // 1. 签名
    "signature",
    "call-signature",

    // 2. 静态字段（单一分组，不细分访问修饰符顺序）
    //    静态字段按声明顺序初始化：若强制 private 先于 public，
    //    私有静态字段引用后声明的公有静态字段（如派生查找表引用常量枚举）时，
    //    会在类初始化阶段触发 TDZ（ReferenceError）。
    //    故静态字段合并为单一分组，由开发者按依赖关系（被依赖者在前）自行排列。
    "static-field",

    // 3. 静态初始化块（置于所有静态字段之后，可安全引用任意静态字段）
    "static-initialization",

    // 4. 实例字段（实例字段初始化无 TDZ 语义，保留 private 优先的代码风格）
    "#private-instance-field",
    "private-instance-field",
    "protected-instance-field",
    "public-instance-field",
    "instance-field",

    "#private-field",
    "private-field",
    "protected-field",
    "public-field",
    "field",

    // 5. 构造函数
    "private-constructor",
    "protected-constructor",
    "public-constructor",

    // 6. 访问器 (Get/Set)
    //    静态/抽象/实例访问器均为惰性求值（调用时执行），无初始化顺序语义
    "#private-static-get",
    "#private-static-set",
    "private-static-get",
    "private-static-set",
    "protected-static-get",
    "protected-static-set",
    "public-static-get",
    "public-static-set",
    "static-get",
    "static-set",

    "protected-abstract-get",
    "protected-abstract-set",
    "public-abstract-get",
    "public-abstract-set",
    "abstract-get",
    "abstract-set",

    "#private-instance-get",
    "#private-instance-set",
    "private-instance-get",
    "private-instance-set",
    "protected-instance-get",
    "protected-instance-set",
    "public-instance-get",
    "public-instance-set",
    "instance-get",
    "instance-set",

    "private-decorated-get",
    "private-decorated-set",
    "protected-decorated-get",
    "protected-decorated-set",
    "public-decorated-get",
    "public-decorated-set",
    "decorated-get",
    "decorated-set",

    "#private-get",
    "#private-set",
    "private-get",
    "private-set",
    "protected-get",
    "protected-set",
    "public-get",
    "public-set",
    "get",
    "set",

    // 7. 方法（方法体惰性执行，无初始化顺序语义）
    "#private-static-method",
    "private-static-method",
    "protected-static-method",
    "public-static-method",
    "static-method",

    "#private-instance-method",
    "private-instance-method",
    "protected-instance-method",
    "public-instance-method",
    "instance-method",

    "private-method",
    "protected-method",
    "public-method",
    "#private-method",
    "method",
  ],
};
