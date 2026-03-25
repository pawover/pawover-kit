/** @type {import('prettier').Config} */
export default {
  printWidth: 120,
  singleAttributePerLine: true,
  quoteProps: "consistent",
  overrides: [
    { files: "*.html", options: { singleAttributePerLine: false } },
    { files: "*.json", options: { objectWrap: "preserve" } },
    { files: "*.type.ts", options: { printWidth: 240 } },
    { files: "*.test.ts", options: { printWidth: 240 } },
  ],
};
