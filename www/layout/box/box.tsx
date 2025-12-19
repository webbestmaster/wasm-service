import type {CSSProperties, ElementType, JSX, ReactNode} from "react";

import {makeCssArray} from "./box-helper";

interface BoxPropsType {
    readonly backgroundColor?: string;
    readonly boxSizing?: "border-box" | "content-box" | "initial";
    readonly children?: ReactNode;
    readonly display?: "block" | "flex" | "inline";
    readonly height?: number | string;
    readonly margin?: Array<number> | number;
    readonly padding?: Array<number> | number;
    readonly tagName?: ElementType;
    readonly width?: number | string;
}

export function Box(props: BoxPropsType): JSX.Element {
    const {
        tagName: TagName = "div",
        children,
        margin,
        padding,
        width,
        height,
        boxSizing,
        backgroundColor,
        display,
    } = props;

    const [marginTop, marginRight, marginBottom, marginLeft, paddingTop, paddingRight, paddingBottom, paddingLeft] = [
        ...makeCssArray(margin),
        ...makeCssArray(padding),
    ].map((value: number): string => {
        return `${value}px`;
    });

    const style: CSSProperties = {
        backgroundColor,
        boxSizing,
        display,
        height,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        width,
    };

    return <TagName style={style}>{children}</TagName>;
}
