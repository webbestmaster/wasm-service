import type {JSX} from "react";

import {cls} from "../../util/css";
import * as spinnerStyle from "./spinner.scss";

interface PropsType {
    readonly className?: string;
    readonly isShow?: boolean;
}

export function AsciiSpinner(props: PropsType): JSX.Element | null {
    const {isShow = true, className: cssClassName} = props;

    if (!isShow) {
        return null;
    }

    const wrapperClassName = cls(spinnerStyle.ascii_spinner, cssClassName);

    return <span aria-busy="true" className={wrapperClassName} />;
}
