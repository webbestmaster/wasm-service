import type {Config} from "jest";

import {jestTestUnitConfig} from "../../test-unit/config/jest.config";

const jestTestEndToEndConfig: Config = {
    ...jestTestUnitConfig,
    testEnvironment: "node",
    testTimeout: 10e3,
};

export default jestTestEndToEndConfig;
