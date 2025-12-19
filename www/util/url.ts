/* global URLSearchParams, location */
import type {PetsdbQueryType, PetsdbReadPageConfigType} from "petsdb";
import {generatePath as reactRouterGeneratePath} from "react-router-dom";

import type {ArticleType} from "../../server/article/article-type";

// eslint-disable-next-line id-length
export function paginationQueryToURLSearchParameters<DataType extends Record<string, unknown>>(
    query: PetsdbQueryType<DataType>,
    pageConfig: PetsdbReadPageConfigType<ArticleType>,
    pick: Array<keyof DataType>
): URLSearchParams {
    return new URLSearchParams({
        pageConfig: encodeURIComponent(JSON.stringify(pageConfig)),
        pick: encodeURIComponent(JSON.stringify(pick)),
        query: encodeURIComponent(JSON.stringify(query)),
    });
}

export type ExtractPathDataType<StringConstType> = StringConstType extends `${string}:${infer KeyNames}/${infer Rest}`
    ? ExtractPathDataType<Rest> & Record<KeyNames, string>
    : StringConstType extends `${string}:${infer KeyNames}`
      ? ExtractPathDataType<string> & Record<KeyNames, string>
      : Record<never, string>;

export type ExtractPathKeysType<StringConstType> = keyof ExtractPathDataType<StringConstType>;

// Just workaround for react-router-dom, should be the same as ExtractPathDataType, but use Record<string, string> in the and
type RouterPathDataType<StringConstType> = StringConstType extends `${string}:${infer KeyNames}/${infer Rest}`
    ? ExtractPathDataType<Rest> & Record<KeyNames, string>
    : StringConstType extends `${string}:${infer KeyNames}`
      ? ExtractPathDataType<string> & Record<KeyNames, string>
      : Record<string, string>;

export function generatePath<PathType extends string>(
    rawPath: PathType,
    pathData: ExtractPathDataType<PathType>
): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const pathDataForRouter: RouterPathDataType<PathType> = JSON.parse(JSON.stringify(pathData));

    return reactRouterGeneratePath(rawPath, pathDataForRouter);
}

export function getNeedUseThirdPartyServices(): boolean {
    return !(typeof location === "undefined" || location.hostname === "localhost");
}
