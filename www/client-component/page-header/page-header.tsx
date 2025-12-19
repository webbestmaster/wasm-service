import type {JSX, ReactNode} from "react";

import {FontSize} from "../font-size/font-size";
import * as pageHeader from "./page-header.scss";

interface PageHeaderPropsType {
    readonly children: ReactNode;
}

export function PageHeader(props: PageHeaderPropsType): JSX.Element {
    const {children} = props;

    return (
        <div className={pageHeader.page_header__wrapper}>
            <h1 className={pageHeader.page_header}>{children}</h1>
            <FontSize className={pageHeader.page_header__font_size} />
        </div>
    );
}
