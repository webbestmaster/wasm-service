import type {JSX, ReactNode} from "react";

import {ShareButtonFacebook} from "../../share-button/button/share-button-facebook";
import {ShareButtonOdnoklassniki} from "../../share-button/button/share-button-odnoklassniki";
import {ShareButtonTelegram} from "../../share-button/button/share-button-telegram";
import {ShareButtonTwitter} from "../../share-button/button/share-button-twitter";
import {ShareButtonViber} from "../../share-button/button/share-button-viber";
import {ShareButtonVkontakte} from "../../share-button/button/share-button-vkontakte";
import {ShareButtonWhatsApp} from "../../share-button/button/share-button-whats-app";
import * as shareButtonListContentStyle from "./share-button-list-content.scss";

interface ShareButtonListContentPropsType {
    readonly listHeader: ReactNode;
    readonly title: string;
    readonly url: string;
}

export function ShareButtonListContent(props: ShareButtonListContentPropsType): JSX.Element {
    const {url, title, listHeader} = props;

    return (
        <div className={shareButtonListContentStyle.share_button_list__wrapper}>
            <p className={shareButtonListContentStyle.share_button_list__title}>{listHeader}</p>

            <div className={shareButtonListContentStyle.share_button_list}>
                <ShareButtonVkontakte title={title} url={url} />

                <ShareButtonFacebook title={title} url={url} />

                <ShareButtonOdnoklassniki title={title} url={url} />

                <ShareButtonTwitter title={title} url={url} />

                <ShareButtonTelegram title={title} url={url} />

                <ShareButtonViber title={title} url={url} />

                <ShareButtonWhatsApp title={title} url={url} />
            </div>
        </div>
    );
}
