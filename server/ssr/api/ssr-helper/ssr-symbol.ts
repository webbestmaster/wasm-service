export function replaceSpecialSymbols(text: string): string {
    return (
        text
            // Replace "'" - single quote
            .replace(/'/gu, "&#39;")
            // Replace "`" - backtick
            .replace(/`/gu, "&#96;")
    );
}
