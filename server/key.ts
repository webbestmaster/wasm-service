import {env} from "node:process";

import dotenv from "dotenv";

function innerInitialization(): undefined {
    dotenv.config();
}

innerInitialization();

const {SHA_256_KEY, SECRET_KEY} = env;

export const sha256key: string = (SHA_256_KEY ?? "").trim();
export const secretKey: string = (SECRET_KEY ?? "").trim();

if (sha256key === "") {
    console.error("[ERROR]: auth - sha256key is not defined!");
}

if (secretKey === "") {
    console.error("[ERROR]: auth - secretKey is not defined!");
}
