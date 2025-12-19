import {type ComponentType, type JSX, lazy, Suspense} from "react";
import type {AudioPlayerPropsType, AudioPropsType, PlayListProviderPropsType} from "react-audio-player-pro";

import type {LazyResultType} from "../../util/type";
import {AsciiSpinner} from "../spinner/ascii-spinner";
import * as audioPlayerStyle from "./audio-player.scss";

function AudioPlayerLoading(): JSX.Element {
    return <AsciiSpinner className={audioPlayerStyle.audio_player__spinner} isShow />;
}

const AudioPlayerControlSpriteLazy = lazy<ComponentType<unknown>>(async (): Promise<LazyResultType<unknown>> => {
    const {AudioPlayerControlSprite} = await import(
        /* webpackChunkName: 'react-audio-player-pro-audio-player-control-sprite' */
        "react-audio-player-pro"
    );

    return {"default": AudioPlayerControlSprite};
});

export function AudioPlayerControlSpriteAsync(): JSX.Element {
    return (
        <Suspense fallback={null}>
            <AudioPlayerControlSpriteLazy />
        </Suspense>
    );
}

const AudioLazy = lazy<ComponentType<AudioPropsType>>(async (): Promise<LazyResultType<AudioPropsType>> => {
    const {Audio} = await import(
        /* webpackChunkName: 'react-audio-player-pro-audio' */
        "react-audio-player-pro"
    );

    return {"default": Audio};
});

export function AudioAsync(props: Readonly<AudioPropsType>): JSX.Element {
    return (
        <Suspense fallback={<AudioPlayerLoading />}>
            <AudioLazy {...props} />
        </Suspense>
    );
}

const AudioPlayerLazy = lazy<ComponentType<AudioPlayerPropsType>>(
    async (): Promise<LazyResultType<AudioPlayerPropsType>> => {
        const {AudioPlayer} = await import(
            /* webpackChunkName: 'react-audio-player-pro-audio-player' */
            "react-audio-player-pro"
        );

        return {"default": AudioPlayer};
    }
);

export function AudioPlayerAsync(props: AudioPlayerPropsType): JSX.Element {
    return (
        <Suspense fallback={<AudioPlayerLoading />}>
            <AudioPlayerLazy {...props} />
        </Suspense>
    );
}

const PlayListProviderLazy = lazy<ComponentType<PlayListProviderPropsType>>(
    async (): Promise<LazyResultType<PlayListProviderPropsType>> => {
        const {PlayListProvider} = await import(
            /* webpackChunkName: 'react-audio-player-pro-play-list-provider' */
            "react-audio-player-pro"
        );

        return {"default": PlayListProvider};
    }
);

export function PlayListProviderAsync(props: PlayListProviderPropsType): JSX.Element {
    return (
        <Suspense fallback={<AudioPlayerLoading />}>
            <PlayListProviderLazy {...props} />
        </Suspense>
    );
}

const PlayListPanelLazy = lazy<ComponentType<unknown>>(async (): Promise<LazyResultType<unknown>> => {
    const {PlayListPanel} = await import(
        /* webpackChunkName: 'react-audio-player-pro-play-list-panel' */
        "react-audio-player-pro"
    );

    return {"default": PlayListPanel};
});

export function PlayListPanelAsync(): JSX.Element {
    return (
        <Suspense fallback={<AudioPlayerLoading />}>
            <PlayListPanelLazy />
        </Suspense>
    );
}
