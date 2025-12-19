import type {JSX} from "react";

import {SvgImage} from "../../../../layout/svg-image/svg-image";
import * as shareButtonStyle from "../share-button.scss";
import {shareButtonName} from "../share-button-const";
import {share} from "../share-button-helper";
import type {ShareButtonPropsType} from "../share-button-type";

export function ShareButtonVkontakte(props: Readonly<ShareButtonPropsType>): JSX.Element {
    const {url, title} = props;

    function handleClick(): undefined {
        share(`http://vk.com/share.php?url=${encodeURIComponent(url)}`, title);
    }

    return (
        <button
            aria-label="vkontakte"
            className={shareButtonStyle.share_button__vkontakte}
            onClick={handleClick}
            type="button"
        >
            <SvgImage className={shareButtonStyle.share_button__image} imageId={`#${shareButtonName.vkontakte}`} />
        </button>
    );
}
