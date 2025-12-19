/* global HTMLImageElement */

import type {JSX} from "react";

import type {GetPathToFileType, GetPathToImageType} from "../../util/path";
import {Source} from "./source";

// Max website width is 1200
const screenWidthList: Array<number> = [1200, 1024, 912, 820, 768, 540, 425, 414, 412, 390, 375, 360, 320, 280, 128];

interface ImagePropsType {
    readonly alt: string;

    readonly className?: string;
    readonly fileName: string;
    readonly getPathToFile: GetPathToFileType;
    readonly getPathToImage: GetPathToImageType;
    readonly height: number;
    readonly imgClassName?: string;
    readonly loading: HTMLImageElement["loading"];
    readonly title: string;
    readonly width: number;
}

export function Image(props: ImagePropsType): JSX.Element {
    const {
        className: cssClassName,
        fileName,
        getPathToImage,
        getPathToFile,
        alt,
        width,
        height,
        title,
        imgClassName,
        loading,
    } = props;

    const sourceTagList: Array<JSX.Element> = screenWidthList.map<JSX.Element>((mediaWidth: number): JSX.Element => {
        return (
            <Source
                fileName={fileName}
                getPathToImage={getPathToImage}
                height={height}
                key={mediaWidth}
                mediaWidth={mediaWidth}
                width={width}
            />
        );
    });

    return (
        <picture className={cssClassName}>
            {sourceTagList}
            <img
                alt={alt}
                className={imgClassName}
                height={height}
                loading={loading}
                src={getPathToFile(fileName)}
                title={title}
                width={width}
            />
        </picture>
    );
}
