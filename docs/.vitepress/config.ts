import { defineConfig } from "vitepress";

const apiSidebar = [
  { text: "导入路径映射", link: "/api/import-map" },
  { text: "@pawover/kit-types", link: "/api/types" },
  { text: "@pawover/kit-utils", link: "/api/utils" },
  { text: "@pawover/kit-hooks", link: "/api/hooks" },
  { text: "@pawover/kit-eslint-rules", link: "/api/eslint-rules" },
  { text: "@pawover/kit-zod", link: "/api/zod" },
];

export default defineConfig({
  lang: "zh-CN",
  title: "pawover-kit",
  description: "TypeScript 工具箱：类型工具、静态工具类、React / Alova Hooks、ESLint 规则集与 Zod Schema",
  base: "/pawover-kit/",
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ["link", { rel: "icon", href: "/pawover-kit/favicon.svg" }],
    ["meta", { name: "theme-color", content: "#3B82F6" }],
    ["meta", { property: "og:title", content: "pawover-kit" }],
    ["meta", { property: "og:description", content: "TypeScript 工具箱：类型工具、静态工具类、React / Alova Hooks、ESLint 规则集与 Zod Schema" }],
    ["meta", { property: "og:type", content: "website" }],
  ],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: { src: "/logo.svg", width: 28, height: 28 },
    nav: [
      { text: "指南", link: "/guide/introduction" },
      { text: "API 参考", link: "/api/import-map" },
      { text: "实战示例", link: "/examples/tree" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "简介", link: "/guide/introduction" },
            { text: "安装", link: "/guide/installation" },
            { text: "快速开始", link: "/guide/quick-start" },
            { text: "导入路径约定", link: "/guide/import-paths" },
            { text: "常见问题", link: "/guide/faq" },
          ],
        },
        {
          text: "参与维护",
          items: [{ text: "开发与发布", link: "/guide/contributing" }],
        },
      ],
      "/api/": apiSidebar,
      "/examples/": [
        {
          text: "实战示例",
          items: [
            { text: "树操作", link: "/examples/tree" },
            { text: "表单校验", link: "/examples/form-validation" },
            { text: "Alova 请求", link: "/examples/alova-request" },
            { text: "ESLint 配置", link: "/examples/eslint-config" },
            { text: "响应式与标题", link: "/examples/responsive" },
          ],
        },
      ],
      "/": [
        {
          text: "指南",
          items: [
            { text: "简介", link: "/guide/introduction" },
            { text: "安装", link: "/guide/installation" },
            { text: "快速开始", link: "/guide/quick-start" },
          ],
        },
      ],
    },
    outline: { level: [2, 3], label: "本页目录" },
    docFooter: { prev: "上一篇", next: "下一篇" },
    lastUpdated: { text: "最后更新于", formatOptions: { dateStyle: "full", timeStyle: "short" } },
    editLink: {
      pattern: "https://github.com/pawover/pawover-kit/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页",
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: { buttonText: "搜索文档", buttonAriaLabel: "搜索文档" },
          modal: {
            noResultsText: "没有找到相关结果",
            resetButtonTitle: "清除查询",
            footer: { selectText: "选择", navigateText: "切换", closeText: "关闭" },
          },
        },
      },
    },
    socialLinks: [{ icon: "github", link: "https://github.com/pawover/pawover-kit" }],
    footer: {
      message: "MIT License",
      copyright: "Copyright © pawover",
    },
  },
});
