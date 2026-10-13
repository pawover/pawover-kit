# @pawover/kit-eslint-rules 上下文

本包的领域词汇表，由 `/domain-modeling` 在术语真正落定时惰性维护。工程技能命名领域概念时应使用本表词汇（见根 `CONTEXT-MAP.md` 与 `docs/agents/domain.md`）。

## 词汇

### 预设与装配

#### 规则映射（Rule Map）

各 `core.*.ts` 中的「规则名 → 严重级别/配置」字典。人工维护的单一数据源：含命名空间前缀的全名为键，值为 ESLint 规则的 severity 或 `[severity, ...options]` 元组。
_Avoid_: 规则集、rules 对象

#### 预设工厂（Preset Factory）

包默认导出 `pawover(options?)`：把规则映射与内嵌插件装配为可直接用于 `eslint.config.js` 的 flat config 数组。`javascript` 组常开，其余组按选项显式开启。
_Avoid_: 配置生成器、defineConfig（那是 ESLint 官方 API）

#### 自包含（Self-contained）

本包的交付形态：全部上游 ESLint 插件作为**精确锁定的 dependencies** 随包安装并由工厂自动注册，用户只需安装本包，拿到的插件组合即本仓库 CI 验证过的唯一组合。
_Avoid_: vendoring（那是把插件源码内联进产物的做法，本包不采用）

#### 注册名（Registration Name）

插件在 flat config `plugins` 字段中的键名，与规则映射的命名空间前缀一一对应（`ts`、`stylistic`、`antfu`、`imports`、`importsSort`、`react`、`react-hooks`、`vue`）。部分注册名与上游包名不同（如 `importsSort` 对应 eslint-plugin-simple-import-sort）。
_Avoid_: 插件别名（口语可用）

#### 规则存在性校验（Rule Existence Check）

测试层的黑盒防线：遍历预设产物每层的 rules 与 plugins，逐条验证带前缀规则存在于本层注册的插件、无前缀规则存在于 ESLint 内置规则表。发布前拦截「映射 × 插件版本」漂移。
_Avoid_: 运行时过滤（本包刻意不做的事）

#### 类型信息降级（Type-aware Fallback）

react 组未与 `typescript` 同开时的自动降级：工厂关闭 `@eslint-react` 的全部 type-aware 规则（清单自插件 `disable-type-checked` 配置动态派生），并把它们注册为保留 `meta` 的 no-op 实现——即使被后置覆盖强制开启也不会报「requires type information」。与 `typescript` 同开时恢复原实现与严重级别。
_Avoid_: 静默过滤（降级是确定的配置行为，不同于掩盖错误的运行时过滤）
