import {describe, expect, it} from "@jest/globals";

import {waitForTime} from "../../test-unit/util/test-utility-time";
import {Queue} from "./queue";

const defaultTimeOut = 50;

describe("queue", () => {
    it("constructor", () => {
        expect.assertions(1);

        const queue = new Queue();

        expect(queue instanceof Queue).toBe(true);
    });

    it("add task", async () => {
        expect.assertions(1);

        const queue = new Queue();

        let increaseMe = 0;

        await queue.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        expect(increaseMe).toBe(1);
    });

    it("check queue order", async () => {
        expect.assertions(2);

        const queue = new Queue();

        let increaseMe = 0;

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        queue.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        await queue.add(async () => {
            expect(increaseMe).toBe(1);

            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        expect(increaseMe).toBe(2);
    });

    it("add task with known/regular Error", async () => {
        expect.assertions(3);

        const queue = new Queue();

        let increaseMe = 0;
        let isErrorCaught = false;

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        queue.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        try {
            await queue.add(async () => {
                await waitForTime(defaultTimeOut);
                throw new Error("I am the ERROR!");
            });
        } catch (error: unknown) {
            // eslint-disable-next-line jest/no-conditional-in-test, jest/no-conditional-expect
            expect(error instanceof Error ? error.message : "").toBe("I am the ERROR!");

            isErrorCaught = true;
        }

        await queue.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        expect(increaseMe).toBe(2);
        expect(isErrorCaught).toBe(true);
    });

    it("add task with unknown Error", async () => {
        expect.assertions(3);

        const queue = new Queue();

        let increaseMe = 0;

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        queue.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        await expect(async () => {
            await queue.add(async () => {
                await waitForTime(defaultTimeOut);

                throw new Error("I am an ERROR!");
            });
        }).rejects.toThrow("I am an ERROR!");

        await expect(async () => {
            await queue.add(async () => {
                await waitForTime(defaultTimeOut);
                // eslint-disable-next-line @typescript-eslint/only-throw-error
                throw "I am an ERROR!";
            });
        }).rejects.toThrow("[Queue]: Task running with error!");

        await queue.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        expect(increaseMe).toBe(2);
    });
});
