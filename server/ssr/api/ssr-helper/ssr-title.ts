import {convertStringForHtml} from "../../../../www/util/string";
import type {ArticleType} from "../../../article/article-type";
import type {SsrReplaceDataType} from "./ssr-helper-type";

export function getTitleSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {tagTitleSeo, title} = article;

    return {
        selector: '<title data-ssr="title"></title>',
        value: `<title>${convertStringForHtml(tagTitleSeo || title)}</title>`,
    };
}
