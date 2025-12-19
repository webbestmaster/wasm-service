/* global setTimeout */
import type {LocaleNameEnum} from "../provider/locale/locale-context-type";
import {getFormattedNumber, type NumberFormatOptionsType, TimeSizeEnum} from "./format";

export interface TimeItemType {
    count: number;
    unitType: TimeSizeEnum;
}

export interface GetDateTimeDifferenceOptionType {
    formatOption?: NumberFormatOptionsType;
    localeName: LocaleNameEnum;
    milliseconds: number;
    sliceSize: number;
}

export function getDateTimeHumanSize(option: GetDateTimeDifferenceOptionType): string {
    const {milliseconds, sliceSize, localeName, formatOption} = option;

    // 1000 milliseconds
    const secondSize = 1000;
    // 60 seconds
    const minuteSize = 60;
    // 60 minutes
    const hourSize = 60;
    // 24 hours
    const daySize = 24;
    // 30 days
    const monthSize = 30;
    // 12 months
    const yearSize = 12;

    const seconds = milliseconds / secondSize;
    const minutes = seconds / minuteSize;
    const hours = minutes / hourSize;
    const days = hours / daySize;
    const months = days / monthSize;
    const years = months / yearSize;

    const yearPart = Math.floor(years);
    const monthPart = Math.floor(months) % yearSize;
    const dayPart = Math.floor(days) % monthSize;
    const hourPart = Math.floor(hours) % daySize;
    const minutePart = (Math.floor(minutes) % daySize) % hourSize;
    const secondPart = ((Math.floor(seconds) % daySize) % hourSize) % minuteSize;

    return [
        {
            count: yearPart,
            unitType: TimeSizeEnum.year,
        },
        {
            count: monthPart,
            unitType: TimeSizeEnum.month,
        },
        {
            count: dayPart,
            unitType: TimeSizeEnum.day,
        },
        {
            count: hourPart,
            unitType: TimeSizeEnum.hour,
        },
        {
            count: minutePart,
            unitType: TimeSizeEnum.minute,
        },
        {
            count: secondPart,
            unitType: TimeSizeEnum.second,
        },
    ]
        .filter((timeItem: TimeItemType): boolean => {
            return timeItem.count >= 1;
        })
        .slice(0, sliceSize)
        .filter((timeItem: TimeItemType): boolean => {
            return timeItem.count >= 1;
        })
        .map((timeItem: TimeItemType): string => {
            const {count, unitType} = timeItem;

            return getFormattedNumber(localeName, count, {
                style: "unit",
                unit: unitType,
                unitDisplay: "long",
                ...formatOption,
            });
        })
        .join(" ");
}

export function secondsToHuman(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const restOfSeconds = Math.floor(seconds % 60);

    return `${minutes}:${restOfSeconds}`;
}

export function dateIsoToHumanView(dateIso: string): string {
    return dateIso.replace("T", " ").replace(/\.\S+/u, "");
}

export async function waitForTime(timeInMs: number): Promise<void> {
    return new Promise<void>((resolve: () => void) => {
        setTimeout(resolve, timeInMs);
    });
}

export async function waitForCallback(
    callBack: () => Promise<boolean> | boolean,
    maxCount: number,
    timeOutMs: number
): Promise<boolean> {
    if (maxCount === 0) {
        throw new Error("waitForCallback, timeout");
    }

    const isDone = await callBack();

    if (isDone) {
        return true;
    }

    await waitForTime(timeOutMs);

    return waitForCallback(callBack, maxCount - 1, timeOutMs);
}

interface LogTakenTimeWrapperResultType {
    readonly get: () => () => Promise<undefined>;
}

type LogTakenTimeWrapperType = (
    target: unknown,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
) => LogTakenTimeWrapperResultType;

export function logTakenTime(prefix: string, ContextClassName: string): LogTakenTimeWrapperType {
    return (
        target: unknown,
        memberName: string,
        propertyDescriptor: Readonly<PropertyDescriptor>
    ): LogTakenTimeWrapperResultType => {
        const result: LogTakenTimeWrapperResultType = {
            get() {
                // eslint-disable-next-line consistent-this, @typescript-eslint/no-this-alias
                const context: unknown = this;

                async function wrapperFunction(): Promise<undefined> {
                    const {log, time, timeLog} = console;

                    const fullLabel = `${prefix} [${ContextClassName}] ${memberName}`.trim();

                    log(`${fullLabel}: begin`);
                    time(fullLabel);

                    const name = "value";
                    const mayBeFunction: unknown = propertyDescriptor[name];

                    if (typeof mayBeFunction === "function") {
                        await Reflect.apply(mayBeFunction, context, []);
                    } else {
                        throw new TypeError(`[logTakenTime]: ${memberName} is not a function`);
                    }

                    timeLog(fullLabel, "done");
                }

                Object.defineProperty<unknown>(context, memberName, {
                    configurable: true,
                    value: wrapperFunction,
                    writable: true,
                });

                return wrapperFunction;
            },
        };

        return result;
    };
}
