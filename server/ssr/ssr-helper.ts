import type {FastifyRequest} from "fastify";

import {getStringFromUnknown} from "../../www/util/type";
import type {GetHtmlCallBackRequestType} from "./ssr-type";

export function getHtmlCallBackRequest(request: FastifyRequest<{Params: {slug?: string}}>): GetHtmlCallBackRequestType {
    const {params, raw} = request;
    const slug = getStringFromUnknown(params, "slug");
    const url = raw.url ?? "";

    return {slug, url};
}
