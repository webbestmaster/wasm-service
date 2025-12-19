import type {JSX} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

interface NavigationProviderPropsType {
    readonly component: () => JSX.Element;
}

export function TestUtilityNavigationProvider(props: NavigationProviderPropsType): JSX.Element {
    const {component: Page} = props;

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Page />} path="/" />
            </Routes>
        </BrowserRouter>
    );
}
