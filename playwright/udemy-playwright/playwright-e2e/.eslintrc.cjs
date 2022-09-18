/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ['plugin:playwright/playwright-test'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    es2022: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
};

module.exports = config;
