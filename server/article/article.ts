import {makeCrud} from "../data-base/data-base";
import type {CrudConfigOnChangeArgumentType} from "../data-base/data-base-type";
import {updateSiteMapXml} from "../sitemap/sitemap";
import {clearCacheHtmlFileFolder} from "./article-cache";
import type {ArticleType} from "./article-type";
import {makeArticleSchema} from "./article-validation";

export const articleCrud = makeCrud<ArticleType>(
    {
        dataBaseId: "article",
        onChange: async (crudConfigOnChange: CrudConfigOnChangeArgumentType): Promise<void> => {
            console.log("update article DB");
            console.log("crudConfigOnChange", crudConfigOnChange);

            await clearCacheHtmlFileFolder();
            await updateSiteMapXml(articleCrud);
        },
        onInit: async (crudConfigOnChange: CrudConfigOnChangeArgumentType): Promise<void> => {
            console.log("onInit article DB");
            console.log("crudConfigOnChange", crudConfigOnChange);

            await clearCacheHtmlFileFolder();
            await updateSiteMapXml(articleCrud);
        },
    },
    makeArticleSchema()
);
