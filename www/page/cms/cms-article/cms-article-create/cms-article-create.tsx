import {message, Typography} from "antd";
import type {JSX} from "react";
import {useNavigate} from "react-router-dom";

import {makeDefaultArticle} from "../../../../../server/article/article-helper";
import type {ArticleType} from "../../../../../server/article/article-type";
import {Spinner} from "../../../../layout/spinner/spinner";
import {postArticleCreate} from "../../../../service/article/article-api";
import {useMakeExecutableState} from "../../../../util/function";
import {getRandomString} from "../../../../util/string";
import {CmsPage} from "../../layout/cms-page/cms-page";
import {CmsArticle} from "../cms-article";
import {CmsArticleModeEnum} from "../cms-article-const";
import {getArticleLinkToEdit} from "../cms-article-helper";

const {Title} = Typography;

export function CmsArticleCreate(): JSX.Element {
    const navigate = useNavigate();

    const {execute: createArticle, isInProgress: isInProgressCreateArticle} = useMakeExecutableState<
        Parameters<typeof postArticleCreate>,
        ArticleType
    >(postArticleCreate);

    async function handleOnFinish(article: ArticleType): Promise<void> {
        try {
            await createArticle(article);
            await navigate(getArticleLinkToEdit(article.id));
            message.success("Article has been created!");
        } catch (requestError: unknown) {
            if (requestError instanceof Error) {
                message.error(`ERROR: ${requestError.message}`);
                return;
            }
            message.error(`ERROR: ${requestError?.toString()}`);
        }
    }

    return (
        <CmsPage key="create">
            <Title level={2}>Create new article</Title>
            <CmsArticle
                article={{
                    ...makeDefaultArticle(),
                    id: getRandomString(),
                }}
                mode={CmsArticleModeEnum.create}
                onFinish={handleOnFinish}
            />
            <Spinner isShow={isInProgressCreateArticle} position="fixed" />
        </CmsPage>
    );
}
