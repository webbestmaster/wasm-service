import type {JSX} from "react";

import {SvgImage} from "../../../../layout/svg-image/svg-image";
import * as shareButtonStyle from "../share-button.scss";
import {shareButtonName} from "../share-button-const";
import {share} from "../share-button-helper";
import type {ShareButtonPropsType} from "../share-button-type";

export function ShareButtonWhatsApp(props: Readonly<ShareButtonPropsType>): JSX.Element {
    const {title} = props;

    function handleClick(): undefined {
        share(`https://wa.me/?text=${encodeURIComponent(title)}`, title);
    }

    return (
        <button
            aria-label="facebook"
            className={shareButtonStyle.share_button__whats_app}
            onClick={handleClick}
            type="button"
        >
            <SvgImage className={shareButtonStyle.share_button__image} imageId={`#${shareButtonName.whatsApp}`} />
        </button>
    );
}
