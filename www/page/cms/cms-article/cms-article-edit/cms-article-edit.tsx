import {message, Typography} from "antd";
import {type JSX, useEffect} from "react";
import {useParams} from "react-router-dom";

import type {ArticleType} from "../../../../../server/article/article-type";
import type {PaginationResultType} from "../../../../../server/data-base/data-base-type";
import {IsRender} from "../../../../layout/is-render/is-render";
import {Spinner} from "../../../../layout/spinner/spinner";
import {getArticleListPagination, postArticleUpdate} from "../../../../service/article/article-api";
import {useMakeExecutableState} from "../../../../util/function";
import {CmsPage} from "../../layout/cms-page/cms-page";
import {CmsArticle} from "../cms-article";
import {CmsArticleModeEnum} from "../cms-article-const";

const {Title} = Typography;

export function CmsArticleEdit(): JSX.Element {
    const {articleId} = useParams<"articleId">();

    const {
        execute: articleById,
        isInProgress: isInProgressArticleById,
        result: articleByIdResult,
    } = useMakeExecutableState<Parameters<typeof getArticleListPagination>, PaginationResultType<ArticleType>>(
        getArticleListPagination
    );

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        articleById(
            {id: articleId ?? ""},
            {
                pageIndex: 0,
                pageSize: 1,
                sort: {title: 1},
            }
        );
    }, [articleById, articleId]);

    const {execute: updateArticle, isInProgress: isInProgressUpdateArticle} = useMakeExecutableState<
        Parameters<typeof postArticleUpdate>,
        ArticleType
    >(postArticleUpdate);

    async function handleOnFinish(article: ArticleType): Promise<void> {
        try {
            await updateArticle(article);
            message.success("Article has been updated!");
        } catch (requestError: unknown) {
            if (requestError instanceof Error) {
                message.error(`ERROR: ${requestError.message}`);
                return;
            }
            message.error(`ERROR: ${requestError?.toString()}`);
        }
    }

    const articleToEdit: ArticleType | null = articleByIdResult?.list[0] ?? null;

    if (articleToEdit === null) {
        return (
            <CmsPage key="no-article">
                <IsRender isRender={isInProgressArticleById}>
                    <Title level={2}>Edit an article: {articleId}</Title>
                    <Spinner isShow={isInProgressArticleById} position="fixed" />
                </IsRender>
                <IsRender isRender={!isInProgressArticleById}>
                    <Title level={2}>Can not found article by id: {articleId}</Title>
                </IsRender>
            </CmsPage>
        );
    }

    return (
        <CmsPage key={articleId}>
            <Title level={2}>
                Edit an article: {articleToEdit.title} - {articleId}
            </Title>
            <CmsArticle article={articleToEdit} mode={CmsArticleModeEnum.edit} onFinish={handleOnFinish} />
            <Spinner isShow={isInProgressUpdateArticle} position="fixed" />
        </CmsPage>
    );
}
