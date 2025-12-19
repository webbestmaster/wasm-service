import type {JSX} from "react";
import {Audio} from "react-audio-player-pro";

import {textToSlug} from "../../util/human";
import {getPathToFile} from "../../util/path";
import {defaultMediaMetadata} from "../audio-player/audio-player-const";
import * as markdownStyle from "./markdown.scss";
import type {StringToJsxRawDataType} from "./markdown-helper";

export const markdownAudioRegExp = /<audio[\S\s]+?<\/audio>/giu;

export interface AudioTagDataType {
    duration: number;
    fileName: string;
    title: string;
}

export function parseAudioTag(audioTag: string): AudioTagDataType {
    // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
    const [ignoredFullSrcString, srcAsString = ""] = /src="([^"]*?)"/u.exec(audioTag) ?? ["", ""];
    // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
    const [ignoredFullDurationString, durationAsString = ""] = /data-duration="([^"]*?)"/u.exec(audioTag) ?? ["", ""];
    // eslint-disable-next-line sonarjs/no-dead-store, sonarjs/no-unused-vars
    const [ignoredFullTitleString, titleAsString = ""] = /data-title="([^"]*?)"/u.exec(audioTag) ?? ["", ""];
    const durationAsNumber = Number.parseFloat(durationAsString) || 0;

    return {
        duration: durationAsNumber,
        fileName: srcAsString,
        title: titleAsString,
    };
}

export function getAudioFromHtml(rawData: StringToJsxRawDataType): JSX.Element {
    const {htmlString, articleTitle} = rawData;

    const {duration, fileName, title: parsedTitle} = parseAudioTag(htmlString);

    const endTitle: string = parsedTitle || articleTitle;
    const downloadFileName = textToSlug(endTitle);

    return (
        <Audio
            className={markdownStyle.markdown_audio}
            downloadFileName={downloadFileName}
            duration={duration}
            mediaMetadata={{...defaultMediaMetadata, title: endTitle}}
            preload={duration ? "none" : "metadata"}
            src={getPathToFile(fileName)}
            useRepeatButton
        />
    );
}
