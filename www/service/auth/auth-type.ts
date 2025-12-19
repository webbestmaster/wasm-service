import type {LangKeyType} from "../../provider/locale/translation/type";
import type {UserRoleEnum} from "../../provider/user/user-context-type";

export interface LoginResponseType {
    errorList: Array<{langKey: LangKeyType; langValue: Record<string, string>}>;
    user: {
        id: string;
        login: string;
        role: UserRoleEnum;
    };
}
