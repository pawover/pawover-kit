<script setup lang="ts">
const plates = [
  {
    name: "types",
    path: "@pawover/kit/types",
    count: 19,
    spec: "个导出类型 · 无运行时代码",
    clean: true,
    color: "#3178C6",
    href: "/api/types",
  },
  {
    name: "utils",
    path: "@pawover/kit/utils",
    count: 144,
    spec: "个静态方法 · 15 个工具类",
    clean: false,
    color: "#F59E0B",
    href: "/api/utils",
  },
  {
    name: "hooks",
    path: "@pawover/kit/hooks/react",
    count: 9,
    spec: "个导出 · React 5 + Alova 4",
    clean: false,
    color: "#06B6D4",
    href: "/api/hooks",
  },
  {
    name: "eslint-rules",
    path: "@pawover/kit/eslint-rules",
    count: 784,
    spec: "条规则 · 9 个规则组",
    clean: true,
    color: "#8B5CF6",
    href: "/api/eslint-rules",
  },
  {
    name: "zod",
    path: "@pawover/kit/zod",
    count: 30,
    spec: "个 Schema · Zod v4",
    clean: false,
    color: "#10B981",
    href: "/api/zod",
  },
];
</script>

<template>
  <div class="pk-home">
    <section class="pk-hero">
      <p class="pk-hero-eyebrow">@pawover/kit — TypeScript 工具箱</p>

      <pre class="pk-hero-code" aria-label="pawover-kit 工具箱类型声明"><code><span class="pk-line"><span class="pk-comment">// pawover-kit：五个包，类型完备</span></span><span class="pk-line"><span class="pk-kw">type</span> <span class="pk-prop">Kit</span> = {</span><span class="pk-line">  <span class="pk-prop">types</span>: <span class="pk-num">19</span>; <span class="pk-comment">// 类型工具，无运行时代码</span></span><span class="pk-line">  <span class="pk-prop">utils</span>: <span class="pk-num">144</span>; <span class="pk-comment">// 静态方法，15 个工具类</span></span><span class="pk-line">  <span class="pk-prop">hooks</span>: <span class="pk-num">9</span>; <span class="pk-comment">// React 与 Alova Hooks</span></span><span class="pk-line">  <span class="pk-prop">eslint</span>: <span class="pk-num">784</span>; <span class="pk-comment">// 规则，9 个规则组</span></span><span class="pk-line">  <span class="pk-prop">zod</span>: <span class="pk-num">30</span>; <span class="pk-comment">// Schema，Zod v4</span></span><span class="pk-line">};<span class="pk-caret" /></span></code></pre>

      <p class="pk-hero-copy">
        五个可独立安装的包：类型工具、静态工具类、React / Alova Hooks、ESLint 规则集与 Zod Schema。
        全部类型完备、开箱即用，ESM / CJS 双格式产物，开发环境直接走源码。
      </p>

      <div class="pk-hero-actions">
        <a class="pk-btn pk-btn-primary" href="/pawover-kit/guide/quick-start">快速开始</a>
        <a class="pk-btn pk-btn-ghost" href="/pawover-kit/api/import-map">API 参考</a>
      </div>
    </section>

    <section class="pk-inventory">
      <p class="pk-section-label">
        KIT INVENTORY <em>— 箱内清单</em>
        <span class="pk-legend"><i class="is-clean" />无额外依赖 <i class="is-peer" />需要 peer 依赖</span>
      </p>
      <div class="pk-plates">
        <a v-for="plate in plates" :key="plate.name" class="pk-plate" :style="{ '--mod': plate.color }" :href="`/pawover-kit${plate.href}`">
          <div class="pk-plate-head">
            <span class="pk-plate-name">{{ plate.name }}</span>
            <span class="pk-plate-dot" :class="plate.clean ? 'is-clean' : 'is-peer'"
              :title="plate.clean ? '无额外依赖' : '需要 peer 依赖'" />
          </div>
          <div class="pk-plate-path">{{ plate.path }}</div>
          <div class="pk-plate-spec">
            <b>{{ plate.count }}</b>
            <span>{{ plate.spec }}</span>
          </div>
        </a>
      </div>
    </section>

    <section class="pk-install">
      <code>pnpm add @pawover/kit</code>
      <a href="/pawover-kit/guide/installation">按需安装单个子包 →</a>
    </section>
  </div>
</template>
