/* global NAVIGATION_DATA */
import {createContext, type JSX} from "react";

import {isBrowser} from "../../../util/system";
import {defaultNavigationContextData} from "./navigation-context-const";
import type {NavigationContextType} from "./navigation-context-type";

export const navigationContext = createContext<NavigationContextType>(defaultNavigationContextData);

const {Provider: NavigationContextProvider} = navigationContext;

interface NavigationProviderPropsType {
    readonly children: Array<JSX.Element> | JSX.Element;
    readonly navigationData: NavigationContextType | null;
}

export function NavigationProvider(props: NavigationProviderPropsType): JSX.Element {
    const {children, navigationData} = props;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const ssrNavigationData: NavigationContextType | null =
        typeof NAVIGATION_DATA === "string"
            ? JSON.parse(decodeURIComponent(NAVIGATION_DATA))
            : defaultNavigationContextData;
    // Typeof NAVIGATION_DATA === 'string' ? JSON.parse(decodeURIComponent(NAVIGATION_DATA)) : null;;

    const resultData: NavigationContextType =
        (isBrowser ? ssrNavigationData : navigationData) ?? defaultNavigationContextData;

    return <NavigationContextProvider value={resultData}>{children}</NavigationContextProvider>;
}
