/* global document */

import "markdown-pro/dist/style.css";
import "react-audio-player-pro/dist/style.css";

import {type JSX, StrictMode} from "react";
import {createRoot, hydrateRoot} from "react-dom/client";

import {App} from "./component/app/app";
import {selector} from "./const";
import {ErrorData} from "./layout/error-data/error-data";
import {Popup} from "./layout/popup/popup";

// eslint-disable-next-line jest/require-hook
(function main(): undefined {
    console.log(ErrorData, Popup);

    const nodeWrapper = document.querySelector(selector.appWrapper);

    if (!nodeWrapper) {
        throw new Error("[main]: Can not find appWrapper");
    }

    const {innerHTML} = nodeWrapper;

    const appNode: JSX.Element = (
        <StrictMode>
            <App articleData={null} defaultThemeName={null} navigationData={null} url="" />
        </StrictMode>
    );

    if (innerHTML.trim() === "") {
        console.log("[main]: Render App as SPA");
        createRoot(nodeWrapper).render(appNode);
        return;
    }

    console.log("[main]: Render App as SSR");
    hydrateRoot(nodeWrapper, appNode);
})();
