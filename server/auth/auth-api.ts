import type {FastifyReply, FastifyRequest} from "fastify";

import {UserRoleEnum} from "../../www/provider/user/user-context-type";
import type {LoginResponseType} from "../../www/service/auth/auth-type";
import {getRandomString} from "../../www/util/string";
import {mainResponseHeader} from "../const";
import {getSha256HashServer} from "../util/string";
import {authCrud} from "./auth";
import {CookieFieldEnum} from "./auth-const";

export async function postAuthLogin(
    request: FastifyRequest<{Body?: string}>,
    reply: FastifyReply
): Promise<LoginResponseType> {
    const {body, session} = request;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedData: Record<string, unknown> = JSON.parse(body ?? "{}");

    const {login, password} = parsedData;

    if (typeof login !== "string" || typeof password !== "string") {
        reply.code(400);

        throw new Error("Login or password is not define.");
    }

    const user = await authCrud.findOne({login, password: getSha256HashServer(password)});

    if (!user) {
        reply.code(400);

        throw new Error("User Not Found.");
    }

    session.set(CookieFieldEnum.userId, user.id);
    session.options({maxAge: 1000 * 60 * 60});

    const loginResponse: LoginResponseType = {
        errorList: [],
        user: {
            id: user.id,
            login: user.login,
            role: user.role,
        },
    };

    reply.code(200).header(...mainResponseHeader);

    return loginResponse;
}

export async function getAutoAuthLogin(request: FastifyRequest, reply: FastifyReply): Promise<LoginResponseType> {
    const defaultLoginResponse: LoginResponseType = {
        errorList: [],
        user: {id: "", login: "", role: UserRoleEnum.user},
    };
    const {session} = request;
    const userId = session.get(CookieFieldEnum.userId) ?? "";

    reply.header(...mainResponseHeader);

    if (!userId) {
        reply.code(200);

        return defaultLoginResponse;
    }

    const user = await authCrud.findOne({id: userId});

    if (!user) {
        reply.code(200);

        return defaultLoginResponse;
    }

    const loginResponse: LoginResponseType = {
        errorList: [],
        user: {
            id: user.id,
            login: user.login,
            role: user.role,
        },
    };

    session.set(CookieFieldEnum.userId, user.id);
    session.options({maxAge: 1000 * 60 * 60});

    reply.code(200);

    return loginResponse;
}

export function postAuthLogout(request: FastifyRequest<{Body?: string}>, reply: FastifyReply): LoginResponseType {
    const {session} = request;

    session.set(CookieFieldEnum.userId, "");

    const loginResponse: LoginResponseType = {
        errorList: [],
        user: {
            id: "",
            login: "",
            role: UserRoleEnum.user,
        },
    };

    reply.header(...mainResponseHeader);

    return loginResponse;
}

export async function postAuthRegister(
    request: FastifyRequest<{Body?: string}>,
    reply: FastifyReply
): Promise<LoginResponseType> {
    const {body, session} = request;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const parsedData: Record<string, unknown> = JSON.parse(body ?? "{}");

    const {login, password, email} = parsedData;

    if (typeof email !== "string" || typeof login !== "string" || typeof password !== "string") {
        reply.code(400).header(...mainResponseHeader);

        const registerErrorResponse: LoginResponseType = {
            errorList: [
                {
                    langKey: "SEARCH__NOTHING_FOUND",
                    langValue: {},
                },
            ],
            user: {
                id: "",
                login: "",
                role: UserRoleEnum.user,
            },
        };

        return registerErrorResponse;

        // Throw new Error("Login, email or password is not define.");
    }

    const userInDataBase = await authCrud.findOne({login});

    if (userInDataBase) {
        reply.code(400).header(...mainResponseHeader);

        const registerErrorResponse: LoginResponseType = {
            errorList: [
                {
                    langKey: "EMPTY__THERE_IS_NOTHING_HERE_YET",
                    langValue: {},
                },
            ],
            user: {
                id: "",
                login: "",
                role: UserRoleEnum.user,
            },
        };

        return registerErrorResponse;
    }

    const createdUserId: string = getRandomString();

    await authCrud.createOne({
        id: createdUserId,
        login,
        password: getSha256HashServer(password),
        role: UserRoleEnum.user,
    });

    session.set(CookieFieldEnum.userId, createdUserId);
    session.options({maxAge: 1000 * 60 * 60});

    const loginResponse: LoginResponseType = {
        errorList: [],
        user: {
            id: createdUserId,
            login,
            role: UserRoleEnum.user,
        },
    };

    reply.code(200).header(...mainResponseHeader);

    return loginResponse;
}
