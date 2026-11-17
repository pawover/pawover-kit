import preset from "./preset.ts";

/**
 * `vue` 规则组配置
 *
 * 规则名 → 严重级别/配置的映射：`vue` 组经预设工厂（`src/config.ts`）装配进 flat config，注册名 `vue`。
 */
const rules = {
  // Base Rules
  /**
   * @desc 识别模板中 HTML 注释里的 eslint-disable / eslint-enable 指令
   * @descEN support comment-directives in `<template>`
   * @see https://eslint.vuejs.org/rules/comment-directive.html
   */
  "vue/comment-directive": 2,
  /**
   * @desc 防止 JSX 模板中使用的变量被 no-unused-vars 误报
   * @descEN prevent variables used in JSX to be marked as unused
   * @see https://eslint.vuejs.org/rules/jsx-uses-vars.html
   */
  "vue/jsx-uses-vars": 2,
  // Priority A: Essential
  /**
   * @desc 要求组件名必须由多个单词组成，避免与 HTML 元素冲突
   * @descEN require component names to be always multi-word
   * @see https://eslint.vuejs.org/rules/multi-word-component-names.html
   */
  "vue/multi-word-component-names": 0,
  /**
   * @desc 禁止在 watch 中使用箭头函数（会丢失组件上下文）
   * @descEN disallow using arrow functions to define watcher
   * @see https://eslint.vuejs.org/rules/no-arrow-functions-in-watch.html
   */
  "vue/no-arrow-functions-in-watch": 2,
  /**
   * @desc 禁止在 computed 中执行异步操作或返回 Promise
   * @descEN disallow asynchronous actions in computed properties
   * @see https://eslint.vuejs.org/rules/no-async-in-computed-properties.html
   */
  "vue/no-async-in-computed-properties": 2,
  /**
   * @desc 禁止 v-html / v-text 所在元素再写子内容（会被覆盖）
   * @descEN disallow element's child contents which would be overwritten by a directive like `v-html` or `v-text`
   * @see https://eslint.vuejs.org/rules/no-child-content.html
   */
  "vue/no-child-content": 2,
  /**
   * @desc 禁止在 data 中访问 computed（执行顺序无法保证）
   * @descEN disallow accessing computed properties in `data`
   * @see https://eslint.vuejs.org/rules/no-computed-properties-in-data.html
   */
  "vue/no-computed-properties-in-data": 2,
  /**
   * @desc 禁止对象字面量中出现重复的键
   * @descEN disallow duplication of field names
   * @see https://eslint.vuejs.org/rules/no-dupe-keys.html
   */
  "vue/no-dupe-keys": 2,
  /**
   * @desc 禁止 v-if / v-else-if 链中出现相同的条件
   * @descEN disallow duplicate conditions in `v-if` / `v-else-if` chains
   * @see https://eslint.vuejs.org/rules/no-dupe-v-else-if.html
   */
  "vue/no-dupe-v-else-if": 2,
  /**
   * @desc 禁止元素上出现重复的属性
   * @descEN disallow duplication of attributes
   * @see https://eslint.vuejs.org/rules/no-duplicate-attributes.html
   */
  "vue/no-duplicate-attributes": 2,
  /**
   * @desc 禁止在 script setup 中使用 export
   * @descEN disallow `export` in `<script setup>`
   * @see https://eslint.vuejs.org/rules/no-export-in-script-setup.html
   */
  "vue/no-export-in-script-setup": 2,
  /**
   * @desc 禁止直接修改 prop 或 prop 的深层属性
   * @descEN disallow mutation of component props
   * @see https://eslint.vuejs.org/rules/no-mutating-props.html
   */
  "vue/no-mutating-props": 2,
  /**
   * @desc 禁止模板中出现无法解析的语法
   * @descEN disallow parsing errors in `<template>`
   * @see https://eslint.vuejs.org/rules/no-parsing-error.html
   */
  "vue/no-parsing-error": 2,
  /**
   * @desc 禁止直接对 ref() 返回值做运算，必须使用 .value
   * @descEN disallow use of value wrapped by `ref()` (Composition API) as an operand
   * @see https://eslint.vuejs.org/rules/no-ref-as-operand.html
   */
  "vue/no-ref-as-operand": 2,
  /**
   * @desc 禁止把组件命名为 HTML 元素名或 Vue 保留字
   * @descEN disallow the use of reserved names in component definitions
   * @see https://eslint.vuejs.org/rules/no-reserved-component-names.html
   */
  "vue/no-reserved-component-names": 2,
  /**
   * @desc 禁止在组件实例上覆盖 Vue 内部保留的 key
   * @descEN disallow overwriting reserved keys
   * @see https://eslint.vuejs.org/rules/no-reserved-keys.html
   */
  "vue/no-reserved-keys": 2,
  /**
   * @desc 禁止使用 Vue 内部保留的 prop 名
   * @descEN disallow reserved names in props
   * @see https://eslint.vuejs.org/rules/no-reserved-props.html
   */
  "vue/no-reserved-props": 2,
  /**
   * @desc 要求组件的 data 选项必须是一个返回对象的函数
   * @descEN enforce component's data property to be a function
   * @see https://eslint.vuejs.org/rules/no-shared-component-data.html
   */
  "vue/no-shared-component-data": 2,
  /**
   * @desc 禁止在 computed 中产生副作用或修改非响应式状态
   * @descEN disallow side effects in computed properties
   * @see https://eslint.vuejs.org/rules/no-side-effects-in-computed-properties.html
   */
  "vue/no-side-effects-in-computed-properties": 2,
  /**
   * @desc 禁止在 <template> 上写 key 属性（不生效）
   * @descEN disallow `key` attribute on `<template>`
   * @see https://eslint.vuejs.org/rules/no-template-key.html
   */
  "vue/no-template-key": 2,
  /**
   * @desc 禁止在 <textarea> 中使用插值（请用 v-model）
   * @descEN disallow mustaches in `<textarea>`
   * @see https://eslint.vuejs.org/rules/no-textarea-mustache.html
   */
  "vue/no-textarea-mustache": 2,
  /**
   * @desc 禁止注册后未在模板中使用的组件
   * @descEN disallow registering components that are not used inside templates
   * @see https://eslint.vuejs.org/rules/no-unused-components.html
   */
  "vue/no-unused-components": 1,
  /**
   * @desc 禁止 v-for 指令或作用域属性中出现未使用的变量
   * @descEN disallow unused variable definitions of v-for directives or scope attributes
   * @see https://eslint.vuejs.org/rules/no-unused-vars.html
   */
  "vue/no-unused-vars": 1,
  /**
   * @desc 禁止把 computed 当方法调用
   * @descEN disallow use computed property like method
   * @see https://eslint.vuejs.org/rules/no-use-computed-property-like-method.html
   */
  "vue/no-use-computed-property-like-method": 2,
  /**
   * @desc 禁止把 v-if 与 v-for 写在同一元素上
   * @descEN disallow using `v-if` on the same element as `v-for`
   * @see https://eslint.vuejs.org/rules/no-use-v-if-with-v-for.html
   */
  "vue/no-use-v-if-with-v-for": 2,
  /**
   * @desc 禁止在 <template> 上写无意义的属性（如 key / v-if 在普通标签上）
   * @descEN disallow useless attribute on `<template>`
   * @see https://eslint.vuejs.org/rules/no-useless-template-attributes.html
   */
  "vue/no-useless-template-attributes": 2,
  /**
   * @desc 禁止在组件上使用 v-text / v-html
   * @descEN disallow v-text / v-html on component
   * @see https://eslint.vuejs.org/rules/no-v-text-v-html-on-component.html
   */
  "vue/no-v-text-v-html-on-component": 2,
  /**
   * @desc 要求 <component> 元素必须绑定 :is
   * @descEN require `v-bind:is` of `<component>` elements
   * @see https://eslint.vuejs.org/rules/require-component-is.html
   */
  "vue/require-component-is": 2,
  /**
   * @desc 要求 prop 的类型必须是构造函数
   * @descEN require prop type to be a constructor
   * @see https://eslint.vuejs.org/rules/require-prop-type-constructor.html
   */
  "vue/require-prop-type-constructor": 2,
  /**
   * @desc 要求 render 函数必须有返回值
   * @descEN enforce render function to always return value
   * @see https://eslint.vuejs.org/rules/require-render-return.html
   */
  "vue/require-render-return": 2,
  /**
   * @desc 要求 v-for 指令必须绑定 key
   * @descEN require `v-bind:key` with `v-for` directives
   * @see https://eslint.vuejs.org/rules/require-v-for-key.html
   */
  "vue/require-v-for-key": 2,
  /**
   * @desc 要求 prop 的默认值必须与声明类型匹配
   * @descEN enforce props default values to be valid
   * @see https://eslint.vuejs.org/rules/require-valid-default-prop.html
   */
  "vue/require-valid-default-prop": 2,
  /**
   * @desc 要求 computed 中必须有 return 语句
   * @descEN enforce that a return statement is present in computed property
   * @see https://eslint.vuejs.org/rules/return-in-computed-property.html
   */
  "vue/return-in-computed-property": 2,
  /**
   * @desc 要求 emits 校验函数必须有 return 语句
   * @descEN enforce that a return statement is present in emits validator
   * @see https://eslint.vuejs.org/rules/return-in-emits-validator.html
   */
  "vue/return-in-emits-validator": 2,
  /**
   * @desc 要求使用精确修饰符 .exact 来避免不必要的按键组合触发
   * @descEN enforce usage of `exact` modifier on `v-on`
   * @see https://eslint.vuejs.org/rules/use-v-on-exact.html
   */
  "vue/use-v-on-exact": 2,
  /**
   * @desc 要求属性名是合法值
   * @descEN require valid attribute names
   * @see https://eslint.vuejs.org/rules/valid-attribute-name.html
   */
  "vue/valid-attribute-name": 2,
  /**
   * @desc 要求 defineEmits 编译器宏使用合法声明
   * @descEN enforce valid `defineEmits` compiler macro
   * @see https://eslint.vuejs.org/rules/valid-define-emits.html
   */
  "vue/valid-define-emits": 2,
  /**
   * @desc 要求 defineProps 编译器宏使用合法声明
   * @descEN enforce valid `defineProps` compiler macro
   * @see https://eslint.vuejs.org/rules/valid-define-props.html
   */
  "vue/valid-define-props": 2,
  /**
   * @desc 要求 nextTick 回调的使用方式正确
   * @descEN enforce valid `nextTick` function calls
   * @see https://eslint.vuejs.org/rules/valid-next-tick.html
   */
  "vue/valid-next-tick": 2,
  /**
   * @desc 要求模板根节点合法
   * @descEN enforce valid template root
   * @see https://eslint.vuejs.org/rules/valid-template-root.html
   */
  "vue/valid-template-root": 2,
  /**
   * @desc 要求 v-bind 指令合法
   * @descEN enforce valid `v-bind` directives
   * @see https://eslint.vuejs.org/rules/valid-v-bind.html
   */
  "vue/valid-v-bind": 2,
  /**
   * @desc 要求 v-cloak 指令合法
   * @descEN enforce valid `v-cloak` directives
   * @see https://eslint.vuejs.org/rules/valid-v-cloak.html
   */
  "vue/valid-v-cloak": 2,
  /**
   * @desc 要求 v-else-if 指令合法
   * @descEN enforce valid `v-else-if` directives
   * @see https://eslint.vuejs.org/rules/valid-v-else-if.html
   */
  "vue/valid-v-else-if": 2,
  /**
   * @desc 要求 v-else 指令合法
   * @descEN enforce valid `v-else` directives
   * @see https://eslint.vuejs.org/rules/valid-v-else.html
   */
  "vue/valid-v-else": 2,
  /**
   * @desc 要求 v-for 指令合法
   * @descEN enforce valid `v-for` directives
   * @see https://eslint.vuejs.org/rules/valid-v-for.html
   */
  "vue/valid-v-for": 2,
  /**
   * @desc 要求 v-html 指令合法
   * @descEN enforce valid `v-html` directives
   * @see https://eslint.vuejs.org/rules/valid-v-html.html
   */
  "vue/valid-v-html": 2,
  /**
   * @desc 要求 v-if 指令合法
   * @descEN enforce valid `v-if` directives
   * @see https://eslint.vuejs.org/rules/valid-v-if.html
   */
  "vue/valid-v-if": 2,
  /**
   * @desc 要求 v-model 指令合法
   * @descEN enforce valid `v-model` directives
   * @see https://eslint.vuejs.org/rules/valid-v-model.html
   */
  "vue/valid-v-model": 2,
  /**
   * @desc 要求 v-on 指令合法
   * @descEN enforce valid `v-on` directives
   * @see https://eslint.vuejs.org/rules/valid-v-on.html
   */
  "vue/valid-v-on": 2,
  /**
   * @desc 要求 v-once 指令合法
   * @descEN enforce valid `v-once` directives
   * @see https://eslint.vuejs.org/rules/valid-v-once.html
   */
  "vue/valid-v-once": 2,
  /**
   * @desc 要求 v-pre 指令合法
   * @descEN enforce valid `v-pre` directives
   * @see https://eslint.vuejs.org/rules/valid-v-pre.html
   */
  "vue/valid-v-pre": 2,
  /**
   * @desc 要求 v-show 指令合法
   * @descEN enforce valid `v-show` directives
   * @see https://eslint.vuejs.org/rules/valid-v-show.html
   */
  "vue/valid-v-show": 2,
  /**
   * @desc 要求 v-slot 指令合法
   * @descEN enforce valid `v-slot` directives
   * @see https://eslint.vuejs.org/rules/valid-v-slot.html
   */
  "vue/valid-v-slot": 2,
  /**
   * @desc 要求 v-text 指令合法
   * @descEN enforce valid `v-text` directives
   * @see https://eslint.vuejs.org/rules/valid-v-text.html
   */
  "vue/valid-v-text": 2,

  // Priority A: Essential for Vue.js 3.x
  /**
   * @desc 禁止在 Vue 3 中使用对象形式声明 data（已废弃）
   * @descEN disallow using deprecated object declaration on data (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-data-object-declaration.html
   */
  "vue/no-deprecated-data-object-declaration": 2,
  /**
   * @desc 禁止在 Vue 3 中使用已废弃的 $delete / $set
   * @descEN disallow using deprecated `$delete` and `$set` (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-delete-set.html
   */
  "vue/no-deprecated-delete-set": 2,
  /**
   * @desc 禁止在 Vue 3 中使用已废弃的 destroyed / beforeDestroy 钩子
   * @descEN disallow using deprecated `destroyed` and `beforeDestroy` lifecycle hooks (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-destroyed-lifecycle.html
   */
  "vue/no-deprecated-destroyed-lifecycle": 2,
  /**
   * @desc 禁止在 Vue 3 中使用已废弃的 $listeners
   * @descEN disallow using deprecated `$listeners` (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-dollar-listeners-api.html
   */
  "vue/no-deprecated-dollar-listeners-api": 2,
  /**
   * @desc 禁止在 Vue 3 中使用已废弃的 $scopedSlots
   * @descEN disallow using deprecated `$scopedSlots` (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-dollar-scopedslots-api.html
   */
  "vue/no-deprecated-dollar-scopedslots-api": 2,
  /**
   * @desc 禁止在 Vue 3 中使用已废弃的事件 API（$on / $off / $once）
   * @descEN disallow using deprecated events api (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-events-api.html
   */
  "vue/no-deprecated-events-api": 2,
  /**
   * @desc 禁止在 Vue 3 中使用已废弃的过滤器语法
   * @descEN disallow using deprecated filters syntax (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-filter.html
   */
  "vue/no-deprecated-filter": 2,
  /**
   * @desc 禁止在 Vue 3 中使用已废弃的 functional 模板属性
   * @descEN disallow using deprecated the `functional` template (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-functional-template.html
   */
  "vue/no-deprecated-functional-template": 2,
  /**
   * @desc 禁止在 Vue 3 中使用 HTML 元素上已废弃的 is 属性
   * @descEN disallow using deprecated the `is` attribute on HTML elements (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-html-element-is.html
   */
  "vue/no-deprecated-html-element-is": 2,
  /**
   * @desc 禁止在 Vue 3 中使用已废弃的 inline-template 属性
   * @descEN disallow using deprecated `inline-template` attribute (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-inline-template.html
   */
  "vue/no-deprecated-inline-template": 2,
  /**
   * @desc 禁止在 Vue 3 中使用已废弃的 model 选项定义
   * @descEN disallow deprecated `model` definition (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-model-definition.html
   */
  "vue/no-deprecated-model-definition": 2,
  /**
   * @desc 禁止在 Vue 3 的 prop 默认值函数中访问 this
   * @descEN disallow deprecated `this` access in props default function (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-props-default-this.html
   */
  "vue/no-deprecated-props-default-this": 2,
  /**
   * @desc 禁止在 Vue 3 中使用 RouterLink 上已废弃的 tag 属性
   * @descEN disallow using deprecated `tag` property on `RouterLink` (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-router-link-tag-prop.html
   */
  "vue/no-deprecated-router-link-tag-prop": 2,
  /**
   * @desc 禁止使用已废弃的 scope 属性
   * @descEN disallow deprecated `scope` attribute (in Vue.js 2.5.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-scope-attribute.html
   */
  "vue/no-deprecated-scope-attribute": 2,
  /**
   * @desc 禁止使用已废弃的 slot 属性
   * @descEN disallow deprecated `slot` attribute (in Vue.js 2.6.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-slot-attribute.html
   */
  "vue/no-deprecated-slot-attribute": 2,
  /**
   * @desc 禁止使用已废弃的 slot-scope 属性
   * @descEN disallow deprecated `slot-scope` attribute (in Vue.js 2.6.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-slot-scope-attribute.html
   */
  "vue/no-deprecated-slot-scope-attribute": 2,
  /**
   * @desc 禁止在 Vue 3 中使用 v-bind 上已废弃的 .sync 修饰符
   * @descEN disallow use of deprecated `.sync` modifier on `v-bind` directive (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-v-bind-sync.html
   */
  "vue/no-deprecated-v-bind-sync": 2,
  /**
   * @desc 禁止在 Vue 3.1+ 中使用已废弃的 v-is 指令
   * @descEN disallow deprecated `v-is` directive (in Vue.js 3.1.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-v-is.html
   */
  "vue/no-deprecated-v-is": 2,
  /**
   * @desc 禁止在 Vue 3 中使用已废弃的 .native 修饰符
   * @descEN disallow using deprecated `.native` modifiers (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-v-on-native-modifier.html
   */
  "vue/no-deprecated-v-on-native-modifier": 2,
  /**
   * @desc 禁止在 Vue 3 中使用已废弃的按键码修饰符
   * @descEN disallow using deprecated number (keycode) modifiers (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-v-on-number-modifiers.html
   */
  "vue/no-deprecated-v-on-number-modifiers": 2,
  /**
   * @desc 禁止在 Vue 3 中使用已废弃的 Vue.config.keyCodes
   * @descEN disallow using deprecated `Vue.config.keyCodes` (in Vue.js 3.0.0+)
   * @see https://eslint.vuejs.org/rules/no-deprecated-vue-config-keycodes.html
   */
  "vue/no-deprecated-vue-config-keycodes": 2,
  /**
   * @desc 禁止异步注册 expose（必须同步调用）
   * @descEN disallow asynchronously registered `expose`
   * @see https://eslint.vuejs.org/rules/no-expose-after-await.html
   */
  "vue/no-expose-after-await": 2,
  /**
   * @desc 禁止异步注册生命周期钩子（必须同步调用）
   * @descEN disallow asynchronously registered lifecycle hooks
   * @see https://eslint.vuejs.org/rules/no-lifecycle-after-await.html
   */
  "vue/no-lifecycle-after-await": 2,
  /**
   * @desc 禁止把 key 写在 <template v-for> 的子元素上（Vue 3 必须写在 template 自身）
   * @descEN disallow key of `<template v-for>` placed on child elements
   * @see https://eslint.vuejs.org/rules/no-v-for-template-key-on-child.html
   */
  "vue/no-v-for-template-key-on-child": 2,
  /**
   * @desc 禁止异步注册 watch（必须同步调用）
   * @descEN disallow asynchronously registered `watch`
   * @see https://eslint.vuejs.org/rules/no-watch-after-await.html
   */
  "vue/no-watch-after-await": 2,
  /**
   * @desc 要求从 'vue' 导入而不是 '@vue/*'
   * @descEN enforce import from 'vue' instead of import from '@vue/*'
   * @see https://eslint.vuejs.org/rules/prefer-import-from-vue.html
   */
  "vue/prefer-import-from-vue": 2,
  /**
   * @desc 要求把 $slots 的属性当函数调用
   * @descEN enforce properties of `$slots` to be used as a function
   * @see https://eslint.vuejs.org/rules/require-slots-as-functions.html
   */
  "vue/require-slots-as-functions": 2,
  /**
   * @desc 要求 <transition> 内部必须有可切换的节点
   * @descEN require control the display of the content inside `<transition>`
   * @see https://eslint.vuejs.org/rules/require-toggle-inside-transition.html
   */
  "vue/require-toggle-inside-transition": 2,
  /**
   * @desc 要求 defineOptions 编译器宏使用合法声明
   * @descEN enforce valid `defineOptions` compiler macro
   * @see https://eslint.vuejs.org/rules/valid-define-options.html
   */
  "vue/valid-define-options": 2,
  /**
   * @desc 要求 v-is 指令合法
   * @descEN enforce valid `v-is` directives
   * @see https://eslint.vuejs.org/rules/valid-v-is.html
   */
  "vue/valid-v-is": 2,
  /**
   * @desc 要求 v-memo 指令合法
   * @descEN enforce valid `v-memo` directives
   * @see https://eslint.vuejs.org/rules/valid-v-memo.html
   */
  "vue/valid-v-memo": 2,

  // Priority A: Essential for Vue.js 2.x
  /**
   * @desc 禁止在组件的 v-model 上使用自定义修饰符
   * @descEN disallow custom modifiers on v-model used on the component
   * @see https://eslint.vuejs.org/rules/no-custom-modifiers-on-v-model.html
   */
  "vue/no-custom-modifiers-on-v-model": 2,
  /**
   * @desc 禁止模板有多个根节点（Vue 2 限制）
   * @descEN disallow adding multiple root nodes to the template
   * @see https://eslint.vuejs.org/rules/no-multiple-template-root.html
   */
  "vue/no-multiple-template-root": 0,

  // Priority B: Strongly Recommended
  /**
   * @desc 要求自定义组件属性使用 kebab-case 命名
   * @descEN enforce attribute naming style on custom components in template
   * @see https://eslint.vuejs.org/rules/attribute-hyphenation.html
   */
  "vue/attribute-hyphenation": [
    2,
    "never",
    { ignore: [] },
  ],
  /**
   * @desc 要求组件定义时使用特定大小写风格
   * @descEN enforce specific casing for component definition name
   * @see https://eslint.vuejs.org/rules/component-definition-name-casing.html
   */
  "vue/component-definition-name-casing": 2,
  /**
   * @desc 要求第一个属性的位置遵循单行 / 多行规则
   * @descEN enforce the location of first attribute
   * @see https://eslint.vuejs.org/rules/first-attribute-linebreak.html
   */
  "vue/first-attribute-linebreak": [
    2,
    { singleline: "beside", multiline: "below" },
  ],
  /**
   * @desc 要求标签闭合括号前是否换行
   * @descEN require or disallow a line break before tag's closing brackets
   * @see https://eslint.vuejs.org/rules/html-closing-bracket-newline.html
   */
  "vue/html-closing-bracket-newline": 2,
  /**
   * @desc 要求标签闭合括号前是否加空格
   * @descEN require or disallow a space before tag's closing brackets
   * @see https://eslint.vuejs.org/rules/html-closing-bracket-spacing.html
   */
  "vue/html-closing-bracket-spacing": 2,
  /**
   * @desc 要求 HTML 结束标签风格
   * @descEN enforce end tag style
   * @see https://eslint.vuejs.org/rules/html-end-tags.html
   */
  "vue/html-end-tags": 2,
  /**
   * @desc 要求模板中统一缩进
   * @descEN enforce consistent indentation in `<template>`
   * @see https://eslint.vuejs.org/rules/html-indent.html
   */
  "vue/html-indent": 2,
  /**
   * @desc 要求 HTML 属性使用统一引号风格
   * @descEN enforce quotes style of HTML attributes
   * @see https://eslint.vuejs.org/rules/html-quotes.html
   */
  "vue/html-quotes": 2,
  /**
   * @desc 要求 HTML / SVG / MathML 元素遵循自闭合风格
   * @descEN enforce self-closing style
   * @see https://eslint.vuejs.org/rules/html-self-closing.html
   */
  "vue/html-self-closing": [
    2,
    {
      html: { void: "always", normal: "always", component: "always" },
      svg: "always",
      math: "always",
    },
  ],
  /**
   * @desc 限制每行最多允许的属性数量
   * @descEN enforce the maximum number of attributes per line
   * @see https://eslint.vuejs.org/rules/max-attributes-per-line.html
   */
  "vue/max-attributes-per-line": 2,
  /**
   * @desc 要求多行元素内容前后换行
   * @descEN require a line break before and after the contents of a multiline element
   * @see https://eslint.vuejs.org/rules/multiline-html-element-content-newline.html
   */
  "vue/multiline-html-element-content-newline": 2,
  /**
   * @desc 要求模板插值内统一空格风格
   * @descEN enforce unified spacing in mustache interpolations
   * @see https://eslint.vuejs.org/rules/mustache-interpolation-spacing.html
   */
  "vue/mustache-interpolation-spacing": 2,
  /**
   * @desc 禁止模板中出现连续多余空格
   * @descEN disallow multiple spaces
   * @see https://eslint.vuejs.org/rules/no-multi-spaces.html
   */
  "vue/no-multi-spaces": 2,
  /**
   * @desc 禁止属性等号两侧出现空格
   * @descEN disallow spaces around equal signs in attribute
   * @see https://eslint.vuejs.org/rules/no-spaces-around-equal-signs-in-attribute.html
   */
  "vue/no-spaces-around-equal-signs-in-attribute": 2,
  /**
   * @desc 禁止模板变量遮蔽外层作用域同名变量
   * @descEN disallow variable declarations from shadowing variables declared in the outer scope
   * @see https://eslint.vuejs.org/rules/no-template-shadow.html
   */
  "vue/no-template-shadow": 2,
  /**
   * @desc 要求每个文件只定义一个组件
   * @descEN enforce that each component should be in its own file
   * @see https://eslint.vuejs.org/rules/one-component-per-file.html
   */
  "vue/one-component-per-file": 2,
  /**
   * @desc 要求 prop 名遵循特定大小写风格
   * @descEN enforce specific casing for the Prop name in Vue components
   * @see https://eslint.vuejs.org/rules/prop-name-casing.html
   */
  "vue/prop-name-casing": 2,
  /**
   * @desc 要求 prop 提供默认值
   * @descEN require default value for props
   * @see https://eslint.vuejs.org/rules/require-default-prop.html
   */
  "vue/require-default-prop": 0,
  /**
   * @desc 要求 prop 声明类型
   * @descEN require type definitions in props
   * @see https://eslint.vuejs.org/rules/require-prop-types.html
   */
  "vue/require-prop-types": 2,
  /**
   * @desc 要求单行元素内容前后换行
   * @descEN require a line break before and after the contents of a singleline element
   * @see https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html
   */
  "vue/singleline-html-element-content-newline": 2,
  /**
   * @desc 要求 v-bind 指令缩写风格
   * @descEN enforce `v-bind` directive style
   * @see https://eslint.vuejs.org/rules/v-bind-style.html
   */
  "vue/v-bind-style": 2,
  /**
   * @desc 要求 v-on 指令缩写风格
   * @descEN enforce `v-on` directive style
   * @see https://eslint.vuejs.org/rules/v-on-style.html
   */
  "vue/v-on-style": 2,
  /**
   * @desc 要求 v-slot 指令风格
   * @descEN enforce `v-slot` directive style
   * @see https://eslint.vuejs.org/rules/v-slot-style.html
   */
  "vue/v-slot-style": 2,

  // Priority B: Strongly Recommended for Vue.js 3.x
  /**
   * @desc 要求 emits 选项显式声明 $emit() 触发的事件名
   * @descEN require `emits` option with name triggered by `$emit()`
   * @see https://eslint.vuejs.org/rules/require-explicit-emits.html
   */
  "vue/require-explicit-emits": 2,
  /**
   * @desc 要求 v-on 事件名使用 kebab-case 命名
   * @descEN enforce v-on event naming style on custom components in template
   * @see https://eslint.vuejs.org/rules/v-on-event-hyphenation.html
   */
  "vue/v-on-event-hyphenation": [
    2,
    "never",
    { autofix: true },
  ],

  // Priority C: Recommended
  /**
   * @desc 要求属性按指定顺序排列
   * @descEN enforce order of attributes
   * @see https://eslint.vuejs.org/rules/attributes-order.html
   */
  "vue/attributes-order": 2,
  /**
   * @desc 要求 SFC 顶级块的书写顺序
   * @descEN enforce order of component top-level elements
   * @see https://eslint.vuejs.org/rules/block-order.html
   */
  "vue/block-order": [
    2,
    {
      order: ["script:not([setup])", "script[setup]", "template", "style[scoped]", "style:not([scoped])"],
    },
  ],
  /**
   * @desc 禁止不必要的 <template> 包装
   * @descEN disallow unnecessary `<template>`
   * @see https://eslint.vuejs.org/rules/no-lone-template.html
   */
  "vue/no-lone-template": 2,
  /**
   * @desc 禁止向作用域插槽传入多个参数
   * @descEN disallow passing multiple arguments to scoped slots
   * @see https://eslint.vuejs.org/rules/no-multiple-slot-args.html
   */
  "vue/no-multiple-slot-args": 2,
  /**
   * @desc 要求带默认值的 prop 必须声明为可选
   * @descEN enforce props with default values to be optional
   * @see https://eslint.vuejs.org/rules/no-required-prop-with-default.html
   */
  "vue/no-required-prop-with-default": 2,
  /**
   * @desc 禁止使用 v-html（防 XSS）
   * @descEN disallow use of v-html to prevent XSS attack
   * @see https://eslint.vuejs.org/rules/no-v-html.html
   */
  "vue/no-v-html": 0,
  /**
   * @desc 要求组件选项按指定顺序书写
   * @descEN enforce order of properties in components
   * @see https://eslint.vuejs.org/rules/order-in-components.html
   */
  "vue/order-in-components": 2,
  /**
   * @desc 禁止在模板中使用 this
   * @descEN disallow usage of `this` in template
   * @see https://eslint.vuejs.org/rules/this-in-template.html
   */
  "vue/this-in-template": 2,

  // Uncategorised
  /**
   * @desc 限制 SFC 顶级块允许的 lang 值
   * @descEN disallow use other than available `lang`
   * @see https://eslint.vuejs.org/rules/block-lang.html
   */
  "vue/block-lang": 0,
  /**
   * @desc 要求 SFC 顶级块标签前后换行
   * @descEN enforce line breaks after opening and before closing block-level tags
   * @see https://eslint.vuejs.org/rules/block-tag-newline.html
   */
  "vue/block-tag-newline": 2,
  /**
   * @desc 要求使用指定的组件 API 风格（Options / Composition / script-setup）
   * @descEN enforce component API style
   * @see https://eslint.vuejs.org/rules/component-api-style.html
   */
  "vue/component-api-style": 2,
  /**
   * @desc 要求模板中组件名使用特定大小写风格
   * @descEN enforce specific casing for the component naming style in template
   * @see https://eslint.vuejs.org/rules/component-name-in-template-casing.html
   */
  "vue/component-name-in-template-casing": [
    2,
    "PascalCase",
    { registeredComponentsOnly: false },
  ],
  /**
   * @desc 要求 components 选项中组件名遵循特定大小写
   * @descEN enforce the casing of component name in `components` options
   * @see https://eslint.vuejs.org/rules/component-options-name-casing.html
   */
  "vue/component-options-name-casing": [2, "PascalCase"],
  /**
   * @desc 要求自定义事件名遵循特定大小写风格
   * @descEN enforce specific casing for custom event name
   * @see https://eslint.vuejs.org/rules/custom-event-name-casing.html
   */
  "vue/custom-event-name-casing": [
    2,
    "camelCase",
    { ignores: [] },
  ],
  /**
   * @desc 要求 defineEmits 使用特定声明风格
   * @descEN enforce declaration style of `defineEmits`
   * @see https://eslint.vuejs.org/rules/define-emits-declaration.html
   */
  "vue/define-emits-declaration": 0,
  /**
   * @desc 要求编译器宏（defineProps / defineEmits 等）按指定顺序书写
   * @descEN enforce order of compiler macros (`defineProps`, `defineEmits`, etc.)
   * @see https://eslint.vuejs.org/rules/define-macros-order.html
   */
  "vue/define-macros-order": [
    2,
    {
      order: ["defineOptions", "defineProps", "defineSlots", "defineEmits"],
      defineExposeLast: false,
    },
  ],
  /**
   * @desc 要求 defineProps 使用特定声明风格
   * @descEN enforce declaration style of `defineProps`
   * @see https://eslint.vuejs.org/rules/define-props-declaration.html
   */
  "vue/define-props-declaration": 0,
  /**
   * @desc 要求 defineProps 解构遵循一致风格
   * @descEN enforce consistent style for props destructuring
   * @see https://eslint.vuejs.org/rules/define-props-destructuring.html
   */
  "vue/define-props-destructuring": 0,
  /**
   * @desc 要求或禁止 SFC <style> 使用 scoped / module 属性
   * @descEN enforce or forbid the use of the `scoped` and `module` attributes in SFC top level style tags
   * @see https://eslint.vuejs.org/rules/enforce-style-attribute.html
   */
  "vue/enforce-style-attribute": 0,
  /**
   * @desc 要求 <button> 必须显式声明 type 属性
   * @descEN disallow usage of button without an explicit type attribute
   * @see https://eslint.vuejs.org/rules/html-button-has-type.html
   */
  "vue/html-button-has-type": 0,
  /**
   * @desc 要求 HTML 注释内容前后换行一致
   * @descEN enforce unified line break in HTML comments
   * @see https://eslint.vuejs.org/rules/html-comment-content-newline.html
   */
  "vue/html-comment-content-newline": 2,
  /**
   * @desc 要求 HTML 注释内容空格一致
   * @descEN enforce unified spacing in HTML comments
   * @see https://eslint.vuejs.org/rules/html-comment-content-spacing.html
   */
  "vue/html-comment-content-spacing": 2,
  /**
   * @desc 要求 HTML 注释内缩进一致
   * @descEN enforce consistent indentation in HTML comments
   * @see https://eslint.vuejs.org/rules/html-comment-indent.html
   */
  "vue/html-comment-indent": 2,
  /**
   * @desc 要求组件 name 属性与文件名一致
   * @descEN require component name property to match its file name
   * @see https://eslint.vuejs.org/rules/match-component-file-name.html
   */
  "vue/match-component-file-name": 0,
  /**
   * @desc 要求注册的组件名与导入的变量名一致
   * @descEN require the registered component name to match the imported component name
   * @see https://eslint.vuejs.org/rules/match-component-import-name.html
   */
  "vue/match-component-import-name": 2,
  /**
   * @desc 限制 SFC 块内最大行数
   * @descEN enforce maximum number of lines in Vue SFC blocks
   * @see https://eslint.vuejs.org/rules/max-lines-per-block.html
   */
  "vue/max-lines-per-block": 2,
  /**
   * @desc 限制组件的最大 prop 数量
   * @descEN enforce maximum number of props in Vue component
   * @see https://eslint.vuejs.org/rules/max-props.html
   */
  "vue/max-props": 0,
  /**
   * @desc 限制模板最大嵌套深度
   * @descEN enforce maximum depth of template
   * @see https://eslint.vuejs.org/rules/max-template-depth.html
   */
  "vue/max-template-depth": 0,
  /**
   * @desc 要求多行属性之间插入空行
   * @descEN enforce new lines between multi-line properties in Vue components
   * @see https://eslint.vuejs.org/rules/new-line-between-multi-line-property.html
   */
  "vue/new-line-between-multi-line-property": 0,
  /**
   * @desc 要求 nextTick 使用特定风格（Promise 或回调）
   * @descEN enforce Promise or callback style in `nextTick`
   * @see https://eslint.vuejs.org/rules/next-tick-style.html
   */
  "vue/next-tick-style": 0,
  /**
   * @desc 禁止模板中出现裸字符串字面量
   * @descEN disallow the use of bare strings in `<template>`
   * @see https://eslint.vuejs.org/rules/no-bare-strings-in-template.html
   */
  "vue/no-bare-strings-in-template": 0,
  /**
   * @desc 禁止给 prop 设置布尔默认值
   * @descEN disallow boolean defaults
   * @see https://eslint.vuejs.org/rules/no-boolean-default.html
   */
  "vue/no-boolean-default": 0,
  /**
   * @desc 禁止在 SFC 顶级块之外写内容
   * @descEN disallow content outside of the top-level blocks
   * @see https://eslint.vuejs.org/rules/no-content-outside-block.html
   */
  "vue/no-content-outside-block": 2,
  /**
   * @desc 禁止在 defineModel 中设置默认值
   * @descEN disallow default values in `defineModel`
   * @see https://eslint.vuejs.org/rules/no-define-model-default.html
   */
  "vue/no-define-model-default": 2,
  /**
   * @desc 要求使用 v-bind="$attrs" 时把 inheritAttrs 设为 false
   * @descEN enforce `inheritAttrs` to be set to `false` when using `v-bind="$attrs"`
   * @see https://eslint.vuejs.org/rules/no-duplicate-attr-inheritance.html
   */
  "vue/no-duplicate-attr-inheritance": 2,
  /**
   * @desc 禁止 class 属性中出现重复的类名
   * @descEN disallow duplication of class names in class attributes
   * @see https://eslint.vuejs.org/rules/no-duplicate-class-names.html
   */
  "vue/no-duplicate-class-names": 2,
  /**
   * @desc 禁止空的 <template> / <script> / <style> 块
   * @descEN disallow the `<template>` `<script>` `<style>` block to be empty
   * @see https://eslint.vuejs.org/rules/no-empty-component-block.html
   */
  "vue/no-empty-component-block": 2,
  /**
   * @desc 禁止显式导入 Vue 编译器宏
   * @descEN disallow importing Vue compiler macros
   * @see https://eslint.vuejs.org/rules/no-import-compiler-macros.html
   */
  "vue/no-import-compiler-macros": 0,
  /**
   * @desc 禁止在模板中使用对象 / 数组 / 函数字面量
   * @descEN disallow object, array, and function literals in template
   * @see https://eslint.vuejs.org/rules/no-literals-in-template.html
   */
  "vue/no-literals-in-template": 1,
  /**
   * @desc 禁止在 class 中以数组形式传入多个对象
   * @descEN disallow passing multiple objects in an array to class
   * @see https://eslint.vuejs.org/rules/no-multiple-objects-in-class.html
   */
  "vue/no-multiple-objects-in-class": 0,
  /**
   * @desc 禁止在 v-if / v-else 中使用取反条件
   * @descEN disallow negated conditions in v-if/v-else
   * @see https://eslint.vuejs.org/rules/no-negated-v-if-condition.html
   */
  "vue/no-negated-v-if-condition": 0,
  /**
   * @desc 禁止组件选项中出现疑似拼写错误
   * @descEN disallow a potential typo in your component property
   * @see https://eslint.vuejs.org/rules/no-potential-component-option-typo.html
   */
  "vue/no-potential-component-option-typo": 0,
  /**
   * @desc 禁止在 script setup 中声明与 prop 同名的变量
   * @descEN disallow declarations that shadow props in `<script setup>`
   * @see https://eslint.vuejs.org/rules/no-props-shadow.html
   */
  "vue/no-props-shadow": 2,
  /**
   * @desc 禁止可能导致响应式丢失的 ref 用法
   * @descEN disallow usages of ref objects that can lead to loss of reactivity
   * @see https://eslint.vuejs.org/rules/no-ref-object-reactivity-loss.html
   */
  "vue/no-ref-object-reactivity-loss": 0,
  /**
   * @desc 禁止使用指定的 SFC 块
   * @descEN disallow specific block
   * @see https://eslint.vuejs.org/rules/no-restricted-block.html
   */
  "vue/no-restricted-block": 0,
  /**
   * @desc 禁止在 await 之后调用指定的方法
   * @descEN disallow asynchronously called restricted methods
   * @see https://eslint.vuejs.org/rules/no-restricted-call-after-await.html
   */
  "vue/no-restricted-call-after-await": 0,
  /**
   * @desc 禁止使用指定的 CSS 类名
   * @descEN disallow specific classes in Vue components
   * @see https://eslint.vuejs.org/rules/no-restricted-class.html
   */
  "vue/no-restricted-class": 0,
  /**
   * @desc 禁止使用指定的组件名
   * @descEN disallow specific component names
   * @see https://eslint.vuejs.org/rules/no-restricted-component-names.html
   */
  "vue/no-restricted-component-names": 0,
  /**
   * @desc 禁止使用指定的组件选项
   * @descEN disallow specific component option
   * @see https://eslint.vuejs.org/rules/no-restricted-component-options.html
   */
  "vue/no-restricted-component-options": 0,
  /**
   * @desc 禁止使用指定的自定义事件名
   * @descEN disallow specific custom event
   * @see https://eslint.vuejs.org/rules/no-restricted-custom-event.html
   */
  "vue/no-restricted-custom-event": 0,
  /**
   * @desc 禁止使用指定的 HTML 元素
   * @descEN disallow specific elements
   * @see https://eslint.vuejs.org/rules/no-restricted-html-elements.html
   */
  "vue/no-restricted-html-elements": 0,
  /**
   * @desc 禁止使用指定的 prop
   * @descEN disallow specific props
   * @see https://eslint.vuejs.org/rules/no-restricted-props.html
   */
  "vue/no-restricted-props": 0,
  /**
   * @desc 禁止使用指定的静态属性
   * @descEN disallow specific attribute
   * @see https://eslint.vuejs.org/rules/no-restricted-static-attribute.html
   */
  "vue/no-restricted-static-attribute": 0,
  /**
   * @desc 禁止在 v-bind 中使用指定的参数
   * @descEN disallow specific argument in `v-bind`
   * @see https://eslint.vuejs.org/rules/no-restricted-v-bind.html
   */
  "vue/no-restricted-v-bind": 0,
  /**
   * @desc 禁止在 v-on 中使用指定的参数
   * @descEN disallow specific argument in `v-on`
   * @see https://eslint.vuejs.org/rules/no-restricted-v-on.html
   */
  "vue/no-restricted-v-on": 0,
  /**
   * @desc 禁止在根元素上使用 v-if
   * @descEN disallow `v-if` directives on root element
   * @see https://eslint.vuejs.org/rules/no-root-v-if.html
   */
  "vue/no-root-v-if": 0,
  /**
   * @desc 禁止导致传入 setup 的 props 丢失响应式的用法
   * @descEN disallow usages that lose the reactivity of `props` passed to `setup`
   * @see https://eslint.vuejs.org/rules/no-setup-props-reactivity-loss.html
   */
  "vue/no-setup-props-reactivity-loss": 0,
  /**
   * @desc 禁止使用与原生 Web 事件名相同的事件名
   * @descEN disallow the use of event names that collide with native web event names
   * @see https://eslint.vuejs.org/rules/no-shadow-native-events.html
   */
  "vue/no-shadow-native-events": 2,
  /**
   * @desc 禁止静态行内 style 属性
   * @descEN disallow static inline `style` attributes
   * @see https://eslint.vuejs.org/rules/no-static-inline-styles.html
   */
  "vue/no-static-inline-styles": 0,
  /**
   * @desc 禁止 target="_blank" 缺少 rel="noopener noreferrer"
   * @descEN disallow target="_blank" attribute without rel="noopener noreferrer"
   * @see https://eslint.vuejs.org/rules/no-template-target-blank.html
   */
  "vue/no-template-target-blank": 0,
  /**
   * @desc 禁止在 beforeRouteEnter 中使用 this
   * @descEN disallow `this` usage in a `beforeRouteEnter` method
   * @see https://eslint.vuejs.org/rules/no-this-in-before-route-enter.html
   */
  "vue/no-this-in-before-route-enter": 2,
  /**
   * @desc 禁止在模板中使用未定义的组件
   * @descEN disallow use of undefined components in `<template>`
   * @see https://eslint.vuejs.org/rules/no-undef-components.html
   */
  "vue/no-undef-components": 0,
  /**
   * @desc 禁止使用未定义的自定义指令
   * @descEN disallow use of undefined custom directives
   * @see https://eslint.vuejs.org/rules/no-undef-directives.html
   */
  "vue/no-undef-directives": 2,
  /**
   * @desc 禁止使用未声明的 Vue 实例属性
   * @descEN disallow undefined properties
   * @see https://eslint.vuejs.org/rules/no-undef-properties.html
   */
  "vue/no-undef-properties": 0,
  /**
   * @desc 禁止使用指定 Vue 版本不支持的语法
   * @descEN disallow unsupported Vue.js syntax on the specified version
   * @see https://eslint.vuejs.org/rules/no-unsupported-features.html
   */
  "vue/no-unsupported-features": 0,
  /**
   * @desc 禁止未被使用的 emit 声明
   * @descEN disallow unused emit declarations
   * @see https://eslint.vuejs.org/rules/no-unused-emit-declarations.html
   */
  "vue/no-unused-emit-declarations": 0,
  /**
   * @desc 禁止未被使用的 prop
   * @descEN disallow unused properties
   * @see https://eslint.vuejs.org/rules/no-unused-properties.html
   */
  "vue/no-unused-properties": 1,
  /**
   * @desc 禁止未被使用的 ref
   * @descEN disallow unused refs
   * @see https://eslint.vuejs.org/rules/no-unused-refs.html
   */
  "vue/no-unused-refs": 1,
  /**
   * @desc 禁止把 v-else-if / v-else 与 v-for 写在同一元素
   * @descEN disallow using `v-else-if`/`v-else` on the same element as `v-for`
   * @see https://eslint.vuejs.org/rules/no-use-v-else-with-v-for.html
   */
  "vue/no-use-v-else-with-v-for": 0,
  /**
   * @desc 禁止不必要的模板插值
   * @descEN disallow unnecessary mustache interpolations
   * @see https://eslint.vuejs.org/rules/no-useless-mustaches.html
   */
  "vue/no-useless-mustaches": 2,
  /**
   * @desc 禁止不必要的 v-bind 指令
   * @descEN disallow unnecessary `v-bind` directives
   * @see https://eslint.vuejs.org/rules/no-useless-v-bind.html
   */
  "vue/no-useless-v-bind": 2,
  /**
   * @desc 禁止使用 v-text
   * @descEN disallow use of v-text
   * @see https://eslint.vuejs.org/rules/no-v-text.html
   */
  "vue/no-v-text": 0,
  /**
   * @desc 要求 SFC 顶级块之间插入空行
   * @descEN require or disallow padding lines between blocks
   * @see https://eslint.vuejs.org/rules/padding-line-between-blocks.html
   */
  "vue/padding-line-between-blocks": 2,
  /**
   * @desc 要求模板中相邻标签之间插入空行
   * @descEN require or disallow newlines between sibling tags in template
   * @see https://eslint.vuejs.org/rules/padding-line-between-tags.html
   */
  "vue/padding-line-between-tags": 0,
  /**
   * @desc 要求组件定义选项之间插入空行
   * @descEN require or disallow padding lines in component definition
   * @see https://eslint.vuejs.org/rules/padding-lines-in-component-definition.html
   */
  "vue/padding-lines-in-component-definition": 0,
  /**
   * @desc 要求使用 defineOptions 而非默认导出
   * @descEN enforce use of `defineOptions` instead of default export
   * @see https://eslint.vuejs.org/rules/prefer-define-options.html
   */
  "vue/prefer-define-options": 2,
  /**
   * @desc 要求 prop 类型数组中 Boolean 放在最前
   * @descEN enforce `Boolean` comes first in component prop types
   * @see https://eslint.vuejs.org/rules/prefer-prop-type-boolean-first.html
   */
  "vue/prefer-prop-type-boolean-first": 2,
  /**
   * @desc 要求把静态类名放在独立的 class 属性中
   * @descEN require static class names in template to be in a separate `class` attribute
   * @see https://eslint.vuejs.org/rules/prefer-separate-static-class.html
   */
  "vue/prefer-separate-static-class": 0,
  /**
   * @desc 要求 $emit 只传单个参数
   * @descEN enforce passing a single argument to custom event emissions
   * @see https://eslint.vuejs.org/rules/prefer-single-event-payload.html
   */
  "vue/prefer-single-event-payload": 1,
  /**
   * @desc 要求 v-bind 值为 true 时使用属性简写
   * @descEN require shorthand form attribute when `v-bind` value is `true`
   * @see https://eslint.vuejs.org/rules/prefer-true-attribute-shorthand.html
   */
  "vue/prefer-true-attribute-shorthand": 0,
  /**
   * @desc 要求模板 ref 使用 useTemplateRef 而非 ref / shallowRef
   * @descEN require using `useTemplateRef` instead of `ref`/`shallowRef` for template refs
   * @see https://eslint.vuejs.org/rules/prefer-use-template-ref.html
   */
  "vue/prefer-use-template-ref": 2,
  /**
   * @desc 要求使用 v-model 而非 :prop / @update:prop 组合
   * @descEN enforce using `v-model` instead of `:prop`/`@update:prop` pair
   * @see https://eslint.vuejs.org/rules/prefer-v-model.html
   */
  "vue/prefer-v-model": 1,
  /**
   * @desc 要求组件必须是默认导出
   * @descEN require components to be the default export
   * @see https://eslint.vuejs.org/rules/require-default-export.html
   */
  "vue/require-default-export": 2,
  /**
   * @desc 要求组件必须直接导出
   * @descEN require the component to be directly exported
   * @see https://eslint.vuejs.org/rules/require-direct-export.html
   */
  "vue/require-direct-export": 2,
  /**
   * @desc 要求 emits 使用类型定义
   * @descEN require type definitions in emits
   * @see https://eslint.vuejs.org/rules/require-emit-validator.html
   */
  "vue/require-emit-validator": 0,
  /**
   * @desc 要求显式定义 slots
   * @descEN require slots to be explicitly defined
   * @see https://eslint.vuejs.org/rules/require-explicit-slots.html
   */
  "vue/require-explicit-slots": 2,
  /**
   * @desc 要求使用 expose 显式声明公开属性
   * @descEN require declare public properties using `expose`
   * @see https://eslint.vuejs.org/rules/require-expose.html
   */
  "vue/require-expose": 2,
  /**
   * @desc 要求编译器宏赋值变量使用指定命名
   * @descEN require a certain macro variable name
   * @see https://eslint.vuejs.org/rules/require-macro-variable-name.html
   */
  "vue/require-macro-variable-name": [
    2,
    { defineProps: "props", defineEmits: "emits", defineSlots: "slots", useSlots: "slots", useAttrs: "attrs" },
  ],
  /**
   * @desc 要求组件必须有 name 属性
   * @descEN require a name property in Vue components
   * @see https://eslint.vuejs.org/rules/require-name-property.html
   */
  "vue/require-name-property": 0,
  /**
   * @desc 要求 prop 必须写注释
   * @descEN require props to have a comment
   * @see https://eslint.vuejs.org/rules/require-prop-comment.html
   */
  "vue/require-prop-comment": 0,
  /**
   * @desc 要求对象类型 prop 必须写类型声明
   * @descEN enforce adding type declarations to object props
   * @see https://eslint.vuejs.org/rules/require-typed-object-prop.html
   */
  "vue/require-typed-object-prop": 0,
  /**
   * @desc 要求 ref / shallowRef 必须强类型化
   * @descEN require `ref` and `shallowRef` functions to be strongly typed
   * @see https://eslint.vuejs.org/rules/require-typed-ref.html
   */
  "vue/require-typed-ref": 2,
  /**
   * @desc 限制只能使用指定组件名
   * @descEN enforce using only specific component names
   * @see https://eslint.vuejs.org/rules/restricted-component-names.html
   */
  "vue/restricted-component-names": 0,
  /**
   * @desc 要求 <script> 中统一缩进
   * @descEN enforce consistent indentation in `<script>`
   * @see https://eslint.vuejs.org/rules/script-indent.html
   */
  "vue/script-indent": [
    0,
    preset.indent,
    { baseIndent: 0, switchCase: 1, ignores: [] },
  ],
  /**
   * @desc 要求 slot 名遵循特定大小写风格
   * @descEN enforce specific casing for slot names
   * @see https://eslint.vuejs.org/rules/slot-name-casing.html
   */
  "vue/slot-name-casing": 2,
  /**
   * @desc 要求组件选项按 sort-keys 风格排序
   * @descEN enforce sort-keys in a manner that is compatible with order-in-components
   * @see https://eslint.vuejs.org/rules/sort-keys.html
   */
  "vue/sort-keys": 0,
  /**
   * @desc 要求静态类名按指定顺序排列
   * @descEN enforce static class names order
   * @see https://eslint.vuejs.org/rules/static-class-names-order.html
   */
  "vue/static-class-names-order": 0,
  /**
   * @desc 要求 v-for 使用指定分隔符风格
   * @descEN enforce `v-for` directive's delimiter style
   * @see https://eslint.vuejs.org/rules/v-for-delimiter-style.html
   */
  "vue/v-for-delimiter-style": 0,
  /**
   * @desc 要求条件渲染的重复组件必须有 key
   * @descEN require key attribute for conditionally rendered repeated components
   * @see https://eslint.vuejs.org/rules/v-if-else-key.html
   */
  "vue/v-if-else-key": 0,
  /**
   * @desc 要求 v-on 处理函数遵循指定书写风格
   * @descEN enforce writing style for handlers in `v-on` directives
   * @see https://eslint.vuejs.org/rules/v-on-handler-style.html
   */
  "vue/v-on-handler-style": 0,

  // Extension Rules
  /**
   * @desc 要求模板中数组字面量开闭括号遵循换行规则（上游已弃用，已并入 stylistic/list-style；模板内无替代规则，默认关闭）
   * @descEN Enforce linebreaks after opening and before closing array brackets in `<template>`
   * @see https://eslint.vuejs.org/rules/array-bracket-newline.html
   * @see https://eslint.style/rules/list-style
   */
  "vue/array-bracket-newline": 0,
  /**
   * @desc 要求模板中数组括号内空格一致（上游已弃用，已并入 stylistic/list-style；模板内无替代规则，默认关闭）
   * @descEN Enforce consistent spacing inside array brackets in `<template>`
   * @see https://eslint.vuejs.org/rules/array-bracket-spacing.html
   * @see https://eslint.style/rules/list-style
   */
  "vue/array-bracket-spacing": 0,
  /**
   * @desc 要求模板中数组元素逐个换行（上游已弃用，已并入 stylistic/list-style；模板内无替代规则，默认关闭）
   * @descEN Enforce line breaks after each array element in `<template>`
   * @see https://eslint.vuejs.org/rules/array-element-newline.html
   * @see https://eslint.style/rules/list-style
   */
  "vue/array-element-newline": 0,
  /**
   * @desc 要求模板中箭头函数箭头前后空格一致
   * @descEN Enforce consistent spacing before and after the arrow in arrow functions in `<template>`
   * @see https://eslint.vuejs.org/rules/arrow-spacing.html
   */
  "vue/arrow-spacing": 2,
  /**
   * @desc 要求模板中代码块括号内空格一致
   * @descEN Disallow or enforce spaces inside of blocks after opening block and before closing block in `<template>`
   * @see https://eslint.vuejs.org/rules/block-spacing.html
   */
  "vue/block-spacing": 2,
  /**
   * @desc 要求模板中代码块大括号风格一致
   * @descEN Enforce consistent brace style for blocks in `<template>`
   * @see https://eslint.vuejs.org/rules/brace-style.html
   */
  "vue/brace-style": 2,
  /**
   * @desc 要求模板中使用驼峰命名
   * @descEN Enforce camelcase naming convention in `<template>`
   * @see https://eslint.vuejs.org/rules/camelcase.html
   */
  "vue/camelcase": 0,
  /**
   * @desc 要求模板中尾逗号风格一致
   * @descEN Require or disallow trailing commas in `<template>`
   * @see https://eslint.vuejs.org/rules/comma-dangle.html
   */
  "vue/comma-dangle": [2, "always-multiline"],
  /**
   * @desc 要求模板中逗号前后空格一致
   * @descEN Enforce consistent spacing before and after commas in `<template>`
   * @see https://eslint.vuejs.org/rules/comma-spacing.html
   */
  "vue/comma-spacing": 2,
  /**
   * @desc 要求模板中逗号位置风格一致
   * @descEN Enforce consistent comma style in `<template>`
   * @see https://eslint.vuejs.org/rules/comma-style.html
   */
  "vue/comma-style": 2,
  /**
   * @desc 要求模板中点号位置一致
   * @descEN Enforce consistent newlines before and after dots in `<template>`
   * @see https://eslint.vuejs.org/rules/dot-location.html
   */
  "vue/dot-location": 0,
  /**
   * @desc 要求模板中尽可能使用点号访问属性
   * @descEN Enforce dot notation whenever possible in `<template>`
   * @see https://eslint.vuejs.org/rules/dot-notation.html
   */
  "vue/dot-notation": 0,
  /**
   * @desc 要求模板中使用 === / !==
   * @descEN Require the use of `===` and `!==` in `<template>`
   * @see https://eslint.vuejs.org/rules/eqeqeq.html
   */
  "vue/eqeqeq": 2,
  /**
   * @desc 要求模板中函数名与调用括号之间无空格
   * @descEN Require or disallow spacing between function identifiers and their invocations in `<template>`
   * @see https://eslint.vuejs.org/rules/func-call-spacing.html
   */
  "vue/func-call-spacing": 2,
  /**
   * @desc 要求模板中对象键值对空格一致
   * @descEN Enforce consistent spacing between keys and values in object literal properties in `<template>`
   * @see https://eslint.vuejs.org/rules/key-spacing.html
   */
  "vue/key-spacing": 2,
  /**
   * @desc 要求模板中关键字前后空格一致
   * @descEN Enforce consistent spacing before and after keywords in `<template>`
   * @see https://eslint.vuejs.org/rules/keyword-spacing.html
   */
  "vue/keyword-spacing": 2,
  /**
   * @desc 限制 .vue 文件中单行最大长度
   * @descEN enforce a maximum line length in `.vue` files
   * @see https://eslint.vuejs.org/rules/max-len.html
   */
  "vue/max-len": 0,
  /**
   * @desc 要求模板中三元表达式换行风格一致
   * @descEN Enforce newlines between operands of ternary expressions in `<template>`
   * @see https://eslint.vuejs.org/rules/multiline-ternary.html
   */
  "vue/multiline-ternary": [2, "always-multiline"],
  /**
   * @desc 禁止在模板中使用 console
   * @descEN Disallow the use of `console` in `<template>`
   * @see https://eslint.vuejs.org/rules/no-console.html
   */
  "vue/no-console": 0,
  /**
   * @desc 禁止模板中出现常量条件表达式
   * @descEN Disallow constant expressions in conditions in `<template>`
   * @see https://eslint.vuejs.org/rules/no-constant-condition.html
   */
  "vue/no-constant-condition": 2,
  /**
   * @desc 禁止模板中的空解构模式
   * @descEN Disallow empty destructuring patterns in `<template>`
   * @see https://eslint.vuejs.org/rules/no-empty-pattern.html
   */
  "vue/no-empty-pattern": 2,
  /**
   * @desc 禁止模板中多余的括号
   * @descEN Disallow unnecessary parentheses in `<template>`
   * @see https://eslint.vuejs.org/rules/no-extra-parens.html
   */
  "vue/no-extra-parens": 0,
  /**
   * @desc 禁止模板中使用隐式类型转换简写
   * @descEN Disallow shorthand type conversions in `<template>`
   * @see https://eslint.vuejs.org/rules/no-implicit-coercion.html
   */
  "vue/no-implicit-coercion": [
    2,
    {
      allow: ["!!"],
    },
  ],
  /**
   * @desc 禁止 .vue 文件中的不规则空白
   * @descEN disallow irregular whitespace in `.vue` files
   * @see https://eslint.vuejs.org/rules/no-irregular-whitespace.html
   */
  "vue/no-irregular-whitespace": 2,
  /**
   * @desc 禁止模板中出现丢失精度的数字字面量
   * @descEN Disallow literal numbers that lose precision in `<template>`
   * @see https://eslint.vuejs.org/rules/no-loss-of-precision.html
   */
  "vue/no-loss-of-precision": 2,
  /**
   * @desc 禁止模板中的取反条件
   * @descEN Disallow negated conditions in `<template>`
   * @see https://eslint.vuejs.org/rules/no-negated-condition.html
   */
  "vue/no-negated-condition": 0,
  /**
   * @desc 禁止模板中出现指定语法
   * @descEN Disallow specified syntax in `<template>`
   * @see https://eslint.vuejs.org/rules/no-restricted-syntax.html
   */
  "vue/no-restricted-syntax": 0,
  /**
   * @desc 禁止模板中的稀疏数组
   * @descEN Disallow sparse arrays in `<template>`
   * @see https://eslint.vuejs.org/rules/no-sparse-arrays.html
   */
  "vue/no-sparse-arrays": 2,
  /**
   * @desc 禁止模板中不必要的字符串拼接
   * @descEN Disallow unnecessary concatenation of literals or template literals in `<template>`
   * @see https://eslint.vuejs.org/rules/no-useless-concat.html
   */
  "vue/no-useless-concat": 0,
  /**
   * @desc 要求模板中对象花括号内换行风格一致（上游已弃用，已并入 stylistic/list-style；模板内无替代规则，默认关闭）
   * @descEN Enforce consistent line breaks after opening and before closing braces in `<template>`
   * @see https://eslint.vuejs.org/rules/object-curly-newline.html
   * @see https://eslint.style/rules/list-style
   */
  "vue/object-curly-newline": 0,
  /**
   * @desc 要求模板中对象花括号内空格一致（上游已弃用，已并入 stylistic/list-style；模板内无替代规则，默认关闭）
   * @descEN Enforce consistent spacing inside braces in `<template>`
   * @see https://eslint.vuejs.org/rules/object-curly-spacing.html
   * @see https://eslint.style/rules/list-style
   */
  "vue/object-curly-spacing": 0,
  /**
   * @desc 要求模板中对象属性逐个换行（上游已弃用，已并入 stylistic/list-style；模板内无替代规则，默认关闭）
   * @descEN Enforce placing object properties on separate lines in `<template>`
   * @see https://eslint.vuejs.org/rules/object-property-newline.html
   * @see https://eslint.style/rules/list-style
   */
  "vue/object-property-newline": 0,
  /**
   * @desc 要求模板中使用对象简写语法
   * @descEN Require or disallow method and property shorthand syntax for object literals in `<template>`
   * @see https://eslint.vuejs.org/rules/object-shorthand.html
   */
  "vue/object-shorthand": 0,
  /**
   * @desc 要求模板中运算符换行风格一致
   * @descEN Enforce consistent linebreak style for operators in `<template>`
   * @see https://eslint.vuejs.org/rules/operator-linebreak.html
   */
  "vue/operator-linebreak": [
    2,
    "after",
    {
      overrides: { "?": "ignore", ":": "ignore", "|": "before" },
    },
  ],
  /**
   * @desc 要求模板中使用模板字面量替代字符串拼接
   * @descEN Require template literals instead of string concatenation in `<template>`
   * @see https://eslint.vuejs.org/rules/prefer-template.html
   */
  "vue/prefer-template": 0,
  /**
   * @desc 要求模板中对象属性名加引号风格一致
   * @descEN Require quotes around object literal property names in `<template>`
   * @see https://eslint.vuejs.org/rules/quote-props.html
   */
  "vue/quote-props": [2, "consistent-as-needed"],
  /**
   * @desc 要求模板中小括号内空格一致
   * @descEN Enforce consistent spacing inside parentheses in `<template>`
   * @see https://eslint.vuejs.org/rules/space-in-parens.html
   */
  "vue/space-in-parens": 2,
  /**
   * @desc 要求模板中中缀运算符两侧空格一致
   * @descEN Require spacing around infix operators in `<template>`
   * @see https://eslint.vuejs.org/rules/space-infix-ops.html
   */
  "vue/space-infix-ops": 2,
  /**
   * @desc 要求模板中一元运算符前后空格一致
   * @descEN Enforce consistent spacing before or after unary operators in `<template>`
   * @see https://eslint.vuejs.org/rules/space-unary-ops.html
   */
  "vue/space-unary-ops": 2,
  /**
   * @desc 要求模板字符串花括号内空格一致
   * @descEN Require or disallow spacing around embedded expressions of template strings in `<template>`
   * @see https://eslint.vuejs.org/rules/template-curly-spacing.html
   */
  "vue/template-curly-spacing": 2,
};

export { rules };
export default rules;
