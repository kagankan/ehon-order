// @ts-check

module.exports =
  /** @type {import('eslint').Linter.Config} */
  ({
    root: true,
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    ignorePatterns: ["!**/*.js"], // .eslintrc.jsなど、通常除外されるファイルを含めるため
    extends: [
      "next/core-web-vitals",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended",
      "prettier",
    ],
    plugins: ["import", "boundaries"],
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
            {
              from: "infrastructure",
              allow: [["domain"]],
            },
            {
              from: "use-case",
              allow: [["domain"]],
            },
            {
              from: "app",
              allow: [["domain"], ["use-case"], ["di"]],
            },
            {
              from: "di",
              allow: [["infrastructure"], ["use-case"]],
            },
          ],
        },
      ],
    },
    overrides: [
      {
        files: ["**/*.ts", "**/*.tsx"],
        parser: "@typescript-eslint/parser",
        parserOptions: {
          sourceType: "module",
          project: "./tsconfig.json",
        },
      },
    ],
  });
