/* global document */

import type {ArticleContextType} from "./article-context-type";

export function articleContextDom(articleData: ArticleContextType): undefined {
    if (typeof document === "undefined") {
        return;
    }

    const {article} = articleData;
    const {title, tagTitleSeo} = article;

    document.title = tagTitleSeo || title;
}
