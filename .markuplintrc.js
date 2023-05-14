// @ts-check

module.exports = /** @type {import('@markuplint/ml-config').Config} */ ({
  extends: ["markuplint:recommended-react"],
  parser: {
    "\\.jsx$": "@markuplint/jsx-parser",
    "\\.tsx$": "@markuplint/jsx-parser",
  },
  specs: {
    "\\.jsx$": "@markuplint/react-spec",
    "\\.tsx$": "@markuplint/react-spec",
  },
});
