import {type JSX, useContext} from "react";
import {Audio} from "react-audio-player-pro";

import {type ArticleFileType, ArticleFileTypeEnum} from "../../../../server/article/article-type";
import {defaultMediaMetadata} from "../../../layout/audio-player/audio-player-const";
import {Markdown} from "../../../layout/markdown/markdown";
import {getFileMarkdownByFullInfo} from "../../../layout/markdown/markdown-helper";
import {getPathToFile} from "../../../util/path";
import * as articleStyle from "../article.scss";
import {articleContext} from "../article-context/article-context";
import type {ArticleContextType} from "../article-context/article-context-type";

export function ArticleAudioSingle(): JSX.Element {
    const {article} = useContext<ArticleContextType>(articleContext);
    const {content, titleImage, title, fileList, slug} = article;
    const firstAudioFile = fileList.find((fileInfo: ArticleFileType): boolean => {
        return fileInfo.type === ArticleFileTypeEnum.audio;
    });

    return (
        <>
            <Markdown
                articleTitle={title}
                className={articleStyle.article_markdown}
                mdInput={getFileMarkdownByFullInfo(titleImage, {alt: title, poster: ""})}
            />
            {firstAudioFile ? (
                <Audio
                    downloadFileName={slug}
                    duration={firstAudioFile.duration}
                    mediaMetadata={{...defaultMediaMetadata, title}}
                    preload="none"
                    src={getPathToFile(firstAudioFile.name)}
                    useRepeatButton
                />
            ) : null}
            <Markdown articleTitle={title} className={articleStyle.article_markdown} mdInput={content} />
        </>
    );
}
