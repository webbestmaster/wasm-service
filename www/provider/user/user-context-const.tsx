import {noop} from "../../util/function";
import {type UserContextType, UserRoleEnum} from "./user-context-type";

export const defaultUserContext: UserContextType = {
    isInProgressAutoLogin: false,
    setUser: noop,
    user: {
        id: "",
        login: "",
        role: UserRoleEnum.user,
    },
};
