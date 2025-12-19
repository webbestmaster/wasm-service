/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type {FastifyReply, FastifyRequest} from "fastify";
import {
    type ExecutionResult,
    graphql,
    GraphQLBoolean,
    // type ExecutionResult,
    // GraphQLNonNull,
    GraphQLEnumType,
    type GraphQLFieldConfig,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    type GraphQLResolveInfo,
    GraphQLSchema,
    GraphQLString,
} from "graphql";
import type {PetsdbQueryType, PetsdbReadPageConfigType} from "petsdb";

import {mainResponseHeader} from "../const";
import {defaultPaginationQuery} from "../data-base/data-base-const";
import type {PaginationResultType} from "../data-base/data-base-type";
import {articleCrud} from "./article";
import {
    type ArticleFileType,
    ArticleFileTypeEnum,
    type ArticleType,
    ArticleTypeEnum,
    type ParsedGraphQlRequestQueryType,
    SubDocumentListViewTypeEnum,
} from "./article-type";
import {tryQueryStringToRegExp} from "./article-utility";

export interface ArticlePaginationGraphQlType {
    data: {articlePagination: PaginationResultType<Partial<ArticleType>>};
}

type ListTypeContextValueType = Record<string, unknown>;

interface ListTypeRootValueType {
    pagination: ParsedGraphQlRequestQueryType["pagination"];
    query: ParsedGraphQlRequestQueryType["query"];
}

type ListTypeArgumentsType = Record<string, unknown>;

const articleTypeEnumValueMap: Record<keyof typeof ArticleTypeEnum, {value: ArticleTypeEnum}> = {
    article: {value: ArticleTypeEnum.article},
    audioChildrenList: {value: ArticleTypeEnum.audioChildrenList},
    audioList: {value: ArticleTypeEnum.audioList},
    audioSingle: {value: ArticleTypeEnum.audioSingle},
    container: {value: ArticleTypeEnum.container},
};

const ArticleTypeEnumGraphQLType = new GraphQLEnumType({
    name: "ArticleTypeEnum",
    values: articleTypeEnumValueMap,
});

// eslint-disable-next-line id-length
const subDocumentListViewTypeEnumValueMap: Record<
    keyof typeof SubDocumentListViewTypeEnum,
    {value: SubDocumentListViewTypeEnum}
> = {
    header: {
        value: SubDocumentListViewTypeEnum.header,
    },
    headerImage: {
        value: SubDocumentListViewTypeEnum.headerImage,
    },
};

// eslint-disable-next-line id-length
const SubDocumentListViewTypeEnumGraphQLType = new GraphQLEnumType({
    name: "SubDocumentListViewTypeEnum",
    values: subDocumentListViewTypeEnumValueMap,
});

const articleFileTypeEnumValueMap: Record<keyof typeof ArticleFileTypeEnum, {value: ArticleFileTypeEnum}> = {
    audio: {value: ArticleFileTypeEnum.audio},
    image: {value: ArticleFileTypeEnum.image},
    unknown: {value: ArticleFileTypeEnum.unknown},
    video: {value: ArticleFileTypeEnum.video},
};

const ArticleFileTypeEnumGraphQLType = new GraphQLEnumType({
    name: "ArticleFileTypeEnum",
    values: articleFileTypeEnumValueMap,
});

const ArticleFileGraphQLType: GraphQLObjectType<ArticleFileType, unknown> = new GraphQLObjectType<
    ArticleFileType,
    unknown
>({
    fields: {
        duration: {type: GraphQLFloat}, // in seconds
        height: {type: GraphQLInt}, // original height
        name: {type: GraphQLString}, // name of file
        size: {type: GraphQLInt}, // size of file in bytes
        title: {type: GraphQLString}, // human read able title
        type: {type: ArticleFileTypeEnumGraphQLType}, // audio, image, etc.
        width: {type: GraphQLInt}, // original width
    },
    name: "ArticleFileGraphQLType",
});

const ArticleGraphQLType: GraphQLObjectType<ArticleType, unknown> = new GraphQLObjectType<ArticleType, unknown>({
    fields: {
        articleType: {type: ArticleTypeEnumGraphQLType},
        content: {type: GraphQLString},
        createdDate: {type: GraphQLString},
        description: {type: GraphQLString},
        descriptionShort: {type: GraphQLString},
        fileList: {type: new GraphQLList(ArticleFileGraphQLType)},
        hasMetaRobotsNoFollowSeo: {type: GraphQLBoolean}, // Add/combine <meta name="robots" content="nofollow"/>
        hasMetaRobotsNoIndexSeo: {type: GraphQLBoolean}, // Add/combine <meta name="robots" content="noindex"/> and add X-Robots-Tag: noindex
        id: {type: GraphQLString},
        isActive: {type: GraphQLBoolean}, // actually temporary "removed"
        isInSiteMapXmlSeo: {type: GraphQLBoolean}, // has sitemap.xml link to article or not
        metaDescriptionSeo: {type: GraphQLString}, // tag <meta name="description" content="....." />
        metaKeyWordsSeo: {type: GraphQLString}, // tag <meta name="keywords" content="....." />
        metaSeo: {type: GraphQLString}, // actually any html code
        publishDate: {type: GraphQLString},
        slug: {type: GraphQLString},
        staffArtistList: {type: new GraphQLList(GraphQLString)},
        staffAuthorList: {type: new GraphQLList(GraphQLString)},
        staffCompositorList: {type: new GraphQLList(GraphQLString)},
        staffDirectorList: {type: new GraphQLList(GraphQLString)},
        staffIllustratorList: {type: new GraphQLList(GraphQLString)},
        staffReaderList: {type: new GraphQLList(GraphQLString)},
        subDocumentIdList: {type: new GraphQLList(GraphQLString)},
        subDocumentListViewType: {type: SubDocumentListViewTypeEnumGraphQLType},
        tagList: {type: new GraphQLList(GraphQLString)},
        tagTitleSeo: {type: GraphQLString}, // tag <title>....</title>
        title: {type: GraphQLString},
        titleImage: {type: ArticleFileGraphQLType},
        updatedDate: {type: GraphQLString},
    },
    name: "ArticleGraphQLType",
});

