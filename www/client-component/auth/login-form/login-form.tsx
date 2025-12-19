import {type JSX, type SyntheticEvent, useCallback, useState} from "react";

import {apiUrl} from "../../../../server/const";
import {useUserContext} from "../../../provider/user/user-context";
import {loginUser, logoutUser, registerUser} from "../../../service/auth/auth-api";
import type {LoginResponseType} from "../../../service/auth/auth-type";
import {handleLogout, handleSuccessLogin} from "../../../service/auth/auth-utility";
import {throwError} from "../../../util/error";
import {useMakeExecutableState} from "../../../util/function";

export function LoginForm(): JSX.Element {
    const userContext = useUserContext();
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const loginHook = useMakeExecutableState<Parameters<typeof loginUser>, LoginResponseType>(loginUser);
    const logoutHook = useMakeExecutableState<Parameters<typeof logoutUser>, LoginResponseType>(logoutUser);
    const registerHook = useMakeExecutableState<Parameters<typeof registerUser>, LoginResponseType>(registerUser);
    const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

    const onHandleLogout = useCallback(
        (evt: SyntheticEvent<HTMLButtonElement>): void => {
            console.log(evt);
            evt.preventDefault();

            logoutHook
                .execute()
                .then((loginResponse: LoginResponseType) => {
                    const {user} = loginResponse;

                    userContext.setUser(user);
                    handleLogout();
                })
                .catch(throwError);
        },
        [logoutHook, userContext]
    );

    const onLoginSubmit = useCallback(
        (evt: SyntheticEvent<HTMLFormElement>) => {
            evt.preventDefault();

            loginHook
                .execute({login, password})
                .then((loginResponse: LoginResponseType) => {
                    const {user} = loginResponse;

                    userContext.setUser(user);
                    handleSuccessLogin();
                })
                .catch(throwError);
        },
        [login, password, loginHook, userContext]
    );

    const onRegisterSubmit = useCallback(
        (evt: SyntheticEvent<HTMLFormElement>) => {
            evt.preventDefault();

            registerHook
                .execute({email, login, password})
                .then((loginResponse: LoginResponseType) => {
                    const {user} = loginResponse;

                    console.log(loginResponse);

                    userContext.setUser(user);
                    handleSuccessLogin();
                })
                .catch((error: Error) => {
                    console.log(error);
                });
        },
        [registerHook, email, login, password, userContext]
    );

    if (userContext.user.login !== "") {
        return (
            <div>
                <p>you are logged in, the login is &quot;{userContext.user.login}&quot;</p>
                <button onClick={onHandleLogout} type="button">
                    logout
                </button>
            </div>
        );
    }

    if (isRegisterOpen) {
        return (
            <form action={apiUrl.register} onSubmit={onRegisterSubmit}>
                <pre>{JSON.stringify(userContext, null, 4)}</pre>
                <pre>{JSON.stringify(loginHook, null, 4)}</pre>

                <hr />
                <button
                    onClick={() => {
                        setIsRegisterOpen(false);
                    }}
                    type="button"
                >
                    to login
                </button>
                <hr />

                <label>
                    <p>login</p>
                    <input
                        onInput={(evt: SyntheticEvent<HTMLInputElement>): undefined => {
                            setLogin(evt.currentTarget.value);
                        }}
                        placeholder="login"
                        type="text"
                    />
                </label>
                <label>
                    <p>e-mail</p>
                    <input
                        onInput={(evt: SyntheticEvent<HTMLInputElement>): undefined => {
                            setEmail(evt.currentTarget.value);
                        }}
                        placeholder="e mail"
                        type="text"
                    />
                </label>
                <label>
                    <p>password</p>
                    <input
                        onInput={(evt: SyntheticEvent<HTMLInputElement>): undefined => {
                            setPassword(evt.currentTarget.value);
                        }}
                        placeholder="password"
                        type="text"
                    />
                </label>

                {loginHook.error ? <h3>ERROR login</h3> : "???"}

                <br />

                <button type="submit">submit</button>
            </form>
        );
    }

    return (
        <form action={apiUrl.login} onSubmit={onLoginSubmit}>
            <pre>{JSON.stringify(userContext, null, 4)}</pre>
            <pre>{JSON.stringify(loginHook, null, 4)}</pre>

            <hr />
            <button
                onClick={() => {
                    setIsRegisterOpen(true);
                }}
                type="button"
            >
                to registration
            </button>
            <hr />

            <label>
                <p>login</p>
                <input
                    onInput={(evt: SyntheticEvent<HTMLInputElement>): undefined => {
                        setLogin(evt.currentTarget.value);
                    }}
                    placeholder="login"
                    type="text"
                />
            </label>
            <label>
                <p>password</p>
                <input
                    onInput={(evt: SyntheticEvent<HTMLInputElement>): undefined => {
                        setPassword(evt.currentTarget.value);
                    }}
                    placeholder="password"
                    type="text"
                />
            </label>

            {loginHook.error ? <h3>ERROR login</h3> : "???"}

            <br />

            <button type="submit">submit</button>
        </form>
    );
}
