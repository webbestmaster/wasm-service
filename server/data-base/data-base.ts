import Ajv, {type JSONSchemaType} from "ajv";
import {Petsdb, type PetsdbItemType, type PetsdbQueryType, type PetsdbReadPageConfigType} from "petsdb";

import {makeDataBaseBackUp} from "./data-base-back-up";
import {dataBaseFolderPath} from "./data-base-const";
import type {CrudConfigOnChangeArgumentType, CrudConfigType, CrudType, PaginationResultType} from "./data-base-type";
import {getPartialData, makeBackUpFolder} from "./data-base-utility";

const ajv = new Ajv();

export function makeCrud<ModelType extends Readonly<Record<string, Readonly<unknown>>>>(
    crudConfig: CrudConfigType,
    modelJsonSchema: JSONSchemaType<ModelType>
): CrudType<ModelType> {
    const {dataBaseId, onChange, onInit} = crudConfig;
    const dataBaseFileName = `data-base.${dataBaseId}.db`;
    const dataBasePath = `${dataBaseFolderPath}/${dataBaseFileName}`;
    const onChangeData: CrudConfigOnChangeArgumentType = {
        dataBaseFileName,
        dataBaseId,
        dataBasePath,
    };

    async function handleDataBaseUpdate(): Promise<void> {
        await makeDataBaseBackUp(onChangeData);
        await onChange(onChangeData);
    }

    const dataBase = new Petsdb<ModelType>({
        dbPath: dataBasePath,
    });

    /*
    function count(): Promise<number> {
        return new Promise<number>((resolve: PromiseResolveType<number>) => {
            return resolve(dataBase.getSize());
        });
    }
*/

    async function findOne(query: PetsdbQueryType<ModelType>): Promise<PetsdbItemType<ModelType> | null> {
        return dataBase.readOne(query);
    }

    async function findMany(query: PetsdbQueryType<ModelType>): Promise<Array<PetsdbItemType<ModelType>>> {
        return dataBase.read(query);
    }

    async function findManyPagination(
        query: PetsdbQueryType<ModelType>,
        pageConfig: PetsdbReadPageConfigType<ModelType>
    ): Promise<PaginationResultType<ModelType>> {
        return dataBase.readPage(query, pageConfig);
    }

    async function findManyPaginationPartial(
        query: PetsdbQueryType<ModelType>,
        pageConfig: PetsdbReadPageConfigType<ModelType>,
        requiredPropertyList: Array<keyof ModelType>
    ): Promise<PaginationResultType<Partial<ModelType>>> {
        return findManyPagination(query, pageConfig).then(
            (paginationData: PaginationResultType<ModelType>): PaginationResultType<Partial<ModelType>> => {
                return {
                    ...paginationData,
                    list: paginationData.list.map<Partial<ModelType>>((data: ModelType): Partial<ModelType> => {
                        return getPartialData<ModelType>(data, requiredPropertyList);
                    }),
                };
            }
        );
    }

    // Throw error if smth wrong
    async function createOne(modelData: ModelType): Promise<null> {
        const modelJsonSchemaValidate = ajv.compile<ModelType>(modelJsonSchema);
        const isValid = modelJsonSchemaValidate(modelData);

        if (!isValid) {
            throw new Error(JSON.stringify(modelJsonSchemaValidate.errors ?? ""));
        }

        await dataBase.create(modelData);
        await handleDataBaseUpdate();
        return null;
    }

    // throw error if smth wrong
    async function updateOne(query: PetsdbQueryType<ModelType>, modelData: ModelType): Promise<null> {
        const modelJsonSchemaValidate = ajv.compile<ModelType>(modelJsonSchema);
        const isValid = modelJsonSchemaValidate(modelData);

        if (!isValid) {
            throw new Error(JSON.stringify(modelJsonSchemaValidate.errors ?? ""));
        }

        await dataBase.update(query, modelData);
        await handleDataBaseUpdate();

        return null;
    }

    // throw error if smth wrong
    async function deleteOne(query: PetsdbQueryType<ModelType>): Promise<null> {
        await dataBase.delete(query);
        await handleDataBaseUpdate();
        return null;
    }

    async function makeStructureSelfCheck(): Promise<void> {
        console.info(`Structure self check for ${dataBaseId} started`);

        const findAllQuery: Partial<ModelType> = {};

        const allRowList: ReadonlyArray<ModelType> = await findMany(findAllQuery);

        let hasError = false;

        allRowList.forEach((modelData: ModelType, index: number) => {
            const modelJsonSchemaValidate = ajv.compile<ModelType>(modelJsonSchema);
            const isValid = modelJsonSchemaValidate(modelData);

            console.info(
                `[INFO]: Validation database - ${dataBaseId}: ${Math.floor((index / allRowList.length) * 100)}%`
            );

            if (isValid) {
                return;
            }

            hasError = true;

            console.error("[ERROR]: makeCrud:");
            console.error("[ERROR]: makeCrud: model data");
            console.error(modelData);
            console.error("[ERROR]: makeCrud: errors:");
            console.error(modelJsonSchemaValidate.errors ?? "");

            /*
                await updateOne({slug:modelData.slug}, {
                    ...modelData,
                    titleImage: {
                        duration: 0, // in seconds
                        height: 0, // original height
                        name: '', // name of file
                        size: 0, // size of file in bytes
                        type: ArticleFileTypeEnum.unknown, // audio, image, etc.
                        width: 0, // original width
                    },
                    fileList: []
                });
            */
        });

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (hasError) {
            console.error(`[ERROR]: makeCrud: ${dataBaseId} has wrong data!`);
        } else {
            console.info(`[ OK ]: makeCrud: ${dataBaseId} all data correct!`);
        }

        console.info(`Structure self check for ${dataBaseId} finished`);
    }

    (async (): Promise<undefined> => {
        await dataBase.run();
        await makeBackUpFolder(dataBaseId);
        await makeDataBaseBackUp(onChangeData);
        await makeStructureSelfCheck();
        await onInit(onChangeData);
    })();

    return {
        // ignored count,
        createOne,
        deleteOne,
        findMany,
        findManyPagination,
        findManyPaginationPartial,
        // ignored findManyPartial,
        findOne,
        updateOne,
    };
}
