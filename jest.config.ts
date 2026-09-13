import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
    clearMocks: true,
    testEnvironment: 'node',
    coverageProvider: 'v8',
    coverageDirectory: 'coverage',
    moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
};

export default createJestConfig(config);