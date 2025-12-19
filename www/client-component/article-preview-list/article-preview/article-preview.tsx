import type {JSX} from "react";
import {Link} from "react-router-dom";

import {type ArticlePreviewType, SubDocumentListViewTypeEnum} from "../../../../server/article/article-type";
import {getPathToImage} from "../../../util/path";
import {getArticleLinkToViewClient} from "../../article/article-helper";
import * as articlePreviewListStyle from "./article-preview.scss";

interface ArticlePreviewPropsType {
    readonly articlePreview: ArticlePreviewType;
    readonly previewStyle: SubDocumentListViewTypeEnum;
}

export function ArticlePreview(props: ArticlePreviewPropsType): JSX.Element {
    const {articlePreview, previewStyle} = props;
    const {slug, title, titleImage} = articlePreview;

    if (previewStyle === SubDocumentListViewTypeEnum.headerImage) {
        return (
            <Link
                className={articlePreviewListStyle.article_preview__header_image}
                to={getArticleLinkToViewClient(slug)}
            >
                <img
                    alt={titleImage.title}
                    className={articlePreviewListStyle.article_preview__header_image__back_image}
                    src={getPathToImage(titleImage.name, {height: "-", width: 300})}
                />
                <img
                    alt={titleImage.title}
                    className={articlePreviewListStyle.article_preview___header_image_image}
                    src={getPathToImage(titleImage.name, {height: "-", width: 300})}
                />
                <p className={articlePreviewListStyle.article_preview__header_image__title}>{title}</p>
            </Link>
        );
    }

    // SubDocumentListViewTypeEnum.header
    return (
        <Link className={articlePreviewListStyle.article_preview__header} to={getArticleLinkToViewClient(slug)}>
            {title}
        </Link>
    );
}
