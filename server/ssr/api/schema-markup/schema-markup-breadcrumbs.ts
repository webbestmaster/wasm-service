// Reference - https://developers.google.com/search/docs/data-types/breadcrumb

// Used - JSON-LD (recommended)

import {getClientArticleLinkWithDomain} from "../../../../www/client-component/article/article-helper";
import {convertStringForHtml} from "../../../../www/util/string";
import type {ArticlePreviewType, ArticleType} from "../../../article/article-type";
import type {SsrReplaceDataType} from "../ssr-helper/ssr-helper-type";

interface SchemaBreadcrumbItemType {
    "@type": "ListItem";
    item: string;
    name: string;
    position: number;
}

interface SchemaBreadcrumbItemLastType {
    "@type": "ListItem";
    name: string;
    position: number;
}

// eslint-disable-next-line id-length
export function getSchemaMarkupBreadcrumbsSsrReplaceData(
    article: ArticleType,
    breadcrumbs: Array<ArticlePreviewType>
): SsrReplaceDataType {
    const selector = '<script data-ssr="breadcrumbs" type="application/ld+json"></script>';

    const itemListElement: Array<SchemaBreadcrumbItemType> = breadcrumbs.map<SchemaBreadcrumbItemType>(
        (parentInList: ArticlePreviewType, index: number) => {
            return {
                "@type": "ListItem",
                item: getClientArticleLinkWithDomain(parentInList.slug),
                name: convertStringForHtml(parentInList.title),
                position: index + 1,
            };
        }
    );

    const schemaBreadcrumbItemLast: SchemaBreadcrumbItemLastType = {
        "@type": "ListItem",
        name: article.title,
        position: itemListElement.length + 1,
    };

    const value = `<script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": ${JSON.stringify([...itemListElement, schemaBreadcrumbItemLast])}
            }
        </script>`.replace(/\s+/giu, " ");

    return {selector, value};
}
