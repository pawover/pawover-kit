export default {
  // Possible Problems
  /**
   * @desc 强制数组回调函数中必须包含 return 语句
   * @descEN Enforce return statements in callbacks of array methods
   * @see https://eslint.org/docs/latest/rules/array-callback-return
   */
  "array-callback-return": 2,
  /**
   * @desc 确保构造函数中调用了 super()
   * @descEN Require `super()` calls in constructors
   * @see https://eslint.org/docs/latest/rules/constructor-super
   */
  "constructor-super": 2,
  /**
   * @desc 强制 for 循环方向正确
   * @descEN Enforce "for" loop update clause moving the counter in the right direction
   * @see https://eslint.org/docs/latest/rules/for-direction
   */
  "for-direction": 2,
  /**
   * @desc 强制 getter 函数中必须有 return 语句
   * @descEN Enforce that a getter returns a value
   * @see https://eslint.org/docs/latest/rules/getter-return
   */
  "getter-return": 2,
  /**
   * @desc 禁止使用异步函数作为 Promise 执行器
   * @descEN Disallow using an async function as a Promise executor
   * @see https://eslint.org/docs/latest/rules/no-async-promise-executor
   */
  "no-async-promise-executor": 2,
  /**
   * @desc 禁止在循环中使用 await
   * @descEN Disallow `await` inside loops
   * @see https://eslint.org/docs/latest/rules/no-await-in-loop
   */
  "no-await-in-loop": 0,
  /**
   * @desc 禁止给类赋值
   * @descEN Disallow reassigning class members
   * @see https://eslint.org/docs/latest/rules/no-class-assign
   */
  "no-class-assign": 2,
  /**
   * @desc 禁止与 -0 进行比较
   * @descEN Disallow comparing against -0
   * @see https://eslint.org/docs/latest/rules/no-compare-neg-zero
   */
  "no-compare-neg-zero": 2,
  /**
   * @desc 禁止在条件表达式中使用赋值运算符
   * @descEN Disallow assignment operators in conditional expressions
   * @see https://eslint.org/docs/latest/rules/no-cond-assign
   */
  "no-cond-assign": 2,
  /**
   * @desc 禁止修改 const 声明的变量
   * @descEN Disallow reassigning `const` variables
   * @see https://eslint.org/docs/latest/rules/no-const-assign
   */
  "no-const-assign": 2,
  /**
   * @desc 禁止在常量条件、比较和表达式中出现逻辑错误
   * @descEN Disallow expressions where the operation doesn't match the type
   * @see https://eslint.org/docs/latest/rules/no-constant-binary-expression
   */
  "no-constant-binary-expression": 2,
  /**
   * @desc 禁止在条件中使用常量表达式
   * @descEN Disallow constant expressions in conditions
   * @see https://eslint.org/docs/latest/rules/no-constant-condition
   */
  "no-constant-condition": 2,
  /**
   * @desc 禁止构造函数中显式 return 值
   * @descEN Disallow returning a value from a constructor
   * @see https://eslint.org/docs/latest/rules/no-constructor-return
   */
  "no-constructor-return": 2,
  /**
   * @desc 禁止在正则表达式中使用控制字符
   * @descEN Disallow control characters in regular expressions
   * @see https://eslint.org/docs/latest/rules/no-control-regex
   */
  "no-control-regex": 2,
  /**
   * @desc 禁止使用 debugger
   * @descEN Disallow the use of `debugger`
   * @see https://eslint.org/docs/latest/rules/no-debugger
   */
  "no-debugger": 2,
  /**
   * @desc 禁止函数参数重复
   * @descEN Disallow duplicate arguments in function definitions
   * @see https://eslint.org/docs/latest/rules/no-dupe-args
   */
  "no-dupe-args": 2,
  /**
   * @desc 禁止类成员重复
   * @descEN Disallow duplicate class members
   * @see https://eslint.org/docs/latest/rules/no-dupe-class-members
   */
  "no-dupe-class-members": 2,
  /**
   * @desc 禁止 if-else-if 链中出现重复条件
   * @descEN Disallow duplicate conditions in if-else-if chains
   * @see https://eslint.org/docs/latest/rules/no-dupe-else-if
   */
  "no-dupe-else-if": 2,
  /**
   * @desc 禁止对象字面量中出现重复键
   * @descEN Disallow duplicate keys in object literals
   * @see https://eslint.org/docs/latest/rules/no-dupe-keys
   */
  "no-dupe-keys": 2,
  /**
   * @desc 禁止 switch 中出现重复 case
   * @descEN Disallow duplicate case labels
   * @see https://eslint.org/docs/latest/rules/no-duplicate-case
   */
  "no-duplicate-case": 2,
  /**
   * @desc 禁止重复导入
   * @descEN Disallow duplicate imports
   * @see https://eslint.org/docs/latest/rules/no-duplicate-imports
   */
  "no-duplicate-imports": 2,
  /**
   * @desc 禁止在正则字符类中使用空字符
   * @descEN Disallow empty character classes in regular expressions
   * @see https://eslint.org/docs/latest/rules/no-empty-character-class
   */
  "no-empty-character-class": 2,
  /**
   * @desc 禁止解构赋值中出现空模式
   * @descEN Disallow empty destructuring patterns
   * @see https://eslint.org/docs/latest/rules/no-empty-pattern
   */
  "no-empty-pattern": 2,
  /**
   * @desc 禁止对 catch 异常参数赋值
   * @descEN Disallow reassigning exceptions in `catch` clauses
   * @see https://eslint.org/docs/latest/rules/no-ex-assign
   */
  "no-ex-assign": 2,
  /**
   * @desc 禁止 switch 穿透
   * @descEN Disallow fallthrough of `case` statements
   * @see https://eslint.org/docs/latest/rules/no-fallthrough
   */
  "no-fallthrough": 0,
  /**
   * @desc 禁止对函数声明重新赋值
   * @descEN Disallow reassigning function declarations
   * @see https://eslint.org/docs/latest/rules/no-func-assign
   */
  "no-func-assign": 2,
  /**
   * @desc 禁止给导入绑定赋值
   * @descEN Disallow assigning to imported bindings
   * @see https://eslint.org/docs/latest/rules/no-import-assign
   */
  "no-import-assign": 2,
  /**
   * @desc 禁止在嵌套代码块中声明变量或函数
   * @descEN Disallow variable or function declarations in nested blocks
   * @see https://eslint.org/docs/latest/rules/no-inner-declarations
   */
  "no-inner-declarations": 2,
  /**
   * @desc 禁止使用无效的正则表达式
   * @descEN Disallow invalid regular expressions in string literals
   * @see https://eslint.org/docs/latest/rules/no-invalid-regexp
   */
  "no-invalid-regexp": 2,
  /**
   * @desc 禁止不规则的空白字符
   * @descEN Disallow irregular whitespace characters
   * @see https://eslint.org/docs/latest/rules/no-irregular-whitespace
   */
  "no-irregular-whitespace": [2, { skipStrings: true, skipComments: false, skipRegExps: true, skipTemplates: true, skipJSXText: true }],
  /**
   * @desc 禁止数字精度丢失
   * @descEN Disallow literal numbers that lose precision
   * @see https://eslint.org/docs/latest/rules/no-loss-of-precision
   */
  "no-loss-of-precision": 2,
  /**
   * @desc 禁止误导性的字符类
   * @descEN Disallow characters which are made with multiple code points in character class syntax
   * @see https://eslint.org/docs/latest/rules/no-misleading-character-class
   */
  "no-misleading-character-class": 2,
  /**
   * @desc 禁止使用 new 调用非构造函数
   * @descEN Disallow `new` operators with global non-constructor functions
   * @see https://eslint.org/docs/latest/rules/no-new-native-nonconstructor
   */
  "no-new-native-nonconstructor": 2,
  /**
   * @desc 禁止对内置全局对象调用
   * @descEN Disallow calling global object properties as functions
   * @see https://eslint.org/docs/latest/rules/no-obj-calls
   */
  "no-obj-calls": 2,
  /**
   * @desc 禁止在 Promise 执行器中返回值
   * @descEN Disallow returning values from Promise executor functions
   * @see https://eslint.org/docs/latest/rules/no-promise-executor-return
   */
  "no-promise-executor-return": [2, { allowVoid: true }],
  /**
   * @desc 禁止直接调用对象原型上的方法
   * @descEN Disallow calling some `Object.prototype` methods directly on objects
   * @see https://eslint.org/docs/latest/rules/no-prototype-builtins
   */
  "no-prototype-builtins": 2,
  /**
   * @desc 禁止自身赋值
   * @descEN Disallow self-assignment
   * @see https://eslint.org/docs/latest/rules/no-self-assign
   */
  "no-self-assign": 2,
  /**
   * @desc 禁止自身比较
   * @descEN Disallow self-comparison
   * @see https://eslint.org/docs/latest/rules/no-self-compare
   */
  "no-self-compare": 2,
  /**
   * @desc 禁止 setter 返回值
   * @descEN Disallow returning a value from a setter
   * @see https://eslint.org/docs/latest/rules/no-setter-return
   */
  "no-setter-return": 2,
  /**
   * @desc 禁止稀疏数组
   * @descEN Disallow sparse arrays
   * @see https://eslint.org/docs/latest/rules/no-sparse-arrays
   */
  "no-sparse-arrays": 2,
  /**
   * @desc 禁止在字符串中使用模板字面量占位符
   * @descEN Disallow template literal placeholder syntax in regular strings
   * @see https://eslint.org/docs/latest/rules/no-template-curly-in-string
   */
  "no-template-curly-in-string": 2,
  /**
   * @desc 确保在构造函数中调用 super() 之前不能访问 this
   * @descEN Disallow using `this`/`super` before `super()` is called
   * @see https://eslint.org/docs/latest/rules/no-this-before-super
   */
  "no-this-before-super": 2,
  /**
   * @desc 禁止使用未声明的变量
   * @descEN Disallow undeclared variables
   * @see https://eslint.org/docs/latest/rules/no-undef
   */
  "no-undef": 0,
  /**
   * @desc 禁止使用可能引起歧义的多行表达式
   * @descEN Disallow confusing multiline expressions
   * @see https://eslint.org/docs/latest/rules/no-unexpected-multiline
   */
  "no-unexpected-multiline": 2,
  /**
   * @desc 禁止未修改的循环条件
   * @descEN Disallow unmodified loop conditions
   * @see https://eslint.org/docs/latest/rules/no-unmodified-loop-condition
   */
  "no-unmodified-loop-condition": 2,
  /**
   * @desc 禁止无法到达的代码
   * @descEN Disallow unreachable code after control flow statements
   * @see https://eslint.org/docs/latest/rules/no-unreachable
   */
  "no-unreachable": 2,
  /**
   * @desc 禁止只有一次迭代的循环
   * @descEN Disallow loops with a body that allows only one iteration
   * @see https://eslint.org/docs/latest/rules/no-unreachable-loop
   */
  "no-unreachable-loop": 2,
  /**
   * @desc 禁止不安全的 finally 语句
   * @descEN Disallow control flow statements in `finally` blocks
   * @see https://eslint.org/docs/latest/rules/no-unsafe-finally
   */
  "no-unsafe-finally": 2,
  /**
   * @desc 禁止否定运算符与比较运算符混用
   * @descEN Disallow negating the left operand of relational operators
   * @see https://eslint.org/docs/latest/rules/no-unsafe-negation
   */
  "no-unsafe-negation": 2,
  /**
   * @desc 禁止对可选链使用不安全的方式
   * @descEN Disallow assignments that can lead to `undefined` in optional chaining
   * @see https://eslint.org/docs/latest/rules/no-unsafe-optional-chaining
   */
  "no-unsafe-optional-chaining": 2,
  /**
   * @desc 禁止使用未使用的私有类成员
   * @descEN Disallow unused private class members
   * @see https://eslint.org/docs/latest/rules/no-unused-private-class-members
   */
  "no-unused-private-class-members": 1,
  /**
   * @desc 禁止未使用的变量
   * @descEN Disallow unused variables
   * @see https://eslint.org/docs/latest/rules/no-unused-vars
   */
  "no-unused-vars": [1, { vars: "local", args: "none", caughtErrors: "none", varsIgnorePattern: "^_", destructuredArrayIgnorePattern: "^_" }],
  /**
   * @desc 禁止在定义之前使用变量
   * @descEN Disallow the use of variables before they are defined
   * @see https://eslint.org/docs/latest/rules/no-use-before-define
   */
  "no-use-before-define": [2, { functions: false, classes: false, variables: false, allowNamedExports: false }],
  /**
   * @desc 禁止无用的赋值
   * @descEN Disallow useless assignments
   * @see https://eslint.org/docs/latest/rules/no-useless-assignment
   */
  "no-useless-assignment": 0,
  /**
   * @desc 禁止正则表达式中无用的反向引用
   * @descEN Disallow useless backreferences in regular expressions
   * @see https://eslint.org/docs/latest/rules/no-useless-backreference
   */
  "no-useless-backreference": 2,
  /**
   * @desc 要求原子更新
   * @descEN Require calls to `await` in atomic update expressions
   * @see https://eslint.org/docs/latest/rules/require-atomic-updates
   */
  "require-atomic-updates": [2, { allowProperties: true }],
  /**
   * @desc 强制使用 isNaN() 检查 NaN
   * @descEN Require calls to `isNaN()` when checking for `NaN`
   * @see https://eslint.org/docs/latest/rules/use-isnan
   */
  "use-isnan": 2,
  /**
   * @desc 强制 typeof 比较值是有效的字符串
   * @descEN Enforce comparing `typeof` expressions against valid strings
   * @see https://eslint.org/docs/latest/rules/valid-typeof
   */
  "valid-typeof": 2,

  // Suggestions
  /**
   * @desc 强制 getter/setter 成对出现
   * @descEN Enforce getter/setter pairs in objects and classes
   * @see https://eslint.org/docs/latest/rules/accessor-pairs
   */
  "accessor-pairs": [2, { setWithoutGet: true, getWithoutSet: false }],
  /**
   * @desc 强制箭头函数体风格
   * @descEN Require or disallow braces around arrow function bodies
   * @see https://eslint.org/docs/latest/rules/arrow-body-style
   */
  "arrow-body-style": 0,
  /**
   * @desc 要求变量声明在块级作用域内
   * @descEN Require variables to be declared in the nearest block scope
   * @see https://eslint.org/docs/latest/rules/block-scoped-var
   */
  "block-scoped-var": 0,
  /**
   * @desc 强制驼峰命名规范
   * @descEN Enforce camelcase naming convention
   * @see https://eslint.org/docs/latest/rules/camelcase
   */
  "camelcase": 0,
  /**
   * @desc 强制注释首字母大小写
   * @descEN Enforce capitalization of the first letter of a comment
   * @see https://eslint.org/docs/latest/rules/capitalized-comments
   */
  "capitalized-comments": 0,
  /**
   * @desc 强制类方法使用 this
   * @descEN Require class methods to use `this`
   * @see https://eslint.org/docs/latest/rules/class-methods-use-this
   */
  "class-methods-use-this": 0,
  /**
   * @desc 限制代码复杂度
   * @descEN Limit cyclomatic complexity
   * @see https://eslint.org/docs/latest/rules/complexity
   */
  "complexity": 0,
  /**
   * @desc 要求一致的 return 语句
   * @descEN Require `return` statements to either always or never specify values
   * @see https://eslint.org/docs/latest/rules/consistent-return
   */
  "consistent-return": 0,
  /**
   * @desc 强制一致的 this 别名
   * @descEN Require or disallow a consistent naming pattern for `this` aliases
   * @see https://eslint.org/docs/latest/rules/consistent-this
   */
  "consistent-this": 0,
  /**
   * @desc 强制花括号风格
   * @descEN Require or disallow braces around all control statements
   * @see https://eslint.org/docs/latest/rules/curly
   */
  "curly": 2,
  /**
   * @desc 要求 switch 语句中有 default 分支
   * @descEN Require `default` case in switch statements
   * @see https://eslint.org/docs/latest/rules/default-case
   */
  "default-case": 2,
  /**
   * @desc 要求 default 分支放在最后
   * @descEN Require `default` case to be the last clause in a switch statement
   * @see https://eslint.org/docs/latest/rules/default-case-last
   */
  "default-case-last": 0,
  /**
   * @desc 强制默认参数放在最后
   * @descEN Require default parameters to be last
   * @see https://eslint.org/docs/latest/rules/default-param-last
   */
  "default-param-last": 2,
  /**
   * @desc 强制使用点号表示法
   * @descEN Require dot notation when possible
   * @see https://eslint.org/docs/latest/rules/dot-notation
   */
  "dot-notation": 0,
  /**
   * @desc 强制使用 === 和 !==
   * @descEN Require the use of `===` and `!==`
   * @see https://eslint.org/docs/latest/rules/eqeqeq
   */
  "eqeqeq": 2,
  /**
   * @desc 强制函数名与赋值的变量名匹配
   * @descEN Require function names to match the name of the variable to which they are assigned
   * @see https://eslint.org/docs/latest/rules/func-name-matching
   */
  "func-name-matching": 2,
  /**
   * @desc 强制命名函数表达式
   * @descEN Require or disallow named function expressions
   * @see https://eslint.org/docs/latest/rules/func-names
   */
  "func-names": 1,
  /**
   * @desc 强制函数声明与函数表达式的风格
   * @descEN Require or disallow the use of function declarations
   * @see https://eslint.org/docs/latest/rules/func-style
   */
  "func-style": 0,
  /**
   * @desc 强制访问器属性成对出现
   * @descEN Require grouped accessor pairs in object literals and classes
   * @see https://eslint.org/docs/latest/rules/grouped-accessor-pairs
   */
  "grouped-accessor-pairs": [2, "getBeforeSet"],
  /**
   * @desc 强制 for-in 循环中需要 if 保护
   * @descEN Require `for-in` loops to include an `if` statement
   * @see https://eslint.org/docs/latest/rules/guard-for-in
   */
  "guard-for-in": 2,
  /**
   * @desc 禁止使用指定标识符名称
   * @descEN Disallow specified identifier names
   * @see https://eslint.org/docs/latest/rules/id-denylist
   */
  "id-denylist": 0,
  /**
   * @desc 限制标识符长度
   * @descEN Limit minimum and maximum identifier lengths
   * @see https://eslint.org/docs/latest/rules/id-length
   */
  "id-length": 0,
  /**
   * @desc 强制标识符命名匹配指定模式
   * @descEN Require identifiers to match a specified regular expression
   * @see https://eslint.org/docs/latest/rules/id-match
   */
  "id-match": 0,
  /**
   * @desc 强制变量初始化
   * @descEN Require or disallow initialization in variable declarations
   * @see https://eslint.org/docs/latest/rules/init-declarations
   */
  "init-declarations": 0,
  /**
   * @desc 强制使用逻辑赋值运算符
   * @descEN Require or disallow logical assignment operators
   * @see https://eslint.org/docs/latest/rules/logical-assignment-operators
   */
  "logical-assignment-operators": 0,
  /**
   * @desc 限制单个文件中的类数量
   * @descEN Limit the number of classes per file
   * @see https://eslint.org/docs/latest/rules/max-classes-per-file
   */
  "max-classes-per-file": 0,
  /**
   * @desc 限制代码块嵌套深度
   * @descEN Enforce a maximum depth that blocks can be nested
   * @see https://eslint.org/docs/latest/rules/max-depth
   */
  "max-depth": [2, 5],
  /**
   * @desc 限制文件行数
   * @descEN Enforce a maximum number of lines per file
   * @see https://eslint.org/docs/latest/rules/max-lines
   */
  "max-lines": 0,
  /**
   * @desc 限制函数中的行数
   * @descEN Enforce a maximum number of lines per function
   * @see https://eslint.org/docs/latest/rules/max-lines-per-function
   */
  "max-lines-per-function": 0,
  /**
   * @desc 限制回调嵌套深度
   * @descEN Enforce a maximum depth that callbacks can be nested
   * @see https://eslint.org/docs/latest/rules/max-nested-callbacks
   */
  "max-nested-callbacks": 0,
  /**
   * @desc 限制参数数量
   * @descEN Enforce a maximum number of parameters in function definitions
   * @see https://eslint.org/docs/latest/rules/max-params
   */
  "max-params": 0,
  /**
   * @desc 限制函数中的语句数量
   * @descEN Enforce a maximum number of statements allowed in function blocks
   * @see https://eslint.org/docs/latest/rules/max-statements
   */
  "max-statements": 0,
  /**
   * @desc 要求构造函数名以大写字母开头
   * @descEN Require constructor names to begin with a capital letter
   * @see https://eslint.org/docs/latest/rules/new-cap
   */
  "new-cap": [2, { capIsNew: false }],
  /**
   * @desc 禁止使用 alert
   * @descEN Disallow the use of `alert`, `confirm`, and `prompt`
   * @see https://eslint.org/docs/latest/rules/no-alert
   */
  "no-alert": 0,
  /**
   * @desc 禁止使用 Array 构造函数
   * @descEN Disallow `Array` constructors
   * @see https://eslint.org/docs/latest/rules/no-array-constructor
   */
  "no-array-constructor": 2,
  /**
   * @desc 禁止使用位运算符
   * @descEN Disallow bitwise operators
   * @see https://eslint.org/docs/latest/rules/no-bitwise
   */
  "no-bitwise": 0,
  /**
   * @desc 禁止使用 caller 或 callee
   * @descEN Disallow the use of `arguments.caller` or `arguments.callee`
   * @see https://eslint.org/docs/latest/rules/no-caller
   */
  "no-caller": 2,
  /**
   * @desc 禁止在 case/default 子句中使用词法声明
   * @descEN Disallow lexical declarations in case/default clauses
   * @see https://eslint.org/docs/latest/rules/no-case-declarations
   */
  "no-case-declarations": 2,
  /**
   * @desc 禁止使用 console
   * @descEN Disallow the use of `console`
   * @see https://eslint.org/docs/latest/rules/no-console
   */
  "no-console": 0,
  /**
   * @desc 禁止使用 continue
   * @descEN Disallow the use of `continue`
   * @see https://eslint.org/docs/latest/rules/no-continue
   */
  "no-continue": 0,
  /**
   * @desc 禁止删除变量
   * @descEN Disallow deleting variables
   * @see https://eslint.org/docs/latest/rules/no-delete-var
   */
  "no-delete-var": 2,
  /**
   * @desc 禁止使用正则除法标记
   * @descEN Disallow division operators which might be confused with regular expressions
   * @see https://eslint.org/docs/latest/rules/no-div-regex
   */
  "no-div-regex": 2,
  /**
   * @desc 禁止在 else 分支中使用 return
   * @descEN Disallow `else` blocks after `return` statements in `if` blocks
   * @see https://eslint.org/docs/latest/rules/no-else-return
   */
  "no-else-return": 0,
  /**
   * @desc 禁止空块语句
   * @descEN Disallow empty block statements
   * @see https://eslint.org/docs/latest/rules/no-empty
   */
  "no-empty": [2, { allowEmptyCatch: true }],
  /**
   * @desc 禁止空函数
   * @descEN Disallow empty functions
   * @see https://eslint.org/docs/latest/rules/no-empty-function
   */
  "no-empty-function": 0,
  /**
   * @desc 禁止空静态代码块
   * @descEN Disallow empty static blocks
   * @see https://eslint.org/docs/latest/rules/no-empty-static-block
   */
  "no-empty-static-block": 2,
  /**
   * @desc 禁止使用 == 与 null 比较
   * @descEN Disallow `==` and `!=` comparisons against `null`
   * @see https://eslint.org/docs/latest/rules/no-eq-null
   */
  "no-eq-null": 2,
  /**
   * @desc 禁止使用 eval
   * @descEN Disallow the use of `eval()`
   * @see https://eslint.org/docs/latest/rules/no-eval
   */
  "no-eval": 2,
  /**
   * @desc 禁止扩展原生对象
   * @descEN Disallow extending native types
   * @see https://eslint.org/docs/latest/rules/no-extend-native
   */
  "no-extend-native": 2,
  /**
   * @desc 禁止不必要的函数绑定
   * @descEN Disallow unnecessary calls to `.bind()`
   * @see https://eslint.org/docs/latest/rules/no-extra-bind
   */
  "no-extra-bind": 2,
  /**
   * @desc 禁止不必要的布尔类型转换
   * @descEN Disallow unnecessary boolean casts
   * @see https://eslint.org/docs/latest/rules/no-extra-boolean-cast
   */
  "no-extra-boolean-cast": 2,
  /**
   * @desc 禁止不必要的标签
   * @descEN Disallow unnecessary labels
   * @see https://eslint.org/docs/latest/rules/no-extra-label
   */
  "no-extra-label": 0,
  /**
   * @desc 禁止对全局对象赋值
   * @descEN Disallow assignments to native objects or read-only global variables
   * @see https://eslint.org/docs/latest/rules/no-global-assign
   */
  "no-global-assign": 2,
  /**
   * @desc 禁止隐式类型转换
   * @descEN Disallow shorthand type conversions
   * @see https://eslint.org/docs/latest/rules/no-implicit-coercion
   */
  "no-implicit-coercion": [2, { allow: ["!!"] }],
  /**
   * @desc 禁止隐式全局变量
   * @descEN Disallow declarations in the global scope
   * @see https://eslint.org/docs/latest/rules/no-implicit-globals
   */
  "no-implicit-globals": 0,
  /**
   * @desc 禁止隐式 eval
   * @descEN Disallow the use of `eval()`-like methods
   * @see https://eslint.org/docs/latest/rules/no-implied-eval
   */
  "no-implied-eval": 2,
  /**
   * @desc 禁止行内注释
   * @descEN Disallow inline comments after code
   * @see https://eslint.org/docs/latest/rules/no-inline-comments
   */
  "no-inline-comments": 0,
  /**
   * @desc 禁止无效的 this
   * @descEN Disallow use of `this` in contexts where the value of `this` is `undefined`
   * @see https://eslint.org/docs/latest/rules/no-invalid-this
   */
  "no-invalid-this": 0,
  /**
   * @desc 禁止使用 __iterator__
   * @descEN Disallow the use of the `__iterator__` property
   * @see https://eslint.org/docs/latest/rules/no-iterator
   */
  "no-iterator": 2,
  /**
   * @desc 禁止 label 与变量同名
   * @descEN Disallow labels that share a name with a variable
   * @see https://eslint.org/docs/latest/rules/no-label-var
   */
  "no-label-var": 2,
  /**
   * @desc 禁止使用标签语句
   * @descEN Disallow labeled statements
   * @see https://eslint.org/docs/latest/rules/no-labels
   */
  "no-labels": 2,
  /**
   * @desc 禁止不必要的代码块
   * @descEN Disallow unnecessary nested blocks
   * @see https://eslint.org/docs/latest/rules/no-lone-blocks
   */
  "no-lone-blocks": 2,
  /**
   * @desc 禁止 if 作为唯一语句的 else 块
   * @descEN Disallow `if` statements as the only statement in `else` blocks
   * @see https://eslint.org/docs/latest/rules/no-lonely-if
   */
  "no-lonely-if": 0,
  /**
   * @desc 禁止在循环中使用函数声明
   * @descEN Disallow function declarations inside loops
   * @see https://eslint.org/docs/latest/rules/no-loop-func
   */
  "no-loop-func": 0,
  /**
   * @desc 禁止使用魔术数字
   * @descEN Disallow magic numbers
   * @see https://eslint.org/docs/latest/rules/no-magic-numbers
   */
  "no-magic-numbers": 0,
  /**
   * @desc 禁止连续赋值
   * @descEN Disallow chained assignments
   * @see https://eslint.org/docs/latest/rules/no-multi-assign
   */
  "no-multi-assign": 0,
  /**
   * @desc 禁止多行字符串
   * @descEN Disallow multiline strings
   * @see https://eslint.org/docs/latest/rules/no-multi-str
   */
  "no-multi-str": 2,
  /**
   * @desc 禁止否定条件
   * @descEN Disallow negated conditions
   * @see https://eslint.org/docs/latest/rules/no-negated-condition
   */
  "no-negated-condition": 0,
  /**
   * @desc 禁止嵌套三元表达式
   * @descEN Disallow nested ternary expressions
   * @see https://eslint.org/docs/latest/rules/no-nested-ternary
   */
  "no-nested-ternary": 0,
  /**
   * @desc 禁止使用 new 而不赋值
   * @descEN Disallow `new` operators outside of assignments or comparisons
   * @see https://eslint.org/docs/latest/rules/no-new
   */
  "no-new": 2,
  /**
   * @desc 禁止使用 new Function
   * @descEN Disallow `new Function()` expressions
   * @see https://eslint.org/docs/latest/rules/no-new-func
   */
  "no-new-func": 2,
  /**
   * @desc 禁止使用原始包装类型
   * @descEN Disallow `new` operators with the `String`, `Number`, and `Boolean` objects
   * @see https://eslint.org/docs/latest/rules/no-new-wrappers
   */
  "no-new-wrappers": 2,
  /**
   * @desc 禁止八进制转义符中的无意义数字
   * @descEN Disallow `\8` and `\9` escape sequences in string literals
   * @see https://eslint.org/docs/latest/rules/no-nonoctal-decimal-escape
   */
  "no-nonoctal-decimal-escape": 2,
  /**
   * @desc 禁止使用 Object 构造函数
   * @descEN Disallow `Object` constructors
   * @see https://eslint.org/docs/latest/rules/no-object-constructor
   */
  "no-object-constructor": 2,
  /**
   * @desc 禁止使用八进制字面量
   * @descEN Disallow octal literals
   * @see https://eslint.org/docs/latest/rules/no-octal
   */
  "no-octal": 2,
  /**
   * @desc 禁止八进制转义序列
   * @descEN Disallow octal escape sequences in string literals
   * @see https://eslint.org/docs/latest/rules/no-octal-escape
   */
  "no-octal-escape": 0,
  /**
   * @desc 禁止重新分配函数参数
   * @descEN Disallow reassigning function parameters
   * @see https://eslint.org/docs/latest/rules/no-param-reassign
   */
  "no-param-reassign": 2,
  /**
   * @desc 禁止使用 ++ 和 --
   * @descEN Disallow the unary operators `++` and `--`
   * @see https://eslint.org/docs/latest/rules/no-plusplus
   */
  "no-plusplus": 0,
  /**
   * @desc 禁止使用 __proto__
   * @descEN Disallow the use of the `__proto__` property
   * @see https://eslint.org/docs/latest/rules/no-proto
   */
  "no-proto": 2,
  /**
   * @desc 禁止重复声明变量
   * @descEN Disallow variable redeclaration
   * @see https://eslint.org/docs/latest/rules/no-redeclare
   */
  "no-redeclare": 2,
  /**
   * @desc 禁止正则表达式中的空格
   * @descEN Disallow multiple spaces in regular expression literals
   * @see https://eslint.org/docs/latest/rules/no-regex-spaces
   */
  "no-regex-spaces": 2,
  /**
   * @desc 禁止受限的导出名称
   * @descEN Disallow specified names in exports
   * @see https://eslint.org/docs/latest/rules/no-restricted-exports
   */
  "no-restricted-exports": 0,
  /**
   * @desc 禁止受限的全局变量
   * @descEN Disallow specified global variables
   * @see https://eslint.org/docs/latest/rules/no-restricted-globals
   */
  "no-restricted-globals": 0,
  /**
   * @desc 禁止受限的导入
   * @descEN Disallow specified modules when loaded by `import`
   * @see https://eslint.org/docs/latest/rules/no-restricted-imports
   */
  "no-restricted-imports": 0,
  /**
   * @desc 禁止受限的属性
   * @descEN Disallow certain properties on certain objects
   * @see https://eslint.org/docs/latest/rules/no-restricted-properties
   */
  "no-restricted-properties": 0,
  /**
   * @desc 禁止受限的语法
   * @descEN Disallow specified syntax
   * @see https://eslint.org/docs/latest/rules/no-restricted-syntax
   */
  "no-restricted-syntax": 0,
  /**
   * @desc 强制 return 赋值
   * @descEN Disallow assignment in `return` statements
   * @see https://eslint.org/docs/latest/rules/no-return-assign
   */
  "no-return-assign": [2, "always"],
  /**
   * @desc 禁止使用 javascript: URL
   * @descEN Disallow `javascript:` URLs
   * @see https://eslint.org/docs/latest/rules/no-script-url
   */
  "no-script-url": 0,
  /**
   * @desc 禁止使用逗号表达式
   * @descEN Disallow comma operators
   * @see https://eslint.org/docs/latest/rules/no-sequences
   */
  "no-sequences": 2,
  /**
   * @desc 禁止变量声明覆盖外层作用域
   * @descEN Disallow variable declarations from shadowing outer scope variables
   * @see https://eslint.org/docs/latest/rules/no-shadow
   */
  "no-shadow": 0,
  /**
   * @desc 禁止遮蔽受限的标识符
   * @descEN Disallow identifiers from shadowing restricted names
   * @see https://eslint.org/docs/latest/rules/no-shadow-restricted-names
   */
  "no-shadow-restricted-names": 2,
  /**
   * @desc 禁止使用三元表达式
   * @descEN Disallow ternary operators
   * @see https://eslint.org/docs/latest/rules/no-ternary
   */
  "no-ternary": 0,
  /**
   * @desc 禁止抛出字面量
   * @descEN Disallow throwing literals as exceptions
   * @see https://eslint.org/docs/latest/rules/no-throw-literal
   */
  "no-throw-literal": 0,
  /**
   * @desc 禁止将 undefined 赋值给变量
   * @descEN Disallow initializing variables to `undefined`
   * @see https://eslint.org/docs/latest/rules/no-undef-init
   */
  "no-undef-init": 2,
  /**
   * @desc 禁止使用 undefined
   * @descEN Disallow the use of `undefined` as an identifier
   * @see https://eslint.org/docs/latest/rules/no-undefined
   */
  "no-undefined": 0,
  /**
   * @desc 禁止标识符有前导或尾随下划线
   * @descEN Disallow dangling underscores in identifiers
   * @see https://eslint.org/docs/latest/rules/no-underscore-dangle
   */
  "no-underscore-dangle": 0,
  /**
   * @desc 禁止不必要的三元表达式
   * @descEN Disallow ternary operators when simpler alternatives exist
   * @see https://eslint.org/docs/latest/rules/no-unneeded-ternary
   */
  "no-unneeded-ternary": 2,
  /**
   * @desc 禁止未使用的表达式
   * @descEN Disallow unused expressions
   * @see https://eslint.org/docs/latest/rules/no-unused-expressions
   */
  "no-unused-expressions": [1, { ignoreDirectives: true, allowShortCircuit: true }],
  /**
   * @desc 禁止未使用的标签
   * @descEN Disallow unused labels
   * @see https://eslint.org/docs/latest/rules/no-unused-labels
   */
  "no-unused-labels": 1,
  /**
   * @desc 禁止不必要的函数调用
   * @descEN Disallow unnecessary calls to `.call()` and `.apply()`
   * @see https://eslint.org/docs/latest/rules/no-useless-call
   */
  "no-useless-call": 2,
  /**
   * @desc 禁止不必要的 catch 语句
   * @descEN Disallow unnecessary `catch` clauses
   * @see https://eslint.org/docs/latest/rules/no-useless-catch
   */
  "no-useless-catch": 2,
  /**
   * @desc 禁止不必要的计算属性键
   * @descEN Disallow unnecessary computed property keys
   * @see https://eslint.org/docs/latest/rules/no-useless-computed-key
   */
  "no-useless-computed-key": 2,
  /**
   * @desc 禁止无用的字符串拼接
   * @descEN Disallow unnecessary concatenation of literals or template literals
   * @see https://eslint.org/docs/latest/rules/no-useless-concat
   */
  "no-useless-concat": 0,
  /**
   * @desc 禁止无用的构造函数
   * @descEN Disallow unnecessary constructors
   * @see https://eslint.org/docs/latest/rules/no-useless-constructor
   */
  "no-useless-constructor": 0,
  /**
   * @desc 禁止不必要的转义
   * @descEN Disallow unnecessary escape characters
   * @see https://eslint.org/docs/latest/rules/no-useless-escape
   */
  "no-useless-escape": 2,
  /**
   * @desc 禁止不必要的重命名
   * @descEN Disallow renaming import/export/destructured assignments
   * @see https://eslint.org/docs/latest/rules/no-useless-rename
   */
  "no-useless-rename": 2,
  /**
   * @desc 禁止多余的 return
   * @descEN Disallow redundant return statements
   * @see https://eslint.org/docs/latest/rules/no-useless-return
   */
  "no-useless-return": 2,
  /**
   * @desc 禁止使用 var
   * @descEN Require `let` or `const` instead of `var`
   * @see https://eslint.org/docs/latest/rules/no-var
   */
  "no-var": 2,
  /**
   * @desc 禁止使用 void
   * @descEN Disallow the use of `void` operators
   * @see https://eslint.org/docs/latest/rules/no-void
   */
  "no-void": 0,
  /**
   * @desc 禁止警告注释
   * @descEN Disallow specified warning terms in comments
   * @see https://eslint.org/docs/latest/rules/no-warning-comments
   */
  "no-warning-comments": 0,
  /**
   * @desc 禁止使用 with
   * @descEN Disallow `with` statements
   * @see https://eslint.org/docs/latest/rules/no-with
   */
  "no-with": 2,
  /**
   * @desc 强制对象字面量简写语法
   * @descEN Require or disallow object literal shorthand syntax
   * @see https://eslint.org/docs/latest/rules/object-shorthand
   */
  "object-shorthand": 0,
  /**
   * @desc 强制变量声明风格
   * @descEN Enforce the use of `let` or `const` or `var` per declaration
   * @see https://eslint.org/docs/latest/rules/one-var
   */
  "one-var": [2, "never"],
  /**
   * @desc 强制使用复合赋值运算符
   * @descEN Require or disallow assignment operator shorthand
   * @see https://eslint.org/docs/latest/rules/operator-assignment
   */
  "operator-assignment": 0,
  /**
   * @desc 强制使用箭头函数作为回调
   * @descEN Require using arrow functions for callbacks
   * @see https://eslint.org/docs/latest/rules/prefer-arrow-callback
   */
  "prefer-arrow-callback": 2,
  /**
   * @desc 优先使用 const
   * @descEN Require `const` declarations for variables that are never reassigned
   * @see https://eslint.org/docs/latest/rules/prefer-const
   */
  "prefer-const": 2,
  /**
   * @desc 优先使用解构赋值
   * @descEN Require destructuring from arrays and/or objects
   * @see https://eslint.org/docs/latest/rules/prefer-destructuring
   */
  "prefer-destructuring": 0,
  /**
   * @desc 优先使用指数运算符
   * @descEN Disallow the use of `Math.pow()` in favor of `**`
   * @see https://eslint.org/docs/latest/rules/prefer-exponentiation-operator
   */
  "prefer-exponentiation-operator": 0,
  /**
   * @desc 优先使用命名捕获组
   * @descEN Require named capture groups in regular expressions
   * @see https://eslint.org/docs/latest/rules/prefer-named-capture-group
   */
  "prefer-named-capture-group": 0,
  /**
   * @desc 优先使用数字字面量
   * @descEN Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals
   * @see https://eslint.org/docs/latest/rules/prefer-numeric-literals
   */
  "prefer-numeric-literals": 2,
  /**
   * @desc 优先使用 Object.hasOwn
   * @descEN Disallow `Object.prototype.hasOwnProperty.call()` in favor of `Object.hasOwn()`
   * @see https://eslint.org/docs/latest/rules/prefer-object-has-own
   */
  "prefer-object-has-own": 0,
  /**
   * @desc 优先使用对象展开运算符
   * @descEN Disallow using `Object.assign()` with an object literal as the first argument
   * @see https://eslint.org/docs/latest/rules/prefer-object-spread
   */
  "prefer-object-spread": 2,
  /**
   * @desc 优先使用 Promise.reject() 抛出错误
   * @descEN Require using Error objects as Promise rejection reasons
   * @see https://eslint.org/docs/latest/rules/prefer-promise-reject-errors
   */
  "prefer-promise-reject-errors": 0,
  /**
   * @desc 优先使用正则字面量
   * @descEN Disallow use of the `RegExp` constructor in favor of regular expression literals
   * @see https://eslint.org/docs/latest/rules/prefer-regex-literals
   */
  "prefer-regex-literals": 0,
  /**
   * @desc 优先使用剩余参数
   * @descEN Require rest parameters instead of `arguments`
   * @see https://eslint.org/docs/latest/rules/prefer-rest-params
   */
  "prefer-rest-params": 0,
  /**
   * @desc 优先使用展开语法
   * @descEN Require spread operators instead of `.apply()`
   * @see https://eslint.org/docs/latest/rules/prefer-spread
   */
  "prefer-spread": 0,
  /**
   * @desc 优先使用模板字符串
   * @descEN Require template literals instead of string concatenation
   * @see https://eslint.org/docs/latest/rules/prefer-template
   */
  "prefer-template": 0,
  /**
   * @desc 强制使用 parseInt 时指定基数
   * @descEN Require the use of the second argument in `parseInt()`
   * @see https://eslint.org/docs/latest/rules/radix
   */
  "radix": 2,
  /**
   * @desc 禁用不必要的 await
   * @descEN Disallow `await` inside of `async` functions when there is no useful work
   * @see https://eslint.org/docs/latest/rules/require-await
   */
  "require-await": 0,
  /**
   * @desc 强制在正则表达式中使用 u 或 v 标志
   * @descEN Require the use of the `u` or `v` flag in regular expressions
   * @see https://eslint.org/docs/latest/rules/require-unicode-regexp
   */
  "require-unicode-regexp": 0,
  /**
   * @desc 要求 generator 函数中有 yield
   * @descEN Require `yield` statements in generator functions
   * @see https://eslint.org/docs/latest/rules/require-yield
   */
  "require-yield": 2,
  /**
   * @desc 强制 import 排序
   * @descEN Enforce sorted import declarations
   * @see https://eslint.org/docs/latest/rules/sort-imports
   */
  "sort-imports": 0,
  /**
   * @desc 强制对象键排序
   * @descEN Require object keys to be sorted
   * @see https://eslint.org/docs/latest/rules/sort-keys
   */
  "sort-keys": 0,
  /**
   * @desc 强制变量排序
   * @descEN Require variables within the same declaration block to be sorted
   * @see https://eslint.org/docs/latest/rules/sort-vars
   */
  "sort-vars": 0,
  /**
   * @desc 强制严格模式
   * @descEN Require or disallow strict mode directives
   * @see https://eslint.org/docs/latest/rules/strict
   */
  "strict": 2,
  /**
   * @desc 要求 Symbol 描述
   * @descEN Require symbol descriptions
   * @see https://eslint.org/docs/latest/rules/symbol-description
   */
  "symbol-description": 2,
  /**
   * @desc 要求 var 声明在作用域顶部
   * @descEN Require `var` declarations to be placed at the top of their containing scope
   * @see https://eslint.org/docs/latest/rules/vars-on-top
   */
  "vars-on-top": 0,
  /**
   * @desc 强制比较运算符风格
   * @descEN Require or disallow "yoda" conditions
   * @see https://eslint.org/docs/latest/rules/yoda
   */
  "yoda": [2, "never", { onlyEquality: true }],
};
