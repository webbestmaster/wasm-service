import {type JSX, useContext} from "react";

import {Markdown} from "../../../layout/markdown/markdown";
import * as articleStyle from "../article.scss";
import {articleContext} from "../article-context/article-context";
import type {ArticleContextType} from "../article-context/article-context-type";

export function ArticleArticle(): JSX.Element {
    const {article} = useContext<ArticleContextType>(articleContext);
    const {content, title} = article;

    return <Markdown articleTitle={title} className={articleStyle.article_markdown} mdInput={content} />;
}
