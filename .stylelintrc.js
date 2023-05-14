module.exports = {
  extends: [
    "stylelint-config-recess-order",
    // "stylelint-config-recommended-scss",
  ],
  plugins: ["stylelint-use-logical"],
  ignoreFiles: ["**/*.js", "**/*.ts"],
  rules: {
    "declaration-property-unit-disallowed-list": [
      {
        "font-size": ["px"], // remを使用するため
        "line-height": ["px"], // 単位なしの倍数を使用するため
      },
    ],
    "selector-pseudo-element-colon-notation": "double",
    // "scss/selector-no-union-class-name": true,
    "csstools/use-logical": true,
  },
};
