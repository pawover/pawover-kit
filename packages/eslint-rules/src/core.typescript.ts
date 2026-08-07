import preset from "./preset.js";

export default {
  /**
   * @desc 强制类方法使用 this
   * @descEN Enforce that class methods utilize this
   * @see https://typescript-eslint.io/rules/class-methods-use-this
   */
  "class-methods-use-this": 0,
  /**
   * @desc 强制默认参数在最后
   * @descEN Enforce default parameters to be last
   * @see https://typescript-eslint.io/rules/default-param-last
   */
  "default-param-last": 0,
  /**
   * @desc 强制尽可能使用点号表示法
   * @descEN Enforce dot notation whenever possible
   * @see https://typescript-eslint.io/rules/dot-notation
   */
  "dot-notation": 0,
  /**
   * @desc 要求或禁止变量声明中初始化
   * @descEN Require or disallow initialization in variable declarations
   * @see https://typescript-eslint.io/rules/init-declarations
   */
  "init-declarations": 0,
  /**
   * @desc 强制函数定义中最大参数数量
   * @descEN Enforce a maximum number of parameters in function definitions
   * @see https://typescript-eslint.io/rules/max-params
   */
  "max-params": 0,
  /**
   * @desc 禁止泛型 Array 构造函数
   * @descEN Disallow generic Array constructors
   * @see https://typescript-eslint.io/rules/no-array-constructor
   */
  "no-array-constructor": 0,
  /**
   * @desc 禁止重复的类成员
   * @descEN Disallow duplicate class members
   * @see https://typescript-eslint.io/rules/no-dupe-class-members
   */
  "no-dupe-class-members": 0,
  /**
   * @desc 禁止空函数
   * @descEN Disallow empty functions
   * @see https://typescript-eslint.io/rules/no-empty-function
   */
  "no-empty-function": 0,
  /**
   * @desc 禁止使用类似 eval 的函数
   * @descEN Disallow the use of eval()-like functions
   * @see https://typescript-eslint.io/rules/no-implied-eval
   */
  "no-implied-eval": 0,
  /**
   * @desc 禁止在循环语句中包含不安全引用的函数声明
   * @descEN Disallow function declarations that contain unsafe references inside loop statements
   * @see https://typescript-eslint.io/rules/no-loop-func
   */
  "no-loop-func": 0,
  /**
   * @desc 禁止魔术数字
   * @descEN Disallow magic numbers
   * @see https://typescript-eslint.io/rules/no-magic-numbers
   */
  "no-magic-numbers": 0,
  /**
   * @desc 禁止变量重复声明
   * @descEN Disallow variable redeclaration
   * @see https://typescript-eslint.io/rules/no-redeclare
   */
  "no-redeclare": 0,
  /**
   * @desc 禁止导入特定模块
   * @descEN Disallow specified modules when loaded by import
   * @see https://typescript-eslint.io/rules/no-restricted-imports
   */
  "no-restricted-imports": 0,
  /**
   * @desc 禁止变量声明遮蔽外层作用域变量
   * @descEN Disallow variable declarations from shadowing variables declared in the outer scope
   * @see https://typescript-eslint.io/rules/no-shadow
   */
  "no-shadow": 0,
  /**
   * @desc 禁止未使用的表达式
   * @descEN Disallow unused expressions
   * @see https://typescript-eslint.io/rules/no-unused-expressions
   */
  "no-unused-expressions": 0,
  /**
   * @desc 禁止未使用的变量
   * @descEN Disallow unused variables
   * @see https://typescript-eslint.io/rules/no-unused-vars
   */
  "no-unused-vars": 0,
  /**
   * @desc 禁止在定义之前使用变量
   * @descEN Disallow the use of variables before they are defined
   * @see https://typescript-eslint.io/rules/no-use-before-define
   */
  "no-use-before-define": 0,
  /**
   * @desc 禁止不必要的构造函数
   * @descEN Disallow unnecessary constructors
   * @see https://typescript-eslint.io/rules/no-useless-constructor
   */
  "no-useless-constructor": 0,
  /**
   * @desc 要求从数组和/或对象进行解构
   * @descEN Require destructuring from arrays and/or objects
   * @see https://typescript-eslint.io/rules/prefer-destructuring
   */
  "prefer-destructuring": 0,
  /**
   * @desc 要求使用 Error 对象作为 Promise 拒绝原因
   * @descEN Require using Error objects as Promise rejection reasons
   * @see https://typescript-eslint.io/rules/prefer-promise-reject-errors
   */
  "prefer-promise-reject-errors": 0,
  /**
   * @desc 禁止没有 await 表达式且不返回 Promise 的异步函数
   * @descEN Disallow async functions which do not have await expression
   * @see https://typescript-eslint.io/rules/require-await
   */
  "require-await": 0,

  /**
   * @desc 要求函数重载签名连续
   * @descEN Require that function overload signatures be consecutive
   * @see https://typescript-eslint.io/rules/adjacent-overload-signatures
   */
  "ts/adjacent-overload-signatures": 2,
  /**
   * @desc 要求一致使用 T[] 或 Array<T>
   * @descEN Require consistently using either T[] or Array<T> for arrays
   * @see https://typescript-eslint.io/rules/array-type
   */
  "ts/array-type": 2,
  /**
   * @desc 禁止 await 非 Thenable 的值
   * @descEN Disallow awaiting a value that is not a Thenable
   * @see https://typescript-eslint.io/rules/await-thenable
   */
  "ts/await-thenable": 0,
  /**
   * @desc 禁止 @ts-<directive> 注释或要求指令后带说明
   * @descEN Disallow @ts-<directive> comments or require descriptions after directives
   * @see https://typescript-eslint.io/rules/ban-ts-comment
   */
  "ts/ban-ts-comment": 0,
  /**
   * @desc 禁止 // tslint:<rule-flag> 注释
   * @descEN Disallow // tslint:<rule-flag> comments
   * @see https://typescript-eslint.io/rules/ban-tslint-comment
   */
  "ts/ban-tslint-comment": 0,
  /**
   * @desc 强制类上的字面量以一致风格暴露
   * @descEN Enforce that literals on classes are exposed in a consistent style
   * @see https://typescript-eslint.io/rules/class-literal-property-style
   */
  "ts/class-literal-property-style": [2, "fields"],
  /**
   * @desc 强制类方法使用 this
   * @descEN Enforce that class methods utilize this
   * @see https://typescript-eslint.io/rules/class-methods-use-this
   */
  "ts/class-methods-use-this": 0,
  /**
   * @desc 强制在构造函数调用上指定泛型类型参数的风格
   * @descEN Enforce specifying generic type arguments on type annotation or constructor name of a constructor call
   * @see https://typescript-eslint.io/rules/consistent-generic-constructors
   */
  "ts/consistent-generic-constructors": 0,
  /**
   * @desc 要求或禁止 Record 类型
   * @descEN Require or disallow the Record type
   * @see https://typescript-eslint.io/rules/consistent-indexed-object-style
   */
  "ts/consistent-indexed-object-style": 0,
  /**
   * @desc 强制类型断言风格一致
   * @descEN Enforce consistent usage of type assertions
   * @see https://typescript-eslint.io/rules/consistent-type-assertions
   */
  "ts/consistent-type-assertions": 2,
  /**
   * @desc 强制类型定义一致使用 interface 或 type
   * @descEN Enforce type definitions to consistently use either interface or type
   * @see https://typescript-eslint.io/rules/consistent-type-definitions
   */
  "ts/consistent-type-definitions": [2, "interface"],
  /**
   * @desc 强制一致使用 type 导出
   * @descEN Enforce consistent usage of type exports
   * @see https://typescript-eslint.io/rules/consistent-type-exports
   */
  "ts/consistent-type-exports": 2,
  /**
   * @desc 强制一致使用 type 导入
   * @descEN Enforce consistent usage of type imports
   * @see https://typescript-eslint.io/rules/consistent-type-imports
   */
  "ts/consistent-type-imports": [2, { fixStyle: "inline-type-imports" }],
  /**
   * @desc 强制默认参数在最后
   * @descEN Enforce default parameters to be last
   * @see https://typescript-eslint.io/rules/default-param-last
   */
  "ts/default-param-last": 2,
  /**
   * @desc 强制尽可能使用点号表示法
   * @descEN Enforce dot notation whenever possible
   * @see https://typescript-eslint.io/rules/dot-notation
   */
  "ts/dot-notation": 0,
  /**
   * @desc 要求函数和方法有显式返回类型
   * @descEN Require explicit return types on functions and class methods
   * @see https://typescript-eslint.io/rules/explicit-function-return-type
   */
  "ts/explicit-function-return-type": 0,
  /**
   * @desc 要求类属性和方法有显式可访问性修饰符
   * @descEN Require explicit accessibility modifiers on class properties and methods
   * @see https://typescript-eslint.io/rules/explicit-member-accessibility
   */
  "ts/explicit-member-accessibility": 0,
  /**
   * @desc 要求导出函数和类的公共方法有显式返回和参数类型
   * @descEN Require explicit return and argument types on exported functions' and classes' public class methods
   * @see https://typescript-eslint.io/rules/explicit-module-boundary-types
   */
  "ts/explicit-module-boundary-types": 0,
  /**
   * @desc 要求或禁止变量声明中初始化
   * @descEN Require or disallow initialization in variable declarations
   * @see https://typescript-eslint.io/rules/init-declarations
   */
  "ts/init-declarations": 0,
  /**
   * @desc 强制函数定义中最大参数数量
   * @descEN Enforce a maximum number of parameters in function definitions
   * @see https://typescript-eslint.io/rules/max-params
   */
  "ts/max-params": 0,
  /**
   * @desc 要求成员声明顺序一致
   * @descEN Require a consistent member declaration order
   * @see https://typescript-eslint.io/rules/member-ordering
   */
  "ts/member-ordering": [2, { default: preset.tsMemberOrder }],
  /**
   * @desc 强制使用特定的方法签名语法
   * @descEN Enforce using a particular method signature syntax
   * @see https://typescript-eslint.io/rules/method-signature-style
   */
  "ts/method-signature-style": 2,
  /**
   * @desc 强制整个代码库的命名约定
   * @descEN Enforce naming conventions for everything across a codebase
   * @see https://typescript-eslint.io/rules/naming-convention
   */
  "ts/naming-convention": 0,
  /**
   * @desc 禁止泛型 Array 构造函数
   * @descEN Disallow generic Array constructors
   * @see https://typescript-eslint.io/rules/no-array-constructor
   */
  "ts/no-array-constructor": 2,
  /**
   * @desc 禁止对数组值使用 delete 操作符
   * @descEN Disallow using the delete operator on array values
   * @see https://typescript-eslint.io/rules/no-array-delete
   */
  "ts/no-array-delete": 2,
  /**
   * @desc 要求 toString 和 toLocaleString 仅在提供有用信息的对象上调用
   * @descEN Require .toString() to only be called on objects which provide useful information when stringified
   * @see https://typescript-eslint.io/rules/no-base-to-string
   */
  "ts/no-base-to-string": 0,
  /**
   * @desc 禁止在可能混淆的位置使用非空断言
   * @descEN Disallow non-null assertion in locations that may be confusing
   * @see https://typescript-eslint.io/rules/no-confusing-non-null-assertion
   */
  "ts/no-confusing-non-null-assertion": 0,
  /**
   * @desc 要求 void 类型的表达式出现在语句位置
   * @descEN Require expressions of type void to appear in statement position
   * @see https://typescript-eslint.io/rules/no-confusing-void-expression
   */
  "ts/no-confusing-void-expression": [2, { ignoreArrowShorthand: true, ignoreVoidOperator: false }],
  /**
   * @desc 禁止使用标记为 @deprecated 的代码
   * @descEN Disallow using code marked as @deprecated
   * @see https://typescript-eslint.io/rules/no-deprecated
   */
  "ts/no-deprecated": 0,
  /**
   * @desc 禁止重复的类成员
   * @descEN Disallow duplicate class members
   * @see https://typescript-eslint.io/rules/no-dupe-class-members
   */
  "ts/no-dupe-class-members": 2,
  /**
   * @desc 禁止重复的枚举成员值
   * @descEN Disallow duplicate enum member values
   * @see https://typescript-eslint.io/rules/no-duplicate-enum-values
   */
  "ts/no-duplicate-enum-values": 2,
  /**
   * @desc 禁止联合类型或交叉类型中有重复成分
   * @descEN Disallow duplicate constituents of union or intersection types
   * @see https://typescript-eslint.io/rules/no-duplicate-type-constituents
   */
  "ts/no-duplicate-type-constituents": 0,
  /**
   * @desc 禁止对计算键表达式使用 delete 操作符
   * @descEN Disallow using the delete operator on computed key expressions
   * @see https://typescript-eslint.io/rules/no-dynamic-delete
   */
  "ts/no-dynamic-delete": 0,
  /**
   * @desc 禁止空函数
   * @descEN Disallow empty functions
   * @see https://typescript-eslint.io/rules/no-empty-function
   */
  "ts/no-empty-function": 0,
  /**
   * @desc 禁止意外使用空对象类型
   * @descEN Disallow accidentally using the "empty object" type
   * @see https://typescript-eslint.io/rules/no-empty-object-type
   */
  "ts/no-empty-object-type": [2, { allowInterfaces: "with-single-extends" }],
  /**
   * @desc 禁止 any 类型
   * @descEN Disallow the any type
   * @see https://typescript-eslint.io/rules/no-explicit-any
   */
  "ts/no-explicit-any": [2, { fixToUnknown: true, ignoreRestArgs: true }],
  /**
   * @desc 禁止多余的非空断言
   * @descEN Disallow extra non-null assertions
   * @see https://typescript-eslint.io/rules/no-extra-non-null-assertion
   */
  "ts/no-extra-non-null-assertion": 0,
  /**
   * @desc 禁止用作命名空间的类
   * @descEN Disallow classes used as namespaces
   * @see https://typescript-eslint.io/rules/no-extraneous-class
   */
  "ts/no-extraneous-class": 0,
  /**
   * @desc 要求 Promise 风格的语句被正确处理
   * @descEN Require Promise-like statements to be handled appropriately
   * @see https://typescript-eslint.io/rules/no-floating-promises
   */
  "ts/no-floating-promises": 0,
  /**
   * @desc 禁止使用 for-in 循环遍历数组
   * @descEN Disallow iterating over an array with a for-in loop
   * @see https://typescript-eslint.io/rules/no-for-in-array
   */
  "ts/no-for-in-array": 0,
  /**
   * @desc 禁止使用类似 eval 的函数
   * @descEN Disallow the use of eval()-like functions
   * @see https://typescript-eslint.io/rules/no-implied-eval
   */
  "ts/no-implied-eval": 2,
  /**
   * @desc 强制当导入只有内联类型限定符时使用顶级 import type 限定符
   * @descEN Enforce the use of top-level import type qualifier when an import only has specifiers with inline type qualifiers
   * @see https://typescript-eslint.io/rules/no-import-type-side-effects
   */
  "ts/no-import-type-side-effects": 2,
  /**
   * @desc 禁止对初始化为数字、字符串或布尔值的变量或参数使用显式类型声明
   * @descEN Disallow explicit type declarations for variables or parameters initialized to a number, string, or boolean
   * @see https://typescript-eslint.io/rules/no-inferrable-types
   */
  "ts/no-inferrable-types": [2, { ignoreParameters: true, ignoreProperties: true }],
  /**
   * @desc 禁止在泛型或返回类型之外使用 void 类型
   * @descEN Disallow void type outside of generic or return types
   * @see https://typescript-eslint.io/rules/no-invalid-void-type
   */
  "ts/no-invalid-void-type": 2,
  /**
   * @desc 禁止在循环语句中包含不安全引用的函数声明
   * @descEN Disallow function declarations that contain unsafe references inside loop statements
   * @see https://typescript-eslint.io/rules/no-loop-func
   */
  "ts/no-loop-func": 0,
  /**
   * @desc 禁止魔术数字
   * @descEN Disallow magic numbers
   * @see https://typescript-eslint.io/rules/no-magic-numbers
   */
  "ts/no-magic-numbers": 0,
  /**
   * @desc 禁止除用于丢弃值外的 void 运算符
   * @descEN Disallow the void operator except when used to discard a value
   * @see https://typescript-eslint.io/rules/no-meaningless-void-operator
   */
  "ts/no-meaningless-void-operator": 0,
  /**
   * @desc 强制 new 和 constructor 的有效定义
   * @descEN Enforce valid definition of new and constructor
   * @see https://typescript-eslint.io/rules/no-misused-new
   */
  "ts/no-misused-new": 0,
  /**
   * @desc 禁止在不设计处理 Promise 的地方使用 Promise
   * @descEN Disallow Promises in places not designed to handle them
   * @see https://typescript-eslint.io/rules/no-misused-promises
   */
  "ts/no-misused-promises": [2, { checksVoidReturn: false }],
  /**
   * @desc 禁止展开运算符可能导致意外行为的使用
   * @descEN Disallow using the spread operator when it might cause unexpected behavior
   * @see https://typescript-eslint.io/rules/no-misused-spread
   */
  "ts/no-misused-spread": 2,
  /**
   * @desc 禁止枚举同时具有数字和字符串成员
   * @descEN Disallow enums from having both number and string members
   * @see https://typescript-eslint.io/rules/no-mixed-enums
   */
  "ts/no-mixed-enums": 0,
  /**
   * @desc 禁止 TypeScript 命名空间
   * @descEN Disallow TypeScript namespaces
   * @see https://typescript-eslint.io/rules/no-namespace
   */
  "ts/no-namespace": [2, { allowDeclarations: true, allowDefinitionFiles: true }],
  /**
   * @desc 禁止空值合并运算符左操作数中的非空断言
   * @descEN Disallow non-null assertions in the left operand of a nullish coalescing operator
   * @see https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing
   */
  "ts/no-non-null-asserted-nullish-coalescing": 2,
  /**
   * @desc 禁止可选链表达式后的非空断言
   * @descEN Disallow non-null assertions after an optional chain expression
   * @see https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain
   */
  "ts/no-non-null-asserted-optional-chain": 2,
  /**
   * @desc 禁止使用 ! 后缀运算符进行非空断言
   * @descEN Disallow non-null assertions using the ! postfix operator
   * @see https://typescript-eslint.io/rules/no-non-null-assertion
   */
  "ts/no-non-null-assertion": 0,
  /**
   * @desc 禁止变量重复声明
   * @descEN Disallow variable redeclaration
   * @see https://typescript-eslint.io/rules/no-redeclare
   */
  "ts/no-redeclare": 2,
  /**
   * @desc 禁止联合类型或交叉类型中不起作用或覆盖类型信息的成员
   * @descEN Disallow members of unions and intersections that do nothing or override type information
   * @see https://typescript-eslint.io/rules/no-redundant-type-constituents
   */
  "ts/no-redundant-type-constituents": 0,
  /**
   * @desc 禁止调用 require()
   * @descEN Disallow invocation of require()
   * @see https://typescript-eslint.io/rules/no-require-imports
   */
  "ts/no-require-imports": 2,
  /**
   * @desc 禁止导入特定模块
   * @descEN Disallow specified modules when loaded by import
   * @see https://typescript-eslint.io/rules/no-restricted-imports
   */
  "ts/no-restricted-imports": 0,
  /**
   * @desc 禁止某些类型
   * @descEN Disallow certain types
   * @see https://typescript-eslint.io/rules/no-restricted-types
   */
  "ts/no-restricted-types": 0,
  /**
   * @desc 禁止变量声明遮蔽外层作用域变量
   * @descEN Disallow variable declarations from shadowing variables declared in the outer scope
   * @see https://typescript-eslint.io/rules/no-shadow
   */
  "ts/no-shadow": 0,
  /**
   * @desc 禁止别名 this
   * @descEN Disallow aliasing this
   * @see https://typescript-eslint.io/rules/no-this-alias
   */
  "ts/no-this-alias": [2, { allowDestructuring: true }],
  /**
   * @desc 禁止与布尔字面量的不必要相等比较
   * @descEN Disallow unnecessary equality comparisons against boolean literals
   * @see https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare
   */
  "ts/no-unnecessary-boolean-literal-compare": 0,
  /**
   * @desc 禁止条件表达式类型始终为真或始终为假
   * @descEN Disallow conditionals where the type is always truthy or always falsy
   * @see https://typescript-eslint.io/rules/no-unnecessary-condition
   */
  "ts/no-unnecessary-condition": 0,
  /**
   * @desc 禁止不必要的构造函数属性参数赋值
   * @descEN Disallow unnecessary assignment of constructor property parameter
   * @see https://typescript-eslint.io/rules/no-unnecessary-parameter-property-assignment
   */
  "ts/no-unnecessary-parameter-property-assignment": 0,
  /**
   * @desc 禁止不必要的命名空间限定符
   * @descEN Disallow unnecessary namespace qualifiers
   * @see https://typescript-eslint.io/rules/no-unnecessary-qualifier
   */
  "ts/no-unnecessary-qualifier": 0,
  /**
   * @desc 禁止不必要的模板表达式
   * @descEN Disallow unnecessary template expressions
   * @see https://typescript-eslint.io/rules/no-unnecessary-template-expression
   */
  "ts/no-unnecessary-template-expression": 2,
  /**
   * @desc 禁止等于默认值的类型参数
   * @descEN Disallow type arguments that are equal to the default
   * @see https://typescript-eslint.io/rules/no-unnecessary-type-arguments
   */
  "ts/no-unnecessary-type-arguments": 0,
  /**
   * @desc 禁止不改变表达式类型的类型断言
   * @descEN Disallow type assertions that do not change the type of an expression
   * @see https://typescript-eslint.io/rules/no-unnecessary-type-assertion
   */
  "ts/no-unnecessary-type-assertion": 0,
  /**
   * @desc 禁止对泛型类型的不必要约束
   * @descEN Disallow unnecessary constraints on generic types
   * @see https://typescript-eslint.io/rules/no-unnecessary-type-constraint
   */
  "ts/no-unnecessary-type-constraint": 2,
  /**
   * @desc 禁止未多次使用的类型参数
   * @descEN Disallow type parameters that aren't used multiple times
   * @see https://typescript-eslint.io/rules/no-unnecessary-type-parameters
   */
  "ts/no-unnecessary-type-parameters": 0,
  /**
   * @desc 禁止使用类型为 any 的值调用函数
   * @descEN Disallow calling a function with a value with type any
   * @see https://typescript-eslint.io/rules/no-unsafe-argument
   */
  "ts/no-unsafe-argument": 0,
  /**
   * @desc 禁止将类型为 any 的值赋值给变量和属性
   * @descEN Disallow assigning a value with type any to variables and properties
   * @see https://typescript-eslint.io/rules/no-unsafe-assignment
   */
  "ts/no-unsafe-assignment": 0,
  /**
   * @desc 禁止调用类型为 any 的值
   * @descEN Disallow calling a value with type any
   * @see https://typescript-eslint.io/rules/no-unsafe-call
   */
  "ts/no-unsafe-call": 0,
  /**
   * @desc 禁止不安全的声明合并
   * @descEN Disallow unsafe declaration merging
   * @see https://typescript-eslint.io/rules/no-unsafe-declaration-merging
   */
  "ts/no-unsafe-declaration-merging": 0,
  /**
   * @desc 禁止将枚举值与非枚举值比较
   * @descEN Disallow comparing an enum value with a non-enum value
   * @see https://typescript-eslint.io/rules/no-unsafe-enum-comparison
   */
  "ts/no-unsafe-enum-comparison": 0,
  /**
   * @desc 禁止使用不安全的原生 Function 类型
   * @descEN Disallow using the unsafe built-in Function type
   * @see https://typescript-eslint.io/rules/no-unsafe-function-type
   */
  "ts/no-unsafe-function-type": 2,
  /**
   * @desc 禁止访问类型为 any 的属性
   * @descEN Disallow member access on a value with type any
   * @see https://typescript-eslint.io/rules/no-unsafe-member-access
   */
  "ts/no-unsafe-member-access": 0,
  /**
   * @desc 禁止从函数返回类型为 any 的值
   * @descEN Disallow returning a value with type any from a function
   * @see https://typescript-eslint.io/rules/no-unsafe-return
   */
  "ts/no-unsafe-return": 0,
  /**
   * @desc 禁止缩小范围类型的类型断言
   * @descEN Disallow type assertions that narrow a type
   * @see https://typescript-eslint.io/rules/no-unsafe-type-assertion
   */
  "ts/no-unsafe-type-assertion": 0,
  /**
   * @desc 要求一元否定运算作用于数字
   * @descEN Require unary negation to take a number
   * @see https://typescript-eslint.io/rules/no-unsafe-unary-minus
   */
  "ts/no-unsafe-unary-minus": 2,
  /**
   * @desc 禁止未使用的表达式
   * @descEN Disallow unused expressions
   * @see https://typescript-eslint.io/rules/no-unused-expressions
   */
  "ts/no-unused-expressions": [1, { ignoreDirectives: true, allowShortCircuit: true }],
  /**
   * @desc 禁止未使用的变量
   * @descEN Disallow unused variables
   * @see https://typescript-eslint.io/rules/no-unused-vars
   */
  "ts/no-unused-vars": [1, { vars: "local", args: "none", caughtErrors: "none", varsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" }],
  /**
   * @desc 禁止在定义之前使用变量
   * @descEN Disallow the use of variables before they are defined
   * @see https://typescript-eslint.io/rules/no-use-before-define
   */
  "ts/no-use-before-define": [2, { functions: false, classes: false, variables: false, allowNamedExports: false }],
  /**
   * @desc 禁止不必要的构造函数
   * @descEN Disallow unnecessary constructors
   * @see https://typescript-eslint.io/rules/no-useless-constructor
   */
  "ts/no-useless-constructor": 0,
  /**
   * @desc 禁止不改变模块文件内容的空导出
   * @descEN Disallow empty exports that don't change anything in a module file
   * @see https://typescript-eslint.io/rules/no-useless-empty-export
   */
  "ts/no-useless-empty-export": 0,
  /**
   * @desc 禁止使用令人困惑的内置基本类型包装器
   * @descEN Disallow using confusing built-in primitive class wrappers
   * @see https://typescript-eslint.io/rules/no-wrapper-object-types
   */
  "ts/no-wrapper-object-types": 2,
  /**
   * @desc 强制使用非空断言而不是显式类型断言
   * @descEN Enforce non-null assertions over explicit type assertions
   * @see https://typescript-eslint.io/rules/non-nullable-type-assertion-style
   */
  "ts/non-nullable-type-assertion-style": 0,
  /**
   * @desc 禁止抛出非 Error 值作为异常
   * @descEN Disallow throwing non-Error values as exceptions
   * @see https://typescript-eslint.io/rules/only-throw-error
   */
  "ts/only-throw-error": [2, { allow: [{ from: "package", package: "@tanstack/router-core", name: "Redirect" }] }],
  /**
   * @desc 要求或禁止类构造函数中的参数属性
   * @descEN Require or disallow parameter properties in class constructors
   * @see https://typescript-eslint.io/rules/parameter-properties
   */
  "ts/parameter-properties": 0,
  /**
   * @desc 强制使用 as const 而非字面量类型
   * @descEN Enforce the use of as const over literal type
   * @see https://typescript-eslint.io/rules/prefer-as-const
   */
  "ts/prefer-as-const": 0,
  /**
   * @desc 要求从数组和/或对象进行解构
   * @descEN Require destructuring from arrays and/or objects
   * @see https://typescript-eslint.io/rules/prefer-destructuring
   */
  "ts/prefer-destructuring": 0,
  /**
   * @desc 要求每个枚举成员值都被显式初始化
   * @descEN Require each enum member value to be explicitly initialized
   * @see https://typescript-eslint.io/rules/prefer-enum-initializers
   */
  "ts/prefer-enum-initializers": 0,
  /**
   * @desc 强制使用 Array.prototype.find 而不是 filter 后跟 [0]
   * @descEN Enforce the use of Array.prototype.find() over Array.prototype.filter() followed by [0]
   * @see https://typescript-eslint.io/rules/prefer-find
   */
  "ts/prefer-find": 2,
  /**
   * @desc 强制尽可能使用 for-of 循环代替标准 for 循环
   * @descEN Enforce the use of for-of loop over the standard for loop where possible
   * @see https://typescript-eslint.io/rules/prefer-for-of
   */
  "ts/prefer-for-of": 0,
  /**
   * @desc 强制使用函数类型替代带调用签名的接口
   * @descEN Enforce using function types instead of interfaces with call signatures
   * @see https://typescript-eslint.io/rules/prefer-function-type
   */
  "ts/prefer-function-type": 2,
  /**
   * @desc 强制使用 includes 方法代替 indexOf 方法
   * @descEN Enforce includes method over indexOf method
   * @see https://typescript-eslint.io/rules/prefer-includes
   */
  "ts/prefer-includes": 0,
  /**
   * @desc 要求所有枚举成员必须是字面量值
   * @descEN Require all enum members to be literal values
   * @see https://typescript-eslint.io/rules/prefer-literal-enum-member
   */
  "ts/prefer-literal-enum-member": 0,
  /**
   * @desc 要求使用 namespace 关键字而非 module 关键字
   * @descEN Require using namespace keyword over module keyword
   * @see https://typescript-eslint.io/rules/prefer-namespace-keyword
   */
  "ts/prefer-namespace-keyword": 2,
  /**
   * @desc 强制使用空值合并运算符替代逻辑赋值或链式操作
   * @descEN Enforce using the nullish coalescing operator instead of logical assignments or chaining
   * @see https://typescript-eslint.io/rules/prefer-nullish-coalescing
   */
  "ts/prefer-nullish-coalescing": 0,
  /**
   * @desc 强制使用简洁的可选链表达式替代逻辑与链
   * @descEN Enforce using concise optional chain expressions instead of chained logical ands
   * @see https://typescript-eslint.io/rules/prefer-optional-chain
   */
  "ts/prefer-optional-chain": 0,
  /**
   * @desc 要求使用 Error 对象作为 Promise 拒绝原因
   * @descEN Require using Error objects as Promise rejection reasons
   * @see https://typescript-eslint.io/rules/prefer-promise-reject-errors
   */
  "ts/prefer-promise-reject-errors": 0,
  /**
   * @desc 要求如果私有成员不在构造函数外修改，则标记为 readonly
   * @descEN Require private members to be marked as readonly if they're never modified outside of the constructor
   * @see https://typescript-eslint.io/rules/prefer-readonly
   */
  "ts/prefer-readonly": 0,
  /**
   * @desc 要求函数参数类型为 readonly 以防止意外修改输入
   * @descEN Require function parameters to be typed as readonly to prevent accidental mutation of inputs
   * @see https://typescript-eslint.io/rules/prefer-readonly-parameter-types
   */
  "ts/prefer-readonly-parameter-types": 0,
  /**
   * @desc 强制在调用 Array#reduce 时使用类型参数代替类型断言
   * @descEN Enforce using type parameter when calling Array#reduce instead of using a type assertion
   * @see https://typescript-eslint.io/rules/prefer-reduce-type-parameter
   */
  "ts/prefer-reduce-type-parameter": 0,
  /**
   * @desc 强制在没有全局标志时使用 RegExp#exec 而非 String#match
   * @descEN Enforce RegExp#exec over String#match if no global flag is provided
   * @see https://typescript-eslint.io/rules/prefer-regexp-exec
   */
  "ts/prefer-regexp-exec": 0,
  /**
   * @desc 强制当仅返回 this 类型时使用 this
   * @descEN Enforce that this is used when only this type is returned
   * @see https://typescript-eslint.io/rules/prefer-return-this-type
   */
  "ts/prefer-return-this-type": 0,
  /**
   * @desc 强制使用 String#startsWith 和 String#endsWith 替代其他等效方法
   * @descEN Enforce using String#startsWith and String#endsWith over other equivalent methods of checking substrings
   * @see https://typescript-eslint.io/rules/prefer-string-starts-ends-with
   */
  "ts/prefer-string-starts-ends-with": 0,
  /**
   * @desc 要求返回 Promise 的函数或方法标记为 async
   * @descEN Require any function or method that returns a Promise to be marked async
   * @see https://typescript-eslint.io/rules/promise-function-async
   */
  "ts/promise-function-async": 0,
  /**
   * @desc 强制 get 类型应可赋值给其对应的 set 类型
   * @descEN Enforce that get() types should be assignable to their equivalent set() type
   * @see https://typescript-eslint.io/rules/related-getter-setter-pairs
   */
  "ts/related-getter-setter-pairs": 2,
  /**
   * @desc 要求 Array#sort 调用始终提供 compareFunction
   * @descEN Require Array#sort calls to always provide a compareFunction
   * @see https://typescript-eslint.io/rules/require-array-sort-compare
   */
  "ts/require-array-sort-compare": 0,
  /**
   * @desc 禁止没有 await 表达式的异步函数
   * @descEN Disallow async functions which do not have await expression
   * @see https://typescript-eslint.io/rules/require-await
   */
  "ts/require-await": 0,
  /**
   * @desc 要求加法运算的两个操作数类型相同
   * @descEN Require both operands of addition to be the same type and be bigint, number, or string
   * @see https://typescript-eslint.io/rules/restrict-plus-operands
   */
  "ts/restrict-plus-operands": 0,
  /**
   * @desc 强制模板字面量表达式为 string 类型
   * @descEN Enforce template literal expressions to be of string type
   * @see https://typescript-eslint.io/rules/restrict-template-expressions
   */
  "ts/restrict-template-expressions": 0,
  /**
   * @desc 强制一致等待返回的 Promise
   * @descEN Enforce consistent awaiting of returned promises
   * @see https://typescript-eslint.io/rules/return-await
   */
  "ts/return-await": 0,
  /**
   * @desc 禁止布尔表达式中的某些类型
   * @descEN Disallow certain types in boolean expressions
   * @see https://typescript-eslint.io/rules/strict-boolean-expressions
   */
  "ts/strict-boolean-expressions": 0,
  /**
   * @desc 要求 switch-case 语句穷尽所有可能
   * @descEN Require switch-case statements to be exhaustive
   * @see https://typescript-eslint.io/rules/switch-exhaustiveness-check
   */
  "ts/switch-exhaustiveness-check": 0,
  /**
   * @desc 禁止某些三斜线指令，推荐使用 ES6 导入声明
   * @descEN Disallow certain triple slash directives in favor of ES6-style import declarations
   * @see https://typescript-eslint.io/rules/triple-slash-reference
   */
  "ts/triple-slash-reference": [2, { path: "never", types: "always", lib: "always" }],
  /**
   * @desc 要求在特定地方使用类型注解
   * @descEN Require type annotations in certain places
   * @see https://typescript-eslint.io/rules/typedef
   */
  "ts/typedef": [2, { arrayDestructuring: false, arrowParameter: false, memberVariableDeclaration: false, objectDestructuring: false, parameter: false, propertyDeclaration: true, variableDeclaration: false }],
  /**
   * @desc 强制未绑定的方法在其预期作用域内调用
   * @descEN Enforce unbound methods are called with their expected scope
   * @see https://typescript-eslint.io/rules/unbound-method
   */
  "ts/unbound-method": 0,
  /**
   * @desc 禁止可以统一为一个的多个重载
   * @descEN Disallow two overloads that could be unified into one
   * @see https://typescript-eslint.io/rules/unified-signatures
   */
  "ts/unified-signatures": 0,
  /**
   * @desc 强制 Promise 拒绝回调中的参数类型为 unknown
   * @descEN Enforce typing arguments in Promise rejection callbacks as unknown
   * @see https://typescript-eslint.io/rules/use-unknown-in-catch-callback-variable
   */
  "ts/use-unknown-in-catch-callback-variable": 0,
};
