export default {
  /**
   * @desc 验证子组件错误是否使用 Error Boundaries 而非 try/catch
   * @descEN Validates usage of Error Boundaries instead of try/catch for errors in child components
   * @see https://www.eslint-react.xyz/docs/rules/error-boundaries
   */
  "react/error-boundaries": 2,
  /**
   * @desc 验证 useEffect 等 Hooks 的依赖列表完整性
   * @descEN Verifies the list of dependencies for Hooks like useEffect and similar
   * @see https://www.eslint-react.xyz/docs/rules/exhaustive-deps
   */
  "react/exhaustive-deps": 1,
  /**
   * @desc 禁止在 render 期间对全局变量赋值/修改
   * @descEN Validates against assignment/mutation of globals during render
   * @see https://www.eslint-react.xyz/docs/rules/globals
   */
  "react/globals": 0,
  /**
   * @desc 禁止修改 props、state 等不可变值
   * @descEN Validates against mutating props, state, and other values that are immutable
   * @see https://www.eslint-react.xyz/docs/rules/immutability
   */
  "react/immutability": 2,
  /**
   * @desc 禁止在 setState 回调中访问 this.state
   * @descEN Disallows accessing this.state inside setState calls
   * @see https://www.eslint-react.xyz/docs/rules/no-access-state-in-setstate
   */
  "react/no-access-state-in-setstate": 2,
  /**
   * @desc 禁止使用数组索引作为 key
   * @descEN Disallows using an item's index in the array as its key
   * @see https://www.eslint-react.xyz/docs/rules/no-array-index-key
   */
  "react/no-array-index-key": 1,
  /**
   * @desc 禁止使用 Children.count
   * @descEN Disallows the use of Children.count from the react package
   * @see https://www.eslint-react.xyz/docs/rules/no-children-count
   */
  "react/no-children-count": 1,
  /**
   * @desc 禁止使用 Children.forEach
   * @descEN Disallows the use of Children.forEach from the react package
   * @see https://www.eslint-react.xyz/docs/rules/no-children-for-each
   */
  "react/no-children-for-each": 1,
  /**
   * @desc 禁止使用 Children.map
   * @descEN Disallows the use of Children.map from the react package
   * @see https://www.eslint-react.xyz/docs/rules/no-children-map
   */
  "react/no-children-map": 1,
  /**
   * @desc 禁止使用 Children.only
   * @descEN Disallows the use of Children.only from the react package
   * @see https://www.eslint-react.xyz/docs/rules/no-children-only
   */
  "react/no-children-only": 1,
  /**
   * @desc 禁止使用 Children.toArray
   * @descEN Disallows the use of Children.toArray from the react package
   * @see https://www.eslint-react.xyz/docs/rules/no-children-to-array
   */
  "react/no-children-to-array": 1,
  /**
   * @desc 禁止使用类组件（错误边界除外）
   * @descEN Disallows class components except for error boundaries
   * @see https://www.eslint-react.xyz/docs/rules/no-class-component
   */
  "react/no-class-component": 2,
  /**
   * @desc 禁止使用 cloneElement
   * @descEN Disallows cloneElement
   * @see https://www.eslint-react.xyz/docs/rules/no-clone-element
   */
  "react/no-clone-element": 1,
  /**
   * @desc 禁止使用 componentWillMount，替换为 UNSAFE_componentWillMount
   * @descEN Replaces usage of componentWillMount with UNSAFE_componentWillMount
   * @see https://www.eslint-react.xyz/docs/rules/no-component-will-mount
   */
  "react/no-component-will-mount": 2,
  /**
   * @desc 禁止使用 componentWillReceiveProps，替换为 UNSAFE_componentWillReceiveProps
   * @descEN Replaces usage of componentWillReceiveProps with UNSAFE_componentWillReceiveProps
   * @see https://www.eslint-react.xyz/docs/rules/no-component-will-receive-props
   */
  "react/no-component-will-receive-props": 2,
  /**
   * @desc 禁止使用 componentWillUpdate，替换为 UNSAFE_componentWillUpdate
   * @descEN Replaces usage of componentWillUpdate with UNSAFE_componentWillUpdate
   * @see https://www.eslint-react.xyz/docs/rules/no-component-will-update
   */
  "react/no-component-will-update": 2,
  /**
   * @desc 禁止使用 Context.Provider，替换为 Context
   * @descEN Replaces usage of Context.Provider with Context
   * @see https://www.eslint-react.xyz/docs/rules/no-context-provider
   */
  "react/no-context-provider": 2,
  /**
   * @desc 禁止在函数组件中使用 createRef
   * @descEN Disallows createRef in function components
   * @see https://www.eslint-react.xyz/docs/rules/no-create-ref
   */
  "react/no-create-ref": 2,
  /**
   * @desc 禁止直接修改 this.state
   * @descEN Disallows direct mutation of this.state
   * @see https://www.eslint-react.xyz/docs/rules/no-direct-mutation-state
   */
  "react/no-direct-mutation-state": 2,
  /**
   * @desc 防止渲染列表时兄弟元素存在重复 key
   * @descEN Prevents duplicate key props on sibling elements when rendering lists
   * @see https://www.eslint-react.xyz/docs/rules/no-duplicate-key
   */
  "react/no-duplicate-key": 1,
  /**
   * @desc 禁止使用 forwardRef，改为将 ref 作为 prop 传递
   * @descEN Replaces usage of forwardRef with passing ref as a prop
   * @see https://www.eslint-react.xyz/docs/rules/no-forward-ref
   */
  "react/no-forward-ref": 2,
  /**
   * @desc 防止隐式传递 children prop
   * @descEN Prevents implicitly passing the children prop to components
   * @see https://www.eslint-react.xyz/docs/rules/no-implicit-children
   */
  "react/no-implicit-children": 0,
  /**
   * @desc 防止隐式传递 key prop
   * @descEN Prevents implicitly passing the key prop to components
   * @see https://www.eslint-react.xyz/docs/rules/no-implicit-key
   */
  "react/no-implicit-key": 1,
  /**
   * @desc 防止隐式传递 ref prop
   * @descEN Prevents implicitly passing the ref prop to components
   * @see https://www.eslint-react.xyz/docs/rules/no-implicit-ref
   */
  "react/no-implicit-ref": 1,
  /**
   * @desc 防止有问题的泄漏值被渲染
   * @descEN Prevents problematic leaked values from being rendered
   * @see https://www.eslint-react.xyz/docs/rules/no-leaked-conditional-rendering
   */
  "react/no-leaked-conditional-rendering": 2,
  /**
   * @desc 要求所有组件都有 displayName
   * @descEN Enforces that all components have a displayName that can be used in DevTools
   * @see https://www.eslint-react.xyz/docs/rules/no-missing-component-display-name
   */
  "react/no-missing-component-display-name": 1,
  /**
   * @desc 要求所有 context 都有 displayName
   * @descEN Enforces that all contexts have a displayName that can be used in DevTools
   * @see https://www.eslint-react.xyz/docs/rules/no-missing-context-display-name
   */
  "react/no-missing-context-display-name": 1,
  /**
   * @desc 禁止列表渲染中缺少 key
   * @descEN Disallows missing key on items in list rendering
   * @see https://www.eslint-react.xyz/docs/rules/no-missing-key
   */
  "react/no-missing-key": 2,
  /**
   * @desc 防止错误使用 captureOwnerStack
   * @descEN Prevents incorrect usage of captureOwnerStack
   * @see https://www.eslint-react.xyz/docs/rules/no-misused-capture-owner-stack
   */
  "react/no-misused-capture-owner-stack": 2,
  /**
   * @desc 禁止在其他组件内部嵌套定义组件
   * @descEN Disallows nesting component definitions inside other components
   * @see https://www.eslint-react.xyz/docs/rules/no-nested-component-definitions
   */
  "react/no-nested-component-definitions": 2,
  /**
   * @desc 禁止在其他组件或 hooks 内嵌套 lazy 组件声明
   * @descEN Disallows nesting lazy component declarations inside other components or hooks
   * @see https://www.eslint-react.xyz/docs/rules/no-nested-lazy-component-declarations
   */
  "react/no-nested-lazy-component-declarations": 2,
  /**
   * @desc 禁止在 componentDidMount 中调用 setState
   * @descEN Disallows calling this.setState in componentDidMount outside functions such as callbacks
   * @see https://www.eslint-react.xyz/docs/rules/no-set-state-in-component-did-mount
   */
  "react/no-set-state-in-component-did-mount": 2,
  /**
   * @desc 禁止在 componentDidUpdate 中调用 setState
   * @descEN Disallows calling this.setState in componentDidUpdate outside functions such as callbacks
   * @see https://www.eslint-react.xyz/docs/rules/no-set-state-in-component-did-update
   */
  "react/no-set-state-in-component-did-update": 2,
  /**
   * @desc 禁止在 componentWillUpdate 中调用 setState
   * @descEN Disallows calling this.setState in componentWillUpdate outside functions such as callbacks
   * @see https://www.eslint-react.xyz/docs/rules/no-set-state-in-component-will-update
   */
  "react/no-set-state-in-component-will-update": 2,
  /**
   * @desc 要求以 use 为前缀的函数体内至少使用一个 Hook
   * @descEN Enforces that a function with the use prefix uses at least one Hook inside it
   * @see https://www.eslint-react.xyz/docs/rules/no-unnecessary-use-prefix
   */
  "react/no-unnecessary-use-prefix": 2,
  /**
   * @desc 警告使用 UNSAFE_componentWillMount
   * @descEN Warns about the use of UNSAFE_componentWillMount in class components
   * @see https://www.eslint-react.xyz/docs/rules/no-unsafe-component-will-mount
   */
  "react/no-unsafe-component-will-mount": 2,
  /**
   * @desc 警告使用 UNSAFE_componentWillReceiveProps
   * @descEN Warns about the use of UNSAFE_componentWillReceiveProps in class components
   * @see https://www.eslint-react.xyz/docs/rules/no-unsafe-component-will-receive-props
   */
  "react/no-unsafe-component-will-receive-props": 2,
  /**
   * @desc 警告使用 UNSAFE_componentWillUpdate
   * @descEN Warns about the use of UNSAFE_componentWillUpdate in class components
   * @see https://www.eslint-react.xyz/docs/rules/no-unsafe-component-will-update
   */
  "react/no-unsafe-component-will-update": 2,
  /**
   * @desc 防止非稳定值作为 Context.Provider 的 value
   * @descEN Prevents non-stable values from being used as a value for Context.Provider
   * @see https://www.eslint-react.xyz/docs/rules/no-unstable-context-value
   */
  "react/no-unstable-context-value": 2,
  /**
   * @desc 防止引用类型值用作对象解构的默认 props
   * @descEN Prevents using referential-type values as default props in object destructuring
   * @see https://www.eslint-react.xyz/docs/rules/no-unstable-default-props
   */
  "react/no-unstable-default-props": 2,
  /**
   * @desc 警告未使用的类组件方法和属性
   * @descEN Warns about unused class component methods and properties
   * @see https://www.eslint-react.xyz/docs/rules/no-unused-class-component-members
   */
  "react/no-unused-class-component-members": 1,
  /**
   * @desc 警告已定义但从未使用的组件 props
   * @descEN Warns about component props that are defined but never used
   * @see https://www.eslint-react.xyz/docs/rules/no-unused-props
   */
  "react/no-unused-props": 1,
  /**
   * @desc 将 useContext 替换为 use
   * @descEN Replaces usage of useContext with use
   * @see https://www.eslint-react.xyz/docs/rules/no-use-context
   */
  "react/no-use-context": 2,
  /**
   * @desc 验证组件和 hooks 在 render 期间不调用已知的不纯函数
   * @descEN Validates that components and hooks are pure by checking that they do not call known-impure functions during render
   * @see https://www.eslint-react.xyz/docs/rules/purity
   */
  "react/purity": 2,
  /**
   * @desc 验证 ref 的正确使用，禁止在 render 期间读写 ref.current
   * @descEN Validates correct usage of refs by checking that ref.current is not read or written during render
   * @see https://www.eslint-react.xyz/docs/rules/refs
   */
  "react/refs": 2,
  /**
   * @desc 强制 Hooks 规则
   * @descEN Enforces the Rules of Hooks
   * @see https://www.eslint-react.xyz/docs/rules/rules-of-hooks
   */
  "react/rules-of-hooks": 2,
  /**
   * @desc 禁止在 effect 中同步设置状态
   * @descEN Validates against setting state synchronously in an effect
   * @see https://www.eslint-react.xyz/docs/rules/set-state-in-effect
   */
  "react/set-state-in-effect": 2,
  /**
   * @desc 禁止在 render 期间无条件设置状态
   * @descEN Validates against unconditionally setting state during render
   * @see https://www.eslint-react.xyz/docs/rules/set-state-in-render
   */
  "react/set-state-in-render": 2,
  /**
   * @desc 验证组件是静态的，不会在每次 render 时重建
   * @descEN Validates that components are static, not recreated every render
   * @see https://www.eslint-react.xyz/docs/rules/static-components
   */
  "react/static-components": 2,
  /**
   * @desc 验证 React Compiler 不支持的语法
   * @descEN Validates against syntax that React Compiler does not support
   * @see https://www.eslint-react.xyz/docs/rules/unsupported-syntax
   */
  "react/unsupported-syntax": 2,
  /**
   * @desc 验证 useMemo 的回调返回一个值
   * @descEN Validates that useMemo is called with a callback that returns a value
   * @see https://www.eslint-react.xyz/docs/rules/use-memo
   */
  "react/use-memo": 2,
  /**
   * @desc 强制正确使用 useState，包括解构和对称命名
   * @descEN Enforces correct usage of useState, including destructuring, symmetric naming of the value and setter
   * @see https://www.eslint-react.xyz/docs/rules/use-state
   */
  "react/use-state": 2,

  /**
   * @desc 禁止将 children 作为 prop 传递
   * @descEN Disallows passing children as a prop
   * @see https://www.eslint-react.xyz/docs/rules/jsx-no-children-prop
   */
  "react/jsx-no-children-prop": 0,
  /**
   * @desc 禁止同时将 children 作为 prop 与嵌套内容传递
   * @descEN Disallows passing children as a prop when children are also passed as nested content
   * @see https://www.eslint-react.xyz/docs/rules/jsx-no-children-prop-with-children
   */
  "react/jsx-no-children-prop-with-children": 2,
  /**
   * @desc 防止注释字符串被意外插入 JSX 文本节点
   * @descEN Prevents comment strings from being accidentally inserted into a JSX element's text nodes
   * @see https://www.eslint-react.xyz/docs/rules/jsx-no-comment-textnodes
   */
  "react/jsx-no-comment-textnodes": 1,
  /**
   * @desc 防止展开操作符后使用 key 导致自动 JSX 运行时去优化
   * @descEN Prevent patterns that cause deoptimization when using the automatic JSX runtime
   * @see https://www.eslint-react.xyz/docs/rules/jsx-no-key-after-spread
   */
  "react/jsx-no-key-after-spread": 2,
  /**
   * @desc 捕获 JSX 中从模板字符串复制遗留的 $ 符号
   * @descEN Catches $ before {expr} in JSX — typically from template literal ${expr} being copy-pasted into JSX
   * @see https://www.eslint-react.xyz/docs/rules/jsx-no-leaked-dollar
   */
  "react/jsx-no-leaked-dollar": 2,
  /**
   * @desc 捕获 JSX 文本节点开头的分号
   * @descEN Catches ; at the start of JSX text nodes — typically from accidentally placing a statement-ending ; inside JSX
   * @see https://www.eslint-react.xyz/docs/rules/jsx-no-leaked-semicolon
   */
  "react/jsx-no-leaked-semicolon": 2,
  /**
   * @desc 禁止 JSX 命名空间语法
   * @descEN Disallow JSX namespace syntax, as React does not support them
   * @see https://www.eslint-react.xyz/docs/rules/jsx-no-namespace
   */
  "react/jsx-no-namespace": 2,
  /**
   * @desc 禁止无用的 Fragment 元素
   * @descEN Disallows useless fragment elements
   * @see https://www.eslint-react.xyz/docs/rules/jsx-no-useless-fragment
   */
  "react/jsx-no-useless-fragment": 2,

  /**
   * @desc 验证和转换 React Client/Server 函数定义
   * @descEN Validates and transforms React Client/Server Function definitions
   * @see https://www.eslint-react.xyz/docs/rules/rsc-function-definition
   */
  "react/rsc-function-definition": 0,

  /**
   * @desc 禁止 DOM 元素使用 dangerouslySetInnerHTML
   * @descEN Disallows DOM elements from using dangerouslySetInnerHTML
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-dangerously-set-innerhtml
   */
  "react/dom-no-dangerously-set-innerhtml": 1,
  /**
   * @desc 禁止同时使用 dangerouslySetInnerHTML 和 children
   * @descEN Disallows DOM elements from using dangerouslySetInnerHTML and children at the same time
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-dangerously-set-innerhtml-with-children
   */
  "react/dom-no-dangerously-set-innerhtml-with-children": 2,
  /**
   * @desc 禁止使用 findDOMNode
   * @descEN Disallows findDOMNode
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-find-dom-node
   */
  "react/dom-no-find-dom-node": 2,
  /**
   * @desc 禁止使用 flushSync
   * @descEN Disallows flushSync
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-flush-sync
   */
  "react/dom-no-flush-sync": 2,
  /**
   * @desc 禁止使用 ReactDOM.hydrate，替换为 hydrateRoot
   * @descEN Replaces usage of ReactDOM.hydrate with hydrateRoot
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-hydrate
   */
  "react/dom-no-hydrate": 2,
  /**
   * @desc 要求 button 元素使用显式 type 属性
   * @descEN Enforces an explicit type attribute for button elements
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-missing-button-type
   */
  "react/dom-no-missing-button-type": 1,
  /**
   * @desc 要求 iframe 元素使用显式 sandbox 属性
   * @descEN Enforces an explicit sandbox attribute for iframe elements
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-missing-iframe-sandbox
   */
  "react/dom-no-missing-iframe-sandbox": 1,
  /**
   * @desc 禁止使用 ReactDOM.render，替换为 createRoot
   * @descEN Replaces usage of ReactDOM.render with createRoot(node).render
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-render
   */
  "react/dom-no-render": 2,
  /**
   * @desc 禁止使用 ReactDOM.render 的返回值
   * @descEN Disallows the return value of ReactDOM.render
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-render-return-value
   */
  "react/dom-no-render-return-value": 2,
  /**
   * @desc 禁止使用 javascript: URL 作为属性值
   * @descEN Disallows javascript: URLs as attribute values
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-script-url
   */
  "react/dom-no-script-url": 1,
  /**
   * @desc 禁止使用字符串 style prop，应使用对象
   * @descEN Disallows the use of string style prop in JSX. Use an object instead
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-string-style-prop
   */
  "react/dom-no-string-style-prop": 2,
  /**
   * @desc 禁止未知的 DOM 属性
   * @descEN Disallows unknown DOM properties
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-unknown-property
   */
  "react/dom-no-unknown-property": 2,
  /**
   * @desc 强制 iframe 的 sandbox 属性不能设置为不安全组合
   * @descEN Enforces that the sandbox attribute for iframe elements is not set to unsafe combinations
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-unsafe-iframe-sandbox
   */
  "react/dom-no-unsafe-iframe-sandbox": 1,
  /**
   * @desc 禁止 target=_blank 缺少 rel=noreferrer noopener
   * @descEN Disallows target=_blank without rel=noreferrer noopener
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-unsafe-target-blank
   */
  "react/dom-no-unsafe-target-blank": 1,
  /**
   * @desc 禁止使用 useFormState，替换为 useActionState
   * @descEN Replaces usage of useFormState with useActionState
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-use-form-state
   */
  "react/dom-no-use-form-state": 2,
  /**
   * @desc 禁止在 void DOM 元素中使用 children
   * @descEN Disallows children in void DOM elements
   * @see https://www.eslint-react.xyz/docs/rules/dom-no-void-elements-with-children
   */
  "react/dom-no-void-elements-with-children": 2,

  /**
   * @desc 要求 addEventListener 有对应的 removeEventListener
   * @descEN Enforces that every addEventListener has a corresponding removeEventListener
   * @see https://www.eslint-react.xyz/docs/rules/web-api-no-leaked-event-listener
   */
  "react/web-api-no-leaked-event-listener": 2,
  /**
   * @desc 要求 fetch 有对应的 AbortController 中止
   * @descEN Enforces that every fetch has a corresponding AbortController abort in the cleanup function
   * @see https://www.eslint-react.xyz/docs/rules/web-api-no-leaked-fetch
   */
  "react/web-api-no-leaked-fetch": 2,
  /**
   * @desc 要求 setInterval 有对应的 clearInterval
   * @descEN Enforces that every setInterval has a corresponding clearInterval
   * @see https://www.eslint-react.xyz/docs/rules/web-api-no-leaked-interval
   */
  "react/web-api-no-leaked-interval": 2,
  /**
   * @desc 要求 ResizeObserver 有对应的 disconnect
   * @descEN Enforces that every ResizeObserver created has a corresponding disconnect
   * @see https://www.eslint-react.xyz/docs/rules/web-api-no-leaked-resize-observer
   */
  "react/web-api-no-leaked-resize-observer": 2,
  /**
   * @desc 要求 setTimeout 有对应的 clearTimeout
   * @descEN Enforces that every setTimeout has a corresponding clearTimeout
   * @see https://www.eslint-react.xyz/docs/rules/web-api-no-leaked-timeout
   */
  "react/web-api-no-leaked-timeout": 2,
  /**
   * @desc 要求 IntersectionObserver 有对应的 disconnect
   * @descEN Enforces that every IntersectionObserver created has a corresponding disconnect
   * @see https://www.eslint-react.xyz/docs/rules/web-api-no-leaked-intersection-observer
   */
  "react/web-api-no-leaked-intersection-observer": 2,

  /**
   * @desc 强制 context 名称为有效组件名并以 Context 结尾
   * @descEN Enforces the context name to be a valid component name with the suffix Context
   * @see https://www.eslint-react.xyz/docs/rules/naming-convention-context-name
   */
  "react/naming-convention-context-name": 2,
  /**
   * @desc 强制 useId 赋值的标识符命名为 id 或以 Id 结尾
   * @descEN Enforces identifier names assigned from useId calls to be either id or end with Id
   * @see https://www.eslint-react.xyz/docs/rules/naming-convention-id-name
   */
  "react/naming-convention-id-name": 2,
  /**
   * @desc 强制 useRef 赋值的标识符命名为 ref 或以 Ref 结尾
   * @descEN Enforces identifier names assigned from useRef calls to be either ref or end with Ref
   * @see https://www.eslint-react.xyz/docs/rules/naming-convention-ref-name
   */
  "react/naming-convention-ref-name": 2,

  /**
   * @desc 以 JSON 格式报告所有函数组件
   * @descEN Reports all function components in JSON format
   * @see https://www.eslint-react.xyz/docs/rules/debug-function-component
   */
  "react/debug-function-component": 0,
  /**
   * @desc 以 JSON 格式报告所有 Hooks
   * @descEN Reports all React Hooks in JSON format
   * @see https://www.eslint-react.xyz/docs/rules/debug-hook
   */
  "react/debug-hook": 0,
  /**
   * @desc 以 JSON 格式报告所有从 React 初始化的标识符
   * @descEN Reports all identifiers initialized from React in JSON format
   * @see https://www.eslint-react.xyz/docs/rules/debug-is-from-react
   */
  "react/debug-is-from-react": 0,
  /**
   * @desc 以 JSON 格式报告所有从 ref 初始化或派生的标识符
   * @descEN Reports all identifiers initialized or derived from refs in JSON format
   * @see https://www.eslint-react.xyz/docs/rules/debug-is-from-ref
   */
  "react/debug-is-from-ref": 0,
  /**
   * @desc 以 JSON 格式报告所有 JSX 元素和片段
   * @descEN Reports all JSX elements and fragments in JSON format
   * @see https://www.eslint-react.xyz/docs/rules/debug-jsx
   */
  "react/debug-jsx": 0,
};
