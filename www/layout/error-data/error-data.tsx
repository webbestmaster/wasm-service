import type {JSX} from "react";

import {Locale} from "../../provider/locale/locale-context";
import type {LangKeyType} from "../../provider/locale/translation/type";
import {cls} from "../../util/css";
import * as errorDataStyle from "./error-data.scss";

interface PropsType {
    readonly className?: string;
    readonly langKey: LangKeyType;
}

export function ErrorData(props: PropsType): JSX.Element {
    const {langKey, className: cssClassName} = props;

    return (
        <div className={cls(errorDataStyle.error_data, cssClassName)}>
            <p className={errorDataStyle.error_data__text}>
                <Locale stringKey={langKey} />
            </p>
        </div>
    );
}
