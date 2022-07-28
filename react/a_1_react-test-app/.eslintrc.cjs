/** @type {import('eslint').ESLint.ConfigData} */
const config = {
  plugins: ['testing-library', 'jest-dom'],
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
  ],
};

module.exports = config;
