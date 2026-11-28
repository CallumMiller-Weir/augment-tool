module.exports = {
  testEnvironment: "node",
  testMatch: [
    "src/**/*.test.ts?(x)",
  ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!**/node_modules/**",
  ],
};