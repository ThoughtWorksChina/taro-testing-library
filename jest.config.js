module.exports = {
  preset: "./jest-preset.js",
  verbose: true,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  rootDir: __dirname,
  testRegex: "(.*\\.(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.tsx?$": "babel-jest"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFiles: [
    "<rootDir>/test/unit/setup"
  ],
  collectCoverage: true,
  coverageReporters: ["html", "text-summary", "lcov"],
  coverageDirectory: "<rootDir>/test/unit/coverage",
};
