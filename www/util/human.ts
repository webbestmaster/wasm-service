const textToLatinMap: Record<string, string> = {
    /**
     * Транслитерация ГОСТ 7.79-2000*
     * https://transliteration.ru/gost-7-79-2000/
     */
    /* eslint-disable id-length, sort-keys */
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "j",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "cz",
    ч: "ch",
    ш: "sh",
    щ: "shh",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
    // Additional
    å: "a",
    ä: "a",
    ö: "o",
    /* eslint-enable id-length, sort-keys */
};

const wordSeparator = "-";

function charToLatin(char: string): string {
    return char in textToLatinMap ? textToLatinMap[char] : char;
}

function textToLatin(text: string): string {
    // eslint-disable-next-line @typescript-eslint/no-misused-spread
    return [...text].map(charToLatin).join("");
}

export function humanNormalizeString(text: string): string {
    return text.trim().replace(/\s+/giu, " ");
}

export function stringToArrayByComma(texts: Array<string> | string): Array<string> {
    if (Array.isArray(texts)) {
        return texts;
    }

    return texts.split(",").map(humanNormalizeString).filter(Boolean);
}

export function arrayToStringByComma(texts: Array<string> | string): string {
    if (Array.isArray(texts)) {
        return texts.map(humanNormalizeString).filter(Boolean).join(", ");
    }

    return texts;
}

export function textToSlug(test: string): string {
    // eslint-disable-next-line @typescript-eslint/no-misused-spread
    return [...textToLatin(test.trim().toLowerCase().replace(/\s+/giu, wordSeparator))]
        .filter<string>((char: string): char is string => {
            return char === wordSeparator || /[\da-z]/giu.test(char);
        })
        .join("");
}

export function makeTagsPreview(tagList: Array<string> | string): string {
    return stringToArrayByComma(tagList)
        .map((tag: string): string => {
            return `[ ${tag} ]`;
        })
        .join(" ");
}
