export default {
  /**
   * @desc 验证 Hooks 依赖数组包含所有必要的依赖
   * @descEN Validates that dependency arrays for React hooks contain all necessary dependencies
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-deps
   */
  "react-hooks/exhaustive-deps": 0,
  /**
   * @desc 验证组件和 hooks 遵循 Hooks 规则
   * @descEN Validates that components and hooks follow the Rules of Hooks
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/rules-of-hooks
   */
  "react-hooks/rules-of-hooks": 0,
  /**
   * @desc 验证定义嵌套组件或 hooks 的高阶函数
   * @descEN Validates higher order functions defining nested components or hooks
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/component-hook-factories
   */
  "react-hooks/component-hook-factories": 0,
  /**
   * @desc 验证编译器配置选项
   * @descEN Validates the compiler configuration options
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/config
   */
  "react-hooks/config": 2,
  /**
   * @desc 验证子组件错误是否使用 Error Boundaries
   * @descEN Validates usage of Error Boundaries instead of try/catch for child errors
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/error-boundaries
   */
  "react-hooks/error-boundaries": 0,
  /**
   * @desc 验证 gating 模式的配置
   * @descEN Validates configuration of gating mode
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/gating
   */
  "react-hooks/gating": 2,
  /**
   * @desc 禁止在 render 期间对全局变量赋值/修改
   * @descEN Validates against assignment/mutation of globals during render
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/globals
   */
  "react-hooks/globals": 2,
  /**
   * @desc 禁止修改 props、state 等不可变值
   * @descEN Validates against mutating props, state, and other immutable values
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/immutability
   */
  "react-hooks/immutability": 0,
  /**
   * @desc 禁止使用与记忆化不兼容的库
   * @descEN Validates against usage of libraries which are incompatible with memoization
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/incompatible-library
   */
  "react-hooks/incompatible-library": 2,
  /**
   * @desc 验证现有手动的记忆化被编译器保留
   * @descEN Validates that existing manual memoization is preserved by the compiler
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/preserve-manual-memoization
   */
  "react-hooks/preserve-manual-memoization": 2,
  /**
   * @desc 验证组件和 hooks 不调用已知的不纯函数
   * @descEN Validates that components/hooks are pure by checking known-impure functions
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/purity
   */
  "react-hooks/purity": 0,
  /**
   * @desc 验证 ref 的正确使用，禁止在 render 期间读写 ref.current
   * @descEN Validates correct usage of refs, not reading/writing during render
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/refs
   */
  "react-hooks/refs": 0,
  /**
   * @desc 禁止在 effect 中同步调用 setState
   * @descEN Validates against calling setState synchronously in an effect
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect
   */
  "react-hooks/set-state-in-effect": 0,
  /**
   * @desc 禁止在 render 期间设置状态
   * @descEN Validates against setting state during render
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-render
   */
  "react-hooks/set-state-in-render": 0,
  /**
   * @desc 验证组件是静态的，不会在每次 render 时重建
   * @descEN Validates that components are static, not recreated every render
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/static-components
   */
  "react-hooks/static-components": 0,
  /**
   * @desc 验证 React Compiler 不支持的语法
   * @descEN Validates against syntax that React Compiler does not support
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/unsupported-syntax
   */
  "react-hooks/unsupported-syntax": 0,
  /**
   * @desc 验证 useMemo 回调的使用是否没有返回值
   * @descEN Validates usage of the useMemo hook without a return value
   * @see https://react.dev/reference/eslint-plugin-react-hooks/lints/use-memo
   */
  "react-hooks/use-memo": 0,
};
