import {createReadStream, createWriteStream} from "node:fs";
import fileSystem from "node:fs/promises";
import path from "node:path";

import JSZip from "jszip";

import type {PromiseResolveType} from "../../www/util/promise";
import {sortStringCallbackReverse} from "../../www/util/string";
import {dataBaseBackUpPathAbsolute} from "./data-base-const";
import type {CrudConfigOnChangeArgumentType} from "./data-base-type";

async function removeOldDataBaseBackUp(dataBaseInfo: CrudConfigOnChangeArgumentType): Promise<void> {
    const {dataBaseId} = dataBaseInfo;

    const maxBackUpCount = 100;

    const fileList: Array<string> = await fileSystem.readdir(path.join(dataBaseBackUpPathAbsolute, dataBaseId));

    // new files at first
    const sortedFileNameList = fileList.toSorted(sortStringCallbackReverse);

    // all files after maxBackUpCount
    const extraFileNameList = sortedFileNameList.slice(maxBackUpCount);

    await Promise.all(
        extraFileNameList.map(async (fileNameToRemove: string): Promise<void> => {
            const pathToFile = path.join(dataBaseBackUpPathAbsolute, dataBaseId, fileNameToRemove);

            return fileSystem.unlink(pathToFile);
        })
    ).catch((error: Error): void => {
        console.log("[ERROR]: removeOldDataBaseBackUp:", error.message);
    });
}

export async function makeDataBaseBackUp(dataBaseInfo: CrudConfigOnChangeArgumentType): Promise<void> {
    await removeOldDataBaseBackUp(dataBaseInfo);

    const {dataBaseFileName, dataBasePath, dataBaseId} = dataBaseInfo;
    const zip = new JSZip();
    const fileNamePrefix = new Date().toISOString().replace(/[:tz]+/giu, "-");
    const backupFileName = path.join(
        dataBaseBackUpPathAbsolute,
        dataBaseId,
        `${fileNamePrefix}${dataBaseFileName}.zip`
    );

    await new Promise((resolve: PromiseResolveType<void>, reject: PromiseResolveType<Error>) => {
        zip.file(dataBaseFileName, createReadStream(dataBasePath))
            .generateNodeStream({compression: "DEFLATE", streamFiles: true})
            .pipe(createWriteStream(backupFileName))
            .on("close", resolve)
            .on("error", reject);
    });

    console.info(`[ OK ]: makeDataBaseBackUp - done, data base id: ${dataBaseId}`);
}
