import type {JSX} from "react";

import type {ArticlePreviewType, SubDocumentListViewTypeEnum} from "../../../server/article/article-type";
import {ArticlePreview} from "./article-preview/article-preview";
import * as articlePreviewListStyle from "./article-preview-list.scss";

interface ChildListPropsType {
    readonly childList: Array<ArticlePreviewType>;
    readonly previewStyle: SubDocumentListViewTypeEnum;
}

export function ArticlePreviewList(props: ChildListPropsType): JSX.Element {
    const {childList, previewStyle} = props;

    if (childList.length === 0) {
        return <div />;
    }

    return (
        <ul className={articlePreviewListStyle.article_preview_list}>
            {childList.map((articlePreview: ArticlePreviewType): JSX.Element => {
                return (
                    <li className={articlePreviewListStyle.article_preview_list_item} key={articlePreview.slug}>
                        <ArticlePreview articlePreview={articlePreview} previewStyle={previewStyle} />
                    </li>
                );
            })}
        </ul>
    );
}
