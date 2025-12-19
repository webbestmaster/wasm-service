import type {JSX} from "react";

import type {GetPathToImageType} from "../../util/path";
import {getFullHorizontalPadding} from "./image-helper";

const screenAspectRation: Array<number> = [1, 1.5, 2, 3];

interface SourcePropsType {
    readonly fileName: string;
    readonly getPathToImage: GetPathToImageType;
    readonly height: number;
    readonly mediaWidth: number;
    readonly width: number;
}

export function Source(props: SourcePropsType): JSX.Element | null {
    const {mediaWidth, width, height, fileName, getPathToImage} = props;
    const imageAspect = width / height;
    const imageWidth = mediaWidth - getFullHorizontalPadding(mediaWidth);
    const imageHeight = Math.round(imageWidth / imageAspect);

    // Prevent extra large image source
    if (imageWidth > width) {
        return null;
    }

    const srcSet: string = screenAspectRation
        .map<string>((multiple: number): string => {
            const multipleImageHeight = Math.round(imageHeight * multiple);
            const multipleImageWidth = Math.round(imageWidth * multiple);

            const imageSrc = getPathToImage(fileName, {
                height: multipleImageHeight,
                width: multipleImageWidth,
            });

            return multipleImageWidth <= width ? `${imageSrc} ${multiple}x` : "";
        })
        .filter(Boolean)
        .join(", ");

    return (
        <source
            height={String(imageHeight)}
            media={`(min-width: ${mediaWidth}px)`}
            srcSet={srcSet}
            width={String(imageWidth)}
        />
    );
}
