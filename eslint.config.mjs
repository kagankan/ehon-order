import path from "node:path";
import { fileURLToPath } from "node:url";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import configPrettier from "eslint-config-prettier";
import boundaries from "eslint-plugin-boundaries";
import importPlugin from "eslint-plugin-import";
import globals from "globals";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/** @type {import('eslint').Linter.Config} */
export default [
  {
    ignores: ["!**/*.js"],
  },
  js.configs.recommended,
  ...fixupConfigRules(compat.extends("next/core-web-vitals")),
  {
    plugins: {
      import: fixupPluginRules(importPlugin),
      boundaries,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      "boundaries/elements": [
        { type: "domain", pattern: "src/domain" },
        { type: "infrastructure", pattern: "src/infrastructure" },
        { type: "use-case", pattern: "src/use-case" },
        { type: "app", pattern: "src/app" },
        { type: "di", pattern: "src/di" },
      ],
    },
    rules: {
      "no-console": "warn",
      "import/order": [
        "warn",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "never",
          pathGroups: [
            { pattern: "@/**", group: "parent", position: "before" },
          ],
        },
      ],
      "react/react-in-jsx-scope": "off",
      "@next/next/no-img-element": "off",
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: "infrastructure", allow: [["domain"]] },
            { from: "use-case", allow: [["domain"]] },
            { from: "app", allow: [["domain"], ["use-case"], ["di"]] },
            { from: "di", allow: [["infrastructure"], ["use-case"]] },
          ],
        },
      ],
    },
  },
  ...[
    ...tseslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    // 別途追加したい
    // ...tseslint.configs.stylistic,
    // ...tseslint.configs.stylisticTypeChecked,
  ].map((config) => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
  })),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "module",
      parserOptions: { project: "./tsconfig.json" },
    },
  },
  {
    files: ["*"],
    rules: {
      "import/no-anonymous-default-export": "off",
    },
  },
  configPrettier,
];
