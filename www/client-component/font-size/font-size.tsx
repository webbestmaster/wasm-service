import {type JSX, useCallback, useContext} from "react";

import {ThemeContext} from "../../provider/theme/theme-context";
import type {ThemeContextType} from "../../provider/theme/theme-context-type";
import {cls} from "../../util/css";
import * as fontSizeStyle from "./font-size.scss";

interface FontSizePropsType {
    readonly className?: string;
}

export function FontSize(props: FontSizePropsType): JSX.Element {
    const {className: cssClassName} = props;
    const {mdFontSize, setMdFontSize} = useContext<ThemeContextType>(ThemeContext);

    const memoizedSetFontSizePlus = useCallback(() => {
        setMdFontSize(mdFontSize + 1);
    }, [setMdFontSize, mdFontSize]);

    const memoizedSetFontSizeMinus = useCallback(() => {
        setMdFontSize(mdFontSize - 1);
    }, [setMdFontSize, mdFontSize]);

    return (
        <div className={cls(fontSizeStyle.font_size, cssClassName)}>
            <button
                className={fontSizeStyle.font_size__button}
                onClick={memoizedSetFontSizeMinus}
                title={`${mdFontSize - 1}px`}
                type="button"
            >
                A&minus;
            </button>

            <button
                className={fontSizeStyle.font_size__button}
                onClick={memoizedSetFontSizePlus}
                title={`${mdFontSize + 1}px`}
                type="button"
            >
                A+
            </button>
        </div>
    );
}
