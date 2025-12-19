/* global localStorage */
const fontSizeSavedKey = "md-font-size";
// 16px is default font-size for markdown-pro
const defaultFontSize = 16;

export const maxFontSize = 24;
export const minFontSize = 12;

export function getSavedFontSize(): number {
    if (typeof localStorage === "undefined") {
        return defaultFontSize;
    }

    const rawSavedFontSize: string = localStorage.getItem(fontSizeSavedKey) ?? defaultFontSize.toString(10);
    const savedFontSize: number = Number.parseInt(rawSavedFontSize, 10) || defaultFontSize;

    if (savedFontSize > maxFontSize) {
        return maxFontSize;
    }

    if (savedFontSize < minFontSize) {
        return minFontSize;
    }

    return savedFontSize;
}

export function saveFontSize(fontSizeForSave: number): undefined {
    localStorage.setItem(fontSizeSavedKey, fontSizeForSave.toString(10));
}
