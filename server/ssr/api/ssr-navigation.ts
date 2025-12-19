import {navigationSsrFieldName} from "../../../www/client-component/navigation/navigation-const";
// eslint-disable-next-line max-len
import type {NavigationContextType} from "../../../www/client-component/navigation/navigation-context/navigation-context-type";
import {rootArticleId} from "../../article/article-const";
import type {ArticlePreviewType} from "../../article/article-type";
import {
    articleToArticlePreview,
    getIsActiveArticlePreview,
    getSubDocumentListByParentIdFiltered,
} from "../../article/article-utility";
import {replaceSpecialSymbols} from "./ssr-helper/ssr-symbol";

export async function getNavigationContextData(): Promise<[NavigationContextType, string]> {
    const articleList = await getSubDocumentListByParentIdFiltered(rootArticleId);

    const navigationData: NavigationContextType = {
        itemList: articleList
            .map<ArticlePreviewType>(articleToArticlePreview)
            .filter<ArticlePreviewType>(getIsActiveArticlePreview),
    };

    const navigationDataHtmlString: string = [
        "<script>",
        `window.${navigationSsrFieldName} = '${replaceSpecialSymbols(
            encodeURIComponent(JSON.stringify(navigationData))
        )}'`,
        "</script>",
    ].join("");

    return [navigationData, navigationDataHtmlString];
}
