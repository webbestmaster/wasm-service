import {Typography} from "antd";
import type {DataNode} from "rc-tree/lib/interface";
import {Link} from "react-router-dom";

import {rootArticleId} from "../../../../server/article/article-const";
import {getArticleLinkToViewClient} from "../../../client-component/article/article-helper";
import {getTickCross} from "../../../util/string";
import {getArticleLinkToEdit} from "../cms-article/cms-article-helper";
import type {ArticleForTreeType} from "./cms-article-tree-type";

const {Text: TypographyText} = Typography;

export function getArticleForTreeById(
    articleList: ReadonlyArray<ArticleForTreeType>,
    articleId: string
): ArticleForTreeType | null {
    const foundedArticle: ArticleForTreeType | undefined = articleList.find((article: ArticleForTreeType): boolean => {
        return article.id === articleId;
    });

    return foundedArticle ?? null;
}

function getChildList(
    parentArticleId: string,
    articleList: ReadonlyArray<ArticleForTreeType>,
    deep: number
): Array<DataNode> {
    if (deep === 0) {
        console.error("[ERROR]: populateChildren: limit exceeded");
        return [];
    }

    const article: ArticleForTreeType | null = getArticleForTreeById(articleList, parentArticleId);

    if (!article) {
        return [];
    }

    const {subDocumentIdList} = article;

    return subDocumentIdList.map<DataNode>((articleId: string): DataNode => {
        const childArticle: ArticleForTreeType | null = getArticleForTreeById(articleList, articleId);

        const urlToEdit = getArticleLinkToEdit(articleId);

        if (!childArticle) {
            return {
                key: articleId,
                title: (
                    <Link to={urlToEdit}>
                        <TypographyText type="danger">[ERROR]: can NOT find article by id: {articleId}</TypographyText>
                    </Link>
                ),
            };
        }

        const {title, slug, isActive, articleType} = childArticle;

        const titleNode = (
            <>
                <Link to={getArticleLinkToViewClient(slug)}>{title}</Link>
                {" | "}
                <Link to={urlToEdit}>{slug}</Link>
                {" | "}
                <TypographyText>
                    {articleType} {getTickCross(isActive)}
                </TypographyText>
            </>
        );

        return {
            children: getChildList(articleId, articleList, deep - 1),
            key: articleId,
            title: titleNode,
        };
    });
}

export function makeArticleTree(articleList: ReadonlyArray<ArticleForTreeType>): DataNode {
    return {
        children: getChildList(rootArticleId, articleList, 10),
        key: rootArticleId,
        title: <Link to={getArticleLinkToEdit(rootArticleId)}>{rootArticleId}</Link>,
    };
}

export function getArticleWithoutParentList(articleList: ReadonlyArray<ArticleForTreeType>): Array<ArticleForTreeType> {
    return articleList.filter((articleCandidate: ArticleForTreeType): boolean => {
        return !articleList.some((articleInList: ArticleForTreeType): boolean => {
            return articleInList.subDocumentIdList.includes(articleCandidate.id);
        });
    });
}

export function getArticleWithLostChildList(articleList: ReadonlyArray<ArticleForTreeType>): Array<ArticleForTreeType> {
    return articleList.filter((articleCandidate: ArticleForTreeType): boolean => {
        const {subDocumentIdList} = articleCandidate;

        return subDocumentIdList.some((articleId: string): boolean => {
            return !getArticleForTreeById(articleList, articleId);
        });
    });
}
