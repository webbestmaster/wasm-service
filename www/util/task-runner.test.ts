import {describe, expect, it} from "@jest/globals";

import {waitForTime} from "../../test-unit/util/test-utility-time";
import {TaskRunner, type TaskRunnerOnTaskDoneArgumentType} from "./task-runner";

const defaultTimeOut = 50;

describe("test TaskRunner", () => {
    it("constructor", () => {
        expect.assertions(1);

        const taskRunner = new TaskRunner({maxWorkerCount: 2});

        expect(taskRunner instanceof TaskRunner).toBe(true);
    });

    it("constructor with wrong parameters", () => {
        expect.assertions(1);
        expect(() => {
            return new TaskRunner({maxWorkerCount: -0.5});
        }).toThrow("[TaskRunner]: maxWorkerCount should be >= 1.");
    });

    it("add task", async () => {
        expect.assertions(1);

        const taskRunner = new TaskRunner({maxWorkerCount: 1});

        let increaseMe = 0;

        await taskRunner.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        expect(increaseMe).toBe(1);
    });

    it("check queue order", async () => {
        expect.assertions(2);

        const taskRunner = new TaskRunner({maxWorkerCount: 1});

        let increaseMe = 0;

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        taskRunner.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        await taskRunner.add(async () => {
            expect(increaseMe).toBe(1);

            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        expect(increaseMe).toBe(2);
    });

    it("add task with known/regular Error", async () => {
        expect.assertions(3);

        const taskRunner = new TaskRunner({maxWorkerCount: 1});

        let increaseMe = 0;
        let isErrorCaught = false;

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        taskRunner.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        try {
            await taskRunner.add(async () => {
                await waitForTime(defaultTimeOut);
                throw new Error("I am the ERROR!");
            });
        } catch (error: unknown) {
            // eslint-disable-next-line jest/no-conditional-in-test, jest/no-conditional-expect
            expect(error instanceof Error ? error.message : "").toBe("I am the ERROR!");

            isErrorCaught = true;
        }

        await taskRunner.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        expect(increaseMe).toBe(2);
        expect(isErrorCaught).toBe(true);
    });

    it("add task with unknown Error", async () => {
        expect.assertions(3);

        const taskRunner = new TaskRunner({maxWorkerCount: 1});

        let increaseMe = 0;

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        taskRunner.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        await expect(async () => {
            await taskRunner.add(async () => {
                await waitForTime(defaultTimeOut);
                throw new Error("I am an ERROR!");
            });
        }).rejects.toThrow("I am an ERROR!");

        await expect(async () => {
            await taskRunner.add(async () => {
                await waitForTime(defaultTimeOut);
                // eslint-disable-next-line @typescript-eslint/only-throw-error
                throw "I am an ERROR!";
            });
        }).rejects.toThrow("[TaskRunner]: Task running with error!");

        await taskRunner.add(async () => {
            await waitForTime(defaultTimeOut);
            increaseMe += 1;
        });

        expect(increaseMe).toBe(2);
    });

    it("add several tasks and with different time of execution, maxWorkerCount: 1", async () => {
        expect.assertions(1);

        const taskRunner = new TaskRunner({maxWorkerCount: 1});

        const listOfTime: Array<number> = [];

        await Promise.all([
            taskRunner.add(async () => {
                await waitForTime(200);
                listOfTime.push(200);
            }),
            taskRunner.add(async () => {
                await waitForTime(100);
                listOfTime.push(100);
            }),
            taskRunner.add(async () => {
                await waitForTime(10);
                listOfTime.push(10);
            }),
        ]);

        expect(listOfTime).toStrictEqual([200, 100, 10]);
    });

    it("add several tasks and with different time of execution, maxWorkerCount: 2", async () => {
        expect.assertions(1);

        const taskRunner = new TaskRunner({maxWorkerCount: 2});

        const listOfTime: Array<number> = [];

        await Promise.all([
            taskRunner.add(async () => {
                await waitForTime(200);
                listOfTime.push(200);
            }),
            taskRunner.add(async () => {
                await waitForTime(100);
                listOfTime.push(100);
            }),
            taskRunner.add(async () => {
                await waitForTime(10);
                listOfTime.push(10);
            }),
        ]);

        expect(listOfTime).toStrictEqual([100, 10, 200]);
    });

    it("add several tasks and with different time of execution, maxWorkerCount: 3", async () => {
        expect.assertions(1);

        const taskRunner = new TaskRunner({maxWorkerCount: 3});

        const listOfTime: Array<number> = [];

        await Promise.all([
            taskRunner.add(async () => {
                await waitForTime(200);
                listOfTime.push(200);
            }),
            taskRunner.add(async () => {
                await waitForTime(100);
                listOfTime.push(100);
            }),
            taskRunner.add(async () => {
                await waitForTime(10);
                listOfTime.push(10);
            }),
        ]);

        expect(listOfTime).toStrictEqual([10, 100, 200]);
    });

    it("onTaskEnd", async () => {
        expect.assertions(2);

        const taskRunnerDataList: Array<TaskRunnerOnTaskDoneArgumentType> = [];

        const taskRunner = new TaskRunner({
            maxWorkerCount: 3,
            onTaskEnd: (data: TaskRunnerOnTaskDoneArgumentType): undefined => {
                taskRunnerDataList.push(data);
            },
        });

        const listOfTime: Array<number> = [];

        await Promise.all([
            taskRunner.add(async () => {
                await waitForTime(200);
                listOfTime.push(200);
            }),
            taskRunner.add(async () => {
                await waitForTime(100);
                listOfTime.push(100);
            }),
            taskRunner.add(async () => {
                await waitForTime(10);
                listOfTime.push(10);
            }),
            taskRunner.add(async () => {
                await waitForTime(300);
                listOfTime.push(300);
            }),
        ]);

        expect(listOfTime).toStrictEqual([10, 100, 200, 300]);
        expect(taskRunnerDataList).toStrictEqual([
            {restTaskCount: 1, taskInProgressCount: 2},
            {restTaskCount: 0, taskInProgressCount: 2},
            {restTaskCount: 0, taskInProgressCount: 1},
            {restTaskCount: 0, taskInProgressCount: 0},
        ]);
    });
});
