// @ts-nocheck
module.exports = {
  types: [
    ["feat", "🌟", "新增功能", "新的功能或特性"],
    ["fix", "🔨", "问题修复", "问题修复"],
    ["docs", "📚", "文档更新", "仅文档变更"],
    ["style", "🎨", "代码格式", "不影响代码含义的变更（空格、格式化、缺少分号等）"],
    ["refactor", "🧱", "代码重构", "代码重构，无删减功能特性"],
    ["perf", "🚀", "性能优化", "提升性能的代码变更"],
    ["test", "🦾", "测试相关", "新增或修正测试用例"],
    ["build", "📀", "构建系统", "影响构建系统或外部依赖的变更"],
    ["ci", "⌛️", "持续集成", "CI 配置文件及脚本的变更"],
    ["chore", "🍿", "日常事务", "不修改 src 或 test 的其他变更（如构建流程、辅助工具）"],
    ["revert", "🔙", "版本回退", "回退上一次提交"],
  ].map(([value, icon, name, description]) => ({
    value,
    name: icon.padEnd(4) + value.padEnd(10) + name.padEnd(8) + description,
  })),
  scopes: [{ name: "kit-enums" }, { name: "kit-hooks" }, { name: "kit-utils" }, { name: "kit-zod" }],
  messages: {
    type: "请选择本次提交的变更类型：",
    scope: "请输入本次变更的影响范围（可选）：",
    customScope: "请输入本次变更的影响范围：",
    subject: "请输入本次变更的简短描述：",
    body: "请输入本次变更的详细描述，使用 \"|\" 符号进行换行（可选）：",
    breaking: "请列出任何破坏性变更（可选）：\n",
    footer: "请输入本次提交关闭的 Issue，例如：#31, #34（可选）：",
    confirmCommit: "确认提交以上内容？",
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  subjectLimit: 100,
};
