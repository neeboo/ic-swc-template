module.exports = {
  testMatch: [
    '<rootDir>/clients/tests/**/*.test.{ts,tsx,js,jsx}',
    '<rootDir>/clients/tests/*.test.{ts,tsx,js,jsx}',
  ],
  collectCoverage: false,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        sourceMaps: true,
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: false,
          },
        },
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testEnvironment: 'node',
  testTimeout: 120000,
};
