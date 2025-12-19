// ignored import {useSystem} from 'react-system-hook';
import {type JSX, useContext, useEffect} from "react";

import {SubDocumentListViewTypeEnum} from "../../../../server/article/article-type";
import {apiUrl} from "../../../../server/const";
import {articleContext} from "../../../client-component/article/article-context/article-context";
import type {ArticleContextType} from "../../../client-component/article/article-context/article-context-type";
import {ArticlePreviewList} from "../../../client-component/article-preview-list/article-preview-list";
import {Page} from "../../../client-component/page/page";
import {PageHeader} from "../../../client-component/page-header/page-header";
import {copyrightName} from "../../../const";
import {Markdown} from "../../../layout/markdown/markdown";
import {FetchMethodEnum, fetchX} from "../../../util/fetch";
import type {UnknownObjectType} from "../../../util/type";

export function ClientHome(): JSX.Element {
    const {article, childList} = useContext<ArticleContextType>(articleContext);
    const {content, title} = article;

    useEffect(() => {
        (async (): Promise<void> => {
            const resultQueries: Record<string, string> = {
                pagination: JSON.stringify({
                    pageIndex: 0,
                    pageSize: 100,
                    sort: {title: 1},
                }),
                query: JSON.stringify({
                    // Title: /article \d of 2/giu.toString(),
                }),
                source: `{
  articlePagination {
    list {
      articleType
      title
      isActive
      id
      slug
      fileList {
        name
        size
        duration
      }
    }
    sort {
      title
    }
    pageIndex,
    pageSize,
    totalItemCount,
    totalPageCount,
  }
}`,
            };

            const queriesAsString: string = new URLSearchParams(resultQueries).toString();

            const data = await fetchX<UnknownObjectType>(
                `${apiUrl.adminArticlePaginationGraphQlGet}?${queriesAsString}`,
                {
                    required: [],
                    type: "object",
                },
                {
                    credentials: "include",
                    method: FetchMethodEnum.get,
                }
            );
            console.log(data);
        })();
    }, []);

    useEffect(() => {
        (async (): Promise<void> => {
            const resultQueries: Record<string, string> = {
                pagination: JSON.stringify({
                    pageIndex: 0,
                    pageSize: 100,
                    sort: {title: 1},
                }),
                query: JSON.stringify({
                    // Title: /article \d of 2/giu.toString(),
                }),
                source: `{
  articlePagination {
    list {
      articleType
      title
      id
      slug
      isActive
      fileList {
        name
        size
        duration
      }
    }
    sort {
      title
    }
    pageIndex,
    pageSize,
    totalItemCount,
    totalPageCount,
  }
}`,
            };

            const queriesAsString: string = new URLSearchParams(resultQueries).toString();

            const data = await fetchX<UnknownObjectType>(
                `${apiUrl.clientArticlePaginationGraphQlGet}?${queriesAsString}`,
                {
                    type: "object",
                    /*
                     * Properties: {
                     *     data: {
                     *         type: "object",
                     *         properties: {
                     *             articlePagination: {
                     *                 additionalProperties: true,
                     *                 properties: {
                     *                     pageIndex: {type: "number"},
                     *                     pageSize: {type: "number"},
                     *                     totalItemCount: {type: "number"},
                     *                     totalPageCount: {type: "number"},
                     *                 },
                     *                 required: ["pageIndex", "pageSize", "totalItemCount", "totalPageCount"],
                     *                 type: "object",
                     *             },
                     *         },
                     *     },
                     * },
                     * required: ["data"],
                     */
                },
                {
                    credentials: "include",
                    method: FetchMethodEnum.get,
                }
            );
            console.log(data);
        })();
    }, []);

    return (
        <Page>
            <PageHeader>{copyrightName}</PageHeader>
            <ArticlePreviewList childList={childList} previewStyle={SubDocumentListViewTypeEnum.headerImage} />
            <Markdown articleTitle={title} mdInput={content} />
        </Page>
    );
}
