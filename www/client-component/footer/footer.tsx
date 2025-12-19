import type {JSX} from "react";
import {Link} from "react-router-dom";

import {copyrightName} from "../../const";
import {getArticleLinkToViewClient} from "../article/article-helper";
import * as footerStyle from "./footer.scss";

export function Footer(): JSX.Element {
    return (
        <footer className={footerStyle.footer}>
            <p className={footerStyle.footer_copyright}>
                &copy;&nbsp;{copyrightName}&nbsp;{new Date().getFullYear()}.
            </p>
            <Link className={footerStyle.footer_link} to={getArticleLinkToViewClient("header-1")}>
                header 1
            </Link>
            <Link className={footerStyle.footer_link} to={getArticleLinkToViewClient("header-2")}>
                header 2
            </Link>
            <Link className={footerStyle.footer_link} to={getArticleLinkToViewClient("header-3")}>
                header 3
            </Link>
        </footer>
    );
}
