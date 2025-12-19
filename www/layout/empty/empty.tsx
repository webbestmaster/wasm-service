import {type JSX, useMemo} from "react";

import {Locale} from "../../provider/locale/locale-context";
import type {LangKeyType} from "../../provider/locale/translation/type";
import {cls} from "../../util/css";
import * as emptyStyle from "./empty.scss";
import emptyImageSrc from "./image/empty.svg";

interface PropsType {
    readonly className?: string;
    readonly mainText?: LangKeyType;
    readonly secondaryText?: LangKeyType;
}

export function Empty(props: PropsType): JSX.Element {
    const {className: cssClassName, mainText, secondaryText} = props;

    const mainTextNode = useMemo((): JSX.Element | null => {
        if (!mainText) {
            return null;
        }

        return (
            <h4 className={emptyStyle.empty__header}>
                <Locale stringKey={mainText} />
            </h4>
        );
    }, [mainText]);

    const secondaryTextNode = useMemo((): JSX.Element | null => {
        if (!secondaryText) {
            return null;
        }

        return (
            <p className={emptyStyle.empty__text}>
                <Locale stringKey={secondaryText} />
            </p>
        );
    }, [secondaryText]);

    return (
        <div className={cls(emptyStyle.empty, cssClassName)}>
            <img alt="" className={emptyStyle.empty__image} src={emptyImageSrc} />

            {mainTextNode}

            {secondaryTextNode}
        </div>
    );
}
