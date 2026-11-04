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

#### 注册名（Registration Name）

插件在 flat config `plugins` 字段中的键名，与规则映射的命名空间前缀一一对应（`ts`、`stylistic`、`antfu`、`imports`、`importsSort`、`react`、`react-hooks`、`vue`）。部分注册名与上游包名不同（如 `importsSort` 对应 eslint-plugin-simple-import-sort）。
_Avoid_: 插件别名（口语可用）

#### 规则存在性校验（Rule Existence Check）

测试层的黑盒防线：遍历预设产物每层的 rules，逐条验证带前缀规则存在于全部 setup 层收集的插件、无前缀规则存在于 ESLint 内置规则表。发布前拦截「映射 × 插件版本」漂移。
_Avoid_: 运行时过滤（本包刻意不做的事）

#### 类型信息降级（Type-aware Fallback）

react 组未与 `typescript` 同开时的自动降级：工厂关闭 `@eslint-react` 的全部 type-aware 规则（清单自插件 `disable-type-checked` 配置动态派生），并在 setup 层注册保留 `meta` 的 no-op 插件实现——即使被后置覆盖强制开启也不会报「requires type information」。与 `typescript` 同开时恢复原实现与严重级别。
_Avoid_: 静默过滤（降级是确定的配置行为，不同于掩盖错误的运行时过滤）

#### 行宽对齐（Line Width Alignment）

`antfu/reasonable-newline` 的行宽阈值（`objectLineLength` / `arrayLineLength`）在发布包中默认为常规 `printWidth` 120。`*.type.ts` / `*.test.ts` 的宽版 240 属消费端个性化配置（本仓库在根 `eslint.config.js` 中覆盖，与 `prettier.config.js` 的 overrides 对齐），不随包发布。复杂子项（调用、函数、嵌套对象/数组）拆行比 Prettier 更严格，属于规则既有设计。
_Avoid_: 强制 Prettier 化（本规则只拆行、不合并行）
