module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "plugin:react/recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: ["react", "prettier"],

  rules: {
    "prettier/prettier": "error",
  },
};
