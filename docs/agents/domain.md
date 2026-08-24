# 领域文档

工程技能在探索代码库时应如何消费本仓库的领域文档。

## 探索前先读这些

- 根目录的 **`CONTEXT-MAP.md`** —— 指向每个上下文的 `CONTEXT.md`。读取与当前主题相关的每一个。
- **`docs/adr/`** —— 读取与你即将工作的区域相关的 ADR。同时检查 `packages/<pkg>/docs/adr/` 中的上下文级决策。

若这些文件不存在，**静默继续**。不要提示缺失，也不要主动建议先创建。`/domain-modeling` 技能（经 `/grill-with-docs` 与 `/improve-codebase-architecture` 触达）会在术语或决策真正落定时惰性创建它们。

## 文件结构

多上下文仓库（根目录存在 `CONTEXT-MAP.md`）：

```text
/
├── CONTEXT-MAP.md                     ← 多上下文索引
├── CONTEXT.md                         ← 跨包/根 上下文（共享领域词汇）
├── docs/adr/                          ← 全局决策
└── packages/
    ├── types/
    │   ├── CONTEXT.md
    │   └── docs/adr/                  ← 上下文级决策
    ├── utils/
    │   ├── CONTEXT.md                 ← 本包上下文（已收录 I18n 词汇）
    │   └── docs/adr/
    └── ...
```

## 使用术语表的词汇

当你的输出命名某个领域概念时（issue 标题、重构提案、假设、测试名），使用对应 `CONTEXT.md` 中定义的说法。不要漂移到术语表明确回避的同义词。

若所需概念尚未出现在术语表中，这是一个信号 —— 要么你在发明项目未使用的语言（重新考虑），要么存在真实缺口（为 `/domain-modeling` 记一笔）。

## 标记 ADR 冲突

若你的输出与既有 ADR 矛盾，显式提出而不是静默覆盖：

> _与 ADR-0007（event-sourced orders）矛盾 —— 但值得重新讨论，因为……_
