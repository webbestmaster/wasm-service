type RegExpFlagType = "g" | "gi" | "i";

export const safeReplace = /([$()*+./?[\\\]^{|}])/gu;

export function makeSafeRegExpPatter(pattern: string): string {
    return pattern.replace(safeReplace, "\\$1");
}

export function makeSafeRegExp(pattern: string, flag: RegExpFlagType): RegExp {
    return new RegExp(makeSafeRegExpPatter(pattern), flag);
}
