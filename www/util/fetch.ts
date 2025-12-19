/* global fetch, HeadersInit, FormData, Response, File */

import type {JSONSchemaType} from "ajv";

import {getExpectedStructure} from "./object";

export const enum FetchMethodEnum {
    delete = "DELETE",
    get = "GET",
    patch = "PATCH",
    post = "POST",
    put = "PUT",
}

interface OptionsType {
    // Body data type must match "Content-Type" header
    body?: File | FormData | string;
    // Options: include, same-origin, omit (default: same-origin)
    credentials?: "include" | "omit" | "same-origin";
    headers?: HeadersInit;
    // Options: GET, POST, PUT, DELETE, etc. (default: GET)
    method?: FetchMethodEnum;
    // Options: no-cors, cors, same-origin (default: same-origin)
    mode?: "cors" | "no-cors" | "same-origin";
    /**
     * Additional option
     * cache?: 'default'; // default, no-cache, reload, force-cache, only-if-cached (default: default)
     *  headers?: {
     *      'Access-Control-Allow-Headers'?: '*',
     *      Accept?: 'application/json, text/javascript, *!/!*; q=0.01',
     *      'Content-Type'?: 'application/x-www-form-urlencoded; charset=UTF-8',
     *  },
     *  redirect?: 'follow'; // manual, follow, error (default: follow)
     *  referrer?: 'no-referrer'; // no-referrer, client (default: client)
     */
}

type FetchCacheType = Record<string, Promise<unknown> | null>;

const fetchCache: FetchCacheType = {};

function invalidateCache(options?: OptionsType): undefined {
    const {method = FetchMethodEnum.get} = options ?? {};

    if (method === FetchMethodEnum.get) {
        return;
    }

    Object.keys(fetchCache).forEach((key: string) => {
        fetchCache[key] = null;
    });
}

function fetchEndCallBack(fetchBeginTimeStamp: number, url: string): undefined {
    // 2 seconds
    const maxFetchingTime = 2e3;
    const fetchEndTimeStamp = Date.now();
    const fetchingTime = fetchEndTimeStamp - fetchBeginTimeStamp;

    if (fetchingTime > maxFetchingTime) {
        console.log(`%c[WARNING]: "${url}" took %c${fetchingTime / 1e3}s`, "color: #00c", "color: #c00");
    }
}

export async function fetchX<ExpectedResponseType>(
    url: string,
    jsonSchema: JSONSchemaType<ExpectedResponseType>,
    options?: OptionsType
): Promise<ExpectedResponseType> {
    invalidateCache(options);

    const cacheProperty = `${url} - ${JSON.stringify(options ?? "[empty]")}`;

    const savedPromiseResult: Promise<unknown> | null = fetchCache[cacheProperty];

    if (savedPromiseResult) {
        console.log(
            `%c[fetchX]: [CACHE]\n> url: ${url},\n> options: ${JSON.stringify(options ?? "[empty]")}`,
            "color: #0a0"
        );

        return savedPromiseResult
            .then((data: unknown): ExpectedResponseType => {
                return getExpectedStructure<ExpectedResponseType>(data, jsonSchema);
            })
            .catch((error: Error) => {
                fetchCache[cacheProperty] = null;
                console.error(error);

                throw error;
            });
    }

    const fetchBeginTimeStamp = Date.now();

    const fetchResult: Promise<ExpectedResponseType> = fetch(url, options)
        .then(async (response: Response): Promise<unknown> => {
            return response.json();
        })
        .then((data: unknown): ExpectedResponseType => {
            const checkedData: ExpectedResponseType = getExpectedStructure<ExpectedResponseType>(data, jsonSchema);

            fetchEndCallBack(fetchBeginTimeStamp, url);

            return checkedData;
        })
        .catch((error: Error) => {
            fetchEndCallBack(fetchBeginTimeStamp, url);

            fetchCache[cacheProperty] = null;
            console.error(error);

            throw error;
        });

    fetchCache[cacheProperty] = fetchResult;

    return fetchResult;
}

export type FetchArgumentsType<ResultType> = Parameters<typeof fetchX<ResultType>>;
