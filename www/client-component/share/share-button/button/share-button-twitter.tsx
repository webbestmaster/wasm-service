import type {JSX} from "react";

import {SvgImage} from "../../../../layout/svg-image/svg-image";
import * as shareButtonStyle from "../share-button.scss";
import {shareButtonName} from "../share-button-const";
import {share} from "../share-button-helper";
import type {ShareButtonPropsType} from "../share-button-type";

export function ShareButtonTwitter(props: Readonly<ShareButtonPropsType>): JSX.Element {
    const {url, title} = props;

    function handleClick(): undefined {
        share(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            title
        );
    }

    return (
        <button
            aria-label="twitter"
            className={shareButtonStyle.share_button__twitter}
            onClick={handleClick}
            type="button"
        >
            <SvgImage className={shareButtonStyle.share_button__image} imageId={`#${shareButtonName.twitter}`} />
        </button>
    );
}
