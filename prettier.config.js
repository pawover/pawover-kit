/** @type {import('prettier').Config} */
export default {
  printWidth: 120,
  singleAttributePerLine: true,
  quoteProps: "consistent",
  overrides: [
    { files: ["*.html"], options: { singleAttributePerLine: false } },
    { files: ["*.json", "*.jsonc"], options: { trailingComma: "none" } },
    { files: ["*.type.ts", "*.test.ts"], options: { printWidth: 240 } },
  ],
};
