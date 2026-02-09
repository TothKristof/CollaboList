const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@kinsta/stratus$': '<rootDir>/__mocks__/kinstaStratus.tsx',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
}

// next/jest provides its own transformIgnorePatterns; we override it here so that
// ESM-only deps in node_modules (like @kinsta/stratus) get transformed.
module.exports = async () => {
  const config = await createJestConfig(customJestConfig)()

  config.transformIgnorePatterns = [
    '^.+\\.module\\.(css|sass|scss)$',
    '[/\\\\]node_modules[/\\\\](?!(@kinsta[/\\\\]stratus|geist)[/\\\\])',
  ]

  return config
}

