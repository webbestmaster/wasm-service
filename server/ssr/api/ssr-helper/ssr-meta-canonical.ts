import {getClientArticleLinkWithDomain} from "../../../../www/client-component/article/article-helper";
import type {ArticleType} from "../../../article/article-type";
import type {SsrReplaceDataType} from "./ssr-helper-type";

export function getCanonicalLinkSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {slug} = article;
    const selector = '<link data-ssr="canonical-link" rel="canonical" href=""/>';
    const href = getClientArticleLinkWithDomain(slug);

    return {selector, value: `<link rel="canonical" href="${href}"/>`};
}
