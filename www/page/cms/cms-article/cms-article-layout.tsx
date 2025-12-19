import {PlusOutlined} from "@ant-design/icons";
import {Button, Select, Typography} from "antd";
import type {UploadFile} from "antd/es/upload/interface";
import type {JSX} from "react";
import {Link} from "react-router-dom";

import type {ArticleFileType, ArticleType} from "../../../../server/article/article-type";
import {getArticleLinkToViewClient} from "../../../client-component/article/article-helper";
import {getPathToFile, getPathToImage} from "../../../util/path";
import {getArticleLinkToEdit, getIsImage} from "./cms-article-helper";
import type {ArticleForValidationType} from "./cms-article-type";

const {Option} = Select;
const {Text: TypographyText} = Typography;

export function makeFileListItem(fileInfo: ArticleFileType): UploadFile<unknown> {
    const {name: fileInfoName} = fileInfo;

    const url = getIsImage(fileInfoName)
        ? getPathToImage(fileInfoName, {height: 96, width: 96})
        : getPathToFile(fileInfoName);

    return {
        name: fileInfoName,
        status: "done",
        uid: fileInfoName,
        url,
    };
}

export function makeSubDocumentOption(articleForValidation: ArticleForValidationType): JSX.Element {
    const {title, id} = articleForValidation;

    return (
        <Option key={id} title={title} value={id}>
            {title}
        </Option>
    );
}

export function getParentList(
    article: ArticleType,
    savedArticleList: ReadonlyArray<ArticleForValidationType>
): Array<ArticleForValidationType> {
    const {id: articleId} = article;

    return savedArticleList.filter((savedArticle: ArticleForValidationType): boolean => {
        return savedArticle.subDocumentIdList.includes(articleId);
    });
}

export function renderParentList(
    article: ArticleType,
    savedArticleList: ReadonlyArray<ArticleForValidationType>
): Array<JSX.Element> {
    const parentList: Array<JSX.Element> = getParentList(article, savedArticleList).map(
        (savedArticle: ArticleForValidationType, index: number): JSX.Element => {
            const {id, title, slug} = savedArticle;

            return (
                <TypographyText key={id}>
                    {index > 0 ? ", " : null}
                    <Link to={getArticleLinkToViewClient(slug)}>{title}</Link>
                    &nbsp;|&nbsp;
                    <Link to={getArticleLinkToEdit(id)}>{slug}</Link>
                </TypographyText>
            );
        }
    );

    if (parentList.length > 0) {
        return parentList;
    }

    return [<TypographyText key="no-parents">no parents</TypographyText>];
}

export function UploadButton(): JSX.Element {
    return <Button icon={<PlusOutlined />}>Upload</Button>;
}
