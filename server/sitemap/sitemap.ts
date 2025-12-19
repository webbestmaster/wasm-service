import path from "node:path";
import {cwd} from "node:process";

import type {ArticleType} from "../article/article-type";
import type {CrudType} from "../data-base/data-base-type";
import {writeStringToFile} from "../util/file";
import {getSiteMapImgXml} from "./sitemap-img-xml";
import {getSiteMapXml} from "./sitemap-xml";

export async function updateSiteMapXml(articleCrud: CrudType<ArticleType>): Promise<void> {
    const articleList: Array<ArticleType> = await articleCrud.findMany({isActive: true, isInSiteMapXmlSeo: true});

    const siteMapXml = getSiteMapXml(articleList);

    await writeStringToFile(path.join(cwd(), "dist", "sitemap.xml"), siteMapXml);

    const siteMapXmlImg = getSiteMapImgXml(articleList);

    await writeStringToFile(path.join(cwd(), "dist", "sitemap-img.xml"), siteMapXmlImg);

    console.log("[updateSiteMapXml]: done");
}
