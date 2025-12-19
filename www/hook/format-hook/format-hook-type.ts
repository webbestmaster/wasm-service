import type {DateTimeFormatOptionsType, NumberFormatOptionsType} from "../../util/format";

export interface UseFormatHookType {
    getFormattedDateTime: (date: Date | number, options?: DateTimeFormatOptionsType) => string;
    getFormattedNumber: (value: number, options?: NumberFormatOptionsType) => string;
}
