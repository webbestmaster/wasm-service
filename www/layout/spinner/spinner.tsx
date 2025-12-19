import type {JSX} from "react";

import {cls} from "../../util/css";
import * as spinnerStyle from "./spinner.scss";
import {defaultSpinnerSize} from "./spinner-const";
import {SpinnerPositionEnum} from "./spinner-type";

interface PropsType {
    readonly arcColor?: string; // default - $color-border
    readonly circleColor?: string; // default - $light-gray
    readonly className?: string; // default = ''
    readonly isShow?: boolean; // default - true
    readonly lineWidth?: number; // default - 5px
    readonly position?: keyof typeof SpinnerPositionEnum; // default - static
    readonly size?: number; // default - 48px
    readonly wrapperColor?: string; // default - rgba(255, 255, 255, 0.5)
    readonly wrapperHeight?: number | string; // default - 100%
    readonly wrapperPadding?: number | string; // default - 12px
    readonly wrapperWidth?: number | string; // default - 100%
}

export function Spinner(props: PropsType): JSX.Element | null {
    const {
        size = defaultSpinnerSize,
        lineWidth,
        arcColor,
        circleColor,
        isShow,
        wrapperWidth,
        wrapperHeight,
        position = SpinnerPositionEnum.static,
        wrapperColor,
        wrapperPadding,
        className: cssClassName,
    } = props;

    if (isShow === false) {
        return null;
    }

    const spinnerImageStyle = {
        borderColor: circleColor,
        borderTopColor: arcColor,
        borderWidth: lineWidth,
        height: size,
        width: size,
    };

    const spinnerWrapperStyle = {
        backgroundColor: wrapperColor,
        height: wrapperHeight,
        minHeight: size,
        minWidth: size,
        padding: wrapperPadding,
        position,
        width: wrapperWidth,
    };

    return (
        <div aria-busy="true" className={cls(spinnerStyle.spinner_wrapper, cssClassName)} style={spinnerWrapperStyle}>
            <div className={spinnerStyle.spinner_image} style={spinnerImageStyle} />
        </div>
    );
}
