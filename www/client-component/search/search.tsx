/* global HTMLInputElement, document, MouseEvent, HTMLDivElement */

import {type JSX, type SyntheticEvent, useCallback, useEffect, useRef, useState} from "react";

import type {PaginationResultType} from "../../../server/data-base/data-base-type";
import {useLocale} from "../../provider/locale/locale-context";
import {getArticleClientListPaginationPick} from "../../service/article/article-api";
import {cls} from "../../util/css";
import {noop, useMakeExecutableState} from "../../util/function";
import {makeSafeRegExp} from "../../util/regexp";
import {useHotKey} from "../../util/use-hot-key";
import * as searchStyle from "./search.scss";
import {articlePreviewKeyList} from "./search-const";
import {SearchResult} from "./search-result/search-result";
import type {SearchArticleType} from "./search-type";

interface SearchPropsType {
    readonly className?: string;
    readonly onChangeFocus?: (hasFocus: boolean) => void;
}

export function Search(props: SearchPropsType): JSX.Element {
    const {className: cssClassName, onChangeFocus = noop} = props;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const {getLocalizedString} = useLocale();
    const [hasFocus, setHasFocus] = useState<boolean>(false);
    const minLetters = 3;
    const forceBlur = useCallback(() => {
        setHasFocus(false);
    }, []);
    const forceFocus = useCallback(() => {
        setHasFocus(true);
    }, []);
    const [searchString, setSearchString] = useState<string>("");

    useHotKey({
        code: "Escape",
        handleHotKey: forceBlur,
    });

    useEffect(() => {
        function handleBodyOnClick(evt: MouseEvent): undefined {
            const hasWrapperInPath = Boolean(wrapperRef.current && evt.composedPath().includes(wrapperRef.current));

            if (hasWrapperInPath) {
                return;
            }

            forceBlur();
        }

        document.body.addEventListener("click", handleBodyOnClick, false);

        return (): void => {
            document.body.removeEventListener("click", handleBodyOnClick, false);
        };
    }, [forceBlur]);

    const {
        execute: executeArticleList,
        result: resultArticleList,
        isInProgress: isInProgressArticleList,
    } = useMakeExecutableState<
        Parameters<typeof getArticleClientListPaginationPick<keyof SearchArticleType>>,
        PaginationResultType<SearchArticleType>
    >(getArticleClientListPaginationPick);

    const handleInput = useCallback(
        (evt: SyntheticEvent<HTMLInputElement>) => {
            setSearchString(evt.currentTarget.value.trim());
        },
        [setSearchString]
    );

    useEffect(() => {
        if (searchString.length >= minLetters) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            executeArticleList(
                {
                    title: makeSafeRegExp(searchString, "gi").toString(),
                },
                {
                    pageIndex: 0,
                    pageSize: 0,
                    sort: {title: 1},
                },
                articlePreviewKeyList
            );
        }
    }, [searchString, executeArticleList]);

    useEffect(() => {
        onChangeFocus(hasFocus);
    }, [hasFocus, onChangeFocus]);

    return (
        <div className={cls(searchStyle.search_wrapper, cssClassName)} ref={wrapperRef}>
            <input
                className={searchStyle.search_input}
                defaultValue={searchString}
                onFocus={forceFocus}
                onInput={handleInput}
                placeholder={getLocalizedString("UI__SEARCH_PLACEHOLDER")}
                title={getLocalizedString("UI__SEARCH_INPUT")}
                type="text"
            />

            <button
                className={cls(searchStyle.search_icon, {[searchStyle.search_icon__focused]: hasFocus})}
                onClick={forceBlur}
                title={getLocalizedString("UI__SEARCH_BUTTON")}
                type="button"
            />

            {hasFocus && searchString.trim() ? (
                <div className={searchStyle.result_wrapper}>
                    <SearchResult
                        isLoading={isInProgressArticleList}
                        list={(resultArticleList?.list ?? []).filter(
                            (searchArticle: SearchArticleType): searchArticle is SearchArticleType => {
                                return searchArticle.title.toLowerCase().includes(searchString.toLowerCase());
                            }
                        )}
                        minLetters={minLetters}
                        searchString={searchString}
                    />
                </div>
            ) : null}
        </div>
    );
}
