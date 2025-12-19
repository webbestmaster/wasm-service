import type {JSX} from "react";

import {SvgImage} from "../../../../layout/svg-image/svg-image";
import * as shareButtonStyle from "../share-button.scss";
import {shareButtonName} from "../share-button-const";
import {share} from "../share-button-helper";
import type {ShareButtonPropsType} from "../share-button-type";

export function ShareButtonFacebook(props: Readonly<ShareButtonPropsType>): JSX.Element {
    const {url, title} = props;

    function handleClick(): undefined {
        share(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, title);
    }

    return (
        <button
            aria-label="facebook"
            className={shareButtonStyle.share_button__facebook}
            onClick={handleClick}
            type="button"
        >
            <SvgImage className={shareButtonStyle.share_button__image} imageId={`#${shareButtonName.facebook}`} />
        </button>
    );
}
