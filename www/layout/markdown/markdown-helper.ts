import {type ArticleFileType, ArticleFileTypeEnum} from "../../../server/article/article-type";
import {NeverError} from "../../util/error";
import {textToSlug} from "../../util/human";
import {getPathToFile} from "../../util/path";

export interface StringToJsxRawDataType {
    articleTitle: string;
    htmlString: string;
}

export function getFileMarkdownByFullInfo(
    fullFileInfo: ArticleFileType,
    additionalInfo: Record<"alt" | "poster", string>
): string {
    const {duration, name, width, height, type, title} = fullFileInfo;
    const {alt, poster} = additionalInfo;
    const pathToFile = getPathToFile(name);

    const htmlTitle = title || "THE TITLE";
    const htmlAlt = alt || title;
    const htmlPoster = poster || "";

    switch (type) {
        case ArticleFileTypeEnum.image: {
            return `![${htmlAlt}](${name} "${htmlTitle}" height="${height}" width="${width}")`;
        }
        case ArticleFileTypeEnum.audio: {
            return `<audio data-duration="${duration}" data-title="${title}" src="${name}"/>`;
        }
        case ArticleFileTypeEnum.video: {
            // eslint-disable-next-line max-len
            return `<video width="${width}" height="${height}" poster="${htmlPoster}" data-duration="${duration}" title="${title}" src="${name}"/>`;
        }
        case ArticleFileTypeEnum.unknown: {
            return `<a href="${pathToFile}" target="_blank" download="${textToSlug(title)}">${name}</a>`;
        }
        default: {
            throw new NeverError(type);
        }
    }

    return `<a href="${pathToFile}" target="_blank" download="${name}">${name}</a>`;
}

export function getIsEmptyHtml(htmlChunk: string): boolean {
    return htmlChunk.replace(/<br\/>/giu, "").trim().length === 0;
}
