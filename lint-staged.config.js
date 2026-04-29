/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "**/*.{js,cjs,mjs,ts,cts,mts,jsx,tsx,vue}": ["eslint --fix"],
  "**/*.{html,json}": ["prettier --write"],
};
