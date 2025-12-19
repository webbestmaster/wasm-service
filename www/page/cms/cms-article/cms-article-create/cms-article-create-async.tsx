import {type ComponentType, type JSX, lazy, Suspense} from "react";

import {LoginAdminRequired} from "../../../../layout/login-admin-required/login-admin-required";
import {Spinner} from "../../../../layout/spinner/spinner";
import type {LazyResultType} from "../../../../util/type";

const AsyncLazy = lazy<ComponentType<unknown>>(async (): Promise<LazyResultType<unknown>> => {
    const {CmsArticleCreate} = await import(
        /* webpackChunkName: 'page-cms-article-create' */
        "./cms-article-create"
    );

    return {"default": CmsArticleCreate};
});

export function CmsArticleCreateAsync(): JSX.Element {
    return (
        <LoginAdminRequired>
            <Suspense fallback={<Spinner position="absolute" />}>
                <AsyncLazy />
            </Suspense>
        </LoginAdminRequired>
    );
}
