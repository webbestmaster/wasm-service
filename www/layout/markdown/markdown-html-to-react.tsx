import {Fragment, type JSX} from "react";

import {getIsEmptyHtml, type StringToJsxRawDataType} from "./markdown-helper";
import {getAudioFromHtml} from "./markdown-helper-audio";
import {getImageFromHtml} from "./markdown-helper-image";
import {getVideoFromHtml} from "./markdown-helper-video";
import {MarkdownItemCounter} from "./markdown-item-counter";

const markdownVideoRegExp = /<video [^>]+\/>/giu;
const markdownAudioRegExp = /<audio [^>]+\/>/giu;
const markdownImageRegExp = /<img [^>]+\/>/giu;
const markdownReplaceRegExp = /<video [^>]+\/>|<audio [^>]+\/>|<img [^>]+\/>/giu;

function getIsVideoHtmlCode(htmlString: string): boolean {
    return htmlString.search(markdownVideoRegExp) >= 0;
}

function getIsAudioHtmlCode(htmlString: string): boolean {
    return htmlString.search(markdownAudioRegExp) >= 0;
}

function getIsImageHtmlCode(htmlString: string): boolean {
    return htmlString.search(markdownImageRegExp) >= 0;
}

function htmlStringToJsx(rawData: StringToJsxRawDataType, markdownItemCounter: MarkdownItemCounter): JSX.Element {
    const {htmlString} = rawData;

    if (getIsVideoHtmlCode(htmlString)) {
        // Add image and video cause every video has image as poster
        markdownItemCounter.increaseImage();
        markdownItemCounter.increaseVideo();

        return getVideoFromHtml(rawData, markdownItemCounter);
    }

    if (getIsAudioHtmlCode(htmlString)) {
        markdownItemCounter.increaseAudio();

        return getAudioFromHtml(rawData);
    }

    if (getIsImageHtmlCode(htmlString)) {
        markdownItemCounter.increaseImage();

        return getImageFromHtml(rawData, markdownItemCounter);
    }

    console.error("[htmlStringToJsx] Can not parse html string");
    console.log(`||--${htmlString}--||`);
    return <div dangerouslySetInnerHTML={{__html: htmlString}} />;
}

interface PropsType {
    readonly articleTitle: string;
    readonly htmlCode: string;
}

export function MarkdownHtmlToReact(props: PropsType): JSX.Element {
    const {htmlCode, articleTitle} = props;
    const splitTextList: Array<string> = htmlCode.split(markdownReplaceRegExp);
    const replaceList: Array<string> = htmlCode.match(markdownReplaceRegExp) ?? [];
    const markdownItemCounter = new MarkdownItemCounter();

    const jsxList: Array<JSX.Element> = splitTextList.map((htmlChunk: string, index: number): JSX.Element => {
        const key = index.toString(16);
        const replacePart = replaceList[index];

        return (
            <Fragment key={key}>
                {getIsEmptyHtml(htmlChunk) ? null : <div dangerouslySetInnerHTML={{__html: htmlChunk}} />}
                {replacePart ? htmlStringToJsx({articleTitle, htmlString: replacePart}, markdownItemCounter) : null}
            </Fragment>
        );
    });

    return <Fragment key={htmlCode}>{jsxList}</Fragment>;
}
