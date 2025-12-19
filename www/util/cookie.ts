/* global document */

import {makeSafeRegExpPatter} from "./regexp";

type SetCookieOptionsType = Record<string, Date | boolean | number | string | null>;

export function getCookie(name: string): string | null {
    const matches = new RegExp(`(?:^|; )${makeSafeRegExpPatter(name)}=([^;]*)`, "u").exec(document.cookie);

    return matches ? decodeURIComponent(matches[1]) : null;
}

export function setCookie(name: string, value: string, rawOptions: SetCookieOptionsType = {}): void {
    const options = {
        // The path: '/',
        ...rawOptions,
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    Object.keys(options).forEach((optionKey: string) => {
        updatedCookie += `; ${optionKey}`;
        const optionValue = options[optionKey];

        if (optionValue !== true) {
            updatedCookie += `=${String(optionValue)}`;
        }
    });

    document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
    setCookie(name, "", {"max-age": -1});
}
