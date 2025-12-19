export enum LocaleNameEnum {
    enUs = "en-US",
    ruRu = "ru-RU",
    svSe = "sv-SE",
    zhCn = "zh-CN",
    zhTw = "zh-TW",
}

export type LocaleConstType = Readonly<{
    defaults: {
        localeName: LocaleNameEnum;
    };
    key: {
        localStorage: {
            localeName: string;
        };
    };
}>;
