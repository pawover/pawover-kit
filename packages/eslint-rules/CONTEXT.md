# @pawover/kit-eslint-rules 上下文

本包的领域词汇表，由 `/domain-modeling` 在术语真正落定时惰性维护。工程技能命名领域概念时应使用本表词汇（见根 `CONTEXT-MAP.md` 与 `docs/agents/domain.md`）。

## 词汇

### 预设与装配

#### 规则映射（Rule Map）

各 `core.*.ts` 中的「规则名 → 严重级别/配置」字典。人工维护的单一数据源：含命名空间前缀的全名为键，值为 ESLint 规则的 severity 或 `[severity, ...options]` 元组。
_Avoid_: 规则集、rules 对象

#### 预设工厂（Preset Factory）

包默认导出 `pawover(options?, ...userConfigs)`：把规则映射与内嵌插件装配为 `FlatConfigComposer`（继承 Promise，可直接作为 `eslint.config.js` 默认导出，也可链式 `append` / `prepend` / `override` / `renamePlugins`）。`javascript` 组常开，其余组按选项显式开启。
_Avoid_: 配置生成器、defineConfig（那是 ESLint 官方 API）

#### 配置层（Config Layer）

预设产出的单个 flat config 对象，带唯一 `name`（`pawover/<规则组>/<setup|parser|rules|type-aware>`；组名使用 kebab-case，如 `importsSort` → `imports-sort`；全局忽略层为 `pawover/ignores`）。名称用于 composer 的 `override(name, config)` 精确定位。
_Avoid_: 配置块、片段

#### Setup 层（Setup Layer）

每个规则组的插件注册层：只放 `plugins`，不带 `files` / `rules`，因此对所有文件生效，后续配置层（含用户后置配置）可以直接使用该插件规则。
_Avoid_: 插件层、注册层

#### 规则组覆盖（Group Overrides）

每个规则组选项的 `{ overrides }` 字段：规则与预设规则表在**生成阶段**浅合并，自动继承该组的文件范围与插件，避免后置配置层的插件作用域问题。
_Avoid_: 后置覆盖（那是用户自己追加配置层的行为）

#### 类型感知覆盖（Type-aware Overrides）

`typescript.overridesTypeAware` / `react.overridesTypeAware`：只作用于类型感知文件的规则覆盖。文件范围由 `typescript.filesTypeAware` 控制（默认 `GLOB_TYPESCRIPT`）；react 组在此基础上额外并入 `GLOB_JSX`。
_Avoid_: 类型规则覆盖（口语可用）

#### 自包含（Self-contained）

本包的交付形态：全部上游 ESLint 插件作为**精确锁定的 dependencies** 随包安装并由工厂自动注册，用户只需安装本包，拿到的插件组合即本仓库 CI 验证过的唯一组合。
_Avoid_: vendoring（那是把插件源码内联进产物的做法，本包不采用）

#### 共享运行时依赖（Shared Runtime Dependency）

除上游 ESLint 插件外，本包还依赖同仓库的 `@pawover/kit-utils`（`workspace:*`）——装配阶段使用 `ArrayUtil.merge` 对 `parserOptions.extraFileExtensions` 做**保持原顺序的去重合并**（用户项在前，预设必需项如 `.vue` 追加在后），并在 react 类型感知文件范围合并时复用同一工具。该依赖属于内部共享工具，不暴露给消费端；消费端无需感知。
**大小写语义**：`extraFileExtensions` 的去重使用**严格字符串相等**，`.Vue` 与 `.vue` 视为不同项（不做大小写归一）。需要自己去重时请用户自行归一大小写。
_Avoid_: 外部工具库（那是另起炉灶的做法，本包复用既有工具链）

#### 注册名（Registration Name）

插件在 flat config `plugins` 字段中的键名，与规则映射的命名空间前缀一一对应（`ts`、`stylistic`、`antfu`、`imports`、`importsSort`、`react`、`react-hooks`、`vue`）。部分注册名与上游包名不同（如 `importsSort` 对应 eslint-plugin-simple-import-sort）。
_Avoid_: 插件别名（口语可用）

#### 规则存在性校验（Rule Existence Check）

测试层的黑盒防线：遍历预设产物每层的 rules，逐条验证带前缀规则存在于全部 setup 层收集的插件、无前缀规则存在于 ESLint 内置规则表。发布前拦截「映射 × 插件版本」漂移。
_Avoid_: 运行时过滤（本包刻意不做的事）

