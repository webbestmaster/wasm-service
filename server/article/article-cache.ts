import path from "node:path";
import {cwd} from "node:process";

import {makeDirectory, tryToRemoveDirectory} from "../file/directory";
import {writeStringToFile} from "../util/file";

const cacheHtmlFileFolder = "article-cache";

const absolutePathHtmlFileFolder = path.join(cwd(), cacheHtmlFileFolder);

export async function clearCacheHtmlFileFolder(): Promise<void> {
    await tryToRemoveDirectory(absolutePathHtmlFileFolder);
    await makeDirectory(absolutePathHtmlFileFolder);
}

export async function makeCacheFile(slug: string, page: string): Promise<void> {
    return writeStringToFile(path.join(absolutePathHtmlFileFolder, `${slug}.html`), page);
}
