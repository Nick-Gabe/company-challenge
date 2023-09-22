module.exports = {
  root: true,
  plugins: [
    "prettier",
    "@typescript-eslint",
    "eslint-plugin-import-helpers",
    "eslint-plugin-unused-imports",
    "react-refresh",
  ],
  extends: [
    "prettier",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    "no-debugger": "warn",
    "no-console": [
      "error",
      {
        allow: ["warn", "error", "debug"],
      },
    ],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    quotes: ["error", "double", { avoidEscape: true }],
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
        singleQuote: false,
      },
    ],
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: ["module", "type", ["parent", "sibling", "index"]],
        alphabetize: { order: "asc", ignoreCase: true },
      },
    ],
  },
};