#### 类型信息降级（Type-aware Fallback）

react 组未与 `typescript` 同开时的自动降级：工厂关闭 `@eslint-react` 的全部 type-aware 规则（清单自插件 `disable-type-checked` 配置动态派生），并在 setup 层注册保留 `meta` 的 no-op 插件实现——即使被后置覆盖强制开启也不会报「requires type information」。与 `typescript` 同开时恢复原实现与严重级别。
_Avoid_: 静默过滤（降级是确定的配置行为，不同于掩盖错误的运行时过滤）

#### Compiler 规则切换（Compiler Rule Switch）

`react` 组启用时默认把 10 条与 `@eslint-react` 重叠的 React Compiler 规则切换为 `eslint-plugin-react-hooks` 官方实现，并关闭 `@eslint-react` 等价规则，避免同一问题重复报告；同时关闭 `react/no-unstable-context-value`（Compiler 会自动记忆化 Context value）。10 条切换规则的严重级别取自官方 `recommended` 预设；官方独有的 `config` / `gating` / `incompatible-library` / `preserve-manual-memoization` 始终由 `react-hooks` 提供，并保持与官方 `recommended` 一致的级别（`incompatible-library` 为 `warn`）。`react.compiler: false` 仅回退这 10 条重叠规则（含 `react-hooks/globals`），`"latest"` 额外启用实验规则 `void-use-memo`。`react.overrides` 最后合并，可逐条覆盖切换结果。映射表显式维护，测试校验两端规则存在、官方新增规则是否漏接以及实际配置的严重级别。
_Avoid_: 同时开启两套规则（会产生重复诊断）

#### 行宽对齐（Line Width Alignment）

`antfu/reasonable-newline` 的行宽阈值（`objectLineLength` / `arrayLineLength`）在发布包中默认为常规 `printWidth` 120。`*.type.ts` / `*.test.ts` 的宽版 240 属消费端个性化配置（本仓库在根 `eslint.config.js` 中覆盖，与 `prettier.config.js` 的 overrides 对齐），不随包发布。复杂子项（调用、函数、嵌套对象/数组）拆行比 Prettier 更严格，属于规则既有设计。
_Avoid_: 强制 Prettier 化（本规则只拆行、不合并行）

#### 风格快捷开关（Style Quick Switches）

`stylistic` / `vue` 规则组的**装配期编译型**选项：用户传入的 `quotes` / `semi` / `naming` / `templateNaming` / `attributeNaming` / `eventNaming` 在工厂阶段被翻译为对应规则覆写，再与 `{ overrides }` 合并后注入规则层。优先级链（最高优先）：`overrides` > 单项（如 `templateNaming`）> 总开关（如 `naming`）> 规则映射默认值。快捷项未传时返回空表，保证装配结果与规则映射默认值完全一致。

**显式不联动清单**：`semi: false` 只改 `stylistic/semi` 与 `stylistic/member-delimiter-style`；`stylistic/semi-spacing`、`semi-style`、`no-extra-semi`、`quote-props`、`vue/html-quotes`（HTML 属性引号恒为 double）保持预设默认。`quotes` 不注入 `allowTemplateLiterals`。

_Avoid_: 风格预设（那是外部包的做法，本包在装配阶段直接编译为规则）

#### 弃用桥接规则关闭（Deprecated Bridge Rule Off）

`vue` 组默认关闭 6 条已被上游弃用、实现合并进 `stylistic/list-style` 的桥接规则（`vue/array-bracket-newline`、`vue/array-bracket-spacing`、`vue/array-element-newline`、`vue/object-curly-newline`、`vue/object-curly-spacing`、`vue/object-property-newline`）。规则映射保留条目、严重级别置为 `0`，以消除消费端 lint `.vue` 时来自 @stylistic 的运行时弃用告警（开箱零告警，不提供开关）。

**损失**：模板插值 `{{ ... }}` 与指令值（如 `:prop="{...}"`）内的数组/对象括号间距、括号换行、元素/属性换行不再检查；`<script>` 块不受影响，仍由 `stylistic` 组覆盖。

**消费端自救**：需要保留这些检查时，用规则组覆盖恢复，例如 `vue: { overrides: { "vue/object-curly-spacing": [2, "always"] } }`；或改用 Prettier 格式化 `.vue`。恢复后 @stylistic 的运行时弃用告警会重新出现。

_Avoid_: 运行时过滤（本包在映射层定值，不做告警屏蔽）
