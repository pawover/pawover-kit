---
name: code-style-guide
description: strict code style philosophy across the project. Use this skill when the user wants to generate, modify, or review code to ensure it adheres to the project's engineering standards.  Also activates when the user asks about formatting, linting, code style, TypeScript rules, React/Vue conventions, or import management.
---

## 1. 格式哲学

### 核心：统一、可读、轻量约束

以「最小认知负担」为目标，通过固定规则消除团队协作中的格式争议：强制2空格缩进（无tab）、双引号优先、必写分号、多行尾逗号，用运算符前置换行、三元表达式分行、强制顶层函数使用 function 关键字声明等规则提升长代码可读性；让开发者聚焦逻辑而非格式细节。

## 2. JavaScript 哲学

### 核心：现代化、模块化、安全化、函数式倾向

全面拥抱`ES2020`特性：禁用`var`、优先`const`、强制`===`比较、要求箭头函数回调；
通过禁止 `eval`/`with`/`debugger`、限制隐式类型转换规避运行时风险；
强调代码纯净性（禁止修改不可变值、限制块嵌套深度≤5层），同时保留灵活性（如允许!!显式转换）；
如有需要，有先使用 `es-toolkit` 替代 `lodash`。

## 3. TypeScript 哲学

### 核心：模块化、强类型、严谨、工程化导向

以「严格模式」为基础，启用 `verbatimModuleSyntax`、`erasableSyntaxOnly`、`noUncheckedIndexedAccess` 等严格特性；
以「类型即文档」为原则，优先`interface`定义类型、`[]`表示数组、`as`语法断言；
零容忍`any`（自动转为`unknown`，仅剩参数例外）；
对非关键场景（如命名空间、模块边界）保持开放；
如果项目中安装了 `type-fest` ，则优先使用此依赖辅助类型定义，保障大型项目的类型可维护性。

## 4. React 哲学

### 核心：函数式、Hooks优先、无历史遗留特性、安全渲染

完全以函数式组件优先，以Hooks为核心逻辑载体，严格遵循 React 最佳实践（skills: `vercel-react-best-practices`）；
无历史遗留特性，全面拥抱 React v19.2 的新特新，Context简化（`use`替代`useContext`）、`Ref`直传（禁用`forwardRef`）；
强调不可变性（禁止修改`props`/`state`）、渲染安全（禁止`effect`同步`setState`、避免条件渲染泄漏）；
约束 Web API 安全（如`addEventListener`配对清理）。

## 5. Vue 哲学

### 核心：Composition API、单文件组件、模板规范

全面拥抱Vue 3生态，强制`<script setup>`+`Composition API`，每文件仅一个组件；
模板层面禁用Vue 2遗留特性，禁止`v-if`+`v-for`叠加、template冗余key；
通过Props/Emits显式声明类型、HTML属性去连字符（:myProp而非:my-prop）提升模板可读性；
文件块顺序（script→template→style）和组件内部顺序严格遵循官方推荐，保障工程一致性。

## 6. 导入和导出风格

### 核心：有序、纯净、类型隔离

| 规则       | 说明                                                                         |
| ---------- | ---------------------------------------------------------------------------- |
| **位置**   | import 必须在文件顶部；与下方代码间留 1 空行；export 必须在文件底部          |
| **类型**   | 偏好顶级 `import type`（非内联），但同时必须遵守单一导入来源（此时允许内联） |
| **默认**   | 禁止默认导出，必须具名导出                                                   |
| **可变性** | 不允许 `export var/let`（只可 export const 或函数）                          |
