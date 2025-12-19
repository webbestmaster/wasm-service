import type {SearchArticleType} from "../search-type";

export function sortSearchArticle(searchArticleA: SearchArticleType, searchArticleB: SearchArticleType): number {
    return searchArticleA.title.localeCompare(searchArticleB.title);
}
