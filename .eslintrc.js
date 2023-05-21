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
    plugins: ["import"],
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
