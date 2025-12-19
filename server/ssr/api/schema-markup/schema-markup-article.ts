// Reference - https://developers.google.com/search/docs/advanced/structured-data/article

// Used - JSON-LD (recommended)

import {getClientArticleLinkWithDomain} from "../../../../www/client-component/article/article-helper";
import {
    companyLogoPngFileName,
    companyLogoPngHeight,
    companyLogoPngWidth,
    copyrightName,
    httpsSiteDomain,
} from "../../../../www/const";
import {getPathToImage} from "../../../../www/util/path";
import {convertStringForHtml} from "../../../../www/util/string";
import type {ArticleType} from "../../../article/article-type";
import {type ArticleImageDataType, getImageListFromArticle} from "../../../sitemap/sitemap-img-xml";
import type {SsrReplaceDataType} from "../ssr-helper/ssr-helper-type";
import {fitTextTo, timeTo0000} from "./schema-markup-helper";

// eslint-disable-next-line id-length
export function getSchemaMarkupArticleSsrReplaceData(article: ArticleType): SsrReplaceDataType {
    const {slug, title, createdDate, updatedDate, staffAuthorList, descriptionShort} = article;
    const selector = '<script data-ssr="article" type="application/ld+json"></script>';

    const articleImageList: Array<string> = getImageListFromArticle(article).imageList.map<string>(
        (imageData: ArticleImageDataType): string => {
            return imageData.src;
        }
    );

    const companyLogo =
        httpsSiteDomain +
        getPathToImage(companyLogoPngFileName, {height: companyLogoPngHeight, width: companyLogoPngWidth});

    const value = `
        <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "Article",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "${getClientArticleLinkWithDomain(slug)}"
                },
                "headline": "${convertStringForHtml(fitTextTo(title, 110))}",
                "image": ${JSON.stringify(articleImageList)},
                "datePublished": "${timeTo0000(createdDate)}",
                "dateModified": "${timeTo0000(updatedDate)}",
                "author": {
                    "@type": "Person",
                    "name": "${convertStringForHtml(staffAuthorList.join(", ")) || "N/A"}",
                    "url": "${httpsSiteDomain}"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "${convertStringForHtml(copyrightName)}",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "${companyLogo}"
                    }
                },
                "description": "${convertStringForHtml(fitTextTo(descriptionShort || title, 300))}"
            }
        </script>`.replace(/\s+/giu, " ");

    return {selector, value};
}
