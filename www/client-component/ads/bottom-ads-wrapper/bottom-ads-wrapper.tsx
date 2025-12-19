import type {JSX} from "react";
import {type Location, useLocation} from "react-router-dom";
import {useScreenWidth} from "react-system-hook";

import {googleAdSenseBottomAdId} from "../../../const";
import {AdSenseAds} from "../adsense/ad-sense-ads";
import * as bottomAdsWrapperStyle from "./bottom-ads-wrapper.scss";

export function BottomAdsWrapper(): JSX.Element {
    const routerLocation: Location<unknown> = useLocation();
    const screenWidth = useScreenWidth();

    return (
        <div className={bottomAdsWrapperStyle.bottom_ads_wrapper__wrapper}>
            <AdSenseAds
                adSlotId={googleAdSenseBottomAdId}
                // ignored className={topAdsWrapperStyle.top_ads_wrapper}
                key={`slug:${routerLocation.pathname + googleAdSenseBottomAdId}-screen-width:${screenWidth}`}
            />
        </div>
    );
}
