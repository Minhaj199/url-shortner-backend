import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier"

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      ecmaVersion: 2021, 
      sourceType: "module",
      globals: globals.node, 
    },
    rules: {
      "no-console": "warn", 
      "@typescript-eslint/no-unused-vars": ["error"], 
      "semi": ["error", "always"], 
      "quotes": ["error", "double"],
      "@typescript-eslint/no-namespace": ["error", { "allowDeclarations": true }] 
    },
  },
  pluginJs.configs.recommended, 
  ...tseslint.configs.recommended,
  prettier 
];
