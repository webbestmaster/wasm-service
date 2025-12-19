import {DownOutlined} from "@ant-design/icons";
import {Divider, List, message, Tree, Typography} from "antd";
import type {DataNode} from "rc-tree/lib/interface";
import {type JSX, useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";

import type {PaginationResultType} from "../../../../server/data-base/data-base-type";
import {getArticleLinkToViewClient} from "../../../client-component/article/article-helper";
import {Box} from "../../../layout/box/box";
import {Spinner} from "../../../layout/spinner/spinner";
import {getArticleListPaginationPick} from "../../../service/article/article-api";
import {useMakeExecutableState} from "../../../util/function";
import {getTickCross} from "../../../util/string";
import {getArticleLinkToEdit} from "../cms-article/cms-article-helper";
import {CmsPage} from "../layout/cms-page/cms-page";
import {keyForTreeList} from "./cms-article-tree-const";
import {
    getArticleForTreeById,
    getArticleWithLostChildList,
    getArticleWithoutParentList,
    makeArticleTree,
} from "./cms-article-tree-helper";
import type {ArticleForTreeType} from "./cms-article-tree-type";

const {Title, Text: TypographyText} = Typography;
const {Item: ListItem} = List;

export function CmsArticleTree(): JSX.Element {
    const {execute: executeArticleListPaginationPick, isInProgress: isInProgressArticleListPagination} =
        useMakeExecutableState<
            Parameters<typeof getArticleListPaginationPick<keyof ArticleForTreeType>>,
            PaginationResultType<ArticleForTreeType>
        >(getArticleListPaginationPick);

    const [savedArticleList, setSavedArticleList] = useState<ReadonlyArray<ArticleForTreeType>>([]);

    useEffect(() => {
        executeArticleListPaginationPick({}, {pageIndex: 0, pageSize: 0, sort: {title: 1}}, keyForTreeList)
            .then((data: PaginationResultType<ArticleForTreeType>) => {
                setSavedArticleList(data.list);
            })
            .catch((error: Error) => {
                console.log(error);

                message.error("Can not fetch article list.");
            });
    }, [executeArticleListPaginationPick]);

    const tree: DataNode = makeArticleTree(savedArticleList);
    const articleWithoutParentList = getArticleWithoutParentList(savedArticleList);
    const articleWithLostChildList = getArticleWithLostChildList(savedArticleList);

    const renderArticleWithoutParent = useCallback(
        (articleWithoutParent: ArticleForTreeType, index: number): JSX.Element => {
            const {title, slug, isActive, articleType, id: articleId} = articleWithoutParent;

            return (
                <ListItem>
                    <TypographyText>{index + 1}.&nbsp;</TypographyText>
                    <Link to={getArticleLinkToViewClient(slug)}>{title}</Link>
                    {" | "}
                    <Link to={getArticleLinkToEdit(articleId)}>{slug}</Link>
                    {" | "}
                    <TypographyText>
                        {articleType}&nbsp;{getTickCross(isActive)}
                    </TypographyText>
                </ListItem>
            );
        },
        []
    );

    const renderArticleWithLostChild = useCallback(
        (articleWithLostChild: ArticleForTreeType, index: number): JSX.Element => {
            const {title, slug, isActive, articleType, id: articleId, subDocumentIdList} = articleWithLostChild;

            const lostIdList = subDocumentIdList
                .filter((lostId: string): boolean => {
                    return !getArticleForTreeById(savedArticleList, lostId);
                })
                .join(", ");

            return (
                <ListItem>
                    <TypographyText>{index + 1}.&nbsp;</TypographyText>
                    <Link to={getArticleLinkToViewClient(slug)}>{title}</Link>
                    {" | "}
                    <Link to={getArticleLinkToEdit(articleId)}>{slug}</Link>
                    {" | "}
                    <TypographyText>
                        {articleType} {getTickCross(isActive)}
                    </TypographyText>
                    {" | "}
                    <TypographyText type="danger">Ids:&nbsp;{lostIdList}</TypographyText>
                </ListItem>
            );
        },
        [savedArticleList]
    );

    console.log("%c[WARNING]: Article tree (does not work into <StrictMode/>)", "color: #fff; background-color: #c00;");

    return (
        <CmsPage>
            <Title level={2}>Article tree</Title>

            <Divider orientation="left">
                Articles in a tree, total (include non-parents): {savedArticleList.length}
            </Divider>
            <Tree autoExpandParent defaultExpandAll showLine switcherIcon={<DownOutlined />} treeData={[tree]} />

            <Divider orientation="left">Articles without parent, total: {articleWithoutParentList.length}</Divider>
            <Box backgroundColor="#fff">
                <List<ArticleForTreeType>
                    bordered
                    dataSource={articleWithoutParentList}
                    renderItem={renderArticleWithoutParent}
                />
            </Box>

            <Divider orientation="left">Articles with lost children, total: {articleWithLostChildList.length}</Divider>
            <Box backgroundColor="#fff">
                <List<ArticleForTreeType>
                    bordered
                    dataSource={articleWithLostChildList}
                    renderItem={renderArticleWithLostChild}
                />
            </Box>

            <Spinner isShow={isInProgressArticleListPagination} position="absolute" />
        </CmsPage>
    );
}