type ArticlePaginationSortType = Record<string, {type: typeof GraphQLInt}>;

const ArticlePaginationSortGraphQLType: GraphQLObjectType<ArticlePaginationSortType, unknown> = new GraphQLObjectType<
    ArticlePaginationSortType,
    unknown
>({
    fields: Object.keys(ArticleGraphQLType.getFields()).reduce<ArticlePaginationSortType>(
        (accumulator: ArticlePaginationSortType, key: string): ArticlePaginationSortType => {
            accumulator[key] = {type: GraphQLInt};
            return accumulator;
        },
        {}
    ),
    name: "ArticlePaginationSortGraphQLType",
});

const ArticlePaginationGraphQLType: GraphQLObjectType<
    PaginationResultType<ArticleType>,
    unknown
> = new GraphQLObjectType<PaginationResultType<ArticleType>, unknown>({
    fields: {
        list: {type: new GraphQLList(ArticleGraphQLType)},
        pageIndex: {type: GraphQLInt},
        pageSize: {type: GraphQLInt},
        sort: {type: ArticlePaginationSortGraphQLType},
        totalItemCount: {type: GraphQLInt},
        totalPageCount: {type: GraphQLInt},
    },
    name: "ArticlePaginationGraphQLType",
});

const ArticlePaginationResolver: GraphQLFieldConfig<
    ListTypeRootValueType,
    ListTypeContextValueType,
    ListTypeArgumentsType
> = {
    args: {
        // limit: {
        //     type: GraphQLInt,
        // },
        // start: {
        //     type: GraphQLInt,
        // },
    },
    // eslint-disable-next-line @typescript-eslint/max-params
    resolve: async (
        // root value type => "GraphQLObjectType<Record<string, string>"
        rootValue: ListTypeRootValueType,

        args: ListTypeArgumentsType,

        context: ListTypeContextValueType,

        graphQLType: GraphQLResolveInfo
    ): Promise<PaginationResultType<ArticleType>> => {
        console.warn("------------");
        console.warn(rootValue);
        console.warn(args);
        console.warn(context);
        console.warn(graphQLType);

        const articleList: PaginationResultType<ArticleType> = await articleCrud.findManyPagination(
            rootValue.query,
            rootValue.pagination
        );

        return articleList;
    },
    type: ArticlePaginationGraphQLType,
};

// Construct a schema, using GraphQL schema language
const articlePaginationSchema: GraphQLSchema = new GraphQLSchema({
    query: new GraphQLObjectType<ListTypeRootValueType, ListTypeContextValueType>({
        fields: {
            articlePagination: ArticlePaginationResolver,
        },
        name: "articlePaginationSchema",
    }),
});

function parseGraphQlRequestQuery(request: FastifyRequest): ParsedGraphQlRequestQueryType {
    const {pagination, source, query}: Record<"pagination" | "source" | "query", string> = {
        pagination: JSON.stringify(defaultPaginationQuery),
        query: JSON.stringify({}),
        source: "",
        ...Object(request.query),
    };

    const paginationParsed: PetsdbReadPageConfigType<ArticleType> = JSON.parse(pagination);
    const queryParsed: PetsdbQueryType<ArticleType> = JSON.parse(query);

    // eslint-disable-next-line guard-for-in
    for (const queryKey in queryParsed) {
        const queryValue = {...queryParsed}[queryKey];

        if (typeof queryValue === "string") {
            Object.assign(queryParsed, {[queryKey]: tryQueryStringToRegExp(queryValue)});
        }
    }

    return {
        pagination: paginationParsed,
        query: queryParsed,
        source,
    };
}

async function getArticlePaginationGraphQl(
    parsedGraphQlRequestQuery: ParsedGraphQlRequestQueryType
    // ): Promise<ArticlePaginationGraphQlType> {
): Promise<ExecutionResult> {
    const {source, query, pagination} = parsedGraphQlRequestQuery;

    return graphql({
        contextValue: {
            // context: 2
        },
        rootValue: {
            pagination,
            query,
        },
        schema: articlePaginationSchema,
        source,
    });
}

export async function getAdminArticlePaginationGraphQl(
    request: FastifyRequest,
    reply: FastifyReply
    // ): Promise<ArticlePaginationGraphQlType> {
): Promise<ExecutionResult> {
    const {source, query, pagination} = parseGraphQlRequestQuery(request);

    reply.code(200).header(...mainResponseHeader);

    return getArticlePaginationGraphQl({
        pagination,
        query,
        source,
    });
}

export async function getClientArticlePaginationGraphQl(
    request: FastifyRequest,
    reply: FastifyReply
    // ): Promise<ArticlePaginationGraphQlType> {
): Promise<ExecutionResult> {
    const {source, query, pagination} = parseGraphQlRequestQuery(request);

    reply.code(200).header(...mainResponseHeader);

    return getArticlePaginationGraphQl({
        pagination,
        query: {...query, isActive: true},
        source,
    });
}
