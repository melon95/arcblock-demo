const { join } = require('path');

module.exports = {
  root: true,
  extends: '@arcblock/eslint-config-ts',
  parserOptions: {
    project: [join(__dirname, 'tsconfig.eslint.json'), join(__dirname, 'tsconfig.json')],
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extension': 0,
    'import/extensions': 0,
    'import/order': 0,
    'import/export': 0,
    'unicorn/filename-case': 0,
    'import/prefer-default-export': 0,
    'react/state-in-constructor': 0,
    '@typescript-eslint/indent': 0,
    'react/require-default-props': 0,
    'no-restricted-exports': 0,
    '@typescript-eslint/no-shadow': 0,
    'consistent-return': 0,
  },
};
