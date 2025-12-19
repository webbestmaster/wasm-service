import {Input, type InputRef} from "antd";
import type {FilterDropdownProps} from "antd/es/table/interface";
import {type JSX, type SyntheticEvent, useEffect, useRef} from "react";

import {useLocale} from "../../../provider/locale/locale-context";
import type {GetArticleTableColumnListArgumentType} from "./cms-article-list-const";
import type {ArticleForTableListKeysType} from "./cms-article-list-type";

interface FilterDropdownPropsType {
    readonly filterProps: FilterDropdownProps;
    readonly articleTableColumnListProps: GetArticleTableColumnListArgumentType;
    readonly columnName: ArticleForTableListKeysType;
}

export function CmsArticleListFilterDropdown(filterDropdownProps: FilterDropdownPropsType): JSX.Element {
    const {columnName, articleTableColumnListProps, filterProps} = filterDropdownProps;
    const {visible} = filterProps;
    const inputRef = useRef<InputRef>(null);
    const {setSearchText, setSearchedColumn} = articleTableColumnListProps;
    const {getLocalizedString} = useLocale();

    useEffect(() => {
        if (visible) {
            // Wait until the input appears
            setTimeout(() => {
                inputRef.current?.focus({cursor: "start"});
            }, 100);
        }
    }, [visible]);

    return (
        <Input
            key={columnName}
            onInput={(evt: SyntheticEvent<HTMLInputElement>): undefined => {
                setSearchedColumn(columnName);
                setSearchText(evt.currentTarget.value.trim());
            }}
            placeholder={getLocalizedString("UI__SEARCH_PLACEHOLDER")}
            ref={inputRef}
        />
    );
}
