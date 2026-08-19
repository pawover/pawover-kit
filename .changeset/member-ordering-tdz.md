---
"@pawover/kit-eslint-rules": patch
---

fix: 调整 `ts/member-ordering` 预设，消除静态成员排序强制导致的 TDZ 风险

- 静态字段合并为单一分组（不再强制 private 先于 public）：静态字段按声明顺序初始化，私有静态字段引用后声明的公有静态字段（如派生查找表引用常量枚举）会在类初始化阶段抛 `ReferenceError`
- `static-initialization` 移至所有静态字段之后，静态块可安全引用任意静态字段
- 实例字段 / 访问器 / 方法排序保持不变
