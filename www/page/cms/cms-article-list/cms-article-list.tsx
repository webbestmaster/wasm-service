import {Table, Typography} from "antd";
import type {FilterValue, SorterResult, TableCurrentDataSource, TablePaginationConfig} from "antd/es/table/interface";
import {type JSX, useEffect, useState} from "react";

import type {PaginationQueryType, PaginationResultType} from "../../../../server/data-base/data-base-type";
import {getArticleListPaginationPick} from "../../../service/article/article-api";
import {useMakeExecutableState} from "../../../util/function";
import {makeSafeRegExp} from "../../../util/regexp";
import {CmsPage} from "../layout/cms-page/cms-page";
import {getArticleTableColumnList, keyForTableListList} from "./cms-article-list-const";
import {
    type ArticleForTableListKeysType,
    type ArticleForTableListType,
    SortDirectionEnum,
} from "./cms-article-list-type";

const {Title} = Typography;

export function CmsArticleList(): JSX.Element {
    const defaultPageSize = 10;
    const [searchedColumn, setSearchedColumn] = useState<ArticleForTableListKeysType>("title");
    const [searchText, setSearchText] = useState<string>("");

    // Article for table
    const {
        execute: executeArticleList,
        result: resultArticleList,
        isInProgress: isInProgressArticleList,
    } = useMakeExecutableState<
        Parameters<typeof getArticleListPaginationPick<keyof ArticleForTableListType>>,
        PaginationResultType<ArticleForTableListType>
    >(getArticleListPaginationPick);

    const [paginationArticleList, setPaginationArticleList] = useState<PaginationQueryType<ArticleForTableListType>>({
        pageConfig: {
            pageIndex: 0,
            pageSize: defaultPageSize,
            sort: {title: 1},
        },
        query: {},
    });

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        executeArticleList(paginationArticleList.query, paginationArticleList.pageConfig, keyForTableListList);
    }, [executeArticleList, paginationArticleList]);

    useEffect(() => {
        setPaginationArticleList(
            (
                currentPagination: PaginationQueryType<ArticleForTableListType>
            ): PaginationQueryType<ArticleForTableListType> => {
                const rawDirection = String({...currentPagination.pageConfig.sort}[searchedColumn]);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
                const sortDirection = rawDirection === SortDirectionEnum.descend ? -1 : 1;
                const {pageSize} = currentPagination.pageConfig;

                return {
                    pageConfig: {
                        pageIndex: 0,
                        pageSize,
                        sort: {[searchedColumn]: sortDirection},
                    },
                    query: {[searchedColumn]: makeSafeRegExp(searchText, "i").toString()},
                };
            }
        );
    }, [searchedColumn, searchText]);

    // eslint-disable-next-line max-statements, @typescript-eslint/max-params
    function handleTableChange(
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: Array<SorterResult<ArticleForTableListType>> | SorterResult<ArticleForTableListType>,
        extra: TableCurrentDataSource<ArticleForTableListType>
    ): undefined {
        const firstSorter: SorterResult<ArticleForTableListType> | undefined = Array.isArray(sorter)
            ? sorter.at(0)
            : sorter;

        if (!firstSorter) {
            console.warn("handleTableChange - NO firstSorter");
            return;
        }

        const {column, order, field, columnKey} = firstSorter;
        const sortDirection = order === SortDirectionEnum.descend ? -1 : 1;

        const pageIndex = (pagination.current ?? 1) - 1;
        const pageSize = pagination.pageSize ?? defaultPageSize;

        setPaginationArticleList((): PaginationQueryType<ArticleForTableListType> => {
            return {
                pageConfig: {
                    pageIndex,
                    pageSize,
                    sort: {[String(field)]: sortDirection},
                },
                query: {[searchedColumn]: makeSafeRegExp(searchText, "i").toString()},
            };
        });

        console.log("handleTableChange");
        console.log("pagination:", pagination);
        console.log("filters:", filters);
        console.log("column:", column);
        console.log("sorter:", sorter);
        console.log("order:", order);
        console.log("columnKey:", columnKey);
        console.log("extra:", extra);
        console.log("///");
        console.log(searchedColumn);
        console.log(searchText);
        console.log("///");
    }

    return (
        <CmsPage>
            <Title level={2}>Article list</Title>

            <Table<ArticleForTableListType>
                columns={getArticleTableColumnList({setSearchText, setSearchedColumn})}
                dataSource={resultArticleList?.list ?? []}
                loading={isInProgressArticleList}
                onChange={handleTableChange}
                pagination={{
                    current: paginationArticleList.pageConfig.pageIndex + 1,
                    defaultPageSize,
                    hideOnSinglePage: false,
                    pageSize: paginationArticleList.pageConfig.pageSize,
                    pageSizeOptions: [defaultPageSize, 50, 100, 500, 1000, 2000, 5000],
                    showSizeChanger: true,
                    total: resultArticleList?.totalItemCount ?? 0,
                }}
                rowKey="id"
            />
        </CmsPage>
    );
}
