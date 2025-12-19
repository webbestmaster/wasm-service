import {hasSuccessLoginLocalStorageKey, hasSuccessLoginLocalStorageValue} from "./auth-const";

export function getIsNeedAutologin(): boolean {
    const value: string = (localStorage.getItem(hasSuccessLoginLocalStorageKey) ?? "").trim();

    return value === hasSuccessLoginLocalStorageValue;
}

export function handleSuccessLogin(): undefined {
    localStorage.setItem(hasSuccessLoginLocalStorageKey, hasSuccessLoginLocalStorageValue);
}

export function handleLogout(): undefined {
    localStorage.removeItem(hasSuccessLoginLocalStorageKey);
}
