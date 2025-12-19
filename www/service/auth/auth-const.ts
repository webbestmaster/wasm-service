import type {JSONSchemaType} from "ajv";

import type {LoginResponseType} from "./auth-type";

export const loginResponseSchema: JSONSchemaType<LoginResponseType> = {
    additionalProperties: false,
    properties: {
        errorList: {
            items: {
                properties: {
                    langKey: {
                        type: "string",
                    },
                    langValue: {
                        additionalProperties: {type: "string"},
                        required: [],
                        type: "object",
                    },
                },
                required: ["langKey", "langValue"],
                type: "object",
            },
            type: "array",
        },
        user: {
            properties: {
                id: {type: "string"},
                login: {type: "string"},
                role: {type: "string"},
            },
            required: ["id", "login", "role"],
            type: "object",
        },
    },
    required: ["user", "errorList"],
    type: "object",
};

export const hasSuccessLoginLocalStorageKey = "auth-has-success-login-key-v.1.0";
export const hasSuccessLoginLocalStorageValue = "auth-has-success-login-value-v.1.0";
