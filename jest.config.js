/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@config/(.*)": "<rootDir>/src/config/$1",
    "^@data/(.*)": "<rootDir>/src/data/$1",
    "^@domain/(.*)": "<rootDir>/src/domain/$1",
    "^@api/(.*)": "<rootDir>/src/api/$1",
    "^@lib/(.*)": "<rootDir>/src/lib/$1",
    "^@server/(.*)": "<rootDir>/src/server/$1",
  },
  coveragePathIgnorePatterns: [".d.ts", ".js", "<rootDir>/src/config/"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text-summary"],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 40,
      functions: 60,
      lines: 65,
    },
  },
};
