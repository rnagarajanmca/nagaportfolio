import type { Config } from "jest";

const config: Config = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "<rootDir>/e2e/"],

  // Coverage configuration
  collectCoverage: process.env.CI ? true : false,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.tsx",
    "!src/**/index.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: [
    "text",
    "html",
    "json",
    "lcov",
    "json-summary",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 73,
      statements: 73,
    },
  },

  // Test reporters
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "Portfolio Unit Test Report",
        outputPath: "test-reports/jest-report.html",
        includeFailureMsg: true,
        includeSuiteFailure: true,
        dateFormat: "yyyy-mm-dd HH:MM:ss",
      },
    ],
    [
      "jest-junit",
      {
        outputDirectory: "test-reports",
        outputName: "junit-jest.xml",
        classNameTemplate: "{classname}",
        titleTemplate: "{title}",
        ancestorSeparator: " › ",
        usePathForSuiteName: true,
      },
    ],
  ],
};

export default config;
