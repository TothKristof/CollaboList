module.exports = {
  maxWorkers: 1,
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/src/tests/helpers/loadEnv.ts"],
  extensionsToTreatAsEsm: [".ts"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/services/**/*.ts",
    "src/utils/**/*.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  verbose: true,
  testPathIgnorePatterns: ["/node_modules/", "/src/generated/"],
  modulePathIgnorePatterns: ["/src/generated/"],
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: {
        esModuleInterop: true,
      },
    },
  },
};