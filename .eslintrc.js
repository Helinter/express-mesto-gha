module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb-base',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.js',
        '.cjs',
      ],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
