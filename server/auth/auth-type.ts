import type {UserRoleEnum} from "../../www/provider/user/user-context-type";
import type {CookieFieldEnum} from "./auth-const";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AuthUserType = {
    _id?: string;
    id: string;
    login: string;
    password: string;
    role: UserRoleEnum;
};

declare module "@fastify/secure-session" {
    /*
     * Original is below
     * interface SessionData {
     *     "user": string;
     * }
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    type SessionData = Record<CookieFieldEnum, string>;
}
