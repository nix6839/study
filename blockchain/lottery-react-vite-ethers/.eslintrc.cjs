/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
};

module.exports = config;
