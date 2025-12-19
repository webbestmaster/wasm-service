export enum ThemeNameEnum {
    dark = "dark",
    light = "light",
    neon = "neon",
    twilight = "twilight",
}

export interface ThemeContextType {
    mdFontSize: number;
    setMdFontSize: (mdFontSize: number) => void;
    setThemeName: (themeName: ThemeNameEnum) => void;
    themeName: ThemeNameEnum;
}
