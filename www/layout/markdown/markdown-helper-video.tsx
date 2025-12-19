import type {JSX} from "react";

import {appIconPngFileName} from "../../const";
import {getPathToFile, getPathToImage} from "../../util/path";
import {Video} from "../video/video";
import * as markdownStyle from "./markdown.scss";
import type {StringToJsxRawDataType} from "./markdown-helper";
import type {MarkdownItemCounter} from "./markdown-item-counter";

export function getVideoFromHtml(
    rawData: StringToJsxRawDataType,
    markdownItemCounter: MarkdownItemCounter
): JSX.Element {
    const {htmlString, articleTitle} = rawData;
    // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
    const [ignoredFullWidthString, widthAsString = ""] = /width="(\d+)"/u.exec(htmlString) ?? ["", "0"];
    // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
    const [ignoredFullHeightString, heightAsString = ""] = /height="(\d+)"/u.exec(htmlString) ?? ["", "0"];
    // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
    const [ignoredFullPosterString, posterAsString = ""] = /poster="([^"]*?)"/u.exec(htmlString) ?? [
        "",
        appIconPngFileName,
    ];
    // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
    const [ignoredFullDurationString, durationAsString = ""] = /data-duration="([^"]*?)"/u.exec(htmlString) ?? [
        "",
        "0",
    ];
    // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
    const [ignoredFullTitleString, titleAsString = ""] = /title="([^"]*?)"/u.exec(htmlString) ?? ["", "THE TITLE"];
    // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
    const [ignoredFullSrcString, srcAsString = ""] = /src="([^"]*?)"/u.exec(htmlString) ?? ["", ""];

    return (
        <Video
            alt={(titleAsString || articleTitle).trim()}
            className={markdownStyle.markdown_video}
            duration={Number.parseFloat(durationAsString.trim())}
            fileName={srcAsString.trim()}
            getPathToFile={getPathToFile}
            getPathToImage={getPathToImage}
            height={Number.parseInt(heightAsString.trim(), 10)}
            image={{className: markdownStyle.markdown_picture, imgClassName: markdownStyle.markdown_image}}
            poster={posterAsString.trim()}
            posterLoading={markdownItemCounter.getLoadingImageType()}
            title={(titleAsString || articleTitle).trim()}
            width={Number.parseInt(widthAsString.trim(), 10)}
        />
    );
}
