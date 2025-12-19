/* global URLSearchParams */

import type {JSX, ReactNode} from "react";
import {Link, useSearchParams} from "react-router-dom";

export interface NavigationLinkPropsType {
    readonly children?: ReactNode;
    readonly className?: string;
    readonly isSaveQueries?: boolean;
    readonly queries?: Record<string, string>;
    readonly title?: string;
    readonly to: string;
}

export function NavigationLink(props: NavigationLinkPropsType): JSX.Element {
    const {className: cssClassName, to, children, isSaveQueries = true, title, queries: passedQueries = {}} = props;

    const [search] = useSearchParams();
    const currentQueries: Record<string, string> = Object.fromEntries<string>(search.entries());

    const resultQueries: Record<string, string> = isSaveQueries ? {...currentQueries, ...passedQueries} : passedQueries;

    const queriesAsString: string = new URLSearchParams(resultQueries).toString();

    const queriesAsPartUrl = queriesAsString && `?${queriesAsString}`;

    return (
        <Link className={cssClassName} title={title} to={to + queriesAsPartUrl}>
            {children}
        </Link>
    );
}
