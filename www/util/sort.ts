type SupportedType = Record<string, unknown> | string | number | boolean;

const allowedTypeList = ["number", "string", "boolean", "object"];

function getIsSupportType(value: unknown): value is SupportedType {
    // eslint-disable-next-line no-undefined
    if (value === null || value === undefined) {
        return false;
    }

    return allowedTypeList.includes(typeof value);
}

function getDifferentByValue(itemA: SupportedType, itemB: SupportedType, keyList: Array<string>): number {
    if (typeof itemA === "string" && typeof itemB === "string") {
        return itemA.localeCompare(itemB);
    }

    if (typeof itemA === "number" && typeof itemB === "number") {
        return itemA - itemB;
    }

    if (typeof itemA === "boolean" && typeof itemB === "boolean") {
        return Number(itemA) - Number(itemB);
    }

    // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
    const [ignoredFirstKey, ...restOfKeys] = keyList;

    const firstKey = keyList.at(0);

    if (typeof itemA === "object" && typeof itemB === "object") {
        if (typeof firstKey === "string" && firstKey in itemA && firstKey in itemB) {
            const valueA = itemA[firstKey];
            const valueB = itemB[firstKey];

            if (getIsSupportType(valueA) && getIsSupportType(valueB)) {
                return getDifferentByValue(valueA, valueB, restOfKeys);
            }
        }
    }

    return 0;
}

export function sort<ItemType extends SupportedType>(
    list: Array<ItemType>,
    direction: number,
    keyList?: Array<string>
): Array<ItemType> {
    const normalizedDirection: 1 | -1 = direction < 0 ? -1 : 1;

    return list.toSorted((itemA: ItemType, itemB: ItemType): number => {
        return getDifferentByValue(itemA, itemB, keyList ?? []) * normalizedDirection;
    });
}
