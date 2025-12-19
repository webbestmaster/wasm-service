declare module "*.svg" {
    const content: string;

    export default content;
}

declare module "*.png" {
    const content: string;

    export default content;
}

declare module "*.md" {
    const content: string;

    export default content;
}

declare module "*.txt" {
    const content: string;

    export default content;
}

declare const IS_PRODUCTION: unknown;

declare const BUILD_DATE_H: unknown;

// SSR
declare const NAVIGATION_DATA: string | undefined;

declare const ARTICLE_DATA: string | undefined;

declare module "webp-converter" {
    declare type LoggingOptionType =
        | "-map 1"
        | "-map 2"
        | "-map 3"
        | "-map 4"
        | "-map 5"
        | "-map 6"
        | "-print_lsim"
        | "-print_psnr"
        | "-print_ssim"
        | "-progress"
        | "-quiet"
        | "-short"
        | "-v";

    // eslint-disable-next-line @typescript-eslint/max-params
    declare type CwebpType = (
        sourcePath: string,
        destinationPath: string,
        // https://developers.google.com/speed/webp/docs/cwebp
        convertFlags: string,
        loggingFlags: LoggingOptionType
    ) => Promise<void>;

    declare interface CebpConverterType {
        cwebp: CwebpType;
    }

    const webpConverter: CebpConverterType;

    export default webpConverter;
}

declare module "eslint-plugin-react/configs/recommended.js" {
    declare type ConfigType = Record<string, string>;

    const config: ConfigType;

    export default config;
}
