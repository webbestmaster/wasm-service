import {rootArticleSlug} from "../../../server/article/article-const";
import {appRoute} from "../../component/app/app-route";
import {httpsSiteDomain} from "../../const";
import {generatePath} from "../../util/url";

export function getArticleLinkToViewClient(slug: string): string {
    if (slug.trim() === rootArticleSlug) {
        return "/";
    }

    return generatePath<typeof appRoute.article.path>(appRoute.article.path, {slug});
}

export function getClientArticleLinkWithDomain(slug: string): string {
    return httpsSiteDomain + getArticleLinkToViewClient(slug);
}
