import preset from "./preset.js";

export default {
  /**
   * @desc 强制数组方括号前/后换行
   * @descEN Enforce linebreaks after opening and before closing array brackets
   * @see https://eslint.style/rules/array-bracket-newline
   */
  "stylistic/array-bracket-newline": [2, "consistent"],
  /**
   * @desc 强制数组方括号内间距一致
   * @descEN Enforce consistent spacing inside array brackets
   * @see https://eslint.style/rules/array-bracket-spacing
   */
  "stylistic/array-bracket-spacing": [2, "never"],
  /**
   * @desc 强制数组元素间换行风格
   * @descEN Enforce line breaks after each array element
   * @see https://eslint.style/rules/array-element-newline
   */
  "stylistic/array-element-newline": [2, "consistent"],
  /**
   * @desc 要求箭头函数参数使用圆括号
   * @descEN Require parentheses around arrow function arguments
   * @see https://eslint.style/rules/arrow-parens
   */
  "stylistic/arrow-parens": 2,
  /**
   * @desc 强制箭头函数箭头前后间距一致
   * @descEN Enforce consistent spacing before and after the arrow in arrow functions
   * @see https://eslint.style/rules/arrow-spacing
   */
  "stylistic/arrow-spacing": 2,
  /**
   * @desc 强制代码块内单行或多行空格风格
   * @descEN Disallow or enforce spaces inside of blocks after opening block and before closing block
   * @see https://eslint.style/rules/block-spacing
   */
  "stylistic/block-spacing": 2,
  /**
   * @desc 强制大括号风格一致
   * @descEN Enforce consistent brace style for blocks
   * @see https://eslint.style/rules/brace-style
   */
  "stylistic/brace-style": 2,
  /**
   * @desc 要求或禁止尾逗号
   * @descEN Require or disallow trailing commas
   * @see https://eslint.style/rules/comma-dangle
   */
  "stylistic/comma-dangle": [2, "always-multiline"],
  /**
   * @desc 强制逗号前后间距一致
   * @descEN Enforce consistent spacing before and after commas
   * @see https://eslint.style/rules/comma-spacing
   */
  "stylistic/comma-spacing": 2,
  /**
   * @desc 强制逗号风格（行首/行尾）
   * @descEN Enforce consistent comma style
   * @see https://eslint.style/rules/comma-style
   */
  "stylistic/comma-style": 0,
  /**
   * @desc 强制计算属性括号内间距一致
   * @descEN Enforce consistent spacing inside computed property brackets
   * @see https://eslint.style/rules/computed-property-spacing
   */
  "stylistic/computed-property-spacing": 2,
  /**
   * @desc 强制花括号前后换行风格
   * @descEN Enforce consistent line breaks after opening and before closing braces
   * @see https://eslint.style/rules/curly-newline
   */
  "stylistic/curly-newline": 2,
  /**
   * @desc 强制点操作符前后换行风格
   * @descEN Enforce consistent newlines before and after dots
   * @see https://eslint.style/rules/dot-location
   */
  "stylistic/dot-location": 0,
  /**
   * @desc 要求或禁止文件末尾空行
   * @descEN Require or disallow newline at the end of files
   * @see https://eslint.style/rules/eol-last
   */
  "stylistic/eol-last": 0,
  /**
   * @desc 强制函数调用参数间换行风格
   * @descEN Enforce line breaks between arguments of a function call
   * @see https://eslint.style/rules/function-call-argument-newline
   */
  "stylistic/function-call-argument-newline": [2, "consistent"],
  /**
   * @desc 要求或禁止函数标识符及其调用间的空格
   * @descEN Require or disallow spacing between function identifiers and their invocations
   * @see https://eslint.style/rules/function-call-spacing
   */
  "stylistic/function-call-spacing": 2,
  /**
   * @desc 强制函数括号内换行风格
   * @descEN Enforce consistent line breaks inside function parentheses
   * @see https://eslint.style/rules/function-paren-newline
   */
  "stylistic/function-paren-newline": [2, "multiline-arguments"],
  /**
   * @desc 强制 generator 函数中 * 周边间距一致
   * @descEN Enforce consistent spacing around `*` operators in generator functions
   * @see https://eslint.style/rules/generator-star-spacing
   */
  "stylistic/generator-star-spacing": 2,
  /**
   * @desc 强制箭头函数体的换行位置
   * @descEN Enforce the location of arrow function bodies
   * @see https://eslint.style/rules/implicit-arrow-linebreak
   */
  "stylistic/implicit-arrow-linebreak": 2,
  /**
   * @desc 强制一致的缩进
   * @descEN Enforce consistent indentation
   * @see https://eslint.style/rules/indent
   */
  "stylistic/indent": [2, preset.indent],
  /**
   * @desc 二元运算符的缩进
   * @descEN Indentation for binary operators
   * @see https://eslint.style/rules/indent-binary-ops
   */
  "stylistic/indent-binary-ops": [2, preset.indent],
  /**
   * @desc 强制或禁止 JSX 属性/表达式花括号内空格
   * @descEN Enforce or disallow spaces inside of curly braces in JSX attributes and expressions
   * @see https://eslint.style/rules/jsx-child-element-spacing
   */
  "stylistic/jsx-child-element-spacing": 0,
  /**
   * @desc 强制 JSX 闭合括号位置
   * @descEN Enforce closing bracket location in JSX
   * @see https://eslint.style/rules/jsx-closing-bracket-location
   */
  "stylistic/jsx-closing-bracket-location": 2,
  /**
   * @desc 强制多行 JSX 闭合标签位置
   * @descEN Enforce closing tag location for multiline JSX
   * @see https://eslint.style/rules/jsx-closing-tag-location
   */
  "stylistic/jsx-closing-tag-location": 2,
  /**
   * @desc 禁止不必要的 JSX 花括号表达式
   * @descEN Disallow unnecessary JSX expressions when literals alone are sufficient or enforce JSX expressions on literals in JSX children or attributes
   * @see https://eslint.style/rules/jsx-curly-brace-presence
   */
  "stylistic/jsx-curly-brace-presence": 0,
  /**
   * @desc 强制 JSX 花括号内换行风格一致
   * @descEN Enforce consistent linebreaks in curly braces in JSX attributes and expressions
   * @see https://eslint.style/rules/jsx-curly-newline
   */
  "stylistic/jsx-curly-newline": 2,
  /**
   * @desc 强制或禁止 JSX 花括号内空格
   * @descEN Enforce or disallow spaces inside of curly braces in JSX attributes and expressions
   * @see https://eslint.style/rules/jsx-curly-spacing
   */
  "stylistic/jsx-curly-spacing": 2,
  /**
   * @desc 强制或禁止 JSX 等号周围空格
   * @descEN Enforce or disallow spaces around equal signs in JSX attributes
   * @see https://eslint.style/rules/jsx-equals-spacing
   */
  "stylistic/jsx-equals-spacing": 2,
  /**
   * @desc 强制 JSX 第一个属性的位置
   * @descEN Enforce proper position of the first property in JSX
   * @see https://eslint.style/rules/jsx-first-prop-new-line
   */
  "stylistic/jsx-first-prop-new-line": [2, "multiprop"],
  /**
   * @desc 强制 JSX 作为函数参数时前后换行
   * @descEN Enforce line breaks before and after JSX elements when they are used as arguments to a function
   * @see https://eslint.style/rules/jsx-function-call-newline
   */
  "stylistic/jsx-function-call-newline": 2,
  /**
   * @desc 强制 JSX props 缩进
   * @descEN Enforce props indentation in JSX
   * @see https://eslint.style/rules/jsx-indent-props
   */
  "stylistic/jsx-indent-props": [2, preset.indent],
  /**
   * @desc 强制单行 JSX props 最大数量
   * @descEN Enforce maximum of props on a single line in JSX
   * @see https://eslint.style/rules/jsx-max-props-per-line
   */
  "stylistic/jsx-max-props-per-line": 2,
  /**
   * @desc 要求或禁止 JSX 元素后换行
   * @descEN Require or prevent a new line after jsx elements and expressions
   * @see https://eslint.style/rules/jsx-newline
   */
  "stylistic/jsx-newline": 0,
  /**
   * @desc 要求每行一个 JSX 表达式
   * @descEN Require one JSX element per line
   * @see https://eslint.style/rules/jsx-one-expression-per-line
   */
  "stylistic/jsx-one-expression-per-line": [2, { allow: "single-child" }],
  /**
   * @desc 强制用户自定义 JSX 组件使用 PascalCase
   * @descEN Enforce PascalCase for user-defined JSX components
   * @see https://eslint.style/rules/jsx-pascal-case
   */
  "stylistic/jsx-pascal-case": [2, { allowNamespace: true, allowAllCaps: true }],
  /**
   * @desc 强制 JSX 属性中一致使用双引号或单引号
   * @descEN Enforce the consistent use of either double or single quotes in JSX attributes
   * @see https://eslint.style/rules/jsx-quotes
   */
  "stylistic/jsx-quotes": 2,
  /**
   * @desc 禁止无子组件的额外闭合标签
   * @descEN Disallow extra closing tags for components without children
   * @see https://eslint.style/rules/jsx-self-closing-comp
   */
  "stylistic/jsx-self-closing-comp": 2,
  /**
   * @desc 强制 JSX 标签内和标签周围空格
   * @descEN Enforce whitespace in and around the JSX opening and closing brackets
   * @see https://eslint.style/rules/jsx-tag-spacing
   */
  "stylistic/jsx-tag-spacing": [2, { beforeClosing: "never" }],
  /**
   * @desc 禁止多行 JSX 缺少括号
   * @descEN Disallow missing parentheses around multiline JSX
   * @see https://eslint.style/rules/jsx-wrap-multilines
   */
  "stylistic/jsx-wrap-multilines": [2, { declaration: "parens-new-line", assignment: "parens-new-line", return: "parens-new-line", arrow: "parens-new-line", condition: "parens-new-line", logical: "parens-new-line", prop: "ignore", propertyValue: "parens-new-line" }],
  /**
   * @desc 强制对象字面量属性键值间间距
   * @descEN Enforce consistent spacing between keys and values in object literal properties
   * @see https://eslint.style/rules/key-spacing
   */
  "stylistic/key-spacing": 2,
  /**
   * @desc 强制关键字前后间距一致
   * @descEN Enforce consistent spacing before and after keywords
   * @see https://eslint.style/rules/keyword-spacing
   */
  "stylistic/keyword-spacing": 2,
  /**
   * @desc 强制行注释位置
   * @descEN Enforce position of line comments
   * @see https://eslint.style/rules/line-comment-position
   */
  "stylistic/line-comment-position": 0,
  /**
   * @desc 强制一致的换行符风格
   * @descEN Enforce consistent linebreak style
   * @see https://eslint.style/rules/linebreak-style
   */
  "stylistic/linebreak-style": 0,
  /**
   * @desc 要求注释周围有空行
   * @descEN Require empty lines around comments
   * @see https://eslint.style/rules/lines-around-comment
   */
  "stylistic/lines-around-comment": 0,
  /**
   * @desc 要求或禁止类成员间空行
   * @descEN Require or disallow an empty line between class members
   * @see https://eslint.style/rules/lines-between-class-members
   */
  "stylistic/lines-between-class-members": 0,
  /**
   * @desc 强制最大行长度
   * @descEN Enforce a maximum line length
   * @see https://eslint.style/rules/max-len
   */
  "stylistic/max-len": 0,
  /**
   * @desc 强制每行最大语句数
   * @descEN Enforce a maximum number of statements allowed per line
   * @see https://eslint.style/rules/max-statements-per-line
   */
  "stylistic/max-statements-per-line": 0,
  /**
   * @desc 要求接口和类型字面量使用特定的成员分隔符风格
   * @descEN Require a specific member delimiter style for interfaces and type literals
   * @see https://eslint.style/rules/member-delimiter-style
   */
  "stylistic/member-delimiter-style": 2,
  /**
   * @desc 强制多行注释风格
   * @descEN Enforce a particular style for multiline comments
   * @see https://eslint.style/rules/multiline-comment-style
   */
  "stylistic/multiline-comment-style": 0,
  /**
   * @desc 强制三元表达式操作数间换行
   * @descEN Enforce newlines between operands of ternary expressions
   * @see https://eslint.style/rules/multiline-ternary
   */
  "stylistic/multiline-ternary": [2, "always-multiline"],
  /**
   * @desc 要求或禁止无参构造函数调用时使用括号
   * @descEN Enforce or disallow parentheses when invoking a constructor with no arguments
   * @see https://eslint.style/rules/new-parens
   */
  "stylistic/new-parens": 2,
  /**
   * @desc 要求链式调用每行一个
   * @descEN Require a newline after each call in a method chain
   * @see https://eslint.style/rules/newline-per-chained-call
   */
  "stylistic/newline-per-chained-call": 0,
  /**
   * @desc 禁止可能与比较混淆的箭头函数
   * @descEN Disallow arrow functions where they could be confused with comparisons
   * @see https://eslint.style/rules/no-confusing-arrow
   */
  "stylistic/no-confusing-arrow": 0,
  /**
   * @desc 禁止不必要的括号
   * @descEN Disallow unnecessary parentheses
   * @see https://eslint.style/rules/no-extra-parens
   */
  "stylistic/no-extra-parens": 0,
  /**
   * @desc 禁止不必要的分号
   * @descEN Disallow unnecessary semicolons
   * @see https://eslint.style/rules/no-extra-semi
   */
  "stylistic/no-extra-semi": 2,
  /**
   * @desc 禁止数字字面量中前导或尾随小数点
   * @descEN Disallow leading or trailing decimal points in numeric literals
   * @see https://eslint.style/rules/no-floating-decimal
   */
  "stylistic/no-floating-decimal": 2,
  /**
   * @desc 禁止混用的二元运算符
   * @descEN Disallow mixed binary operators
   * @see https://eslint.style/rules/no-mixed-operators
   */
  "stylistic/no-mixed-operators": 0,
  /**
   * @desc 禁止混用空格和制表符
   * @descEN Disallow mixed spaces and tabs for indentation
   * @see https://eslint.style/rules/no-mixed-spaces-and-tabs
   */
  "stylistic/no-mixed-spaces-and-tabs": 2,
  /**
   * @desc 禁止多个空格
   * @descEN Disallow multiple spaces
   * @see https://eslint.style/rules/no-multi-spaces
   */
  "stylistic/no-multi-spaces": [2, { exceptions: { Property: false, ImportAttribute: false } }],
  /**
   * @desc 禁止多个空行
   * @descEN Disallow multiple empty lines
   * @see https://eslint.style/rules/no-multiple-empty-lines
   */
  "stylistic/no-multiple-empty-lines": [2, { max: 2, maxEOF: 1, maxBOF: 0 }],
  /**
   * @desc 禁止使用制表符
   * @descEN Disallow all tabs
   * @see https://eslint.style/rules/no-tabs
   */
  "stylistic/no-tabs": 0,
  /**
   * @desc 禁止行尾尾随空格
   * @descEN Disallow trailing whitespace at the end of lines
   * @see https://eslint.style/rules/no-trailing-spaces
   */
  "stylistic/no-trailing-spaces": 2,
  /**
   * @desc 禁止属性前有空格
   * @descEN Disallow whitespace before properties
   * @see https://eslint.style/rules/no-whitespace-before-property
   */
  "stylistic/no-whitespace-before-property": 2,
  /**
   * @desc 强制单行语句体的位置
   * @descEN Enforce the location of single-line statements
   * @see https://eslint.style/rules/nonblock-statement-body-position
   */
  "stylistic/nonblock-statement-body-position": 0,
  /**
   * @desc 强制对象花括号内换行风格
   * @descEN Enforce consistent line breaks after opening and before closing braces
   * @see https://eslint.style/rules/object-curly-newline
   */
  "stylistic/object-curly-newline": [2, { consistent: true }],
  /**
   * @desc 强制对象花括号内间距一致
   * @descEN Enforce consistent spacing inside braces
   * @see https://eslint.style/rules/object-curly-spacing
   */
  "stylistic/object-curly-spacing": [2, "always", { emptyObjects: "never" }],
  /**
   * @desc 强制对象属性分行放置
   * @descEN Enforce placing object properties on separate lines
   * @see https://eslint.style/rules/object-property-newline
   */
  "stylistic/object-property-newline": 0,
  /**
   * @desc 要求或禁止变量声明间换行
   * @descEN Require or disallow newlines around variable declarations
   * @see https://eslint.style/rules/one-var-declaration-per-line
   */
  "stylistic/one-var-declaration-per-line": 0,
  /**
   * @desc 强制运算符换行风格
   * @descEN Enforce consistent linebreak style for operators
   * @see https://eslint.style/rules/operator-linebreak
   */
  "stylistic/operator-linebreak": [2, "before"],
  /**
   * @desc 要求或禁止代码块内填充空行
   * @descEN Require or disallow padding within blocks
   * @see https://eslint.style/rules/padded-blocks
   */
  "stylistic/padded-blocks": 0,
  /**
   * @desc 要求或禁止语句间填充空行
   * @descEN Require or disallow padding lines between statements
   * @see https://eslint.style/rules/padding-line-between-statements
   */
  "stylistic/padding-line-between-statements": [
    2,
    { blankLine: "always", prev: "*", next: "return" },
    { blankLine: "always", prev: "*", next: "default" },
    { blankLine: "always", prev: "directive", next: "*" },
    { blankLine: "any", prev: "directive", next: "directive" },
  ],
  /**
   * @desc 要求对象字面量属性名使用引号
   * @descEN Require quotes around object literal, type literal, interfaces and enums property names
   * @see https://eslint.style/rules/quote-props
   */
  "stylistic/quote-props": [2, "consistent-as-needed"],
  /**
   * @desc 强制一致使用反引号/双引号/单引号
   * @descEN Enforce the consistent use of either backticks, double, or single quotes
   * @see https://eslint.style/rules/quotes
   */
  "stylistic/quotes": 2,
  /**
   * @desc 强制剩余/展开运算符与其表达式间距
   * @descEN Enforce spacing between rest and spread operators and their expressions
   * @see https://eslint.style/rules/rest-spread-spacing
   */
  "stylistic/rest-spread-spacing": 2,
  /**
   * @desc 要求或禁止分号
   * @descEN Require or disallow semicolons instead of ASI
   * @see https://eslint.style/rules/semi
   */
  "stylistic/semi": 2,
  /**
   * @desc 强制分号前后间距一致
   * @descEN Enforce consistent spacing before and after semicolons
   * @see https://eslint.style/rules/semi-spacing
   */
  "stylistic/semi-spacing": 2,
  /**
   * @desc 强制分号位置
   * @descEN Enforce location of semicolons
   * @see https://eslint.style/rules/semi-style
   */
  "stylistic/semi-style": 2,
  /**
   * @desc 强制代码块前空格一致
   * @descEN Enforce consistent spacing before blocks
   * @see https://eslint.style/rules/space-before-blocks
   */
  "stylistic/space-before-blocks": 2,
  /**
   * @desc 强制函数括号前空格一致
   * @descEN Enforce consistent spacing before function parenthesis
   * @see https://eslint.style/rules/space-before-function-paren
   */
  "stylistic/space-before-function-paren": [2, { anonymous: "always", named: "always", asyncArrow: "always", catch: "always" }],
  /**
   * @desc 强制括号内间距一致
   * @descEN Enforce consistent spacing inside parentheses
   * @see https://eslint.style/rules/space-in-parens
   */
  "stylistic/space-in-parens": 2,
  /**
   * @desc 要求中缀运算符周围空格
   * @descEN Require spacing around infix operators
   * @see https://eslint.style/rules/space-infix-ops
   */
  "stylistic/space-infix-ops": 2,
  /**
   * @desc 强制一元运算符前后空格一致
   * @descEN Enforce consistent spacing before or after unary operators
   * @see https://eslint.style/rules/space-unary-ops
   */
  "stylistic/space-unary-ops": 2,
  /**
   * @desc 强制注释中 // 或 /* 后空格一致
   * @descEN Enforce consistent spacing after the `//` or `/*` in a comment
   * @see https://eslint.style/rules/spaced-comment
   */
  "stylistic/spaced-comment": 2,
  /**
   * @desc 强制 switch 语句冒号周围空格
   * @descEN Enforce spacing around colons of switch statements
   * @see https://eslint.style/rules/switch-colon-spacing
   */
  "stylistic/switch-colon-spacing": 2,
  /**
   * @desc 要求或禁止模板字符串中表达式周围空格
   * @descEN Require or disallow spacing around embedded expressions of template strings
   * @see https://eslint.style/rules/template-curly-spacing
   */
  "stylistic/template-curly-spacing": 2,
  /**
   * @desc 要求或禁止模板标签与其字面量间空格
   * @descEN Require or disallow spacing between template tags and their literals
   * @see https://eslint.style/rules/template-tag-spacing
   */
  "stylistic/template-tag-spacing": 2,
  /**
   * @desc 要求类型注解周围间距一致
   * @descEN Require consistent spacing around type annotations
   * @see https://eslint.style/rules/type-annotation-spacing
   */
  "stylistic/type-annotation-spacing": 2,
  /**
   * @desc 强制 TypeScript 泛型内间距一致
   * @descEN Enforces consistent spacing inside TypeScript type generics
   * @see https://eslint.style/rules/type-generic-spacing
   */
  "stylistic/type-generic-spacing": 2,
  /**
   * @desc 要求具名元组中类型声明前有空格
   * @descEN Expect space before the type declaration in the named tuple
   * @see https://eslint.style/rules/type-named-tuple-spacing
   */
  "stylistic/type-named-tuple-spacing": 2,
  /**
   * @desc 要求立即调用的函数表达式周围有括号
   * @descEN Require parentheses around immediate `function` invocations
   * @see https://eslint.style/rules/wrap-iife
   */
  "stylistic/wrap-iife": 2,
  /**
   * @desc 要求正则字面量周围有括号
   * @descEN Require parenthesis around regex literals
   * @see https://eslint.style/rules/wrap-regex
   */
  "stylistic/wrap-regex": 0,
  /**
   * @desc 要求或禁止 yield* 中 * 周围空格
   * @descEN Require or disallow spacing around the `*` in `yield*` expressions
   * @see https://eslint.style/rules/yield-star-spacing
   */
  "stylistic/yield-star-spacing": 0,
};
