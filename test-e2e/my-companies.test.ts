/* eslint jest/no-hooks: ["error", { "allow": ["beforeAll", "beforeEach", "afterEach", "afterAll"] }] */

import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import type {Browser, Page} from "puppeteer";

import {defaultPageGoToOption, pageFullUrl} from "./util/const";
import {createBrowser, makeLogin} from "./util/utility";

describe("my companies", () => {
    let page: Page | null = null;

    let browser: Browser | null = null;

    beforeAll(async () => {
        browser = await createBrowser();
    });

    beforeEach(async () => {
        page = (await browser?.newPage()) ?? null;
        await makeLogin(page);
    });

    afterEach(async () => {
        await page?.close();
    });

    afterAll(async () => {
        await browser?.close();
    });

    // eslint-disable-next-line jest/prefer-ending-with-an-expect
    it("main table", async () => {
        expect.assertions(0);

        await page?.goto(pageFullUrl.myCompanies, defaultPageGoToOption);

        // Wait for table's pagination, .ant-pagination-options - item for page selector
        await page?.waitForSelector(".ant-pagination-options", {timeout: 5e3});
    });
});
