/* global BUILD_DATE_H, IS_PRODUCTION */

export const selector = {
    appWrapper: ".js-app-wrapper",
};

export const demoUrl = "https://webbestmaster.github.io/react-audio-player-pro";

export const googleAnalyticsId = "UA-156987706-1";
export const googleAdSenseId = "ca-pub-8997870404482178";
export const googleAdSenseBottomAdId = "9673664092";
export const googleAdSenseTopAdId = "4086736743";

export const siteDomain = "my-best-site.com";
export const httpsSiteDomain = `https://${siteDomain}`;
export const openGraphLocaleName = "en_US";
export const copyrightName = "My Best Site Dot Com";
// Special file 1/2
export const companyLogoPngFileName = "company-logo.png";
export const companyLogoPngWidth = 600;
export const companyLogoPngHeight = 60;
// Special file 2/2
export const appIconPngFileName = "app-icon.png";
export const specialFileNameList: Array<string> = [companyLogoPngFileName, appIconPngFileName];

function innerInitialization(): undefined {
    const {log} = console;

    // Look here: http://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow&t=Empty, Font: ANSI Shadow
    const hiString = `


    ███████╗███╗   ███╗██████╗ ████████╗██╗   ██╗
    ██╔════╝████╗ ████║██╔══██╗╚══██╔══╝╚██╗ ██╔╝
    █████╗  ██╔████╔██║██████╔╝   ██║    ╚████╔╝
    ██╔══╝  ██║╚██╔╝██║██╔═══╝    ██║     ╚██╔╝
    ███████╗██║ ╚═╝ ██║██║        ██║      ██║
    ╚══════╝╚═╝     ╚═╝╚═╝        ╚═╝      ╚═╝


`;

    log(hiString);

    log("Build date:", BUILD_DATE_H);
    log("Is production:", IS_PRODUCTION);

    log("===================\n");
}

innerInitialization();
