/* global document, Image, HTMLImageElement, Audio, HTMLAudioElement, HTMLVideoElement, File, FormData, location */
import type {Rule, RuleObject} from "rc-field-form/lib/interface";

import {type ArticleFileType, ArticleFileTypeEnum} from "../../../../server/article/article-type";
import {makeArticleFileSchema} from "../../../../server/article/article-validation";
import {apiUrl} from "../../../../server/const";
import {appRoute} from "../../../component/app/app-route";
import {deleteArticle} from "../../../service/article/article-api";
import {NeverError} from "../../../util/error";
import {FetchMethodEnum, fetchX} from "../../../util/fetch";
import {textToSlug} from "../../../util/human";
import {getPathToFile} from "../../../util/path";
import type {PromiseResolveType} from "../../../util/promise";
import {generatePath} from "../../../util/url";
import {CmsArticleModeEnum} from "./cms-article-const";
import type {ArticleForValidationType, MakeSlugValidatorArgumentType} from "./cms-article-type";

export async function fetchImage(pathToImage: string): Promise<HTMLImageElement> {
    const image = new Image();

    return new Promise<HTMLImageElement>(
        (resolve: PromiseResolveType<HTMLImageElement>, reject: PromiseResolveType<unknown>) => {
            image.addEventListener(
                "load",
                () => {
                    return resolve(image);
                },
                false
            );

            image.addEventListener("error", reject, false);

            image.src = pathToImage;
        }
    );
}

export async function fetchAudio(pathToAudio: string): Promise<HTMLAudioElement> {
    const audio = new Audio();

    return new Promise<HTMLAudioElement>(
        (resolve: PromiseResolveType<HTMLAudioElement>, reject: PromiseResolveType<unknown>) => {
            audio.addEventListener(
                "loadedmetadata",
                () => {
                    return resolve(audio);
                },
                false
            );

            audio.addEventListener("error", reject, false);

            audio.preload = "metadata";
            audio.src = pathToAudio;
        }
    );
}

export async function fetchVideo(pathToVideo: string): Promise<HTMLVideoElement> {
    const video: HTMLVideoElement = document.createElement("video");

    return new Promise<HTMLVideoElement>(
        (resolve: PromiseResolveType<HTMLVideoElement>, reject: PromiseResolveType<unknown>) => {
            video.addEventListener(
                "loadedmetadata",
                () => {
                    return resolve(video);
                },
                false
            );

            video.addEventListener("error", reject, false);

            video.preload = "metadata";
            video.src = pathToVideo;
        }
    );
}

export async function uploadFile(file: File, fileSizeLimitBytes: number): Promise<ArticleFileType> {
    const formData = new FormData();

    if (file.size >= fileSizeLimitBytes) {
        throw new Error(`Too big file, limit ${fileSizeLimitBytes / 1e6}MB`);
    }

    formData.append("file", file);

    const fileInfo: ArticleFileType = await fetchX<ArticleFileType>(apiUrl.adminFileUpload, makeArticleFileSchema(), {
        body: formData,
        credentials: "include",
        method: FetchMethodEnum.post,
    });

    const pathToFile = getPathToFile(fileInfo.name);

    switch (fileInfo.type) {
        case ArticleFileTypeEnum.image: {
            const {naturalHeight, naturalWidth} = await fetchImage(pathToFile);

            return {
                ...fileInfo,
                height: naturalHeight,
                width: naturalWidth,
            };
        }
        case ArticleFileTypeEnum.audio: {
            const {duration} = await fetchAudio(pathToFile);

            return {
                ...fileInfo,
                duration,
            };
        }

        case ArticleFileTypeEnum.video: {
            const {duration, videoWidth, videoHeight} = await fetchVideo(pathToFile);

            return {
                ...fileInfo,
                duration,
                height: videoHeight,
                width: videoWidth,
            };
        }

        case ArticleFileTypeEnum.unknown: {
            return fileInfo;
        }

        default: {
            throw new NeverError(fileInfo.type);
        }
    }

    return fileInfo;
}

