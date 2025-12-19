/* global localStorage, navigator */

import {localeConst} from "./locale-context-const";
import {LocaleNameEnum} from "./locale-context-type";

export function getSavedLocaleName(): LocaleNameEnum {
    const localeNameList = Object.values(LocaleNameEnum);
    const defaultLocaleName = localeConst.defaults.localeName;

    if (typeof localStorage === "undefined" || typeof navigator === "undefined") {
        return defaultLocaleName;
    }

    const savedLocaleName = localStorage.getItem(localeConst.key.localStorage.localeName);

    for (const localeNameInList of localeNameList) {
        if (localeNameInList === savedLocaleName) {
            return localeNameInList;
        }
    }

    return defaultLocaleName;
}

export function saveLocaleName<LocaleName extends string>(localeName: LocaleName): LocaleName {
    console.log("---> save localeName localStorage:", localeConst.key.localStorage.localeName, localeName);
    localStorage.setItem(localeConst.key.localStorage.localeName, localeName);

    return localeName;
}
