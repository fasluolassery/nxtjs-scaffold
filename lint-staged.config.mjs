/** @type {import('lint-staged').Config} */
const config = {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md}": ["prettier --write"],
};

export default config;
