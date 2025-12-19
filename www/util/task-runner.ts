export type PromiseResolveType<Result> = (result: Result) => unknown;
export type QueueRunningTaskType = () => Promise<unknown>;

interface QueueTaskType {
    reject: PromiseResolveType<Error>;
    resolve: PromiseResolveType<void>;
    task: QueueRunningTaskType;
}

export interface TaskRunnerOnTaskDoneArgumentType {
    restTaskCount: number;
    taskInProgressCount: number;
}

type TaskRunnerOnTaskDoneType = (taskRunnerData: TaskRunnerOnTaskDoneArgumentType) => void;

export interface TaskRunnerConfigType {
    maxWorkerCount: number;
    onTaskEnd?: TaskRunnerOnTaskDoneType;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(): void {}

export class TaskRunner {
    private readonly taskList: Array<QueueTaskType> = [];
    private readonly maxWorkerCount: number = 1;
    private currentWorkerCount = 0;
    private readonly onTaskEnd: TaskRunnerOnTaskDoneType = noop;

    public constructor(config: TaskRunnerConfigType) {
        const {maxWorkerCount, onTaskEnd} = config;

        if (maxWorkerCount < 1) {
            throw new Error("[TaskRunner]: maxWorkerCount should be >= 1.");
        }

        this.taskList = [];
        this.maxWorkerCount = maxWorkerCount;
        this.currentWorkerCount = 0;
        this.onTaskEnd = onTaskEnd ?? noop;
    }

    public async add(runningTask: QueueRunningTaskType): Promise<void> {
        return new Promise<void>((resolve: PromiseResolveType<void>, reject: PromiseResolveType<Error>): void => {
            this.taskList.push({
                reject,
                resolve,
                task: runningTask,
            });

            if (this.getHasFreeWorkers()) {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                this.run();
            }
        });
    }

    private getCurrentWorkerCount(): number {
        return this.currentWorkerCount;
    }

    private getTaskCount(): number {
        return this.taskList.length;
    }

    private getHasFreeWorkers(): boolean {
        return this.getCurrentWorkerCount() < this.maxWorkerCount;
    }

    private async run(): Promise<undefined> {
        const fistTask = this.taskList.at(0);

        this.taskList.splice(0, 1);

        if (fistTask) {
            this.currentWorkerCount += 1;

            try {
                await fistTask.task();
                fistTask.resolve();
            } catch (error: unknown) {
                if (error instanceof Error) {
                    fistTask.reject(error);
                } else {
                    fistTask.reject(new Error("[TaskRunner]: Task running with error!"));
                }
            }

            this.currentWorkerCount -= 1;

            this.onTaskEnd({
                restTaskCount: this.getTaskCount(),
                taskInProgressCount: this.currentWorkerCount,
            });
        }

        if (this.getTaskCount() > 0) {
            await this.run();
        }
    }
}
