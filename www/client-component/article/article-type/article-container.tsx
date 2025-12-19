import {type JSX, useContext} from "react";

import {Markdown} from "../../../layout/markdown/markdown";
import {ArticlePreviewList} from "../../article-preview-list/article-preview-list";
import * as articleStyle from "../article.scss";
import {articleContext} from "../article-context/article-context";
import type {ArticleContextType} from "../article-context/article-context-type";

export function ArticleContainer(): JSX.Element {
    const {article, childList} = useContext<ArticleContextType>(articleContext);
    const {content, subDocumentListViewType, title} = article;

    return (
        <>
            <ArticlePreviewList childList={childList} previewStyle={subDocumentListViewType} />
            <Markdown articleTitle={title} className={articleStyle.article_markdown} mdInput={content} />
        </>
    );
}
