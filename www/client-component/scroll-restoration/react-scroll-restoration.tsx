/* global window, document, requestAnimationFrame, sessionStorage */

import {type JSX, useCallback, useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import {useLocale} from "../../provider/locale/locale-context";
import {cls} from "../../util/css";
import {debounce} from "../../util/function";
import {articleContext} from "../article/article-context/article-context";
import type {ArticleContextType} from "../article/article-context/article-context-type";
import * as scrollRestorationStyle from "./scroll-restoration.scss";
import {getAbsoluteScrollTop, getRelativeScrollTop, smoothScrollToTop} from "./scroll-restoration-helper";

export function ReactScrollRestoration(): JSX.Element {
    const topScrollPositionToShowToTopButton = 100;
    const {getLocalizedString} = useLocale();
    const {pathname} = useLocation();
    const [scrollTop, setScrollTop] = useState<number>(0);
    const getItemKey = useCallback((): string => {
        return `ScrollRestoration:${pathname}`;
    }, [pathname]);
    const {isInProgressArticle} = useContext<ArticleContextType>(articleContext);

    useEffect(() => {
        if (isInProgressArticle) {
            return;
        }

        requestAnimationFrame(() => {
            const relativeScrollTop = Number.parseFloat(sessionStorage.getItem(getItemKey()) ?? "0") || 0;
            const absoluteScrollTop = getAbsoluteScrollTop(relativeScrollTop);

            document.documentElement.scrollTop = absoluteScrollTop;
        });
    }, [getItemKey, isInProgressArticle]);

    useEffect(() => {
        const debouncedChangeScrollTopPosition = debounce<[]>(() => {
            const {documentElement} = document;

            sessionStorage.setItem(getItemKey(), getRelativeScrollTop().toString(10));

            setScrollTop(documentElement.scrollTop);
        }, 150);

        window.addEventListener("scroll", debouncedChangeScrollTopPosition, {
            capture: false,
            passive: true,
        });

        return (): void => {
            window.removeEventListener("scroll", debouncedChangeScrollTopPosition);
        };
    }, [getItemKey]);

    return (
        <button
            className={cls(scrollRestorationStyle.scroll_restoration__scroll_to_top_button, {
                [scrollRestorationStyle.scroll_restoration__scroll_to_top_button__visible]:
                    scrollTop > topScrollPositionToShowToTopButton,
            })}
            onClick={smoothScrollToTop}
            title={getLocalizedString("UI__TO_TOP")}
            type="button"
        >
            <span className={scrollRestorationStyle.scroll_restoration__scroll_to_top_button__arrow} />
        </button>
    );
}
