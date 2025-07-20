module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  extends: ["eslint:recommended", "plugin:import/recommended", "prettier"],
  plugins: ["import"],
  rules: {
    "import/extensions": ["error", "ignorePackages", { js: "never" }],
    "import/no-unresolved": "off",
    "import/order": ["warn", { "newlines-between": "always" }],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js"],
      },
    },
  },
};
