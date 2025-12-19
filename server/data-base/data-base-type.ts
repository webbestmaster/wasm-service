import type {PetsdbItemType, PetsdbQueryType, PetsdbReadPageConfigType} from "petsdb";

export interface CrudConfigOnChangeArgumentType {
    readonly dataBaseFileName: string;
    readonly dataBaseId: string;
    readonly dataBasePath: string;
}

export interface CrudConfigType {
    readonly dataBaseId: string;
    readonly onChange: (data: CrudConfigOnChangeArgumentType) => Promise<void>;
    readonly onInit: (data: CrudConfigOnChangeArgumentType) => Promise<void>;
}

export interface RegExpQueryType {
    $regex: string; // Operators ($lt, $lte, $gt, $gte, $in, $nin, $ne, $exists, $regex)
    $regexFlag: string; // 'g' | 'gi' | 'i';
}

export interface PaginationResultType<ModelType extends Readonly<Record<string, unknown>>> {
    list: ReadonlyArray<ModelType>;
    pageIndex: number;
    pageSize: number;
    sort: Record<string, unknown>;
    totalItemCount: number;
    totalPageCount: number;
}

export interface CrudType<ModelType extends Record<string, unknown>> {
    createOne: (model: ModelType) => Promise<null>; // throw error if smth wrong
    deleteOne: (query: PetsdbQueryType<ModelType>) => Promise<null>; // throw error if smth wrong
    findMany: (query: PetsdbQueryType<ModelType>) => Promise<Array<PetsdbItemType<ModelType>>>;
    findManyPagination: (
        query: PetsdbQueryType<ModelType>,
        pageConfig: PetsdbReadPageConfigType<ModelType>
    ) => Promise<PaginationResultType<ModelType>>;
    findManyPaginationPartial: (
        query: PetsdbQueryType<ModelType>,
        pageConfig: PetsdbReadPageConfigType<ModelType>,
        requiredPropertyList: Array<keyof ModelType>
    ) => Promise<PaginationResultType<Partial<ModelType>>>;
    findOne: (query: PetsdbQueryType<ModelType>) => Promise<PetsdbItemType<ModelType> | null>;
    updateOne: (query: PetsdbQueryType<ModelType>, model: ModelType) => Promise<null>; // throw error if smth wrong
}

/*
export enum SortDirectionEnum {
    asc = 'asc',
    desc = 'desc',
}
*/

/*
export type GetListPaginationArgumentType = {
    needShowInactive: boolean;
    pageIndex: number; // start with 0
    pageSize: number;
    sortBy: string;
    sortDirection: SortDirectionEnum;
};
*/

/*
export type GetListPaginationResultType<ItemType> = GetListPaginationArgumentType & {
    allItemCount: number;
    itemList: Array<ItemType>;
};
*/

export interface PaginationQueryType<ModelType extends Record<string, unknown>> {
    pageConfig: PetsdbReadPageConfigType<ModelType>;
    query: PetsdbQueryType<ModelType>;
}

/*
export type PaginationResultType<ModelType> = {
    count: number;
    pageIndex: number;
    pageSize: number;
    result: Array<ModelType>;
};
*/
