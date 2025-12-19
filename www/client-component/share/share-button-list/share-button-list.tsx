import {type JSX, useContext} from "react";

import {Locale} from "../../../provider/locale/locale-context";
import {articleContext} from "../../article/article-context/article-context";
import type {ArticleContextType} from "../../article/article-context/article-context-type";
import {getClientArticleLinkWithDomain} from "../../article/article-helper";
import {ShareButtonListContent} from "./share-button-list-content/share-button-list-content";

export function ShareButtonList(): JSX.Element {
    const {article} = useContext<ArticleContextType>(articleContext);

    return (
        <ShareButtonListContent
            listHeader={<Locale stringKey="SHARE__RECOMMEND_TO_FRIENDS__HEADER" />}
            title={article.title}
            url={getClientArticleLinkWithDomain(article.slug)}
        />
    );
}
