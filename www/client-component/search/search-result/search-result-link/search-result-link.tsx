import type {JSX} from "react";
import {Link} from "react-router-dom";

import {getArticleLinkToViewClient} from "../../../article/article-helper";
import type {SearchArticleType} from "../../search-type";
import * as searchResultLinkStyle from "./search-result-link.scss";

interface SearchResultLinkPropsType {
    readonly searchArticle: SearchArticleType;
    readonly searchString: string;
}

export function SearchResultLink(props: SearchResultLinkPropsType): JSX.Element {
    const {searchArticle, searchString} = props;
    const {slug, title} = searchArticle;

    const [leftText = "", rightText = ""] = title.toLowerCase().split(searchString.toLowerCase());
    const leftMarkIndex = leftText.length;
    const rightMarkIndex = leftText.length + searchString.length;

    return (
        <Link className={searchResultLinkStyle.search_result_link} to={getArticleLinkToViewClient(slug)}>
            {leftText ? <span>{title.slice(0, leftMarkIndex)}</span> : null}
            <span className={searchResultLinkStyle.search_result_link__highlight_text}>
                {title.slice(leftMarkIndex, rightMarkIndex)}
            </span>
            {rightText ? <span>{title.slice(rightMarkIndex, title.length)}</span> : null}
        </Link>
    );
}
