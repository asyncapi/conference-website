const nextJest = require('next/jest')

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        // Handle module aliases
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/pages/(.*)$': '<rootDir>/pages/$1',
        '^@/config/(.*)$': '<rootDir>/config/$1',
        '^@/types/(.*)$': '<rootDir>/types/$1',
        '^@/utils/(.*)$': '<rootDir>/utils/$1',
        '^@/styles/(.*)$': '<rootDir>/styles/$1',
    },
    collectCoverageFrom: [
        'components/**/*.{js,jsx,ts,tsx}',
        'pages/**/*.{js,jsx,ts,tsx}',
        'utils/**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
        '!**/.next/**',
        '!**/coverage/**',
        '!**/jest.config.js',
    ],
    coverageThreshold: {
        global: {
            branches: 2,
            functions: 5,
            lines: 8,
            statements: 8,
        },
    },
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
