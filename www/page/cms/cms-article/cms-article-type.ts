import type {ArticleType} from "../../../../server/article/article-type";
import type {CmsArticleModeEnum} from "./cms-article-const";

export type ArticleForValidationKeysType = "id" | "slug" | "subDocumentIdList" | "title";
export type ArticleForValidationType = Pick<ArticleType, ArticleForValidationKeysType>;
export type KeyForValidationListType = ["id", "slug", "subDocumentIdList", "title"];
export interface MakeSlugValidatorArgumentType {
    id: string;
    mode: CmsArticleModeEnum;
    savedArticleList: ReadonlyArray<ArticleForValidationType>;
}
