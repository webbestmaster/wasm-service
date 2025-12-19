import {noop} from "../../util/function";
import {getSavedFontSize} from "./font-size-helper";
import {type ThemeContextType, ThemeNameEnum} from "./theme-context-type";

export const defaultThemeContext: ThemeContextType = {
    mdFontSize: getSavedFontSize(),
    setMdFontSize: noop,
    setThemeName: noop,
    themeName: ThemeNameEnum.light,
};
