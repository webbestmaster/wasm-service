import type {JSX} from "react";

import {SvgImage} from "../../../../layout/svg-image/svg-image";
import * as shareButtonStyle from "../share-button.scss";
import {shareButtonName} from "../share-button-const";
import {share} from "../share-button-helper";
import type {ShareButtonPropsType} from "../share-button-type";

export function ShareButtonOdnoklassniki(props: Readonly<ShareButtonPropsType>): JSX.Element {
    const {url, title} = props;

    function handleClick(): undefined {
        share(`https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodeURIComponent(url)}`, title);
    }

    return (
        <button
            aria-label="odnoklassniki"
            className={shareButtonStyle.share_button__odnoklassniki}
            onClick={handleClick}
            type="button"
        >
            <SvgImage className={shareButtonStyle.share_button__image} imageId={`#${shareButtonName.odnoklassniki}`} />
        </button>
    );
}
