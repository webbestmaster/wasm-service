type ClassNamesArgumentValueType = string | null | undefined;

type ClassNamesArgumentType = ClassNamesArgumentValueType | Record<string, ClassNamesArgumentValueType | boolean>;

export function cls(...argumentList: Array<ClassNamesArgumentType>): string {
    const cssClassNameList: Array<string> = [];

    for (const cssClassNameData of argumentList) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!cssClassNameData) {
            // eslint-disable-next-line no-continue
            continue;
        }

        if (typeof cssClassNameData === "string") {
            cssClassNameList.push(cssClassNameData);
            // eslint-disable-next-line no-continue
            continue;
        }

        for (const key in cssClassNameData) {
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (cssClassNameData[key]) {
                cssClassNameList.push(key);
            }
        }
    }

    return cssClassNameList.join(" ");
}
