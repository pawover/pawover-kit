/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
export default {
  printWidth: 120,
  singleAttributePerLine: true,
  quoteProps: "consistent",
  overrides: [
    { files: "*.html", options: { singleAttributePerLine: false } },
    { files: "*.json", options: { objectWrap: "preserve" } },
    { files: "*.type.ts", options: { printWidth: 240 } },
  ],
};
