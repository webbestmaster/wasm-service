import {createContext, type JSX, type ReactNode, useCallback, useEffect, useMemo, useState} from "react";

import {maxFontSize, minFontSize, saveFontSize} from "./font-size-helper";
import * as themeContextStyle from "./theme-context.scss";
import {defaultThemeContext} from "./theme-context-const";
import type {ThemeContextType, ThemeNameEnum} from "./theme-context-type";

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

const {Provider: ThemeContextProvider} = ThemeContext;

interface ThemeContextPropsType {
    readonly children: ReactNode;
    readonly defaultThemeName: ThemeNameEnum | null;
}

export function ThemeProvider(props: ThemeContextPropsType): JSX.Element {
    const {children, defaultThemeName} = props;

    const [themeName, setThemeName] = useState<ThemeNameEnum>(defaultThemeName ?? defaultThemeContext.themeName);
    const [mdFontSize, setMdFontSize] = useState<number>(defaultThemeContext.mdFontSize);

    const setMdFontSizeMemoized = useCallback((updatedFontSize: number) => {
        if (updatedFontSize > maxFontSize || updatedFontSize < minFontSize) {
            return;
        }
        setMdFontSize(updatedFontSize);
    }, []);

    useEffect(() => {
        saveFontSize(mdFontSize);
    }, [mdFontSize]);

    const providedData: ThemeContextType = useMemo<ThemeContextType>(() => {
        return {mdFontSize, setMdFontSize: setMdFontSizeMemoized, setThemeName, themeName};
    }, [themeName, setMdFontSizeMemoized, mdFontSize]);

    return (
        <ThemeContextProvider value={providedData}>
            <div
                className={themeContextStyle.theme_context}
                data-theme-name={themeName}
                style={{fontSize: `${mdFontSize}px`}}
            >
                {children}
            </div>
        </ThemeContextProvider>
    );
}
