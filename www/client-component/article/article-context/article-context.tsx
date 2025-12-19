/* global ARTICLE_DATA */
import {createContext, type JSX, useEffect, useState} from "react";

import {getArticleContextBySlug} from "../../../service/article/article-api";
import {useMakeExecutableState} from "../../../util/function";
import {isBrowser} from "../../../util/system";
import {defaultArticleContextData} from "./article-context-const";
import {articleContextDom} from "./article-context-dom";
import type {ArticleContextType} from "./article-context-type";

export const articleContext = createContext<ArticleContextType>(defaultArticleContextData);

const {Provider: ArticleContextProvider} = articleContext;

interface ArticleProviderPropsType {
    readonly articleData: ArticleContextType | null;
    readonly children: Array<JSX.Element> | JSX.Element;
}

export function ArticleProvider(props: ArticleProviderPropsType): JSX.Element {
    const {children, articleData: passedArticleData} = props;
    const [articleData, setArticleData] = useState<ArticleContextType>(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        typeof ARTICLE_DATA === "string" ? JSON.parse(decodeURIComponent(ARTICLE_DATA)) : defaultArticleContextData
    );
    const [slug, setSlug] = useState<string>(articleData.article.slug);

    const {execute: fetchArticle, isInProgress: isInProgressArticle} = useMakeExecutableState<
        Parameters<typeof getArticleContextBySlug>,
        ArticleContextType
    >(getArticleContextBySlug);

    useEffect(() => {
        console.log("fetch data about article, slug:", slug);
        if (slug === articleData.article.slug) {
            return;
        }
        fetchArticle(slug).then(setArticleData).catch(console.error);
    }, [slug, fetchArticle, articleData.article.slug]);

    useEffect(() => {
        articleContextDom(articleData);
    }, [articleData]);

    const resultData: ArticleContextType = (isBrowser ? articleData : passedArticleData) ?? defaultArticleContextData;

    return (
        <ArticleContextProvider value={{...resultData, isInProgressArticle, setSlug}}>
            {children}
        </ArticleContextProvider>
    );
}
