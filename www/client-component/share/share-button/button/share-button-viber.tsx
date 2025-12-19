import type {JSX} from "react";

import {SvgImage} from "../../../../layout/svg-image/svg-image";
import * as shareButtonStyle from "../share-button.scss";
import {shareButtonName} from "../share-button-const";
import {share} from "../share-button-helper";
import type {ShareButtonPropsType} from "../share-button-type";

export function ShareButtonViber(props: Readonly<ShareButtonPropsType>): JSX.Element {
    const {url, title} = props;

    function handleClick(): undefined {
        const titleUrl = `${title} ${url}`;

        share(`viber://forward?text=${encodeURIComponent(titleUrl)}`, title);
    }

    return (
        <button
            aria-label="facebook"
            className={shareButtonStyle.share_button__viber}
            onClick={handleClick}
            type="button"
        >
            <SvgImage className={shareButtonStyle.share_button__image} imageId={`#${shareButtonName.viber}`} />
        </button>
    );
}
