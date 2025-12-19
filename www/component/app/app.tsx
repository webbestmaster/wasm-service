import type {JSX} from "react";
import {AudioPlayerControlSprite} from "react-audio-player-pro";

import type {ArticleContextType} from "../../client-component/article/article-context/article-context-type";
import type {NavigationContextType} from "../../client-component/navigation/navigation-context/navigation-context-type";
import {ShareButtonSprite} from "../../client-component/share/share-button/share-button-sprite";
import {GdprInfo} from "../../layout/gdpr-info/gdpr-info";
import {ThemeProvider} from "../../provider/theme/theme-context";
import type {ThemeNameEnum} from "../../provider/theme/theme-context-type";
import {ErrorBoundary} from "../error-boundary/error-boundary";
import {AppProvider} from "./app-provider";
import {AppRouting} from "./app-routing";

export interface AppPropsType {
    readonly articleData: ArticleContextType | null;
    readonly defaultThemeName: ThemeNameEnum | null;
    readonly navigationData: NavigationContextType | null;
    readonly url: string;
}

export function App(props: AppPropsType): JSX.Element {
    const {url, navigationData, articleData, defaultThemeName} = props;

    return (
        <ErrorBoundary errorFallBack={<h1>Front-end error</h1>}>
            <ThemeProvider defaultThemeName={defaultThemeName}>
                <AppProvider articleData={articleData} navigationData={navigationData}>
                    <AppRouting url={url} />
                    <GdprInfo />
                </AppProvider>

                <AudioPlayerControlSprite />
                <ShareButtonSprite />
            </ThemeProvider>
        </ErrorBoundary>
    );
}
