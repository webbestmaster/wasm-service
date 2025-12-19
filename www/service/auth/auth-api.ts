import {apiUrl} from "../../../server/const";
import {FetchMethodEnum, fetchX} from "../../util/fetch";
import {loginResponseSchema} from "./auth-const";
import type {LoginResponseType} from "./auth-type";

export async function loginUser(userData: Record<"login" | "password", string>): Promise<LoginResponseType> {
    return fetchX<LoginResponseType>(apiUrl.login, loginResponseSchema, {
        body: JSON.stringify(userData),
        method: FetchMethodEnum.post,
    });
}

export async function logoutUser(): Promise<LoginResponseType> {
    return fetchX<LoginResponseType>(apiUrl.logout, loginResponseSchema, {
        body: JSON.stringify({}),
        method: FetchMethodEnum.post,
    });
}

export async function registerUser(
    userData: Record<"email" | "login" | "password", string>
): Promise<LoginResponseType> {
    return fetchX<LoginResponseType>(apiUrl.register, loginResponseSchema, {
        body: JSON.stringify(userData),
        method: FetchMethodEnum.post,
    });
}

export async function getAutoAuthLogin(): Promise<LoginResponseType> {
    return fetchX<LoginResponseType>(apiUrl.getUser, loginResponseSchema, {
        credentials: "include",
        method: FetchMethodEnum.get,
    });
}
