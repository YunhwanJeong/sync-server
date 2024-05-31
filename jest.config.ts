import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  setupFiles: ['<rootDir>/tests/setup.ts'],
  collectCoverageFrom: ['<rootDir>/**/*.ts', '!**/node_modules/**'],
  transform: {},
  extensionsToTreatAsEsm: ['.ts'],
  testPathIgnorePatterns: ['./build'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};

export default config;
