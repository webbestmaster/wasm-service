import type {JSX, ReactNode} from "react";

import {ArticleProvider} from "../../client-component/article/article-context/article-context";
import type {ArticleContextType} from "../../client-component/article/article-context/article-context-type";
import {NavigationProvider} from "../../client-component/navigation/navigation-context/navigation-context";
import type {NavigationContextType} from "../../client-component/navigation/navigation-context/navigation-context-type";
import {LocalizationProvider} from "../../provider/locale/locale-context";
import {UserProvider} from "../../provider/user/user-context";

interface PropsType {
    readonly articleData: ArticleContextType | null;
    readonly children: ReactNode;
    readonly navigationData: NavigationContextType | null;
}

export function AppProvider(props: PropsType): JSX.Element {
    const {children, navigationData, articleData} = props;

    return (
        <UserProvider>
            <NavigationProvider navigationData={navigationData}>
                <ArticleProvider articleData={articleData}>
                    <LocalizationProvider>{children}</LocalizationProvider>
                </ArticleProvider>
            </NavigationProvider>
        </UserProvider>
    );
}
