import {type JSX, useCallback, useContext} from "react";
import {Link} from "react-router-dom";

import {rootArticleSlug} from "../../../server/article/article-const";
import type {ArticlePreviewType} from "../../../server/article/article-type";
import {Locale} from "../../provider/locale/locale-context";
import {cls} from "../../util/css";
import {articleContext} from "../article/article-context/article-context";
import type {ArticleContextType} from "../article/article-context/article-context-type";
import {getArticleLinkToViewClient} from "../article/article-helper";
import * as navigationStyle from "./navigation.scss";
import {navigationContext} from "./navigation-context/navigation-context";
import type {NavigationContextType} from "./navigation-context/navigation-context-type";

export function Navigation(): JSX.Element {
    const navigationContextData = useContext<NavigationContextType>(navigationContext);
    const {article, breadcrumbs} = useContext<ArticleContextType>(articleContext);
    const {slug: currentArticleSlug} = article;
    const {itemList} = navigationContextData;
    const sectionItem = breadcrumbs.at(1);

    const renderNavigationListItem = useCallback(
        (menuItem: ArticlePreviewType, index: number): JSX.Element => {
            const {slug, title} = menuItem;
            const isActiveLink = currentArticleSlug === slug || sectionItem?.slug === slug;

            return (
                <li className={navigationStyle.navigation_list_item} key={`${slug}-${String(index)}`}>
                    <Link
                        className={cls(navigationStyle.navigation_link, {
                            [navigationStyle.navigation_link_active]: isActiveLink,
                        })}
                        to={getArticleLinkToViewClient(slug)}
                    >
                        {title}
                    </Link>
                </li>
            );
        },
        [currentArticleSlug, sectionItem]
    );

    return (
        <nav className={navigationStyle.navigation}>
            <ul className={navigationStyle.navigation_list}>
                <li className={navigationStyle.navigation_list_item}>
                    <Link
                        className={cls(navigationStyle.navigation_link, {
                            [navigationStyle.navigation_link_active]: currentArticleSlug === rootArticleSlug,
                        })}
                        to={getArticleLinkToViewClient(rootArticleSlug)}
                    >
                        <Locale stringKey="NAVIGATION__HOME" />
                    </Link>
                </li>
                {itemList.map(renderNavigationListItem)}
            </ul>
        </nav>
    );
}
