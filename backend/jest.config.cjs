module.exports = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/src/tests/helpers/loadEnv.ts"],
  extensionsToTreatAsEsm: [".ts"],
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