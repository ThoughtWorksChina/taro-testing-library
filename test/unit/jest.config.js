const path = require("path");

process.env.NODE_ENV = "test";

module.exports = {
  preset: "./jest-preset.js",
  rootDir: path.resolve(__dirname, "../../"),
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
  },
  testRegex: "(.*\\.(test|spec))\\.tsx?$",
  transform: {
    "^.+\\.tsx?$": "babel-jest"
  },
  setupFiles: ["<rootDir>/test/unit/setup"],
  collectCoverage: true,
  coverageReporters: ["html", "text-summary", "lcov"],
  coverageDirectory: "<rootDir>/test/unit/coverage",
  collectCoverageFrom: ["src/**/*.{ts, js}"],
};
