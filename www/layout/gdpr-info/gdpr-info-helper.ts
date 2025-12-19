/* global document */

import {getCookie} from "../../util/cookie";

const gdprCookieKey = "gdpr-cookie";

export function applyGdpr(): undefined {
    if (typeof document === "undefined") {
        return;
    }

    document.cookie = `${gdprCookieKey}=${gdprCookieKey}; path=/; max-age=36000000;`;
}

function getIsGdprApplied(): boolean {
    return typeof getCookie(gdprCookieKey) === "string";
}

export function getDefaultIsVisible(): boolean {
    if (typeof document === "undefined") {
        return false;
    }

    return !getIsGdprApplied();
}
