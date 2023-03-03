module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { semi: false }],
  },
}
