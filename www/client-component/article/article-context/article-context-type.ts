import type {ArticlePreviewType, ArticleType} from "../../../../server/article/article-type";

export interface ArticleContextType {
    article: ArticleType;
    breadcrumbs: Array<ArticlePreviewType>;
    childList: Array<ArticlePreviewType>;
    isInProgressArticle: boolean;
    setSlug?: (slug: string) => void;
    siblingList: Array<ArticlePreviewType>;
}
