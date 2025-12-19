import {type JSX, useCallback, useState} from "react";
import {Link} from "react-router-dom";

import {appRoute} from "../../component/app/app-route";
import {copyrightName} from "../../const";
import {useLocale} from "../../provider/locale/locale-context";
import {cls} from "../../util/css";
import {Navigation} from "../navigation/navigation";
import {Search} from "../search/search";
import * as headerStyle from "./header.scss";

export function Header(): JSX.Element {
    const {getLocalizedString} = useLocale();
    const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(false);
    const toggleNavigation = useCallback(() => {
        setIsNavigationOpen((isOpen: boolean): boolean => {
            return !isOpen;
        });
    }, []);

    const [hasSearchFocus, setHasSearchFocus] = useState<boolean>(false);

    return (
        <>
            <header className={headerStyle.header}>
                <button
                    className={cls({
                        [headerStyle.header__navigation_toggle_button__open]: isNavigationOpen,
                        [headerStyle.header__navigation_toggle_button__closed]: !isNavigationOpen,
                        [headerStyle.header__navigation_toggle_button__search_focused]: hasSearchFocus,
                    })}
                    onClick={toggleNavigation}
                    title={getLocalizedString("UI__MENU")}
                    type="button"
                >
                    &nbsp;
                </button>
                <Link
                    className={cls(headerStyle.header__home_link, {
                        [headerStyle.header__header__home_link__search_focused]: hasSearchFocus,
                    })}
                    to={appRoute.root.path}
                >
                    <img
                        alt={copyrightName}
                        className={headerStyle.header__home_icon}
                        src="https://placekitten.com/72/72"
                    />
                    <span className={headerStyle.header__home_text}>{copyrightName}</span>
                </Link>
                <div
                    className={cls(headerStyle.header__search, {
                        [headerStyle.header__search__focused]: hasSearchFocus,
                    })}
                >
                    <Search onChangeFocus={setHasSearchFocus} />
                </div>
            </header>
            <div
                className={cls(headerStyle.header__navigation_wrapper, {
                    [headerStyle.header__navigation_wrapper__open]: isNavigationOpen,
                })}
            >
                <Navigation />
            </div>
        </>
    );
}
