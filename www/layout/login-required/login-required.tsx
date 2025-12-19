import type {JSX} from "react";

import {LoginAsync} from "../../page/service/login/login-async";
import {useUserContext} from "../../provider/user/user-context";

type PropsType = Record<"children", JSX.Element>;

export function LoginRequired(props: PropsType): JSX.Element {
    const {children} = props;
    const {user} = useUserContext();

    return user.id === "" ? <LoginAsync /> : children;
}
