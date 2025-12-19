/* eslint jest/no-hooks: ["error", { "allow": ["beforeAll", "beforeEach", "afterEach", "afterAll"] }] */

import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, it} from "@jest/globals";
import type {Browser, Page} from "puppeteer";

import {defaultPageGoToOption, pageFullUrl} from "./util/const";
import {createBrowser, makeLogin} from "./util/utility";

let browser: Browser | null = null;

describe("reviews", () => {
    let page: Page | null = null;

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
    it("review list", async () => {
        expect.assertions(0);

        await page?.goto(pageFullUrl.reviewsManagementReviews, defaultPageGoToOption);

        // Review should contain at least one review, main ul li svg[fill=currentColor] - rating selector
        await page?.waitForSelector("main ul li svg[fill=currentColor]", {timeout: 5e3});
    });
});
