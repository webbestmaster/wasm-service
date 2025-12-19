import type {ComponentType} from "react";

export type UnknownObjectType = Record<string, unknown>;

export interface LazyResultType<ComponentPropsType> {
    default: ComponentType<ComponentPropsType>;
}

export function getStringFromUnknown(data: Record<string, unknown> | null | undefined, requiredKey: string): string {
    if (!data) {
        return "";
    }

    const value: unknown = data[requiredKey];

    if (typeof value === "string") {
        return value;
    }

    return "";
}

export function extractFromUnknown<ExtractType extends Record<string, boolean | number | string | null>>(
    unknownData: Record<string, boolean | number | string | null>,
    resultData: ExtractType
): ExtractType | null {
    const requiredKeyList: Array<string> = Object.keys(resultData);
    const existedKeyList: Array<string> = Object.keys(unknownData);

    const hasAllKeys = requiredKeyList.every((requiredKey: string): boolean => {
        return existedKeyList.includes(requiredKey);
    });

    if (!hasAllKeys) {
        return null;
    }

    const unknownDataEntryList: Array<[string, unknown]> = Object.entries(unknownData);

    const hasAllTypedKeys = unknownDataEntryList.every((partOfUnknownData: [string, unknown]): boolean => {
        const [unknownDataKey, unknownDataValue] = partOfUnknownData;

        if (requiredKeyList.includes(unknownDataKey)) {
            return typeof resultData[unknownDataKey] === typeof unknownDataValue;
        }

        return true;
    });

    if (!hasAllTypedKeys) {
        return null;
    }

    unknownDataEntryList.forEach((partOfUnknownData: [string, unknown]) => {
        const [unknownDataKey, unknownDataValue] = partOfUnknownData;

        if (requiredKeyList.includes(unknownDataKey)) {
            Object.assign<ExtractType, Record<string, unknown>>(resultData, {[unknownDataKey]: unknownDataValue});
        }
    });

    return resultData;
}