export function makeSlugValidator(data: MakeSlugValidatorArgumentType): Array<Rule> {
    const {id, mode, savedArticleList} = data;

    return [
        {
            message: "Required!",
            required: true,
        },
        {
            message: "Please-enter-slug-properly.",
            // eslint-disable-next-line @typescript-eslint/require-await
            validator: async (rule: RuleObject, value: string): Promise<void> => {
                if (textToSlug(value) !== value) {
                    throw new Error("Slug is not formatted.");
                }
            },
        },
        {
            message: "Please enter another slug. This slug already exists.",
            // eslint-disable-next-line @typescript-eslint/require-await
            validator: async (rule: RuleObject, value: string): Promise<void> => {
                const savedArticleBySlugList: Array<ArticleForValidationType> = savedArticleList.filter(
                    (savedArticle: ArticleForValidationType): boolean => {
                        return savedArticle.slug === value;
                    }
                );

                const savedArticleBySlugListLength = savedArticleBySlugList.length;

                if (savedArticleBySlugListLength === 0) {
                    return;
                }

                if (savedArticleBySlugListLength >= 2) {
                    throw new Error("There are should be only one no non articles");
                }

                const isSavedArticle: boolean = savedArticleBySlugListLength > 0;

                if (mode === CmsArticleModeEnum.create && isSavedArticle) {
                    throw new Error("Use unique slug.");
                }

                const [savedArticleForValidation] = savedArticleBySlugList;

                if (
                    mode === CmsArticleModeEnum.edit &&
                    savedArticleForValidation.slug === value &&
                    savedArticleForValidation.id !== id
                ) {
                    throw new Error("Article with your slug already exists");
                }
            },
        },
    ];
}

export function makeHtmlValidator(): Array<Rule> {
    return [
        {
            message: "Invalid HTML.",
            // eslint-disable-next-line @typescript-eslint/require-await
            validator: async (rule: RuleObject, value: string): Promise<void> => {
                if (typeof document === "undefined") {
                    return;
                }

                const wrapper = document.createElement("div");

                wrapper.innerHTML = value;

                if (wrapper.innerHTML.trim() === value.trim()) {
                    return;
                }

                throw new Error("HTML is not valid");
            },
        },
    ];
}

export function getArticleLinkToEdit(articleId: string): string {
    return generatePath<typeof appRoute.articleEdit.path>(appRoute.articleEdit.path, {articleId});
}

export function getFileExtension(fileName: string): string {
    const hasExtension = fileName.includes(".");

    if (!hasExtension) {
        return "";
    }

    return (fileName.split(".").pop() ?? "").toLowerCase();
}

export function getIsImage(fileName: string): boolean {
    const fileExtension = getFileExtension(fileName);

    return ["jpg", "jpeg", "jfif", "gif", "png", "webp"].includes(fileExtension);
}

export function getIsAudio(fileName: string): boolean {
    const fileExtension = getFileExtension(fileName);

    return ["mp3", "wav"].includes(fileExtension);
}

export function getIsVideo(fileName: string): boolean {
    const fileExtension = getFileExtension(fileName);

    return ["mp4"].includes(fileExtension);
}

export function getAbsentIdList(
    subDocumentIdList: ReadonlyArray<string>,
    savedArticleList: ReadonlyArray<ArticleForValidationType>
): Array<string> {
    if (savedArticleList.length === 0) {
        return [];
    }

    return subDocumentIdList.filter((id: string): boolean => {
        return !savedArticleList.some((article: ArticleForValidationType): boolean => {
            return article.id === id;
        });
    });
}

export async function handleDeleteArticle(articleId: string): Promise<unknown> {
    return deleteArticle(articleId)
        .then(() => {
            location.reload();
        })
        .catch(console.error);
}
