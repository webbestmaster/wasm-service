import {type JSX, type ReactNode, useContext, useEffect} from "react";
import {type Location, useLocation, useParams} from "react-router-dom";

import {rootArticleSlug} from "../../../server/article/article-const";
import {appRoute} from "../../component/app/app-route";
import {googleAnalyticsId} from "../../const";
import {noop} from "../../util/function";
import type {ExtractPathKeysType} from "../../util/url";
import {articleContext} from "../article/article-context/article-context";
import type {ArticleContextType} from "../article/article-context/article-context-type";
import {getArticleLinkToViewClient} from "../article/article-helper";
import {LoginForm} from "../auth/login-form/login-form";
import {Footer} from "../footer/footer";
import {useGoogleAnalytics} from "../google-analytics/google-analytics";
import {Header} from "../header/header";
import {ReactScrollRestoration} from "../scroll-restoration/react-scroll-restoration";
import * as pageStyle from "./page.scss";

interface PagePropsType {
    readonly children: ReactNode;
}

export function Page(props: PagePropsType): JSX.Element {
    const {children} = props;
    const location: Location<unknown> = useLocation();
    const {pathname} = location;
    const {slug = ""} = useParams<ExtractPathKeysType<typeof appRoute.article.path>>();
    const {setSlug = noop} = useContext<ArticleContextType>(articleContext);

    useEffect(() => {
        const trimmedSlug = slug.trim();

        // Check for /article/<slug>
        if (trimmedSlug && pathname === getArticleLinkToViewClient(trimmedSlug)) {
            setSlug(trimmedSlug);
            return;
        }

        if (pathname === appRoute.root.path) {
            setSlug(rootArticleSlug);
        }
    }, [slug, setSlug, pathname]);

    useGoogleAnalytics({
        googleAnalyticsId,
        pathname,
    });

    return (
        <div className={pageStyle.page}>
            <Header />

            <div className={pageStyle.page_children}>{children}</div>

            <Footer />
            <ReactScrollRestoration />

            <LoginForm />
        </div>
    );
}
