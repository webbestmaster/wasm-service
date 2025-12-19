import type {Config} from "jest";

export const jestTestUnitConfig: Config = {
    // Use true - stop after first failing test
    bail: false,
    collectCoverage: true,
    errorOnDeprecated: true,
    injectGlobals: false,
    maxConcurrency: 1,
    maxWorkers: 1,
    moduleNameMapper: {
        "^\\S+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    },
    modulePathIgnorePatterns: ["<rootDir>/tsc-check/"],
    passWithNoTests: true,
    preset: "ts-jest",
    rootDir: "../../",
    setupFilesAfterEnv: [],
    silent: true,
    // Use @testing-library/jest-dom
    testEnvironment: "jsdom",
    testTimeout: 10e3,
};

export default jestTestUnitConfig;
