/* eslint-disable sort-keys */

export interface AppRoutType {
    path: string;
}

export const appRoute = {
    // Client
    root: {
        path: "/",
    },

    // Client
    article: {
        path: "/article/:slug" as const,
    },

    // CMS
    articleList: {
        path: "/cms/article-list",
    },

    // CMS
    articleTree: {
        path: "/cms/article-tree",
    },

    // CMS
    articleCreate: {
        path: "/cms/article-create",
    },

    // CMS
    articleEdit: {
        // `as const` is required for TS validation of useParams and generatePath of react-router-dom
        path: "/cms/article-edit/:articleId" as const,
    },

    // Service
    login: {
        path: "/login",
    },
};
