/* global HTMLVideoElement, HTMLImageElement */

import {type JSX, useCallback, useRef, useState} from "react";

import {cls} from "../../util/css";
import type {GetPathToFileType, GetPathToImageType} from "../../util/path";
import {secondsToHuman} from "../../util/time";
import {Image} from "../Image/image";
import * as videoStyle from "./video.scss";

interface VideoPropsType {
    readonly alt: string;
    readonly className?: string;
    readonly duration: number;
    readonly fileName: string;
    readonly getPathToFile: GetPathToFileType;
    readonly getPathToImage: GetPathToImageType;
    readonly height: number;
    readonly image?: {
        readonly className?: string;
        readonly imgClassName?: string;
    };
    readonly poster: string;
    readonly posterLoading: HTMLImageElement["loading"];
    readonly title: string;
    readonly videoClassName?: string;
    readonly width: number;
}

export function Video(props: VideoPropsType): JSX.Element {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isStarted, setIsStarted] = useState<boolean>(false);

    const playVideo = useCallback(() => {
        const {current: videoTag} = videoRef;

        setIsStarted(true);

        if (!videoTag) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        videoTag.play();
    }, [videoRef]);

    const handleOnCanPlay = useCallback(() => {
        const {current: videoTag} = videoRef;

        if (!videoTag || !isStarted) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        videoTag.play();
    }, [isStarted]);

    const {
        alt,
        title,
        image,
        fileName,
        width,
        getPathToImage,
        height,
        getPathToFile,
        className: cssClassName,
        videoClassName,
        poster,
        duration,
        posterLoading,
    } = props;

    return (
        <div
            className={`${videoStyle.video} ${cssClassName ?? ""}`.trim()}
            style={{display: "block", height: "auto", maxHeight: `${height}px`, maxWidth: `${width}px`}}
        >
            <svg
                height={height}
                style={{display: "block", height: "auto", maxHeight: `${height}px`, maxWidth: "100%"}}
                viewBox={`0 0 ${width} ${height}`}
                width={width}
            />

            <button aria-label="play" className={videoStyle.video__play_button} onClick={playVideo} type="button">
                <span className={videoStyle.video__play_button__icon} />
            </button>

            <p className={videoStyle.video__title}>{title}</p>

            <p className={videoStyle.video__duration}>{secondsToHuman(duration)}</p>

            <Image
                alt={alt}
                className={`${videoStyle.video__image} ${image?.className ?? ""}`.trim()}
                fileName={poster}
                getPathToFile={getPathToFile}
                getPathToImage={getPathToImage}
                height={height}
                imgClassName={`${videoStyle.video__image_tag} ${image?.imgClassName ?? ""}`.trim()}
                loading={posterLoading}
                title={title}
                width={width}
            />

            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
                className={cls(videoStyle.video__tag, videoClassName, {
                    [videoStyle.video__tag__started]: isStarted,
                })}
                controls
                height={height}
                onCanPlay={handleOnCanPlay}
                preload="none"
                ref={videoRef}
                src={getPathToFile(fileName)}
                title={title}
                width={width}
            >
                Video is not supported.
            </video>
        </div>
    );
}
