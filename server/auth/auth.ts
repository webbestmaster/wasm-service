import {makeCrud} from "../data-base/data-base";
import type {CrudConfigOnChangeArgumentType} from "../data-base/data-base-type";
import type {AuthUserType} from "./auth-type";
import {authUserSchema} from "./auth-validation";

export const authCrud = makeCrud<AuthUserType>(
    {
        dataBaseId: "user",
        // eslint-disable-next-line @typescript-eslint/require-await
        onChange: async (data: CrudConfigOnChangeArgumentType): Promise<void> => {
            console.log("update auth DB");
            console.log(data);
        },
        // eslint-disable-next-line @typescript-eslint/require-await
        onInit: async (data: CrudConfigOnChangeArgumentType): Promise<void> => {
            console.log("onInit auth DB");
            console.log(data);
        },
    },
    authUserSchema
);

/*
authCrud.createOne({
    id: 'some-user-id',
    login: 'the-admin',
    password: getSha256Hash('123456'),
    role: UserRoleEnum.admin,
});
*/
