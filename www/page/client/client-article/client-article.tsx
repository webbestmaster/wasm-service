import {type JSX, useContext} from "react";

import {BottomAdsWrapper} from "../../../client-component/ads/bottom-ads-wrapper/bottom-ads-wrapper";
import {TopAdsWrapper} from "../../../client-component/ads/top-ads-wrapper/top-ads-wrapper";
import {Article} from "../../../client-component/article/article";
import {articleContext} from "../../../client-component/article/article-context/article-context";
import type {ArticleContextType} from "../../../client-component/article/article-context/article-context-type";
import {Breadcrumbs} from "../../../client-component/breadcrumbs/breadcrumbs";
import {Page} from "../../../client-component/page/page";
import {PageHeader} from "../../../client-component/page-header/page-header";
import {ShareButtonList} from "../../../client-component/share/share-button-list/share-button-list";
import {Siblings} from "../../../client-component/siblings/siblings";
import {Spinner} from "../../../layout/spinner/spinner";
import {Error404} from "../../service/error-404/error-404";

export function ClientArticle(): JSX.Element {
    const {article, isInProgressArticle} = useContext<ArticleContextType>(articleContext);
    const {title, id} = article;

    if (isInProgressArticle) {
        return (
            <Page>
                <Spinner isShow wrapperColor="transparent" wrapperHeight="50vh" />
            </Page>
        );
    }

    if (id === "") {
        return (
            <Page>
                <Error404 />
            </Page>
        );
    }

    return (
        <Page>
            <Breadcrumbs />
            <PageHeader>{title}</PageHeader>
            <TopAdsWrapper />
            <Article />
            <Siblings />
            <BottomAdsWrapper />
            <ShareButtonList />
        </Page>
    );
}
